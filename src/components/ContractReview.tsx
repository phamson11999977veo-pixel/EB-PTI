import React from 'react';
import { FileText, Building, Users, CreditCard, ShieldCheck, CheckCircle, HelpCircle } from 'lucide-react';
import { CompanyInfo, GroupSizeInfo, EmployeeTier, InsuredEmployee, InvoiceInfo, InsuranceProgram } from '../types';

interface ContractReviewProps {
  companyInfo: CompanyInfo;
  groupSizeInfo: GroupSizeInfo;
  tiers: EmployeeTier[];
  employees: InsuredEmployee[];
  invoiceInfo: InvoiceInfo;
  programs: InsuranceProgram[];
  discountRate: number;
  commissionRate: number;
}

export default function ContractReview({
  companyInfo,
  groupSizeInfo,
  tiers,
  employees,
  invoiceInfo,
  programs,
  discountRate,
  commissionRate
}: ContractReviewProps) {

  const formatVnd = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  // Calculations
  const basePremium = tiers.reduce((sum, tier) => {
    const prog = programs.find(p => p.id === tier.selectedProgramId);
    return sum + (tier.headcount * (prog?.ratePerHead || 0));
  }, 0);

  const discountAmount = Math.round((basePremium * discountRate) / 100);
  const totalCustomerPay = basePremium - discountAmount;
  const commissionAmount = Math.round((totalCustomerPay * commissionRate) / 100);
  const netRemitToPti = totalCustomerPay - commissionAmount;

  // Counts
  const hasRiskCount = employees.filter(e => e.hasPreExisting || e.hasHospitalized12m || e.hasOngoingTreatment).length;
  const unresolvedRiskCount = employees.filter(e => 
    (e.hasPreExisting || e.hasHospitalized12m || e.hasOngoingTreatment) && e.underwritingAction === 'none'
  ).length;

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Company & Contract Info */}
        <div className="card border border-slate-100 space-y-4">
          <div className="card-title text-slate-800 border-b border-slate-100 pb-2.5">
            <Building className="text-[#03377B]" size={18} />
            <span>Thông tin Doanh nghiệp Mua bảo hiểm</span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
            <div className="col-span-2">
              <span className="text-slate-400 block">Tên doanh nghiệp</span>
              <span className="font-bold text-slate-800 text-sm block mt-0.5">{companyInfo.name || 'N/A'}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Mã số thuế</span>
              <span className="font-bold text-slate-700 block mt-0.5">{companyInfo.taxCode || 'N/A'}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Ngành nghề</span>
              <span className="font-medium text-slate-700 block mt-0.5">{companyInfo.industry || 'N/A'}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Người đại diện liên hệ</span>
              <span className="font-semibold text-slate-700 block mt-0.5">{companyInfo.contactName || 'N/A'} ({companyInfo.contactRole || 'HR'})</span>
            </div>
            <div>
              <span className="text-slate-400 block">Số điện thoại</span>
              <span className="font-semibold text-slate-700 block mt-0.5">{companyInfo.phone || 'N/A'}</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-400 block">Email nhận thông báo</span>
              <span className="font-semibold text-slate-700 block mt-0.5">{companyInfo.email || 'N/A'}</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-400 block">Địa chỉ trụ sở</span>
              <span className="text-slate-600 block mt-0.5">{companyInfo.address || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Invoice configuration details */}
        <div className="card border border-slate-100 space-y-4">
          <div className="card-title text-slate-800 border-b border-slate-100 pb-2.5">
            <FileText className="text-blue-600" size={18} />
            <span>Cấu hình Xuất hóa đơn tài chính</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#03377B] block">Hình thức thanh toán & Hóa đơn</span>
                <span className="font-bold text-slate-800 text-sm block mt-0.5">
                  {invoiceInfo.type === 'pay_now' && 'Thanh toán trực tiếp (Không xuất HĐ)'}
                  {invoiceInfo.type === 'invoice_buyer' && 'Xuất hóa đơn cho Bên Mua Bảo Hiểm (DN)'}
                  {invoiceInfo.type === 'invoice_employee' && 'Xuất hóa đơn cho Người Được Bảo Hiểm (Cá nhân)'}
                </span>
              </div>
            </div>

            {invoiceInfo.type !== 'pay_now' && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 pt-1">
                <div className="col-span-2">
                  <span className="text-slate-400 block">Tên đơn vị nhận hóa đơn</span>
                  <span className="font-bold text-slate-700">{invoiceInfo.buyerName || companyInfo.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Mã số thuế xuất HĐ</span>
                  <span className="font-bold text-slate-700">{invoiceInfo.taxCode || companyInfo.taxCode}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Email nhận hóa đơn điện tử</span>
                  <span className="font-semibold text-emerald-600">{invoiceInfo.email || companyInfo.email}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block">Địa chỉ xuất HĐ</span>
                  <span className="text-slate-600">{invoiceInfo.address || companyInfo.address}</span>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Tiers distribution breakdown */}
      <div className="card border border-slate-100">
        <div className="card-title text-slate-800">
          <Users className="text-[#03377B]" size={18} />
          <span>Chi tiết Cơ cấu Phân cấp & Quyền lợi Bảo hiểm nhóm</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-2.5 font-bold text-slate-500 uppercase">Cấp bậc phân bổ</th>
                <th className="p-2.5 font-bold text-slate-500 uppercase">Gói bảo hiểm lựa chọn</th>
                <th className="p-2.5 font-bold text-slate-500 uppercase text-center">Số lượng nhân sự</th>
                <th className="p-2.5 font-bold text-slate-500 uppercase text-right">Phí/đầu người</th>
                <th className="p-2.5 font-bold text-slate-500 uppercase text-right">Thành tiền ban đầu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tiers.map(tier => {
                const prog = programs.find(p => p.id === tier.selectedProgramId);
                return (
                  <tr key={tier.id}>
                    <td className="p-2.5 font-bold text-slate-800">{tier.name}</td>
                    <td className="p-2.5">
                      <span className="font-semibold text-slate-700">{prog?.name}</span>
                      <span className="text-[10px] text-slate-400 block">{prog?.tierLabel}</span>
                    </td>
                    <td className="p-2.5 text-center font-bold text-slate-800">{tier.headcount} nhân viên</td>
                    <td className="p-2.5 text-right text-slate-600">{formatVnd(prog?.ratePerHead || 0)}</td>
                    <td className="p-2.5 text-right font-semibold text-[#03377B]">{formatVnd(tier.headcount * (prog?.ratePerHead || 0))}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Financial final total sheet */}
      <div className="card border-0 bg-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <CreditCard size={180} />
        </div>
        
        <div className="relative">
          <h3 className="text-base font-bold mb-4 flex items-center gap-2 text-blue-200 border-b border-white/10 pb-2.5">
            <ShieldCheck size={18} className="text-emerald-400" />
            <span>Tóm tắt Hồ sơ Thanh toán Phí bảo hiểm</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
              <span className="text-xs text-white/60 block uppercase">Tổng phí gốc ban đầu</span>
              <span className="text-lg font-bold block mt-1.5 text-white">{formatVnd(basePremium)}</span>
              <span className="text-[10px] text-white/40 block mt-1">Dựa trên {employees.length} thành viên</span>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
              <span className="text-xs text-white/60 block uppercase text-orange-300">Chiết khấu ưu đãi ({discountRate}%)</span>
              <span className="text-lg font-bold block mt-1.5 text-orange-300">- {formatVnd(discountAmount)}</span>
              <span className="text-[10px] text-white/40 block mt-1">Đã khấu trừ phí gốc</span>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
              <span className="text-xs text-white/60 block uppercase text-emerald-300">Tổng phí khách hàng trả</span>
              <span className="text-xl font-black block mt-1 text-emerald-400">{formatVnd(totalCustomerPay)}</span>
              <span className="text-[10px] text-white/40 block mt-1">Phí ghi nhận trên hóa đơn</span>
            </div>

            <div className="bg-emerald-600/30 p-4 rounded-xl border border-emerald-500/20 text-center">
              <span className="text-xs text-blue-200 block uppercase font-bold tracking-wide">Số tiền nộp về PTI</span>
              <span className="text-xl font-black block mt-1 text-amber-300">{formatVnd(netRemitToPti)}</span>
              <span className="text-[10px] text-blue-100/60 block mt-1">Đã giữ lại {commissionRate}% thù lao ({formatVnd(commissionAmount)})</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
