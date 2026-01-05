
import React from 'react';
import { updateLogs } from '../data/updateLogs';
import { Language } from '../types';
import { X, Terminal, AlertCircle } from 'lucide-react';

interface UpdateLogOverlayProps {
  onClose: () => void;
  language: Language;
}

const UpdateLogOverlay: React.FC<UpdateLogOverlayProps> = ({ onClose, language }) => {
  const isSimplifiedChinese = language === 'zh-CN';

  const warningMessage = language === 'zh-TW' 
    ? "請切換到簡體中文來觀看更新日誌。" 
    : "Please switch to Simplified Chinese to view update logs.";

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div 
        className="w-full max-w-2xl bg-[#0a0a0a] border border-ash-gray/30 shadow-2xl relative overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-ash-gray/20 bg-ash-dark/50">
            <div className="flex items-center gap-2 text-xs font-mono text-ash-gray">
                <Terminal size={14} />
                <span>DEV_LOG // PYO_NOTES.txt</span>
            </div>
            <button 
                onClick={onClose}
                className="text-ash-gray hover:text-white transition-colors"
            >
                <X size={16} />
            </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 font-mono text-xs md:text-sm leading-relaxed text-ash-light/80 custom-scrollbar relative">
            {!isSimplifiedChinese ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center space-y-4 opacity-80">
                    <AlertCircle size={48} className="text-amber-500 animate-pulse" />
                    <p className="font-bold text-ash-light text-sm md:text-base">
                        {warningMessage}
                    </p>
                    <div className="text-[10px] text-ash-gray font-mono border border-ash-gray/30 p-2 bg-ash-dark/30">
                        System Logic: Logs are archived in source language [zh-CN] only.
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    {updateLogs.map((log, index) => (
                        <div key={index} className="relative pl-4 border-l border-ash-gray/20">
                            <div className="absolute -left-[3px] top-0 w-1.5 h-1.5 bg-ash-gray/50 rounded-full"></div>
                            <div className="flex items-baseline gap-4 mb-2 opacity-60">
                                <span className="font-bold text-emerald-500">{log.version}</span>
                                <span className="text-[10px]">{log.date}</span>
                            </div>
                            <div className="whitespace-pre-wrap">
                                {log.content}
                            </div>
                        </div>
                    ))}
                    
                    <div className="pt-8 opacity-30 text-[10px] text-center border-t border-dashed border-ash-gray/20 mt-8">
                        -- END OF LOG --
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default UpdateLogOverlay;
