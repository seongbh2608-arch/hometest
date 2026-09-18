import React from 'react';
import { CalendarCheck, Clock, Users, Award, AlertCircle, ArrowRight } from 'lucide-react';

interface EvaluationSectionProps {
  onOpenReservation: () => void;
  totalReservationsCount: number;
}

export const EvaluationSection: React.FC<EvaluationSectionProps> = ({
  onOpenReservation,
  totalReservationsCount
}) => {
  return (
    <section className="py-20 bg-white scroll-mt-14" id="evaluation">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase mb-2 inline-block">
            1:1 Diagnostic Class
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            자라다 1:1 성향파악 수업
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-3 leading-relaxed">
            아동의 관심사와 표현 성향을 전문 연구원이 1:1로 정밀 관찰하여,<br className="hidden sm:inline" />
            우리 아이에게 가장 최적화된 미술 접근 방식과 양육 가이드를 전해드립니다.
          </p>
        </div>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative group hover:border-amber-400 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-lg mb-4 group-hover:bg-amber-400 group-hover:text-slate-900 transition-colors">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">1:1 자유 미술 관찰 (50분)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              틀에 박힌 주제가 아닌, 아이가 스스로 열정을 느끼는 자유 주제를 선정하여 주도적 재료 선택과 몰입 태도를 관찰합니다.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative group hover:border-amber-400 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-lg mb-4 group-hover:bg-emerald-400 group-hover:text-slate-900 transition-colors">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">남아 기질 행동 분석</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              아이의 에너지 발산 방식, 좌절 반응, 완벽주의 성향, 시각·촉각 선호도 등 자라다만의 12가지 성향 지표를 정밀 분석합니다.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative group hover:border-amber-400 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-lg mb-4 group-hover:bg-blue-400 group-hover:text-slate-900 transition-colors">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">부모 심층 피드백 (20분)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              수업 직후 담당 전문 연구원과 1:1로 마주 앉아 관찰 결과 리포트와 아들의 특성에 맞는 가정 내 양육 및 대화법을 전달합니다.
            </p>
          </div>
        </div>

        {/* Notice Box */}
        <div className="bg-amber-50 border border-amber-300/80 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-start gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 mt-1">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900">
                수업 신청 전 확인해주세요!
              </h4>
              <p className="text-xs md:text-sm text-slate-700 mt-1 leading-relaxed">
                자라다의 정규 클래스는 원활한 소수정예 반 편성을 위해 <strong>반드시 1:1 성향파악 수업을 먼저 진행</strong>하셔야 등록이 가능합니다. 전국 교육원별로 매주 잔여 타임이 실시간 마감되오니 사전 예약을 권장드립니다.
              </p>
              <div className="flex items-center gap-3 mt-3 text-xs text-amber-900 font-semibold">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  소요 시간: 총 70분
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-amber-700" />
                  대상: 만 5세 ~ 12세 남아
                </span>
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              onClick={onOpenReservation}
              className="btn-shimmer w-full md:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-6 py-4 rounded-xl text-sm transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 text-amber-400" />
              <span>실시간 성향파악 예약하기</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
