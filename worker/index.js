const worker = {
  async fetch(request, env) {
    if (!env?.ASSETS || typeof env.ASSETS.fetch !== "function") {
      return new Response("Static asset binding is unavailable.", {
        status: 500,
      });
    }

    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404 || request.method !== "GET") {
      return response;
    }

    const url = new URL(request.url);
    if (url.pathname.includes(".")) {
      return response;
    }

    const fallbackUrl = new URL("/index.html", request.url);
    const fallbackRequest = new Request(fallbackUrl, {
      headers: request.headers,
    });
    return env.ASSETS.fetch(fallbackRequest);
  },
};

export default worker;
