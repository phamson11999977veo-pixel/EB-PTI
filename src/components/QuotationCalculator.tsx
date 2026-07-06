import React from 'react';
import { Award, ShieldCheck, HelpCircle, DollarSign, Users, Sparkles, TrendingDown, ArrowRightLeft } from 'lucide-react';
import { EmployeeTier, InsuranceProgram, UserRole } from '../types';

interface QuotationCalculatorProps {
  tiers: EmployeeTier[];
  programs: InsuranceProgram[];
  onChangeTiers: (newTiers: EmployeeTier[]) => void;
  discountRate: number; // 0 to 100
  onChangeDiscountRate: (rate: number) => void;
  commissionRate: number; // 0 to 100
  onChangeCommissionRate: (rate: number) => void;
  role: UserRole;
  headcount: number;
}

export default function QuotationCalculator({
  tiers,
  programs,
  onChangeTiers,
  discountRate,
  onChangeDiscountRate,
  commissionRate,
  onChangeCommissionRate,
  role,
  headcount
}: QuotationCalculatorProps) {

  // Update headcount or program for a tier
  const handleUpdateTier = (id: string, updates: Partial<EmployeeTier>) => {
    const newTiers = tiers.map(tier => {
      if (tier.id === id) {
        const updated = { ...tier, ...updates };
        return updated;
      }
      return tier;
    });
    onChangeTiers(newTiers);
  };

  // Get total headcount entered across all tiers
  const currentTotalHeadcount = tiers.reduce((sum, t) => sum + t.headcount, 0);

  // Financial calculations
  const calculateBasePremium = () => {
    return tiers.reduce((sum, tier) => {
      const prog = programs.find(p => p.id === tier.selectedProgramId);
      const rate = prog ? prog.ratePerHead : 0;
      return sum + (tier.headcount * rate);
    }, 0);
  };

  const basePremium = calculateBasePremium();
  const discountAmount = Math.round((basePremium * discountRate) / 100);
  const totalCustomerPay = basePremium - discountAmount;
  
  // Standard commission rules based on role
  const getCommissionLimit = (userRole: UserRole) => {
    switch (userRole) {
      case 'CA': return 10; // Cán bộ kinh doanh: tối đa 10%
      case 'ICA': return 15; // Đại lý: tối đa 15%
      case 'CR': return 20; // CTV: tối đa 20%
      default: return 10;
    }
  };

  const commLimit = getCommissionLimit(role);
  const commissionAmount = Math.round((totalCustomerPay * commissionRate) / 100);
  const netRemitToPti = totalCustomerPay - commissionAmount;

  const formatVnd = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* Quick Alert if headcount mismatch */}
      {currentTotalHeadcount !== headcount && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl flex items-start gap-3">
          <HelpCircle className="text-amber-600 mt-0.5 flex-shrink-0" size={18} />
          <div>
            <h4 className="text-xs font-bold text-amber-800 uppercase">Cơ cấu nhân sự lệch tổng số lượng</h4>
            <p className="text-amber-700 text-xs mt-0.5">
              Tổng số lượng nhân viên đăng ký ở bước 2 là <strong>{headcount} người</strong>. 
              Hiện bạn đang phân bổ <strong>{currentTotalHeadcount} người</strong> vào các cấp bậc. Vui lòng kiểm tra lại để khớp số liệu.
            </p>
          </div>
        </div>
      )}

      {/* Tier distribution */}
      <div className="card border border-slate-100">
        <div className="card-title justify-between">
          <div className="flex items-center gap-2">
            <Users className="text-[#03377B]" size={18} />
            <span>Phân bổ Gói Bảo hiểm theo Cấp bậc Nhân viên</span>
          </div>
          <span className="text-xs font-semibold text-[#03377B] bg-blue-50 px-2.5 py-1 rounded-full">
            Đã phân bổ: {currentTotalHeadcount} / {headcount} nhân viên
          </span>
        </div>

        <div className="space-y-5">
          {tiers.map((tier) => {
            const selectedProg = programs.find(p => p.id === tier.selectedProgramId);
            return (
              <div key={tier.id} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Tier Info */}
                  <div className="md:col-span-3">
                    <span className="text-[11px] font-bold text-[#03377B] tracking-wider block mb-1">Cấp bậc</span>
                    <span className="font-bold text-slate-800 text-sm block">{tier.name}</span>
                  </div>

                  {/* Headcount Input */}
                  <div className="md:col-span-2">
                    <label className="text-[11px] font-bold text-slate-400 tracking-wider block mb-1">Số nhân viên</label>
                    <input 
                      type="number" 
                      min="0"
                      value={tier.headcount || ''}
                      onChange={(e) => handleUpdateTier(tier.id, { headcount: parseInt(e.target.value) || 0 })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold outline-none focus:border-[#03377B]"
                      placeholder="Số lượng"
                    />
                  </div>

                  {/* Program Selector */}
                  <div className="md:col-span-4">
                    <label className="text-[11px] font-bold text-slate-400 tracking-wider block mb-1">Chọn gói bảo hiểm</label>
                    <select
                      value={tier.selectedProgramId}
                      onChange={(e) => handleUpdateTier(tier.id, { selectedProgramId: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm outline-none focus:border-[#03377B]"
                    >
                      {programs.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.tierLabel}) — {formatVnd(p.ratePerHead)}/người</option>
                      ))}
                    </select>
                  </div>

                  {/* Premium calculation display */}
                  <div className="md:col-span-3 text-right">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider block mb-1">Thành phí ban đầu</span>
                    <span className="font-bold text-[#03377B] text-base">
                      {formatVnd(tier.headcount * (selectedProg?.ratePerHead || 0))}
                    </span>
                  </div>
                </div>

                {/* Micro benefit summary for selected program */}
                {selectedProg && (
                  <div className="mt-3.5 pt-3.5 border-t border-slate-200/60">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-[11px] font-black text-slate-700">
                        <span>✨ Chi tiết quyền lợi chương trình</span>
                        {role === 'CA' && (
                          <span className="text-[9px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider animate-pulse">
                            Quyền chỉnh sửa của CA
                          </span>
                        )}
                      </div>
                      
                      {role === 'CA' && (tier.customInpatientBenefit !== undefined || tier.customOutpatientBenefit !== undefined || tier.customAccidentBenefit !== undefined || tier.customMaternityBenefit !== undefined) && (
                        <button
                          type="button"
                          onClick={() => {
                            handleUpdateTier(tier.id, {
                              customInpatientBenefit: undefined,
                              customOutpatientBenefit: undefined,
                              customAccidentBenefit: undefined,
                              customMaternityBenefit: undefined
                            });
                          }}
                          className="text-[10px] text-rose-500 hover:text-rose-600 font-extrabold transition-all hover:underline flex items-center gap-1"
                        >
                          ✕ Khôi phục mặc định
                        </button>
                      )}
                    </div>

                    {role === 'CA' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-xs space-y-1">
                          <span className="text-slate-500 block text-[10px] font-bold">Nội trú tối đa</span>
                          <input
                            type="text"
                            value={tier.customInpatientBenefit !== undefined ? tier.customInpatientBenefit : (selectedProg.inpatientBenefit || '')}
                            onChange={(e) => handleUpdateTier(tier.id, { customInpatientBenefit: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200/85 rounded-lg px-2 py-1.5 text-xs font-black text-slate-800 outline-none focus:border-[#03377B] focus:bg-white transition"
                            placeholder="Nhập mức tối đa"
                          />
                        </div>

                        <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-xs space-y-1">
                          <span className="text-slate-500 block text-[10px] font-bold">Ngoại trú tối đa</span>
                          <input
                            type="text"
                            value={tier.customOutpatientBenefit !== undefined ? tier.customOutpatientBenefit : (selectedProg.outpatientBenefit || '')}
                            onChange={(e) => handleUpdateTier(tier.id, { customOutpatientBenefit: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200/85 rounded-lg px-2 py-1.5 text-xs font-black text-slate-800 outline-none focus:border-[#03377B] focus:bg-white transition"
                            placeholder="Nhập mức tối đa"
                          />
                        </div>

                        <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-xs space-y-1">
                          <span className="text-slate-500 block text-[10px] font-bold">Tai nạn cá nhân tối đa</span>
                          <input
                            type="text"
                            value={tier.customAccidentBenefit !== undefined ? tier.customAccidentBenefit : (selectedProg.accidentBenefit || '')}
                            onChange={(e) => handleUpdateTier(tier.id, { customAccidentBenefit: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200/85 rounded-lg px-2 py-1.5 text-xs font-black text-slate-800 outline-none focus:border-[#03377B] focus:bg-white transition"
                            placeholder="Nhập mức tai nạn"
                          />
                        </div>

                        <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-xs space-y-1">
                          <span className="text-slate-500 block text-[10px] font-bold">Thai sản</span>
                          <input
                            type="text"
                            value={tier.customMaternityBenefit !== undefined ? tier.customMaternityBenefit : (selectedProg.maternityBenefit || '')}
                            onChange={(e) => handleUpdateTier(tier.id, { customMaternityBenefit: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200/85 rounded-lg px-2 py-1.5 text-xs font-black text-slate-800 outline-none focus:border-[#03377B] focus:bg-white transition"
                            placeholder="Nhập mức thai sản"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-100">
                          <span className="text-slate-400 block text-[10px]">Nội trú tối đa</span>
                          <span className="font-semibold text-slate-700">
                            {tier.customInpatientBenefit !== undefined ? tier.customInpatientBenefit : selectedProg.inpatientBenefit}
                          </span>
                        </div>
                        <div className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-100">
                          <span className="text-slate-400 block text-[10px]">Ngoại trú tối đa</span>
                          <span className="font-semibold text-slate-700">
                            {tier.customOutpatientBenefit !== undefined ? tier.customOutpatientBenefit : selectedProg.outpatientBenefit}
                          </span>
                        </div>
                        <div className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-100">
                          <span className="text-slate-400 block text-[10px]">Tai nạn tối đa</span>
                          <span className="font-semibold text-slate-700">
                            {tier.customAccidentBenefit !== undefined ? tier.customAccidentBenefit : selectedProg.accidentBenefit}
                          </span>
                        </div>
                        <div className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-100">
                          <span className="text-slate-400 block text-[10px]">Thai sản</span>
                          <span className="font-semibold text-slate-700">
                            {tier.customMaternityBenefit !== undefined ? tier.customMaternityBenefit : selectedProg.maternityBenefit}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Financial settings card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Discount slider and presets */}
        <div className="card border border-slate-100 lg:col-span-1 shadow-sm hover:shadow-md transition">
          <div className="card-title">
            <TrendingDown className="text-orange-500" size={18} />
            <span className="text-sm font-bold text-slate-800">Phí chiết khấu (Doanh nghiệp)</span>
          </div>
          <p className="text-xs text-slate-500 mb-4">Áp dụng ưu đãi giảm phí trực tiếp cho khách hàng dựa trên thỏa thuận quy mô nhóm.</p>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
                <span>Tỷ lệ chiết khấu</span>
                <span className="text-orange-600 font-black text-xs px-2 py-0.5 bg-orange-50 rounded-full">{discountRate}%</span>
              </div>
              <div className="relative pt-1">
                <input 
                  type="range" 
                  min="0" 
                  max="30" 
                  step="2.5"
                  value={discountRate} 
                  onChange={(e) => onChangeDiscountRate(parseFloat(e.target.value))}
                  className="ios-range-slider h-1.5 w-full rounded-full cursor-pointer appearance-none transition-all duration-200"
                  style={{
                    background: `linear-gradient(to right, #ff8008 0%, #ffc837 ${(discountRate / 30) * 100}%, #cbd5e1 ${(discountRate / 30) * 100}%, #cbd5e1 100%)`
                  }}
                />
              </div>
            </div>

            <div className="flex gap-1.5 pt-1">
              {[0, 5, 10, 15, 20].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => onChangeDiscountRate(val)}
                  className={`flex-1 py-1 rounded-full text-[10px] font-black border transition-all ${discountRate === val ? 'bg-orange-500 text-white border-orange-500 shadow-sm' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  {val}%
                </button>
              ))}
            </div>

            <div className="bg-orange-50/60 p-3 rounded-2xl border border-orange-100 text-[11px] text-orange-800 flex items-center justify-between">
              <span className="font-semibold text-orange-700/80">Số tiền chiết khấu thực tế:</span>
              <strong className="text-orange-700 font-extrabold">{formatVnd(discountAmount)}</strong>
            </div>
          </div>
        </div>

        {/* Commission settings based on user role */}
        <div className="card border border-slate-100 lg:col-span-1 shadow-sm hover:shadow-md transition">
          <div className="card-title">
            <Award className="text-emerald-500" size={18} />
            <span className="text-sm font-bold text-slate-800">Thù lao người bán ({role})</span>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Đại lý được hưởng thù lao/hoa hồng tối đa là <strong className="text-emerald-600">{commLimit}%</strong> theo phân cấp đại lý hiện tại.
          </p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
                <span>Tỷ lệ thù lao</span>
                <span className="text-emerald-600 font-black text-xs px-2 py-0.5 bg-emerald-50 rounded-full">{commissionRate}%</span>
              </div>
              <div className="relative pt-1">
                <input 
                  type="range" 
                  min="0" 
                  max={commLimit} 
                  step="1"
                  value={commissionRate} 
                  onChange={(e) => onChangeCommissionRate(parseFloat(e.target.value))}
                  className="ios-range-slider h-1.5 w-full rounded-full cursor-pointer appearance-none transition-all duration-200"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #059669 ${(commissionRate / commLimit) * 100}%, #cbd5e1 ${(commissionRate / commLimit) * 100}%, #cbd5e1 100%)`
                  }}
                />
              </div>
            </div>

            <div className="flex gap-1.5 pt-1">
              {[0, Math.floor(commLimit / 2), commLimit].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => onChangeCommissionRate(val)}
                  className={`flex-1 py-1 rounded-full text-[10px] font-black border transition-all ${commissionRate === val ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  {val}%
                </button>
              ))}
            </div>

            <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100 text-[11px] text-emerald-800 flex items-center justify-between">
              <span className="font-semibold text-emerald-700/80">Tổng thù lao nhận được:</span>
              <strong className="text-emerald-700 font-extrabold">{formatVnd(commissionAmount)}</strong>
            </div>
          </div>
        </div>

        {/* Summary total board - Redesigned to stunning Apple iOS Glassmorphic style */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_20px_50px_rgba(3,55,123,0.06)] rounded-[2.5rem] p-6 text-slate-800 relative overflow-hidden transition-all duration-300 hover:shadow-[0_30px_60px_rgba(3,55,123,0.1)] hover:scale-[1.01] lg:col-span-1 flex flex-col justify-between">
          {/* Subtle iOS background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 text-[#03377B] rounded-xl">
                  <Sparkles size={16} />
                </div>
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Bảng thanh toán phí</span>
              </div>
              <span className="text-[9px] bg-emerald-500/10 text-emerald-700 font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/10">BÁO GIÁ ĐÚNG</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center opacity-80 text-slate-500 font-semibold">
                <span>Tổng phí gốc (ban đầu):</span>
                <span className="font-bold text-slate-700">{formatVnd(basePremium)}</span>
              </div>
              <div className="flex justify-between items-center text-orange-600 font-semibold bg-orange-500/5 px-2.5 py-1.5 rounded-xl border border-orange-500/10">
                <span>Chiết khấu ưu đãi ({discountRate}%):</span>
                <span className="font-bold">- {formatVnd(discountAmount)}</span>
              </div>
              
              <div className="border-t border-slate-100 py-3 my-1 flex justify-between items-center">
                <span className="text-xs font-black text-slate-800">Tổng thanh toán KH:</span>
                <span className="text-base text-[#03377B] font-black tracking-tight">{formatVnd(totalCustomerPay)}</span>
              </div>

              <div className="flex justify-between items-center text-emerald-600 font-semibold bg-emerald-500/5 px-2.5 py-1.5 rounded-xl border border-emerald-500/10">
                <span>Thù lao người bán ({commissionRate}%):</span>
                <span className="font-bold">+ {formatVnd(commissionAmount)}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 mt-4">
            <div className="bg-gradient-to-r from-[#03377B] to-[#0055c8] text-white p-3.5 rounded-2xl shadow-md border border-white/10 flex justify-between items-center">
              <div>
                <span className="block text-[9px] text-blue-200 uppercase font-bold tracking-wider">Người bán nộp PTI</span>
                <span className="text-[9px] text-white/70 font-medium">(Đã khấu trừ thù lao)</span>
              </div>
              <span className="text-base font-black text-amber-300 tracking-tight">{formatVnd(netRemitToPti)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
