/* ==========================================================================
   ISTEK.UZ — REALISTIC ARCHITECTURAL SHOWCASE & INSTANT LEAD CAPTURE
   Telegram: https://t.me/istek_uz | Instagram: https://instagram.com/istek.uz
   ========================================================================== */

const SITE_CONFIG = {
  brandName: "ISTEK.UZ",
  telegramUrl: "https://t.me/istek_uz",
  instagramUrl: "https://instagram.com/istek.uz",
  // Telegram Bot orqali lidlarni qabul qilish uchun:
  telegramBotToken: "",
  telegramChatId: ""
};

let currentLang = 'uz';
let currentPage = 1;
let currentShowcaseIdx = 0;

/* ==========================================================================
   4 REALISTIC FLAGSHIP ARCHITECTURAL SYSTEMS FOR HERO SHOWCASE
   ========================================================================== */
const HERO_SHOWCASE_DATA = {
  uz: [
    {
      badge: "THERMO 80 SERIES • 3-QAVAT OYNA",
      image: "assets/thermo-80.jpg",
      title: "Thermo 80 / 78 Alyumin Profil",
      origin: "Rasmiy Kafolat",
      desc: "Ko'p kamerali poliamid termo-ko'prikli alyumin tizim. Qishki sovuq va yozgi jaziramadan 100% himoya qiladi, ko'cha shovqinini o'tkazmaydi.",
      s1Val: "3 Qavatli", s1Lbl: "Energiya tejovchi oyna",
      s2Val: "Germaniya", s2Lbl: "Roto / Siegenia furnitura",
      s3Val: "Bepul", s3Lbl: "O'lchov va yetkazish"
    },
    {
      badge: "ENGELBERG • PANORAMA VITRAJ",
      image: "assets/hero-villa.png",
      title: "Engelberg Thermo & Panorama Romlar",
      origin: "Premium Sifat",
      desc: "Zamonaviy hovli va kottejlar uchun yuqori mustahkamlikdagi Engelberg panorama vitraj va rom tizimlari. Maksimal yorug'lik va issiqlik.",
      s1Val: "Engelberg", s1Lbl: "Original profil tizimi",
      s2Val: "100% Germetik", s2Lbl: "EPDM kauchuk zichlagich",
      s3Val: "Bepul", s3Lbl: "Yetkazish va montaj"
    },
    {
      badge: "GILYOTINA • AVTOMATIK PANORAMA",
      image: "assets/gilyotina-lux.jpg",
      title: "Gilyotina Avtomatik Oyna Tizimi",
      origin: "Pult Boshqaruv",
      desc: "Masofaviy pult orqali vertikal ochilib-yopiladigan motorli panorama tizim. Terrasa, yozgi oshxona, ayvon va restoranlar uchun mukammal yechim.",
      s1Val: "Avtomat", s1Lbl: "Masofaviy pultli motor",
      s2Val: "Toblangan", s2Lbl: "Xavfsiz qalin oyna",
      s3Val: "Kafolatli", s3Lbl: "Servis va o'rnatish"
    },
    {
      badge: "PREMIUM DOORS • THERMO & SMART",
      image: "assets/premium-door.jpg",
      title: "Premium Thermo va Smart Eshiklar",
      origin: "Individual Dizayn",
      desc: "Tashqi va ichki makon uchun termo-alyumin, tabiiy shpon hamda biometrik Smart-qulfli (FaceID / barmoq izi) zamonaviy eshiklar.",
      s1Val: "Smart Lock", s1Lbl: "FaceID va barmoq izi",
      s2Val: "Thermo", s2Lbl: "Quyosh va sovuqqa chidamli",
      s3Val: "Bepul", s3Lbl: "O'lchov va o'rnatish"
    }
  ],
  ru: [
    {
      badge: "THERMO 80 SERIES • 3-СЛОЙНЫЙ СТЕКЛОПАКЕТ",
      image: "assets/thermo-80.jpg",
      title: "Алюминиевый Профиль Thermo 80 / 78",
      origin: "Официальная Гарантия",
      desc: "Многокамерная термо-алюминиевая система с полиамидным термомостом. 100% защита от зимнего холода, летней жары и уличного шума.",
      s1Val: "3 Сulоя", s1Lbl: "Энергосберегающее стекло",
      s2Val: "Германия", s2Lbl: "Фурнитура Roto / Siegenia",
      s3Val: "Бесплатно", s3Lbl: "Замер и доставка"
    },
    {
      badge: "ENGELBERG • ПАНОРАМНЫЕ ВИТРАЖИ",
      image: "assets/hero-villa.png",
      title: "Окна и Витражи Engelberg Thermo",
      origin: "Премиум Качество",
      desc: "Высокопрочные панорамные витражи и окна Engelberg для современных домов и коттеджей. Максимальное освещение и сохранение тепла.",
      s1Val: "Engelberg", s1Lbl: "Оригинальный профиль",
      s2Val: "100% Герметик", s2Lbl: "Уплотнители EPDM",
      s3Val: "Бесплатно", s3Lbl: "Доставка и монтаж"
    },
    {
      badge: "ГИЛЬОТИНА • АВТОМАТИЧЕСКАЯ СИСТЕМА",
      image: "assets/gilyotina-lux.jpg",
      title: "Гильотинное Панорамное Остекление",
      origin: "Пульт управления",
      desc: "Моторизованная вертикально-раздвижная система с пультом ДУ. Идеальное решение для террас, веранд, летних кухонь и ресторанов.",
      s1Val: "Автомат", s1Lbl: "Привод с пультом ДУ",
      s2Val: "Закаленное", s2Lbl: "Безопасное стекло",
      s3Val: "Гарантия", s3Lbl: "Сервис и монтаж"
    },
    {
      badge: "PREMIUM DOORS • THERMO & SMART",
      image: "assets/premium-door.jpg",
      title: "Премиум Термо и Smart Двери",
      origin: "Индивидуальный дизайн",
      desc: "Входные и межкомнатные двери из термо-алюминия и натурального шпона с биометрическим Smart-замком (FaceID / отпечаток пальца).",
      s1Val: "Smart Lock", s1Lbl: "FaceID и отпечаток",
      s2Val: "Thermo", s2Lbl: "Защита от солнца и холода",
      s3Val: "Бесплатно", s3Lbl: "Замер и установка"
    }
  ]
};

/* ==========================================================================
   BILINGUAL UI DICTIONARY (O'ZBEK & РУССКИЙ)
   ========================================================================== */
const I18N = {
  uz: {
    topBarText: "BEPUL O'LCHOV • BEPUL YETKAZIB BERISH • RASMIY KAFOLAT VA SERVIS",
    brandSub: "Premium Eshik & Romlar",
    tab1: "Asosiy",
    tab2: "Katalog",
    tab3: "Ariza qoldirish",
    heroBadge: "ISTEK.UZ • PREMIUM ARCHITECTURAL SYSTEMS",
    heroTitle: 'XONADONINGIZ UCHUN PREMIUM <span class="gold-text">ESHIK VA ROM</span> TIZIMLARI',
    heroSubtitle: "Engelberg, Thermo 80, Gilyotina va Hebeschiebe panorama tizimlari — yuqori issiqlik hamda shovqin izolyatsiyasi bilan.",
    pillar1Title: "BEPUL",
    pillar1Desc: "Mutaxassis o'lchovi va maslahati",
    pillar2Title: "YETKAZISH",
    pillar2Desc: "Bepul yetkazib berish va o'rnatish",
    pillar3Title: "KAFOLAT",
    pillar3Desc: "Rasmiy shartnoma va doimiy servis",
    mainCallBtn: "BEPUL O'LCHOVGA ARIZA QOLDIRISH",
    tgBtnText: "Telegram",
    igBtnText: "Instagram",
    catBadge: "PREMIUM MAHSULOTLAR KATALOGI",
    catMainTitle: "Bizning Eshik va Rom Tizimlarimiz",
    catMainDesc: "O'zingizga mos tizimni tanlang va darhol bepul o'lchov hamda hisob-kitob uchun buyurtma bering:",
    c1Title: "Thermo 80 & Engelberg Termo Romlar",
    c1Desc: "Yuqori issiqlik va shovqin izolyatsiyasiga ega ko'p kamerali termo-alyumin va PVX profillar. Qishda issiqni, yozda salqinlikni saqlaydi.",
    c2Title: "Gilyotina (Guillotine) Panorama Tizimi",
    c2Desc: "Masofaviy pult bilan vertikal ochilib-yopiladigan motorli panorama oynalar. Terrasa, yozgi oshxona, ayvon va restoranlar uchun ideal yechim.",
    c3Title: "Hebeschiebe & Panorama Vitraj Tizimlari",
    c3Desc: "Hovli, kottej va pentxauslar uchun katta o'lchamli, barmoq uchida ravon suriluvchi germetik panorama vitraj eshik-romlar.",
    c4Title: "Premium Thermo va Smart Eshiklar",
    c4Desc: "Zamonaviy hovli va xonadonlar uchun mustahkam termo-alyumin, shpon va Smart-qulfli (FaceID / barmoq izi) kirish hamda ichki eshiklar.",
    catOrderBtn: "Bepul o'lchovga ariza qoldirish",
    srvBadge: "ISTEK SERVIS AFZALLIKLARI",
    srvMainTitle: "Mijozlarimiz uchun bepul xizmatlar va kafolat",
    freeServiceTag: "BEPUL XIZMAT",
    freeDeliveryTag: "BEPUL YETKAZISH",
    warrantyTag: "RASMIY KAFOLAT",
    s1Title: "Bepul o'lchov va dizayn maslahat",
    s1Desc: "Tajribali mutaxassisimiz uyingizga borib aniq lazerli o'lchov oladi va fasadingizga eng mos profil hamda ranglarni tavsiya qiladi.",
    s2Title: "Aniq smeta 24 soat ichida",
    s2Desc: "Obyektingiz o'lchamlari bo'yicha barcha profil, oyna va furnitura detallarini shaffof hisoblab, aniq smeta taqdim etamiz.",
    s3Title: "Bepul yetkazib berish va professional montaj",
    s3Desc: "Tayyor bo'lgan eshik va romlarni maxsus transportda xavfsiz yetkazib beramiz va standartlar asosida germetik o'rnatamiz.",
    s4Title: "Uzoq muddatli kafolat va servis",
    s4Desc: "Barcha profil, oynapaket va mexanizmlarga rasmiy shartnoma asosida kafolat hamda keyingi servis xizmati ko'rsatiladi.",
    orderCallLink: "Bepul o'lchovga ariza qoldirish",
    formTitle: "Bepul o'lchov va mutaxassis maslahati uchun raqamingizni qoldiring",
    formSubtitle: "Mutaxassisimiz siz bilan bog'lanib, barcha savollaringizga javob beradi va bepul o'lchov vaqtini belgilaydi.",
    perk1: "Bepul o'lchov",
    perk2: "Bepul yetkazish",
    perk3: "Rasmiy kafolat",
    perk4: "Sifatli servis",
    namePlaceholder: "Ismingiz",
    requiredMsg: "Ushbu maydon to'ldirilishi shart",
    requiredPhoneMsg: "Telefon raqamingizni to'liq kiriting",
    opt1: "Thermo 80 / Engelberg Romlar",
    opt2: "Gilyotina Avtomatik Panorama Tizimi",
    opt3: "Hebeschiebe / Suriladigan Vitrajlar",
    opt4: "Premium Thermo va Smart Eshiklar",
    opt5: "Kompleks (Butun uy uchun Eshik va Rom)",
    regionPlaceholder: "Hududni tanlang",
    submitCallBtn: "Menga qo'ng'iroq qiling!",
    formBottomNote: "Bepul o'lchov, yetkazib berish va maslahat berish xizmatlari Toshkent hamda viloyatlar bo'ylab amal qiladi.",
    stickyCallBtn: "Bepul o'lchovga ariza qoldirish",
    modalFormTitle: "Bepul o'lchovga ariza qoldirish",
    modalFormSub: "Raqamingizni qoldiring — mutaxassisimiz 10 daqiqa ichida bog'lanib, bepul o'lchov va narx bo'yicha ma'lumot beradi.",
    successTitle: "Arizangiz qabul qilindi!",
    successDesc: "Tez orada ISTEK.UZ mutaxassisi siz bilan bog'lanadi. Shuningdek, bizning Telegram va Instagram sahifalarimiz orqali ham barcha ishlarimizni kuzatishingiz mumkin:"
  },
  ru: {
    topBarText: "БЕСПЛАТНЫЙ ЗАМЕР • БЕСПЛАТНАЯ ДОСТАВКА • ОФИЦИАЛЬНАЯ ГАРАНТИЯ И СЕРВИС",
    brandSub: "Премиум Окна и Двери",
    tab1: "Главная",
    tab2: "Каталог",
    tab3: "Оставить заявку",
    heroBadge: "ISTEK.UZ • PREMIUM ARCHITECTURAL SYSTEMS",
    heroTitle: 'ПРЕМИУМ СИСТЕМЫ <span class="gold-text">ОКОН И ДВЕРЕЙ</span> ДЛЯ ВАШЕГО ДОМА',
    heroSubtitle: "Панорамные системы Engelberg, Thermo 80, Гильотина и Hebeschiebe с максимальной тепло- и шумоизоляцией.",
    pillar1Title: "БЕСПЛАТНО",
    pillar1Desc: "Выезд замерщика и консультация",
    pillar2Title: "ДОСТАВКА",
    pillar2Desc: "Бесплатная доставка и установка",
    pillar3Title: "ГАРАНТИЯ",
    pillar3Desc: "Официальный договор и сервис",
    mainCallBtn: "ОСТАВИТЬ ЗАЯВКУ НА БЕСПЛАТНЫЙ ЗАМЕР",
    tgBtnText: "Telegram",
    igBtnText: "Instagram",
    catBadge: "КАТАЛОГ ПРЕМИУМ ПРОДУКЦИИ",
    catMainTitle: "Наши Системы Окон и Дверей",
    catMainDesc: "Выберите подходящую систему и закажите бесплатный замер и точный расчет:",
    c1Title: "Термо Окна Thermo 80 и Engelberg",
    c1Desc: "Многокамерные термо-алюминиевые и ПВХ профили с высокой тепло- и шумоизоляцией. Сохраняют тепло зимой и прохладу летом.",
    c2Title: "Гильотинная Панорамная Система (Guillotine)",
    c2Desc: "Моторизованные вертикально-раздвижные панорамные окна с пультом ДУ. Идеально для террас, веранд, летних кухонь и ресторанов.",
    c3Title: "Раздвижные Витражи Hebeschiebe",
    c3Desc: "Крупногабаритные герметичные панорамные раздвижные системы для частных домов, коттеджей и пентхаусов.",
    c4Title: "Премиум Термо и Smart Двери",
    c4Desc: "Надежные входные и межкомнатные двери из термо-алюминия и шпона с биометрическими Smart-замками (FaceID / отпечаток).",
    catOrderBtn: "Заказать звонок (Бесплатный замер)",
    srvBadge: "ПРЕИМУЩЕСТВА СЕРВИСА ISTEK",
    srvMainTitle: "Бесплатные услуги и гарантия для наших клиентов",
    freeServiceTag: "БЕСПЛАТНО",
    freeDeliveryTag: "БЕСПЛАТНАЯ ДОСТАВКА",
    warrantyTag: "ГАРАНТИЯ",
    s1Title: "Бесплатный замер и дизайн-консультация",
    s1Desc: "Опытный специалист приедет на объект, выполнит точный лазерный замер и поможет подобрать профиль и цвет под ваш фасад.",
    s2Title: "Точная смета за 24 часа",
    s2Desc: "Прозрачный расчет стоимости всех профилей, стеклопакетов и фурнитуры по индивидуальным размерам вашего объекта.",
    s3Title: "Бесплатная доставка и профессиональный монтаж",
    s3Desc: "Безопасная доставка спецтранспортом и герметичная установка по всем строительным стандартам.",
    s4Title: "Долгосрочная гарантия и сервис",
    s4Desc: "Официальная гарантия по договору на все профили, стеклопакеты и механизмы, а также сервисное обслуживание.",
    orderCallLink: "Заказать звонок",
    formTitle: "Оставьте ваш номер для бесплатного замера и консультации",
    formSubtitle: "Наш специалист свяжется с вами, ответит на все вопросы и согласует удобное время бесплатного замера.",
    perk1: "Бесплатный замер",
    perk2: "Бесплатная доставка",
    perk3: "Офиц. гарантия",
    perk4: "Сервис-обслуживание",
    namePlaceholder: "Ваше имя",
    requiredMsg: "Это поле обязательно для заполнения",
    requiredPhoneMsg: "Введите корректный номер телефона",
    opt1: "Окна Thermo 80 / Engelberg",
    opt2: "Гильотинная Панорамная Система",
    opt3: "Раздвижные Витражи Hebeschiebe",
    opt4: "Премиум Термо и Smart Двери",
    opt5: "Комплекс на весь дом (Окна + Двери)",
    regionPlaceholder: "Выберите регион",
    submitCallBtn: "Позвоните мне!",
    formBottomNote: "Бесплатный замер, доставка и консультация действуют по Ташкенту и областям.",
    stickyCallBtn: "Оставить заявку на бесплатный замер",
    modalFormTitle: "Оставить заявку на бесплатный замер",
    modalFormSub: "Оставьте ваши контакты — специалист свяжется с вами в течение 10 минут для консультации и бесплатного замера.",
    successTitle: "Ваша заявка принята!",
    successDesc: "В ближайшее время специалист ISTEK.UZ свяжется с вами. Следите за нашими работами в Telegram и Instagram:"
  }
};

/* ==========================================================================
   PAGE NAVIGATION (1, 2, 3)
   ========================================================================== */
function switchPage(pageNum) {
  currentPage = pageNum;
  for (let i = 1; i <= 3; i++) {
    const pageEl = document.getElementById(`page-${i}`);
    const tabBtn = document.getElementById(`tab-btn-${i}`);
    if (pageEl) pageEl.classList.toggle('active-page', i === pageNum);
    if (tabBtn) tabBtn.classList.toggle('active', i === pageNum);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   HERO SHOWCASE SWITCHER (THERMO 80, ENGELBERG, GILYOTINA, DOORS)
   ========================================================================== */
function selectHeroShowcase(index, btnEl) {
  currentShowcaseIdx = index;
  const items = HERO_SHOWCASE_DATA[currentLang];
  const item = items[index];
  if (!item) return;

  if (btnEl) {
    document.querySelectorAll('.sys-tab-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  } else {
    const btns = document.querySelectorAll('.sys-tab-btn');
    btns.forEach((b, idx) => b.classList.toggle('active', idx === index));
  }

  const imgEl = document.getElementById('sc-image');
  if (imgEl) {
    imgEl.style.opacity = '0.35';
    setTimeout(() => {
      imgEl.src = item.image;
      imgEl.style.opacity = '1';
    }, 140);
  }

  document.getElementById('sc-badge').textContent = item.badge;
  document.getElementById('sc-title').textContent = item.title;
  document.getElementById('sc-origin').textContent = item.origin;
  document.getElementById('sc-desc').textContent = item.desc;
  document.getElementById('sc-spec1-val').textContent = item.s1Val;
  document.getElementById('sc-spec1-lbl').textContent = item.s1Lbl;
  document.getElementById('sc-spec2-val').textContent = item.s2Val;
  document.getElementById('sc-spec2-lbl').textContent = item.s2Lbl;
  document.getElementById('sc-spec3-val').textContent = item.s3Val;
  document.getElementById('sc-spec3-lbl').textContent = item.s3Lbl;
}

/* Subtle 3D Tilt on the Hero Showcase Card */
function initShowcase3DTilt() {
  const card = document.getElementById('hero-3d-card');
  if (!card) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateY(${(x * 8).toFixed(2)}deg) rotateX(${(-y * 6).toFixed(2)}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
}

/* ==========================================================================
   INSTANT LEAD CAPTURE MODAL (SRAZU LID OLISH — ON ANY PAGE!)
   ========================================================================== */
function openQuickLeadModal(selectedContext = '') {
  // If user is already on Page 3 and clicked the bottom sticky button, focus the Page 3 form directly
  if (currentPage === 3 && selectedContext.includes('Pastki tugma')) {
    const nameEl = document.getElementById('p3-name');
    if (nameEl) {
      nameEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => nameEl.focus(), 300);
      return;
    }
  }

  const modal = document.getElementById('quick-lead-modal');
  const formView = document.getElementById('modal-form-view');
  const successView = document.getElementById('modal-success-view');
  const selectEl = document.getElementById('m-product');

  if (formView && successView) {
    formView.style.display = 'block';
    successView.style.display = 'none';
  }

  if (selectEl && selectedContext) {
    for (let i = 0; i < selectEl.options.length; i++) {
      const optVal = selectEl.options[i].value.toLowerCase();
      if (
        (selectedContext.toLowerCase().includes('gilyotina') && optVal.includes('gilyotina')) ||
        (selectedContext.toLowerCase().includes('hebeschiebe') && optVal.includes('hebeschiebe')) ||
        (selectedContext.toLowerCase().includes('eshik') && optVal.includes('eshik')) ||
        (selectedContext.toLowerCase().includes('thermo') && optVal.includes('thermo 80'))
      ) {
        selectEl.selectedIndex = i;
        break;
      }
    }
  }

  if (modal) {
    modal.classList.add('open');
    setTimeout(() => {
      const nameInput = document.getElementById('m-name');
      if (nameInput) nameInput.focus();
    }, 150);
  }
}

function closeQuickLeadModal() {
  const modal = document.getElementById('quick-lead-modal');
  if (modal) modal.classList.remove('open');
}

/* ==========================================================================
   PHONE MASK (+998) & FORM SUBMISSION (BOTH MODAL & PAGE 3)
   ========================================================================== */
function initPhoneMasks() {
  document.querySelectorAll('.phone-mask-input').forEach((phoneInput) => {
    phoneInput.addEventListener('input', (e) => {
      let digits = e.target.value.replace(/\D/g, '');
      if (!digits.startsWith('998')) {
        digits = '998' + digits.replace(/^998/, '');
      }
      digits = digits.slice(0, 12);

      let formatted = '+998';
      if (digits.length > 3) formatted += ' (' + digits.slice(3, 5);
      if (digits.length >= 5) formatted += ') ' + digits.slice(5, 8);
      if (digits.length >= 8) formatted += '-' + digits.slice(8, 10);
      if (digits.length >= 10) formatted += '-' + digits.slice(10, 12);

      e.target.value = formatted;
      phoneInput.classList.remove('input-error');
      const errEl = phoneInput.parentElement.querySelector('.error-text');
      if (errEl) errEl.classList.remove('visible');
    });
  });

  ['p3-name', 'm-name'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        el.classList.remove('input-error');
        const errEl = el.parentElement.querySelector('.error-text');
        if (errEl) errEl.classList.remove('visible');
      });
    }
  });
}

async function submitLeadForm(e, source) {
  e.preventDefault();

  const isModal = source === 'modal';
  const nameInput = document.getElementById(isModal ? 'm-name' : 'p3-name');
  const phoneInput = document.getElementById(isModal ? 'm-phone' : 'p3-phone');
  const productSelect = document.getElementById(isModal ? 'm-product' : 'p3-product');
  const regionSelect = document.getElementById(isModal ? 'm-region' : 'p3-region');
  const errName = document.getElementById(isModal ? 'm-err-name' : 'p3-err-name');
  const errPhone = document.getElementById(isModal ? 'm-err-phone' : 'p3-err-phone');

  const nameVal = nameInput.value.trim();
  const phoneDigits = phoneInput.value.replace(/\D/g, '');

  let isValid = true;
  if (nameVal.length < 2) {
    nameInput.classList.add('input-error');
    if (errName) errName.classList.add('visible');
    isValid = false;
  }

  if (phoneDigits.length < 12) {
    phoneInput.classList.add('input-error');
    if (errPhone) errPhone.classList.add('visible');
    isValid = false;
  }

  if (!isValid) return;

  const urlParams = new URLSearchParams(window.location.search);
  const utmData = {
    utm_source: urlParams.get('utm_source') || 'instagram',
    utm_medium: urlParams.get('utm_medium') || 'target',
    utm_campaign: urlParams.get('utm_campaign') || '',
    utm_content: urlParams.get('utm_content') || ''
  };

  const leadData = {
    name: nameVal,
    phone: phoneInput.value,
    product: productSelect ? productSelect.value : 'Eshik va Rom',
    region: (regionSelect && regionSelect.value) ? regionSelect.value : 'Toshkent shahri',
    sourcePage: `page-${currentPage}`,
    utm: utmData,
    createdAt: new Date().toISOString()
  };

  try {
    const saved = JSON.parse(localStorage.getItem('istek_leads') || '[]');
    saved.push(leadData);
    localStorage.setItem('istek_leads', JSON.stringify(saved));
  } catch (_) { }

  // Xavfsiz Vercel Serverless Backend (/api/lead) orqali ERP/CRM va Telegramga yuborish
  try {
    await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData)
    });
  } catch (_) { }

  // Show confirmation state
  const modal = document.getElementById('quick-lead-modal');
  const formView = document.getElementById('modal-form-view');
  const successView = document.getElementById('modal-success-view');
  if (modal && formView && successView) {
    formView.style.display = 'none';
    successView.style.display = 'block';
    modal.classList.add('open');
  }

  nameInput.value = '';
  phoneInput.value = '+998 ';
}

/* ==========================================================================
   LANGUAGE SWITCHER (O'Z / РУ)
   ========================================================================== */
function setLanguage(lang) {
  currentLang = lang;
  document.getElementById('lang-uz').classList.toggle('active', lang === 'uz');
  document.getElementById('lang-ru').classList.toggle('active', lang === 'ru');

  const dict = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.innerHTML = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.setAttribute('placeholder', dict[key]);
  });

  selectHeroShowcase(currentShowcaseIdx);
}

/* ==========================================================================
   BARELY-PERCEPTIBLE FLOATING MICRO-DUST ("BILINAR-BILINMAS ZARLAR")
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const count = Math.min(34, Math.max(18, Math.floor(w / 28)));
  const particles = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.15 + 0.4,
    vx: (Math.random() - 0.5) * 0.14,
    vy: -Math.random() * 0.18 - 0.05,
    baseAlpha: Math.random() * 0.18 + 0.05,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.012 + 0.004,
    warm: Math.random() > 0.25
  }));

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx + Math.sin(p.phase) * 0.06;
      p.y += p.vy;
      p.phase += p.speed;

      if (p.y < -10) {
        p.y = h + 10;
        p.x = Math.random() * w;
      }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      const alpha = p.baseAlpha * (0.65 + 0.35 * Math.sin(p.phase));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.warm
        ? `rgba(218, 198, 160, ${alpha.toFixed(3)})`
        : `rgba(180, 230, 200, ${(alpha * 0.75).toFixed(3)})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
}

document.addEventListener('DOMContentLoaded', () => {
  initPhoneMasks();
  initShowcase3DTilt();
  initAmbientCanvas();
});
