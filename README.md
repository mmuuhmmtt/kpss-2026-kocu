# KPSS 2026 Lisans Çalışma Koçu 🎯

KPSS 2026 Lisans sınavına hazırlanan adaylar için geliştirilmiş; konu takibi, aralıklı tekrar (spaced repetition) algoritması ve deneme sınavı net analizlerini tek bir panelde toplayan web tabanlı çalışma takip platformu.

---

## ⚡ Özellikler

- **⏱️ Sınav Sayacı & Hedef Net Takibi:** Sınava kalan süreyi (Gün, Saat, Dakika) ve hedeflenen net değerini anlık gösterir.
- **📚 3 Seviyeli Müfredat Haritası:** ÖSYM soru dağılımına uygun 6 KPSS dersi (Türkçe, Matematik, Tarih, Coğrafya, Vatandaşlık, Güncel Bilgiler) ve alt konuların yüzdesel ilerleme takibi.
- **🧠 Aralıklı Tekrar (Spaced Repetition):** Öğrenilen alt konuları Ebbinghaus unutma eğrisine göre 2, 5, 10 ve 21 günlük periyotlarda otomatik olarak tekrar listesine ekler.
- **📈 Deneme Sınavı & Net Grafiği:** Çözülen denemeleri kaydetme, ders bazlı net hesaplama ve derse göre renk değiştiren gelişim grafiği.
- **🏆 Oyunlaştırma (Gamification):** Çalıştıkça XP kazanma, seviye atlama, streak (günlük seri) ve KPSS başarımları/rozetleri.
- **💾 Veri Yedekleme & Sıfırlama:** Tüm verileri JSON olarak dışa/içe aktarma ve profil tercihlerini düzenleme.

---

## 🛠️ Teknolojiler

- **Frontend:** React 19, Vite
- **Styling:** Tailwind CSS (Modern Dark Mode & Glassmorphism)
- **Grafik:** Recharts
- **İkonlar:** Lucide React
- **Veri Saklama:** LocalStorage (Çevrimdışı çalışabilir)

---

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için:

```bash
# Depoyu klonlayın
git clone https://github.com/mmuuhmmtt/kpss-2026-kocu.git

# Proje dizinine geçin
cd kpss-2026-kocu

# Bağımlılıkları yükleyin
npm install

# Geliştirici sunucusunu başlatın
npm run dev
```

Üretim sürümü (Production build) almak için:

```bash
npm run build
```

---

## 📄 Lisans

MIT Lisansı ile lisanslanmıştır.
