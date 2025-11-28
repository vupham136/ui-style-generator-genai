import React, { useState } from 'react';
import { UIStyle } from '../types';
import { Palette, Sparkles, Tags, Info, Copy, Check, Image as ImageIcon } from 'lucide-react';

interface PreviewSectionProps {
  style: UIStyle | null;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({ style }) => {
  const [isCopied, setIsCopied] = useState(false);

  if (!style) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-700 rounded-2xl bg-slate-800/30 p-8 text-center animate-in fade-in">
        <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
          <Info className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-300 mb-2">Chưa có thông tin</h3>
        <p className="text-slate-500 max-w-sm">
          Vui lòng chọn phong cách từ danh sách phía trên để xem bảng phân tích chi tiết.
        </p>
      </div>
    );
  }

  // Split keywords string into an array for badges
  const keywordList = style.keywords.split(',').map(k => k.trim());

  const handleCopy = () => {
    const textToCopy = `Style: ${style.category}
---
Keywords: ${style.keywords}
Colors: ${style.colors}
Effects: ${style.effects}
Image: ${style.imageUrl || 'N/A'}`;

    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-surface border border-slate-700 rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 border-b border-slate-700 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {style.category}
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full"></div>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 backdrop-blur-sm border border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg transition-all active:scale-95 shadow-lg"
            title="Sao chép thông tin phong cách"
          >
            {isCopied ? (
              <>
                <Check className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium text-green-400">Đã sao chép</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span className="text-sm font-medium">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        
        {/* Keywords Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Tags className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-slate-200">Keywords (Từ khóa)</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {keywordList.map((keyword, index) => (
              <span 
                key={index} 
                className="px-3 py-1.5 bg-slate-800 border border-slate-600 text-slate-300 rounded-full text-sm font-medium hover:bg-slate-700 hover:border-slate-500 transition-colors cursor-default"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Colors Section */}
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 hover:border-slate-600 transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <Palette className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-slate-200">Color Schemes</h3>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {style.colors}
            </p>
          </div>

          {/* Effects Section */}
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 hover:border-slate-600 transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-slate-200">Effects & Features</h3>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {style.effects}
            </p>
          </div>
        </div>

        {/* Preview Image Section (Bottom) */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="w-5 h-5 text-pink-400" />
            <h3 className="text-lg font-semibold text-slate-200">Visual Preview (Ảnh minh họa)</h3>
          </div>
          
          <div className="w-full rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 relative group min-h-[200px] flex items-center justify-center">
            {style.imageUrl ? (
              <img 
                src={style.imageUrl} 
                alt={`${style.category} preview`} 
                className="w-full h-auto max-h-[500px] object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-slate-500">
                <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
                <p className="font-medium">Chưa có ảnh minh họa</p>
                <p className="text-xs mt-1 opacity-60">Bạn có thể cập nhật ảnh trong dữ liệu sau</p>
              </div>
            )}
            
            {/* Fallback element hidden by default */}
            <div className="hidden absolute inset-0 flex flex-col items-center justify-center p-12 text-slate-500 bg-slate-900 z-10">
              <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
              <p className="font-medium">Không tải được ảnh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};