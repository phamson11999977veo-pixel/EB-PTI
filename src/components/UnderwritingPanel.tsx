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
  const reasons: string[] = [];
  let coefficient = 1.0;
  
  // Calculate age
  let age = 30;
  if (emp.dob) {
    let birthYear = 1995;
    if (emp.dob.includes('-')) {
      birthYear = new Date(emp.dob).getFullYear();
    } else if (emp.dob.includes('/')) {
      const parts = emp.dob.split('/');
      birthYear = parseInt(parts[2]);
    }
    age = new Date().getFullYear() - birthYear;
  }
  
  if (age > 60) {
    reasons.push(`Tuổi ngoài chuẩn (${age} tuổi, hạn mức tối đa 60 tuổi)`);
    coefficient += 0.20; // +20% surcharge
  }
  
  const highRiskOccupations = ['Xây dựng', 'Công trường', 'Lái xe', 'Vận tải', 'Cơ khí', 'Chế tạo', 'Hầm mỏ', 'Dầu khí', 'Lao động tay chân', 'Bảo vệ'];
  if (emp.occupation && highRiskOccupations.some(occ => emp.occupation?.toLowerCase().includes(occ.toLowerCase()))) {
    reasons.push(`Nghề nghiệp rủi ro cao (${emp.occupation})`);
    coefficient += 0.30; // +30% surcharge
  }
  
  if (emp.claimHistory === 'bad') {
    reasons.push('Lịch sử bồi thường rủi ro cao (Nhiều lần / giá trị bồi thường lớn)');
    coefficient += 0.15; // +15% surcharge
  }
  
  if (emp.hasPreExisting || emp.hasHospitalized12m || emp.hasOngoingTreatment) {
    reasons.push('Kê khai có bệnh lý mãn tính / nằm viện / điều trị trong 12 tháng qua');
    coefficient += 0.10; // +10% surcharge
  }
  
  return {
    hasRisk: reasons.length > 0,
    reasons,
    coefficient: parseFloat(coefficient.toFixed(2))
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
        healthStatus: 'Có rủi ro',
        hasPreExisting: true,
        hasHospitalized12m: false,
        hasOngoingTreatment: false,
        treatmentDetails: 'Cao huyết áp nhẹ, uống thuốc kiểm soát hàng ngày',
        underwritingAction: 'none',
        occupation: 'Trưởng phòng - Nhân sự',
        claimHistory: 'normal',
        supplementaryFiles: ['Don_Thuoc_Huyet_Ap.pdf']
      },
      {
        id: 'emp-3',
        name: 'Phạm Minh Đức',
        dob: '28/08/1995',
        cccd: '025095003322',
        gender: 'Nam',
        email: 'duc.pm@abc.com',
        tierId: 'tier-3', // staff
        healthStatus: 'Có rủi ro',
        hasPreExisting: false,
        hasHospitalized12m: false,
        hasOngoingTreatment: false,
        treatmentDetails: '',
        underwritingAction: 'none',
        occupation: 'Kỹ sư - Giám sát Công trường Xây dựng', // high risk occupation
        claimHistory: 'normal',
        supplementaryFiles: ['Chung_Chi_An_Toan_Lao_Dong.pdf']
      },
      {
        id: 'emp-4',
        name: 'Nguyễn Bích Ngọc',
        dob: '17/02/1990',
        cccd: '019190005432',
        gender: 'Nữ',
        email: 'ngoc.nb@abc.com',
        tierId: 'tier-3', // staff
        healthStatus: 'Có rủi ro',
        hasPreExisting: false,
        hasHospitalized12m: true,
        hasOngoingTreatment: true,
        treatmentDetails: 'Nằm viện phẫu thuật ruột thừa tháng 4/2026, hiện đã hồi phục ổn định',
        underwritingAction: 'none',
        occupation: 'Nhân viên hành chính - Văn phòng',
        claimHistory: 'bad', // adverse claim history
        supplementaryFiles: ['Giay_Ra_Vien.pdf', 'Tom_Tat_Benh_An.pdf']
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
        dob: '15/06/1961', // 65 years old (Overage!)
        cccd: '017061002233',
        gender: 'Nam',
        email: 'vung.bv@abc.com',
        tierId: 'tier-3', // staff
        healthStatus: 'Có rủi ro',
        hasPreExisting: false,
        hasHospitalized12m: false,
        hasOngoingTreatment: false,
        treatmentDetails: '',
        underwritingAction: 'none',
        occupation: 'Nhân viên Bảo vệ Cơ sở',
        claimHistory: 'normal',
        supplementaryFiles: ['Giay_Kham_Suc_Khoe_Dinh_Ky.pdf']
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
      
      {/* Client Type Picker */}
      <div className="card border border-slate-100 p-4 bg-slate-50/60 backdrop-blur-md rounded-3xl shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-800">Loại hình khách hàng doanh nghiệp</h4>
            <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">
              Phân hệ thẩm định tự động áp dụng thời gian chờ dựa trên hồ sơ tái tục hoặc khách hàng mới.
            </p>
          </div>
          <div className="flex bg-slate-100/80 border border-slate-200/60 p-1 rounded-2xl shadow-inner self-stretch sm:self-auto gap-0.5 max-w-full overflow-hidden">
            <span className={`px-2.5 sm:px-4 py-2 rounded-xl text-[10px] sm:text-xs font-black text-center flex-1 sm:flex-none cursor-not-allowed transition-all duration-300 select-none ${clientType === 'new' ? 'bg-gradient-to-r from-[#03377B] to-[#0055c8] text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>
              🆕 Khách mới
            </span>
            <span className={`px-2.5 sm:px-4 py-2 rounded-xl text-[10px] sm:text-xs font-black text-center flex-1 sm:flex-none cursor-not-allowed transition-all duration-300 select-none ${clientType === 'renew' ? 'bg-gradient-to-r from-[#03377B] to-[#0055c8] text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>
              ♻️ Tái tục liên tục
            </span>
            <span className={`px-2.5 sm:px-4 py-2 rounded-xl text-[10px] sm:text-xs font-black text-center flex-1 sm:flex-none cursor-not-allowed transition-all duration-300 select-none ${clientType === 'non_continuous' ? 'bg-gradient-to-r from-[#03377B] to-[#0055c8] text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>
              ⏳ Tái tục gián đoạn
            </span>
          </div>
        </div>
      </div>

      {/* Upload and quick tools */}
      {employees.length === 0 && (
        <div className="card text-center py-10 border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/50 rounded-2xl transition">
          <FileSpreadsheet className="text-[#03377B]/40 mx-auto mb-4 animate-bounce" size={48} />
          <h3 className="text-base font-bold text-slate-800">Tải lên danh sách Người được bảo hiểm</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2 leading-relaxed">
            Hệ thống hỗ trợ nhập danh sách hàng loạt từ file Excel (.xlsx / .csv). 
            Vui lòng chuẩn bị file theo mẫu quy chuẩn PTI Care.
          </p>

          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={handleExcelImport}
              className="px-5 py-2 bg-[#03377B] hover:bg-blue-800 text-white text-xs font-bold rounded-lg shadow transition flex items-center gap-1.5"
            >
              <UploadCloud size={14} />
              <span>Tải file Excel danh sách nhân viên</span>
            </button>
            <button
              onClick={handleLoadDemoEmployees}
              className="px-5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200 transition"
            >
              ⚡ Nạp danh sách mẫu nhanh
            </button>
          </div>
        </div>
      )}

      {employees.length > 0 && (
        <div className="space-y-6">
          
          {/* Underwriting Progress Header */}
          <div className="card bg-gradient-to-br from-slate-900 to-[#03377B] text-white shadow-md border-0">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-1">
                  <HeartPulse className="text-rose-400 animate-pulse" size={20} />
                  <span className="text-xs uppercase font-bold tracking-wider text-blue-200">Báo cáo Thẩm định Sức khỏe Nhóm</span>
                </div>
                <h3 className="text-lg font-bold text-white">Thống kê trạng thái Hồ sơ Sức khỏe</h3>
                <p className="text-[11px] text-blue-100/70 mt-1 leading-relaxed">
                  Nhóm &lt;50 người yêu cầu thẩm định kê khai. Nhóm &ge;50 người miễn thời gian chờ cho các bệnh có sẵn thông thường.
                </p>
              </div>

              {/* Progress ring/bar info */}
              <div className="space-y-1 md:col-span-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-blue-200">Hoàn thành sạch / Đã xử lý</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                </div>
                <span className="text-[10px] text-white/50 block">Mục tiêu: Đạt 100% để tiếp tục cấp hợp đồng</span>
              </div>

              {/* Counters */}
              <div className="flex gap-4 justify-around text-center md:col-span-1 bg-white/5 p-3 rounded-xl border border-white/10">
                <div>
                  <span className="block text-xl font-extrabold text-white">{totalInsured}</span>
                  <span className="text-[10px] text-white/60">Thành viên</span>
                </div>
                <div className="border-l border-white/10"></div>
                <div>
                  <span className="block text-xl font-extrabold text-amber-400">{exceptionCount}</span>
                  <span className="text-[10px] text-white/60">Có rủi ro</span>
                </div>
                <div className="border-l border-white/10"></div>
                <div>
                  <span className="block text-xl font-extrabold text-emerald-400">{resolvedCount} / {exceptionCount}</span>
                  <span className="text-[10px] text-white/60">Đã giải quyết</span>
                </div>
              </div>
            </div>
          </div>

          {/* Underwriting Exceptions Section */}
          {exceptionCount > 0 && (
            <div className="card border border-amber-200 bg-amber-50/10">
              <div className="card-title text-amber-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="text-amber-600 animate-bounce" size={18} />
                  <span>Ngoại lệ Sức khỏe Cần xử lý ({resolvedCount}/{exceptionCount})</span>
                </div>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">Thẩm định nghiệp vụ</span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Hệ thống tự động phân loại rủi ro (Adverse Selection) dựa trên Tuổi ngoài chuẩn, Nghề nghiệp rủi ro cao, Lịch sử bồi thường và Kê khai bệnh lý. Hãy đưa ra quyết định thẩm định phù hợp.
              </p>

              <div className="space-y-4">
                {employees.filter(e => getEmpRiskDetails(e).hasRisk).map(emp => {
                  const empTier = tiers.find(t => t.id === emp.tierId);
                  const riskDetails = getEmpRiskDetails(emp);
                  return (
                    <div key={emp.id} className="p-4 rounded-xl border border-amber-200 bg-white shadow-xs space-y-3 text-left">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="font-bold text-slate-800 text-sm">{emp.name}</span>
                            <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded">
                              {empTier?.name || 'Nhân viên'}
                            </span>
                            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded border border-amber-200 flex items-center gap-0.5">
                              ⚠️ Phát hiện Rủi ro ({riskDetails.reasons.length})
                            </span>
                            <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded border border-rose-200">
                              Hệ số phụ phí: {riskDetails.coefficient}x (+{Math.round((riskDetails.coefficient - 1) * 100)}%)
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1">
                            Ngày sinh: {emp.dob} · CCCD: {emp.cccd} · Nghề nghiệp: <strong className="text-slate-600">{emp.occupation || 'Chưa cập nhật'}</strong> · Lịch sử bồi thường: <strong className="text-slate-600">{emp.claimHistory === 'good' ? 'Tốt (Chưa có bồi thường)' : emp.claimHistory === 'normal' ? 'Bình thường' : 'Xấu (Nhiều lần/Giá trị lớn)'}</strong>
                          </p>
                        </div>
                        
                        {/* Selected Underwriting State */}
                        <div className="text-xs font-semibold self-start sm:self-center">
                          {emp.underwritingAction === 'none' && (
                            <span className="text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">Đang chờ xử lý</span>
                          )}
                          {emp.underwritingAction === 'approve' && (
                            <span className="text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">Đã duyệt bảo hiểm gốc</span>
                          )}
                          {emp.underwritingAction === 'exclude' && (
                            <span className="text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">Loại trừ bệnh gốc</span>
                          )}
                          {emp.underwritingAction === 'request_files' && (
                            <span className="text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">Yêu cầu &amp; Đã upload Bệnh án</span>
                          )}
                          {emp.underwritingAction === 'decline' && (
                            <span className="text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">Từ chối bảo hiểm</span>
                          )}
                        </div>
                      </div>

                      {/* Risk analysis & health declarations details */}
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-2">
                        <div>
                          <div className="font-bold text-slate-800 mb-1">Các yếu tố rủi ro phân tích tự động:</div>
                          <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-600">
                            {riskDetails.reasons.map((r, i) => (
                              <li key={i}>{r}</li>
                            ))}
                          </ul>
                        </div>

                        {emp.treatmentDetails && (
                          <div className="border-t border-slate-200 pt-1.5">
                            <div className="font-bold text-rose-800 mb-0.5">Kê khai sức khỏe tự nguyện:</div>
                            <p className="text-[11px] italic text-slate-600">{emp.treatmentDetails}</p>
                          </div>
                        )}

                        {/* Supplementary files */}
                        <div className="border-t border-slate-200 pt-1.5 flex flex-wrap items-center gap-2">
                          <span className="font-bold text-slate-800 text-[11px]">Giấy tờ, hồ sơ y khoa bổ sung:</span>
                          {emp.supplementaryFiles && emp.supplementaryFiles.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {emp.supplementaryFiles.map((file, idx) => (
                                <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded text-[10px] font-bold">
                                  📄 {file}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-[10px] text-slate-400 italic">Chưa đính kèm tài liệu bổ sung</span>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              const fileName = prompt('Nhập tên file tài liệu đính kèm (VD: Tom_Tat_Benh_An.pdf):', 'Ho_So_Suc_Khoe_Bo_Sung.pdf');
                              if (fileName) {
                                onChangeEmployees(employees.map(x => x.id === emp.id ? {
                                  ...x,
                                  supplementaryFiles: [...(x.supplementaryFiles || []), fileName]
                                } : x));
                              }
                            }}
                            className="text-[10px] text-[#03377B] hover:underline font-bold ml-auto flex items-center gap-0.5"
                          >
                            <UploadCloud size={10} />
                            <span>Tải bổ sung giấy tờ</span>
                          </button>
                        </div>
                      </div>

                      {/* Custom exclusion clause input for 'exclude' action */}
                      {emp.underwritingAction === 'exclude' && (
                        <div className="mt-2 text-xs space-y-1 bg-blue-50/40 p-2.5 rounded-lg border border-blue-100/50">
                          <label className="font-bold text-blue-800 block">Điều khoản loại trừ cụ thể (In trên Giấy chứng nhận):</label>
                          <input
                            type="text"
                            value={emp.customExclusionClause || ''}
                            onChange={(e) => {
                              onChangeEmployees(employees.map(x => x.id === emp.id ? { ...x, customExclusionClause: e.target.value } : x));
                            }}
                            placeholder="VD: Loại trừ toàn bộ các biến chứng y khoa liên quan đến bệnh Cao huyết áp mãn tính"
                            className="w-full bg-white border border-blue-200 focus:border-blue-500 rounded px-2.5 py-1.5 outline-none font-medium text-xs"
                          />
                        </div>
                      )}

                      {/* Underwriting decision buttons */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                        <span className="text-[11px] text-slate-400 font-bold uppercase mr-1 self-center">Quyết định thẩm định:</span>
                        <button
                          type="button"
                          onClick={() => handleResolveException(emp.id, 'approve')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${emp.underwritingAction === 'approve' ? 'bg-emerald-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                        >
                          <UserCheck size={12} />
                          <span>Duyệt toàn bộ</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleResolveException(emp.id, 'exclude');
                            // Set default exclusion clause if empty
                            if (!emp.customExclusionClause) {
                              const clause = emp.treatmentDetails ? `Loại trừ bệnh có sẵn: ${emp.treatmentDetails}` : 'Loại trừ các rủi ro phát hiện trong hồ sơ bệnh án cũ';
                              onChangeEmployees(employees.map(x => x.id === emp.id ? { ...x, underwritingAction: 'exclude', customExclusionClause: clause } : x));
                            }
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${emp.underwritingAction === 'exclude' ? 'bg-blue-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                        >
                          <span>Áp dụng Loại trừ</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleResolveException(emp.id, 'request_files')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${emp.underwritingAction === 'request_files' ? 'bg-purple-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                        >
                          <UploadCloud size={12} />
                          <span>Yêu cầu Bệnh án</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleResolveException(emp.id, 'decline')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${emp.underwritingAction === 'decline' ? 'bg-rose-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                        >
                          <UserMinus size={12} />
                          <span>Từ chối BH</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Insured List and Add form */}
          <div className="card border border-slate-100">
            <div className="card-title justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="text-emerald-600" size={18} />
                <span>Danh sách Thành viên được Bảo hiểm ({totalInsured})</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="px-3.5 py-1.5 bg-[#03377B] hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition flex items-center gap-1"
                >
                  <Plus size={12} />
                  <span>Thêm nhân viên lẻ</span>
                </button>
                <button
                  type="button"
                  onClick={handleLoadDemoEmployees}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
                >
                  Tải lại mẫu
                </button>
              </div>
            </div>

            {/* Quick manual add inline form */}
            {showAddForm && (
              <form onSubmit={handleAddEmployeeSubmit} className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Họ và tên *</label>
                    <input 
                      type="text" 
                      required
                      value={newEmp.name}
                      onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                      placeholder="VD: Nguyễn Văn Nam"
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Số CCCD *</label>
                    <input 
                      type="text" 
                      required
                      value={newEmp.cccd}
                      onChange={(e) => setNewEmp({ ...newEmp, cccd: e.target.value })}
                      placeholder="Mã định danh 12 số"
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Cấp bậc / Tier</label>
                    <select
                      value={newEmp.tierId}
                      onChange={(e) => setNewEmp({ ...newEmp, tierId: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none"
                    >
                      {tiers.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Ngày sinh</label>
                    <input 
                      type="date" 
                      value={newEmp.dob}
                      onChange={(e) => setNewEmp({ ...newEmp, dob: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Giới tính</label>
                    <select
                      value={newEmp.gender}
                      onChange={(e) => setNewEmp({ ...newEmp, gender: e.target.value as 'Nam' | 'Nữ' })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none"
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Email liên hệ</label>
                    <input 
                      type="email" 
                      value={newEmp.email}
                      onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })}
                      placeholder="VD: nam.nv@abc.com"
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Nghề nghiệp / Lĩnh vực</label>
                    <select
                      value={newEmp.occupation}
                      onChange={(e) => setNewEmp({ ...newEmp, occupation: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none"
                    >
                      <option value="Văn phòng">Văn phòng (Rủi ro thấp)</option>
                      <option value="Xây dựng">Xây dựng/Công trường (Rủi ro cao)</option>
                      <option value="Lái xe">Lái xe/Vận tải (Rủi ro cao)</option>
                      <option value="Cơ khí">Cơ khí/Chế tạo (Rủi ro cao)</option>
                      <option value="Bảo vệ">Bảo vệ/Giám sát (Rủi ro cao)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Lịch sử bồi thường</label>
                    <select
                      value={newEmp.claimHistory}
                      onChange={(e) => setNewEmp({ ...newEmp, claimHistory: e.target.value as any })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none"
                    >
                      <option value="good">Tốt (Chưa bồi thường)</option>
                      <option value="normal">Bình thường</option>
                      <option value="bad">Xấu (Nhiều lần/Giá trị lớn)</option>
                    </select>
                  </div>
                  <div className="flex items-center pt-5 col-span-1">
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-700">
                      <input 
                        type="checkbox" 
                        checked={newEmp.hasSupplementaryFile}
                        onChange={(e) => setNewEmp({ ...newEmp, hasSupplementaryFile: e.target.checked })}
                        className="rounded text-[#03377B] focus:ring-[#03377B]"
                      />
                      <span className="font-bold text-[#03377B]">Đính kèm Hồ sơ y khoa lẻ</span>
                    </label>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-[11px] font-bold text-slate-500 block mb-2">KHAI BÁO SỨC KHỎE CỦA NHÂN VIÊN</span>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-700">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={newEmp.hasPreExisting}
                        onChange={(e) => setNewEmp({ ...newEmp, hasPreExisting: e.target.checked })}
                        className="rounded"
                      />
                      <span>Bệnh có sẵn / Mãn tính</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={newEmp.hasHospitalized12m}
                        onChange={(e) => setNewEmp({ ...newEmp, hasHospitalized12m: e.target.checked })}
                        className="rounded"
                      />
                      <span>Nằm viện 12 tháng qua</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={newEmp.hasOngoingTreatment}
                        onChange={(e) => setNewEmp({ ...newEmp, hasOngoingTreatment: e.target.checked })}
                        className="rounded"
                      />
                      <span>Đang điều trị đặc trị</span>
                    </label>
                  </div>

                  {(newEmp.hasPreExisting || newEmp.hasHospitalized12m || newEmp.hasOngoingTreatment) && (
                    <div className="mt-2">
                      <label className="text-[10px] font-bold text-rose-700 block mb-1">Chi tiết tình trạng bệnh lý *</label>
                      <textarea 
                        required
                        value={newEmp.treatmentDetails}
                        onChange={(e) => setNewEmp({ ...newEmp, treatmentDetails: e.target.value })}
                        placeholder="Hãy ghi cụ thể tên bệnh, thời điểm chẩn đoán, loại thuốc đang điều trị..."
                        rows={2}
                        className="w-full bg-white border border-rose-200 focus:border-rose-400 rounded-lg px-3 py-1.5 text-xs outline-none"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-semibold"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow"
                  >
                    Lưu thành viên
                  </button>
                </div>
              </form>
            )}

            {/* List Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Họ và tên / Ngày sinh</th>
                    <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider">CCCD / Email</th>
                    <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Giới tính</th>
                    <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Phân hạng / Gói</th>
                    <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Tình trạng Sức khỏe</th>
                    <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Thẩm định</th>
                    <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {employees.map((emp) => {
                    const empTier = tiers.find(t => t.id === emp.tierId);
                    const riskDetails = getEmpRiskDetails(emp);
                    const hasException = riskDetails.hasRisk;
                    
                    return (
                      <tr key={emp.id} className="hover:bg-slate-50/50 transition">
                        <td className="p-3">
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-800 text-sm flex items-center gap-1">
                              {emp.name}
                            </span>
                            <span className="text-[11px] text-slate-400">NS: {emp.dob} · Nghề nghiệp: <strong className="text-slate-600">{emp.occupation || 'Văn phòng'}</strong></span>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="font-mono text-slate-700 block text-xs">{emp.cccd}</span>
                          <span className="text-xs text-slate-400">{emp.email || 'N/A'}</span>
                        </td>
                        <td className="p-3 text-xs text-slate-600">{emp.gender}</td>
                        <td className="p-3">
                          <span className="text-xs font-semibold text-slate-700 block">{empTier?.name || 'Nhân viên'}</span>
                          <span className="text-[10px] text-[#03377B] font-bold uppercase block">
                            Phí tiêu chuẩn {emp.tierId === 'tier-1' ? 'Hạng Kim cương' : emp.tierId === 'tier-2' ? 'Hạng Vàng' : 'Hạng Bạc'}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex flex-col items-center justify-center gap-1">
                            {hasException ? (
                              <>
                                <span className="inline-flex items-center gap-0.5 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                                  Có rủi ro ({riskDetails.coefficient}x)
                                </span>
                                <div className="text-[9px] text-slate-400 text-center max-w-[150px] leading-tight">
                                  {riskDetails.reasons.map((r, i) => (
                                    <div key={i} className="truncate" title={r}>• {r}</div>
                                  ))}
                                </div>
                              </>
                            ) : (
                              <span className="inline-flex items-center gap-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded">
                                Sạch (STP)
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-center text-xs">
                          {hasException ? (
                            <div className="space-y-1">
                              {emp.underwritingAction === 'none' && (
                                <span className="text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">Chờ duyệt</span>
                              )}
                              {emp.underwritingAction === 'approve' && (
                                <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Duyệt gốc</span>
                              )}
                              {emp.underwritingAction === 'exclude' && (
                                <div className="flex flex-col items-center gap-0.5">
                                  <span className="text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">Loại trừ</span>
                                  {emp.customExclusionClause && (
                                    <span className="text-[9px] text-blue-500 italic max-w-[140px] truncate" title={emp.customExclusionClause}>
                                      "{emp.customExclusionClause}"
                                    </span>
                                  )}
                                </div>
                              )}
                              {emp.underwritingAction === 'request_files' && (
                                <span className="text-purple-600 font-bold bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">Yêu cầu hồ sơ</span>
                              )}
                              {emp.underwritingAction === 'decline' && (
                                <span className="text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">Từ chối</span>
                              )}
                            </div>
                          ) : (
                            <span className="text-slate-400 font-medium">Tự động duyệt</span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteEmployee(emp.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
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
