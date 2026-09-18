import React from 'react';
import { BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

interface MustReadBookSectionProps {
  onOpenReservation: () => void;
}

export const MustReadBookSection: React.FC<MustReadBookSectionProps> = ({ onOpenReservation }) => {
  return (
    <section className="py-20 bg-slate-100/80 border-y border-slate-200">
      <div className="max-w-5xl mx-auto px-5">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
          {/* 3D-styled Book Teaser Image */}
          <div className="w-full md:w-5/12 flex justify-center">
            <div className="relative group cursor-pointer perspective-[1000px]">
              <div className="relative w-60 sm:w-64 aspect-[3/4] rounded-r-xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2 border-l-8 border-slate-900 border-y border-r border-slate-300 bg-white">
                <img
                  alt="교육의 본질 책 표지"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJrH4eIcb3YTQcbv3WX7Mfz-K_zb-5PUhsMKHQoNN-_rkrr-9O1Co9jBBMVftarSyj1-5KM3E281fAeP_jVh6C1ARx_7JLAqDavC9pSILAEWhaJg8b4PQhdqiopwXV-RzQiEsLGob5IKKUY9MVXIDNHOgqXy3Rv-tngf1EDMvcXdPs3Y7KzrtGDXCuLsW25eUBcjPee2fGPoI7T33rbLFN7T34Evae3vZmERycEgWBwV1ByrF6gsl-"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">자라다 필독서</span>
                  <h4 className="text-lg font-extrabold">교육의 본질</h4>
                  <p className="text-[11px] text-slate-300 mt-1">최민준 원장 저</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-amber-400 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg border border-amber-300 animate-bounce">
                필독 권장
              </div>
            </div>
          </div>

          {/* Book Philosophy & Explanation */}
          <div className="w-full md:w-7/12 space-y-4 text-left">
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>꼭 보고 오세요</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
              "배우기만 하고 내어놓지 않는 아이는<br className="hidden sm:inline" />
              잘못된 노력을 반복한다."
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              반드시 성향파악 수업을 신청하기 전에 자라다의 철학을 읽어 보세요. 원리를 모르면 수업 방향을 이해하기 어렵습니다. 아들에게 필요한 진짜 교육은 평가와 기술 주입이 아닌, <strong>자신만의 세상을 거침없이 표현하는 몰입의 장</strong>을 열어주는 것입니다.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>왜 남자아이의 미술은 여자아이와 뇌 발달 단계부터 다를 수밖에 없는가?</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>아들에게 필요한 진짜 미술은 '기교'가 아닌 '몰입과 표현의 해방'</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>1:1 관찰 성향파악을 통해 발견하는 우리 아이만의 독창적 기질</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenReservation}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl text-xs md:text-sm transition-all hover:gap-3 cursor-pointer shadow-md"
              >
                <span>성향파악 수업 바로 신청하기</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
