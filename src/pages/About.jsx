import { Helmet } from 'react-helmet-async';
import { Sparkles, Heart, Shield } from 'lucide-react';

export default function About() {
  return (
    <>
      <Helmet>
        <title>서비스 소개 | 감성 대시보드</title>
        <meta name="description" content="AI 기술로 당신의 일상을 예술로 만드는 감성 대시보드를 소개합니다." />
      </Helmet>

      <div className="py-8 animate-in fade-in duration-500 max-w-2xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white mb-8 text-center">
          서비스 소개
        </h1>

        <div className="space-y-12">
          <section className="text-center">
            <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
              AI와 감성의 만남
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed word-keep-all">
              감성 대시보드는 최신 Google Gemini AI 모델을 활용하여 사진 속의 미묘한 분위기를 읽어냅니다. 
              단순한 꼬리표(Tag)가 아닌, 한 편의 시와 명언으로 당신의 순간을 기록해드립니다.
            </p>
          </section>

          <section className="text-center">
            <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-rose-600 dark:text-rose-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
              위로와 공감
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed word-keep-all">
              지친 일상 속에서 잠시 쉬어갈 수 있도록. 
              우리는 기술이 차가운 도구가 아닌, 따뜻한 위로가 될 수 있다고 믿습니다.
            </p>
          </section>

          <section className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
              데이터 보호 약속
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed word-keep-all">
              사용자가 업로드한 사진은 오직 AI 분석을 위해서만 사용되며, 서버에 영구 저장이 되지 않습니다. 
              API Key 또한 사용자의 브라우저에만 암호화되어 저장됩니다.
            </p>
          </section>
        </div>

        <div className="mt-16 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center">
          <h3 className="font-bold text-slate-800 dark:text-white mb-2">문의하기</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            서비스 이용 중 불편한 점이 있으시다면 아래로 연락주세요.<br/>
            support@mood-dashboard.com
          </p>
        </div>
      </div>
    </>
  );
}
