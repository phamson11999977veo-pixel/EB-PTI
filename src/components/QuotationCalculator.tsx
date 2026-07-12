import React, { useState } from 'react';
import { Award, ShieldCheck, HelpCircle, DollarSign, Users, Sparkles, TrendingDown, ArrowRightLeft, History, ShieldAlert, Plus, RefreshCw, FileText, Check, CheckSquare, Trash2 } from 'lucide-react';
import { EmployeeTier, InsuranceProgram, UserRole, QuoteVersion } from '../types';

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
  quoteVersions: QuoteVersion[];
  onCreateNewVersion: (notes: string) => void;
  onRestoreVersion: (version: QuoteVersion) => void;
  quoteApprovalStatus: 'Auto_Approved' | 'Pending_Approval' | 'Supervisor_Approved' | 'Supervisor_Rejected';
  onChangeApprovalStatus: (status: 'Auto_Approved' | 'Pending_Approval' | 'Supervisor_Approved' | 'Supervisor_Rejected') => void;
}

export function getDefaultBenefitsForProgram(programId: string) {
  switch (programId) {
    case 'lvl-1':
      return {
        accidentPersonalBenefit: '100.000.000 đ',
        accidentRelativeBenefit: '50.000.000 đ',
        deathOrDisabilityBenefit: '100.000.000 đ',
        inpatientCriticalIllnessBenefit: '75.000.000 đ',
        inpatientOtherDiseasesBenefit: '50.000.000 đ',
        inpatientMaternityBenefit: 'Không áp dụng',
        outpatientTreatmentBenefit: '6.000.000 đ/năm (1.200.000 đ/lần)',
        outpatientBasicDentalBenefit: '2.000.000 đ/năm',
        outpatientFullDentalBenefit: 'Không áp dụng',
        outpatientEasternMedicineBenefit: '1.500.000 đ/năm',
        vaccineComplicationsBenefit: '10.000.000 đ',
      };
    case 'lvl-2':
      return {
        accidentPersonalBenefit: '150.000.000 đ',
        accidentRelativeBenefit: '75.000.000 đ',
        deathOrDisabilityBenefit: '150.000.000 đ',
        inpatientCriticalIllnessBenefit: '100.000.000 đ',
        inpatientOtherDiseasesBenefit: '70.000.000 đ',
        inpatientMaternityBenefit: '10.000.000 đ',
        outpatientTreatmentBenefit: '10.500.000 đ/năm (2.100.000 đ/lần)',
        outpatientBasicDentalBenefit: '3.000.000 đ/năm',
        outpatientFullDentalBenefit: 'Không áp dụng',
        outpatientEasternMedicineBenefit: '2.000.000 đ/năm',
        vaccineComplicationsBenefit: '15.000.000 đ',
      };
    case 'lvl-3':
      return {
        accidentPersonalBenefit: '200.000.000 đ',
        accidentRelativeBenefit: '100.000.000 đ',
        deathOrDisabilityBenefit: '200.000.000 đ',
        inpatientCriticalIllnessBenefit: '150.000.000 đ',
        inpatientOtherDiseasesBenefit: '115.000.000 đ',
        inpatientMaternityBenefit: '20.000.000 đ',
        outpatientTreatmentBenefit: '21.000.000 đ/năm (4.200.000 đ/lần)',
        outpatientBasicDentalBenefit: '4.000.000 đ/năm',
        outpatientFullDentalBenefit: '6.000.000 đ/năm',
        outpatientEasternMedicineBenefit: '3.000.000 đ/năm',
        vaccineComplicationsBenefit: '20.000.000 đ',
      };
    case 'lvl-4':
      return {
        accidentPersonalBenefit: '300.000.000 đ',
        accidentRelativeBenefit: '150.000.000 đ',
        deathOrDisabilityBenefit: '300.000.000 đ',
        inpatientCriticalIllnessBenefit: '300.000.000 đ',
        inpatientOtherDiseasesBenefit: '230.000.000 đ',
        inpatientMaternityBenefit: '30.000.000 đ',
        outpatientTreatmentBenefit: '21.000.000 đ/năm (4.200.000 đ/lần)',
        outpatientBasicDentalBenefit: '5.000.000 đ/năm',
        outpatientFullDentalBenefit: '10.000.000 đ/năm',
        outpatientEasternMedicineBenefit: '4.000.000 đ/năm',
        vaccineComplicationsBenefit: '30.000.000 đ',
      };
    case 'lvl-5':
    default:
      return {
        accidentPersonalBenefit: '500.000.000 đ',
        accidentRelativeBenefit: '250.000.000 đ',
        deathOrDisabilityBenefit: '500.000.000 đ',
        inpatientCriticalIllnessBenefit: '600.000.000 đ',
        inpatientOtherDiseasesBenefit: '460.000.000 đ',
        inpatientMaternityBenefit: '40.000.000 đ',
        outpatientTreatmentBenefit: '25.000.000 đ/năm (5.000.000 đ/lần)',
        outpatientBasicDentalBenefit: '6.000.000 đ/năm',
        outpatientFullDentalBenefit: '15.000.000 đ/năm',
        outpatientEasternMedicineBenefit: '5.000.000 đ/năm',
        vaccineComplicationsBenefit: '50.000.000 đ',
      };
  }
}

export function isTierBenefitsModified(tier: EmployeeTier) {
  return (
    tier.customAccidentPersonalBenefit !== undefined ||
    tier.customAccidentRelativeBenefit !== undefined ||
    tier.customDeathOrDisabilityBenefit !== undefined ||
    tier.customInpatientCriticalIllnessBenefit !== undefined ||
    tier.customInpatientOtherDiseasesBenefit !== undefined ||
    tier.customInpatientMaternityBenefit !== undefined ||
    tier.customOutpatientTreatmentBenefit !== undefined ||
    tier.customOutpatientBasicDentalBenefit !== undefined ||
    tier.customOutpatientFullDentalBenefit !== undefined ||
    tier.customOutpatientEasternMedicineBenefit !== undefined ||
    tier.customVaccineComplicationsBenefit !== undefined ||
    tier.customInpatientBenefit !== undefined ||
    tier.customOutpatientBenefit !== undefined ||
    tier.customAccidentBenefit !== undefined ||
    tier.customMaternityBenefit !== undefined
  );
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
  headcount,
  quoteVersions,
  onCreateNewVersion,
  onRestoreVersion,
  quoteApprovalStatus,
  onChangeApprovalStatus
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

  // Add a new tier/group
  const handleAddTier = () => {
    const nextNum = tiers.length + 1;
    const newTier: EmployeeTier = {
      id: `tier-${Date.now()}`,
      name: `Nhóm ${nextNum}`,
      headcount: 1,
      selectedProgramId: 'lvl-1'
    };
    onChangeTiers([...tiers, newTier]);
  };

  // Remove a tier/group
  const handleRemoveTier = (id: string) => {
    if (tiers.length <= 1) return;
    const newTiers = tiers.filter(t => t.id !== id);
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

      {/* Grid Layout: Left column for Sticky Payment Table, Right column for Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start relative">
        
        {/* LEFT COLUMN: Input Controls */}
        <div className="lg:col-span-2 lg:order-1 order-1 space-y-6">

          {/* Tier distribution */}
          <div className="card border border-slate-100">
            <div className="card-title justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Users className="text-[#03377B]" size={18} />
                <span className="font-bold text-slate-800 text-sm">Phân bổ gói bảo hiểm theo nhóm</span>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleAddTier}
                  className="px-3 py-1.5 bg-[#03377B] hover:bg-blue-800 text-white text-xs font-black rounded-lg transition shadow-xs flex items-center gap-1"
                >
                  <Plus size={13} className="text-white" />
                  <span>Thêm nhóm mới</span>
                </button>
                <span className="text-xs font-semibold text-[#03377B] bg-blue-50 px-2.5 py-1 rounded-full shrink-0">
                  Đã phân bổ: {currentTotalHeadcount} / {headcount} nhân viên
                </span>
              </div>
            </div>

            <div className="space-y-5">
              {tiers.map((tier) => {
                const selectedProg = programs.find(p => p.id === tier.selectedProgramId);
                return (
                  <div key={tier.id} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* Tier Info */}
                      <div className="md:col-span-3">
                        <label className="text-[11px] font-bold text-[#03377B] tracking-wider block mb-1">Tên nhóm</label>
                        <input
                          type="text"
                          value={tier.name}
                          onChange={(e) => handleUpdateTier(tier.id, { name: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold outline-none focus:border-[#03377B]"
                          placeholder="VD: Nhóm 1"
                        />
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
                      <div className="md:col-span-2 text-right">
                        <span className="text-[11px] font-bold text-slate-400 tracking-wider block mb-1">Thành phí</span>
                        <span className="font-bold text-[#03377B] text-sm block">
                          {formatVnd(tier.headcount * (selectedProg?.ratePerHead || 0))}
                        </span>
                      </div>

                      {/* Delete Button */}
                      <div className="md:col-span-1 text-center flex items-center justify-center pt-4 md:pt-0">
                        {tiers.length > 1 ? (
                          <button
                            type="button"
                            onClick={() => handleRemoveTier(tier.id)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg border border-transparent hover:border-rose-100 transition shadow-xs"
                            title="Xoá nhóm này"
                          >
                            <Trash2 size={14} />
                          </button>
                        ) : (
                          <div className="w-5" />
                        )}
                      </div>
                    </div>

                {/* Micro benefit summary for selected program */}
                {selectedProg && (() => {
                  const defaults = getDefaultBenefitsForProgram(selectedProg.id);
                  const bAccidentPersonal = tier.customAccidentPersonalBenefit !== undefined ? tier.customAccidentPersonalBenefit : defaults.accidentPersonalBenefit;
                  const bAccidentRelative = tier.customAccidentRelativeBenefit !== undefined ? tier.customAccidentRelativeBenefit : defaults.accidentRelativeBenefit;
                  const bDeathOrDisability = tier.customDeathOrDisabilityBenefit !== undefined ? tier.customDeathOrDisabilityBenefit : defaults.deathOrDisabilityBenefit;

                  const bInpatientCriticalIllness = tier.customInpatientCriticalIllnessBenefit !== undefined ? tier.customInpatientCriticalIllnessBenefit : defaults.inpatientCriticalIllnessBenefit;
                  const bInpatientOtherDiseases = tier.customInpatientOtherDiseasesBenefit !== undefined ? tier.customInpatientOtherDiseasesBenefit : defaults.inpatientOtherDiseasesBenefit;
                  const bInpatientMaternity = tier.customInpatientMaternityBenefit !== undefined ? tier.customInpatientMaternityBenefit : defaults.inpatientMaternityBenefit;

                  const bOutpatientTreatment = tier.customOutpatientTreatmentBenefit !== undefined ? tier.customOutpatientTreatmentBenefit : defaults.outpatientTreatmentBenefit;
                  const bOutpatientBasicDental = tier.customOutpatientBasicDentalBenefit !== undefined ? tier.customOutpatientBasicDentalBenefit : defaults.outpatientBasicDentalBenefit;
                  const bOutpatientFullDental = tier.customOutpatientFullDentalBenefit !== undefined ? tier.customOutpatientFullDentalBenefit : defaults.outpatientFullDentalBenefit;
                  const bOutpatientEasternMedicine = tier.customOutpatientEasternMedicineBenefit !== undefined ? tier.customOutpatientEasternMedicineBenefit : defaults.outpatientEasternMedicineBenefit;

                  const bVaccineComplications = tier.customVaccineComplicationsBenefit !== undefined ? tier.customVaccineComplicationsBenefit : defaults.vaccineComplicationsBenefit;

                  return (
                    <div className="mt-3.5 pt-3.5 border-t border-slate-200/60">
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="flex items-center gap-1.5 text-[11px] font-black text-slate-700">
                          <span>✨ Chi tiết quyền lợi chương trình</span>
                          {role === 'CA' && (
                            <span className="text-[9px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider animate-pulse">
                              Quyền chỉnh sửa của CA
                            </span>
                          )}
                        </div>
                        
                        {role === 'CA' && isTierBenefitsModified(tier) && (
                          <button
                            type="button"
                            onClick={() => {
                              handleUpdateTier(tier.id, {
                                customInpatientBenefit: undefined,
                                customOutpatientBenefit: undefined,
                                customAccidentBenefit: undefined,
                                customMaternityBenefit: undefined,
                                customAccidentPersonalBenefit: undefined,
                                customAccidentRelativeBenefit: undefined,
                                customDeathOrDisabilityBenefit: undefined,
                                customInpatientCriticalIllnessBenefit: undefined,
                                customInpatientOtherDiseasesBenefit: undefined,
                                customInpatientMaternityBenefit: undefined,
                                customOutpatientTreatmentBenefit: undefined,
                                customOutpatientBasicDentalBenefit: undefined,
                                customOutpatientFullDentalBenefit: undefined,
                                customOutpatientEasternMedicineBenefit: undefined,
                                customVaccineComplicationsBenefit: undefined,
                              });
                            }}
                            className="text-[10px] text-rose-500 hover:text-rose-600 font-extrabold transition-all hover:underline flex items-center gap-1"
                          >
                            ✕ Khôi phục mặc định
                          </button>
                        )}
                      </div>

                      {role === 'CA' ? (
                        <div className="space-y-4">
                          {/* Nhóm 1: Tai nạn & Sinh mạng */}
                          <div className="p-3 bg-slate-100/50 rounded-2xl border border-slate-200/40">
                            <h5 className="text-[10px] font-black text-[#03377B] uppercase tracking-wider mb-2.5 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#03377B]"></span>
                              1. Tai nạn & Sinh mạng (Cá nhân & Người thân)
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                                <span className="text-slate-500 block text-[9px] font-bold">Tai nạn cá nhân tối đa</span>
                                <input
                                  type="text"
                                  value={bAccidentPersonal}
                                  onChange={(e) => handleUpdateTier(tier.id, { customAccidentPersonalBenefit: e.target.value })}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-black text-slate-800 outline-none focus:border-[#03377B] focus:bg-white transition"
                                />
                              </div>
                              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                                <span className="text-slate-500 block text-[9px] font-bold">Tai nạn người thân tối đa</span>
                                <input
                                  type="text"
                                  value={bAccidentRelative}
                                  onChange={(e) => handleUpdateTier(tier.id, { customAccidentRelativeBenefit: e.target.value })}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-black text-slate-800 outline-none focus:border-[#03377B] focus:bg-white transition"
                                />
                              </div>
                              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                                <span className="text-slate-500 block text-[9px] font-bold">Tử vong hoặc thương tật TBVV</span>
                                <input
                                  type="text"
                                  value={bDeathOrDisability}
                                  onChange={(e) => handleUpdateTier(tier.id, { customDeathOrDisabilityBenefit: e.target.value })}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-black text-slate-800 outline-none focus:border-[#03377B] focus:bg-white transition"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Nhóm 2: Quyền lợi Nội trú */}
                          <div className="p-3 bg-slate-100/50 rounded-2xl border border-slate-200/40">
                            <h5 className="text-[10px] font-black text-[#03377B] uppercase tracking-wider mb-2.5 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#03377B]"></span>
                              2. Quyền lợi Nội trú (Bệnh & Thai sản)
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                                <span className="text-slate-500 block text-[9px] font-bold">Nội trú - Bệnh hiểm nghèo</span>
                                <input
                                  type="text"
                                  value={bInpatientCriticalIllness}
                                  onChange={(e) => handleUpdateTier(tier.id, { customInpatientCriticalIllnessBenefit: e.target.value })}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-black text-slate-800 outline-none focus:border-[#03377B] focus:bg-white transition"
                                />
                              </div>
                              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                                <span className="text-slate-500 block text-[9px] font-bold">Nội trú - Bệnh khác (ngoài BHN)</span>
                                <input
                                  type="text"
                                  value={bInpatientOtherDiseases}
                                  onChange={(e) => handleUpdateTier(tier.id, { customInpatientOtherDiseasesBenefit: e.target.value })}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-black text-slate-800 outline-none focus:border-[#03377B] focus:bg-white transition"
                                />
                              </div>
                              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                                <span className="text-slate-500 block text-[9px] font-bold">Nội trú - Thai sản</span>
                                <input
                                  type="text"
                                  value={bInpatientMaternity}
                                  onChange={(e) => handleUpdateTier(tier.id, { customInpatientMaternityBenefit: e.target.value })}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-black text-slate-800 outline-none focus:border-[#03377B] focus:bg-white transition"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Nhóm 3: Quyền lợi Ngoại trú & Nha khoa */}
                          <div className="p-3 bg-slate-100/50 rounded-2xl border border-slate-200/40">
                            <h5 className="text-[10px] font-black text-[#03377B] uppercase tracking-wider mb-2.5 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#03377B]"></span>
                              3. Quyền lợi Ngoại trú, Nha khoa & Đông y
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                                <span className="text-slate-500 block text-[9px] font-bold">Điều trị ngoại trú</span>
                                <input
                                  type="text"
                                  value={bOutpatientTreatment}
                                  onChange={(e) => handleUpdateTier(tier.id, { customOutpatientTreatmentBenefit: e.target.value })}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-black text-slate-800 outline-none focus:border-[#03377B] focus:bg-white transition"
                                />
                              </div>
                              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                                <span className="text-slate-500 block text-[9px] font-bold">Chăm sóc răng cơ bản</span>
                                <input
                                  type="text"
                                  value={bOutpatientBasicDental}
                                  onChange={(e) => handleUpdateTier(tier.id, { customOutpatientBasicDentalBenefit: e.target.value })}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-black text-slate-800 outline-none focus:border-[#03377B] focus:bg-white transition"
                                />
                              </div>
                              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                                <span className="text-slate-500 block text-[9px] font-bold">Chăm sóc răng toàn diện</span>
                                <input
                                  type="text"
                                  value={bOutpatientFullDental}
                                  onChange={(e) => handleUpdateTier(tier.id, { customOutpatientFullDentalBenefit: e.target.value })}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-black text-slate-800 outline-none focus:border-[#03377B] focus:bg-white transition"
                                />
                              </div>
                              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                                <span className="text-slate-500 block text-[9px] font-bold">Điều trị đông y</span>
                                <input
                                  type="text"
                                  value={bOutpatientEasternMedicine}
                                  onChange={(e) => handleUpdateTier(tier.id, { customOutpatientEasternMedicineBenefit: e.target.value })}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-black text-slate-800 outline-none focus:border-[#03377B] focus:bg-white transition"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Nhóm 4: Quyền lợi Mở rộng */}
                          <div className="p-3 bg-slate-100/50 rounded-2xl border border-slate-200/40">
                            <h5 className="text-[10px] font-black text-[#03377B] uppercase tracking-wider mb-2.5 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#03377B]"></span>
                              4. Quyền lợi Mở rộng (Biến chứng tiêm chủng)
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                                <span className="text-slate-500 block text-[9px] font-bold">Điều trị biến chứng vắc xin</span>
                                <input
                                  type="text"
                                  value={bVaccineComplications}
                                  onChange={(e) => handleUpdateTier(tier.id, { customVaccineComplicationsBenefit: e.target.value })}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-black text-slate-800 outline-none focus:border-[#03377B] focus:bg-white transition"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                            <span className="text-slate-400 block text-[9px] font-semibold">Tai nạn cá nhân tối đa</span>
                            <span className="font-extrabold text-slate-700 block mt-0.5">{bAccidentPersonal}</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                            <span className="text-slate-400 block text-[9px] font-semibold">Tai nạn người thân tối đa</span>
                            <span className="font-extrabold text-slate-700 block mt-0.5">{bAccidentRelative}</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                            <span className="text-slate-400 block text-[9px] font-semibold">Tử vong/thương tật TBVV</span>
                            <span className="font-extrabold text-slate-700 block mt-0.5">{bDeathOrDisability}</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                            <span className="text-slate-400 block text-[9px] font-semibold">Nội trú - Bệnh hiểm nghèo</span>
                            <span className="font-extrabold text-slate-700 block mt-0.5">{bInpatientCriticalIllness}</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                            <span className="text-slate-400 block text-[9px] font-semibold">Nội trú - Bệnh khác (ngoài BHN)</span>
                            <span className="font-extrabold text-slate-700 block mt-0.5">{bInpatientOtherDiseases}</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                            <span className="text-slate-400 block text-[9px] font-semibold">Nội trú - Thai sản</span>
                            <span className="font-extrabold text-slate-700 block mt-0.5">{bInpatientMaternity}</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                            <span className="text-slate-400 block text-[9px] font-semibold">Điều trị ngoại trú</span>
                            <span className="font-extrabold text-slate-700 block mt-0.5">{bOutpatientTreatment}</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                            <span className="text-slate-400 block text-[9px] font-semibold">Chăm sóc răng cơ bản</span>
                            <span className="font-extrabold text-slate-700 block mt-0.5">{bOutpatientBasicDental}</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                            <span className="text-slate-400 block text-[9px] font-semibold">Chăm sóc răng toàn diện</span>
                            <span className="font-extrabold text-slate-700 block mt-0.5">{bOutpatientFullDental}</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                            <span className="text-slate-400 block text-[9px] font-semibold">Điều trị đông y</span>
                            <span className="font-extrabold text-slate-700 block mt-0.5">{bOutpatientEasternMedicine}</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] col-span-1 sm:col-span-2 md:col-span-2">
                            <span className="text-slate-400 block text-[9px] font-semibold">Mở rộng điều trị y tế do tiêm vacxin</span>
                            <span className="font-extrabold text-slate-700 block mt-0.5">{bVaccineComplications}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            );
          })}
          
          {/* Compliance note for modified benefits */}
          {tiers.some(t => isTierBenefitsModified(t)) && (
            <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200/60 flex items-start gap-3 text-left animate-fade-in mt-4">
              <ShieldAlert className="text-blue-600 mt-0.5 flex-shrink-0" size={16} />
              <div className="space-y-1">
                <h4 className="text-xs font-black text-blue-800 uppercase tracking-tight">⚠️ QUYỀN LỢI ĐÃ ĐƯỢC CHỈNH SỬA (LƯU VẾT PHÁP LÝ v6.3)</h4>
                <p className="text-blue-700 text-[11px] leading-relaxed font-medium">
                  Bạn vừa điều chỉnh chi tiết quyền lợi chương trình so với biểu phí chuẩn của PTI.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

          {/* Financial settings card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Discount slider and presets */}
            <div className="card border border-slate-100 shadow-sm hover:shadow-md transition">
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
            <div className="card border border-slate-100 shadow-sm hover:shadow-md transition">
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

          </div>

        </div> {/* CLOSE LEFT COLUMN */}

        {/* RIGHT COLUMN: Sticky Bảng thanh toán phí */}
        <div className="lg:col-span-1 lg:sticky lg:top-24 lg:order-2 order-2 space-y-6">
          
          {/* Summary total board - Redesigned to stunning Apple iOS Glassmorphic style */}
          <div className="bg-white/75 backdrop-blur-md border border-slate-100 shadow-[0_20px_50px_rgba(3,55,123,0.06)] rounded-[2.5rem] p-6 text-slate-800 relative overflow-hidden transition-all duration-300 hover:shadow-[0_30px_60px_rgba(3,55,123,0.1)] flex flex-col justify-between">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-50 text-[#03377B] rounded-xl animate-pulse">
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
                <span className="text-sm font-black text-amber-300 tracking-tight">{formatVnd(netRemitToPti)}</span>
              </div>
            </div>
          </div>

        </div> {/* CLOSE RIGHT COLUMN */}

      </div> {/* CLOSE GRID CONTAINER */}

    </div>
  );
}
