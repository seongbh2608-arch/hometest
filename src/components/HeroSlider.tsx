import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface HeroSliderProps {
  onOpenReservation: () => void;
}

const SLIDES = [
  {
    badge: '오직 아들을 위한 특별한 공간',
    title: '미술교육 자라다',
    desc: '5-12세 남자아이들만 등원이 가능합니다',
    ctaText: '성향파악 수업 신청하기',
    ctaAction: 'reservation',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDboUjq-cFwsA2Nnyr2LIxARDh4c7Y2zlShAqYS4cziw1mdPFrQVUnnFo2KltFyLiJhRMi8eAEMbAPvyzn58kunAYPz_XY_e_ALUfKt-VUW1Qhu6bwBN6XcjTipQ76iabwfDR7DOfh1fzjTAsgxfez9TLGob7qrx3HIMU1m0n6VsnkeZ1lUjn1dDz5ERCGo8hQgDwr8ysfmMlDaEOrSZgM1Rhn6d_LabMvfkyxqrPxPCbuUuhQK_6jj'
  },
  {
    badge: '아이의 몰입을 이끌어내는 성향 맞춤',
    title: '남아 미술의 본질을\n연구합니다',
    desc: '아이의 성향과 속도에 맞춘 1:1 관찰 기반의 차별화된 교육',
    ctaText: '교육 커리큘럼 알아보기',
    ctaAction: 'philosophy',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBftHG0yEXuVRiqycjUdDd9u_3mVs1jXZN1CtQuuMi646C3kIO1sD_G1hHSUoHsbsvtqEvZncwFDQJt6U8cbcO11BoLFSISsWk-hWC2168EwxP8EthDq0n8s3gzWka0MmuulT6YS44PCMA0Cau1ryWH7UHuJ-2s2KsyiTEvubW4RhCHbj5ERszbsJa4sw3jcrWfN1Oydee0XM18aPHKyVbw4ptDKo9NsclJQXB06ZosxxRSMzPgJVC1'
  },
  {
    badge: '전국 40여 개 교육원 · 누적 10,000명의 선택',
    title: '스스로 생각하고\n몰입하는 아이',
    desc: '그리기만 하는 미술이 아닌, 아들의 언어와 상상력을 실현하는 곳',
    ctaText: '가까운 교육원 찾기',
    ctaAction: 'franchise',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJrH4eIcb3YTQcbv3WX7Mfz-K_zb-5PUhsMKHQoNN-_rkrr-9O1Co9jBBMVftarSyj1-5KM3E281fAeP_jVh6C1ARx_7JLAqDavC9pSILAEWhaJg8b4PQhdqiopwXV-RzQiEsLGob5IKKUY9MVXIDNHOgqXy3Rv-tngf1EDMvcXdPs3Y7KzrtGDXCuLsW25eUBcjPee2fGPoI7T33rbLFN7T34Evae3vZmERycEgWBwV1ByrF6gsl-'
  }
];

export const HeroSlider: React.FC<HeroSliderProps> = ({ onOpenReservation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressKey, setProgressKey] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const SLIDE_DURATION = 5000;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
      setProgressKey((k) => k + 1);
    }, SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [currentSlide, isPlaying, progressKey]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgressKey((k) => k + 1);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    setProgressKey((k) => k + 1);
  };

  const handleCtaClick = (action: string) => {
    if (action === 'reservation') {
      onOpenReservation();
    } else if (action === 'philosophy') {
      document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'franchise') {
      document.getElementById('franchise')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current - touchEndX.current > 45) {
      handleNext();
    } else if (touchEndX.current - touchStartX.current > 45) {
      handlePrev();
    }
  };

  return (
    <section
      id="heroSliderSection"
      aria-label="메인 비주얼 슬라이더"
      className="relative w-full h-[580px] md:h-[680px] bg-slate-950 overflow-hidden flex items-center select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Floating Quick Links (YouTube & Instagram) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-3 animate-float pointer-events-auto">
        <a
          href="https://www.youtube.com/@jarada"
          target="_blank"
          rel="noopener noreferrer"
          title="최민준의 아들TV 바로가기"
          className="w-11 h-11 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg hover:scale-115 hover:-rotate-6 hover:shadow-red-500/50 transition-all duration-300"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          title="인스타그램"
          className="w-11 h-11 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-700 text-white flex items-center justify-center shadow-lg hover:scale-115 hover:rotate-6 hover:shadow-pink-500/50 transition-all duration-300"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>
      </div>

      {/* Slides Container */}
      <div className="absolute inset-0 w-full h-full">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full flex items-center transition-opacity duration-700 ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Image with Dark Gradient Overlay */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`w-full h-full object-cover object-center brightness-[0.75] transition-transform duration-7000 ease-out ${
                    isActive ? 'scale-108' : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/60 to-black/25"></div>
              </div>

              {/* Slide Content */}
              <div className="relative z-10 max-w-6xl mx-auto px-5 w-full">
                <div
                  className={`max-w-xl text-white space-y-4 transition-all duration-700 ${
                    isActive ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                >
                  <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 text-yellow-300 font-semibold px-3.5 py-1.5 rounded-full text-xs md:text-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                    </span>
                    {slide.badge}
                  </div>

                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight whitespace-pre-line">
                    {slide.title}
                  </h1>

                  <p className="text-base md:text-xl text-slate-200 font-normal">
                    {slide.desc}
                  </p>

                  <div className="pt-4">
                    <button
                      onClick={() => handleCtaClick(slide.ctaAction)}
                      className="btn-shimmer inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-7 py-3.5 md:py-4 rounded-xl text-sm md:text-base transition-all duration-300 shadow-xl hover:shadow-amber-400/30 hover:scale-105 active:scale-95 group cursor-pointer"
                    >
                      <span>{slide.ctaText}</span>
                      <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        aria-label="이전 슬라이드"
        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/75 border border-white/20 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm hover:scale-110 active:scale-90 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button
        onClick={handleNext}
        aria-label="다음 슬라이드"
        className="absolute right-3 md:right-24 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/75 border border-white/20 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm hover:scale-110 active:scale-90 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Bottom Pagination Indicators & Auto-play Controls */}
      <div
        id="heroPagination"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-black/55 backdrop-blur-md border border-white/10"
      >
        <div className="flex items-center gap-1.5 md:gap-2">
          {SLIDES.map((slide, idx) => {
            const isCurrent = idx === currentSlide;
            const titles = ['미술교육 자라다', '남아 미술 본질', '몰입하는 아이'];
            return (
              <button
                key={idx}
                onClick={() => {
                  setCurrentSlide(idx);
                  setProgressKey((k) => k + 1);
                }}
                aria-label={`${idx + 1}번 슬라이드로 이동`}
                className={`group relative flex items-center justify-center h-7 px-2.5 rounded-full transition-all text-xs font-bold cursor-pointer overflow-hidden ${
                  isCurrent ? 'text-amber-300 bg-white/20' : 'text-white/70 hover:text-white bg-transparent hover:bg-white/10'
                }`}
              >
                <span className="relative z-10 flex items-center gap-1">
                  <span>0{idx + 1}</span>
                  <span className="text-[11px] font-normal text-slate-200 hidden sm:inline">
                    {titles[idx]}
                  </span>
                </span>
                {isCurrent && isPlaying && (
                  <span
                    key={progressKey}
                    style={{
                      animation: `heroProgress ${SLIDE_DURATION}ms linear infinite`
                    }}
                    className="absolute inset-0 bg-amber-400/30 origin-left"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Play / Pause Toggle Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? '슬라이드 자동재생 정지' : '슬라이드 자동재생 시작'}
          className="w-6 h-6 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer border-l border-white/15 pl-1.5 ml-1"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
        </button>
      </div>

      <style>{`
        @keyframes heroProgress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
};
