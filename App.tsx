import React, { useState } from 'react';
import { UI_STYLES } from './constants';
import { UIStyle } from './types';
import { PreviewSection } from './components/PreviewSection';
import { AddStyleModal } from './components/AddStyleModal';
import { LayoutGrid, ChevronDown, Plus } from 'lucide-react';

const App: React.FC = () => {
  // Use state for styles so we can add to it
  const [styles, setStyles] = useState<UIStyle[]>(UI_STYLES);
  const [selectedStyleId, setSelectedStyleId] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedStyle = styles.find(s => s.id === selectedStyleId) || null;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStyleId(e.target.value);
  };

  const handleAddNewStyle = (newStyleData: Omit<UIStyle, 'id'>) => {
    const newId = `custom-${Date.now()}`;
    const newStyle: UIStyle = {
      id: newId,
      ...newStyleData
    };

    setStyles([...styles, newStyle]);
    setSelectedStyleId(newId); // Auto-select the new style
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <LayoutGrid className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">UI Style Reference</h1>
              <p className="text-xs text-slate-400">Design System Library</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        
        <div className="flex flex-col gap-8">
          
          {/* Selection Area */}
          <div className="w-full space-y-3">
            <div className="flex justify-between items-end">
              <label htmlFor="style-select" className="block text-sm font-medium text-slate-300">
                Chọn phong cách thiết kế (Select UI Style)
              </label>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="text-xs md:text-sm text-primary hover:text-blue-400 flex items-center gap-1 transition-colors font-medium px-2 py-1 hover:bg-primary/10 rounded-md"
              >
                <Plus className="w-3 h-3 md:w-4 md:h-4" />
                Thêm mới
              </button>
            </div>
            
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <select
                  id="style-select"
                  value={selectedStyleId}
                  onChange={handleSelectChange}
                  className="w-full appearance-none bg-slate-800 border border-slate-600 hover:border-primary text-white text-lg rounded-xl px-5 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-lg cursor-pointer"
                >
                  <option value="" disabled>-- Vui lòng chọn một phong cách --</option>
                  {styles.map((style) => (
                    <option key={style.id} value={style.id}>
                      {style.category}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
              </div>
            </div>
            
            <p className="text-sm text-slate-500">
              Chọn một danh mục để xem chi tiết hoặc thêm phong cách tùy chỉnh của bạn.
            </p>
          </div>

          {/* Detail View */}
          <div className="w-full">
             <PreviewSection style={selectedStyle} />
          </div>
          
        </div>
      </main>

      {/* Modal for adding new styles */}
      <AddStyleModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddNewStyle}
      />
    </div>
  );
};

export default App;