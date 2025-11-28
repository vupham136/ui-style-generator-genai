import React from 'react';
import { UIStyle } from '../types';
import { Layers, Palette, Sparkles, CheckCircle2 } from 'lucide-react';

interface StyleCardProps {
  style: UIStyle;
  isSelected: boolean;
  onSelect: (style: UIStyle) => void;
}

export const StyleCard: React.FC<StyleCardProps> = ({ style, isSelected, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(style)}
      className={`
        relative p-6 rounded-xl cursor-pointer transition-all duration-300 border
        flex flex-col gap-3 h-full overflow-hidden group
        ${isSelected 
          ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-[1.02]' 
          : 'bg-surface border-slate-700 hover:border-slate-500 hover:bg-slate-800'
        }
      `}
    >
      <div className="flex justify-between items-start">
        <h3 className={`text-xl font-bold ${isSelected ? 'text-primary' : 'text-white'}`}>
          {style.category}
        </h3>
        {isSelected && <CheckCircle2 className="text-primary w-6 h-6 animate-in fade-in zoom-in" />}
      </div>

      <div className="space-y-2 text-sm text-slate-300 flex-grow">
        <div className="flex items-start gap-2">
          <Layers className="w-4 h-4 mt-1 text-slate-400 shrink-0" />
          <p className="line-clamp-2"><span className="font-semibold text-slate-400">Keywords:</span> {style.keywords}</p>
        </div>
        <div className="flex items-start gap-2">
          <Palette className="w-4 h-4 mt-1 text-slate-400 shrink-0" />
          <p className="line-clamp-2"><span className="font-semibold text-slate-400">Colors:</span> {style.colors}</p>
        </div>
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 mt-1 text-slate-400 shrink-0" />
          <p className="line-clamp-2"><span className="font-semibold text-slate-400">Effects:</span> {style.effects}</p>
        </div>
      </div>
      
      {/* Decorative gradient blob */}
      <div className={`
        absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl transition-opacity duration-500
        ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}
      `} />
    </div>
  );
};