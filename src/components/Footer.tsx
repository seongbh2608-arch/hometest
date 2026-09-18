import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs py-14 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800/80 pb-8 mb-8">
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-xl font-black text-white tracking-tight">자라다</span>
              <span className="text-emerald-400 text-[11px] font-semibold border border-emerald-500/40 rounded px-1.5 py-0.2">
                남아미술학원
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-lg">
              오직 아들만을 위해 10년 넘게 연구해 온 전문 남아미술 교육기관입니다.<br />
              아이의 성향과 속도를 존중하는 1:1 맞춤 교육으로 아들의 몰입과 자존감을 키웁니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a href="#philosophy" className="hover:text-amber-400 transition-colors">
              교육의 본질
            </a>
            <span className="text-slate-700">•</span>
            <a href="#evaluation" className="hover:text-amber-400 transition-colors">
              성향파악 수업
            </a>
            <span className="text-slate-700">•</span>
            <a href="#teachers" className="hover:text-amber-400 transition-colors">
              교사 교육
            </a>
            <span className="text-slate-700">•</span>
            <a href="#franchise" className="hover:text-amber-400 transition-colors">
              가맹 안내
            </a>
            <span className="text-slate-700">•</span>
            <span className="text-slate-400">개인정보처리방침</span>
            <span className="text-slate-700">•</span>
            <span className="text-slate-400">이용약관</span>
          </div>
        </div>

        {/* Company Legal Information */}
        <div className="space-y-2 text-slate-500 text-[11px] leading-relaxed">
          <p>
            <strong className="text-slate-300">(주)자라다교육</strong> | 대표이사: 최민준 | 사업자등록번호: 128-86-90479 | 통신판매업신고: 제2015-경기고양-1049호
          </p>
          <p>
            주소: 경기도 고양시 일산동구 일산로 224 (마두동) 4층 | 고객센터: <span className="text-slate-300 font-semibold">1544-1883</span> | 강의 및 제휴 문의: <span className="text-slate-300 font-semibold">070-4366-6127</span>
          </p>
          <p className="pt-2 text-slate-600">
            © JARADA EDUCATION CO., LTD. All Rights Reserved. 본 사이트의 모든 콘텐츠는 저작권법의 보호를 받습니다.
          </p>
        </div>
      </div>
    </footer>
  );
};
