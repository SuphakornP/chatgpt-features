# ChatGPT Features Atlas

Presentation web slide ภาษาไทยสำหรับทำความเข้าใจ ChatGPT Features แบบอ่านง่าย ใช้งานได้ทั้ง desktop และ mobile โดยคง technical terms ที่แปลแล้วเสียความหมายไว้เป็นภาษาอังกฤษ

## เปิดใช้งาน

โปรเจกต์นี้เป็น static website จึงไม่ต้อง build หรือ install dependencies ก่อนเปิดใช้งาน

```bash
cd chatgpt-features
python3 -m http.server 4173
```

จากนั้นเปิด `http://localhost:4173` ใน browser

สำหรับสร้าง deployment bundle ที่ใช้กับ OpenAI Sites:

```bash
npm run build
```

## วิธีใช้งาน

- ใช้ `←` `→`, `↑` `↓`, `Page Up`, `Page Down`, `Space`, `Home` และ `End` เพื่อเปลี่ยนสไลด์
- บนมือถือเลื่อนขึ้น–ลงตามธรรมชาติ หรือ swipe ซ้าย–ขวางเพื่อข้ามสไลด์
- กดชื่อ Feature ใดก็ได้เพื่อเปิดรายละเอียด, availability, ข้อควรระวัง, prompt ตัวอย่าง และ official source
- ปุ่ม `อ่านต่อเนื่อง` เปลี่ยนจาก Slide mode เป็นหน้าอ่านยาว และจดจำโหมดล่าสุดไว้ใน browser
- Deep link ใช้ได้ทั้งระดับสไลด์ เช่น `#three-webs` และระดับ Feature เช่น `#feature/browser`

## ทดสอบ

ต้องใช้ Node.js 18 ขึ้นไป

```bash
npm test
```

คำสั่งนี้ตรวจทั้งความครบถ้วนของข้อมูลและ JavaScript syntax:

```bash
npm run validate
npm run check:syntax
```

ตัว validator กำหนดให้มี Features ทั้งหมด 22 รายการ แบ่งเป็น `workflows` 8 รายการ, `capabilities` 10 รายการ และ `reference` 4 รายการ พร้อมตรวจ required fields, เนื้อหาภาษาไทย, URL อ้างอิง, slide ID ที่ไม่ซ้ำ และการเชื่อม Feature ทุกตัวเข้ากับอย่างน้อยหนึ่ง slide

ใน `slides` ให้ใส่ Feature ID เป็น string แบบตรงตัวใน field ที่ใช้อ้างอิง เช่น `featureId` หรือ `featureIds` เพื่อให้ validator ตรวจ coverage ได้

## โครงสร้างหลัก

- `index.html` — entry point ของ presentation
- `assets/css/` — visual system และ responsive layout
- `assets/js/content.js` — ข้อมูล `{ meta, features, slides }`
- `assets/js/app.js` — rendering และ interaction
- `assets/media/` — visual assets
- `tools/validate.mjs` — content and provenance validation
- `tools/build-site.mjs` — สร้าง static assets และ Cloudflare Worker entrypoint สำหรับ Sites
- `worker/index.js` — worker ที่เสิร์ฟเว็บไซต์และรองรับ URL fallback

## Source provenance

เนื้อหาทั้งหมดสรุปและเรียบเรียงจาก [ChatGPT Features documentation](https://learn.chatgpt.com/docs/features) และหน้าลูกภายใต้ `https://learn.chatgpt.com/docs/` เท่านั้น แต่ละ Feature ต้องมี `officialUrl` ที่ชี้กลับไปยังหน้าเอกสารทางการโดยตรง

ไม่มีการใช้บทความภายนอกเป็นแหล่งอ้างอิง ข้อความภาษาไทยเป็นการสรุปเพื่อการเรียนรู้ ส่วนชื่อ Feature, product surface, prompt และ technical terms จะคงภาษาอังกฤษเมื่อการแปลทำให้ความหมายคลาดเคลื่อน

## QA ที่ตรวจแล้ว

- Content: 22 Features ครบตามสัดส่วน `8 / 10 / 4` และทุก Feature มี official URL
- Links: หน้าต้นทางทั้ง 22 URL ตอบกลับ `HTTP 200` ณ วันที่ตรวจ
- Runtime: browser console ไม่มี error/warning, ไม่มี duplicate DOM IDs และทุก interactive control มี accessible name
- Responsive visual QA: `1440×900`, `390×844` และ `320×568`
- Interaction: keyboard navigation, scroll, Feature search/filter, modal Escape, deep link, Copy Prompt และ Read mode

ภาพ QA สำหรับตรวจในเครื่องจะถูกเขียนไว้ใน `output/playwright/` และไม่ถูก commit ขึ้น GitHub
