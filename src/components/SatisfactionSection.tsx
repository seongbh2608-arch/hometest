import React, { useState, useEffect, useRef } from 'react';
import { Star, ThumbsUp, Sparkles, Heart } from 'lucide-react';

export const SatisfactionSection: React.FC = () => {
  const [satisfactionCount, setSatisfactionCount] = useState(0);
  const [verySatisfiedCount, setVerySatisfiedCount] = useState(0);
  const [satisfiedCount, setSatisfiedCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate 0 -> 95
          let start = 0;
          const duration = 1600;
          const startTime = performance.now();

          const update = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setSatisfactionCount(Math.round(easeOut * 95));
            setVerySatisfiedCount(Math.round(easeOut * 61));
            setSatisfiedCount(Math.round(easeOut * 34));

            if (progress < 1) {
              requestAnimationFrame(update);
            }
          };
          requestAnimationFrame(update);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-20 md:py-24 bg-white" id="satisfaction-section">
      <div className="max-w-5xl mx-auto px-5 text-center">
        {/* Main Stat Headline */}
        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-snug tracking-tight mb-14 md:mb-16">
          자라다 재원생 10000명 중{' '}
          <span className="text-blue-600 underline decoration-amber-400 decoration-4 underline-offset-4 font-black inline-block transition-transform hover:scale-110">
            95%
          </span>
          가 만족,
          <br className="hidden sm:inline" /> 그 중 61%가 매우 만족하고 있습니다.
        </h2>

        {/* Phone Mockup & Big Stat Showcase */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-20 mb-16 md:mb-20">
          {/* Smartphone Container */}
          <div className="w-64 sm:w-72 bg-slate-900 p-3 rounded-[38px] shadow-2xl border-4 border-slate-700 hover:rotate-1 transition-transform duration-500">
            <div className="relative bg-white rounded-[30px] p-4 text-left overflow-hidden border border-slate-200">
              <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-3"></div>
              <p className="text-xs font-bold text-slate-700 mb-1">2024 재원생 대상 수업 만족도 조사</p>
              <p className="text-[11px] text-slate-500 mb-3">
                Q. 자라다 남아미술 수업에 대해 전반적으로 얼마나 만족하고 계십니까?
              </p>

              {/* Pie Chart Representation */}
              <div className="relative w-36 h-36 mx-auto my-2 flex items-center justify-center group cursor-pointer">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background track */}
                  <circle cx="18" cy="18" fill="none" r="15.915" stroke="#f1f5f9" strokeWidth="5.5"></circle>
                  {/* 61% Very satisfied (Orange) */}
                  <circle
                    className="chart-ring"
                    cx="18"
                    cy="18"
                    fill="none"
                    r="15.915"
                    stroke="#f97316"
                    strokeDasharray="61 39"
                    strokeDashoffset={hasAnimated ? '0' : '100'}
                    strokeWidth="5.5"
                  ></circle>
                  {/* 34% Satisfied (Yellow) */}
                  <circle
                    className="chart-ring"
                    cx="18"
                    cy="18"
                    fill="none"
                    r="15.915"
                    stroke="#fbbf24"
                    strokeDasharray="34 66"
                    strokeDashoffset={hasAnimated ? '-61' : '100'}
                    strokeWidth="5.5"
                  ></circle>
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center transition-transform duration-300 group-hover:scale-110">
                  <span className="text-2xl font-black text-slate-800">{satisfactionCount}%</span>
                  <span className="text-[10px] text-slate-500 font-medium">전체 만족도</span>
                </div>
              </div>

              {/* Survey Legend */}
              <div className="mt-4 space-y-1.5 text-[10px] text-slate-600">
                <div className="flex items-center justify-between p-1 rounded hover:bg-orange-50 transition-colors">
                  <span className="flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block mr-1.5 animate-pulse"></span>
                    매우 만족
                  </span>
                  <span className="font-bold text-orange-600">{verySatisfiedCount}%</span>
                </div>
                <div className="flex items-center justify-between p-1 rounded hover:bg-amber-50 transition-colors">
                  <span className="flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block mr-1.5"></span>
                    만족
                  </span>
                  <span className="font-bold text-amber-600">{satisfiedCount}%</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 p-1">
                  <span className="flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block mr-1.5"></span>
                    보통 이하
                  </span>
                  <span>5%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Numeric Callout */}
          <div className="text-center md:text-left space-y-2 max-w-sm">
            <span className="inline-block text-slate-500 font-semibold text-xs tracking-wider uppercase">
              2024 재원생 대상 수업 만족도 조사
            </span>
            <div className="text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter transition-transform duration-300 hover:scale-105">
              <span>{satisfactionCount}</span>
              <span className="text-amber-500 inline-block transition-transform hover:rotate-12">%</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed pt-2">
              10년간 축적된 남아 미술 심리 데이터 기반의 독자적 코칭 커리큘럼으로 아이와 부모 모두 높은 만족도를 경험합니다.
            </p>
          </div>
        </div>

        {/* Parent Reviews Grid / Social Proof Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {/* Review Card 1 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-amber-300 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <div>
                <span className="font-bold text-xs text-slate-800">lmy*****</span>
                <span className="text-[11px] text-slate-400 block">회원 22 · 사진 36</span>
              </div>
              <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded group-hover:bg-emerald-100 transition-colors">
                팔로우
              </span>
            </div>
            <div className="overflow-hidden rounded-lg mb-3">
              <img
                alt="아이의 만들기 작품"
                className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXG12krIbQO1IXbaHK89nJOU_O1nBanthazxNW9qS0YvFhh9Bdv6xSKPlFO_rGlDFV1GDQDHdAgkVvuvOUY4sC-Y5gL4sSMLZC-zq7nCY1NJQbViaxoKSFrWIcryQj63ThfHdhLsfNllPyWv4Nr1Lm1T5eAhs0561aWLjOKEXukxd52KP3Sj_KlZNiAu-67_hSnnoStb2opzvCeBHMley0SmKpvayxaURljUjl7Jwb9wTTYx_h4eG_"
              />
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-normal mb-3">
              늘 갈 때마다 행복해 하면서 다니는 곳이 자라다 미술학원 같아요. 이번주 수업은 다른 친구들과 함께 하는 협동 수업이라 더 즐거웠던 것 같아요!
            </p>
            <div className="text-[11px] text-slate-500 space-y-0.5">
              <p className="hover:text-amber-600 transition-colors">✨ 맞춤 지도를 잘해줘요</p>
              <p className="hover:text-amber-600 transition-colors">💡 프로그램이 다양해요</p>
            </div>
          </div>

          {/* Review Card 2 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-amber-300 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <div>
                <span className="font-bold text-xs text-slate-800">뚜뚜*****</span>
                <span className="text-[11px] text-slate-400 block">회원 14 · 사진 16</span>
              </div>
              <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded group-hover:bg-emerald-100 transition-colors">
                팔로우
              </span>
            </div>
            <div className="overflow-hidden rounded-lg mb-3">
              <img
                alt="수업 중인 남아"
                className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0NL8OsPM2RFBNwlfU6FN9tWZSvuOemqztLfFP0SBOGtmoFBKy6_5jIk7EZ28hav054PWKT3dFdo8BeWrvuPerCbU1s9OS_CtItuFrpiWxPJTTEI9MO9q8JE09IzAwohGY-WoclXtVaXQs7TKfHpx7vXpUYUgqZcdaf1mlDA9UmZvkGa04zBXqHtKELYpmPAebKyXijsaqHCrUc0huY4PXikW30By-_4k935zfVjKkpRg0C6K0g6a-"
              />
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-normal mb-3">
              자라다 미술학원은 사회성도 배우고 규칙을 지키며 창의적인 미술활동까지 할 수 있으니 아이가 내년에 학교가기전에 오길 너무 잘했다고 생각합니다!
            </p>
            <div className="text-[11px] text-slate-500 space-y-0.5">
              <p className="hover:text-amber-600 transition-colors">👍 맞춤 지도를 잘해줘요</p>
              <p className="hover:text-amber-600 transition-colors">🔥 선생님이 열정적이에요</p>
            </div>
          </div>

          {/* Review Card 3 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-amber-300 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <div>
                <span className="font-bold text-xs text-slate-800">mk*****</span>
                <span className="text-[11px] text-slate-400 block">회원 08 · 사진 12</span>
              </div>
              <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded group-hover:bg-emerald-100 transition-colors">
                팔로우
              </span>
            </div>
            <div className="overflow-hidden rounded-lg mb-3">
              <img
                alt="집중해서 만들기 중인 아이"
                className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4O4_W7vIS92paXcpEtZpzMzMa44u-y7_42LBA2Zd29cX3gbTLnvLxJf7IBbYRRAfTIfYejR_yrJNDSZECutat7w-QrFygyYz5zmzzmUep2UR1ifkcNtJm9LHyZLGa7lotbm6pxefBsJJPtLvzYlo_c8wiirfCj47PdkyJbZT-AFwm2oU-z5GAa7mBukgLllU79gvVrlHN-9AxI5B5-fgX6_QIaCtvDmfRf4QE6dh6e5t3S4PsO1_U"
              />
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-normal mb-3">
              아이가 갈등을 겪었던 중요한 순간 때마다 도움을 크게 받았습니다. 아이가 스스로 선택해서 작업할 수 있어서... 몰입한다는 자신감이 생겼어요.
            </p>
            <div className="text-[11px] text-slate-500 space-y-0.5">
              <p className="hover:text-amber-600 transition-colors">🌱 시설이 깔끔해요</p>
              <p className="hover:text-amber-600 transition-colors">🤝 상담이 자세해요</p>
            </div>
          </div>

          {/* Review Card 4 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-amber-300 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <div>
                <span className="font-bold text-xs text-slate-800">jjoo36</span>
                <span className="text-[11px] text-slate-400 block">회원 19 · 사진 52</span>
              </div>
              <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded group-hover:bg-emerald-100 transition-colors">
                팔로우
              </span>
            </div>
            <div className="overflow-hidden rounded-lg mb-3">
              <img
                alt="완성작을 든 아이"
                className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVnpZLTgWDdRXSI4SNN_gCjgKvVZlhBHJDIPh12VX3LDDyeIH7Vpo0U4d0GxY07OAZZ4AAXvyzdbxLSpOVcZj71MCgToh5QrfCjZfVN1x1bHGsmbgWqJi4P087_wt9lfiE2u6WeEcqcLJKW7bE3fHxduGO_MMpP92rqmuW5ddmYKnkpj-bQFObrvGcjJOIopJt3YZD6XLTCW0KUJsyr4rCMXMmtUqincOp67bJ7PVyrvut1d2SyuKB"
              />
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-normal mb-3">
              5개월차 매주 금요일만 기다리는 8살 형아 자라다를 다니면서 자신만의 방법을 터득하고 무엇보다 긍정적인 자아상이 자리잡고 있습니다!
            </p>
            <div className="text-[11px] text-slate-500 space-y-0.5">
              <p className="hover:text-amber-600 transition-colors">🔥 선생님이 열정적이에요</p>
              <p className="hover:text-amber-600 transition-colors">✨ 맞춤 지도를 잘해줘요</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
