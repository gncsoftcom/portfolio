/*
 * SİTE İÇERİĞİ
 * Tüm kişisel bilgileri bu dosyadan düzenleyebilirsiniz.
 * Çift dilli alanlar { tr: "...", en: "..." } biçimindedir.
 */
window.SITE_DATA = {
  name: "Ahmet Yılmaz",
  initials: "AY",
  cvUrl: "assets/cv.pdf",

  roles: {
    tr: ["Full-Stack Geliştirici", "Frontend Uzmanı", "Problem Çözücü", "Açık Kaynak Tutkunu"],
    en: ["Full-Stack Developer", "Frontend Specialist", "Problem Solver", "Open Source Enthusiast"]
  },

  tagline: {
    tr: "Hızlı, erişilebilir ve güzel web deneyimleri tasarlıyor ve geliştiriyorum.",
    en: "I design and build fast, accessible and beautiful web experiences."
  },

  about: {
    tr: [
      "Merhaba! Ben İstanbul'da yaşayan bir yazılım geliştiriciyim. Kullanıcı odaklı arayüzler ve ölçeklenebilir arka uç sistemleri geliştirmeyi seviyorum.",
      "Boş zamanlarımda açık kaynak projelere katkıda bulunuyor, teknik yazılar yazıyor ve yeni teknolojileri deniyorum."
    ],
    en: [
      "Hi! I'm a software developer based in Istanbul. I love building user-focused interfaces and scalable back-end systems.",
      "In my free time I contribute to open source projects, write technical articles and experiment with new technologies."
    ]
  },

  stats: [
    { value: "5+", label: { tr: "Yıl Deneyim", en: "Years Experience" } },
    { value: "40+", label: { tr: "Tamamlanan Proje", en: "Projects Completed" } },
    { value: "20+", label: { tr: "Mutlu Müşteri", en: "Happy Clients" } }
  ],

  skills: [
    {
      category: { tr: "Frontend", en: "Frontend" },
      items: [
        { name: "HTML & CSS", level: 95 },
        { name: "JavaScript", level: 90 },
        { name: "React", level: 85 },
        { name: "TypeScript", level: 80 }
      ]
    },
    {
      category: { tr: "Backend", en: "Backend" },
      items: [
        { name: "Node.js", level: 85 },
        { name: "C# / .NET", level: 75 },
        { name: "PostgreSQL", level: 80 },
        { name: "REST & GraphQL", level: 85 }
      ]
    },
    {
      category: { tr: "Araçlar", en: "Tools" },
      items: [
        { name: "Git & GitHub", level: 90 },
        { name: "Docker", level: 70 },
        { name: "Figma", level: 75 },
        { name: "CI/CD", level: 70 }
      ]
    }
  ],

  projects: [
    {
      title: { tr: "E-Ticaret Platformu", en: "E-Commerce Platform" },
      description: {
        tr: "Ürün yönetimi, sepet ve ödeme akışına sahip modern bir çevrimiçi mağaza.",
        en: "A modern online store with product management, cart and checkout flow."
      },
      tags: ["React", "Node.js", "PostgreSQL"],
      github: "https://github.com/",
      demo: "#",
      gradient: "linear-gradient(135deg, #ff4d8d, #ff9a3c)"
    },
    {
      title: { tr: "Görev Yönetim Uygulaması", en: "Task Manager App" },
      description: {
        tr: "Sürükle-bırak panolar ve gerçek zamanlı iş birliği sunan proje takip aracı.",
        en: "A project tracker with drag-and-drop boards and real-time collaboration."
      },
      tags: ["TypeScript", "Socket.io", "MongoDB"],
      github: "https://github.com/",
      demo: "#",
      gradient: "linear-gradient(135deg, #7b5cff, #00d4ff)"
    },
    {
      title: { tr: "Hava Durumu Paneli", en: "Weather Dashboard" },
      description: {
        tr: "Konuma göre anlık hava durumu ve 7 günlük tahmin gösteren gösterge paneli.",
        en: "A dashboard showing live weather and 7-day forecast based on location."
      },
      tags: ["JavaScript", "API", "Chart.js"],
      github: "https://github.com/",
      demo: "#",
      gradient: "linear-gradient(135deg, #00d4ff, #3cffb1)"
    },
    {
      title: { tr: "Blog Motoru", en: "Blog Engine" },
      description: {
        tr: "Markdown destekli, SEO dostu ve hızlı bir statik blog oluşturucu.",
        en: "A fast, SEO-friendly static blog generator with Markdown support."
      },
      tags: ["Node.js", "Markdown", "CSS"],
      github: "https://github.com/",
      demo: "#",
      gradient: "linear-gradient(135deg, #ff9a3c, #ffe14d)"
    },
    {
      title: { tr: "Muhasebe API", en: "Accounting API" },
      description: {
        tr: "Fatura, cari hesap ve raporlama işlemleri için güvenli REST servisi.",
        en: "A secure REST service for invoices, accounts and reporting."
      },
      tags: ["C#", ".NET", "SQL Server"],
      github: "https://github.com/",
      demo: "#",
      gradient: "linear-gradient(135deg, #3cffb1, #7b5cff)"
    },
    {
      title: { tr: "Portfolyo Teması", en: "Portfolio Theme" },
      description: {
        tr: "Geliştiriciler için çift dilli, animasyonlu ve tamamen statik bir tema.",
        en: "A bilingual, animated and fully static theme for developers."
      },
      tags: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/",
      demo: "#",
      gradient: "linear-gradient(135deg, #ff4d8d, #7b5cff)"
    }
  ],

  experience: [
    {
      date: { tr: "2023 – Günümüz", en: "2023 – Present" },
      title: { tr: "Kıdemli Full-Stack Geliştirici", en: "Senior Full-Stack Developer" },
      place: "Teknoloji A.Ş.",
      description: {
        tr: "Mikroservis mimarisine geçişi yönettim, frontend ekibine mentorluk yaptım.",
        en: "Led the migration to a microservice architecture and mentored the frontend team."
      }
    },
    {
      date: { tr: "2021 – 2023", en: "2021 – 2023" },
      title: { tr: "Frontend Geliştirici", en: "Frontend Developer" },
      place: "Dijital Ajans",
      description: {
        tr: "20'den fazla müşteri için responsive web siteleri ve web uygulamaları geliştirdim.",
        en: "Built responsive websites and web apps for more than 20 clients."
      }
    },
    {
      date: { tr: "2020 – 2021", en: "2020 – 2021" },
      title: { tr: "Stajyer Yazılım Geliştirici", en: "Software Developer Intern" },
      place: "Yazılım Ltd.",
      description: {
        tr: "Dahili araçların geliştirilmesine ve test süreçlerine katkıda bulundum.",
        en: "Contributed to internal tools development and testing processes."
      }
    }
  ],

  education: [
    {
      date: { tr: "2016 – 2020", en: "2016 – 2020" },
      title: { tr: "Bilgisayar Mühendisliği (Lisans)", en: "Computer Engineering (BSc)" },
      place: { tr: "Örnek Üniversitesi", en: "Example University" },
      description: {
        tr: "Bitirme projesi: Makine öğrenmesi ile öneri sistemi.",
        en: "Graduation project: Recommendation system with machine learning."
      }
    },
    {
      date: { tr: "2022", en: "2022" },
      title: { tr: "Bulut Mimarisi Sertifikası", en: "Cloud Architecture Certificate" },
      place: { tr: "Çevrimiçi Eğitim", en: "Online Course" },
      description: {
        tr: "Bulut altyapısı, konteynerler ve dağıtım stratejileri.",
        en: "Cloud infrastructure, containers and deployment strategies."
      }
    }
  ],

  contact: {
    email: "ornek@eposta.com",
    phone: "+90 555 000 00 00",
    location: { tr: "İstanbul, Türkiye", en: "Istanbul, Türkiye" }
  },

  social: [
    { name: "GitHub", url: "https://github.com/", icon: "github" },
    { name: "LinkedIn", url: "https://linkedin.com/", icon: "linkedin" },
    { name: "X", url: "https://x.com/", icon: "x" }
  ],

  // Örnek KVKK metni — yayınlamadan önce kendi bilgilerinize göre güncelleyin.
  kvkk: {
    tr: {
      title: "KVKK Aydınlatma Metni",
      sections: [
        { heading: "Veri Sorumlusu", text: "6698 sayılı Kişisel Verilerin Korunması Kanunu (\"KVKK\") uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla Ahmet Yılmaz tarafından aşağıda açıklanan kapsamda işlenmektedir." },
        { heading: "İşlenen Kişisel Veriler", text: "İletişim formu aracılığıyla paylaştığınız ad-soyad, e-posta adresi ve mesaj içeriği işlenmektedir." },
        { heading: "İşleme Amacı", text: "Kişisel verileriniz yalnızca taleplerinize yanıt vermek ve sizinle iletişim kurmak amacıyla işlenir; üçüncü kişilerle paylaşılmaz ve pazarlama amacıyla kullanılmaz." },
        { heading: "Hukuki Sebep ve Saklama", text: "Verileriniz KVKK md. 5/2-c ve 5/2-f kapsamında işlenir ve işleme amacının gerektirdiği süre boyunca saklanarak sonrasında silinir veya anonim hâle getirilir." },
        { heading: "Haklarınız", text: "KVKK md. 11 uyarınca verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini veya silinmesini isteme ve işlemeye itiraz etme haklarına sahipsiniz." },
        { heading: "İletişim", text: "Haklarınıza ilişkin taleplerinizi ornek@eposta.com adresine iletebilirsiniz." }
      ]
    },
    en: {
      title: "Privacy Notice (KVKK)",
      sections: [
        { heading: "Data Controller", text: "Under the Turkish Personal Data Protection Law No. 6698 (\"KVKK\"), your personal data is processed by Ahmet Yılmaz as the data controller within the scope described below." },
        { heading: "Personal Data Processed", text: "The name, email address and message content you share through the contact form are processed." },
        { heading: "Purpose of Processing", text: "Your personal data is processed only to respond to your requests and to contact you; it is not shared with third parties or used for marketing." },
        { heading: "Legal Basis and Retention", text: "Your data is processed under KVKK Art. 5/2-c and 5/2-f, kept only as long as the purpose requires, and then deleted or anonymised." },
        { heading: "Your Rights", text: "Under KVKK Art. 11 you have the right to learn whether your data is processed, request information, request correction or deletion, and object to processing." },
        { heading: "Contact", text: "You can send requests regarding your rights to ornek@eposta.com." }
      ]
    }
  }
};
