import { Share2, RotateCcw, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

export default function ActionButtons({ onReset }) {
  const handleDownload = async () => {
    const element = document.getElementById('result-card');
    if (!element) return;

    try {
      // Temporarily remove transform for clean capture
      const originalTransform = element.style.transform;
      element.style.transform = 'none';

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: null,
        useCORS: true, 
        logging: false, // Reduce console noise
      });

      // Restore transform
      element.style.transform = originalTransform;

      // Use toDataURL for maximum compatibility on macOS/Safari
      const dataUrl = canvas.toDataURL('image/png');
      
      const link = document.createElement('a');
      link.download = `mood-dashboard-${Date.now()}.png`; // Explicit extension is key
      link.href = dataUrl;
      
      // Critical: Append to body to make 'download' attribute work reliably
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err) {
      console.error("Capture failed:", err);
      alert("이미지 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 pb-12">
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-full text-slate-600 font-medium shadow-sm hover:shadow-md hover:bg-slate-50 transition-all"
      >
        <RotateCcw className="w-4 h-4" />
        새로운 사진
      </button>
      
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:bg-slate-700 transition-all hover:-translate-y-0.5"
      >
        <Download className="w-4 h-4" />
        카드 저장하기
      </button>
    </div>
  );
}
