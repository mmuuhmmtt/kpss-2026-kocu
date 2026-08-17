// ============================================================
// KPSS 2026 Lisans - Müfredat & Soru Ağırlıkları
// Sınav Tarihi: 6 Eylül 2026
// Güncellemek için bu dosyayı düzenleyin veya Ayarlar > Müfredat Düzenleyici kullanın.
// ============================================================

export const EXAM_DATE = new Date('2026-09-06T09:00:00');

export const INITIAL_CURRICULUM = [
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
        title: 'İslamiyet öncesi Türk tarihi',
        weight: 3,
        subtopics: [
          { id: 'tar-1-1', title: 'Türklerin Anayurdu ve İlk Göçler' },
          { id: 'tar-1-2', title: 'Asya Hun, Göktürk ve Uygur Devletleri' },
          { id: 'tar-1-3', title: 'İlk Türk Devletlerinde Devlet Teşkilatı, Kültür ve Medeniyet' },
        ],
      },
      {
        id: 'tar-2',
        title: 'Türk-İslam devletleri',
        weight: 3,
        subtopics: [
          { id: 'tar-2-1', title: 'İslamiyet’in Kabulü ve Karahanlılar, Gazneliler' },
          { id: 'tar-2-2', title: 'Büyük Selçuklu Devleti ve Türkiye Selçuklu Devleti' },
          { id: 'tar-2-3', title: 'Türk-İslam Devletlerinde Kültür, Medeniyet ve Bilim' },
        ],
      },
      {
        id: 'tar-3',
        title: 'Osmanlı Devleti siyasi gelişmeleri',
        weight: 4,
        subtopics: [
          { id: 'tar-3-1', title: 'Osmanlı Kuruluş ve Yükselme Dönemi Siyasi Gelişmeleri' },
          { id: 'tar-3-2', title: 'Osmanlı Duraklama ve Gerileme Dönemi Siyasi Olayları' },
          { id: 'tar-3-3', title: 'Osmanlı Dağılma Dönemi, Savaşlar ve Antlaşmalar' },
        ],
      },
      {
        id: 'tar-4',
        title: 'Osmanlı kültür ve uygarlığı',
        weight: 4,
        subtopics: [
          { id: 'tar-4-1', title: 'Devlet Teşkilatı, Padişah ve Divan-ı Hümayun' },
          { id: 'tar-4-2', title: 'Toprak Yönetimi, Tımar Sistemi ve Ordu Teşkilatı' },
          { id: 'tar-4-3', title: 'Hukuk, Eğitim, Sanat, Mimari ve Sosyal Hayat' },
        ],
      },
      {
        id: 'tar-5',
        title: 'Kurtuluş Savaşı süreci',
        weight: 5,
        subtopics: [
          { id: 'tar-5-1', title: 'I. Dünya Savaşı, Mondros ve İşgaller' },
          { id: 'tar-5-2', title: 'Cemiyetler, Genelgeler, Kongreler ve TBMM\'nin Açılması' },
          { id: 'tar-5-3', title: 'Kurtuluş Savaşı Cepheleri ve Lozan Barış Antlaşması' },
        ],
      },
      {
        id: 'tar-6',
        title: 'Atatürk ilke ve inkılapları',
        weight: 3,
        subtopics: [
          { id: 'tar-6-1', title: 'Siyasi, Hukuki ve Eğitim Alanındaki İnkılaplar' },
          { id: 'tar-6-2', title: 'Toplumsal ve Ekonomik İnkılaplar' },
          { id: 'tar-6-3', title: 'Atatürk İlkeleri (Altı Temel İlke)' },
        ],
      },
      {
        id: 'tar-7',
        title: 'Atatürk dönemi iç ve dış politika',
        weight: 3,
        subtopics: [
          { id: 'tar-7-1', title: 'Atatürk Dönemi İç Politika ve Çok Partili Hayat Denemeleri' },
          { id: 'tar-7-2', title: 'Atatürk Dönemi Türk Dış Politikası (Milletler Cemiyeti, Boğazlar, Hatay)' },
        ],
      },
      {
        id: 'tar-8',
        title: 'Çağdaş Türk ve dünya tarihi',
        weight: 2,
        subtopics: [
          { id: 'tar-8-1', title: '20. Yüzyıl Başlarında Dünya ve II. Dünya Savaşı' },
          { id: 'tar-8-2', title: 'Soğuk Savaş Dönemi, Yumuşama ve Küreselleşen Dünya' },
          { id: 'tar-8-3', title: 'Türk Dünyası ve Bağımsız Türk Cumhuriyetleri' },
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
        title: 'Türkiye’nin Coğrafi Konumu',
        weight: 2,
        subtopics: [
          { id: 'cog-1-1', title: 'Mutlak (Matematik) Konum ve Sonuçları' },
          { id: 'cog-1-2', title: 'Göreceli (Özel) Konum ve Jeopolitik Konum' },
          { id: 'cog-1-3', title: 'Türkiye’nin Saat Dilimleri ve Sınır Komşuları' },
        ],
      },
      {
        id: 'cog-2',
        title: 'Türkiye’nin Fiziki Özellikleri',
        weight: 3,
        subtopics: [
          { id: 'cog-2-1', title: 'Yer Şekilleri, Dağlar, Ovalar ve Platolar' },
          { id: 'cog-2-2', title: 'Türkiye’nin Akarsuları, Gölleri ve Kıyıları' },
          { id: 'cog-2-3', title: 'Jeolojik Yapı, Depremler ve Volkanizma' },
        ],
      },
      {
        id: 'cog-3',
        title: 'Türkiye’nin İklimi ve Bitki Örtüsü',
        weight: 3,
        subtopics: [
          { id: 'cog-3-1', title: 'Sıcaklık, Basınç, Rüzgarlar ve Nemlilik' },
          { id: 'cog-3-2', title: 'Türkiye’deki İklim Tipleri (Akdeniz, Karadeniz, Karasal)' },
          { id: 'cog-3-3', title: 'Bitki Örtüsü ve Toprak Tipleri' },
        ],
      },
      {
        id: 'cog-4',
        title: 'Türkiye’de Nüfus ve Yerleşme',
        weight: 2,
        subtopics: [
          { id: 'cog-4-1', title: 'Nüfusun Dağılışı, Yoğunluğu ve Demografik Yapı' },
          { id: 'cog-4-2', title: 'Göçler (İç Göç, Dış Göç) ve Nüfus Piramitleri' },
          { id: 'cog-4-3', title: 'Kır ve Kent Yerleşmeleri, Mesken Tipleri' },
        ],
      },
      {
        id: 'cog-5',
        title: 'Türkiye\'de Tarım, Hayvancılık ve Ormancılık',
        weight: 2,
        subtopics: [
          { id: 'cog-5-1', title: 'Tarım Ürünleri ve Tarım Bölgeleri' },
          { id: 'cog-5-2', title: 'Hayvancılık Türleri ve Dağılışı' },
          { id: 'cog-5-3', title: 'Ormancılık ve Orman Ürünleri' },
        ],
      },
      {
        id: 'cog-6',
        title: 'Türkiye\'de Madenler, Enerji Kaynakları, Sanayi ve Endüstri',
        weight: 2,
        subtopics: [
          { id: 'cog-6-1', title: 'Metalik ve Ametal Madenler' },
          { id: 'cog-6-2', title: 'Enerji Kaynakları (Yenilenebilir ve Yenilenemeyen)' },
          { id: 'cog-6-3', title: 'Sanayi Kolları ve Tesis Dağılışı' },
        ],
      },
      {
        id: 'cog-7',
        title: 'Türkiye\'de Ulaşım, Ticaret ve Turizm',
        weight: 2,
        subtopics: [
          { id: 'cog-7-1', title: 'Ulaşım Sistemleri (Karayolu, Demiryolu, Denizyolu, Havayolu)' },
          { id: 'cog-7-2', title: 'İç ve Dış Ticaret, İhrakat-İthalat Ürünleri' },
          { id: 'cog-7-3', title: 'Turizm Çeşitleri ve Turizm Varlıkları' },
        ],
      },
      {
        id: 'cog-8',
        title: 'Türkiye\'de Bölgeler Coğrafyası',
        weight: 2,
        subtopics: [
          { id: 'cog-8-1', title: 'Coğrafi Bölge ve Bölüm Özellikleri' },
          { id: 'cog-8-2', title: 'Bölgesel Kalkınma Projeleri (GAP, DAP, DOKAP, ZBK vb.)' },
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
