import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Calendar, User as UserIcon, LogOut, LogIn, Menu, X, CheckCircle, ChevronRight } from 'lucide-react';

interface HeaderProps {
  user: User | null;
  reservationsCount: number;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenReservation: () => void;
  onOpenMyReservations: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  reservationsCount,
  onOpenAuth,
  onLogout,
  onOpenReservation,
  onOpenMyReservations
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="mainHeader"
      className={`sticky top-0 z-50 transition-all duration-300 border-b border-white/5 ${
        scrolled ? 'bg-black/95 shadow-xl backdrop-blur-md' : 'bg-black/85 backdrop-blur-sm'
      } text-white`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group transition-transform duration-200 hover:scale-105"
        >
          <div className="flex items-baseline font-black tracking-tight text-xl">
            <span className="text-white font-extrabold tracking-tight text-2xl group-hover:text-amber-300 transition-colors">
              자라다
            </span>
            <span className="ml-1.5 text-xs font-semibold text-emerald-400 border border-emerald-400/40 rounded px-1.5 py-0.5 group-hover:border-emerald-300 group-hover:bg-emerald-950/40 transition-all">
              남아미술학원
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-slate-300">
          <a
            href="#philosophy"
            className="relative py-1 hover:text-white transition-colors duration-150 group"
          >
            교육의 본질
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#evaluation"
            className="relative py-1 hover:text-white transition-colors duration-150 group"
          >
            성향파악 수업
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#teachers"
            className="relative py-1 hover:text-white transition-colors duration-150 group"
          >
            교사 교육 / 자격증
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#franchise"
            className="relative py-1 hover:text-white transition-colors duration-150 group"
          >
            가맹 시스템
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>

        {/* Right Action / Auth & CTA */}
        <div className="flex items-center space-x-3">
          {/* User Auth Info (Desktop) */}
          <div className="hidden sm:flex items-center space-x-2">
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenMyReservations}
                  className="flex items-center gap-1.5 text-xs text-slate-200 bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 rounded-md transition-all cursor-pointer"
                  title="내 예약 내역 확인"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>내 예약</span>
                  {reservationsCount > 0 && (
                    <span className="bg-amber-400 text-slate-900 font-bold px-1.5 py-0.2 text-[10px] rounded-full">
                      {reservationsCount}
                    </span>
                  )}
                </button>
                <div className="flex items-center gap-1.5 text-xs text-slate-300 px-2 py-1">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || '사용자'}
                      className="w-5 h-5 rounded-full object-cover border border-amber-400/50"
                    />
                  ) : (
                    <UserIcon className="w-4 h-4 text-amber-400" />
                  )}
                  <span className="max-w-[100px] truncate text-slate-200 font-medium">
                    {user.displayName || user.email?.split('@')[0] || '학부모 회원'}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="text-slate-400 hover:text-slate-200 p-1.5 transition-colors"
                  title="로그아웃"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-amber-300 bg-white/10 hover:bg-white/15 border border-white/20 px-3 py-1.5 rounded-md transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-400" />
                <span>로그인</span>
              </button>
            )}
          </div>

          {/* Primary CTA */}
          <button
            onClick={onOpenReservation}
            className="btn-shimmer pulse-glow-amber bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-900 font-bold px-3.5 sm:px-4 py-2 text-xs md:text-sm rounded-md transition-all duration-200 shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <span>성향파악 신청</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-md focus:outline-none"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-t border-slate-800 px-5 py-4 space-y-4 shadow-2xl animate-in slide-in-from-top-2">
          {/* Mobile User Status */}
          <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between">
            {user ? (
              <div className="flex items-center gap-2.5">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-8 h-8 rounded-full border border-amber-400"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center font-bold text-xs">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-xs font-bold text-white">
                    {user.displayName || user.email?.split('@')[0] || '학부모 회원'}
                  </p>
                  <p className="text-[11px] text-slate-400">{user.email || '간편 로그인'}</p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-xs font-bold text-slate-200">간편하게 로그인하고</p>
                <p className="text-[11px] text-slate-400">성향파악 예약 일정을 실시간으로 관리하세요</p>
              </div>
            )}

            {user ? (
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-slate-300 hover:text-white flex items-center gap-1 bg-white/10 px-2.5 py-1.5 rounded"
              >
                <LogOut className="w-3 h-3" />
                로그아웃
              </button>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-bold bg-amber-400 text-slate-900 px-3 py-1.5 rounded flex items-center gap-1"
              >
                <LogIn className="w-3 h-3" />
                로그인
              </button>
            )}
          </div>

          {/* Quick Action: My Reservations */}
          {user && (
            <button
              onClick={() => {
                onOpenMyReservations();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 bg-amber-400/10 border border-amber-400/30 rounded-lg text-amber-300 text-xs font-bold"
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                내 예약 내역 확인 및 관리
              </span>
              <span className="bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full text-[10px]">
                {reservationsCount}건
              </span>
            </button>
          )}

          {/* Nav Links */}
          <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-300 pt-2 border-t border-slate-800">
            <a
              href="#philosophy"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-300 flex items-center justify-between"
            >
              <span>교육의 본질</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </a>
            <a
              href="#evaluation"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-300 flex items-center justify-between"
            >
              <span>성향파악 수업</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </a>
            <a
              href="#teachers"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-300 flex items-center justify-between"
            >
              <span>교사 교육 / 자격증</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </a>
            <a
              href="#franchise"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-300 flex items-center justify-between"
            >
              <span>가맹 시스템</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </a>
          </nav>

          <button
            onClick={() => {
              onOpenReservation();
              setMobileMenuOpen(false);
            }}
            className="w-full bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-2"
          >
            <span>성향파악 수업 신청하기</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
