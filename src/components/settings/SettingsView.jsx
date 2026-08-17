import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_CURRICULUM } from '../../data/curriculum';
import { Plus, Trash2, Save, AlertTriangle, RotateCcw, Download, Upload, CheckCircle2 } from 'lucide-react';

export default function SettingsView() {
  const { state, updateCurriculum, resetData } = useApp();
  const [confirmReset, setConfirmReset] = useState(false);
  const [activeTab, setActiveTab] = useState('curriculum'); // 'curriculum' | 'backup'
  const [resetDoneNotice, setResetDoneNotice] = useState(false);

  // Curriculum editor state
  const [curriculum, setCurriculum] = useState(state.curriculum);
  const [saved, setSaved] = useState(false);

  const handleSaveCurriculum = () => {
    updateCurriculum(curriculum);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleResetCurriculum = () => {
    setCurriculum(INITIAL_CURRICULUM);
  };

  const handleFullResetData = () => {
    resetData();
    setCurriculum(INITIAL_CURRICULUM);
    setConfirmReset(false);
    setResetDoneNotice(true);
    setTimeout(() => setResetDoneNotice(false), 3500);
  };

  const updateSubjectWeight = (sIdx, val) => {
    const c = [...curriculum];
    c[sIdx] = { ...c[sIdx], totalWeight: parseInt(val) || 0 };
    setCurriculum(c);
  };

  const updateTopicWeight = (sIdx, tIdx, val) => {
    const c = [...curriculum];
    const topics = [...c[sIdx].topics];
    topics[tIdx] = { ...topics[tIdx], weight: parseInt(val) || 0 };
    c[sIdx] = { ...c[sIdx], topics };
    setCurriculum(c);
  };

  const updateTopicTitle = (sIdx, tIdx, val) => {
    const c = [...curriculum];
    const topics = [...c[sIdx].topics];
    topics[tIdx] = { ...topics[tIdx], title: val };
    c[sIdx] = { ...c[sIdx], topics };
    setCurriculum(c);
  };

  const addTopic = (sIdx) => {
    const c = [...curriculum];
    const topics = [...c[sIdx].topics];
    const newId = `custom_${Date.now()}`;
    topics.push({ id: newId, title: 'Yeni Ana Konu', weight: 1, subtopics: [{ id: `${newId}_1`, title: 'Yeni Alt Konu' }] });
    c[sIdx] = { ...c[sIdx], topics };
    setCurriculum(c);
  };

  const deleteTopic = (sIdx, tIdx) => {
    const c = [...curriculum];
    const topics = [...c[sIdx].topics];
    topics.splice(tIdx, 1);
    c[sIdx] = { ...c[sIdx], topics };
    setCurriculum(c);
  };

  const addSubtopic = (sIdx, tIdx) => {
    const c = [...curriculum];
    const topics = [...c[sIdx].topics];
    const subs = [...topics[tIdx].subtopics];
    subs.push({ id: `custom_${Date.now()}`, title: 'Yeni Alt Konu' });
    topics[tIdx] = { ...topics[tIdx], subtopics: subs };
    c[sIdx] = { ...c[sIdx], topics };
    setCurriculum(c);
  };

  const deleteSubtopic = (sIdx, tIdx, subIdx) => {
    const c = [...curriculum];
    const topics = [...c[sIdx].topics];
    const subs = [...topics[tIdx].subtopics];
    subs.splice(subIdx, 1);
    topics[tIdx] = { ...topics[tIdx], subtopics: subs };
    c[sIdx] = { ...c[sIdx], topics };
    setCurriculum(c);
  };

  const updateSubtopicTitle = (sIdx, tIdx, subIdx, val) => {
    const c = [...curriculum];
    const topics = [...c[sIdx].topics];
    const subs = [...topics[tIdx].subtopics];
    subs[subIdx] = { ...subs[subIdx], title: val };
    topics[tIdx] = { ...topics[tIdx], subtopics: subs };
    c[sIdx] = { ...c[sIdx], topics };
    setCurriculum(c);
  };

  const handleExport = () => {
    const data = JSON.stringify({ curriculum: state.curriculum, completed: state.completed, exams: state.exams, notes: state.notes, xp: state.xp, badges: state.badges }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kpss_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.curriculum) updateCurriculum(data.curriculum);
        alert('Müfredat başarıyla yüklendi!');
      } catch {
        alert('Geçersiz dosya!');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full flex flex-col gap-8 md:gap-10 fade-slide-up pb-12">
      {/* Notice Banner when reset is successful */}
      {resetDoneNotice && (
        <div className="glass-card p-4 border-0 bg-[#26262A] text-[#F5F5F0] flex items-center gap-3 shadow-lg rounded-[24px]">
          <CheckCircle2 size={20} className="text-[#34D399] flex-shrink-0" />
          <div className="text-xs font-bold">
            Tüm ilerleme, XP, rozetler ve çalışma verileriniz başarıyla sıfırlandı!
          </div>
        </div>
      )}

      {/* Navigation Tabs - Modern Pill */}
      <div className="flex gap-2 bg-[#111113] p-1.5 rounded-2xl border border-white/10 shadow-inner">
        {[['curriculum', '📚 Müfredat Düzenleyici'], ['backup', '🔄 İlerleme & Veri Sıfırlama']].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === id
                ? 'bg-[#FF6B00] text-slate-950 shadow-md shadow-[#FF6B00]/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'curriculum' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-white">Müfredat & Soru Ağırlıkları</h3>
            <div className="flex gap-2">
              <button
                onClick={handleResetCurriculum}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold text-slate-400 hover:text-white bg-[#111113] border border-white/10 shadow-inner transition-all cursor-pointer"
              >
                <RotateCcw size={14} /> Varsayılan
              </button>
              <button
                onClick={handleSaveCurriculum}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl text-xs font-black text-slate-950 bg-[#FF6B00] hover:bg-[#FF8533] transition-all cursor-pointer shadow-lg shadow-[#FF6B00]/20"
              >
                <Save size={14} /> {saved ? 'Kaydedildi!' : 'Değişiklikleri Kaydet'}
              </button>
            </div>
          </div>

          {curriculum.map((subject, sIdx) => (
            <div key={subject.id} className="p-6 bg-[#16171C]/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl">
              {/* Subject header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{subject.icon}</span>
                <div className="flex-1 font-extrabold text-[#F5F5F0] text-base">{subject.name}</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#9E9E9E] font-bold">Toplam Soru:</span>
                  <input
                    type="number"
                    className="w-16 bg-[#1A1A1D] border-0 rounded-xl px-2 py-1 text-sm text-center text-[#F5F5F0] font-bold focus:outline-none shadow-inner"
                    value={subject.totalWeight}
                    onChange={e => updateSubjectWeight(sIdx, e.target.value)}
                  />
                </div>
                <button
                  onClick={() => addTopic(sIdx)}
                  className="flex items-center gap-1 px-3.5 py-2 rounded-2xl text-xs font-bold text-[#1A1A1D] bg-[#F5F5F0] hover:opacity-90 transition-all cursor-pointer shadow-md"
                >
                  <Plus size={14} /> Konu Ekle
                </button>
              </div>

              {/* Topics */}
              <div className="space-y-3 pl-1">
                {subject.topics.map((topic, tIdx) => (
                  <div key={topic.id} className="bg-[#1A1A1D] rounded-[22px] p-4 shadow-inner">
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        className="flex-1 bg-transparent text-sm font-bold text-[#F5F5F0] focus:outline-none pb-0.5"
                        value={topic.title}
                        onChange={e => updateTopicTitle(sIdx, tIdx, e.target.value)}
                      />
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-[#9E9E9E]">Soru:</span>
                        <input
                          type="number"
                          className="w-12 bg-[#26262A] border-0 rounded-xl px-1.5 py-1 text-xs text-center text-[#F5F5F0] font-bold focus:outline-none"
                          value={topic.weight}
                          onChange={e => updateTopicWeight(sIdx, tIdx, e.target.value)}
                        />
                      </div>
                      <button onClick={() => addSubtopic(sIdx, tIdx)} className="p-1 text-[#F5F5F0] hover:opacity-80 transition-opacity cursor-pointer" title="Alt Konu Ekle">
                        <Plus size={16} />
                      </button>
                      <button onClick={() => deleteTopic(sIdx, tIdx)} className="p-1 text-[#9E9E9E] hover:text-[#D09B82] transition-colors cursor-pointer" title="Konuyu Sil">
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Subtopics */}
                    <div className="space-y-1.5 pl-3 border-l-2 border-[#26262A]">
                      {topic.subtopics.map((sub, subIdx) => (
                        <div key={sub.id} className="flex items-center gap-2">
                          <input
                            className="flex-1 bg-transparent text-xs text-[#9E9E9E] focus:outline-none focus:text-[#F5F5F0] pb-0.5 transition-colors"
                            value={sub.title}
                            onChange={e => updateSubtopicTitle(sIdx, tIdx, subIdx, e.target.value)}
                          />
                          <button onClick={() => deleteSubtopic(sIdx, tIdx, subIdx)} className="text-[#9E9E9E] hover:text-[#D09B82] transition-colors flex-shrink-0 cursor-pointer">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'backup' && (
        <div className="space-y-4">
          {/* Reset Section Banner */}
          <div className="glass-card p-6 border-0 bg-[#26262A] shadow-xl rounded-[28px]">
            <h4 className="font-extrabold text-[#D09B82] text-base mb-2 flex items-center gap-2">
              <AlertTriangle size={18} /> Tüm İlerlemeyi ve Verileri Sıfırla
            </h4>
            <p className="text-xs text-[#9E9E9E] mb-4 leading-relaxed">
              Bu buton ile uygulamadaki tüm tamamlanan konularınız, XP puanlarınız, kazandığınız rozetler, deneme sınavı kayıtlarınız ve günlük alışkanlık verileriniz tamamen silinerek uygulama ilk günkü durumuna döndürülür.
            </p>
            {!confirmReset ? (
              <button
                onClick={() => setConfirmReset(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-extrabold text-[#1A1A1D] bg-[#F5F5F0] hover:opacity-90 transition-all shadow-md cursor-pointer"
              >
                <Trash2 size={15} /> İlerlemeyi Sıfırla
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-[#1A1A1D] shadow-inner space-y-3">
                <div className="text-xs font-bold text-[#D09B82]">
                  ⚠️ Tüm verilerinizi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleFullResetData}
                    className="flex items-center gap-2 px-5 py-2 rounded-2xl text-xs font-black text-[#1A1A1D] bg-[#D09B82] hover:opacity-90 transition-all cursor-pointer shadow-lg"
                  >
                    <Trash2 size={14} /> Evet, Hepsini Sıfırla
                  </button>
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="px-4 py-2 rounded-2xl text-xs font-bold text-[#9E9E9E] hover:text-[#F5F5F0] bg-[#26262A] transition-colors cursor-pointer"
                  >
                    İptal
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Export Backup */}
          <div className="glass-card p-6 border-0 bg-[#26262A] shadow-xl rounded-[28px]">
            <h4 className="font-extrabold text-[#F5F5F0] text-sm mb-1 flex items-center gap-2">
              <Download size={16} className="text-[#F5F5F0]" /> Veriyi Dışa Aktar (Yedekle)
            </h4>
            <p className="text-xs text-[#9E9E9E] mb-4">İlerleme, notlar, denemeler ve rozetlerinizi bilgisayarınıza JSON olarak indirin.</p>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-[#1A1A1D] bg-[#F5F5F0] hover:opacity-90 transition-all shadow-md cursor-pointer"
            >
              <Download size={15} /> JSON Yedeği İndir
            </button>
          </div>

          {/* Import Backup */}
          <div className="glass-card p-6 border-0 bg-[#26262A] shadow-xl rounded-[28px]">
            <h4 className="font-extrabold text-[#F5F5F0] text-sm mb-1 flex items-center gap-2">
              <Upload size={16} className="text-[#F5F5F0]" /> Müfredat İçe Aktar
            </h4>
            <p className="text-xs text-[#9E9E9E] mb-4">Daha önce yedeklediğiniz JSON dosyasını seçerek yükleyin.</p>
            <label
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-[#1A1A1D] bg-[#F5F5F0] cursor-pointer transition-all hover:opacity-90 w-fit shadow-md"
            >
              <Upload size={15} /> JSON Dosyası Yükle
              <input type="file" accept=".json" className="hidden" onChange={handleImport} />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

