

export default function ResultCard({ imageSrc, analysis, locationText }) {
  if (!analysis) return null;

  return (
    <div id="result-card" className="w-full max-w-md mx-auto bg-white dark:bg-slate-800 p-4 pb-8 rounded-sm shadow-2xl skew-y-1 transform transition-transform hover:skew-y-0 duration-500 mb-8 mt-4">
      {/* Photo Frame */}
      <div className="aspect-[4/3] w-full bg-slate-100 dark:bg-slate-900 mb-6 overflow-hidden relative">
        <img 
          src={imageSrc} 
          alt="Mood" 
          className="w-full h-full object-cover"
        />
        {/* Mood Color Overlay/Accent */}
        <div 
          className="absolute inset-0 opacity-10 mix-blend-overlay"
          style={{ backgroundColor: analysis.moodColor }}
        />
      </div>

      {/* Content */}
      <div className="px-4 text-center">
        {locationText && (
          <div className="flex items-center justify-center gap-2 mb-4 text-xs font-semibold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
             <span>{locationText}</span>
          </div>
        )}

        <h2 className="text-xl font-display font-bold text-slate-800 dark:text-white mb-4 leading-tight">
          "{analysis.quote}"
        </h2>

        <div className="w-12 h-px bg-slate-200 dark:bg-slate-700 mx-auto mb-4" />

        <div className="font-body text-sm text-slate-500 dark:text-slate-300 italic whitespace-pre-line leading-relaxed">
          {analysis.poem}
        </div>
      </div>
    </div>
  );
}
