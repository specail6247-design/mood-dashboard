import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

export default function ImageUpload({ onImageSelect }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  return (
    <div
      className={`relative w-full aspect-[4/3] max-w-md mx-auto rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group
        ${dragActive 
          ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' 
          : 'border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-500 hover:bg-slate-50/50 dark:hover:bg-slate-800/50'}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/jpeg, image/png, image/webp, image/heic, image/heif, image/gif, image/bmp, image/tiff, image/avif, .jpg, .jpeg, .png, .webp, .heic, .heif, .gif, .bmp, .tiff, .tif, .avif"
        onChange={handleChange}
      />
      
      <div className="flex flex-col items-center gap-4 text-slate-400 dark:text-slate-500 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors">
        <div className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-sm group-hover:shadow-md transition-all group-hover:scale-110">
          <Upload className="w-8 h-8" />
        </div>
        <div className="text-center">
          <p className="font-medium text-slate-600 dark:text-slate-300">사진을 올려주세요</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">또는 여기로 끌어다 놓으세요</p>
        </div>
      </div>
    </div>
  );
}
