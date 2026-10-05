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
      id: "remote",
      category: "workflows",
      name: "Codex Remote",
      thaiPromise: "เริ่ม ติดตาม ส่งคำสั่ง อนุมัติ และ review งาน Codex จากมือถือ โดยให้งานรันบน Mac หรือ Windows ที่เชื่อมต่ออยู่",
      whenToUse: "เมื่อต้องออกจากโต๊ะแต่ยังอยากเริ่มงาน ดู progress ตอบคำถาม อนุมัติ action หรือตรวจ changed files, diffs และ test results",
      howToStart: "เปิด Settings > Connections > Control this Mac or PC บน Desktop app แล้วเลือก Set up หรือ Add; จากนั้นสแกน QR ด้วย ChatGPT mobile app ใน account และ workspace เดียวกัน",
      surfaces: ["ChatGPT mobile app", "iOS", "Android", "Desktop app", "macOS", "Windows"],
      availability: "ขึ้นกับ rollout และ workspace settings; host ต้องเปิด Desktop app, awake, online และ sign in ด้วย account/workspace เดียวกัน",
      limitations: "งานยังใช้ permission และ security policy ของ connected host; เครื่องที่ sleep, offline หรือปิด app จะหยุด remote access จนกว่าจะพร้อมอีกครั้ง",
      prompt: "เปิดโปรเจกต์ checkout บน MacBook ตรวจ test ที่ล้มเหลว สรุปสาเหตุ และหยุดขออนุมัติก่อนแก้ไฟล์",
      officialUrl: "https://learn.chatgpt.com/docs/remote"
    },
    {
      id: "sites",
      category: "workflows",
      name: "Sites",
      thaiPromise: "เปลี่ยน prompt หรือ compatible project ให้เป็น hosted website, web app หรือ game ที่ publish, แชร์ และเชื่อมข้อมูลของผู้ชมแต่ละคนผ่าน plugins ได้",
      whenToUse: "เมื่อผลลัพธ์ควรเป็น hosted experience ที่แชร์ เปิดใช้ซ้ำ มี interaction หรือแสดงข้อมูลจาก connected app ตามสิทธิ์ของผู้ชมแต่ละคน",
      howToStart: "ระบุคำว่า website ใน prompt หรือเรียก @Sites แล้วบอก audience, purpose, behavior และข้อมูลที่ต้องใช้; ถ้าต้องใช้ connected data ให้ระบุ plugin และ audience ของ workspace",
      surfaces: ["Web", "Desktop app"],
      availability: "Public beta สำหรับ Plus, Pro, Business, Enterprise และ Edu โดยมี usage limits ตาม plan; plugins ใน Sites ต้องเปิดใน workspace และ Site ต้อง private ต่อ workspace นั้น",
      limitations: "ทุก deployment URL เป็น production; connected data ยังอยู่ใต้สิทธิ์ของผู้ชมแต่ละคน และ write action ต้องเปิดใช้พร้อม user action/consent; CLI และ IDE ไม่มี Sites management view",
      prompt: "@Sites สร้าง dashboard งานที่รับผิดชอบจาก connected issue tracker แยกตาม priority มี filters, source links และ Refresh แล้ว publish แบบ private ให้ workspace",
      officialUrl: "https://learn.chatgpt.com/docs/sites"
    },
    {
      id: "build-plugins",
      category: "workflows",
      name: "Build plugins",
      thaiPromise: "เปลี่ยน workflow ที่ทำซ้ำให้เป็น reusable plugin โดยรวม instructions, reference material และ apps หรือ skills ที่จำเป็นไว้ด้วยกัน",
      whenToUse: "เมื่อต้องการให้ ChatGPT ทำงานเดิมตามโครงสร้าง กฎ และตัวอย่างชุดเดียวกัน หรือเตรียม workflow ให้ทีมติดตั้งใช้ต่อ",
      howToStart: "บน ChatGPT web ใน Chat หรือ Work ให้ @ mention Plugin Creator แล้วบอก purpose, inputs, output และ rules พร้อมแนบ template หรือ example จากนั้นทดสอบและปรับก่อนแชร์",
      surfaces: ["Web", "Chat", "ChatGPT Work"],
      availability: "ต้องมีสิทธิ์ Use plugins และ Plugin Creator ต้องเปิดใน workspace; การแก้ plugin เดิมต้องมี edit access",
      limitations: "Workspace plugin ใหม่เริ่มเป็น private; การแชร์และเพิ่มเข้า workspace directory ต้องมี permission แยก; app ใน plugin ไม่เพิ่มสิทธิ์เข้าถึงข้อมูล และผู้ใช้แต่ละคนยังต้อง install, connect และมี access ที่จำเป็น",
      prompt: "@Plugin Creator สร้าง plugin ชื่อ Weekly Brief รับเอกสารที่แนบ สรุปเป็น Overview, Key points และ Open questions ตาม template นี้ หากข้อมูลไม่มีให้ระบุว่าไม่พบ และห้ามแก้ source",
      officialUrl: "https://learn.chatgpt.com/docs/build-plugins"
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
      thaiPromise: "ตั้งงาน recurring หรือให้ supported app event เรียกงานเบื้องหลัง แล้วกลับมาดู active, paused, completed tasks และ run ล่าสุดได้",
      whenToUse: "งานตรวจซ้ำ รายงานประจำ monitoring หรือ workflow ที่ควรเริ่มเมื่อ Gmail, Slack หรือ GitHub มี event ตรงเงื่อนไข",
      howToStart: "ทดสอบ prompt ใน chat ปกติก่อน แล้วสร้าง task ใน Scheduled; บน web/mobile เชื่อม app และบอก event ที่ต้องเฝ้า หรือเลือก schedule ตามเวลา",
      surfaces: ["Web", "Mobile", "Desktop app"],
      availability: "Event-triggered tasks ใช้ได้บน web และ mobile สำหรับ eligible plans ตาม workspace settings; local scheduled task ต้องเปิดเครื่องและ app ไว้",
      limitations: "Event trigger ใช้ Gmail, Slack หรือ GitHub และห้ามรวมกับ time-based schedule ใน task เดียว; Desktop, CLI และ IDE สร้าง event-triggered task ไม่ได้; GPT-5.5 เลิกใช้ 14 ตุลาคม 2026 และงาน Codex แบบ ChatGPT sign-in ควรย้ายเป็น gpt-6-sol เมื่อ plan และ workspace รองรับ",
      prompt: "เมื่อ pull request ที่ติด label urgent มี review หรือ commit ใหม่ ให้สรุปสิ่งที่เปลี่ยน ตรวจ blocker และรายงาน decision ที่ต้องมีคนเลือก",
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
      thaiPromise: "ใช้ animated companion เพื่อเริ่ม Quick Chat ด้วยการพิมพ์หรือเสียง และตามสถานะ Running, Needs input, Ready และ Blocked",
      whenToUse: "เมื่ออยากเริ่ม chat หรือมองเห็นสถานะหลาย chats แบบ glanceable โดยไม่เปิดหน้าต่างหลักตลอดเวลา",
      howToStart: "เลือก Pet หรือ Mini ใน Settings แล้วใช้ /pet; บน desktop กด Option+Space ใน macOS หรือ Windows+Alt+P ใน Windows เพื่อเปิด Quick Chat ใช้ @ เพิ่ม context, $ เลือก skill และ bell ติดตาม threads",
      surfaces: ["Web Work", "Desktop app", "Codex CLI"],
      availability: "floating controls ใช้ได้ใน Desktop app บน macOS และ Windows; web/CLI ขึ้นกับ account, workspace และความสามารถของ terminal",
      limitations: "Quick Chat จาก floating controls อยู่นอก Project; Appshot ส่งเข้า controls ได้เฉพาะ macOS ส่วน Windows เปิดใน main app; custom pet บน desktop เก็บ local และ IDE ไม่รองรับ",
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
      availability: "Codex Micro เป็น limited-run hardware ผ่าน OpenAI Supply Co; Desktop app รองรับ Creator Micro 2 ที่จำหน่ายโดย Work Louder ด้วย",
      limitations: "ต้องมีอุปกรณ์จริง; macOS ต้องให้ Input Monitoring และ push-to-talk ใช้ microphone ของคอมพิวเตอร์",
      prompt: "ตั้ง Agent Keys ให้ตามหก chats ล่าสุด และผูก Command Key หนึ่งปุ่มกับ skill สำหรับสรุปสถานะโครงการ",
      officialUrl: "https://learn.chatgpt.com/docs/features/codex-micro"
    },
    {
      id: "browser",
      category: "capabilities",
      name: "Browser",
      thaiPromise: "ให้ ChatGPT เปิดเว็บไซต์ อ่าน state ปัจจุบัน และทำ multi-step action โดยคุณยังควบคุมอยู่",
      whenToUse: "เปรียบเทียบตัวเลือก ทำงานบนเว็บไซต์ที่ต้อง sign in ตรวจ localhost หรือ review UI จากสิ่งที่ render จริง",
      howToStart: "เปิด built-in browser หรือเรียก @Browser ใน Desktop; บน web/mobile เริ่ม task ใน Work แล้ว sign in ผ่าน flow ที่ ChatGPT แสดงเมื่อเว็บไซต์ต้องยืนยันตัวตน",
      surfaces: ["Web Work", "Mobile Work", "Desktop app"],
      availability: "Built-in browser ไม่มีใน Codex CLI และ IDE extension; website sign-in บน cloud browser ใช้ได้บน web/mobile สำหรับ Plus และ Pro ตาม rollout; งาน visual judgment ควรเลือก GPT-6 Astra เมื่อมี",
      limitations: "Built-in browser automate file upload ไม่ได้; browser และ cloud profiles แยกจาก browser ปกติ; บางเว็บบล็อก automation หรือใช้ CAPTCHA; page content เป็น untrusted input และ sensitive actions ต้อง review",
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
      availability: "รองรับเฉพาะ region และ workspace ที่กำหนดใน ChatGPT Work หรือ Codex; สำหรับงานที่พึ่งพา screenshot หรือ visual judgment มาก ให้เลือก GPT-6 Astra เมื่อมีใน model selector",
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
      howToStart: "เลือก Start voice chat ใน task เดิมหรือ Start new voice chat ใน task ใหม่บน Desktop app; Voice ใช้ conversation และ selected model ของ task นั้น ส่วน iOS ใช้ผ่าน Remote หลัง pair กับเครื่อง",
      surfaces: ["Desktop app", "Remote on iOS"],
      availability: "มีใน Plus, Pro, Business, Edu และ Enterprise ตาม rollout/workspace",
      limitations: "เปิด Voice chat ได้ทีละหนึ่ง chat; availability ขึ้นกับ plan, rollout และ workspace รวมถึง microphone และ Appshots permissions ที่เกี่ยวข้อง",
      prompt: "เปิด Voice แล้วถามสถานะ goal นี้ สรุป blocker และเปลี่ยนลำดับให้แก้ mobile regression ก่อน",
      officialUrl: "https://learn.chatgpt.com/docs/features/voice"
    },
    {
      id: "plugins",
      category: "capabilities",
      name: "Plugins",
      thaiPromise: "ติดตั้ง reusable workflow ที่ bundle skills, MCP servers, browser extensions หรือ hooks ให้ ChatGPT และ Codex เรียกใช้ได้ถูกวิธี",
      whenToUse: "เมื่อต้องทำงานซ้ำด้วยขั้นตอนเฉพาะ เชื่อม Gmail/Drive/Slack/GitHub หรือให้ Codex และ Work อ่าน ค้นหา ร่าง และส่งข้อความผ่าน Apple Messages บน Mac",
      howToStart: "เปิด Plugins directory บน web/Desktop หรือใช้ /plugins ใน Codex CLI; บน mobile ใช้ plugin ที่มีใน account ผ่าน Chat หรือ Work และหลังติดตั้งให้เริ่ม chat/session ใหม่",
      surfaces: ["Web", "Desktop app", "Mobile", "Codex CLI"],
      availability: "ใช้ได้ใน Chat และ Work บน web, desktop และ mobile รวมถึง Codex ใน Desktop app และ Codex CLI; IDE extension ยังไม่รองรับ",
      limitations: "MCP server บางตัวต้อง authorize บริการภายนอก; hooks ไม่รองรับใน cloud-orchestrated ChatGPT Work และ IDE extension ยังไม่รองรับ plugins; Apple Messages ควรคง per-send approval",
      prompt: "ใช้ Apple Messages plugin ค้นหาข้อความล่าสุดกับทีมโครงการ สรุปประเด็น และร่างคำตอบ แต่ขออนุมัติข้อความกับผู้รับก่อนส่ง",
      officialUrl: "https://learn.chatgpt.com/docs/plugins"
    },
    {
      id: "sign-in-with-chatgpt",
      category: "capabilities",
      name: "Sign in with ChatGPT",
      thaiPromise: "ใช้ ChatGPT account ลงชื่อเข้า app หรือ site ที่ร่วมรายการ และแยกอนุญาตให้บาง app ใช้ ChatGPT plan สำหรับ AI requests ที่รองรับ",
      whenToUse: "เมื่อต้องสร้างหรือเชื่อม account กับ partner โดยไม่ตั้ง credential ใหม่ หรืออยากใช้ Codex / ChatGPT Work usage จาก plan เดิมใน app ที่รองรับ",
      howToStart: "เลือก Continue with ChatGPT ใน app หรือ site ตรวจ account information ที่ขอ แล้วพิจารณา permission ใช้ ChatGPT plan แยกจาก permission สำหรับ sign-in",
      surfaces: ["Participating apps", "Partner sites", "ChatGPT Settings"],
      availability: "Sign-in อยู่ใน limited partner trial; การใช้ ChatGPT plan รองรับ eligible Plus และ Pro subscribers ใน supported apps",
      limitations: "การใช้ plan นับรวมใน limits เดิมและ app อาจมีค่าบริการของตนเอง; permission นี้ไม่เปิด conversations หรือ memories และต้องจัดการ app access แยกจาก sign-in",
      prompt: "ก่อนเชื่อม app นี้ ช่วยแยก permissions ที่ขอว่าเป็น sign-in หรือใช้ ChatGPT plan พร้อมบอกผลต่อ usage limit และวิธี disconnect",
      officialUrl: "https://learn.chatgpt.com/docs/sign-in-with-chatgpt"
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
      availability: "บน ChatGPT web ขึ้นกับ plan/workspace; built-in generation ใน Codex ใช้ gpt-image-2 และ batch ใหญ่สามารถใช้ OPENAI_API_KEY ตาม API pricing",
      limitations: "Image generation ใช้ general Codex included limits เร็วกว่างานคล้ายกันที่ไม่สร้างภาพเฉลี่ย 3–5 เท่าตาม quality/size; production typography ต้องตรวจทุกคำ",
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
      thaiPromise: "จับ frontmost app window บน macOS หรือ Windows พร้อม screenshot และ available text เพื่อส่ง state ของแอปเข้า chat",
      whenToUse: "อธิบาย error/settings state, ขอให้ช่วยอ่านเอกสารหรือ UI ที่เปิดอยู่ และชี้จุดแก้โดยไม่ต้องเล่าใหม่ทั้งหมด",
      howToStart: "นำหน้าต่างเป้าหมายขึ้นหน้า แล้วกด Command ทั้งสองปุ่มพร้อมกันบน macOS หรือ Alt ทั้งสองปุ่มบน Windows; macOS อาจขอ Screen & System Audio Recording และ Accessibility",
      surfaces: ["Desktop app", "macOS", "Windows"],
      availability: "สร้าง Appshot ใหม่ได้ใน Desktop app บน macOS และ Windows โดย organization อาจปิดความสามารถนี้",
      limitations: "Appshot เข้า floating controls ได้เฉพาะ macOS ส่วน Windows เปิดใน main app; บาง web apps ส่งได้เพียง visible screenshot และ CLI สร้าง Appshot ใหม่ไม่ได้",
      prompt: "ใช้ Appshot จากหน้าต่าง design tool นี้ แล้วเทียบ implementation กับ spacing, alignment และ typography ที่เห็น",
      officialUrl: "https://learn.chatgpt.com/docs/appshots"
    },
    {
      id: "chrome-extension",
      category: "capabilities",
      name: "Browser extension",
      thaiPromise: "แชร์ context และ signed-in session จาก browser profile ที่ใช้อยู่ให้ ChatGPT ทำงานในแท็บจริงของคุณ",
      whenToUse: "logged-in workflow, งานที่ต้องใช้ tab/session เดิม หรือ side chat ที่ built-in browser แยก profile ทำไม่ได้",
      howToStart: "อัปเดต Desktop app แล้วเปิด Settings > Computer Use; เลือก browser ติดตั้ง extension และเรียก Chrome, Edge, Brave Browser, Opera หรือ Vivaldi ด้วย @-mention",
      surfaces: ["Desktop app", "Chrome", "Edge", "Brave", "Opera", "Vivaldi"],
      availability: "ทั้งห้า browser รองรับ tab mentions และ browser control; Chrome, Edge, Brave และ Vivaldi มี side chat แต่ Opera ไม่มี; rollout ขึ้นกับ workspace",
      limitations: "ข้อมูลในหน้าและ browser history มีความอ่อนไหว; browser ที่รองรับใช้ allowlist/blocklist ร่วมกัน; Chrome file upload ต้องเปิด Allow access to file URLs และ sensitive actions อาจต้อง confirm",
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
      id: "dots-overview",
      category: "dots",
      name: "Overview",
      thaiPromise: "มอบ ongoing responsibility ให้ always-on agent ที่ทำงานต่อใน cloud ใช้ computer และ browser ของตัวเอง แล้วกลับมาหาเมื่อมีผลลัพธ์หรือ decision ที่ต้องการคุณ",
      whenToUse: "งานที่ต้องติดตามหลายวัน เชื่อมข้อมูลจากหลายที่ หรือควรเดินต่อระหว่าง conversations โดยไม่ต้องเริ่ม context ใหม่ทุกครั้ง",
      howToStart: "สร้าง dot ใน Desktop app หรือ desktop browser ตั้งชื่อและรูปลักษณ์ เชื่อม apps หรือ computer เท่าที่จำเป็น แล้วเริ่มจาก responsibility ที่มีแหล่งข้อมูลและขอบเขตชัดเจน",
      surfaces: ["Desktop browser", "Desktop app", "Mobile app", "Slack", "Microsoft Teams"],
      availability: "กำลัง rollout: Pro 100/200/500 สำหรับผู้ใช้อายุเกิน 18 ปีนอก EEA, UK และ Switzerland; Business Premium และ Enterprise rollout ทั่วโลก โดย Enterprise ต้องให้ admin เปิดใช้",
      limitations: "Mobile web ไม่รองรับ; dot อาจทำผิดพลาดและทุก action ยังอยู่ใต้ permissions, approvals และ safeguards; การหยุดงานไม่ย้อน action ที่ทำเสร็จแล้ว",
      prompt: "ช่วยดูแล launch plan นี้ต่อเนื่อง ติดตาม decisions, deadlines และสิ่งที่รอคำตอบ ร่างข้อความให้ review แต่ห้ามส่ง และแจ้งเฉพาะเรื่องที่ต้องตัดสินใจ",
      officialUrl: "https://learn.chatgpt.com/docs/dots"
    },
    {
      id: "dots-getting-started",
      category: "dots",
      name: "Getting started",
      thaiPromise: "ตั้งค่า dot พร้อม context, apps, contact methods และ computer ที่จำเป็น แล้วเริ่มร่วมงานจาก responsibility แรกที่ตรวจผลได้",
      whenToUse: "เมื่อสร้าง dot ใหม่หรือขยายจาก conversation ธรรมดาไปสู่งานที่ต้องติดตามและ follow through ต่อเนื่อง",
      howToStart: "เปิด dots บน desktop เชื่อม email, calendar หรือ files ตามต้องใช้ เลือกว่าจะเชื่อม computer หรือไม่ แล้วอธิบาย outcome, sources, decisions และจังหวะแจ้งเตือน",
      surfaces: ["Desktop browser", "Desktop app", "Mobile app"],
      availability: "ต้องเป็น account ที่ได้รับ rollout; หลังสร้างบน desktop แล้วจึงใช้ dot เดิมใน mobile app ได้เมื่อมี supporting update",
      limitations: "Mobile web ไม่รองรับ; app, messaging channel และ computer เป็นคนละ connection การเชื่อมอย่างหนึ่งไม่ให้สิทธิ์อีกอย่างโดยอัตโนมัติ",
      prompt: "ช่วยดูแล offsite นี้ ใช้ plan และ venue emails เพื่อติดตาม decisions, deadlines และ unanswered questions แจ้งเมื่อฉันต้องตัดสินใจ และร่าง reply ไว้ให้ review",
      officialUrl: "https://learn.chatgpt.com/docs/dots/getting-started"
    },
    {
      id: "dots-messaging",
      category: "dots",
      name: "Messaging",
      thaiPromise: "คุยกับ dot ตัวเดิมผ่าน ChatGPT, voice, Slack หรือ Microsoft Teams โดย memory ไม่เริ่มใหม่เมื่อเปลี่ยน channel",
      whenToUse: "เมื่อต้อง steer งาน เช็ก progress หรือตัดสินใจจากอุปกรณ์และช่องทางที่สะดวกในขณะนั้น",
      howToStart: "เปิด profile ของ dot แล้วเลือก Add เพื่อเชื่อม contact method; ใน Slack ใช้ DM หรือ mention ใน channel/thread และบอกให้ชัดว่าจะเฝ้าอะไร แจ้งที่ไหน และเมื่อใด",
      surfaces: ["ChatGPT", "Voice", "Slack", "Microsoft Teams", "Mobile app"],
      availability: "ChatGPT desktop/web และ voice ใช้ได้ตาม rollout; mobile ต้องมี supporting update; Texting ระบุว่า coming soon",
      limitations: "ข้อความแต่ละ channel ไม่ mirror กัน; การเพิ่ม dot เข้า channel ไม่ได้สร้าง monitoring schedule และ dot ต้องตรวจ permission ก่อนแชร์ข้อมูลจาก private conversation ให้ผู้อื่น",
      prompt: "เก็บ routine progress ไว้ใน ChatGPT แต่ส่ง Slack DM เมื่อ deadline เสี่ยงหรือมี decision ที่ต้องการฉัน พร้อมบอก source และทางเลือก",
      officialUrl: "https://learn.chatgpt.com/docs/dots/channels"
    },
    {
      id: "dots-tasks-memory",
      category: "dots",
      name: "Tasks and memory",
      thaiPromise: "ให้ dot จัดหลาย responsibilities, ใช้ background agents, ทำ recurring work และรักษา notes เกี่ยวกับ preferences, decisions และงานต่อเนื่อง",
      whenToUse: "งานที่ต้องสลับ priority, แบ่งทำ parallel, กลับมาต่อภายหลัง หรือมีทั้ง schedule และ event monitoring",
      howToStart: "อธิบายผลลัพธ์และ sources; สำหรับ recurring task ระบุสิ่งที่ต้องตรวจ เวลาและ timezone สิ่งที่ควรแจ้ง และ destination แล้วขอให้ dot ยืนยัน saved schedule",
      surfaces: ["ChatGPT", "Activity", "Scheduled", "Work", "Codex"],
      availability: "ชนิด task ขึ้นกับ cloud environment, connected computer, apps และ permissions ที่ account มี",
      limitations: "Completed run ไม่ยืนยันว่า outcome ส่งมอบสำเร็จ; task ใหม่ไม่ได้รับทุก conversation อัตโนมัติ และการหยุด active work แยกจากการยกเลิก schedule",
      prompt: "ทุกวันจันทร์ 09:00 Asia/Bangkok ตรวจ launch tracker อัปเดต checklist และแจ้งเฉพาะ deadline ที่เสี่ยงหรือ decision ที่ต้องเลือก จากนั้นยืนยัน schedule ที่บันทึก",
      officialUrl: "https://learn.chatgpt.com/docs/dots/tasks-and-memory"
    },
    {
      id: "dots-computers-apps",
      category: "dots",
      name: "Computers and apps",
      thaiPromise: "ใช้ cloud computer ของ dot เชื่อม personal computer เมื่อจำเป็น และเรียก plugins ด้วย account/permissions ที่อนุญาตไว้",
      whenToUse: "เมื่องานต้องใช้ browser session, local files, code, desktop apps หรือข้อมูลจาก connected services",
      howToStart: "เปิด profile ของ dot เพื่อ inspect cloud computer; เชื่อม personal computer ด้วย Allow access และติดตั้ง/เชื่อม plugin แต่ละตัวที่ต้องใช้",
      surfaces: ["Dot cloud computer", "Desktop app", "Connected computer", "Plugins"],
      availability: "เชื่อม personal computer ได้ครั้งละหนึ่งเครื่อง; เครื่องนั้นต้อง online และเปิด ChatGPT app เมื่อ dot ใช้ local resources",
      limitations: "Cloud browser แยก sessions จาก personal browser; บางเว็บบล็อก cloud browser และ messaging connection ไม่ให้สิทธิ์ inbox, apps หรือ computer โดยอัตโนมัติ",
      prompt: "ใช้ cloud computer ค้นข้อมูลก่อน หากเว็บบล็อก automation ค่อยขอใช้ connected computer และหยุดให้ฉัน sign in หรือ approve action ที่มีผลต่อ account",
      officialUrl: "https://learn.chatgpt.com/docs/dots/computers-and-apps"
    },
    {
      id: "dots-controls",
      category: "dots",
      name: "Controls",
      thaiPromise: "ตรวจ Activity และ Scheduled work กำหนด custom rules เพิ่มเติม และแยกการ pause, stop, cancel หรือ delete ให้ตรงกับงานที่ต้องการหยุด",
      whenToUse: "เมื่อต้อง review delegated work, จำกัด action ที่มีผลต่อ account, เปลี่ยน approval boundary หรือหยุดงานบางส่วน",
      howToStart: "เปิด Activity เพื่อตรวจ task และ requests; เปิด Settings > Personalization > Custom rules เพื่อกำหนด boundary และเปิด Scheduled เพื่อจัดการ recurring tasks",
      surfaces: ["Desktop app", "Activity", "Scheduled", "ChatGPT Settings"],
      availability: "Custom rules และ workspace controls ขึ้นกับ account และนโยบายของ workspace; admin อาจปิดการแก้ rules",
      limitations: "Rules ไม่เพิ่ม app/computer access และไม่ override safeguards; Pause หยุดเฉพาะ main task ไม่หยุด delegated tasks หรือ schedules ส่วน Delete ย้อนกลับไม่ได้",
      prompt: "ตั้ง boundary ให้อ่านข้อมูลและร่างข้อความได้ แต่ต้องถามก่อนส่ง แก้ shared content หรือลบไฟล์ แล้วสรุป active tasks กับ schedules ที่ยังทำงานอยู่",
      officialUrl: "https://learn.chatgpt.com/docs/dots/controls"
    },
    {
      id: "space-overview",
      category: "space",
      name: "Space overview",
      thaiPromise: "รวม Pages, files, spreadsheets, presentations, Sites และ images ไว้ในพื้นที่ที่คุณ ChatGPT และผู้ร่วมงานพัฒนางานร่วมกันได้",
      whenToUse: "project handbook, research hub หรือชุดงานร่วมที่ต้องมีหลาย pages, shared sources และสิทธิ์เข้าถึงตามทีม",
      howToStart: "เปิด Space สร้าง page เดี่ยวหรือ space สำหรับ topic/team แล้วเพิ่ม notes, files หรือ source links ก่อนชวน ChatGPT และ collaborators มาทำงาน",
      surfaces: ["ChatGPT Space", "Pages", "Sites", "Connected apps"],
      availability: "ต้องใช้ account หรือ workspace ที่เปิด Space; content types, connected apps และ sharing options ขึ้นกับ access และ workspace settings",
      limitations: "การแชร์ page ไม่แชร์ private chats หรือ saved memory; linked files รักษาสิทธิ์เดิม แต่ content ที่คัดลอกหรือสรุปลง page จะมองเห็นตามสิทธิ์ของ page",
      prompt: "สร้าง space สำหรับ launch project แยก overview, research, decisions และ meeting notes เชื่อม sources ที่เกี่ยวข้อง และระบุ open questions ที่ยังไม่มีหลักฐาน",
      officialUrl: "https://learn.chatgpt.com/docs/space"
    },
    {
      id: "space-getting-started",
      category: "space",
      name: "Getting started",
      thaiPromise: "เริ่มจาก blank page, notes หรือ conversation แล้วเติม context ให้ ChatGPT จัดโครง สร้าง draft และเตรียมแชร์ด้วยสิทธิ์ที่เหมาะสม",
      whenToUse: "เมื่อต้องเปลี่ยน material ที่กระจัดกระจายให้เป็น page ที่แก้ ตรวจ และส่งต่อได้ หรือรวมหลาย pages เป็น space เดียว",
      howToStart: "เปิด Space > New page ตั้งชื่อ เพิ่ม notes/files/links แล้วเปิด ChatGPT ข้าง page; หากมีหลายหน้าให้สร้าง Space และกำหนดคนกับ access ก่อนแชร์ link",
      surfaces: ["ChatGPT Space", "Pages"],
      availability: "ต้องมี account ที่เปิด Space; recipients, Teams และระดับ permission ที่เลือกได้ขึ้นกับ account และ workspace",
      limitations: "การ invite เข้า space ให้ access แก่ pages ใน space; หากต้องการแชร์เพียงหน้าเดียวให้ใช้ sharing controls ของ page และตรวจผลหลังบันทึก",
      prompt: "จัด notes ใน page นี้เป็น draft ที่มี headings และ bullets รักษาข้อเท็จจริงกับ source links และรวบรวม open questions ไว้ท้ายหน้า",
      officialUrl: "https://learn.chatgpt.com/docs/space/getting-started"
    },
    {
      id: "space-pages",
      category: "space",
      name: "Pages",
      thaiPromise: "สร้าง document แบบ block ที่คุณและ ChatGPT แก้ร่วมกัน พร้อม subpages, comments, mentions, prompts, tasks และ interactive visualizations",
      whenToUse: "notes, plans, research, team handbook หรือ shared reference ที่ต้อง revise เป็นส่วน ๆ และกลับมาใช้ต่อ",
      howToStart: "เลือก New page แล้วใช้ / menu เพิ่ม block; เลือกข้อความเพื่อ Ask for change หรือ Comment และใช้ @ mention คน, ChatGPT, dot, files หรือ chats",
      surfaces: ["ChatGPT Space", "Pages"],
      availability: "Blocks, attribution, agent mentions และ generated content บางชนิดขึ้นกับ access และ controls ที่ account มี",
      limitations: "Generated text/images/visualizations ต้อง review ก่อนแชร์; page อาจ inherit access จาก parent หรือ space และการย้าย section ต้องตรวจขอบเขต block ที่ถูกย้าย",
      prompt: "สร้าง page สรุป launch plan มี decision log, checklist, source links และ Prompt block สำหรับสรุป open decisions พร้อม subpage แยก customer research",
      officialUrl: "https://learn.chatgpt.com/docs/space/pages"
    },
    {
      id: "space-agents",
      category: "space",
      name: "Work with the agent",
      thaiPromise: "ให้ ChatGPT หรือ dot ช่วย draft, research และ revise เนื้อหาใน Page ผ่าน side conversation, selection, inline mention หรือ comment",
      whenToUse: "เมื่อต้องคุยก่อนแก้ทั้งหน้า แก้ข้อความเฉพาะส่วน หรือมอบ request ให้ agent ในจุดที่ collaborators มองเห็น context เดียวกัน",
      howToStart: "เลือกวิธีขอให้ตรงขอบเขต: คุยข้าง page สำหรับงานใหญ่ ใช้ Ask for change กับ selection หรือพิมพ์ @ChatGPT/@dot ในหน้าและ comment สำหรับ request เฉพาะจุด",
      surfaces: ["ChatGPT Space", "Pages", "ChatGPT", "Dots"],
      availability: "Agents, connected tools และ inline controls ที่เสนอขึ้นกับ access ของแต่ละคน",
      limitations: "Keep Updated ยังไม่มีตอน launch; เขียน cadence ใน page ไม่ได้สร้าง schedule ต้องตั้งใน chat แล้วตรวจ saved task, timing, enabled state และผลจาก run จริง",
      prompt: "@ChatGPT ตรวจ source ที่ link ไว้ แล้วแก้เฉพาะย่อหน้าสรุปให้แยก confirmed facts, assumptions และ open questions โดยรักษา decisions เดิม",
      officialUrl: "https://learn.chatgpt.com/docs/space/agents"
    },
    {
      id: "space-collaboration",
      category: "space",
      name: "Collaboration",
      thaiPromise: "แชร์ Page หรือ Space ด้วย View, Comment หรือ Edit แล้ว review เนื้อหา ความเห็น และ agent-assisted changes ร่วมกัน",
      whenToUse: "เมื่อหลายคนต้องอ่าน ให้ feedback หรือร่วมแก้ชุด pages เดียวกันโดยมี ownership และ access ที่ชัดเจน",
      howToStart: "เปิด sharing controls เพิ่มคนหรือ Team เลือกระดับ access บันทึก แล้วให้ collaborator ยืนยันว่าเปิดงานได้ด้วย permission ที่คาดไว้",
      surfaces: ["ChatGPT Space", "Pages", "Sharing controls"],
      availability: "Roles, recipient types, Teams และ sharing options ขึ้นกับ account, workspace และ permission ของผู้จัดการ access",
      limitations: "ถอน direct invite อาจไม่ตัด inherited access จาก parent/space; access ของ linked source แยกจาก page และผู้ที่อ่าน page ได้อาจยังเปิด source ไม่ได้",
      prompt: "ตรวจ sharing ของ space นี้ ระบุ direct กับ inherited access แยกกัน และเสนอสิทธิ์ขั้นต่ำสำหรับคนที่ต้องอ่าน comment หรือ edit โดยไม่เปลี่ยนค่าจนกว่าฉันอนุมัติ",
      officialUrl: "https://learn.chatgpt.com/docs/space/collaboration"
    },
    {
      id: "commands",
      category: "reference",
      name: "Commands",
      thaiPromise: "ใช้ keyboard shortcuts, command menu และ codex:// deep links เพื่อเดินทางและสั่งงาน Desktop app ได้เร็วขึ้น",
      whenToUse: "เปิด chat/settings/folder, ค้น chat, toggle panels หรือ share deep link ให้ทีมเข้าจุดเดียวกัน",
      howToStart: "เปิด Command menu ด้วย Cmd/Ctrl+Shift+P หรือ Cmd/Ctrl+K; ดูและแก้ shortcuts ใน Settings",
      surfaces: ["Desktop app", "macOS", "Windows", "Linux"],
      availability: "Shortcut บางรายการต่างกันตาม OS และสามารถ customize/reset ได้",
      limitations: "Search chats ไม่มี default shortcut; Deep-link parameter ต้อง encode และ experimental native Wayland อาจกระทบ shortcut บน Linux",
      prompt: "ใช้ Cmd/Ctrl+F หาใน chat ปัจจุบัน, Cmd/Ctrl+G ไปผลลัพธ์ถัดไป และกำหนด shortcut สำหรับ Search chats ใน Settings > Keyboard Shortcuts",
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
      title: "36 Features.\nจากคำสั่งเดียว\nสู่ระบบงานที่เดินต่อได้",
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
      lead: "Feature ทั้งหมดแบ่งเป็น 5 กลุ่ม: จัด workflow, เพิ่ม capability, มอบ responsibility ให้ dot, พัฒนางานร่วมกันใน Space และควบคุมระบบด้วย reference",
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
      id: "work-from-phone",
      chapter: "workflows",
      type: "focus",
      eyebrow: "WORKFLOWS / 02",
      title: "ลุกจากโต๊ะได้\nแต่งานยังเดินต่อ",
      lead: "Codex Remote เชื่อม ChatGPT mobile app กับ Mac หรือ Windows ที่ awake และ online เพื่อเริ่ม ส่งคำสั่ง อนุมัติ และ review โดย execution ยังอยู่บน host เดิม",
      statement: "PHONE → CONNECTED HOST → REVIEW",
      points: ["เลือก computer และ project จากมือถือ", "ติดตาม progress ตอบคำถาม และอนุมัติ action", "ตรวจ changed files, diffs และ test results ก่อนตัดสินใจ"],
      featureIds: ["remote"]
    },
    {
      id: "define-done",
      chapter: "workflows",
      type: "goal",
      eyebrow: "WORKFLOWS / 03",
      title: "ให้งานเดินต่อ\nพร้อม Definition of Done",
      lead: "/goal ไม่ใช่คำสั่งให้ทำงานนานขึ้น แต่คือสัญญาที่บอกว่าผลลัพธ์ต้องเป็นอะไร อยู่ใต้ข้อจำกัดใด และตรวจเสร็จอย่างไร",
      formula: ["OUTCOME", "CONSTRAINTS", "VERIFICATION"],
      example: "/goal สร้าง responsive web deck ภาษาไทย อ้างอิง official docs เท่านั้น และจบเมื่อ content checks + desktop/mobile QA ผ่าน",
      featureIds: ["long-running-work"]
    },
    {
      id: "build-repeatable-workflows",
      chapter: "workflows",
      type: "focus",
      eyebrow: "WORKFLOWS / 04",
      title: "อธิบายหนึ่งครั้ง\nแล้วใช้ Workflow ซ้ำได้",
      lead: "Build plugins ใช้ Plugin Creator เปลี่ยน purpose, inputs, output, rules, examples และ reference material ให้เป็น workflow ที่เรียกใช้ซ้ำได้โดยไม่ต้องเขียน code",
      statement: "DESCRIBE → BUILD → TEST → SHARE",
      points: ["เริ่มจากหนึ่ง workflow ที่ขอบเขตชัด", "ทดสอบกับ input จริงก่อนแชร์", "apps ยังใช้สิทธิ์และ connection เดิมของแต่ละคน"],
      featureIds: ["build-plugins"]
    },
    {
      id: "repeat-after-proof",
      chapter: "workflows",
      type: "focus",
      eyebrow: "WORKFLOWS / 05",
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
      eyebrow: "WORKFLOWS / 06",
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
      eyebrow: "WORKFLOWS / 07",
      title: "ไม่ต้องเฝ้าหน้าจอ\nก็รู้ว่างานไปถึงไหน",
      lead: "เลือก signal ให้เหมาะกับระดับความสนใจ: notification สำหรับเหตุการณ์, Pet สำหรับ Quick Chat และ activity, Codex Micro สำหรับ physical control",
      signals: [
        { featureId: "notifications", code: "PING", state: "Needs attention" },
        { featureId: "pets", code: "GLOW", state: "Quick chat + activity" },
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
      count: "11",
      featureIds: ["browser", "computer-use", "voice", "plugins", "sign-in-with-chatgpt", "web-search", "image-generation", "image-inputs", "appshots", "chrome-extension", "work-with-files"]
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
        { featureId: "chrome-extension", cue: "CONTEXT", headline: "Browser extension", body: "ใช้ tab และ signed-in session ใน browser profile ของคุณ" }
      ],
      featureIds: ["web-search", "browser", "chrome-extension"]
    },
    {
      id: "gui-bridge",
      chapter: "capabilities",
      type: "focus",
      eyebrow: "CAPABILITIES / GUI",
      title: "เมื่อ Workflow\nอยู่ใน GUI",
      lead: "Computer use เติมช่องว่างเมื่อไม่มี API, CLI หรือ plugin ที่เหมาะกว่า; งานที่ต้องอาศัย screenshot หรือ visual judgment มากควรเลือก GPT-6 Astra เมื่อพร้อมใช้",
      statement: "SEE → DECIDE → ACT → VERIFY",
      points: ["เลือก GPT-6 Astra สำหรับงาน visual ที่ยาก", "กำหนดจุดที่ต้องหยุดขอ approval", "ตรวจ state หลัง action ทุกครั้ง"],
      featureIds: ["computer-use"]
    },
    {
      id: "see-and-say",
      chapter: "capabilities",
      type: "versus",
      eyebrow: "CAPABILITIES / CONTEXT",
      title: "พูดสิ่งที่ต้องการ\nแสดงสิ่งที่เห็น",
      lead: "Voice ช่วย steer งานโดยไม่พิมพ์ ส่วน Appshots ส่ง state ของหน้าต่าง macOS หรือ Windows เข้า chat พร้อม visual context",
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
      id: "identity-with-boundaries",
      chapter: "capabilities",
      type: "focus",
      eyebrow: "CAPABILITIES / IDENTITY",
      title: "Sign in คือ identity\nPlan usage คืออีก permission",
      lead: "Continue with ChatGPT ช่วยลดขั้นตอนสร้าง account แต่การอนุญาตใช้ ChatGPT plan ต้องพิจารณาแยก และยังนับรวมใน limit เดิม",
      statement: "IDENTITY ≠ PLAN USAGE ≠ APP ACCESS",
      points: ["อ่าน account information ที่ app ขอ", "แยก permission ใช้ plan จาก sign-in", "ตั้ง app limit และรู้วิธี disconnect"],
      featureIds: ["sign-in-with-chatgpt"]
    },
    {
      id: "dots",
      chapter: "dots",
      type: "chapter",
      eyebrow: "03 / CHATGPT DOTS",
      title: "มอบ Responsibility\nให้งานเดินต่อ\nระหว่างบทสนทนา",
      lead: "dot คือ always-on agent ที่รักษา context, ประสาน tasks และกลับมาหาคุณเมื่อมีผลลัพธ์หรือ decision ที่ต้องใช้ judgment",
      count: "06",
      featureIds: ["dots-overview", "dots-getting-started", "dots-messaging", "dots-tasks-memory", "dots-computers-apps", "dots-controls"]
    },
    {
      id: "dot-keeps-moving",
      chapter: "dots",
      type: "focus",
      eyebrow: "CHATGPT DOTS / RESPONSIBILITY",
      title: "ไม่ใช่แค่ตอบหนึ่งครั้ง\nแต่รับผิดชอบให้งานเดินต่อ",
      lead: "เริ่มจาก responsibility ที่มี sources, boundaries และจังหวะขอ decision ชัดเจน แล้ว review สิ่งที่ dot ทำจริงเสมอ",
      statement: "RESPONSIBILITY → FOLLOW THROUGH → DECISION",
      points: ["กำหนด outcome และ source of truth", "บอกว่าอะไรต้องแจ้งหรือขอ approval", "ตรวจ Activity, schedules และผลลัพธ์จริง"],
      featureIds: ["dots-overview", "dots-tasks-memory", "dots-controls"]
    },
    {
      id: "space",
      chapter: "space",
      type: "chapter",
      eyebrow: "04 / CHATGPT SPACE",
      title: "รวม Pages และ Sources\nให้คนกับ Agent\nทำงานบน Context เดียวกัน",
      lead: "Space ทำให้ draft, files, shared pages, Sites และ collaboration อยู่ในพื้นที่เดียว โดยยังรักษาขอบเขตการแชร์และ source permissions",
      count: "05",
      featureIds: ["space-overview", "space-getting-started", "space-pages", "space-agents", "space-collaboration"]
    },
    {
      id: "shared-work-in-space",
      chapter: "space",
      type: "focus",
      eyebrow: "CHATGPT SPACE / SHARED WORK",
      title: "Shared Page ไม่ได้แปลว่า\nทุก Source ถูกแชร์ตาม",
      lead: "จัด pages ให้หา context ง่าย กำหนด View, Comment หรือ Edit เท่าที่จำเป็น และตรวจ inherited access กับ linked sources แยกกัน",
      statement: "CREATE → CONNECT → COLLABORATE → VERIFY ACCESS",
      points: ["แยก page เดี่ยวกับ space ของทีม", "review agent edits ก่อนยอมรับ", "ตรวจ direct, inherited และ source access"],
      featureIds: ["space-overview", "space-agents", "space-collaboration", "space-pages"]
    },
    {
      id: "reference",
      chapter: "reference",
      type: "chapter",
      eyebrow: "05 / REFERENCE",
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
      lead: "ค้นหรือกรอง 36 Features แล้วเปิด detail เพื่อดู When to use, How to start, availability, limitations และ official source",
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
      description: "Web Slide ภาษาไทยอธิบาย 36 Features จากเอกสารทางการ OpenAI",
      officialOverview: "https://learn.chatgpt.com/docs/features",
      checkedAt: "5 ตุลาคม 2026",
      counts: { workflows: 10, capabilities: 11, dots: 6, space: 5, reference: 4 }
    },
    categories: {
      workflows: { label: "Workflows", thai: "จัดงานให้เดินต่อ", code: "W" },
      capabilities: { label: "Capabilities", thai: "เข้าใจ สร้าง ลงมือทำ", code: "C" },
      dots: { label: "ChatGPT dots", thai: "รับผิดชอบและติดตามต่อ", code: "D" },
      space: { label: "ChatGPT Space", thai: "สร้างและร่วมงานบน Pages", code: "S" },
      reference: { label: "Reference", thai: "ควบคุมและแก้ปัญหา", code: "R" }
    },
    features,
    slides
  };
})();
