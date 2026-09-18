import React, { useState } from 'react';
import { Reservation } from '../types';
import { dataService } from '../services/dataService';
import { X, Calendar, Clock, MapPin, AlertCircle, Trash2, Plus, CheckCircle2 } from 'lucide-react';

interface MyReservationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: Reservation[];
  onOpenNewReservation: () => void;
}

export const MyReservationsModal: React.FC<MyReservationsModalProps> = ({
  isOpen,
  onClose,
  reservations,
  onOpenNewReservation
}) => {
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCancel = async (id: string) => {
    if (!confirm('정말로 이 성향파악 수업 예약을 취소하시겠습니까?')) return;
    setCancellingId(id);
    try {
      await dataService.cancelReservation(id);
    } catch (e) {
      console.error(e);
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg max-h-[85vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-base font-bold text-white">내 성향파악 예약 내역</h3>
            <p className="text-xs text-slate-400">실시간 데이터베이스 동기화 상태</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1 text-slate-800 text-left">
          {reservations.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="text-base font-bold text-slate-700">예약된 수업 내역이 없습니다</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                아이의 기질과 잠재력을 발견하는 1:1 성향파악 수업을 지금 바로 예약해 보세요.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenNewReservation();
                }}
                className="mt-3 inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-4 py-2.5 rounded-xl text-xs shadow transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>성향파악 수업 예약하기</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {reservations.map((item) => {
                const isCancelled = item.status === 'cancelled';
                return (
                  <div
                    key={item.id || item.createdAt}
                    className={`rounded-xl border p-4 transition-all ${
                      isCancelled
                        ? 'bg-slate-50 border-slate-200 opacity-60'
                        : 'bg-white border-slate-200 hover:border-amber-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        <span>{item.branchName}</span>
                      </span>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isCancelled
                            ? 'bg-slate-200 text-slate-600'
                            : item.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {isCancelled
                          ? '예약 취소됨'
                          : item.status === 'confirmed'
                          ? '예약 확정'
                          : '접수 완료 (상담 대기)'}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.reservationDate}</span>
                        <span className="text-slate-300">|</span>
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.timeSlot}</span>
                      </div>
                      <p className="text-slate-800 font-medium pt-1">
                        아동: <strong className="text-slate-900">{item.childName}</strong> (만 {item.childAge}세) · 보호자: {item.parentName}
                      </p>
                      {item.childTraits && item.childTraits.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {item.childTraits.map((t) => (
                            <span key={t} className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.2 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {!isCancelled && item.id && (
                      <div className="flex justify-end pt-2 border-t border-slate-100">
                        <button
                          disabled={cancellingId === item.id}
                          onClick={() => handleCancel(item.id!)}
                          className="text-[11px] text-red-600 hover:text-red-700 flex items-center gap-1 font-medium hover:underline cursor-pointer disabled:opacity-50"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>{cancellingId === item.id ? '취소 중...' : '예약 취소'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 py-3.5 border-t border-slate-200 flex justify-between items-center shrink-0">
          <button
            onClick={() => {
              onClose();
              onOpenNewReservation();
            }}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>새로운 성향파악 신청</span>
          </button>
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
