export default function AdPlaceholder({ className }) {
  return (
    <div className={`w-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg flex flex-col items-center justify-center p-8 text-slate-400 dark:text-slate-500 ${className}`}>
      <span className="text-xs font-semibold tracking-widest uppercase mb-1">Advertisement</span>
      <span className="text-sm">Google AdSense Space</span>
    </div>
  );
}
