// ============================================================
// KPSS 2026 Lisans - Müfredat & Soru Ağırlıkları
// Sınav Tarihi: 6 Eylül 2026
// Güncellemek için bu dosyayı düzenleyin veya Ayarlar > Müfredat Düzenleyici kullanın.
// ============================================================

export const EXAM_DATE = new Date('2026-09-06T09:00:00');

export const INITIAL_CURRICULUM = [
  // ----------------------------------------------------------------
  // TÜRKÇE — 30 Soru
  // ----------------------------------------------------------------
  {
    id: 'turkce',
    name: 'Türkçe',
    colorClass: 'subject-turkce',
    accentColor: '#60A5FA',
    icon: '📚',
    totalWeight: 30,
    topics: [
      {
        id: 'turkce-1',
        title: 'Sözcükte ve Cümlede Anlam',
        weight: 7,
        subtopics: [
          { id: 'turkce-1-1', title: 'Sözcükte Anlam (Gerçek, Mecaz, Yan, Terim)' },
          { id: 'turkce-1-2', title: 'Söz Öbekleri ve Kalıplaşmış İfadeler' },
          { id: 'turkce-1-3', title: 'Cümlede Anlam İlişkileri (Neden-Sonuç, Amaç-Sonuç, Koşul vb.)' },
          { id: 'turkce-1-4', title: 'Cümle Yorumu ve Duygu Değeri' },
        ],
      },
      {
        id: 'turkce-2',
        title: 'Dil Bilgisi',
        weight: 8,
        subtopics: [
          { id: 'turkce-2-1', title: 'Sözcük Türleri (İsim, Sıfat, Zamir, Zarf, Fiil, Edat, Bağlaç, Ünlem)' },
          { id: 'turkce-2-2', title: 'Fiil Çatısı (Geçişli-Geçişsiz, Dönüşlü, İşteş, Ettirgen)' },
          { id: 'turkce-2-3', title: 'Fiil Kipleri ve Fiilimsi' },
          { id: 'turkce-2-4', title: 'Cümle Öğeleri (Özne, Yüklem, Nesne, Yer Tamlayıcı, Zarf Tümleci)' },
          { id: 'turkce-2-5', title: 'Cümle Türleri (Yapı, Anlam, Yüklem Türü)' },
          { id: 'turkce-2-6', title: 'Ekler ve Sözcük Yapımı (Yapım-Çekim Ekleri)' },
        ],
      },
      {
        id: 'turkce-3',
        title: 'Yazım ve Noktalama',
        weight: 4,
        subtopics: [
          { id: 'turkce-3-1', title: 'Yazım Kuralları (Büyük Harf, Bitişik-Ayrı Yazım)' },
          { id: 'turkce-3-2', title: 'Noktalama İşaretleri ve Kullanım Kuralları' },
        ],
      },
      {
        id: 'turkce-4',
        title: 'Paragraf Bilgisi',
        weight: 7,
        subtopics: [
          { id: 'turkce-4-1', title: 'Paragrafın Ana Düşüncesi ve Yardımcı Düşünceler' },
          { id: 'turkce-4-2', title: 'Paragraf Tamamlama' },
          { id: 'turkce-4-3', title: 'Sözcük/Cümle Sıralaması' },
          { id: 'turkce-4-4', title: 'Anlatım Bozuklukları (Dil Yanlışları)' },
        ],
      },
      {
        id: 'turkce-5',
        title: 'Anlatım Türleri ve Teknikleri',
        weight: 4,
        subtopics: [
          { id: 'turkce-5-1', title: 'Anlatım Teknikleri (Açıklama, Tartışma, Öyküleme, Betimleme)' },
          { id: 'turkce-5-2', title: 'Yazı Türleri (Makale, Deneme, Fıkra, Sohbet, Eleştiri vb.)' },
        ],
      },
    ],
  },

  // ----------------------------------------------------------------
  // MATEMATİK — 30 Soru
  // ----------------------------------------------------------------
  {
    id: 'matematik',
    name: 'Matematik',
    colorClass: 'subject-matematik',
    accentColor: '#C084FC',
    icon: '🔢',
    totalWeight: 30,
    topics: [
      {
        id: 'mat-1',
        title: 'Sayılar ve Sayı Basamakları',
        weight: 3,
        subtopics: [
          { id: 'mat-1-1', title: 'Doğal Sayılar, Tam Sayılar, Rasyonel Sayılar' },
          { id: 'mat-1-2', title: 'Sayı Basamakları ve Basamak Değerleri' },
          { id: 'mat-1-3', title: 'Bölünebilme Kuralları ve OBEB-OKEK' },
        ],
      },
      {
        id: 'mat-2',
        title: 'Dört İşlem ve Kesirler',
        weight: 3,
        subtopics: [
          { id: 'mat-2-1', title: 'Kesirlerle İşlemler (Toplama, Çıkarma, Çarpma, Bölme)' },
          { id: 'mat-2-2', title: 'Ondalık Sayılar' },
        ],
      },
      {
        id: 'mat-3',
        title: 'Oran-Orantı ve Yüzde',
        weight: 4,
        subtopics: [
          { id: 'mat-3-1', title: 'Oran ve Orantı (Doğru-Ters Orantı)' },
          { id: 'mat-3-2', title: 'Yüzde ve Faiz Hesapları' },
          { id: 'mat-3-3', title: 'Karışım ve Alaşım Problemleri' },
        ],
      },
      {
        id: 'mat-4',
        title: 'Sayı Problemleri',
        weight: 4,
        subtopics: [
          { id: 'mat-4-1', title: 'Yaş ve Rakam Problemleri' },
          { id: 'mat-4-2', title: 'İş-Havuz Problemleri' },
          { id: 'mat-4-3', title: 'Hız-Yol-Zaman Problemleri' },
        ],
      },
      {
        id: 'mat-5',
        title: 'Temel Cebir',
        weight: 4,
        subtopics: [
          { id: 'mat-5-1', title: 'Denklem Çözümü (1. Dereceden)' },
          { id: 'mat-5-2', title: 'Eşitsizlikler' },
          { id: 'mat-5-3', title: 'Mutlak Değer' },
          { id: 'mat-5-4', title: 'Üslü ve Köklü Sayılar' },
        ],
      },
      {
        id: 'mat-6',
        title: 'Mantık',
        weight: 2,
        subtopics: [
          { id: 'mat-6-1', title: 'Önerme ve Bağlaçlar' },
          { id: 'mat-6-2', title: 'Doğruluk Tabloları ve Çıkarım' },
        ],
      },
      {
        id: 'mat-7',
        title: 'Küme ve Fonksiyon',
        weight: 2,
        subtopics: [
          { id: 'mat-7-1', title: 'Küme İşlemleri ve Venn Şeması' },
          { id: 'mat-7-2', title: 'Fonksiyon Kavramı ve Grafikleri' },
        ],
      },
      {
        id: 'mat-8',
        title: 'Olasılık ve İstatistik',
        weight: 3,
        subtopics: [
          { id: 'mat-8-1', title: 'Permütasyon ve Kombinasyon' },
          { id: 'mat-8-2', title: 'Olasılık Hesabı' },
          { id: 'mat-8-3', title: 'Ortalama, Mod, Medyan, Standart Sapma' },
        ],
      },
      {
        id: 'mat-9',
        title: 'Geometri',
        weight: 5,
        subtopics: [
          { id: 'mat-9-1', title: 'Temel Geometri (Açılar, Üçgenler, Dörtgenler)' },
          { id: 'mat-9-2', title: 'Çevre, Alan, Hacim Hesapları' },
          { id: 'mat-9-3', title: 'Çember ve Daire' },
          { id: 'mat-9-4', title: 'Koordinat Geometrisi' },
          { id: 'mat-9-5', title: 'Dönüşüm Geometrisi (Yansıma, Dönme)' },
        ],
      },
    ],
  },

  // ----------------------------------------------------------------
  // TARİH — 27 Soru (Genel Kültür)
  // ----------------------------------------------------------------
  {
    id: 'tarih',
    name: 'Tarih',
    colorClass: 'subject-tarih',
    accentColor: '#F87171',
    icon: '🏛️',
    totalWeight: 27,
    topics: [
      {
        id: 'tar-1',
        title: 'Osmanlı Tarihi (Kuruluş ve Yükseliş)',
        weight: 4,
        subtopics: [
          { id: 'tar-1-1', title: 'Osmanlı Devleti\'nin Kuruluşu ve İlk Padişahlar' },
          { id: 'tar-1-2', title: 'İstanbul\'un Fethi ve Önemi' },
          { id: 'tar-1-3', title: 'Yükselme Devri: Yavuz Sultan Selim ve Kanuni' },
          { id: 'tar-1-4', title: 'Osmanlı\'da Devlet Teşkilatı ve Toprak Yönetimi' },
        ],
      },
      {
        id: 'tar-2',
        title: 'Osmanlı Tarihi (Duraklama, Gerileme ve Dağılma)',
        weight: 4,
        subtopics: [
          { id: 'tar-2-1', title: 'Duraklama ve Gerileme Dönemi Özellikleri' },
          { id: 'tar-2-2', title: 'Islahat Hareketleri (I. Mahmut\'tan II. Mahmut\'a)' },
          { id: 'tar-2-3', title: 'Tanzimat ve Islahat Fermanları' },
          { id: 'tar-2-4', title: 'I. ve II. Meşrutiyet' },
          { id: 'tar-2-5', title: 'Osmanlı Dağılma Dönemi ve Balkan Savaşları' },
        ],
      },
      {
        id: 'tar-3',
        title: 'I. Dünya Savaşı ve Kurtuluş Savaşı',
        weight: 5,
        subtopics: [
          { id: 'tar-3-1', title: 'I. Dünya Savaşı ve Osmanlı\'nın Savaşa Girişi' },
          { id: 'tar-3-2', title: 'Mondros Mütarekesi ve İşgaller' },
          { id: 'tar-3-3', title: 'Mustafa Kemal ve Kurtuluş Savaşı\'nın Başlaması' },
          { id: 'tar-3-4', title: 'Kongreler Dönemi (Erzurum, Sivas) ve TBMM\'nin Açılması' },
          { id: 'tar-3-5', title: 'Savaşlar (Sakarya, Büyük Taarruz) ve Lozan Antlaşması' },
        ],
      },
      {
        id: 'tar-4',
        title: 'Atatürk Dönemi İnkılapları',
        weight: 5,
        subtopics: [
          { id: 'tar-4-1', title: 'Siyasi İnkılaplar (Cumhuriyet, Halifeliğin Kaldırılması)' },
          { id: 'tar-4-2', title: 'Hukuk ve Eğitim İnkılapları' },
          { id: 'tar-4-3', title: 'Sosyal ve Kültürel İnkılaplar (Harf, Takvim, Kıyafet)' },
          { id: 'tar-4-4', title: 'Ekonomik İnkılaplar ve Devletçilik' },
          { id: 'tar-4-5', title: 'Atatürk İlkeleri (6 Ok)' },
        ],
      },
      {
        id: 'tar-5',
        title: 'Türkiye Tarihi (1938 Sonrası)',
        weight: 3,
        subtopics: [
          { id: 'tar-5-1', title: 'Çok Partili Hayata Geçiş ve Demokrat Parti Dönemi' },
          { id: 'tar-5-2', title: 'Askeri Müdahaleler ve Siyasi Gelişmeler (1960-1980)' },
          { id: 'tar-5-3', title: 'Türkiye\'nin Dış Politikası (Soğuk Savaş, AB süreci)' },
        ],
      },
      {
        id: 'tar-6',
        title: 'Türk-İslam Tarihi ve Dünya Tarihi',
        weight: 6,
        subtopics: [
          { id: 'tar-6-1', title: 'İslamiyet Öncesi Türk Devletleri (Hun, Göktürk, Uygur)' },
          { id: 'tar-6-2', title: 'İslamiyet\'in Kabulü ve İlk Müslüman Türk Devletleri' },
          { id: 'tar-6-3', title: 'Büyük Selçuklu ve Anadolu Selçuklu Devleti' },
          { id: 'tar-6-4', title: 'Haçlı Seferleri ve Moğol İstilası' },
          { id: 'tar-6-5', title: 'Fransız İhtilali ve Milliyetçilik Akımları' },
          { id: 'tar-6-6', title: 'II. Dünya Savaşı ve Sonrası Dünya' },
        ],
      },
    ],
  },

  // ----------------------------------------------------------------
  // COĞRAFYA — 18 Soru (Genel Kültür)
  // ----------------------------------------------------------------
  {
    id: 'cografya',
    name: 'Coğrafya',
    colorClass: 'subject-cografya',
    accentColor: '#34D399',
    icon: '🌍',
    totalWeight: 18,
    topics: [
      {
        id: 'cog-1',
        title: 'Türkiye Fiziki Coğrafyası',
        weight: 6,
        subtopics: [
          { id: 'cog-1-1', title: 'Türkiye\'nin Konumu ve Sınırları' },
          { id: 'cog-1-2', title: 'Yeryüzü Şekilleri (Dağlar, Ovalar, Platolar)' },
          { id: 'cog-1-3', title: 'İklim Tipleri ve Özellikleri' },
          { id: 'cog-1-4', title: 'Akarsular ve Göller' },
          { id: 'cog-1-5', title: 'Doğal Bitki Örtüsü ve Toprak Tipleri' },
        ],
      },
      {
        id: 'cog-2',
        title: 'Türkiye Beşeri ve Ekonomik Coğrafyası',
        weight: 5,
        subtopics: [
          { id: 'cog-2-1', title: 'Nüfus ve Yerleşme (Kır-Kent, Göç)' },
          { id: 'cog-2-2', title: 'Tarım Bölgeleri ve Ürünler' },
          { id: 'cog-2-3', title: 'Hayvancılık, Ormancılık, Balıkçılık' },
          { id: 'cog-2-4', title: 'Madencilik, Enerji Kaynakları ve Sanayi' },
          { id: 'cog-2-5', title: 'Ulaşım ve Ticaret' },
        ],
      },
      {
        id: 'cog-3',
        title: 'Bölgesel Coğrafya ve Haritalar',
        weight: 3,
        subtopics: [
          { id: 'cog-3-1', title: 'Türkiye\'nin Coğrafi Bölgeleri (7 Bölge)' },
          { id: 'cog-3-2', title: 'Harita Bilgisi ve Projeksiyon Sistemleri' },
        ],
      },
      {
        id: 'cog-4',
        title: 'Fiziki Coğrafya (Genel)',
        weight: 4,
        subtopics: [
          { id: 'cog-4-1', title: 'Dünya\'nın Şekli, Hareketleri ve Koordinat Sistemi' },
          { id: 'cog-4-2', title: 'Litosfer (Yer Kabuğu, Depremler, Volkanizma)' },
          { id: 'cog-4-3', title: 'Hidrosfer (Okyanuslar, Denizler, Akarsular)' },
          { id: 'cog-4-4', title: 'Atmosfer (Hava Kütleleri, Cephe Sistemleri, İklimler)' },
        ],
      },
    ],
  },

  // ----------------------------------------------------------------
  // VATANDAŞLIK (ANAYASA & HUK.) — 9 Soru (Genel Kültür)
  // ----------------------------------------------------------------
  {
    id: 'vatandaslik',
    name: 'Vatandaşlık',
    colorClass: 'subject-vatandaslik',
    accentColor: '#22D3EE',
    icon: '⚖️',
    totalWeight: 9,
    topics: [
      {
        id: 'vat-1',
        title: 'Temel Hukuk Kavramları',
        weight: 2,
        subtopics: [
          { id: 'vat-1-1', title: 'Hukukun Tanımı, Dalları ve Kaynakları' },
          { id: 'vat-1-2', title: 'Kamu Hukuku – Özel Hukuk Ayrımı' },
        ],
      },
      {
        id: 'vat-2',
        title: 'Türkiye Cumhuriyeti Anayasası',
        weight: 4,
        subtopics: [
          { id: 'vat-2-1', title: 'Anayasal Düzen ve Devletin Temel Nitelikleri' },
          { id: 'vat-2-2', title: 'Temel Hak ve Özgürlükler' },
          { id: 'vat-2-3', title: 'Yasama (TBMM) Organı' },
          { id: 'vat-2-4', title: 'Yürütme (Cumhurbaşkanı ve Bakanlar)' },
          { id: 'vat-2-5', title: 'Yargı Organları (Anayasa Mah., Danıştay, Yargıtay)' },
        ],
      },
      {
        id: 'vat-3',
        title: 'Seçim ve Siyasi Sistem',
        weight: 3,
        subtopics: [
          { id: 'vat-3-1', title: 'Seçim Sistemi ve Seçim İlkeleri' },
          { id: 'vat-3-2', title: 'Siyasi Partiler ve Sendikalar' },
          { id: 'vat-3-3', title: 'Kamu Yönetimi ve Yerel Yönetimler' },
        ],
      },
    ],
  },

  // ----------------------------------------------------------------
  // GÜNCEL BİLGİLER — 6 Soru (Genel Kültür)
  // ----------------------------------------------------------------
  {
    id: 'guncel',
    name: 'Güncel Bilgiler',
    colorClass: 'subject-guncel',
    accentColor: '#FBBF24',
    icon: '📰',
    totalWeight: 6,
    topics: [
      {
        id: 'gun-1',
        title: 'Türkiye Güncel Gelişmeler',
        weight: 3,
        subtopics: [
          { id: 'gun-1-1', title: 'Son 1 Yıl Siyasi ve Ekonomik Gelişmeler' },
          { id: 'gun-1-2', title: 'Uluslararası İlişkiler ve Türkiye' },
          { id: 'gun-1-3', title: 'Kültür, Spor ve Teknoloji Haberleri' },
        ],
      },
      {
        id: 'gun-2',
        title: 'Dünya Güncel Gelişmeler',
        weight: 3,
        subtopics: [
          { id: 'gun-2-1', title: 'Uluslararası Örgütler (BM, AB, NATO, AGİT)' },
          { id: 'gun-2-2', title: 'Küresel Ekonomi ve Ticaret' },
          { id: 'gun-2-3', title: 'Dünyada Güncel Siyasi Gelişmeler' },
        ],
      },
    ],
  },
];

// Konu başarım eşikleri için sabitler
export const LEVEL_THRESHOLDS = [
  { level: 1, xp: 0, title: 'Acemi Aday' },
  { level: 2, xp: 200, title: 'Çalışkan Öğrenci' },
  { level: 3, xp: 500, title: 'Kararlı Aday' },
  { level: 4, xp: 1000, title: 'Konu Avcısı' },
  { level: 5, xp: 1800, title: 'Konu Canavarı' },
  { level: 6, xp: 2800, title: 'Test Ustası' },
  { level: 7, xp: 4000, title: 'Sınav Stratejisti' },
  { level: 8, xp: 5500, title: 'Elit Aday' },
  { level: 9, xp: 7200, title: 'Atama Adayı' },
  { level: 10, xp: 9000, title: 'Derece Şampiyonu' },
];

export const BADGE_DEFINITIONS = [
  { id: 'first_subtopic', icon: '🌟', title: 'İlk Adım', desc: 'İlk alt konuyu tamamla', color: '#f59e0b' },
  { id: 'streak_3', icon: '🔥', title: '3 Günlük Alev', desc: '3 gün üst üste çalış', color: '#f97316' },
  { id: 'streak_7', icon: '⚡', title: 'Haftalık Fırtına', desc: '7 gün üst üste çalış', color: '#8b5cf6' },
  { id: 'streak_14', icon: '💎', title: 'Kristal Kararlılık', desc: '14 gün üst üste çalış', color: '#06b6d4' },
  { id: 'streak_30', icon: '👑', title: 'Efsane Seri', desc: '30 gün üst üste çalış', color: '#f43f5e' },
  { id: 'first_topic', icon: '🏆', title: 'Konu Tamamlayıcı', desc: 'Bir ana konuyu tamamen bitir', color: '#10b981' },
  { id: 'first_subject', icon: '🎓', title: 'Ders Şampiyonu', desc: 'Bir dersi tamamen bitir', color: '#6366f1' },
  { id: 'first_exam', icon: '📝', title: 'İlk Deneme', desc: 'İlk deneme sınavını kaydet', color: '#f59e0b' },
  { id: 'high_net', icon: '🚀', title: 'Net Avcısı', desc: 'Bir denemede 60+ net yap', color: '#10b981' },
  { id: 'review_done', icon: '🔁', title: 'Tekrar Ustası', desc: 'İlk tekrarını tamamla', color: '#8b5cf6' },
  { id: 'xp_1000', icon: '💥', title: '1000 XP Patlaması', desc: '1000 XP kazan', color: '#f43f5e' },
  { id: 'all_reviews', icon: '🧠', title: 'Tam Tekrar', desc: '10 tekrar tamamla', color: '#06b6d4' },
];

// Spaced repetition aralıkları (gün)
export const SR_INTERVALS = [2, 5, 10, 21];

export const XP_REWARDS = {
  subtopic_complete: 50,
  topic_complete: 150,
  subject_complete: 500,
  review_done: 30,
  exam_saved: 100,
  streak_3: 75,
  streak_7: 200,
  streak_14: 400,
  streak_30: 800,
};
