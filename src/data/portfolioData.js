export const profileData = {
  name: "Satria Bagaskara",
  title: "IT Professional | Data Analyst | IT App Support",
  subtitle: "Portfolio Profesional",
  description:
    "Seorang profesional IT dengan pengalaman di bidang Data Analysis, IT Application Support, QA Testing, dan IT Support di lingkungan kesehatan.",
  stats: [
    { value: "4+", label: "Tahun Pengalaman" },
    { value: "559", label: "Fasyankes Dikelola" },
    { value: "24/7", label: "Support Online" },
  ],
};

export const servicesData = [
  {
    id: 1,
    icon: "data",
    title: "Data Analysis",
    description:
      "Analisis data menggunakan Python, SQL, Tableau, Power BI & Data Studio untuk insight strategis.",
  },
  {
    id: 2,
    icon: "support",
    title: "IT App Support",
    description:
      "Implementasi & monitoring sistem informasi kesehatan (SIMRS, SIMKLINIK, SIMPUS) di 559 fasyankes.",
  },
  {
    id: 3,
    icon: "testing",
    title: "QA & Tech Writer",
    description:
      "Manual testing UI/UX, API testing dengan Postman, validasi database, dan pembuatan dokumentasi teknis.",
  },
  {
    id: 4,
    icon: "it",
    title: "IT Support",
    description:
      "Helpdesk, manajemen jaringan, infrastruktur komunikasi, dan integrasi sistem di rumah sakit.",
  },
];

export const experienceData = [
  { skill: "Python & SQL", percentage: 85 },
  { skill: "Data Visualization", percentage: 88 },
  { skill: "IT Application Support", percentage: 95 },
  { skill: "QA Testing", percentage: 80 },
  { skill: "Technical Writing", percentage: 82 },
  { skill: "System Integration", percentage: 90 },
  { skill: "IT Support & Helpdesk", percentage: 92 },
  { skill: "Project Management", percentage: 78 },
];

export const portfolioItems = [
  {
    id: 1,
    title: "Data Analyst",
    company: "Bootcamp MySkill",
    color: "#ef7e27ff",
    period: "2023",
    subtitle: "DATA ANALYST PORTFOLIO",
    tagline: "Bekerja dengan data, memberikan wawasan, menciptakan perubahan.",
    description:
      "Sertifikat Data Analysis: Fullstack Intensive Bootcamp — Melatih kemampuan mengolah data mulai dari basic statistik hingga visualisasi interaktif.",
    coreEcosystem: [
      {
        name: "Python",
        role: "Data Preparation & ETL Automation",
        detail:
          "Data Wrangling, Data Cleansing, dan ETL Scripting. Ekstraksi data mentah, membersihkan anomali, dan mengotomatiskan transformasi data (pipeline).",
      },
      {
        name: "SQL",
        role: "Data Extraction & Data Modeling",
        detail:
          "Merancang skema relasional, melakukan ekstraksi data bersyarat (querying), serta menyatukan berbagai sumber tabel untuk menghasilkan data mart.",
      },
      {
        name: "Tableau",
        role: "Visualization & Data Transformation",
        detail:
          "Exploratory Data Analysis tingkat lanjut dan Interactive Dashboarding untuk stakeholder drill-down.",
      },
      {
        name: "Power BI",
        role: "Visualization & Data Transformation",
        detail: "Dashboard interaktif untuk analisis finansial dan operasional.",
      },
      {
        name: "Data Studio",
        role: "Visualization & Data Transformation",
        detail: "Visualisasi data eksploratif untuk tren bisnis dan perilaku konsumen.",
      },
    ],
    certifications: [
      "Basic Statistic",
      "Introduction to Problem Solving",
      "Data Formatting dan Validation",
      "SQL Basic - For Data Analysis",
      "Data Analysis with Python",
      "Data Visualization",
    ],
    tools: ["Python", "SQL", "Data Studio", "Basic Statistic", "Problem Solving", "Excel", "Gsheet", "Big Query"],
    projects: [
      {
        id: "p1",
        number: "01",
        name: "E-Commerce Analysis",
        domain: "Retail",
        stack: "Python, PostgreSQL",
        visualization: "Data Studio",
        description:
          "Analisis perilaku konsumen olist store di E-Commerce Brasil untuk meningkatkan retensi dan efisiensi pengiriman.",
        highlights: [
          "Analisis RFM untuk segmentasi loyalitas pelanggan.",
          "Identifikasi korelasi antara biaya kirim dan churn rate.",
          "Analisa tren pesanan & pendapatan bulanan.",
        ],
        links: [
          { label: "GITHUB", url: "#" },
          { label: "DATA STUDIO", url: "#" },
          { label: "MEDIUM", url: "#" },
        ],
      },
      {
        id: "p2",
        number: "02",
        name: "AdventureWork: Inventory & Product Performance Analysis",
        domain: "Manufacturer",
        stack: "Python, PostgreSQL",
        visualization: "Tableau",
        description:
          "Evaluasi performa penjualan produk dan analisis kesehatan persediaan secara end-to-end, mulai dari ekstraksi data mentah hingga visualisasi interaktif dengan analisis diagnostik dan prediktif (RCA, Corrective, Preventive).",
        highlights: [
          "Inventory to Sale (Lead Time)",
          "Product Quality & Return Rate",
          "Regional Demand Analytics",
          "Sales Trend",
        ],
        links: [
          { label: "GITHUB", url: "#" },
          { label: "TABLEAU", url: "#" },
          { label: "MEDIUM", url: "#" },
        ],
      },
      {
        id: "p3",
        number: "03",
        name: "BPJS Inpatient Analytics",
        domain: "Insurance",
        stack: "Power Query",
        visualization: "Power BI",
        description:
          "Dashboard analitik strategis untuk mengevaluasi efisiensi operasional, keberlanjutan finansial, dan dinamika kepesertaan sistem JKN/BPJS berdasarkan analisis diagnosis pasien rawat inap tahun 2014-2018.",
        highlights: [
          "Pilar 1: Operasional & Mutu Klinis",
          "Pilar 2: Evaluasi Finansial & Efisiensi",
          "Pilar 3: Kepesertaan & Kebijakan Publik",
        ],
        links: [
          { label: "GITHUB", url: "#" },
          { label: "MEDIUM", url: "#" },
        ],
      },
      {
        id: "p4",
        number: "04",
        name: "Hemodialysis Analytics",
        domain: "Hospital",
        stack: "Python, PostgreSQL",
        visualization: "Tableau",
        description:
          "Analitik kinerja finansial dan operasional layanan Hemodialisa sepanjang tahun 2025 dari puluhan ribu riwayat kunjungan pasien, rincian biaya pemeriksaan, hingga detail resep obat.",
        highlights: [
          "Analisis Tingkat Pasien",
          "Analisis Makro & Demografi",
          "Analisis Keuangan & Pembayaran",
          "Analisis Layanan & Operasional",
        ],
        links: [
          { label: "GITHUB", url: "#" },
          { label: "TABLEAU", url: "#" },
          { label: "MEDIUM", url: "#" },
        ],
      },
      {
        id: "p5",
        number: "05",
        name: "Hospital Sentiment Analysis",
        domain: "Hospital",
        stack: "Python, Web Scraping",
        visualization: "Tableau",
        description:
          "Mengekstraksi, membersihkan, dan menganalisis ulasan pasien dari Google Maps terhadap 5 rumah sakit di wilayah Kota Tangerang dan Kabupaten Tangerang menggunakan analisis sentimen dan NLP.",
        highlights: [
          "Web Scraping untuk Data Extraction",
          "Analisis Rata Rata Rating Per Rumah Sakit",
          "Analisis Distribusi Sentimen",
          "Analisis Reviews Patient",
        ],
        links: [
          { label: "GITHUB", url: "#" },
          { label: "TABLEAU", url: "#" },
          { label: "MEDIUM", url: "#" },
        ],
      },
      {
        id: "p6",
        number: "06",
        name: "Sertifikat Data Analysis: Fullstack Intensive Bootcamp",
        domain: "Course",
        stack: "Python, SQL, Data Studio",
        visualization: "Data Studio",
        description:
          "Bootcamp intensif MySkill yang melatih pengolahan data dari basic statistik hingga visualisasi. Batch 25 — December 3, 2025 - January 16, 2026.",
        highlights: [
          "Basic Statistic",
          "Introduction to Problem Solving",
          "Data formatting dan Validation",
          "SQL Basic - For Data Analysis",
          "Data Analysis with Python",
          "Data Visualization",
        ],
        links: [],
      },
    ],
    dampakStrategis:
      "Penguasaan multi-platform visualisasi (Tableau, Power BI, Data Studio) memungkinkan saya untuk menyesuaikan solusi dengan kebutuhan infrastruktur perusahaan yang berbeda-beda.",
    links: [
      { label: "GITHUB", url: "https://github.com/bagaskara0506" },
      { label: "TABLEAU", url: "#" },
      { label: "MEDIUM", url: "#" },
    ],
  },
  {
    id: 2,
    title: "IT App Support",
    company: "PT Administrasi Medika",
    color: "#6c3ce0",
    period: "17 Maret 2023 - Sekarang",
    subtitle: "IT Application Support - Sistem Informasi Kesehatan",
    description: "Sistem: Healthical (SIMRS, SIMKLINIK, SIMPUS)",
    highlights: [
      {
        value: "559",
        label: "TOTAL FASYANKES AKTIF",
        desc: "Ditangani & Dimonitor",
      },
      {
        value: "500+",
        label: "TITIK IMPLEMENTASI",
        desc: "RS, Klinik, Puskesmas, Dokter Mandiri",
      },
      {
        value: "Cloud & On-Premise",
        label: "SERVER MONITORING",
        desc: "Pemantauan Stabilitas Server & Sistem Faskes",
      },
    ],
    coreSystems: ["SIMRS (Rumah Sakit)", "SIMKLINIK (Klinik)", "SIMPUS (Puskesmas)", "Aplikasi Praktek Mandiri"],
    manajemenInsiden: [
      "Penanganan kendala teknis (troubleshooting) sistem secara cepat dan tepat untuk ratusan fasilitas pelayanan kesehatan.",
      "Melakukan kunjungan klien/vicon secara berkala untuk koordinasi operasional, evaluasi sistem, dan demonstrasi fitur terbaru.",
      "Pelaporan dan pencatatan komprehensif menggunakan Spreadsheet, Web Ticketing, WA dan media lainnya untuk tracking proses kerja tim.",
      "Koordinasi lintas divisi (internal) dan (external): pihak klien, regulator (Kemenkes & BPJS), Vendor LIS & PACS.",
    ],
    pengembangan: [
      "Mengawal siklus pengembangan (new features, new modules, modifications).",
      "Menganalisa dan merancang penyesuaian sistem agar sejalan dengan kebijakan regulator dan kebutuhan bisnis klien.",
      "Terlibat aktif dalam proses User Acceptance Testing (UAT) bersama pihak regulator dan stakeholder.",
      "Mengambil keputusan strategis terkait penentuan prioritas penyelesaian tugas, masalah (bug), dan fitur pengembangan.",
    ],
    integrasiRegulator: [
      "SATU SEHAT Kemenkes: Pengiriman data kesehatan ke platform nasional satu sehat.",
      "RME Kemenkes: Standarisasi Rekam Medis Elektronik, & Integrasi iDRG.",
      "BPJS Kesehatan: V-Claim, PCare, Antrol, Jadwal Operasi, Tempat Tidur, iCare, eKlaim, Apotek Online & Lainnya.",
    ],
    integrasiMedis: [
      "LIS (Laboratory Info System): Integrasi sistem alat laboratorium dengan HIS.",
      "PACS (Radiology): Integrasi sistem alat radiologi dengan HIS.",
      "KIOSK Mesin Antrean: Integrasi mesin pendaftaran pasien mandiri dengan HIS.",
    ],
    pilotProject: [
      { name: "RSUD Gema Santi", location: "Nusa Penida, Bali" },
      { name: "Puskesmas Dinkes", location: "Banggai Laut, Sulawesi Tengah" },
      { name: "Klinik Hanuro", location: "Bekasi, Jawa Barat" },
      { name: "KPRI Kita", location: "Depok, Jawa Barat" },
    ],
    links: [],
  },
  {
    id: 3,
    title: "QA & Tech Writer",
    company: "Tokokupon (Gemogi)",
    color: "#e91e63",
    period: "1 Juli 2024 - 30 September 2024",
    subtitle: "Ensuring Seamless Digital Ecosystems",
    lokasi: "PJS Tower, Lantai 7, Jakarta Barat",
    description:
      "Platform online isi ulang pulsa, voucher game, voucher layanan digital (video & langganan digital), & PPOB.",
    platformOverview: [
      "Layanan isi ulang pulsa & paket data seluruh operator.",
      "Penyediaan voucher game populer berskala nasional.",
      "Voucher layanan digital & video streaming berlangganan.",
      "Sistem pembayaran tagihan PPOB terpadu.",
    ],
    qaDetail: [
      "Manual Testing: Mengeksekusi uji skenario fungsionalitas UI/UX secara berkala guna memastikan user journey bebas dari hambatan teknis.",
      "API Testing: Melakukan validasi respons server, integrasi data, dan keamanan transaksi payload menggunakan Postman.",
      "Database Checking: Melakukan audit dan verifikasi data transaksi pada sisi backend menggunakan DBeaver.",
    ],
    technicalWriting: [
      "Menyusun panduan pengembang (Developer Guidelines) untuk standarisasi tim teknis.",
      "Membuat panduan pengguna (User Manual) komprehensif bagi pelanggan dan administrator sistem.",
    ],
    toolsByCategory: [
      { category: "Testing & Database", tools: ["Postman", "DBeaver"] },
      { category: "Project Management", tools: ["Asana", "Miro"] },
      { category: "Documentation & Design", tools: ["Notion", "Coda", "Canva"] },
    ],
    tools: ["Postman", "DBeaver", "Asana", "Miro", "Notion", "Coda", "Canva", "Gsheet", "Gdocs", "Gdrive"],
    links: [{ label: "LINK SITE GEMOGI", url: "https://gemogi.com" }],
  },
  {
    id: 4,
    title: "IT Support",
    company: "Rumah Sakit Dinda",
    color: "#009688",
    period: "17 Januari 2022 - 20 Februari 2023",
    subtitle: "Hospital IT Support & Infrastructure",
    lokasi: "Jatiuwung, Kec. Cibodas, Kota Tangerang",
    description:
      "Bertanggung jawab penuh atas penanganan kendala, pemenuhan kebutuhan, pemeliharaan, serta pemantauan kelancaran operasional Rumah Sakit Dinda dari sisi Teknologi Informasi.",
    operasionalHighlights: [
      {
        title: "Dukungan Teknis (Helpdesk)",
        desc: "Menjawab pertanyaan dan menyelesaikan masalah staf rumah sakit melalui berbagai kanal: Personal, Chat, Telepon, Ticket, hingga Email.",
      },
      {
        title: "Kinerja & Keamanan Sistem",
        desc: "Memantau efisiensi jaringan, melakukan pembaruan perangkat lunak, menjaga keamanan informasi, dan menyusun laporan kinerja (Daily & Monthly Report).",
      },
      {
        title: "Manajemen Inventaris & User",
        desc: "Mengelola perangkat/inventaris teknologi, mengatur pembuatan akun pengguna, serta memberikan dan mencabut izin akses (Access Rights Management).",
      },
    ],
    integrasiEkosistem: [
      "Mengintegrasikan sistem informasi medis dan sistem manajemen pasien agar beroperasi secara efisien.",
      "Melakukan mapping data sharing antar departemen RS.",
      "Pengaturan sharing perangkat keras (seperti printer) ke berbagai workstation.",
      "Implementasi metode Remote dengan otoritas ketat untuk penanganan kendala sistem secara cepat.",
    ],
    infrastrukturKomunikasi: [
      "Memastikan Server PABX beroperasi dalam kondisi optimal tanpa gangguan.",
      "Memasang instalasi telepon baru dan menyediakan akses komunikasi telepon internal.",
      "Melakukan pelatihan kepada staf terkait penggunaan perangkat dan sistem baru.",
    ],
    manajemenProyek: [
      "Implementasi & Upgrade: Mengawal peluncuran sistem baru serta peningkatan infrastruktur jaringan rumah sakit.",
      "Kepatuhan Regulasi: Membantu pengembangan sistem yang mengutamakan kemudahan user, namun tetap selaras dengan kebijakan RS dan regulasi pemerintah.",
      "Analisis Fungsionalitas: Memastikan fitur yang dikembangkan adalah fungsionalitas yang benar-benar dibutuhkan.",
    ],
    projectTags: ["IT Project Management", "System Implementation", "Regulatory Compliance", "Daily/Monthly Reporting"],
    links: [],
  },
];

export const contactData = {
  email: "satria.bagaskara.05@gmail.com",
  phone: "+62 812-3456-7890",
  location: "Jakarta, Indonesia",
  social: {
    github: "https://github.com/bagaskara0506",
    linkedin: "https://linkedin.com/in/satria-bagaskara",
    medium: "#",
  },
};
