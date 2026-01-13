import { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import ResultCard from '../components/ResultCard';
import ActionButtons from '../components/ActionButtons';
import AdPlaceholder from '../components/AdPlaceholder';
import { analyzeMood } from '../services/aiService';
import { getFormattedLocation } from '../services/locationService';
import { Loader2 } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { useRateLimiter } from '../hooks/useRateLimiter';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  const { apiKey } = useOutletContext();
  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { remaining, checkQuota, incrementQuota, limit } = useRateLimiter();

  const handleImageSelect = async (file) => {
    // 0. Validate File
    console.log("File selected:", file);
    if (!file || !file.type.startsWith('image/')) {
        setError("이미지 파일만 업로드할 수 있습니다.");
        return;
    }

    setLoading(true); // Show loader immediately even before checks to verify interaction

    // 1. Check Rate Limit
    if (!checkQuota()) {
      setLoading(false);
      setError(`오늘의 무료 분석 횟수(${limit}회)를 모두 소진했습니다.\n내일 다시 방문해주세요!`);
      return;
    }

    setImage(file);
    setImageSrc(URL.createObjectURL(file));
    setError(null);

    let locData = { text: "알 수 없는 장소", fullInfo: "Location unknown" };

    try {
      try {
        locData = await getFormattedLocation();
        setLocation(locData.text);
      } catch (locErr) {
        console.warn("Location access denied or failed, proceeding without location:", locErr);
        setLocation("");
      }

      const result = await analyzeMood(file, locData.fullInfo, apiKey);
      setAnalysis(result);
      incrementQuota(); // Deduct quota only on success
    } catch (err) {
      console.error(err);
      const errorMessage = err.message || "알 수 없는 오류";
      setError(`분석 실패: ${errorMessage} (API 키나 모델 권한을 확인해주세요)`);
      
      setImage(null);
      setImageSrc(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setImageSrc(null);
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="flex-1 flex flex-col justify-center pb-12 w-full max-w-2xl mx-auto px-4">
      <Helmet>
        <title>감성 대시보드 - AI 사진 기분 분석</title>
        <meta name="description" content="무료 AI 감성 분석 도구. 사진을 올리면 분위기에 맞는 시와 명언, 색상을 찾아드립니다." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "감성 대시보드",
              "url": "https://mood-dashboard.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://mood-dashboard.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </script>
      </Helmet>

      {/* AdSense Top Slot */}
      {!image && !analysis && <AdPlaceholder className="mb-8" />}

      {/* Introduction */}
      {!image && !analysis && (
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 font-display">
             당신의 감성을 사진으로 읽어보세요
           </h2>
           <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
             AI가 사진 속 분위기를 분석하여<br/>
             가장 어울리는 시와 명언, 그리고 색상을 선물합니다.<br/>
             <span className="text-xs text-brand-500 mt-2 block font-medium">
                (오늘 남은 무료 횟수: {remaining}회)
             </span>
           </p>
        </div>
      )}

      {!image && !loading && (
        <div className="animate-in fade-in zoom-in duration-500">
           <ImageUpload onImageSelect={handleImageSelect} />
           {error && (
               <div className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 text-center text-sm mt-4 p-3 rounded-lg font-medium animate-in fade-in border border-red-100 dark:border-red-900/50">
                   {error}
               </div>
           )}
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-12 animate-in fade-in">
           <Loader2 className="w-10 h-10 text-brand-500 animate-spin mb-4" />
           <p className="text-slate-500 font-display animate-pulse">분위기를 분석 중입니다...</p>
           <p className="text-xs text-slate-400 mt-2">오늘의 날씨와 감성을 읽고 있어요</p>
        </div>
      )}

      {analysis && !loading && (
        <div className="animate-in slide-in-from-bottom-8 duration-700">
          <ResultCard 
            imageSrc={imageSrc} 
            analysis={analysis} 
            locationText={location} 
          />
          <ActionButtons onReset={handleReset} />
          <AdPlaceholder className="mt-12 h-32" />
        </div>
      )}
    </div>
  );
}
