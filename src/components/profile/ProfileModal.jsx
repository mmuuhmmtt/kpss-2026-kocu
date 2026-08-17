import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_CURRICULUM } from '../../data/curriculum';
import { User, Settings, RotateCcw, Plus, Trash2, Save, X, AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';

const capitalizeWords = (str) => {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => (word ? word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1).toLocaleLowerCase('tr-TR') : ''))
    .join(' ');
};

export default function ProfileModal({ onClose }) {
  const { state, saveUserProfile, updateCurriculum, resetData } = useApp();
  
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'curriculum' | 'reset'

  // Profile Edit State
  const [name, setName] = useState(state.userProfile?.name || '');
  const [surname, setSurname] = useState(state.userProfile?.surname || '');
  const [profileSavedNotice, setProfileSavedNotice] = useState(false);
  const [profileError, setProfileError] = useState('');

  // Curriculum Editor State
  const [curriculum, setCurriculum] = useState(state.curriculum);
  const [curriculumSavedNotice, setCurriculumSavedNotice] = useState(false);

  // Reset Confirmation State
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetDoneNotice, setResetDoneNotice] = useState(false);

  // Profile Form Submit
  const handleProfileSave = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setProfileError('Lütfen adınızı giriniz.');
      return;
    }
    setProfileError('');
    saveUserProfile({
      name: capitalizeWords(name.trim()),
      surname: capitalizeWords(surname.trim()),
      targetNet: state.userProfile?.targetNet || 35,
    });
    setProfileSavedNotice(true);
    setTimeout(() => setProfileSavedNotice(false), 2000);
  };

  // Curriculum Save
  const handleSaveCurriculum = () => {
    updateCurriculum(curriculum);
    setCurriculumSavedNotice(true);
    setTimeout(() => setCurriculumSavedNotice(false), 2000);
  };

  const handleResetCurriculum = () => {
    setCurriculum(INITIAL_CURRICULUM);
  };

  // Topic & Subtopic Management
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

  const updateTopicTitle = (sIdx, tIdx, val) => {
    const c = [...curriculum];
    const topics = [...c[sIdx].topics];
    topics[tIdx] = { ...topics[tIdx], title: val };
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

  // Full Data Reset
  const handleFullResetData = () => {
    resetData();
    setCurriculum(INITIAL_CURRICULUM);
    setConfirmReset(false);
    setResetDoneNotice(true);
    setTimeout(() => {
      setResetDoneNotice(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 p-4 sm:p-6 md:p-8 flex items-center justify-center bg-black/85 backdrop-blur-2xl overflow-y-auto">
      
      {/* Background Radial Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FF6B00]/20 via-[#0B0C0E]/95 to-[#0B0C0E] pointer-events-none" />

      {/* Main Glassmorphic Modal Dialog */}
      <div className="w-full max-w-2xl bg-[#16171C]/90 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] rounded-[32px] p-6 sm:p-8 fade-slide-up relative my-auto border-t border-t-white/10 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[#FF6B00] text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck size={14} className="text-[#FF6B00]" />
            <span>Kullanıcı & Çalışma Ayarları</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Profil & Müfredat Yönetimi
          </h2>
        </div>

        {/* 3 Nav Tabs */}
        <div className="flex gap-2 bg-[#111113] p-1.5 rounded-2xl border border-white/10 shadow-inner mb-6">
          {[
            ['profile', '👤 Profili Düzenle'],
            ['curriculum', '📚 Konu Ekle / Sil'],
            ['reset', '🔄 Verileri Sıfırla'],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer text-center truncate ${
                activeTab === id
                  ? 'bg-[#FF6B00] text-slate-950 shadow-md shadow-[#FF6B00]/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* TAB 1: PROFILE EDIT */}
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileSave} className="space-y-5 fade-slide-up">
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User size={14} className="text-[#FF6B00]" /> Adınız *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (profileError) setProfileError('');
                }}
                onBlur={() => setName(capitalizeWords(name))}
                placeholder="Örn: Ahmet"
                className="w-full h-13 px-4 bg-[#111113] border border-white/10 rounded-2xl text-white placeholder-slate-500 text-sm font-semibold focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all shadow-inner"
              />
              {profileError && <p className="text-rose-400 text-xs font-semibold mt-1.5">{profileError}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User size={14} className="text-[#FF6B00]" /> Soyadınız
              </label>
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                onBlur={() => setSurname(capitalizeWords(surname))}
                placeholder="Örn: Yılmaz (Opsiyonel)"
                className="w-full h-13 px-4 bg-[#111113] border border-white/10 rounded-2xl text-white placeholder-slate-500 text-sm font-semibold focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all shadow-inner"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              {profileSavedNotice ? (
                <span className="text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={16} /> Profil başarıyla güncellendi!
                </span>
              ) : <span />}

              <button
                type="submit"
                className="px-6 h-13 rounded-2xl bg-[#FF6B00] hover:bg-[#FF8533] text-slate-950 font-black text-sm shadow-xl shadow-[#FF6B00]/20 transition-all flex items-center gap-2 cursor-pointer ml-auto"
              >
                <Save size={16} />
                <span>Kaydet</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: CURRICULUM TOPIC EDITOR (KONU EKLE & SİL) */}
        {activeTab === 'curriculum' && (
          <div className="space-y-6 fade-slide-up">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">
                Tarih ve Coğrafya konularını düzenleyin, yeni alt başlık ekleyin veya silin.
              </span>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={handleResetCurriculum}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-[#111113] border border-white/10 shadow-inner transition-all cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw size={13} /> Sıfırla
                </button>
                <button
                  onClick={handleSaveCurriculum}
                  className="px-4 py-2 rounded-xl text-xs font-black text-slate-950 bg-[#FF6B00] hover:bg-[#FF8533] transition-all cursor-pointer shadow-md flex items-center gap-1"
                >
                  <Save size={13} /> {curriculumSavedNotice ? 'Kaydedildi!' : 'Kaydet'}
                </button>
              </div>
            </div>

            {curriculum.map((subject, sIdx) => (
              <div key={subject.id} className="p-5 bg-[#111113] border border-white/10 rounded-2xl space-y-4">
                <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2 font-extrabold text-white text-base">
                    <span>{subject.icon}</span>
                    <span>{subject.name}</span>
                  </div>
                  <button
                    onClick={() => addTopic(sIdx)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                  >
                    <Plus size={13} /> Ana Konu Ekle
                  </button>
                </div>

                <div className="space-y-4">
                  {subject.topics.map((topic, tIdx) => (
                    <div key={topic.id} className="bg-[#181A1F] p-4 rounded-xl border border-white/5 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={topic.title}
                          onChange={(e) => updateTopicTitle(sIdx, tIdx, e.target.value)}
                          className="flex-1 bg-[#111113] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-[#FF6B00]"
                        />
                        <button
                          onClick={() => deleteTopic(sIdx, tIdx)}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                          title="Ana Konuyu Sil"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Subtopics */}
                      <div className="pl-3 space-y-2 border-l-2 border-white/10">
                        {topic.subtopics.map((sub, subIdx) => (
                          <div key={sub.id} className="flex items-center justify-between gap-2">
                            <input
                              type="text"
                              value={sub.title}
                              onChange={(e) => updateSubtopicTitle(sIdx, tIdx, subIdx, e.target.value)}
                              className="flex-1 bg-[#111113] border border-white/5 rounded-lg px-2.5 py-1 text-xs text-slate-200 font-medium focus:outline-none focus:border-[#FF6B00]"
                            />
                            <button
                              onClick={() => deleteSubtopic(sIdx, tIdx, subIdx)}
                              className="p-1 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                              title="Alt Konuyu Sil"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addSubtopic(sIdx, tIdx)}
                          className="text-[11px] text-[#FF6B00] font-bold hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                        >
                          <Plus size={12} /> Alt Konu Ekle
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: RESET DATA */}
        {activeTab === 'reset' && (
          <div className="p-6 bg-[#221316]/90 border border-rose-500/30 rounded-2xl text-center space-y-4 fade-slide-up">
            <AlertTriangle size={36} className="text-rose-400 mx-auto" />
            <h3 className="text-lg font-black text-white">Tüm Verileri Sıfırla</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Tüm tamamlanan konularınız, deneme sınavı kayıtlarınız, XP puanlarınız ve aralıklı tekrar listeniz kalıcı olarak silinecektir.
            </p>

            {resetDoneNotice ? (
              <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold">
                Tüm verileriniz başarıyla sıfırlandı!
              </div>
            ) : !confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="px-6 py-3 rounded-2xl bg-rose-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-rose-500/20 hover:bg-rose-400 transition-all cursor-pointer"
              >
                Verileri Sıfırla
              </button>
            ) : (
              <div className="flex justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 text-slate-300 font-bold text-xs hover:bg-white/20 cursor-pointer"
                >
                  Vazgeç
                </button>
                <button
                  type="button"
                  onClick={handleFullResetData}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 text-white font-extrabold text-xs shadow-lg hover:bg-rose-500 cursor-pointer"
                >
                  Evet, Eminim Sıfırla
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
