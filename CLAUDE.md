# CLAUDE.md

Bu dosya, bu depoda kodla çalışırken Claude Code'a (claude.ai/code) yol gösterir.

## Genel Bakış

Sade HTML/CSS/vanilla JS ile yazılmış, statik, tek sayfalık bir geliştirici portfolyosu. Derleme adımı, paket yöneticisi, test ve harici JS kütüphanesi yok (yalnızca Google Fonts). Site çift dilli (varsayılan Türkçe, ayrıca İngilizce). Kullanıcı Türkçe iletişim kuruyor.

Yayın, `gncsoftcom/portfolio` reposunun `main` dalının kökünden GitHub Pages ile yapılıyor → https://gncsoftcom.github.io/portfolio/. `main`'e push yapmak siteyi yeniden yayınlar (~1–2 dk). Derleme durumunu kontrol etmek için:

```bash
gh api repos/gncsoftcom/portfolio/pages/builds/latest --jq .status
```

## Yerelde Çalıştırma

`index.html` doğrudan açılabilir (`file://` ile çalışır) ya da `.claude/launch.json` içindeki `portfolio` önizleme ayarı kullanılabilir (5500 portunda küçük bir Node statik sunucusu; `.claude/` gitignore'da). Script'ler klasik `<script>` etiketi olarak kalmalı — ES modüllerine **çevirmeyin** ve yerel dosyaları `fetch()` ile yüklemeyin; bu `file://` kullanımını bozar.

## Mimari

Script'ler `js/data.js` → `js/i18n.js` → `js/main.js` sırasıyla yüklenir ve durumu global değişkenlerle paylaşır:

- **`window.SITE_DATA`** (`js/data.js`) — tüm kişisel içerik: isim, unvanlar, biyografi, istatistikler, yetenekler, projeler, deneyim, eğitim, iletişim, sosyal bağlantılar ve KVKK aydınlatma metni. Çevrilebilir alanlar `{ tr: "...", en: "..." }` nesneleridir; çevrilmeyen alanlar düz değerdir. İçerik değişiklikleri HTML'e değil buraya yapılır.
- **`window.I18N`** (`js/i18n.js`) — dile göre sabit arayüz metinleri; anahtarlar `"nav.about"` biçiminde. Bazı değerler bilerek HTML içerir (ör. `<span class="grad-text">`).
- **`js/main.js`** (tek IIFE) — her şeyi render eder:
  - `data-i18n="anahtar"` olan öğelerin `innerHTML`'i `I18N[lang]`'den gelir; `data-i18n-aria` `aria-label` atar; `data-field="name|initials|tagline"` veri değerini alır.
  - Dinamik bölümler (`#skills`, `#projectList`, `#panel-work`, `#panel-edu`, `#contactList`, `#kvkkBody` vb.) her dil değişiminde `SITE_DATA`'dan HTML metni olarak yeniden oluşturulur (`setLang` → `renderI18n` + `renderContent`). `tx()` yardımcısı `{tr,en}` nesnesinden geçerli dili seçer; veriden gelen tüm metinler `esc()`'den geçer.
  - İçerik yeniden render edildiği için öğe bazlı davranışlar (reveal gözlemcisi, kart eğim efekti) `renderContent()` içinde yeniden bağlanır.
  - Dil tercihi `localStorage`'da saklanır (try/catch ile sarılı); yoksa `navigator.language`'a bakılır.

Yeni çevrilebilir bir parça eklerken: içeriği `data.js`'e (`{tr,en}`) ya da arayüz metnini hem `I18N.tr` hem `I18N.en`'e ekleyin; ardından `index.html`'de `data-i18n` niteliği verin veya `renderContent()` içinde render edin.

## Stil Kuralları

`css/style.css`, `/* ==== BÖLÜM ==== */` bloklarıyla düzenlenmiş tek dosyadır. Renkler/fontlar `:root` özel değişkenleridir (tek koyu tema; pembe/turuncu/mor/camgöbeği gradyan paleti). BEM benzeri sınıf adları (`card__title`, `nav__link`); durum sınıfları `is-` önekli (`is-visible`, `is-active`, `is-open`). Kaydırma animasyonları IntersectionObserver ile `.reveal` + `.is-visible` kullanır; `prefers-reduced-motion` tüm animasyonları kapatır. Mobil öncelikli; kırılım noktaları 640/768/900/1024px.

## Notlar

- İletişim formu yalnızca görünüm amaçlı: doğrular ve "demo" bildirimi gösterir, hiçbir şey göndermez.
- CV düğmesi `assets/cv.pdf`'e (`SITE_DATA.cvUrl`) bağlıdır; dosyayı kullanıcı ekler.
- `data.js` içeriği, kullanıcı değiştirene kadar örnek veridir ("Ahmet Yılmaz").
