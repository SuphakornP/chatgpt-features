import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const contentPath = path.join(root, "assets", "js", "content.js");

let failures = 0;

function fail(message) {
  failures += 1;
  console.error(`FAIL ${message}`);
}

function pass(message) {
  console.log(`ok   ${message}`);
}

function check(condition, message) {
  if (condition) pass(message);
  else fail(message);
  return condition;
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function textFrom(value) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(textFrom).join(" ");
  if (isRecord(value)) return Object.values(value).map(textFrom).join(" ");
  return "";
}

function hasThai(value) {
  return /[\u0E00-\u0E7F]/.test(textFrom(value));
}

function isOfficialDocsUrl(value) {
  if (!isNonEmptyString(value)) return false;

  try {
    const url = new URL(value);
    return url.protocol === "https:"
      && url.hostname === "learn.chatgpt.com"
      && url.username === ""
      && url.password === ""
      && url.port === ""
      && url.pathname.startsWith("/docs/")
      && url.pathname.length > "/docs/".length;
  } catch {
    return false;
  }
}

function visitStrings(value, pathParts, visitor) {
  if (typeof value === "string") {
    visitor(value, pathParts.join("."));
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => visitStrings(item, [...pathParts, String(index)], visitor));
    return;
  }

  if (isRecord(value)) {
    Object.entries(value).forEach(([key, item]) => {
      visitStrings(item, [...pathParts, key], visitor);
    });
  }
}

function collectFeatureReferences(slide, featureIds) {
  const references = new Set();

  function walk(value, atSlideRoot) {
    if (typeof value === "string") {
      if (featureIds.has(value)) references.add(value);
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => walk(item, false));
      return;
    }

    if (isRecord(value)) {
      Object.entries(value).forEach(([childKey, item]) => {
        if (atSlideRoot && childKey === "id") return;
        walk(item, false);
      });
    }
  }

  walk(slide, true);
  return references;
}

if (!fs.existsSync(contentPath)) {
  fail(`missing ${path.relative(root, contentPath)}`);
  process.exitCode = 1;
} else {
  const source = fs.readFileSync(contentPath, "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);

  try {
    vm.runInContext(source, sandbox, {
      filename: "assets/js/content.js",
      timeout: 1_000,
    });
  } catch (error) {
    fail(`content.js could not be evaluated: ${error.message}`);
  }

  const atlas = sandbox.window.FEATURE_ATLAS;
  const atlasReady = check(isRecord(atlas), "window.FEATURE_ATLAS is an object");

  if (atlasReady) {
    check(isRecord(atlas.meta), "meta is an object");
    const featuresReady = check(Array.isArray(atlas.features), "features is an array");
    const slidesReady = check(Array.isArray(atlas.slides), "slides is an array");

    if (featuresReady) {
      const requiredFields = [
        "id",
        "category",
        "name",
        "thaiPromise",
        "whenToUse",
        "howToStart",
        "surfaces",
        "availability",
        "limitations",
        "prompt",
        "officialUrl",
      ];
      const thaiFields = ["thaiPromise", "whenToUse", "howToStart", "availability", "limitations"];
      const categories = ["workflows", "capabilities", "reference"];
      const expectedCounts = { workflows: 8, capabilities: 10, reference: 4 };
      const ids = new Set();
      const categoryCounts = { workflows: 0, capabilities: 0, reference: 0 };

      check(atlas.features.length === 22, `exactly 22 features (found ${atlas.features.length})`);

      atlas.features.forEach((feature, index) => {
        const label = isNonEmptyString(feature?.id) ? feature.id : `features[${index}]`;

        if (!isRecord(feature)) {
          fail(`features[${index}] must be an object`);
          return;
        }

        requiredFields.forEach((field) => {
          const value = feature[field];
          const present = field === "surfaces"
            ? Array.isArray(value) && value.length > 0 && value.every(isNonEmptyString)
            : textFrom(value).trim().length > 0;
          if (!present) fail(`${label}.${field} is required and must not be empty`);
        });

        if (isNonEmptyString(feature.id)) {
          if (ids.has(feature.id)) fail(`duplicate feature id: ${feature.id}`);
          ids.add(feature.id);
        }

        if (!categories.includes(feature.category)) {
          fail(`${label}.category must be workflows, capabilities, or reference`);
        } else {
          categoryCounts[feature.category] += 1;
        }

        thaiFields.forEach((field) => {
          if (!hasThai(feature[field])) fail(`${label}.${field} must contain Thai copy`);
        });

        if (!isNonEmptyString(feature.name)) fail(`${label}.name must be a non-empty string`);
        if (!Array.isArray(feature.surfaces)) fail(`${label}.surfaces must be an array`);
        if (!isOfficialDocsUrl(feature.officialUrl)) {
          fail(`${label}.officialUrl must be an https://learn.chatgpt.com/docs/... URL`);
        }
      });

      check(ids.size === 22, `22 unique feature IDs (found ${ids.size})`);
      categories.forEach((category) => {
        check(
          categoryCounts[category] === expectedCounts[category],
          `${category} has ${expectedCounts[category]} features (found ${categoryCounts[category]})`,
        );
      });

      if (slidesReady) {
        const slideIds = new Set();
        const referencedFeatures = new Set();

        atlas.slides.forEach((slide, index) => {
          if (!isRecord(slide)) {
            fail(`slides[${index}] must be an object`);
            return;
          }

          if (!isNonEmptyString(slide.id)) {
            fail(`slides[${index}].id is required`);
          } else if (slideIds.has(slide.id)) {
            fail(`duplicate slide id: ${slide.id}`);
          } else {
            slideIds.add(slide.id);
          }

          collectFeatureReferences(slide, ids).forEach((id) => referencedFeatures.add(id));
        });

        const coverSlide = atlas.slides.find((slide) => isRecord(slide) && slide.id === "cover");
        check(
          isRecord(coverSlide) && isNonEmptyString(coverSlide.author),
          "cover slide includes an author credit",
        );

        check(slideIds.size === atlas.slides.length, "all slide IDs are present and unique");
        const missingReferences = [...ids].filter((id) => !referencedFeatures.has(id));
        check(
          missingReferences.length === 0,
          missingReferences.length === 0
            ? "every feature ID is referenced by at least one slide"
            : `feature IDs missing from slides: ${missingReferences.join(", ")}`,
        );
      }
    }

    const externalUrls = [];
    visitStrings(atlas, ["FEATURE_ATLAS"], (value, valuePath) => {
      const urls = value.match(/https?:\/\/[^\s<>"'`)\]]+/g) || [];
      urls.forEach((rawUrl) => {
        const url = rawUrl.replace(/[.,;:!?]+$/, "");
        if (!isOfficialDocsUrl(url)) externalUrls.push(`${valuePath}: ${url}`);
      });
    });

    check(
      externalUrls.length === 0,
      externalUrls.length === 0
        ? "data contains only official learn.chatgpt.com/docs URLs"
        : `non-official URLs found:\n     ${externalUrls.join("\n     ")}`,
    );
  }

  if (failures > 0) {
    console.error(`\n${failures} validation failure(s)`);
    process.exitCode = 1;
  } else {
    console.log("\nAll content validation checks passed");
  }
}
