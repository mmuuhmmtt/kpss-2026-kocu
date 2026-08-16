import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Save } from 'lucide-react';

export default function NoteModal({ subtopicId, subtopicTitle, onClose }) {
  const { state, saveNote } = useApp();
  const [text, setText] = useState(state.notes[subtopicId] || '');

  const handleSave = () => {
    saveNote(subtopicId, text);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="glass-card w-full max-w-md p-7 relative fade-slide-up border-0 bg-[#26262A] shadow-2xl rounded-[28px]"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-[#9E9E9E] hover:text-[#F5F5F0] transition-colors cursor-pointer">
          <X size={20} />
        </button>

        <div className="flex items-center gap-2.5 mb-1">
          <span className="text-xl">📝</span>
          <h3 className="font-extrabold text-[#F5F5F0] text-base">Konu Notu</h3>
        </div>
        <p className="text-xs text-[#9E9E9E] mb-4 truncate font-medium">{subtopicTitle}</p>

        <textarea
          className="w-full h-36 bg-[#1A1A1D] border-0 rounded-2xl p-4 text-sm text-[#F5F5F0] placeholder-[#9E9E9E] resize-none focus:outline-none shadow-inner leading-relaxed"
          placeholder="Zayıf olduğun noktalara, tekrar edilecek konulara, önemli detaylara not al..."
          value={text}
          onChange={e => setText(e.target.value)}
          autoFocus
        />

        <div className="flex justify-end items-center gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#9E9E9E] hover:text-[#F5F5F0] transition-colors cursor-pointer"
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black text-[#1A1A1D] bg-[#FF6B00] hover:opacity-90 transition-all cursor-pointer shadow-lg"
            style={{ filter: 'drop-shadow(0 0 8px rgba(255, 107, 0, 0.45))' }}
          >
            <Save size={14} /> Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}
