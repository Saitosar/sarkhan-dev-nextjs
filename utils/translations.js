
const translations = {
    az: {
        locale: "az",
        docTitle: "Sarkhan.dev | Analitik Düşüncə. Praktiki Alətlər.",
        docDesc: "IT Biznes Analitiklər üçün faydalı məqalələr, resurslar və alətlər toplusu.",
        viewAllArticles: "Bütün məqalələrə bax",
        navHome: "Əsas", navBlog: "Blog", navResources: "Resurslar", navAbout: "Haqqımda", navContact: "Əlaqə",
        signInTitle: "Daxil ol",
        signInSubtitle: "Daxil olmaq üçün e-poçtunuzu qeyd edin. Qeyd etdiyiniz e-poçtunuza təhlükəsiz giriş üçün keçid göndəriləcəkdir.",
        signInButton: "Daxil ol",
        signOutButton: "Çıxış",
        verifyTitle: "E-poçtunuzu yoxlayın",
        verifySubtitle: "Giriş üçün keçid e-poçt ünvanınıza göndərildi.",
        heroTitlePart1: "Analitik düşüncə.", heroTitlePart2: "Praktiki alətlər.", heroTitlePart3: "Rəqəmsal gələcək.",
        heroSubtitle: "IT biznes analitiklər üçün faydalı",
        ctaPrimaryAction: "- yoxla, işini sürətləndir",
        ctaPrimaryBrand: "ITBAI",
        ctaSecondary: "Bacarıqlarını artır",
        panelBlog: "Blog", panelResources: "Resurslar", panelAbout: "Haqqımda", panelContact: "Əlaqə",
        blogSectionTitle: "Blog", readMore: "Daha çox oxu", closeButton: "Bağla",
        blogManifestTitle: "Praktiki Məqalələr Bloqu",
        blogManifestText: "Burada mən fintech dünyasından praktiki təcrübəmi bölüşür, mürəkkəb terminləri sadə dillə izah edir və xaosu struktura çevirməyə kömək edən alətlər haqqında danışıram.",
        blogManifestTags: ["Analiz və Tələblər", "Dizayn və Modelləşdirmə", "Agile və Məhsul İdarəçiliyi", "BA Alətləri", "Keyfiyyətin Təminatı", "Soft Skills"],
        blogManifestButton: "Bloqa Keçid",
        backToBlog: "Bloqa Qayıt", 
        prevButton: "Əvvəlki",
        nextButton: "Növbəti",
        resourcesSectionTitle: "Faydalı Resurslar", viewButton: "Bax", downloadButton: "Yüklə",
        resourcesManifestTitle: "Praktiki Resurslar Kitabxanası",
        resourcesManifestText: "Burada siz işinizi asanlaşdırmaq üçün hazır şablonlar, faydalı linklər, yoxlama siyahıları və digər praktiki materialları tapa bilərsiniz.",
        resourcesManifestButton: "Bütün Resurslara Bax",
        navTools: "Alətlər",
        toolsSectionTitle: "AI Alətlər",
        toolsManifestTitle: "Praktiki Artefakt Generatorları",
        toolsManifestText: "Rutin tapşırıqları avtomatlaşdırmaq üçün ixtisaslaşdırılmış alətlər: User Story yaratmaqdan SRD sənədlərinin hazırlanmasına qədər.",
        toolsManifestButton: "Bütün Alətlərə Bax",
        comingSoon: "Tezliklə...",
        toolsGeneratorTitle: "User Story & AC Generatoru",
        toolsGeneratorDescription: "Tələbinizi sərbəst formada təsvir edin, və süni intellekt onu standart artefaktlara çevirəcək.",
        toolsGeneratorPlaceholder: "Nümunə: İstifadəçi məhsulları qiymətə və kateqoriyaya görə filtrləyə bilməlidir...",
        toolsGeneratorButton: "Generatora Keçid",
        toolsGeneratorButtonLoading: "Generasiya edilir...",
        toolsGeneratorSrdTitle: "SRD Generatoru", // <-- YENİ
        toolsGeneratorSrdDescription: "İdeyanızı təsvir edin, və süni intellekt sizin üçün Proqram Təminatı Tələbləri Sənədini (SRD) hazırlayacaq.", // <-- YENİ
        toolsGeneratorSrdButton: "Generasiya et", // <-- YENİ
        toolsGeneratorUserStoryTitle: "User Story",
        toolsGeneratorACTitle: "Qəbul Kriteriyaları (AC)",
        toolsGeneratorCopyButton: "Kopyala",
        toolsGeneratorCopySuccess: "Kopyalandı!",
        toolsGeneratorError: "Xəta baş verdi. Zəhmət olmasa, sorğunuzu dəyişin və ya bir az sonra yenidən cəhd edin.",
        toolsGeneratorIntroSingle: "Sorğunuza əsasən, 1 User Story və onun Qəbul Kriteriyalarını hazırladım.",
        toolsGeneratorIntroMultiple: "Sorğunuz mürəkkəb funksionallığı təmsil edir, buna görə onu {n} User Story-yə böldüm. Hər birinin öz Qəbul Kriteriyaları var.",
        srdCopyMarkdown: "Markdown-ı Kopyala",
        srdCopySuccess: "Kopyalandı!",
        srdDownloadPdf: "PDF Yüklə",
        srdDownloading: "Hazırlanır...",
        srdImproveQuery: "Sorğunu təkmilləşdir",
        backToHome: "Əsas Səhifəyə Qayıt",
        aboutSectionTitle: "Haqqımda", aboutName: "Sərxan Hacıyev",
        aboutShortBio: "10 ildən artıq bank sistemləri sahəsində təcrübəyə malik IT Biznes Analitik.",
        aboutLongBio: `
  <h3>👨‍💼 Mən kiməm</h3>
  <p>10+ illik təcrübəyə malik Senior IT Business Analyst, core banking sistemləri və korporativ inteqrasiyalar üzrə ixtisaslaşmışam. Biznes ehtiyacları ilə texniki icra arasında körpü qururam — bank platformalarını sıfırdan qurmaqdan tutmuş, miqrasiyaları təşkil etməyə və Agile transformasiyalarına rəhbərlik etməyə qədər. Mənim super gücüm? Mürəkkəbliyi aydınlığa çevirmək və həlləri produksiyaya qədər çatdırmaq.</p>

  <h3>🚀 Nələr yaratmışam</h3>
  <ul>
    <li><strong>Sıfırdan Core Banking:</strong> Azərbaycanın ən böyük bankı üçün Zeus Core Banking System-i birgə yaratdım — 7 əsas modulu (Müştərilər, Hesablar, Kreditlər, Depozitlər, Kassa, GL, EOD/SOD) layihələndirdim. Arxitektura qərarlarında iştirak etdim, yoxlama üçün SQL yazdım və sistemin 70%-ni şəxsən test etdim.</li>
    <li><strong>Korporativ miqrasiyalar:</strong> Oracle Flexcube-dan miqrasiyanı idarə etdim, istifadəyə verilmə anında <0,01% delta ilə. Pərakəndə bank əməliyyatları, təkrar kredit xətləri və prosessinqlə inteqrasiya üzrə komandalar arası səyləri koordinasiya etdim.</li>
    <li><strong>50+ mürəkkəb inteqrasiya:</strong> Zeus, prosessinq, CRM, BPM və ödəniş sistemləri arasında API arxitekturasını layihələndirdim. REST API, Swagger/Postman və end-to-end inteqrasiya testləri üzrə ekspert.</li>
    <li><strong>Miqyasda Agile:</strong> 80+ komanda (300+ nəfər) üçün PDLC-nin yenidən dizaynını həyata keçirdim. Komandaları kouçluq etdim, freymvorkları standartlaşdırdım, deploy tezliyini 25% artırdım.</li>
  </ul>

  <h3>💡 Mənim yanaşmam</h3>
  <p>Mən sadəcə tələbləri sənədləşdirmirəm — arxitektorlar və developerlərlə birlikdə həllər yaradıram. Mənim fəlsəfəm: hər hansı vəziyyətdə qüsursuz işləyən ən sadə həlli tapmaq.</p>
  <p>Əsas güclü tərəflər:</p>
  <ul>
    <li>Sistem düşüncəsi və arxitektura yanaşması</li>
    <li>Yüksək texniki dərinlik + biznes anlayışı</li>
    <li>Discovery-dən production-a qədər end-to-end ownership</li>
    <li>Xaosu strukturlaşdırmaq</li>
  </ul>

  <h3>🛠️ Layihələrdən kənar</h3>
  <ul>
      <li><strong>AI-Platformaların yaradılması:</strong> Sarkhan.dev (BA-lar üçün AI alətləri) və aiCV (AI CV generatoru) yaradıcısı — Next.js + AI istifadə edərək solo şəkildə hazırlanmışdır.</li>
      <li><strong>Proseslərin avtomatlaşdırılması:</strong> n8n vasitəsilə avtomatlaşdırma üzrə ekspert — əl əməyini aradan qaldıran intellektual həllər yaradıram.</li>
      <li><strong>Liderlik və mentorluq:</strong> Process Owner, Agile Coach, Matrix Academy-də təlimçi və Franklin Covey sertifikatlı mentor.</li>
  </ul>

  <h3>🎯 Növbəti addım</h3>
  <p><em>"Mənim işim — ideyaların xaosunu aydın, işləyən həllərə çevirməkdir. Bu gün bunu Senior IT BA kimi edirəm. Sabah — System Architect olaraq, geniş miqyaslı ekosistemlər və AI həlləri layihələndirəcəyəm."</em></p>
  <p>Hal-hazırda TOGAF sertifikasiyasına hazırlaşıram, Enterprise Architecture üzərində fokuslanıram.</p>

  <h3>📫 Əlaqə saxlayaq</h3>
  <p>🚀 Əməkdaşlıq axtarırsınız? Gəlin birlikdə bank sistemlərinin gələcəyini quraq. Beynəlxalq komandalarla uzaqdan və hibrid iş imkanlarına açığam, texniki anlayış və insana yönəlik düşüncə ilə transformasiya təşəbbüslərinə töhfə verə bilərəm.</p>
  <p>
    <a href="#about" class="contact-link" style="text-decoration: underline;">Tam Profil</a> • 
    <a href="https://linkedin.com/in/sarkhanhajiyev" target="_blank" rel="noopener noreferrer" class="contact-link" style="text-decoration: underline;">LinkedIn</a> • 
    <a href="#contact" class="contact-link" style="text-decoration: underline;">Əlaqə</a>
  </p>
  <p>
    <strong>Dillər:</strong> İngilis • Rus • Türk • Azərbaycan<br>
    <strong>Məkan:</strong> Bakı, Azərbaycan 🇦🇿
  </p>
`,
        skillsTitle: "Əsas Bacarıqlar",
        skillsListShort: ["Oracle Flexcube 12", "System Integration (API)", "Process Mapping (BPMN/UML)", "Agile & PDLC"],
        skillsList: ["Oracle Flexcube 12", "Zeus (in house)", "Processing (CMS/TWO)", "ELMA BPM", "Mobile bank app", "API design & integration", "SQL (Oracle)", "Jira/Confluence", "BRD/SRS", "Process Mapping (BPMN/UML)", "UAT planning", "Stakeholder management"],
        careerMapTitle: "Karyera Xəritəsi",
        careerHistory: [
            { title: "Baş IT BA - Əsas Bankçılıq və İnteqrasiyalar", company: "Kapital Bank", date: "2024 - Hazırda", desc: "Zeus, Processing, CRM, BPM və xarici sistemlər arasında API-əsaslı kommunikasiya üçün inteqrasiya sahibi." },
            { title: "Proses Sahibi - Agile PDLC Optimizasiyası", company: "Kapital Bank", date: "2023-2024", desc: "80+ komanda üzrə PDLC və Agile idarəetməsinin yenidən dizaynına rəhbərlik." },
            { title: "Agile Kouç - Məhsul və Çatdırılma Transformasiyası", company: "Kapital Bank", date: "2021-2023", desc: "10+ Agile komandasına mentorluq və rəhbərliyə məhsul və çatdırılma mükəmməlliyi üzrə təlimlər." },
            { title: "Aparıcı IT BA - Əsas Bankçılıq Transformasiyası", company: "Kapital Bank", date: "2016-2019", desc: "Flexcube və Processing-i əvəz edən Zeus ABS-nin sıfırdan dizaynı, sənədləşdirilməsi və test edilməsi." },
            { title: "Baş IT Biznes Analitik - Əsas Bankçılıq Sistemləri", company: "Bank of Baku", date: "2014-2016", desc: "Flexcube və kart prosessinq platformaları üçün yeni funksionallıqların çatdırılması." }
        ],
        contactSectionTitle: "Əlaqə", formNamePlaceholder: "Adınız", formEmailPlaceholder: "E-mail ünvanınız", formMessagePlaceholder: "Mesajınız...", formSubmitButton: "Göndər",
        formSubmitting: "Göndərilir...",
        formInquiryLabel: "Müraciətin mövzusu",
        formInquiryPlaceholder: "Mövzunu seçin...",
        formInquiryOptionMentoring: "Mentorluq üçün müraciət",
        formInquiryOptionFeedback: "Geri bildiriş",
        formInquiryOptionOther: "Digər",
        themeToggle: "Temanı dəyişdir",
        langToggle: "Dili dəyişdir",
        validation: { nameRequired: "Ad tələb olunur", emailRequired: "E-mail tələb olunur", emailInvalid: "Yanlış e-mail formatı", messageRequired: "Mesaj tələb olunur", inquiryRequired: "Zəhmət olmasa, mövzunu seçin", messageMin: "Mesaj ən azı 10 simvol olmalıdır" },
        contactInfoTitle: "Əlaqə saxlayın",
        contactInfoText: "Formadan istifadə edərək və ya sosial şəbəkələrdə mənimlə əlaqə saxlaya bilərsiniz.",
        aiSummaryButton: "AI-Xülasə", // (или "AI Summary", "AI-Xülasə")
        aiSummaryLoading: "Analiz edirəm...",
        aiSummaryError: "Xəta. Bir müddət sonra təkrar yoxlayın.",
        aiAssistantWelcome: "Salam! Bu gün sizə necə kömək edə bilərəm?",
        aiAssistantPlaceholder: "Bir şey soruşun...",
        aiAssistantSend: "Göndər",
        navServices: "Xidmətlər",
        servicesSectionTitle: "Xidmətlər",
        mentorshipTitle: "Mentorluq",
        mentorshipDescription: "Fərdi mentorluqla İT Biznes Analizində karyeranı inkişaf etdir.",
        mentorshipIncludesTitle: "Sən nə əldə edəcəksən:",
        mentorshipIncludesList: [
                                    "Fərdi inkişaf planının hazırlanması",
                                    "Praktiki məsləhətlər və real iş nümunələri",
                                    "CV və LinkedIn profilinin optimallaşdırılması + müsahibəyə hazırlıq",
                                    "Davamlı rəy, suallara cavab və şəxsi dəstək"
],
        mentorshipCtaButton: "Müraciət et",
        accountTitle: "Şəxsi kabinet",
        accountLoadError: "Məlumatları yükləmək mümkün olmadı.",
        profileCardTitle: "Profil",
        profileNameLabel: "Ad",
        profileNamePlaceholder: "Sizə necə müraciət edək?",
        profileSaveButton: "Yadda saxla",
        profileSaveSuccess: "Ad uğurla yadda saxlandı!",
        profileSaveError: "Adı yadda saxlamaq mümkün olmadı.",
        signOutButton: "Çıxış",
        planCardTitle: "Tarif planı",
        planCurrent: "Sizin cari plan:",
        planUsage: "SRD istifadə edilib: {used} / {limit}",
        planChangeButton: "Tarifi dəyişmək",
        documentsCardTitle: "Mənim sənədlərim",
        documentsNone: "Siz hələ heç bir SRD sənədi yaratmamısınız.",
        documentsCreateNew: "Yenisini yarat"
    },
    en: {
        locale: "en",
        docTitle: "Sarkhan.dev | Analytical Thinking. Practical Tools.",
        docDesc: "A collection of useful articles, resources, and tools for IT Business Analysts.",
        viewAllArticles: "View all articles",
        navHome: "Home", navBlog: "Blog", navResources: "Resources", navAbout: "About", navContact: "Contact",
        signInTitle: "Sign In",
        signInSubtitle: "Enter your email, and we'll send you a secure link to sign in.",
        signInButton: "Sign In",
        signOutButton: "Sign Out",
        verifyTitle: "Check your email",
        verifySubtitle: "A sign in link has been sent to your email address.",
        heroTitlePart1: "Analytical thinking.", heroTitlePart2: "Practical tools.", heroTitlePart3: "Digital future.",
        heroSubtitle: "Useful for IT business analysts",
        ctaPrimaryAction: "Work faster with",
        ctaPrimaryBrand: "ITBAI",
        ctaSecondary: "Boost your skills",
        panelBlog: "Blog", panelResources: "Resources", panelAbout: "About", panelContact: "Contact",
        blogSectionTitle: "Blog", readMore: "Read more", closeButton: "Close",
        blogManifestTitle: "A Blog of Practical Articles",
        blogManifestText: "Here I share my practical experience from the fintech world, explain complex terms in simple language, and talk about the tools that help turn chaos into structure.",
        blogManifestTags: ["Analysis & Requirements", "Design & Modeling", "Agile & Product Management", "BA Tools", "Quality Assurance", "Soft Skills"],
        blogManifestButton: "Go to Blog",
        backToBlog: "Back to Blog",
        prevButton: "Previous",
        nextButton: "Next",
        resourcesSectionTitle: "Useful Resources", viewButton: "View", downloadButton: "Download",
        resourcesManifestTitle: "Library of Practical Resources",
        resourcesManifestText: "Here you can find ready-to-use templates, useful links, checklists, and other practical materials to make your work easier.",
        resourcesManifestButton: "View All Resources",
        navTools: "Tools",
        toolsSectionTitle: "AI Tools",
        toolsManifestTitle: "Practical Artifact Generators",
        toolsManifestText: "Specialized tools to automate routine tasks: from creating User Stories to generating SRD documents.",
        toolsManifestButton: "Go to Tools",
        comingSoon: "Coming soon...",
        toolsGeneratorTitle: "User Story & AC Generator",
        toolsGeneratorDescription: "Describe your requirement in free-form text, and the AI will formulate it into standard artifacts.",
        toolsGeneratorPlaceholder: "Example: The user should be able to filter products by price and category...",
        toolsGeneratorButton: "Go to Generator",
        toolsGeneratorButtonLoading: "Generating...",
        toolsGeneratorSrdTitle: "SRD Generator", // <-- NEW
        toolsGeneratorSrdDescription: "Describe your idea, and the AI will generate a Software Requirements Document (SRD) for you.", // <-- NEW
        toolsGeneratorSrdButton: "Generate", // <-- NEW
        toolsGeneratorUserStoryTitle: "User Story",
        toolsGeneratorACTitle: "Acceptance Criteria (AC)",
        toolsGeneratorCopyButton: "Copy",
        toolsGeneratorCopySuccess: "Copied!",
        toolsGeneratorError: "An error occurred. Please try rephrasing your request or try again later.",
        toolsGeneratorIntroSingle: "Based on your request, I have created 1 User Story and its Acceptance Criteria.",
        toolsGeneratorIntroMultiple: "Your request represents a complex feature, so I have decomposed it into {n} User Stories, each with its own Acceptance Criteria.",
        srdCopyMarkdown: "Copy Markdown",
        srdCopySuccess: "Copied!",
        srdDownloadPdf: "Download PDF",
        srdDownloading: "Generating...",
        srdImproveQuery: "Improve Request",
        backToHome: "Back to Home",
        aboutSectionTitle: "About", aboutName: "Sarkhan Hajiyev",
        aboutShortBio: "IT Business Analyst with over 10 years of experience in banking systems.",
        aboutLongBio: `
  <h3>👨‍💼 Who I Am</h3>
  <p>Senior IT Business Analyst with 10+ years specializing in core banking systems and enterprise integrations. I bridge the gap between business needs and technical execution — from building banking platforms from scratch to orchestrating migrations and leading Agile transformations. My superpower? Turning complexity into clarity and driving solutions all the way to production.</p>

  <h3>🚀 What I've Built</h3>
  <ul>
    <li><strong>Core Banking from Scratch:</strong> Co-engineered Zeus Core Banking System for Azerbaijan's largest bank — designed 7 core modules (Client, Account, Credit, Deposit, Cash Desk, GL, EOD/SOD). Participated in architectural decisions, wrote SQL for validation, and personally tested 70% of the system.</li>
    <li><strong>Enterprise Migrations:</strong> Led migration from Oracle Flexcube with <0.01% delta at go-live. Coordinated cross-team efforts for retail banking, revolving credit lines, and card processing integration.</li>
    <li><strong>50+ Complex Integrations:</strong> Designed API architecture between Zeus, Processing, CRM, BPM, and payment systems. Expert in REST APIs, Swagger/Postman, and end-to-end integration testing.</li>
    <li><strong>Agile at Scale:</strong> Drove PDLC redesign across 80+ teams (300+ people). Coached teams, standardized frameworks, increased deployment frequency by 25%.</li>
  </ul>

  <h3>💡 My Approach</h3>
  <p>I don't just document requirements — I co-create solutions with architects and developers. My philosophy: find the simplest solution that works flawlessly in any situation.</p>
  <p>Key strengths:</p>
  <ul>
    <li>Systems thinking & architectural mindset</li>
    <li>High technical depth + business acumen</li>
    <li>End-to-end ownership from discovery to production</li>
    <li>Turning chaos into structure</li>
  </ul>

  <h3>🛠️ Beyond Projects</h3>
  <ul>
      <li><strong>Building AI-Powered Platforms:</strong> Creator of Sarkhan.dev (AI tools for BAs) and aiCV (AI CV generator) — built solo using Next.js + AI.</li>
      <li><strong>Process Automation:</strong> Expert in n8n workflow automation — creating intelligent solutions that eliminate manual work.</li>
      <li><strong>Leadership & Mentoring:</strong> Process Owner, Agile Coach, trainer at Matrix Academy, and Franklin Covey certified mentor.</li>
  </ul>

  <h3>🎯 What's Next</h3>
  <p><em>"My job is to turn chaos of ideas into clear, working solutions. Today I do it as a Senior IT BA. Tomorrow — as a System Architect, designing large-scale ecosystems and AI-powered solutions."</em></p>
  <p>Currently preparing for TOGAF certification, focusing on Enterprise Architecture.</p>

  <h3>📫 Let's Connect</h3>
  <p>🚀 Looking for collaboration? Let's build the future of banking systems together. Open to remote and hybrid opportunities with international teams where I can contribute transformation initiatives with both technical insight and human-centered thinking.</p>
  <p>
    <a href="#about" class="contact-link" style="text-decoration: underline;">View Full Profile</a> • 
    <a href="https://linkedin.com/in/sarkhanhajiyev" target="_blank" rel="noopener noreferrer" class="contact-link" style="text-decoration: underline;">LinkedIn</a> • 
    <a href="#contact" class="contact-link" style="text-decoration: underline;">Contact Me</a>
  </p>
  <p>
    <strong>Languages:</strong> English • Russian • Turkish • Azerbaijani<br>
    <strong>Based in:</strong> Baku, Azerbaijan 🇦🇿
  </p>
`,
        skillsTitle: "Core Skills",
        skillsListShort: ["Oracle Flexcube 12", "System Integration (API)", "Process Mapping (BPMN/UML)", "Agile & PDLC"],
        skillsList: ["Oracle Flexcube 12", "Zeus (in house)", "Processing (CMS/TWO)", "ELMA BPM", "Mobile bank app", "API design & integration (REST/JSON/XML)", "SQL (Oracle)", "Swagger/Postman", "Jira/Confluence", "Canva/Draw.io", "BRD", "SRS", "Process Mapping (BPMN/UML)", "API Specifications", "User Story writing", "Acceptance Criteria", "UAT planning & execution", "Functional testing", "Integration testing", "Stakeholder management", "Coaching/mentoring", "Facilitation", "Training", "System thinking", "Problem solving"],
        careerMapTitle: "Career Map",
        careerHistory: [
            { title: "Senior IT BA - Core Banking & Integrations", company: "Kapital Bank", date: "2024 - Present", desc: "Act as integration owner for API-based communication between Zeus, Processing, CRM, BPM and external systems." },
            { title: "Process Owner - Agile PDLC Optimization", company: "Kapital Bank", date: "2023-2024", desc: "Led re-design of PDLC and Agile governance across 80+ teams." },
            { title: "Agile Coach - Product & Delivery Transformation", company: "Kapital Bank", date: "2021-2023", desc: "Mentored 10+ Agile teams and coached leadership on product and delivery excellence." },
            { title: "Lead IT BA - Core Banking Transformation", company: "Kapital Bank", date: "2016-2019", desc: "Designed, documented, and tested Zeus ABS from scratch, replacing Flexcube & Processing modules." },
            { title: "Senior IT Business Analyst - Core Banking Systems", company: "Bank of Baku", date: "2014-2016", desc: "Delivered new features for Flexcube and card processing platforms." }
        ],
        contactSectionTitle: "Contact", formNamePlaceholder: "Your name", formEmailPlaceholder: "Your email", formMessagePlaceholder: "Your message...", formSubmitButton: "Send",
        formSubmitting: "Sending...",
        formInquiryLabel: "Topic of Inquiry",
        formInquiryPlaceholder: "Select a topic...",
        formInquiryOptionMentoring: "Mentorship Request",
        formInquiryOptionFeedback: "Feedback",
        formInquiryOptionOther: "Other",
        themeToggle: "Toggle theme",
        langToggle: "Change language",
        validation: { nameRequired: "Name is required", emailRequired: "Email is required", emailInvalid: "Invalid email format", messageRequired: "Message is required", inquiryRequired: "Please select a topic", messageMin: "Message must be at least 10 characters long" },
        contactInfoTitle: "Get in Touch",
        contactInfoText: "Feel free to reach out using the form or connect with me on social media.",
        aiSummaryButton: "AI-summary", // (или "AI Summary", "AI-Xülasə")
        aiSummaryLoading: "Analyzing...",
        aiSummaryError: "Error. Please, try again later.",
        aiAssistantWelcome: "Hello! How can I help you today?",
        aiAssistantPlaceholder: "Ask something...",
        aiAssistantSend: "Send",
        navServices: "Services",
        servicesSectionTitle: "Services",
        mentorshipTitle: "Mentorship",
        mentorshipDescription: "Level up your career with personalized mentoring in IT Business Analysis.",
        mentorshipIncludesTitle: "What you'll get:",
        mentorshipIncludesList: [
                                    "Personal career plan development",
                                    "Practical advice and real-world examples",
                                    "Resume & LinkedIn profile optimization + interview preparation",
                                    "Continuous feedback, Q&A, and personal support"
],
        mentorshipCtaButton: "Apply Now",
        accountTitle: "My Account",
        accountLoadError: "Failed to load data.",
        profileCardTitle: "Profile",
        profileNameLabel: "Name",
        profileNamePlaceholder: "How should we call you?",
        profileSaveButton: "Save",
        profileSaveSuccess: "Name saved successfully!",
        profileSaveError: "Failed to save name.",
        signOutButton: "Sign Out",
        planCardTitle: "Subscription Plan",
        planCurrent: "Your current plan:",
        planUsage: "SRDs used: {used} of {limit}",
        planChangeButton: "Change Plan",
        documentsCardTitle: "My Documents",
        documentsNone: "You haven't created any SRD documents yet.",
        documentsCreateNew: "Create a new one"
    },
    ru: {
        locale: "ru",
        docTitle: "Sarkhan.dev | Аналитическое мышление. Практичные инструменты.",
        docDesc: "Полезные статьи, ресурсы и инструменты для IT бизнес-аналитиков.",
        viewAllArticles: "Посмотреть все статьи",
        navHome: "Главная", navBlog: "Блог", navResources: "Ресурсы", navAbout: "Обо мне", navContact: "Связь",
        signInTitle: "Вход",
        signInSubtitle: "Введите ваш email, и мы пришлем вам безопасную ссылку для входа.",
        signInButton: "Войти",
        signOutButton: "Выйти",
        verifyTitle: "Проверьте вашу почту",
        verifySubtitle: "Ссылка для входа была отправлена на ваш email.",
        heroTitlePart1: "Аналитическое мышление.", heroTitlePart2: "Практичные инструменты.", heroTitlePart3: "Цифровое будущее.",
        heroSubtitle: "Полезно для IT бизнес-аналитиков",
        ctaPrimaryAction: "Ускоряйся с",
        ctaPrimaryBrand: "ITBAI",
        ctaSecondary: "Прокачай навыки",
        panelBlog: "Блог", panelResources: "Ресурсы", panelAbout: "Обо мне", panelContact: "Связь",
        blogSectionTitle: "Блог", readMore: "Читать далее", closeButton: "Закрыть",
        blogManifestTitle: "Блог практических статей",
        blogManifestText: "Здесь я делюсь практическим опытом из мира финтеха, объясняю сложные термины простым языком и рассказываю об инструментах, которые помогают превращать хаос в структуру.",
        blogManifestTags: ["Анализ и Требования", "Проектирование и Моделирование", "Agile и Управление Продуктом", "Инструменты BA", "Обеспечение Качества", "Soft Skills"],
        blogManifestButton: "Перейти в блог",
        backToBlog: "Вернуться в блог",
        prevButton: "Назад",
        nextButton: "Вперед",
        resourcesSectionTitle: "Полезные ресурсы", viewButton: "Открыть", downloadButton: "Скачать",
        resourcesManifestTitle: "Библиотека практических ресурсов",
        resourcesManifestText: "Здесь вы найдете готовые шаблоны, полезные ссылки, чек-листы и другие практические материалы, которые облегчат вашу работу.",
        resourcesManifestButton: "Перейти ко всем ресурсам",
        navTools: "Инструменты",
        toolsSectionTitle: "AI Инструменты",
        toolsManifestTitle: "Генераторы практических артефактов",
        toolsManifestText: "Специализированные инструменты для автоматизации рутинных задач: от создания User Story до генерации SRD документов.",
        toolsManifestButton: "Перейти к Инструментам",
        comingSoon: "Скоро...",
        toolsGeneratorTitle: "Генератор User Story и AC",
        toolsGeneratorDescription: "Опишите ваше требование в свободной форме, и ИИ сформулирует его в виде стандартных артефактов.",
        toolsGeneratorPlaceholder: "Пример: Пользователь должен иметь возможность фильтровать товары по цене и категории...",
        toolsGeneratorButton: "Перейти к Генератору",
        toolsGeneratorButtonLoading: "Генерация...",
        toolsGeneratorSrdTitle: "Генератор SRD", // <-- НОВЫЙ
        toolsGeneratorSrdDescription: "Опишите вашу идею, и ИИ сгенерирует для вас документ с требованиями к ПО (Software Requirements Document).", // <-- НОВЫЙ
        toolsGeneratorSrdButton: "Сгенерируй", // <-- НОВЫЙ
        toolsGeneratorUserStoryTitle: "User Story",
        toolsGeneratorACTitle: "Критерии Приемки (AC)",
        toolsGeneratorCopyButton: "Копировать",
        toolsGeneratorCopySuccess: "Скопировано!",
        toolsGeneratorError: "Произошла ошибка. Попробуйте переформулировать запрос или повторите попытку позже.",
        toolsGeneratorIntroSingle: "На основе вашего запроса я создал 1 User Story и ее Критерии Приемки.",
        toolsGeneratorIntroMultiple: "Ваш запрос представляет сложную функциональность, поэтому я декомпозировал его на {n} User Story, каждая со своими Критериями Приемки.",
        srdCopyMarkdown: "Копировать Markdown",
        srdCopySuccess: "Скопировано!",
        srdDownloadPdf: "Скачать PDF",
        srdDownloading: "Генерация...",
        srdImproveQuery: "Улучшить запрос",
        backToHome: "Вернуться на Главную",
        aboutSectionTitle: "Обо мне", aboutName: "Сархан Гаджиев",
        aboutShortBio: "IT бизнес-аналитик с более чем 10-летним опытом работы в банковских системах.",
        aboutLongBio: `
  <h3>👨‍💼 Кто я</h3>
  <p>Senior IT Business Analyst с опытом 10+ лет, специализирующийся на системах core banking и корпоративных интеграциях. Я выстраиваю мост между бизнес-потребностями и технической реализацией — от создания банковских платформ с нуля до организации миграций и руководства Agile-трансформациями. Моя суперсила? Превращать сложность в ясность и доводить решения до продакшена.</p>

  <h3>🚀 Что я создал</h3>
  <ul>
    <li><strong>Core Banking с нуля:</strong> Со-разработал Zeus Core Banking System для крупнейшего банка Азербайджана — спроектировал 7 основных модулей (Клиенты, Счета, Кредиты, Депозиты, Касса, GL, EOD/SOD). Участвовал в архитектурных решениях, писал SQL для валидации и лично протестировал 70% системы.</li>
    <li><strong>Корпоративные миграции:</strong> Руководил миграцией с Oracle Flexcube с дельтой <0,01% на момент запуска. Координировал кросс-командные усилия по розничному банкингу, возобновляемым кредитным линиям и интеграции с процессингом.</li>
    <li><strong>50+ сложных интеграций:</strong> Спроектировал API-архитектуру между Zeus, процессингом, CRM, BPM и платёжными системами. Эксперт в REST API, Swagger/Postman и end-to-end тестировании интеграций.</li>
    <li><strong>Agile в масштабе:</strong> Провёл редизайн PDLC для 80+ команд (300+ человек). Коучил команды, стандартизировал фреймворки, увеличил частоту деплоев на 25%.</li>
  </ul>

  <h3>💡 Мой подход</h3>
  <p>Я не просто документирую требования — я со-создаю решения вместе с архитекторами и разработчиками. Моя философия: найти самое простое решение, которое работает безупречно в любой ситуации.</p>
  <p>Ключевые сильные стороны:</p>
  <ul>
    <li>Системное мышление и архитектурный подход</li>
    <li>Высокая техническая глубина + бизнес-понимание</li>
    <li>End-to-end ownership от discovery до production</li>
    <li>Превращение хаоса в структуру</li>
  </ul>

  <h3>🛠️ Помимо проектов</h3>
  <ul>
      <li><strong>Создание AI-платформ:</strong> Создатель Sarkhan.dev (AI-инструменты для BA) и aiCV (AI-генератор резюме) — разработано solo с использованием Next.js + AI.</li>
      <li><strong>Автоматизация процессов:</strong> Эксперт в автоматизации через n8n — создание интеллектуальных решений, устраняющих ручную работу.</li>
      <li><strong>Лидерство и менторство:</strong> Process Owner, Agile Coach, тренер в Matrix Academy и сертифицированный ментор Franklin Covey.</li>
  </ul>

  <h3>🎯 Что дальше</h3>
  <p><em>"Моя работа — превращать хаос идей в чёткие, работающие решения. Сегодня я делаю это как Senior IT BA. Завтра — как System Architect, проектирующий масштабные экосистемы и AI-решения."</em></p>
  <p>В настоящее время готовлюсь к сертификации TOGAF, фокусируюсь на Enterprise Architecture.</p>

  <h3>📫 Давайте на связь</h3>
  <p>🚀 Ищете сотрудничество? Давайте вместе строить будущее банковских систем. Открыт к удалённым и гибридным возможностям в международных командах, где смогу внести вклад в трансформационные инициативы с техническим пониманием и человеко-ориентированным мышлением.</p>
  <p>
    <a href="#about" class="contact-link" style="text-decoration: underline;">Полный профиль</a> • 
    <a href="https://linkedin.com/in/sarkhanhajiyev" target="_blank" rel="noopener noreferrer" class="contact-link" style="text-decoration: underline;">LinkedIn</a> • 
    <a href="#contact" class="contact-link" style="text-decoration: underline;">Связаться</a>
  </p>
  <p>
    <strong>Языки:</strong> Английский • Русский • Турецкий • Азербайджанский<br>
    <strong>Местоположение:</strong> Баку, Азербайджан 🇦🇿
  </p>
`,
        skillsTitle: "Ключевые навыки",
        skillsListShort: ["Oracle Flexcube 12", "Системная интеграция (API)", "Моделирование процессов (BPMN/UML)", "Agile и PDLC"],
        skillsList: ["Oracle Flexcube 12", "Zeus (in house)", "Processing (CMS/TWO)", "ELMA BPM", "Mobile bank app", "Проектирование и интеграция API (REST/JSON/XML)", "SQL (Oracle)", "Swagger/Postman", "Jira/Confluence", "Canva/Draw.io", "BRD", "SRS", "Моделирование процессов (BPMN/UML)", "Спецификации API", "Написание User Story", "Критерии приемки", "Планирование и проведение UAT", "Функциональное тестирование", "Интеграционное тестирование", "Управление стейкхолдерами", "Коучинг/менторство", "Фасилитация", "Проведение тренингов", "Системное мышление", "Решение проблем"],
        careerMapTitle: "Карта карьеры",
        careerHistory: [
            { title: "Ведущий IT БА - Core Banking и Интеграции", company: "Kapital Bank", date: "2024 - настоящее время", desc: "Владелец интеграции для API-взаимодействия между Zeus, процессингом, CRM, BPM и внешними системами." },
            { title: "Владелец Процесса - Оптимизация Agile PDLC", company: "Kapital Bank", date: "2023-2024", desc: "Руководил редизайном PDLC и Agile-управления в 80+ командах." },
            { title: "Agile-коуч - Трансформация Продукта и Поставок", company: "Kapital Bank", date: "2021-2023", desc: "Менторил более 10 Agile-команд и обучал руководство продуктовому и исполнительскому мастерству." },
            { title: "Ведущий IT БА - Трансформация Core Banking", company: "Kapital Bank", date: "2016-2019", desc: "Проектировал, документировал и тестировал АБС Zeus с нуля, заменяя модули Flexcube и Процессинга." },
            { title: "Старший IT-бизнес-аналитик - Core Banking Системы", company: "Bank of Baku", date: "2014-2016", desc: "Отвечал за поставку нового функционала для платформ Flexcube и карточного процессинга." }
        ],
        contactSectionTitle: "Связь", formNamePlaceholder: "Ваше имя", formEmailPlaceholder: "Ваш email", formMessagePlaceholder: "Ваше сообщение...", formSubmitButton: "Отправить",
        formSubmitting: "Отправка...",
        formInquiryLabel: "Тема обращения",
        formInquiryPlaceholder: "Выберите тему...",
        formInquiryOptionMentoring: "Заявка на менторство",
        formInquiryOptionFeedback: "Обратная связь",
        formInquiryOptionOther: "Другое",
        themeToggle: "Сменить тему",
        langToggle: "Сменить язык",
        validation: { nameRequired: "Имя обязательно", emailRequired: "Email обязателен", emailInvalid: "Неверный формат email", messageRequired: "Сообщение обязательно", inquiryRequired: "Пожалуйста, выберите тему", messageMin: "Сообщение должно содержать не менее 10 символов" },
        contactInfoTitle: "Свяжитесь со мной",
        contactInfoText: "Смело пишите мне через форму или свяжитесь со мной в социальных сетях.",
        aiSummaryButton: "AI-Выжимка", // (или "AI Summary", "AI-Xülasə")
        aiSummaryLoading: "Анализирую...",
        aiSummaryError: "Ошибка. Попробуйте позже.",
        aiAssistantWelcome: "Здравствуйте! Чем могу помочь вам сегодня?",
        aiAssistantPlaceholder: "Спросите что-нибудь...",
        aiAssistantSend: "Отправить",
        navServices: "Услуги",
        servicesSectionTitle: "Услуги",
        mentorshipTitle: "Менторство",
        mentorshipDescription: "Продвинь свою карьеру с персональным менторством в сфере IT-бизнес анализа.",
        mentorshipIncludesTitle: "Что вы получите:",
        mentorshipIncludesList: [
                                    "Разработка личного карьерного плана",
                                    "Практические задания и кейсы из реальных IT-проектов",
                                    "Оптимизацию резюме и LinkedIn + подготовку к интервью",
                                    "Постоянную обратную связь, ответы на вопросы и личную поддержку"
],
        mentorshipCtaButton: "Оставить заявку",
        accountTitle: "Личный кабинет",
        accountLoadError: "Не удалось загрузить данные.",
        profileCardTitle: "Профиль",
        profileNameLabel: "Имя",
        profileNamePlaceholder: "Как к вам обращаться?",
        profileSaveButton: "Сохранить",
        profileSaveSuccess: "Имя успешно сохранено!",
        profileSaveError: "Не удалось сохранить имя.",
        signOutButton: "Выйти",
        planCardTitle: "Тарифный план",
        planCurrent: "Ваш текущий план:",
        planUsage: "Использовано SRD: {used} из {limit}",
        planChangeButton: "Сменить тариф",
        documentsCardTitle: "Мои документы",
        documentsNone: "Вы еще не создали ни одного SRD документа.",
        documentsCreateNew: "Создать новый"
    }
};

export { translations };