import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Reservation } from '../types';
import { BRANCHES, TIME_SLOTS } from '../data/mockData';
import { dataService } from '../services/dataService';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  User as UserIcon, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  LogIn,
  AlertTriangle 
} from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onOpenAuth: () => void;
  allReservations: Reservation[];
  initialBranch?: string;
  onReservationSuccess: (reservation: Reservation) => void;
}

const TRAIT_OPTIONS = [
  '⚡ 에너지가 넘쳐요',
  '🎨 손으로 만들기를 좋아해요',
  '🔍 한 가지에 깊이 몰입해요',
  '💭 표현하고 싶은 게 많아요',
  '🤫 낯을 조금 가려요',
  '🏆 지는 것을 힘들어해요',
  '✨ 칭찬에 동기부여가 커요'
];

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  user,
  onOpenAuth,
  allReservations,
  initialBranch,
  onReservationSuccess
}) => {
  // Form state
  const [selectedBranch, setSelectedBranch] = useState(initialBranch || BRANCHES[0].name);
  
  // Default date: tomorrow
  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [reservationDate, setReservationDate] = useState(getTomorrowDate());
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState<number>(7);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [parentName, setParentName] = useState(user?.displayName || '');
  const [parentPhone, setParentPhone] = useState('');
  const [consultationNote, setConsultationNote] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successReservation, setSuccessReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    if (initialBranch) {
      setSelectedBranch(initialBranch);
    }
  }, [initialBranch]);

  useEffect(() => {
    if (user && !parentName) {
      setParentName(user.displayName || '');
    }
  }, [user]);

  if (!isOpen) return null;

  // Calculate real-time available capacity for selected branch, date, and slot
  const getSlotAvailability = (slot: string) => {
    const booked = allReservations.filter(
      r => r.branchName === selectedBranch &&
           r.reservationDate === reservationDate &&
           r.timeSlot === slot &&
           r.status !== 'cancelled'
    ).length;
    const maxCapacity = 3;
    const remaining = Math.max(0, maxCapacity - booked);
    return {
      booked,
      remaining,
      isFull: remaining <= 0
    };
  };

  const toggleTrait = (trait: string) => {
    if (selectedTraits.includes(trait)) {
      setSelectedTraits(selectedTraits.filter(t => t !== trait));
    } else {
      if (selectedTraits.length < 3) {
        setSelectedTraits([...selectedTraits, trait]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!childName.trim()) {
      setErrorMsg('아이의 이름을 입력해 주세요.');
      return;
    }
    if (!parentName.trim()) {
      setErrorMsg('보호자 성함을 입력해 주세요.');
      return;
    }
    if (!parentPhone.trim() || parentPhone.length < 9) {
      setErrorMsg('유효한 휴대폰 번호를 입력해 주세요.');
      return;
    }

    const { isFull } = getSlotAvailability(selectedSlot);
    if (isFull) {
      setErrorMsg('선택하신 시간대는 이미 실시간 예약이 마감되었습니다. 다른 시간대를 선택해 주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const reservationData: Omit<Reservation, 'id' | 'createdAt'> = {
        userId: user ? user.uid : 'guest-' + Date.now(),
        userEmail: user?.email || undefined,
        parentName: parentName.trim(),
        parentPhone: parentPhone.trim(),
        childName: childName.trim(),
        childAge: Number(childAge),
        branchName: selectedBranch,
        reservationDate,
        timeSlot: selectedSlot,
        consultationNote: consultationNote.trim(),
        childTraits: selectedTraits,
        status: 'pending'
      };

      const docId = await dataService.createReservation(reservationData);
      const createdObj: Reservation = {
        id: docId,
        ...reservationData,
        createdAt: new Date().toISOString()
      };

      setSuccessReservation(createdObj);
      onReservationSuccess(createdObj);
    } catch (err: any) {
      console.error(err);
      setErrorMsg('예약 처리 중 문제가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccessReservation(null);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded">
                1:1 관찰수업
              </span>
              <span className="text-emerald-400 text-xs font-semibold">실시간 잔여석 연동</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">자라다 성향파악 수업 예약</h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 text-left">
          {successReservation ? (
            /* SUCCESS VIEW */
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black text-slate-900">
                성향파악 수업 예약이 접수되었습니다!
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                담당 교육원에서 학생의 사전 성향 정보를 검토한 후, 24시간 이내에 확인 전화를 드립니다.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2 text-left max-w-md mx-auto">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">예약 지점</span>
                  <span className="font-bold text-slate-900">{successReservation.branchName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">수업 일시</span>
                  <span className="font-bold text-slate-900">
                    {successReservation.reservationDate} / {successReservation.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">아이 이름 / 나이</span>
                  <span className="font-bold text-slate-900">
                    {successReservation.childName} ({successReservation.childAge}세)
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">보호자 연락처</span>
                  <span className="font-bold text-slate-900">{successReservation.parentPhone}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center max-w-md mx-auto">
                <button
                  onClick={handleResetAndClose}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  확인 및 닫기
                </button>
              </div>
            </div>
          ) : (
            /* RESERVATION FORM */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Optional Quick Google Auth prompt */}
              {!user && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <p className="text-xs text-amber-900 font-medium">
                      Google 계정으로 로그인하면 예약 내역을 실시간으로 보관하고 관리할 수 있습니다.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenAuth}
                    className="shrink-0 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5 text-blue-600" />
                    <span>간편 로그인</span>
                  </button>
                </div>
              )}

              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* 1. Branch Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>희망 교육원 선택</span>
                </label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full text-xs md:text-sm bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  {BRANCHES.map((b) => (
                    <option key={b.id} value={b.name}>
                      [{b.region}] {b.name} - {b.address}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Date & Time Slot (Real-time availability) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    <span>예약 희망 일자</span>
                  </label>
                  <input
                    type="date"
                    min={getTomorrowDate()}
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    className="w-full text-xs md:text-sm bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>수업 시간대 (실시간 잔여석)</span>
                  </label>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {TIME_SLOTS.map((slot) => {
                      const { isFull, remaining } = getSlotAvailability(slot);
                      const isSelected = selectedSlot === slot;

                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isFull}
                          onClick={() => setSelectedSlot(slot)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                            isFull
                              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                              : isSelected
                              ? 'bg-amber-500 text-slate-950 font-bold border-amber-600 shadow-sm'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300'
                          }`}
                        >
                          <span>{slot}</span>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              isFull
                                ? 'bg-slate-200 text-slate-500'
                                : isSelected
                                ? 'bg-slate-900 text-amber-300'
                                : 'bg-emerald-50 text-emerald-700'
                            }`}
                          >
                            {isFull ? '마감' : `${remaining}자리 남음`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 3. Child Information */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <UserIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span>아이 정보</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      아이 이름 *
                    </label>
                    <input
                      type="text"
                      placeholder="예: 김민준"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      나이 (5세~12세 남아) *
                    </label>
                    <select
                      value={childAge}
                      onChange={(e) => setChildAge(Number(e.target.value))}
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    >
                      {[5, 6, 7, 8, 9, 10, 11, 12].map((age) => (
                        <option key={age} value={age}>
                          만 {age}세 ({age <= 7 ? `${age}세 유아` : `초등 ${age - 7}학년`})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Child Traits Checklist */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                    아이의 주요 성향 특징 (최대 3개 선택)
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {TRAIT_OPTIONS.map((trait) => {
                      const isSelected = selectedTraits.includes(trait);
                      return (
                        <button
                          key={trait}
                          type="button"
                          onClick={() => toggleTrait(trait)}
                          className={`text-[11px] px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-400 text-slate-900 border-amber-500 font-bold shadow-sm'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300'
                          }`}
                        >
                          {trait}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 4. Parent Information */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      보호자 성함 *
                    </label>
                    <input
                      type="text"
                      placeholder="예: 홍길동"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-500" />
                      <span>연락처 (휴대폰) *</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="예: 010-1234-5678"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    상담 희망 사항 및 고민 (선택)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="아이가 평소 그림 그리기나 손놀림에 대해 보이는 태도, 집중 시간, 부모님의 고민거리를 편하게 적어주세요."
                    value={consultationNote}
                    onChange={(e) => setConsultationNote(e.target.value)}
                    className="w-full text-xs p-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400 resize-none text-slate-800"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-shimmer w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-900 font-extrabold py-3.5 rounded-xl text-sm transition-all duration-200 shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>실시간 예약 처리 중...</span>
                ) : (
                  <>
                    <span>1:1 성향파악 수업 예약 확정하기</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
