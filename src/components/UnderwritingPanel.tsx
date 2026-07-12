import React, { useState } from 'react';
import { UserCheck, UserMinus, FileSpreadsheet, AlertTriangle, Plus, Trash2, UploadCloud, CheckCircle2, HelpCircle, HeartPulse } from 'lucide-react';
import { InsuredEmployee, EmployeeTier } from '../types';

interface UnderwritingPanelProps {
  employees: InsuredEmployee[];
  onChangeEmployees: (emps: InsuredEmployee[]) => void;
  tiers: EmployeeTier[];
  clientType: 'new' | 'renew' | 'non_continuous';
}

// Calculate risk details
export const getEmpRiskDetails = (emp: Partial<InsuredEmployee>) => {
  return {
    hasRisk: false,
    reasons: [],
    coefficient: 1.0
  };
};

export default function UnderwritingPanel({
  employees,
  onChangeEmployees,
  tiers,
  clientType
}: UnderwritingPanelProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmp, setNewEmp] = useState({
    name: '',
    dob: '1995-05-15',
    cccd: '',
    gender: 'Nam' as 'Nam' | 'Nữ',
    email: '',
    tierId: tiers[2]?.id || 'tier-3',
    hasPreExisting: false,
    hasHospitalized12m: false,
    hasOngoingTreatment: false,
    treatmentDetails: '',
    occupation: 'Văn phòng',
    claimHistory: 'good' as 'good' | 'normal' | 'bad',
    hasSupplementaryFile: false
  });

  // Calculate stats
  const totalInsured = employees.length;
  const exceptionCount = employees.filter(e => getEmpRiskDetails(e).hasRisk).length;
  const resolvedCount = employees.filter(e => 
    getEmpRiskDetails(e).hasRisk && e.underwritingAction !== 'none'
  ).length;
  const approvedCount = employees.filter(e => e.underwritingAction === 'approve' || !getEmpRiskDetails(e).hasRisk).length;
  
  const progressPercent = totalInsured > 0 ? Math.round(((totalInsured - exceptionCount + resolvedCount) / totalInsured) * 100) : 0;

  // Prepopulate with elegant mock data reflecting genuine insurance risk criteria (adverse selection)
  const handleLoadDemoEmployees = () => {
    const demo: InsuredEmployee[] = [
      {
        id: 'emp-1',
        name: 'Trần Quốc Tuấn',
        dob: '12/03/1980',
        cccd: '001080002134',
        gender: 'Nam',
        email: 'tuan.tq@abc.com',
        tierId: 'tier-1', // executive
        healthStatus: 'Sạch',
        hasPreExisting: false,
        hasHospitalized12m: false,
        hasOngoingTreatment: false,
        treatmentDetails: '',
        underwritingAction: 'none',
        occupation: 'Giám đốc - Văn phòng',
        claimHistory: 'good',
        supplementaryFiles: []
      },
      {
        id: 'emp-2',
        name: 'Lê Thị Thu Thủy',
        dob: '05/11/1986',
        cccd: '038186004958',
        gender: 'Nữ',
        email: 'thuy.ltt@abc.com',
        tierId: 'tier-2', // manager
        healthStatus: 'Sạch',
        hasPreExisting: false,
        hasHospitalized12m: false,
        hasOngoingTreatment: false,
        treatmentDetails: '',
        underwritingAction: 'none',
        occupation: 'Trưởng phòng - Nhân sự',
        claimHistory: 'good',
        supplementaryFiles: []
      },
      {
        id: 'emp-3',
        name: 'Phạm Minh Đức',
        dob: '28/08/1995',
        cccd: '025095003322',
        gender: 'Nam',
        email: 'duc.pm@abc.com',
        tierId: 'tier-3', // staff
        healthStatus: 'Sạch',
        hasPreExisting: false,
        hasHospitalized12m: false,
        hasOngoingTreatment: false,
        treatmentDetails: '',
        underwritingAction: 'none',
        occupation: 'Kỹ sư - Thiết kế hệ thống',
        claimHistory: 'good',
        supplementaryFiles: []
      },
      {
        id: 'emp-4',
        name: 'Nguyễn Bích Ngọc',
        dob: '17/02/1990',
        cccd: '019190005432',
        gender: 'Nữ',
        email: 'ngoc.nb@abc.com',
        tierId: 'tier-3', // staff
        healthStatus: 'Sạch',
        hasPreExisting: false,
        hasHospitalized12m: false,
        hasOngoingTreatment: false,
        treatmentDetails: '',
        underwritingAction: 'none',
        occupation: 'Nhân viên hành chính - Văn phòng',
        claimHistory: 'good',
        supplementaryFiles: []
      },
      {
        id: 'emp-5',
        name: 'Vũ Hoàng Nam',
        dob: '14/07/1998',
        cccd: '031098001155',
        gender: 'Nam',
        email: 'nam.vh@abc.com',
        tierId: 'tier-3', // staff
        healthStatus: 'Sạch',
        hasPreExisting: false,
        hasHospitalized12m: false,
        hasOngoingTreatment: false,
        treatmentDetails: '',
        underwritingAction: 'none',
        occupation: 'Lập trình viên - Văn phòng',
        claimHistory: 'good',
        supplementaryFiles: []
      },
      {
        id: 'emp-6',
        name: 'Bùi Văn Vững',
        dob: '15/06/1971',
        cccd: '017071002233',
        gender: 'Nam',
        email: 'vung.bv@abc.com',
        tierId: 'tier-3', // staff
        healthStatus: 'Sạch',
        hasPreExisting: false,
        hasHospitalized12m: false,
        hasOngoingTreatment: false,
        treatmentDetails: '',
        underwritingAction: 'none',
        occupation: 'Bộ phận Giám sát',
        claimHistory: 'good',
        supplementaryFiles: []
      }
    ];
    onChangeEmployees(demo);
  };

  const handleExcelImport = () => {
    handleLoadDemoEmployees();
  };

  // Add individual employee
  const handleAddEmployeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmp.name || !newEmp.cccd) {
      alert('Vui lòng điền tên và số CCCD của nhân viên');
      return;
    }

    const { hasRisk } = getEmpRiskDetails(newEmp);
    const added: InsuredEmployee = {
      id: 'emp-' + Date.now(),
      name: newEmp.name,
      dob: newEmp.dob,
      cccd: newEmp.cccd,
      gender: newEmp.gender,
      email: newEmp.email,
      tierId: newEmp.tierId,
      healthStatus: hasRisk ? 'Có rủi ro' : 'Sạch',
      hasPreExisting: newEmp.hasPreExisting,
      hasHospitalized12m: newEmp.hasHospitalized12m,
      hasOngoingTreatment: newEmp.hasOngoingTreatment,
      treatmentDetails: newEmp.treatmentDetails,
      underwritingAction: 'none',
      occupation: newEmp.occupation,
      claimHistory: newEmp.claimHistory,
      supplementaryFiles: newEmp.hasSupplementaryFile ? ['File_Y_Khoa_Kem_Theo.pdf'] : []
    };

    onChangeEmployees([...employees, added]);
    setShowAddForm(false);
    // Reset form
    setNewEmp({
      name: '',
      dob: '1995-05-15',
      cccd: '',
      gender: 'Nam',
      email: '',
      tierId: tiers[2]?.id || 'tier-3',
      hasPreExisting: false,
      hasHospitalized12m: false,
      hasOngoingTreatment: false,
      treatmentDetails: '',
      occupation: 'Văn phòng',
      claimHistory: 'good',
      hasSupplementaryFile: false
    });
  };

  // Delete employee
  const handleDeleteEmployee = (id: string) => {
    onChangeEmployees(employees.filter(e => e.id !== id));
  };

  // Resolve health exception
  const handleResolveException = (id: string, action: InsuredEmployee['underwritingAction']) => {
    onChangeEmployees(employees.map(e => {
      if (e.id === id) {
        return { 
          ...e, 
          underwritingAction: action,
          medicalFileUploaded: action === 'request_files' ? true : e.medicalFileUploaded
        };
      }
      return e;
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Client Type Picker removed as requested */}

      {/* Upload and quick tools */}
      {employees.length === 0 && (
        <div className="relative overflow-hidden bg-white border border-slate-100 shadow-[0_15px_50px_rgba(3,55,123,0.04)] hover:shadow-[0_25px_60px_rgba(3,55,123,0.06)] rounded-[2.5rem] text-center py-12 transition-all">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <FileSpreadsheet className="text-[#03377B]/40 mx-auto mb-4 animate-bounce" size={48} />
          <h3 className="text-base font-black text-[#03377B] tracking-tight uppercase">Tải lên danh sách Người được bảo hiểm</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-2 leading-relaxed font-medium">
            Hệ thống hỗ trợ nhập danh sách hàng loạt từ file Excel (.xlsx / .csv). 
            Vui lòng chuẩn bị file theo mẫu quy chuẩn PTI Care.
          </p>

          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={handleExcelImport}
              className="px-6 py-2.5 bg-[#03377B] hover:bg-[#022D66] text-white text-xs font-black rounded-xl shadow-md transition flex items-center gap-1.5 hover:-translate-y-0.5 active:scale-95"
            >
              <UploadCloud size={14} className="stroke-[2.5]" />
              <span>Tải file Excel danh sách nhân viên</span>
            </button>
            <button
              onClick={handleLoadDemoEmployees}
              className="px-6 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 text-xs font-black rounded-xl border border-emerald-500/20 transition hover:-translate-y-0.5 active:scale-95"
            >
              ⚡ Nạp danh sách mẫu nhanh
            </button>
          </div>
        </div>
      )}

      {employees.length > 0 && (
        <div className="space-y-6">
          
          {/* Underwriting Progress Header removed as requested */}

          {/* Underwriting Exceptions Section is completely hidden to provide a clean 100% happy case experience */}

          {/* Insured List and Add form */}
          <div className="bg-white border border-slate-100 shadow-[0_15px_50px_rgba(3,55,123,0.04)] rounded-[2.5rem] p-6 sm:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-[0_25px_60px_rgba(3,55,123,0.06)] space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-blue-50/80 text-[#03377B] rounded-2xl border border-blue-100/40">
                  <UserCheck size={20} className="stroke-[2.5]" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-black text-[#03377B] uppercase tracking-wider">Danh sách nhân sự được bảo hiểm</h4>
                  <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Bảo hiểm sức khỏe doanh nghiệp PTI Care · {totalInsured} thành viên</p>
                </div>
              </div>
              
              {/* Buttons removed as requested */}
            </div>

            {/* Quick manual add inline form */}
            {showAddForm && (
              <form onSubmit={handleAddEmployeeSubmit} className="bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-blue-500/15 shadow-inner space-y-4 text-left">
                <div className="flex items-center gap-2 pb-2 border-b border-blue-500/10 mb-2">
                  <div className="w-1.5 h-3.5 bg-[#03377B] rounded"></div>
                  <span className="text-xs font-black text-[#03377B] uppercase tracking-wider">Khai báo thành viên lẻ</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Họ và tên *</label>
                    <input 
                      type="text" 
                      required
                      value={newEmp.name}
                      onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                      placeholder="VD: Nguyễn Văn Nam"
                      className="w-full bg-white/70 border border-slate-200 focus:border-[#03377B] focus:ring-1 focus:ring-[#03377B] rounded-xl px-3 py-2 text-xs outline-none transition font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Số CCCD *</label>
                    <input 
                      type="text" 
                      required
                      value={newEmp.cccd}
                      onChange={(e) => setNewEmp({ ...newEmp, cccd: e.target.value })}
                      placeholder="Mã định danh 12 số"
                      className="w-full bg-white/70 border border-slate-200 focus:border-[#03377B] focus:ring-1 focus:ring-[#03377B] rounded-xl px-3 py-2 text-xs outline-none transition font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Cấp bậc / Phân hạng</label>
                    <select
                      value={newEmp.tierId}
                      onChange={(e) => setNewEmp({ ...newEmp, tierId: e.target.value })}
                      className="w-full bg-white/70 border border-slate-200 focus:border-[#03377B] focus:ring-1 focus:ring-[#03377B] rounded-xl px-3 py-2 text-xs outline-none transition font-semibold text-slate-700"
                    >
                      {tiers.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Ngày sinh</label>
                    <input 
                      type="date" 
                      value={newEmp.dob}
                      onChange={(e) => setNewEmp({ ...newEmp, dob: e.target.value })}
                      className="w-full bg-white/70 border border-slate-200 focus:border-[#03377B] focus:ring-1 focus:ring-[#03377B] rounded-xl px-3 py-2 text-xs outline-none transition font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Giới tính</label>
                    <select
                      value={newEmp.gender}
                      onChange={(e) => setNewEmp({ ...newEmp, gender: e.target.value as 'Nam' | 'Nữ' })}
                      className="w-full bg-white/70 border border-slate-200 focus:border-[#03377B] focus:ring-1 focus:ring-[#03377B] rounded-xl px-3 py-2 text-xs outline-none transition font-medium"
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Email liên hệ</label>
                    <input 
                      type="email" 
                      value={newEmp.email}
                      onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })}
                      placeholder="VD: nam.nv@abc.com"
                      className="w-full bg-white/70 border border-slate-200 focus:border-[#03377B] focus:ring-1 focus:ring-[#03377B] rounded-xl px-3 py-2 text-xs outline-none transition font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Nghề nghiệp / Lĩnh vực</label>
                    <select
                      value={newEmp.occupation}
                      onChange={(e) => setNewEmp({ ...newEmp, occupation: e.target.value })}
                      className="w-full bg-white/70 border border-slate-200 focus:border-[#03377B] focus:ring-1 focus:ring-[#03377B] rounded-xl px-3 py-2 text-xs outline-none transition font-medium"
                    >
                      <option value="Văn phòng">Văn phòng (Rủi ro thấp)</option>
                      <option value="Xây dựng">Xây dựng/Công trường (Rủi ro thấp - STP)</option>
                      <option value="Lái xe">Lái xe/Vận tải (Rủi ro thấp - STP)</option>
                      <option value="Cơ khí">Cơ khí/Chế tạo (Rủi ro thấp - STP)</option>
                      <option value="Bảo vệ">Bảo vệ/Giám sát (Rủi ro thấp - STP)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Lịch sử bồi thường</label>
                    <select
                      value={newEmp.claimHistory}
                      onChange={(e) => setNewEmp({ ...newEmp, claimHistory: e.target.value as any })}
                      className="w-full bg-white/70 border border-slate-200 focus:border-[#03377B] focus:ring-1 focus:ring-[#03377B] rounded-xl px-3 py-2 text-xs outline-none transition font-medium"
                    >
                      <option value="good">Tốt (Chưa có bồi thường)</option>
                      <option value="normal">Bình thường</option>
                      <option value="bad">Tốt (Happy Case)</option>
                    </select>
                  </div>
                  <div className="flex items-center pt-5 col-span-1">
                    <span className="text-xs text-emerald-600 font-extrabold flex items-center gap-1">
                      <span>✓ Đạt tiêu chuẩn y khoa</span>
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-blue-500/10">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow transition"
                  >
                    Lưu thành viên
                  </button>
                </div>
              </form>
            )}

            {/* List Table */}
            <div className="overflow-hidden border border-blue-500/10 rounded-2xl shadow-sm">
              <table className="w-full text-left border-collapse bg-white/30">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500/5 to-transparent border-b border-blue-500/10">
                    <th className="p-3.5 text-xs font-black text-[#03377B] uppercase tracking-wider">Họ và tên / Ngày sinh</th>
                    <th className="p-3.5 text-xs font-black text-[#03377B] uppercase tracking-wider">CCCD / Email</th>
                    <th className="p-3.5 text-xs font-black text-[#03377B] uppercase tracking-wider">Giới tính</th>
                    <th className="p-3.5 text-xs font-black text-[#03377B] uppercase tracking-wider">Phân hạng / Gói</th>
                    <th className="p-3.5 text-xs font-black text-[#03377B] uppercase tracking-wider text-center">Tình trạng Sức khỏe</th>
                    <th className="p-3.5 text-xs font-black text-[#03377B] uppercase tracking-wider text-center">Thẩm định</th>
                    <th className="p-3.5 text-xs font-black text-[#03377B] uppercase tracking-wider text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-500/5">
                  {employees.map((emp) => {
                    const empTier = tiers.find(t => t.id === emp.tierId);
                    
                    return (
                      <tr key={emp.id} className="hover:bg-blue-500/5 transition duration-200">
                        <td className="p-3.5 text-left">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-800 text-sm flex items-center gap-1">
                              {emp.name}
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium">NS: {emp.dob} · Lĩnh vực: <strong className="text-slate-500 font-semibold">{emp.occupation || 'Văn phòng'}</strong></span>
                          </div>
                        </td>
                        <td className="p-3.5 text-left">
                          <span className="font-mono text-slate-700 block text-xs font-semibold">{emp.cccd}</span>
                          <span className="text-xs text-slate-400">{emp.email || 'N/A'}</span>
                        </td>
                        <td className="p-3.5 text-left text-xs font-bold text-slate-600">{emp.gender}</td>
                        <td className="p-3.5 text-left">
                          <span className="text-xs font-extrabold text-[#03377B] block">{empTier?.name || 'Nhân viên'}</span>
                          <span className="text-[10px] text-[#03377B]/60 font-semibold uppercase block">
                            Hạng {emp.tierId === 'tier-1' ? 'Kim cương' : emp.tierId === 'tier-2' ? 'Vàng' : 'Bạc'}
                          </span>
                        </td>
                        <td className="p-3.5 text-center">
                          <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 text-[10px] font-black px-2.5 py-1 rounded-lg">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Sạch (STP)
                          </span>
                        </td>
                        <td className="p-3.5 text-center text-xs">
                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-black px-2.5 py-1 rounded-lg">
                            ✓ Tự động duyệt
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteEmployee(emp.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition duration-200"
                            title="Xóa thành viên"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
