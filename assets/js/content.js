(function () {
  "use strict";

  const features = [
    {
      id: "projects",
      category: "workflows",
      name: "Projects and chats",
      thaiPromise: "รวม chats, files, instructions และ sources ที่เกี่ยวข้องไว้ด้วยกัน เพื่อให้ context เดิมเดินทางต่อไปกับงาน",
      whenToUse: "งานต่อเนื่องหลาย deliverables, งานที่ใช้ source ชุดเดิมซ้ำ หรือ codebase ที่ต้องแยกหลาย chats ตาม outcome",
      howToStart: "สร้าง Project แล้วเริ่ม chat ภายในนั้น; ใน Codex CLI ให้เริ่มจาก working directory ที่ต้องการ และใน IDE ให้เปิด workspace ที่ถูกต้อง",
      surfaces: ["Web", "Desktop app", "Codex CLI", "IDE extension"],
      availability: "รูปแบบ Project และสิทธิ์เข้าถึงไฟล์ต่างกันตาม surface",
      limitations: "ChatGPT Project ไม่เข้าถึง local folder โดยตรงจนกว่าจะ upload หรือ connect source; Projects view ไม่มีใน CLI และ IDE extension",
      prompt: "สร้าง Project สำหรับงานเปิดตัวสินค้า รวม brief, research และ brand guide แล้วแยก chat สำหรับ strategy, copy และ QA",
      officialUrl: "https://learn.chatgpt.com/docs/projects"
    },
    {
      id: "sites",
      category: "workflows",
      name: "Sites",
      thaiPromise: "เปลี่ยน prompt หรือ compatible project ให้เป็น website, web app หรือ game ที่สร้าง ปรับ และ publish ได้ใน ChatGPT",
      whenToUse: "เมื่อผลลัพธ์ควรเป็น hosted experience ที่แชร์ เปิดใช้ซ้ำ หรือมี interaction มากกว่าคำตอบใน chat",
      howToStart: "ระบุคำว่า website ใน prompt หรือเรียก @Sites แล้วบอก audience, purpose, behavior และข้อมูลที่ต้องใช้",
      surfaces: ["Web", "Desktop app"],
      availability: "Public beta; ขึ้นกับ plan, region และ workspace settings",
      limitations: "ทุก deployment URL เป็น production; CLI และ IDE ไม่มี Sites management view; framework และบริการ background บางชนิดอาจไม่รองรับ",
      prompt: "@Sites สร้างเว็บไซต์ onboarding สำหรับทีมขาย มี checklist, progress ที่จำได้ และหน้า resource ที่ค้นหาได้",
      officialUrl: "https://learn.chatgpt.com/docs/sites"
    },
    {
      id: "visualizations",
      category: "workflows",
      name: "Visualizations",
      thaiPromise: "เปลี่ยนแนวคิดหรือข้อมูลให้เป็น chart, map, diagram, calculator, simulation และ interactive explanation ที่ลองปรับค่าได้",
      whenToUse: "เมื่อการเห็นความสัมพันธ์ การเปรียบเทียบ หรือการทดลองหลาย scenario ทำให้เข้าใจง่ายกว่าข้อความธรรมดา",
      howToStart: "พิมพ์ @Visualize ใน Chat หรือ ChatGPT Work แล้วบอกสิ่งที่ต้องการสำรวจ ตัวแปร และคำถามที่ผู้ใช้ควรตอบได้",
      surfaces: ["Web", "Desktop app", "Mobile rollout"],
      availability: "Preview และกำลัง rollout ตาม account, plan, platform และ workspace",
      limitations: "Codex CLI และ IDE extension ไม่ render Visualization; output เป็น snapshot ไม่ใช่ live dashboard และ export อาจต่างกันตาม surface",
      prompt: "@Visualize สร้าง simulator ต้นทุนแคมเปญ ให้ปรับ budget, conversion rate และ average order value แล้วเห็น break-even point",
      officialUrl: "https://learn.chatgpt.com/docs/visualizations"
    },
    {
      id: "scheduled-tasks",
      category: "workflows",
      name: "Scheduled tasks",
      thaiPromise: "ตั้งงาน recurring ให้ทำงานเบื้องหลัง แล้วกลับมาดู active, paused, completed tasks และ run ล่าสุดได้",
      whenToUse: "งานตรวจซ้ำ รายงานประจำ monitoring หรือ workflow ที่ prompt และ cadence ชัดเจนแล้ว",
      howToStart: "ทดสอบ prompt ใน chat ปกติก่อน แล้วสร้าง task ใน Scheduled; เลือก standalone task หรือ schedule ภายใน chat ที่ต้องใช้ context เดิม",
      surfaces: ["Web", "Desktop app"],
      availability: "ต้องเปิดใช้ใน workspace; local scheduled task ต้องเปิดเครื่องและ app ไว้; gpt-5.4 และ gpt-5.4-mini สำหรับ ChatGPT sign-in ใช้ได้ถึง 31 สิงหาคม 2026",
      limitations: "Web task ใช้ uploaded context และ connected tools ได้ แต่เข้าถึง local folder/worktree โดยตรงไม่ได้; CLI และ IDE ไม่มีหน้าจัดการ Scheduled; งานที่ pin model เดิมต้องเปลี่ยนเป็น gpt-5.6-terra หรือ gpt-5.6-luna ก่อนวันดังกล่าว",
      prompt: "ทุกวันทำการ 09:00 ตรวจ issue ใหม่ แยก priority พร้อมเหตุผล และสรุปสิ่งที่ต้องมีคนตัดสินใจ",
      officialUrl: "https://learn.chatgpt.com/docs/automations"
    },
    {
      id: "long-running-work",
      category: "workflows",
      name: "Long-running work",
      thaiPromise: "ให้ ChatGPT เดินงานหลายขั้นต่อเนื่องใน chat เดิม โดยมี outcome, constraints และ verification ที่ชัดเจน",
      whenToUse: "migration, research, implementation หรือ deliverable ที่ต้องวางแผน ลงมือ ทดสอบ และปรับหลายรอบ",
      howToStart: "ใช้ /goal ใน Desktop app, Codex CLI หรือ IDE extension; ถ้ายังนิยามงานไม่ชัด ให้เริ่มจาก /plan ก่อน",
      surfaces: ["Web Work", "Desktop app", "Codex CLI", "IDE extension"],
      availability: "Goal mode ใช้ /goal บน local surfaces; บน web ให้ระบุ completion criteria ใน ChatGPT Work prompt",
      limitations: "/goal ไม่เพิ่ม permission และยังอยู่ภายใต้ sandbox/approval เดิม; งาน parallel ไม่ควรเขียน source เดียวกันโดยไม่มี worktree แยก",
      prompt: "/goal ปรับ checkout flow ให้รองรับ mobile, รักษา API เดิม, เพิ่ม tests และจบเมื่อ build ผ่านพร้อม screenshots สองขนาด",
      officialUrl: "https://learn.chatgpt.com/docs/long-running-work"
    },
    {
      id: "notifications",
      category: "workflows",
      name: "Notifications",
      thaiPromise: "แจ้งเมื่อ turn เสร็จ งานต้องการ permission หรือมีคำถามที่รอการตัดสินใจ โดยไม่ต้องเฝ้าหน้าจอ",
      whenToUse: "งานนาน งานหลาย chat หรือ workflow ที่คุณต้องสลับไปทำอย่างอื่นระหว่างรอ",
      howToStart: "ตั้งค่า Notifications ในแต่ละ surface; Desktop เลือก never, background only หรือ always พร้อม permission/question alerts",
      surfaces: ["Web", "Desktop app", "Codex CLI", "IDE extension"],
      availability: "Channels และ controls ต่างกันตาม surface, category, account และ OS",
      limitations: "IDE ไม่มี notification controls แยก; web อาจมี push, email หรือ SMS เฉพาะ category/account ที่รองรับ",
      prompt: "แจ้งฉันเมื่อ test suite เสร็จ หรือเมื่อพบ decision ที่ต้องเลือกก่อนเดินงานต่อ",
      officialUrl: "https://learn.chatgpt.com/docs/notifications"
    },
    {
      id: "pets",
      category: "workflows",
      name: "Pets",
      thaiPromise: "ใช้ animated companion เป็น ambient status สำหรับ Running, Needs input, Ready และ Blocked",
      whenToUse: "เมื่ออยากมองเห็นสถานะหลาย chats แบบ glanceable โดยไม่เปิดหน้าจอหลักตลอดเวลา",
      howToStart: "เลือก Pet ใน Settings แล้วใช้ /pet; Desktop มี floating pet และ activity tray ส่วน CLI ต้องใช้ terminal ที่รองรับ graphics",
      surfaces: ["Web Work", "Desktop app", "Codex CLI"],
      availability: "ขึ้นกับ account/workspace และความสามารถของ terminal",
      limitations: "Pet เปลี่ยนการแสดงสถานะ ไม่เปลี่ยนวิธีทำงานของ model; custom pet บน desktop เก็บ local และ IDE ไม่รองรับ",
      prompt: "ใช้ Pet เพื่อติดตาม chat ที่กำลัง build และเตือนทันทีเมื่อ Needs input",
      officialUrl: "https://learn.chatgpt.com/docs/pets"
    },
    {
      id: "codex-micro",
      category: "workflows",
      name: "Codex Micro",
      thaiPromise: "hardware control surface จาก Codex และ Work Louder สำหรับดูสถานะ สลับ chats ใช้ push-to-talk และเรียก action จากคีย์บอร์ด",
      whenToUse: "ทีมที่ทำงานกับหลาย agent chats พร้อมกันและต้องการ physical status/control โดยไม่สลับหน้าต่าง",
      howToStart: "เชื่อม Codex Micro ผ่าน USB-C หรือ Bluetooth แล้วตั้งค่า Agent Keys, Command Keys, analog directions และไฟใน Settings",
      surfaces: ["Desktop app", "Physical hardware"],
      availability: "Limited-run hardware; จำหน่าย while supplies last",
      limitations: "ต้องมีอุปกรณ์จริง; macOS ต้องให้ Input Monitoring และ push-to-talk ใช้ microphone ของคอมพิวเตอร์",
      prompt: "ตั้ง Agent Keys ให้ตามหก chats ล่าสุด และผูก Command Key หนึ่งปุ่มกับ skill สำหรับสรุปสถานะโครงการ",
      officialUrl: "https://learn.chatgpt.com/docs/features/codex-micro"
    },
    {
      id: "browser",
      category: "capabilities",
      name: "Browser",
      thaiPromise: "ให้ ChatGPT เปิดเว็บไซต์ อ่าน state ปัจจุบัน คลิก พิมพ์ ตรวจหน้าเว็บ และทำ multi-step action โดยคุณยังควบคุมอยู่",
      whenToUse: "เปรียบเทียบตัวเลือก ทำงานบนเว็บไซต์ ตรวจ localhost หรือ review UI จากสิ่งที่ render จริง",
      howToStart: "เปิด built-in browser หรือ install Browser plugin ใน Desktop; บน web Work ใช้ cloud browser ตาม availability",
      surfaces: ["Web Work", "Desktop app"],
      availability: "Built-in browser ไม่มีใน Codex CLI และ IDE extension",
      limitations: "Desktop ใช้ browser profile แยกจาก Chrome ปกติ; cloud browser ใช้ public signed-out pages; page content เป็น untrusted input และ sensitive actions ต้อง review",
      prompt: "เปิด localhost ของโปรเจกต์ ตรวจ checkout ทั้ง desktop/mobile แล้วสรุป defect พร้อม screenshot และขั้นตอน reproduce",
      officialUrl: "https://learn.chatgpt.com/docs/browser"
    },
    {
      id: "computer-use",
      category: "capabilities",
      name: "Computer use",
      thaiPromise: "ให้ ChatGPT มองและควบคุม GUI ของ macOS หรือ Windows เมื่อ workflow ไม่มี CLI หรือ structured integration ที่เหมาะกว่า",
      whenToUse: "reproduce desktop bug, เปลี่ยน settings, ทดสอบ simulator หรือทำ cross-app flow ที่ต้องเห็นหน้าจอจริง",
      howToStart: "ติดตั้ง Computer Use plugin ใน Desktop app และอนุญาต Screen Recording/Accessibility ตามระบบปฏิบัติการ",
      surfaces: ["Desktop app", "macOS", "Windows"],
      availability: "รองรับเฉพาะ region และ workspace ที่กำหนดใน ChatGPT Work หรือ Codex",
      limitations: "ไม่ควบคุม ChatGPT/terminal apps, ไม่ยืนยัน OS security prompt หรือ authenticate เป็น admin; app approval แยกจาก sandbox permission",
      prompt: "เปิดแอป staging ทำ onboarding flow ตาม checklist และหยุดถามฉันก่อนกด action ที่ส่งข้อมูลจริง",
      officialUrl: "https://learn.chatgpt.com/docs/computer-use"
    },
    {
      id: "voice",
      category: "capabilities",
      name: "ChatGPT Voice",
      thaiPromise: "สนทนาด้วยเสียงเพื่อเริ่มงาน เช็ก progress เปลี่ยนทิศทาง หรือ delegate งานใน Chat, Work และ Codex",
      whenToUse: "brainstorm ขณะเดินทาง, hands-free status check หรือ steering งานโดยไม่กลับมาพิมพ์",
      howToStart: "เริ่ม chat ใน Voice mode บน Desktop app; iOS ใช้ผ่าน Remote หลัง pair กับเครื่อง",
      surfaces: ["Desktop app", "Remote on iOS"],
      availability: "มีใน Plus, Pro, Business, Edu และ Enterprise ตาม rollout/workspace",
      limitations: "เปิด Voice chat ได้ทีละหนึ่ง chat; voice allowance แยกเป็น rolling window และ task ยังใช้ Codex usage budget",
      prompt: "เปิด Voice แล้วถามสถานะ goal นี้ สรุป blocker และเปลี่ยนลำดับให้แก้ mobile regression ก่อน",
      officialUrl: "https://learn.chatgpt.com/docs/features/voice"
    },
    {
      id: "plugins",
      category: "capabilities",
      name: "Plugins",
      thaiPromise: "ติดตั้ง reusable workflow ที่ bundle skills, connectors และเครื่องมืออื่นให้ ChatGPT หรือ Codex เรียกใช้ได้ถูกวิธี",
      whenToUse: "เมื่อต้องทำงานซ้ำด้วยขั้นตอนเฉพาะ เชื่อม Gmail/Drive/Slack/GitHub หรือเพิ่ม domain workflow ให้ทีม",
      howToStart: "เปิด Plugins directory บน ChatGPT Work/Desktop หรือใช้ /plugins ใน Codex CLI; หลังติดตั้งให้เริ่ม chat/session ใหม่",
      surfaces: ["Web Work", "Desktop app", "Codex CLI"],
      availability: "ไม่มีใน Chat ปกติ, IDE extension และ mobile",
      limitations: "Connector บางตัวต้อง authorize บริการภายนอก; workspace policy และ sign-in method อาจจำกัด plugin ที่ใช้ได้",
      prompt: "ติดตั้ง Google Drive plugin แล้วสรุปเอกสารในโฟลเดอร์แคมเปญ โดยอ้างชื่อไฟล์ต้นทางทุกข้อ",
      officialUrl: "https://learn.chatgpt.com/docs/plugins"
    },
    {
      id: "web-search",
      category: "capabilities",
      name: "Web search",
      thaiPromise: "ค้น current information จากเว็บและนำ sources กลับมาอยู่ใน task เพื่อให้ตรวจสอบที่มาได้",
      whenToUse: "ข่าว ข้อมูลที่เปลี่ยนเร็ว การเทียบข้อมูลภายนอก หรือคำตอบที่ต้องมี citation",
      howToStart: "ขอให้ search พร้อมระบุช่วงเวลาและชนิด source; ใน CLI ใช้ codex --search หรือกำหนด web_search ตาม policy",
      surfaces: ["Web", "Desktop app", "Codex CLI", "IDE extension"],
      availability: "Workspace policy อาจปิดหรือจำกัด live search",
      limitations: "Search results เป็น untrusted input; cached/indexed search ลดความเสี่ยงบางส่วนแต่ไม่กำจัด prompt injection",
      prompt: "ค้น release notes ทางการใน 30 วันที่ผ่านมา เปรียบเทียบสิ่งที่เปลี่ยน และใส่ source link ต่อ claim",
      officialUrl: "https://learn.chatgpt.com/docs/web-search"
    },
    {
      id: "image-generation",
      category: "capabilities",
      name: "Image generation",
      thaiPromise: "สร้างหรือแก้ภาพจาก text และ reference images สำหรับ UI assets, banners, backgrounds, illustrations และ spritesheets",
      whenToUse: "เมื่อ workflow ต้องการ visual output ใหม่ หรือแก้ภาพเดิมแบบเจาะจงโดยยังเก็บ reference ไว้",
      howToStart: "อธิบาย subject, composition, style, constraints และ output use; ใน Codex เรียก $imagegen และแนบภาพด้วย -i/--image เมื่อมี reference",
      surfaces: ["Web", "Desktop app", "Codex CLI", "IDE extension"],
      availability: "Availability และ limits ขึ้นกับ plan/workspace; local Codex ใช้ model ที่ระบบกำหนด",
      limitations: "Image generation ใช้ usage มากกว่าข้อความโดยเฉลี่ย; production typography ต้องตรวจทุกคำและอาจต้องเก็บงานต่อใน design tool",
      prompt: "$imagegen สร้าง hero background 16:9 แบบ editorial-tech ไม่มีตัวอักษร มีพื้นที่สงบฝั่งซ้ายสำหรับ headline",
      officialUrl: "https://learn.chatgpt.com/docs/image-generation"
    },
    {
      id: "image-inputs",
      category: "capabilities",
      name: "Image inputs",
      thaiPromise: "ใช้ screenshot, mockup, diagram หรือภาพถ่ายเป็น visual context เพื่อให้ ChatGPT เข้าใจสิ่งที่ข้อความอธิบายได้ยาก",
      whenToUse: "debug error จากหน้าจอ, review UI, อ่าน architecture diagram หรือยึด visual reference ในงานสร้าง",
      howToStart: "แนบภาพแล้วชี้พื้นที่ สิ่งที่ต้องตรวจ และ outcome ที่ต้องการ อย่าปล่อยให้ภาพเป็นโจทย์ทั้งหมด",
      surfaces: ["Web", "Desktop app", "Codex CLI", "IDE extension"],
      availability: "รองรับ common image formats; CLI แนบหลายภาพได้",
      limitations: "รายละเอียดเล็กมาก ภาพเบลอ หรือ context ที่อยู่นอกเฟรมอาจทำให้วิเคราะห์คลาดเคลื่อน จึงควร crop และบอกจุดสนใจ",
      prompt: "ดู screenshot นี้ เฉพาะส่วน checkout summary; หา spacing และ hierarchy ที่ทำให้ยอดรวมอ่านยาก แล้วเสนอแก้โดยรักษา design system เดิม",
      officialUrl: "https://learn.chatgpt.com/docs/image-inputs"
    },
    {
      id: "appshots",
      category: "capabilities",
      name: "Appshots",
      thaiPromise: "จับ frontmost macOS window พร้อม screenshot และ accessibility text ที่มี เพื่อส่ง state ของแอปเข้า chat",
      whenToUse: "อธิบาย error/settings state, ขอให้ช่วยอ่านเอกสารหรือ UI ที่เปิดอยู่ และชี้จุดแก้โดยไม่ต้องเล่าใหม่ทั้งหมด",
      howToStart: "ให้ Desktop app สิทธิ์ Screen & System Audio Recording และ Accessibility แล้วสร้าง Appshot จากหน้าต่างที่ต้องการ",
      surfaces: ["Desktop app", "macOS"],
      availability: "สร้าง Appshot ใหม่ได้บน macOS Desktop app เท่านั้น",
      limitations: "บาง web apps ส่งได้เพียง visible screenshot ไม่ใช่เนื้อหานอกจอ; CLI resume chat ที่มี Appshot ได้แต่สร้างใหม่ไม่ได้",
      prompt: "ใช้ Appshot จากหน้าต่าง design tool นี้ แล้วเทียบ implementation กับ spacing, alignment และ typography ที่เห็น",
      officialUrl: "https://learn.chatgpt.com/docs/appshots"
    },
    {
      id: "chrome-extension",
      category: "capabilities",
      name: "Chrome extension",
      thaiPromise: "แชร์ context และ signed-in session จาก Chrome profile ที่ใช้อยู่ให้ ChatGPT ทำงานในแท็บจริงของคุณ",
      whenToUse: "logged-in workflow, งานที่ต้องใช้ tab/session เดิม หรือ extension state ที่ built-in browser แยก profile ทำไม่ได้",
      howToStart: "ติดตั้งจาก Plugins ใน Desktop app แล้วเรียก @Chrome; ตั้ง allowlist/blocklist และ review confirmation policy",
      surfaces: ["Desktop app", "Google Chrome"],
      availability: "รองรับ Google Chrome; ยังไม่รองรับ Chromium browsers อื่น",
      limitations: "ข้อมูลในหน้าและ browser history มีความอ่อนไหว; file upload ต้องเปิด Allow access to file URLs และ sensitive actions อาจต้อง confirm",
      prompt: "@Chrome เปิดระบบ CRM ใน tab ที่ sign in อยู่ สรุปสถานะ lead ที่ฉันเปิดไว้ แต่ห้ามแก้ข้อมูลหรือส่งข้อความ",
      officialUrl: "https://learn.chatgpt.com/docs/chrome-extension"
    },
    {
      id: "work-with-files",
      category: "capabilities",
      name: "Work with files",
      thaiPromise: "สร้าง แก้ review และ refine documents, presentations, spreadsheets, PDFs และไฟล์อื่นในฐานะ working artifacts",
      whenToUse: "เมื่อผลลัพธ์ต้องถูกส่งต่อ เปิดตรวจ หรือแก้แบบเจาะจงใน page, slide, sheet, chart หรือ region",
      howToStart: "บอกชนิดไฟล์ โครงสร้าง เนื้อหา path ปลายทาง และ checks ที่ต้องรัน; ใช้ annotation เมื่อ surface รองรับ",
      surfaces: ["Web Work", "Desktop app", "Codex CLI", "IDE extension"],
      availability: "Preview/annotation UI แตกต่างกันตาม surface และ file type",
      limitations: "CLI และ IDE สร้าง/แก้ไฟล์ได้แต่ไม่มี visual preview/annotation UI ในตัว; ต้องเปิดด้วย viewer ที่เหมาะสมเพื่อตรวจ layout",
      prompt: "สร้าง presentation 10 slides จาก brief นี้ บันทึกไฟล์ ตรวจ overflow ทุกหน้า และรายงาน path พร้อม verification ที่รัน",
      officialUrl: "https://learn.chatgpt.com/docs/artifacts-viewer"
    },
    {
      id: "commands",
      category: "reference",
      name: "Commands",
      thaiPromise: "ใช้ keyboard shortcuts, command menu และ codex:// deep links เพื่อเดินทางและสั่งงาน Desktop app ได้เร็วขึ้น",
      whenToUse: "เปิด chat/settings/folder, ค้น chat, toggle panels หรือ share deep link ให้ทีมเข้าจุดเดียวกัน",
      howToStart: "เปิด Command menu ด้วย Cmd/Ctrl+Shift+P หรือ Cmd/Ctrl+K; ดูและแก้ shortcuts ใน Settings",
      surfaces: ["Desktop app", "macOS", "Windows"],
      availability: "Shortcut บางรายการต่างกันตาม OS และสามารถ customize/reset ได้",
      limitations: "Deep-link parameter ต้อง encode และ unsupported path จะไม่ทำงานตามที่คาด จึงควรอ้าง reference ก่อนแชร์",
      prompt: "ใช้ Cmd/Ctrl+G ค้น chat เก่า, Cmd/Ctrl+F หาใน chat ปัจจุบัน และ Ctrl+` เปิด terminal",
      officialUrl: "https://learn.chatgpt.com/docs/reference/commands"
    },
    {
      id: "slash-commands",
      category: "reference",
      name: "Slash commands",
      thaiPromise: "ใช้ /command เป็น keyboard-first control เพื่อเปลี่ยน mode, model, permission, project หรือจัดการ session จาก composer",
      whenToUse: "เมื่อต้อง steer active session โดยไม่ออกจาก chat เช่น /plan, /goal, /status, /review หรือ /worktree",
      howToStart: "พิมพ์ / เพื่อเปิดรายการ command; เรียก skill ด้วย $ และ custom prompt ด้วย /prompts:<name>",
      surfaces: ["Desktop app", "Codex CLI", "IDE extension"],
      availability: "รายการ command เปลี่ยนตาม environment, surface และสิทธิ์ที่มี",
      limitations: "อย่าจำรายการจากที่อื่นแทนการเปิด slash popup; บาง command ใช้ได้เฉพาะ surface หรือสถานะ session บางแบบ",
      prompt: "/plan วิเคราะห์งานและถามเฉพาะ decision สำคัญ จากนั้นเปลี่ยนเป็น /goal เมื่อ Definition of Done ชัดเจน",
      officialUrl: "https://learn.chatgpt.com/docs/reference/slash-commands"
    },
    {
      id: "settings",
      category: "reference",
      name: "Settings",
      thaiPromise: "ปรับ ChatGPT Desktop app ให้เข้ากับวิธีทำงาน ตั้งแต่ input, appearance, notifications, browser, computer use ถึง memories",
      whenToUse: "ก่อนเริ่มงานยาว ตั้ง prevent sleep/follow-up behavior หรือเมื่อปรับ permission, shortcut และ personalization",
      howToStart: "เปิด Settings ด้วย Cmd+, บน macOS หรือ Ctrl+, บน Windows แล้วไล่ตั้งค่าตาม workflow ที่ใช้จริง",
      surfaces: ["Desktop app"],
      availability: "บางหน้า เช่น Memories, invitations หรือ profile sharing ขึ้นกับ account/plan",
      limitations: "Settings ไม่ได้แทน workspace policy, OS permission หรือสิทธิ์ใน connected service; แต่ละ boundary ยังต้องอนุญาตแยกกัน",
      prompt: "เปิด Prevent sleep while running, ตั้ง Follow-up behavior และตรวจ notification permissions ก่อนเริ่ม local goal ข้ามคืน",
      officialUrl: "https://learn.chatgpt.com/docs/reference/settings"
    },
    {
      id: "troubleshooting",
      category: "reference",
      name: "Troubleshooting",
      thaiPromise: "ศูนย์รวมวิธีแยกสาเหตุและกู้สถานการณ์จาก project, chat, worktree, terminal, scheduled task และ version mismatch",
      whenToUse: "เมื่อไฟล์ใน review pane ไม่ตรง, chat หาย, worktree รันไม่ได้, task ค้าง หรือ app กับ CLI ทำงานต่างกัน",
      howToStart: "จับอาการให้ชัด ตรวจ surface/version/path/log ที่เกี่ยวข้อง แล้วทำ recovery จากขั้นที่กระทบน้อยที่สุด",
      surfaces: ["Desktop app", "Codex CLI", "IDE extension"],
      availability: "อ้างอิง recovery path ตามระบบและ surface ที่เกิดปัญหา",
      limitations: "Logs และ transcripts อาจมีข้อมูลอ่อนไหว ต้อง review และ redact ก่อนแชร์ให้ทีม Support",
      prompt: "ตรวจว่าเหตุใด worktree นี้รันไม่ได้ เปรียบเทียบ dependencies, ignored files และ .worktreeinclude แล้วเสนอ recovery ที่ไม่แตะงานเดิม",
      officialUrl: "https://learn.chatgpt.com/docs/reference/troubleshooting"
    }
  ];

  const slides = [
    {
      id: "cover",
      chapter: "intro",
      type: "cover",
      eyebrow: "CHATGPT + CODEX / FEATURE",
      title: "22 Features.\nจากคำสั่งเดียว\nสู่ระบบงานที่เดินต่อได้",
      lead: "คู่มือภาษาไทยแบบ Web Slide สำหรับเลือกและใช้ Feature ให้ตรงกับงานจริง",
      author: "Suphakorn P.",
      featureIds: []
    },
    {
      id: "beyond-chat",
      chapter: "intro",
      type: "atlas",
      eyebrow: "THE SYSTEM, NOT JUST THE CHAT",
      title: "ChatGPT ไม่ได้มีแค่ช่องแชต",
      lead: "Feature ทั้งหมดแบ่งเป็น 3 ชั้น: จัดงานให้เดินต่อ, เพิ่มความสามารถในการลงมือทำ และควบคุมระบบให้คล่อง",
      featureIds: features.map((feature) => feature.id)
    },
    {
      id: "choose-by-work",
      chapter: "intro",
      type: "routes",
      eyebrow: "START WITH THE JOB",
      title: "เริ่มจากชนิดของงาน\nไม่ใช่ชื่อ Tool",
      lead: "เลือก Feature จาก pattern ของงาน แล้วค่อยเพิ่ม capability เท่าที่จำเป็น",
      routes: [
        { label: "งานครั้งเดียว", answer: "Chat", note: "โจทย์ self-contained ไม่ต้องแชร์ context" },
        { label: "งานต่อเนื่อง", answer: "Project", note: "ใช้ files และ instructions ชุดเดิมซ้ำ" },
        { label: "งานหลายขั้น", answer: "/goal", note: "มี outcome, constraints และ verification" },
        { label: "งานทำซ้ำ", answer: "Scheduled", note: "prompt ผ่านการทดสอบและ cadence ชัด" }
      ],
      featureIds: ["projects", "long-running-work", "scheduled-tasks"]
    },
    {
      id: "context-compounds",
      chapter: "workflows",
      type: "focus",
      eyebrow: "WORKFLOWS / 01",
      title: "Context ไม่ควร\nเริ่มใหม่ทุกแชต",
      lead: "Project ทำให้ files, instructions, sources และ chats อยู่ในขอบเขตงานเดียวกัน แต่แต่ละ surface ให้ access ไม่เหมือนกัน",
      statement: "หนึ่ง Project · หลาย outcomes · Context เดียวกัน",
      points: ["ChatGPT Project ใช้ shared files และ instructions", "Local Project ผูกกับ folder หรือ workspace", "แยก chat ต่อ outcome เพื่อให้ review ง่าย"],
      featureIds: ["projects"]
    },
    {
      id: "define-done",
      chapter: "workflows",
      type: "goal",
      eyebrow: "WORKFLOWS / 02",
      title: "ให้งานเดินต่อ\nพร้อม Definition of Done",
      lead: "/goal ไม่ใช่คำสั่งให้ทำงานนานขึ้น แต่คือสัญญาที่บอกว่าผลลัพธ์ต้องเป็นอะไร อยู่ใต้ข้อจำกัดใด และตรวจเสร็จอย่างไร",
      formula: ["OUTCOME", "CONSTRAINTS", "VERIFICATION"],
      example: "/goal สร้าง responsive web deck ภาษาไทย อ้างอิง official docs เท่านั้น และจบเมื่อ content checks + desktop/mobile QA ผ่าน",
      featureIds: ["long-running-work"]
    },
    {
      id: "repeat-after-proof",
      chapter: "workflows",
      type: "focus",
      eyebrow: "WORKFLOWS / 03",
      title: "ทำให้ดีหนึ่งครั้ง\nแล้วค่อยตั้งให้ทำซ้ำ",
      lead: "Scheduled task ที่ดีเริ่มจาก prompt ที่ผ่านการทดลอง มี source ที่เข้าถึงได้ และรู้ว่าจะรายงานหรือหยุดถามเมื่อใด",
      statement: "TEST → SCHEDULE → REVIEW → TUNE",
      points: ["Standalone run เริ่มจาก saved prompt", "In-chat schedule กลับมาใช้ context เดิม", "Local task ต้องเปิดเครื่องและ app ไว้"],
      featureIds: ["scheduled-tasks"]
    },
    {
      id: "answer-to-experience",
      chapter: "workflows",
      type: "versus",
      eyebrow: "WORKFLOWS / 04",
      title: "จากคำตอบ\nสู่สิ่งที่เปิดใช้ได้จริง",
      lead: "Visualizations เหมาะกับการสำรวจความสัมพันธ์ใน chat; Sites เหมาะกับ durable hosted experience ที่ต้องแชร์และกลับมาใช้ต่อ",
      choices: [
        { featureId: "visualizations", label: "EXPLORE", value: "ปรับค่า · เห็นความสัมพันธ์ · เรียนรู้" },
        { featureId: "sites", label: "PUBLISH", value: "host · share · persist · evolve" }
      ],
      featureIds: ["visualizations", "sites"]
    },
    {
      id: "ambient-control",
      chapter: "workflows",
      type: "signals",
      eyebrow: "WORKFLOWS / 05",
      title: "ไม่ต้องเฝ้าหน้าจอ\nก็รู้ว่างานไปถึงไหน",
      lead: "เลือก signal ให้เหมาะกับระดับความสนใจ: notification สำหรับเหตุการณ์, Pet สำหรับ ambient status, Codex Micro สำหรับ physical control",
      signals: [
        { featureId: "notifications", code: "PING", state: "Needs attention" },
        { featureId: "pets", code: "GLOW", state: "Ambient status" },
        { featureId: "codex-micro", code: "TOUCH", state: "Physical control" }
      ],
      featureIds: ["notifications", "pets", "codex-micro"]
    },
    {
      id: "capabilities",
      chapter: "capabilities",
      type: "chapter",
      eyebrow: "02 / CAPABILITIES",
      title: "เข้าใจ\nสร้าง\nและลงมือทำ",
      lead: "Capabilities คือเครื่องมือที่ทำให้ ChatGPT ออกไปเห็นข้อมูล ใช้ interface และสร้าง artifact ได้มากกว่าการตอบข้อความ",
      count: "10",
      featureIds: ["browser", "computer-use", "voice", "plugins", "web-search", "image-generation", "image-inputs", "appshots", "chrome-extension", "work-with-files"]
    },
    {
      id: "three-webs",
      chapter: "capabilities",
      type: "compare",
      eyebrow: "CAPABILITIES / WEB",
      title: "Search ≠ Browse\n≠ Your Chrome",
      lead: "ทั้งสามแตะเว็บเหมือนกัน แต่ใช้ context และสิทธิ์คนละแบบ",
      comparisons: [
        { featureId: "web-search", cue: "FIND", headline: "Web search", body: "หา current information พร้อม sources" },
        { featureId: "browser", cue: "ACT", headline: "Browser", body: "เปิดและใช้งานเว็บใน browser profile แยก" },
        { featureId: "chrome-extension", cue: "CONTEXT", headline: "Chrome extension", body: "ใช้ tab และ signed-in session ใน Chrome ของคุณ" }
      ],
      featureIds: ["web-search", "browser", "chrome-extension"]
    },
    {
      id: "gui-bridge",
      chapter: "capabilities",
      type: "focus",
      eyebrow: "CAPABILITIES / GUI",
      title: "เมื่อ Workflow\nอยู่ใน GUI",
      lead: "Computer use เติมช่องว่างเมื่อไม่มี API, CLI หรือ plugin ที่เหมาะกว่า—แต่ทุก click ยังต้องอยู่ใต้ permission และการ review ของคุณ",
      statement: "SEE → DECIDE → ACT → VERIFY",
      points: ["ใช้ structured integration ก่อนเมื่อมี", "กำหนดจุดที่ต้องหยุดขอ approval", "ตรวจ state หลัง action ทุกครั้ง"],
      featureIds: ["computer-use"]
    },
    {
      id: "see-and-say",
      chapter: "capabilities",
      type: "versus",
      eyebrow: "CAPABILITIES / CONTEXT",
      title: "พูดสิ่งที่ต้องการ\nแสดงสิ่งที่เห็น",
      lead: "Voice ช่วย steer งานโดยไม่พิมพ์ ส่วน Appshots ส่ง state ของหน้าต่าง macOS เข้า chat พร้อม visual context",
      choices: [
        { featureId: "voice", label: "VOICE", value: "start · check · steer · delegate" },
        { featureId: "appshots", label: "APPSHOT", value: "capture · inspect · annotate · fix" }
      ],
      featureIds: ["voice", "appshots"]
    },
    {
      id: "image-loop",
      chapter: "capabilities",
      type: "pipeline",
      eyebrow: "CAPABILITIES / VISUAL",
      title: "ภาพเป็นทั้ง Context\nและ Output",
      lead: "แนบภาพให้เห็นปัญหา สร้างหรือแก้ visual จากโจทย์ แล้วตรวจผลด้วยภาพอีกครั้ง—วงจร visual QA ที่ปิดได้ใน chat เดียว",
      stages: [
        { featureId: "image-inputs", label: "INPUT", text: "screenshot / mockup / diagram" },
        { featureId: "image-generation", label: "CREATE", text: "generate / edit / variant" },
        { featureId: "image-inputs", label: "VERIFY", text: "crop / compare / inspect" }
      ],
      featureIds: ["image-inputs", "image-generation"]
    },
    {
      id: "files-are-work",
      chapter: "capabilities",
      type: "focus",
      eyebrow: "CAPABILITIES / ARTIFACTS",
      title: "ไฟล์ไม่ใช่ Attachment\nแต่คือ Working Artifact",
      lead: "ระบุโครงสร้าง ตำแหน่งบันทึก และวิธีตรวจให้ครบ เพื่อให้ document, slide, sheet หรือ PDF พร้อมส่งต่อจริง",
      statement: "CREATE → RENDER → REVIEW → REFINE",
      points: ["บอกชนิดไฟล์และโครงสร้าง", "ใช้ annotation ชี้ตำแหน่งที่ต้องแก้", "เปิดด้วย viewer ที่เหมาะสมเพื่อตรวจ layout"],
      featureIds: ["work-with-files"]
    },
    {
      id: "install-workflows",
      chapter: "capabilities",
      type: "focus",
      eyebrow: "CAPABILITIES / EXTEND",
      title: "ติดตั้งวิธีทำงาน\nไม่ใช่แค่ Tool",
      lead: "Plugin รวม instructions และ access ที่เกี่ยวข้องไว้เป็น workflow เดียว—skills บอกวิธีทำ ส่วน connectors/MCP tools เชื่อมข้อมูลและ action",
      statement: "PLUGIN = WORKFLOW + TOOLS + CONTEXT",
      points: ["ติดตั้งจาก universal directory", "authorize service เฉพาะที่ต้องใช้", "เริ่ม chat/session ใหม่หลังติดตั้ง"],
      featureIds: ["plugins"]
    },
    {
      id: "reference",
      chapter: "reference",
      type: "chapter",
      eyebrow: "03 / REFERENCE",
      title: "Control surface\nสำหรับคนที่อยาก\nทำงานเร็วขึ้น",
      lead: "Commands และ Settings ลดแรงเสียดทาน ส่วน Troubleshooting ทำให้รู้ว่าจะตรวจชั้นไหนเมื่อระบบไม่เป็นไปตามคาด",
      count: "04",
      featureIds: ["commands", "slash-commands", "settings", "troubleshooting"]
    },
    {
      id: "command-the-flow",
      chapter: "reference",
      type: "versus",
      eyebrow: "REFERENCE / CONTROL",
      title: "คำสั่งที่ถูกจังหวะ\nลดการคลิกซ้ำ",
      lead: "Keyboard commands เดินทางใน app; Slash commands เปลี่ยน state และ workflow ของ active chat",
      choices: [
        { featureId: "commands", label: "APP COMMANDS", value: "navigate · open · search · toggle" },
        { featureId: "slash-commands", label: "SLASH COMMANDS", value: "/plan · /goal · /status · /review" }
      ],
      featureIds: ["commands", "slash-commands"]
    },
    {
      id: "tune-and-recover",
      chapter: "reference",
      type: "versus",
      eyebrow: "REFERENCE / RECOVERY",
      title: "ตั้งค่าให้เข้ากับงาน\nและรู้ทางออกเมื่อสะดุด",
      lead: "Settings ปรับพฤติกรรมปกติให้เหมาะกับคุณ; Troubleshooting แยก surface, version, path และ permission เมื่อเกิดปัญหา",
      choices: [
        { featureId: "settings", label: "TUNE", value: "behavior · shortcuts · permissions" },
        { featureId: "troubleshooting", label: "RECOVER", value: "symptom · layer · evidence · fix" }
      ],
      featureIds: ["settings", "troubleshooting"]
    },
    {
      id: "feature-finder",
      chapter: "explore",
      type: "finder",
      eyebrow: "INTERACTIVE INDEX",
      title: "ควรใช้ Feature ไหน?",
      lead: "ค้นหรือกรอง 22 Features แล้วเปิด detail เพื่อดู When to use, How to start, availability, limitations และ official source",
      featureIds: features.map((feature) => feature.id)
    },
    {
      id: "one-real-workflow",
      chapter: "explore",
      type: "journey",
      eyebrow: "PUT IT TO WORK",
      title: "หนึ่งงานจริง\nใช้หลาย Feature",
      lead: "อย่าเปิดทุก Tool พร้อมกัน ให้เพิ่ม Feature ตาม bottleneck ของงาน",
      journey: [
        { featureId: "projects", label: "FRAME", text: "รวม brief และ context" },
        { featureId: "web-search", label: "GROUND", text: "หา current sources" },
        { featureId: "long-running-work", label: "EXECUTE", text: "นิยาม Done แล้วเดินงาน" },
        { featureId: "work-with-files", label: "CREATE", text: "สร้าง artifact ที่ส่งต่อได้" },
        { featureId: "browser", label: "VERIFY", text: "ตรวจจากของที่ render จริง" },
        { featureId: "notifications", label: "RETURN", text: "กลับมาเมื่อพร้อม review" }
      ],
      featureIds: ["projects", "web-search", "long-running-work", "work-with-files", "browser", "notifications"]
    },
    {
      id: "official-sources",
      chapter: "sources",
      type: "sources",
      eyebrow: "OFFICIAL SOURCES ONLY",
      title: "เริ่มจาก Outcome\nแล้วให้ Feature\nทำหน้าที่ของมัน",
      lead: "รายละเอียดและ availability เปลี่ยนได้ โปรดเปิดเอกสารทางการก่อนใช้กับ workflow สำคัญ",
      featureIds: features.map((feature) => feature.id)
    }
  ];

  window.FEATURE_ATLAS = {
    meta: {
      title: "ChatGPT + Codex Features",
      description: "Web Slide ภาษาไทยอธิบาย 22 Features จากเอกสารทางการ OpenAI",
      officialOverview: "https://learn.chatgpt.com/docs/features",
      checkedAt: "3 สิงหาคม 2026",
      counts: { workflows: 8, capabilities: 10, reference: 4 }
    },
    categories: {
      workflows: { label: "Workflows", thai: "จัดงานให้เดินต่อ", code: "W" },
      capabilities: { label: "Capabilities", thai: "เข้าใจ สร้าง ลงมือทำ", code: "C" },
      reference: { label: "Reference", thai: "ควบคุมและแก้ปัญหา", code: "R" }
    },
    features,
    slides
  };
})();
