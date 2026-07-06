import React, { useState, useEffect } from 'react';
import { Fingerprint, CheckCircle2, X } from 'lucide-react';

interface BiometricModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BiometricModal({ isOpen, onClose, onSuccess }: BiometricModalProps) {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success'>('idle');

  useEffect(() => {
    if (!isOpen) {
      setScanState('idle');
    }
  }, [isOpen]);

  const handleStartScan = () => {
    setScanState('scanning');
    setTimeout(() => {
      setScanState('success');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1200);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div id="biometric-modal" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
        >
          <X size={20} />
        </button>

        <div className="text-center py-6">
          <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-[#03377B]/10 text-[#03377B] mb-4">
            {scanState === 'success' ? (
              <CheckCircle2 size={44} className="text-emerald-500 animate-bounce" />
            ) : (
              <Fingerprint 
                size={44} 
                className={`transition-all ${scanState === 'scanning' ? 'text-blue-500 animate-pulse scale-110' : 'text-[#03377B]'}`} 
              />
            )}
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-2">
            {scanState === 'idle' && 'Xác thực Sinh trắc học'}
            {scanState === 'scanning' && 'Đang quét vân tay...'}
            {scanState === 'success' && 'Xác thực Thành công!'}
          </h3>

          <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
            {scanState === 'idle' && 'Vui lòng nhấn nút bắt đầu và sử dụng cảm biến vân tay trên thiết bị để đăng nhập nhanh.'}
            {scanState === 'scanning' && 'Hãy giữ ngón tay của bạn trên đầu đọc vân tay...'}
            {scanState === 'success' && 'Chào mừng bạn quay trở lại hệ thống iPTI.'}
          </p>

          {scanState === 'scanning' && (
            <div className="w-48 h-1.5 bg-slate-100 rounded-full mx-auto overflow-hidden mb-6">
              <div className="h-full bg-blue-500 animate-infinite-progress rounded-full" style={{ width: '60%' }}></div>
            </div>
          )}

          {scanState === 'idle' && (
            <button
              onClick={handleStartScan}
              className="px-6 py-2.5 bg-[#03377B] hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg shadow-blue-950/20 transition duration-150 text-sm"
            >
              Bắt đầu quét vân tay
            </button>
          )}

          {scanState === 'success' && (
            <div className="text-emerald-500 text-sm font-semibold flex items-center justify-center gap-1">
              <span>Đang chuyển hướng...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
