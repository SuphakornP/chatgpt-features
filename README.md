# ChatGPT Features

คู่มือภาษาไทยแบบ Interactive Web Slide สำหรับทำความเข้าใจและเลือกใช้ 22 ChatGPT + Codex Features จากเอกสารทางการของ OpenAI โดยคงชื่อ Feature, prompt, product surface และ technical terms เป็นภาษาอังกฤษเมื่อการแปลทำให้ความหมายคลาดเคลื่อน

จัดทำโดย **Suphakorn P.**

[เปิดเว็บไซต์](https://chatgpt-features.suphakorn-pal.chatgpt.site) · [Official documentation](https://learn.chatgpt.com/docs/features)

## จุดเด่น

- ครบ 22 Features แบ่งเป็น `Workflows 8`, `Capabilities 10` และ `Reference 4`
- นำเสนอได้ทั้ง Slide mode และหน้าอ่านต่อเนื่อง
- มี Feature Explorer สำหรับค้นหา กรอง และเปิดรายละเอียดเชิงลึก
- รองรับ keyboard navigation, touch, swipe และ deep links
- ออกแบบและทดสอบให้ใช้งานได้ทั้ง desktop และ mobile
- ทุก Feature อ้างอิงกลับไปยัง Official OpenAI Documentation โดยตรง

## เริ่มใช้งานในเครื่อง

โปรเจกต์นี้เป็น static website และไม่มี runtime dependency

```bash
git clone https://github.com/SuphakornP/chatgpt-features.git
cd chatgpt-features
npm run dev
```

จากนั้นเปิด `http://localhost:4173`

## วิธีใช้งาน

- ใช้ `←` `→`, `↑` `↓`, `Page Up`, `Page Down`, `Space`, `Home` และ `End` เพื่อเปลี่ยนสไลด์
- บนมือถือเลื่อนขึ้น–ลง หรือ swipe ซ้าย–ขวาเพื่อข้ามสไลด์
- กดชื่อ Feature เพื่อดู use case, availability, limitations, prompt ตัวอย่าง และ official source
- กด `อ่านต่อเนื่อง` เพื่อเปลี่ยนจาก Slide mode เป็นหน้าอ่านยาว
- ใช้ deep link ระดับสไลด์ เช่น `#three-webs` หรือระดับ Feature เช่น `#feature/browser`

## คำสั่งสำคัญ

| คำสั่ง | หน้าที่ |
| --- | --- |
| `npm run dev` | เปิด local server ที่ port `4173` |
| `npm run validate` | ตรวจโครงสร้างข้อมูล จำนวน Features และ official URLs |
| `npm run check:syntax` | ตรวจ JavaScript syntax |
| `npm test` | รัน content validation และ syntax checks |
| `npm run build` | สร้าง deployment bundle ใน `dist/` สำหรับ OpenAI Sites |

ต้องใช้ Node.js 18 ขึ้นไปสำหรับคำสั่งตรวจสอบและ build

## การจัดการเนื้อหา

ข้อมูลหลักอยู่ใน `assets/js/content.js` ภายใต้โครงสร้าง `{ meta, features, slides }`

- `features` เก็บข้อมูล Feature, หมวด, คำอธิบายภาษาไทย, surfaces, availability, limitations, prompt และ `officialUrl`
- `slides` กำหนดลำดับและรูปแบบการนำเสนอ โดยอ้าง Feature ผ่าน `featureId` หรือ `featureIds`
- Feature ทุกตัวต้องถูกอ้างถึงอย่างน้อยหนึ่งครั้งใน slides
- Cover ต้องมี author credit และ slide IDs ต้องไม่ซ้ำกัน
- URL อ้างอิงต้องอยู่ภายใต้ `https://learn.chatgpt.com/docs/`

หลังแก้ข้อมูลให้รัน:

```bash
npm test
npm run build
git diff --check
```

## โครงสร้างโปรเจกต์

```text
chatgpt-features/
├── .openai/hosting.json     # OpenAI Sites project configuration
├── assets/
│   ├── css/styles.css       # Visual system และ responsive layout
│   ├── js/app.js            # Rendering และ interactions
│   ├── js/content.js        # Features และ slide content
│   └── media/               # Visual assets
├── tools/
│   ├── build-site.mjs       # สร้าง Sites deployment bundle
│   └── validate.mjs         # Content และ provenance validation
├── worker/index.js          # Cloudflare Worker entrypoint
├── index.html               # Website entry point
└── package.json
```

## Source policy

เนื้อหาสรุปและเรียบเรียงจาก [ChatGPT Features documentation](https://learn.chatgpt.com/docs/features) และหน้าลูกภายใต้ `learn.chatgpt.com/docs` เท่านั้น ไม่มีการใช้บทความภายนอกเป็นแหล่งข้อเท็จจริง

ข้อความภาษาไทยจัดทำเพื่อการเรียนรู้และอาจไม่ใช่คำแปลอย่างเป็นทางการ ชื่อผลิตภัณฑ์และ technical terms ยังคงเป็นภาษาอังกฤษเมื่อเหมาะสม

## QA

- Content inventory และ category counts ครบ `8 / 10 / 4`
- ทุก Feature มี official URL และเชื่อมกับ slide อย่างน้อยหนึ่งหน้า
- JavaScript syntax และ deployment build ผ่าน
- ตรวจ keyboard, scroll, search/filter, modal, deep links, Copy Prompt และ Read mode
- ตรวจ responsive layout ที่ `1440×900`, `390×844` และ `320×568`
- Browser QA artifacts ใน `output/playwright/` จะไม่ถูก commit

## Deployment

เว็บไซต์เผยแพร่ผ่าน [OpenAI Sites](https://chatgpt-features.suphakorn-pal.chatgpt.site) โดย `npm run build` จะสร้าง static assets และ Cloudflare Worker-compatible entrypoint สำหรับ deployment

## License

โปรเจกต์นี้เผยแพร่ภายใต้ [MIT License](LICENSE)
