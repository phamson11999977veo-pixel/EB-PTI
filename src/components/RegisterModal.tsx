import React, { useState } from 'react';
import { X, Smartphone, Camera, Upload, Check, Eye, RefreshCw } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (phone: string, fullName: string) => void;
}

export default function RegisterModal({ isOpen, onClose, onSuccess }: RegisterModalProps) {
  const [phone, setPhone] = useState('');
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<1 | 2>(1); // 1: input & upload, 2: OCR preview

  const [ocrData, setOcrData] = useState({
    fullName: 'NGUYỄN MINH KHÁNH',
    cccdNum: '038094002345',
    dob: '24/10/1992',
    address: 'Hai Bà Trưng, Hà Nội',
    gender: 'Nam',
  });

  const handleFrontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFrontImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleBackUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBackImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Pre-fill demo images
  const loadMockImages = () => {
    setFrontImage('https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=500&auto=format&fit=crop&q=60'); // placeholder representing doc front
    setBackImage('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=60');  // placeholder representing doc back
  };

  const handleProcessOCR = () => {
    if (!phone) {
      alert('Vui lòng nhập số điện thoại');
      return;
    }
    if (!frontImage || !backImage) {
      alert('Vui lòng tải lên/chụp ảnh CCCD mặt trước và mặt sau');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 2200);
  };

  const handleCompleteRegister = () => {
    onSuccess(phone, ocrData.fullName);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-100 my-8">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
        >
          <X size={20} />
        </button>

        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900">Đăng ký Đại lý / CTV Mới</h3>
          <p className="text-slate-500 text-xs mt-1">Đăng ký tài khoản iPTI thông qua định danh điện tử eKYC bằng CCCD</p>
        </div>

        {step === 1 ? (
          <div>
            <div className="space-y-4">
              {/* Phone Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Số điện thoại di động *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Smartphone size={16} />
                  </span>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="VD: 0987654321"
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:border-[#03377B] focus:ring-1 focus:ring-[#03377B] outline-none"
                  />
                </div>
              </div>

              {/* Upload Title */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-2">Chụp ảnh / Tải lên Căn cước công dân (CCCD) *</label>
                <button 
                  type="button" 
                  onClick={loadMockImages}
                  className="text-xs text-blue-600 hover:underline mb-2 font-medium flex items-center gap-1"
                >
                  ⚡ Sử dụng ảnh mẫu Demo nhanh
                </button>
              </div>

              {/* Front & Back Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Front Card */}
                <div className="border border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-4 text-center bg-slate-50 relative group transition">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFrontUpload}
                    id="front-cccd-input"
                    className="hidden" 
                  />
                  {frontImage ? (
                    <div className="relative h-28 rounded-lg overflow-hidden">
                      <img src={frontImage} alt="Mặt trước CCCD" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                        <label htmlFor="front-cccd-input" className="p-2 bg-white rounded-full text-[#03377B] cursor-pointer shadow hover:scale-105 transition">
                          <Camera size={16} />
                        </label>
                      </div>
                      <span className="absolute bottom-1 left-1 bg-[#03377B] text-white text-[9px] px-1.5 py-0.5 rounded font-bold">MẶT TRƯỚC</span>
                    </div>
                  ) : (
                    <label htmlFor="front-cccd-input" className="flex flex-col items-center justify-center h-28 cursor-pointer">
                      <Camera className="text-slate-400 group-hover:text-[#03377B] mb-2 transition" size={28} />
                      <span className="text-xs font-semibold text-slate-700">Mặt trước CCCD</span>
                      <span className="text-[10px] text-slate-400 mt-1">Chụp rõ nét, không lóa</span>
                    </label>
                  )}
                </div>

                {/* Back Card */}
                <div className="border border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-4 text-center bg-slate-50 relative group transition">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleBackUpload}
                    id="back-cccd-input"
                    className="hidden" 
                  />
                  {backImage ? (
                    <div className="relative h-28 rounded-lg overflow-hidden">
                      <img src={backImage} alt="Mặt sau CCCD" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                        <label htmlFor="back-cccd-input" className="p-2 bg-white rounded-full text-[#03377B] cursor-pointer shadow hover:scale-105 transition">
                          <Camera size={16} />
                        </label>
                      </div>
                      <span className="absolute bottom-1 left-1 bg-[#03377B] text-white text-[9px] px-1.5 py-0.5 rounded font-bold">MẶT SAU</span>
                    </div>
                  ) : (
                    <label htmlFor="back-cccd-input" className="flex flex-col items-center justify-center h-28 cursor-pointer">
                      <Upload className="text-slate-400 group-hover:text-[#03377B] mb-2 transition" size={28} />
                      <span className="text-xs font-semibold text-slate-700">Mặt sau CCCD</span>
                      <span className="text-[10px] text-slate-400 mt-1">Chụp rõ nét, đủ 4 góc</span>
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Submit step 1 */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleProcessOCR}
                disabled={isProcessing}
                className="w-full bg-[#03377B] hover:bg-blue-800 disabled:bg-slate-300 text-white font-bold py-2.5 rounded-xl transition shadow-lg shadow-blue-900/10 text-sm flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="animate-spin" size={16} />
                    <span>Hệ thống eKYC đang quét thông tin...</span>
                  </>
                ) : (
                  <>
                    <span>Tiến hành Quét Định Danh (eKYC)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Step 2: OCR Preview */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3 mb-6">
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200/80">
                <span className="bg-emerald-100 text-emerald-700 p-1 rounded-full"><Check size={14} /></span>
                <span className="text-xs font-bold text-slate-700 uppercase">Thông tin trích xuất tự động thành công!</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Họ và tên</span>
                  <input 
                    type="text" 
                    value={ocrData.fullName}
                    onChange={(e) => setOcrData({ ...ocrData, fullName: e.target.value })}
                    className="mt-1 w-full bg-white border border-slate-200 px-2 py-1.5 rounded font-bold text-slate-800 uppercase"
                  />
                </div>
                <div>
                  <span className="text-slate-400 block">Số định danh (CCCD)</span>
                  <input 
                    type="text" 
                    value={ocrData.cccdNum}
                    onChange={(e) => setOcrData({ ...ocrData, cccdNum: e.target.value })}
                    className="mt-1 w-full bg-white border border-slate-200 px-2 py-1.5 rounded font-bold text-slate-800"
                  />
                </div>
                <div>
                  <span className="text-slate-400 block">Ngày sinh</span>
                  <input 
                    type="text" 
                    value={ocrData.dob}
                    onChange={(e) => setOcrData({ ...ocrData, dob: e.target.value })}
                    className="mt-1 w-full bg-white border border-slate-200 px-2 py-1.5 rounded text-slate-800"
                  />
                </div>
                <div>
                  <span className="text-slate-400 block">Giới tính</span>
                  <select 
                    value={ocrData.gender}
                    onChange={(e) => setOcrData({ ...ocrData, gender: e.target.value })}
                    className="mt-1 w-full bg-white border border-slate-200 px-2 py-1.5 rounded text-slate-800"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block">Quê quán / Thường trú</span>
                  <input 
                    type="text" 
                    value={ocrData.address}
                    onChange={(e) => setOcrData({ ...ocrData, address: e.target.value })}
                    className="mt-1 w-full bg-white border border-slate-200 px-3 py-1.5 rounded text-slate-800"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-sm transition"
              >
                Chụp lại ảnh
              </button>
              <button
                type="button"
                onClick={handleCompleteRegister}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-sm transition shadow-lg shadow-emerald-700/15"
              >
                Xác nhận & Đăng nhập
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
