import React, { useState } from 'react';
import { X, Save, Image as ImageIcon } from 'lucide-react';
import { UIStyle } from '../types';

interface AddStyleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (style: Omit<UIStyle, 'id'>) => void;
}

export const AddStyleModal: React.FC<AddStyleModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    category: '',
    keywords: '',
    colors: '',
    effects: '',
    imageUrl: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category) return;
    onSave(formData);
    setFormData({ category: '', keywords: '', colors: '', effects: '', imageUrl: '' }); // Reset form
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-700 bg-slate-800/50 sticky top-0 z-10 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white">Thêm phong cách mới</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Tên phong cách (Category Name) <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-600"
              placeholder="Ví dụ: Cyberpunk 2077"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Từ khóa (Keywords)
            </label>
            <textarea
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-600 min-h-[80px]"
              placeholder="Neon, high tech, glitch effect..."
              value={formData.keywords}
              onChange={e => setFormData({...formData, keywords: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Màu sắc chủ đạo (Color Schemes)
            </label>
            <input
              type="text"
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-600"
              placeholder="Neon Yellow, Black, Dark Grey..."
              value={formData.colors}
              onChange={e => setFormData({...formData, colors: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Hiệu ứng & Tính năng (Effects)
            </label>
            <textarea
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-600 min-h-[80px]"
              placeholder="Glowing borders, futuristic fonts..."
              value={formData.effects}
              onChange={e => setFormData({...formData, effects: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Link ảnh đại diện (Image URL) - <span className="text-slate-500 font-normal">Tùy chọn</span>
            </label>
            <input
              type="url"
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-600"
              placeholder="https://example.com/image.jpg"
              value={formData.imageUrl}
              onChange={e => setFormData({...formData, imageUrl: e.target.value})}
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors font-medium"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <Save className="w-4 h-4" />
              Lưu phong cách
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};