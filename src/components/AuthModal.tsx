import React, { useState } from 'react';
import { dataService } from '../services/dataService';
import { X, ShieldCheck, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await dataService.signInWithGoogle();
      onLoginSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/popup-blocked') {
        setError('브라우저에서 팝업이 차단되었습니다. 팝업 차단을 해제하거나 게스트 로그인을 이용해 주세요.');
      } else {
        setError('로그인 처리 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 게스트로 로그인해 주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await dataService.signInAsGuest();
      onLoginSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      setError('게스트 로그인에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 p-6 text-center text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3">
          <ShieldCheck className="w-7 h-7" />
        </div>

        <h3 className="text-lg font-black text-slate-900">학부모 회원 로그인</h3>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          Google 계정으로 안전하고 빠르게 로그인하여<br />
          성향파악 수업 예약 및 알림을 실시간으로 관리하세요.
        </p>

        {error && (
          <div className="my-3 text-left p-2.5 bg-red-50 border border-red-200 text-red-700 text-[11px] rounded-lg flex items-start gap-1.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="my-6 space-y-2.5">
          {/* Google Sign-in Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-700 font-bold border border-slate-300 py-3 rounded-xl text-xs md:text-sm shadow-sm transition-all duration-200 hover:shadow hover:border-slate-400 active:scale-98 cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google 계정으로 시작하기</span>
          </button>

          {/* Guest Login Fallback */}
          <button
            onClick={handleGuestLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 rounded-xl text-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <UserCheck className="w-3.5 h-3.5 text-slate-500" />
            <span>게스트로 바로 둘러보기</span>
          </button>
        </div>

        <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-400 space-y-1">
          <p className="flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span>Firebase Auth 안전 암호화 로그인</span>
          </p>
          <p>회원가입 절차 없이 즉시 동기화됩니다.</p>
        </div>
      </div>
    </div>
  );
};
