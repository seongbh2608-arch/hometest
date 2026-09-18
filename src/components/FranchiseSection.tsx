import React, { useState } from 'react';
import { BRANCHES } from '../data/mockData';
import { MapPin, Phone, Building, ExternalLink, Calendar } from 'lucide-react';

interface FranchiseSectionProps {
  onSelectBranchForBooking: (branchName: string) => void;
}

export const FranchiseSection: React.FC<FranchiseSectionProps> = ({ onSelectBranchForBooking }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const regions = ['all', '서울/강남', '서울/서초', '서울/송파', '서울/양천', '서울/마포', '경기/고양', '경기/성남', '경기/용인·수원', '인천/연수', '부산/해운대', '대전/서구', '대구/수성'];

  const filteredBranches = selectedRegion === 'all' 
    ? BRANCHES 
    : BRANCHES.filter(b => b.region.includes(selectedRegion.split('/')[0]) || b.region === selectedRegion);

  return (
    <section className="py-20 bg-slate-900 text-white scroll-mt-14" id="franchise">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-semibold text-emerald-400 tracking-wider">
            Network & Franchise
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-3">
            전국 40여 개 자라다 교육원
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            전국 어디서나 표준화된 남아 전문 미술 커리큘럼과 엄격하게 양성된 전문 연구원을 만나보실 수 있습니다.
          </p>
        </div>

        {/* Region Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedRegion('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedRegion === 'all'
                ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                : 'bg-white/10 text-slate-300 hover:bg-white/15'
            }`}
          >
            전체 보기 ({BRANCHES.length})
          </button>
          {['서울', '경기/인천', '지방 거점'].map((group) => {
            const isMatch = (selectedRegion === group);
            return (
              <button
                key={group}
                onClick={() => {
                  if (group === '서울') setSelectedRegion('서울/강남');
                  else if (group === '경기/인천') setSelectedRegion('경기/고양');
                  else setSelectedRegion('부산/해운대');
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isMatch ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-white/10 text-slate-300 hover:bg-white/15'
                }`}
              >
                {group}
              </button>
            );
          })}
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {filteredBranches.map((branch) => (
            <div
              key={branch.id}
              className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 hover:border-amber-400/60 hover:bg-slate-800 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
                    {branch.region}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-amber-400" />
                    {branch.phone}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {branch.name}
                </h3>
                <p className="text-xs text-slate-400 mt-2 flex items-start gap-1.5 leading-relaxed">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span>{branch.address}</span>
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-700/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">성향파악 실시간 신청 가능</span>
                <button
                  onClick={() => onSelectBranchForBooking(branch.name)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 group-hover:translate-x-0.5 transition-all cursor-pointer"
                >
                  <Calendar className="w-3 h-3" />
                  <span>예약하기</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Franchise Inquiries Banner */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/10 to-transparent border border-amber-400/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-bold text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-amber-400" />
              자라다 남아미술학원 가맹 개설 안내
            </h4>
            <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed">
              아이들의 고유한 잠재력을 펼치는 자라다의 교육 철학을 함께 나눌 교육원장을 모십니다.<br className="hidden sm:inline" />
              전문 교사 양성, 상권 분석, 10년의 노하우가 담긴 표준 커리큘럼을 지원합니다.
            </p>
          </div>
          <div className="shrink-0 text-center md:text-right">
            <p className="text-xs text-slate-400">가맹 및 교육 제휴 직통 문의</p>
            <p className="text-2xl font-black text-amber-400 tracking-tight mt-0.5">
              070-4366-6127
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
