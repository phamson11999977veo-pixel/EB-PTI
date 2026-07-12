import React, { useState, useEffect } from 'react';
import { OpenIdBanner3D } from './ThreeDGraphics';
import { 
  Users, 
  Building, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Printer, 
  ArrowRight, 
  Search, 
  Plus, 
  Trash2, 
  Loader2, 
  Camera, 
  Smartphone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Download, 
  Send, 
  UserPlus, 
  X, 
  AlertTriangle,
  RefreshCw,
  Phone,
  User,
  MapPinIcon
} from 'lucide-react';

interface MockSubject {
  id: string;
  name: string;
  type: 'personal' | 'corporate';
  identityNumber: string; // CCCD/CMND or MST
  phone: string;
  email: string;
  address: string;
  status: 'active' | 'inactive';
  representative?: string;
  birthDate?: string;
}

const MOCK_EXISTING_SUBJECTS: MockSubject[] = [
  {
    id: 'PTI-IND-2024-00123',
    name: 'Nguyễn Văn A',
    type: 'personal',
    identityNumber: '001095001234',
    phone: '0987654321',
    email: 'nguyenvana@gmail.com',
    address: '123 Đường Láng, Đống Đa, Hà Nội',
    status: 'active',
    birthDate: '1995-05-12'
  },
  {
    id: 'PTI-ORG-2023-00456',
    name: 'Công ty TNHH Công nghệ & Phần mềm ABC',
    type: 'corporate',
    identityNumber: '0102030405',
    phone: '0243123456',
    email: 'contact@abcsoftware.vn',
    address: 'Tòa nhà Landmark 72, Cầu Giấy, Hà Nội',
    status: 'active',
    representative: 'Nguyễn Đình ABC'
  },
  {
    id: 'PTI-IND-2022-00789',
    name: 'Trần Thị B',
    type: 'personal',
    identityNumber: '001096005678',
    phone: '0912345678',
    email: 'tranthib@hotmail.com',
    address: '456 Lê Lợi, Quận 1, TP. Hồ Chí Minh',
    status: 'inactive', // Stopped working / Dừng hoạt động
    birthDate: '1996-08-25'
  },
  {
    id: 'PTI-IND-2025-00234',
    name: 'Nguyễn Văn C',
    type: 'personal',
    identityNumber: '002097009012',
    phone: '0909090909',
    email: 'nguyenvanc@yahoo.com',
    address: '789 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
    status: 'active',
    birthDate: '1997-12-01'
  }
];

interface QueueItem {
  queueId: string;
  subjectName: string;
  type: 'personal' | 'corporate';
  channel: string;
  status: 'pending' | 'processing' | 'completed';
  requestDate: string;
  identityNum?: string;
}

interface Relationship {
  relatedId: string;
  relatedName: string;
  relatedIdentity: string;
  type: string;
  effectiveDate: string;
}

export default function OpenIdFlow() {
  // Navigation & Step states
  // 1: Input Info (Channel & Subject Type), 2: Input Info / Check, 3: Loading System Check, 
  // 4: Create ID Result, 5: Assign Relationship, 6: Complete
  const [currentSubStep, setCurrentSubStep] = useState<number>(1);
  
  // Input Data States
  const [channel, setChannel] = useState<string>('app_web');
  const [subjectType, setSubjectType] = useState<'personal' | 'corporate'>('corporate');
  
  // Personal Form Fields
  const [pName, setPName] = useState('');
  const [pBirthDate, setPBirthDate] = useState('');
  const [pIdentity, setPIdentity] = useState('');
  const [pPhone, setPPhone] = useState('');
  const [pEmail, setPEmail] = useState('');
  const [pAddress, setPAddress] = useState('');
  const [ocrScanning, setOcrScanning] = useState(false);
  const [ocrSuccess, setOcrSuccess] = useState(false);

  // Corporate Form Fields
  const [cName, setCName] = useState('');
  const [cTaxCode, setCTaxCode] = useState('');
  const [cPhone, setCPhone] = useState('');
  const [cRepresentative, setCRepresentative] = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cAddress, setCAddress] = useState('');

  // Validation States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loadingCheckMessage, setLoadingCheckMessage] = useState('');
  
  // Result States
  const [resultId, setResultId] = useState('');
  const [resultStatus, setResultStatus] = useState<'4a' | '4b' | '4c'>('4a'); 
  const [finalSubjectData, setFinalSubjectData] = useState<Partial<MockSubject>>({});

  // Appraisal Popup States
  const [showAppraisalPopup, setShowAppraisalPopup] = useState(false);
  const [appraisalProgress, setAppraisalProgress] = useState(0);
  const [appraisalCompleted, setAppraisalCompleted] = useState(false);

  // Relationship States
  const [searchRelQuery, setSearchRelQuery] = useState('');
  const [foundRelSubjects, setFoundRelSubjects] = useState<MockSubject[]>([]);
  const [selectedRelSubject, setSelectedRelSubject] = useState<MockSubject | null>(null);
  const [relType, setRelType] = useState('');
  const [relEffectiveDate, setRelEffectiveDate] = useState(new Date().toISOString().split('T')[0]);
  const [assignedRelationships, setAssignedRelationships] = useState<Relationship[]>([]);
  const [relErrors, setRelErrors] = useState<string>('');

  // Manual input states for custom relative
  const [isManualRel, setIsManualRel] = useState(false);
  const [manualRelName, setManualRelName] = useState('');
  const [manualRelIdentity, setManualRelIdentity] = useState('');
  const [manualRelType, setManualRelType] = useState<'personal' | 'corporate'>('personal');

  // Queue List States
  const [queueItems, setQueueItems] = useState<QueueItem[]>([
    { queueId: 'Q-9812', subjectName: 'Trần Đại Nghĩa', type: 'personal', channel: 'Tại quầy giao dịch', status: 'pending', requestDate: '2026-07-08 22:15' },
    { queueId: 'Q-9811', subjectName: 'Công ty Cổ phần Vận tải biển Đông', type: 'corporate', channel: 'Cổng thông tin tự động', status: 'pending', requestDate: '2026-07-08 22:00', identityNum: '0109887766' },
    { queueId: 'Q-9810', subjectName: 'Nguyễn Văn A', type: 'personal', channel: 'Tổng đài / Hotline', status: 'completed', requestDate: '2026-07-08 21:30', identityNum: '001095001234' },
    { queueId: 'Q-9809', subjectName: 'Lê Hoàng Minh', type: 'personal', channel: 'Cổng thông tin tự động', status: 'processing', requestDate: '2026-07-08 21:05' }
  ]);

  // Handle selection from Queue
  const handleProcessQueueItem = (item: QueueItem) => {
    setChannel(item.channel === 'Cổng thông tin tự động' ? 'app_web' : item.channel === 'Tổng đài / Hotline' ? 'hotline' : 'counter');
    setSubjectType(item.type);
    
    if (item.type === 'personal') {
      setPName(item.subjectName);
      setPIdentity(item.identityNum || '');
      setPBirthDate('');
      setPPhone('');
      setPEmail('');
      setPAddress('');
    } else {
      setCName(item.subjectName);
      setCTaxCode(item.identityNum || '');
      setCPhone('');
      setCRepresentative('');
      setCEmail('');
      setCAddress('');
    }
    
    // Move to step 1
    setCurrentSubStep(1);
    
    // Update queue item status to processing
    setQueueItems(prev => prev.map(q => q.queueId === item.queueId ? { ...q, status: 'processing' } : q));
  };

  // Run Simulated OCR scanner
  const runSimulatedOcr = () => {
    setOcrScanning(true);
    setOcrSuccess(false);
    setTimeout(() => {
      setOcrScanning(false);
      setOcrSuccess(true);
      // Auto-populate some data extracted by OCR
      setPName('NGUYỄN VĂN TIẾN');
      setPBirthDate('1992-10-15');
      setPIdentity('037092004567');
      setPAddress('Số 8 Tôn Thất Thuyết, Mỹ Đình 2, Nam Từ Liêm, Hà Nội');
    }, 2000);
  };

  // Validate the inputs based on current subject type
  const validateInputs = () => {
    const errs: Record<string, string> = {};
    if (subjectType === 'personal') {
      if (!pName.trim()) errs.pName = 'Họ tên không được để trống';
      if (!pBirthDate) errs.pBirthDate = 'Ngày sinh không được để trống';
      if (!pIdentity.trim()) {
        errs.pIdentity = 'CCCD/CMND/Hộ chiếu không được để trống';
      } else if (!/^\d{9,12}$/.test(pIdentity.trim())) {
        errs.pIdentity = 'Số giấy tờ phải là chữ số dài từ 9 đến 12 ký tự';
      }
      if (!pPhone.trim()) {
        errs.pPhone = 'Số điện thoại không được để trống';
      } else if (!/^(0[3|5|7|8|9])([0-9]{8})$/.test(pPhone.trim())) {
        errs.pPhone = 'Số điện thoại sai định dạng viễn thông Việt Nam';
      }
      // If email present, validate it
      if (pEmail.trim() && !/\S+@\S+\.\S+/.test(pEmail)) {
        errs.pEmail = 'Email sai định dạng (ví dụ: name@domain.com)';
      }
    } else {
      if (!cName.trim()) errs.cName = 'Tên tổ chức không được để trống';
      if (!cTaxCode.trim()) {
        errs.cTaxCode = 'Mã số thuế/ĐKKD không được để trống';
      } else if (!/^\d{10}(-\d{3})?$/.test(cTaxCode.trim())) {
        errs.cTaxCode = 'Mã số thuế phải gồm 10 chữ số hoặc kèm đuôi chi nhánh (13 số)';
      }
      if (!cPhone.trim()) {
        errs.cPhone = 'Số điện thoại không được để trống';
      } else if (!/^(0[2|3|5|7|8|9])([0-9]{7,10})$/.test(cPhone.trim())) {
        errs.cPhone = 'Số điện thoại doanh nghiệp không hợp lệ';
      }
      if (cEmail.trim() && !/\S+@\S+\.\S+/.test(cEmail)) {
        errs.cEmail = 'Email tổ chức sai định dạng';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Trigger System Appraisal (Popup)
  const handleStartAppraisal = () => {
    if (!validateInputs()) {
      return;
    }
    
    setShowAppraisalPopup(true);
    setAppraisalProgress(0);
    setAppraisalCompleted(false);

    // Simulated progress transitions
    setTimeout(() => {
      setAppraisalProgress(1);
    }, 700);

    setTimeout(() => {
      setAppraisalProgress(2);
    }, 1400);

    setTimeout(() => {
      setAppraisalProgress(3);
      setAppraisalCompleted(true);
      
      const idToCheck = subjectType === 'personal' ? pIdentity.trim() : cTaxCode.trim();
      const match = MOCK_EXISTING_SUBJECTS.find(s => s.identityNumber === idToCheck);
      
      if (match) {
        // Use a clean 5-digit version of the matched ID or generate one
        const shortMatchId = match.id.includes('-') 
          ? match.id.split('-').pop()?.slice(0, 5) || '10482'
          : match.id.slice(0, 5);
        
        setFinalSubjectData({
          ...match,
          id: shortMatchId
        });
        setResultId(shortMatchId);
        if (match.status === 'active') {
          setResultStatus('4b');
        } else {
          setResultStatus('4c');
        }
      } else {
        // Create a 5-digit random short code
        const shortId = `${Math.floor(10000 + Math.random() * 90000)}`;
        const newData: Partial<MockSubject> = {
          id: shortId,
          name: subjectType === 'personal' ? pName : cName,
          type: subjectType,
          identityNumber: idToCheck,
          phone: subjectType === 'personal' ? pPhone : cPhone,
          email: subjectType === 'personal' ? pEmail : cEmail,
          address: subjectType === 'personal' ? pAddress : cAddress,
          status: 'active',
          birthDate: subjectType === 'personal' ? pBirthDate : undefined,
          representative: subjectType === 'corporate' ? cRepresentative : undefined
        };
        
        setFinalSubjectData(newData);
        setResultId(shortId);
        setResultStatus('4a');
      }
    }, 2100);
  };

  // Search for relatives
  const handleSearchRelSubject = () => {
    setRelErrors('');
    if (!searchRelQuery.trim()) {
      setFoundRelSubjects([]);
      return;
    }
    
    // Search in MOCK_EXISTING_SUBJECTS
    const results = MOCK_EXISTING_SUBJECTS.filter(s => 
      s.id !== resultId && ( // Can't relate to itself
        s.identityNumber.includes(searchRelQuery) || 
        s.id.toLowerCase().includes(searchRelQuery.toLowerCase()) ||
        s.name.toLowerCase().includes(searchRelQuery.toLowerCase())
      )
    );
    
    setFoundRelSubjects(results);
    if (results.length === 0) {
      setRelErrors('Không tìm thấy chủ thể trùng khớp. Vui lòng nhập đúng CCCD/MST hoặc mã ID.');
    }
  };

  // Add Relationship
  const handleAddRelationship = () => {
    setRelErrors('');
    if (!selectedRelSubject) {
      setRelErrors('Vui lòng chọn một đối tượng liên quan để gán.');
      return;
    }
    if (!relType) {
      setRelErrors('Vui lòng chọn mối quan hệ.');
      return;
    }
    
    // Check if relationship already exists in the local list
    const exists = assignedRelationships.some(r => r.relatedId === selectedRelSubject.id);
    if (exists) {
      setRelErrors('Mối quan hệ này đã được thêm vào danh sách gán.');
      return;
    }

    const newRel: Relationship = {
      relatedId: selectedRelSubject.id,
      relatedName: selectedRelSubject.name,
      relatedIdentity: selectedRelSubject.identityNumber,
      type: relType,
      effectiveDate: relEffectiveDate
    };

    setAssignedRelationships([...assignedRelationships, newRel]);
    
    // Clear selection
    setSelectedRelSubject(null);
    setSearchRelQuery('');
    setFoundRelSubjects([]);
    setRelType('');
  };

  // Add Custom Manual Relationship
  const handleConfirmManualRelationship = () => {
    setRelErrors('');
    if (!manualRelName.trim()) {
      setRelErrors('Vui lòng nhập họ tên / tên tổ chức mới.');
      return;
    }
    if (!manualRelIdentity.trim()) {
      setRelErrors('Vui lòng nhập số CCCD / MST mới.');
      return;
    }
    if (!relType) {
      setRelErrors('Vui lòng chọn mối quan hệ pháp lý.');
      return;
    }

    const tempId = `TEMP-${manualRelType === 'personal' ? 'IND' : 'ORG'}-${Math.floor(10000 + Math.random() * 90000)}`;
    const exists = assignedRelationships.some(r => r.relatedIdentity === manualRelIdentity.trim());
    if (exists) {
      setRelErrors('Mối quan hệ với giấy tờ/MST này đã tồn tại trong danh sách.');
      return;
    }

    const newRel: Relationship = {
      relatedId: tempId,
      relatedName: manualRelName.trim(),
      relatedIdentity: manualRelIdentity.trim(),
      type: relType,
      effectiveDate: relEffectiveDate
    };

    setAssignedRelationships([...assignedRelationships, newRel]);
    
    // Clear manual inputs
    setManualRelName('');
    setManualRelIdentity('');
    setRelType('');
    setIsManualRel(false);
  };

  // Skip step 5
  const handleSkipRelationships = () => {
    setCurrentSubStep(6);
  };

  // Reset the wizard for a new request
  const handleResetFlow = () => {
    setCurrentSubStep(1);
    setChannel('app_web');
    setSubjectType('personal');
    setPName('');
    setPBirthDate('');
    setPIdentity('');
    setPPhone('');
    setPEmail('');
    setPAddress('');
    setOcrSuccess(false);
    
    setCName('');
    setCTaxCode('');
    setCPhone('');
    setCRepresentative('');
    setCEmail('');
    setCAddress('');
    
    setErrors({});
    setAssignedRelationships([]);
    setSelectedRelSubject(null);
    setSearchRelQuery('');
    setFoundRelSubjects([]);

    // Reset manual relationship inputs
    setIsManualRel(false);
    setManualRelName('');
    setManualRelIdentity('');
    setManualRelType('personal');
  };

  // Helper to get relationship options based on subject types
  const getRelationshipOptions = () => {
    if (!selectedRelSubject) return [];
    
    const s1 = subjectType; // 'personal' or 'corporate'
    const s2 = selectedRelSubject.type; // 'personal' or 'corporate'
    
    if (s1 === 'personal' && s2 === 'personal') {
      return [
        { value: 'Bố/Mẹ', label: 'Bố/Mẹ của chủ thể' },
        { value: 'Con cái', label: 'Con ruột/Con nuôi' },
        { value: 'Vợ/Chồng', label: 'Vợ/Chồng hợp pháp' },
        { value: 'Người phụ thuộc', label: 'Người phụ thuộc khác' },
        { value: 'Ủy quyền pháp lý', label: 'Người được ủy quyền' }
      ];
    } else if (s1 === 'personal' && s2 === 'corporate') {
      return [
        { value: 'Nhân viên', label: 'Chủ thể là Nhân viên của tổ chức này' },
        { value: 'Đại diện Pháp luật', label: 'Chủ thể là Người đại diện pháp luật' },
        { value: 'Cổ đông sáng lập', label: 'Chủ thể sở hữu cổ phần' }
      ];
    } else if (s1 === 'corporate' && s2 === 'personal') {
      return [
        { value: 'Nhân viên', label: 'Tổ chức này là Chủ quản/Sử dụng lao động' },
        { value: 'Người thụ hưởng', label: 'Đối tượng được thụ hưởng bảo hiểm doanh nghiệp' }
      ];
    } else {
      // corporate - corporate
      return [
        { value: 'Công ty mẹ/con', label: 'Quan hệ Công ty Mẹ - Công ty Con' },
        { value: 'Đối tác chiến lược', label: 'Đối tác ký kết hợp đồng đại lý/hợp tác' },
        { value: 'Đơn vị liên kết', label: 'Đơn vị thành viên liên kết kinh doanh' }
      ];
    }
  };

  return (
    <div className="w-full space-y-6 text-slate-800 animate-fade-in pb-12">
      



      {/* ── STEP 1: INFORMATION FORM & CUSTOMER ID ISSUANCE ── */}
      {currentSubStep === 1 && (
        <div className="w-full space-y-6 animate-fade-in text-left">
          {/* Main Full-Width Container */}
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
              <div>
                <h3 className="text-lg font-black text-slate-800 tracking-tight">Thông tin chủ thể định danh</h3>
                <p className="text-slate-400 text-xs mt-1">
                  Chọn loại chủ thể và cập nhật thông tin chuẩn xác để thẩm định tự động và khởi tạo mã ID duy nhất.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPName(''); setPBirthDate(''); setPIdentity(''); setPPhone(''); setPEmail(''); setPAddress(''); setOcrSuccess(false);
                  setCName(''); setCTaxCode(''); setCPhone(''); setCRepresentative(''); setCEmail(''); setCAddress('');
                  setErrors({});
                }}
                className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-700 font-bold text-xs rounded-xl border border-slate-200/60 transition-all self-start md:self-center"
              >
                Xóa nhanh các trường
              </button>
            </div>

            {/* Smart Dual-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Type selection and dynamic helper panels */}
              <div className="lg:col-span-4 space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-[#03377B] uppercase tracking-widest block">Phân loại chủ thể định danh</label>
                  <div className="p-3 bg-gradient-to-br from-white/70 via-slate-50/50 to-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/80 shadow-xl shadow-blue-900/5 space-y-3 relative overflow-hidden">
                    {/* Apple iOS Glass-inspired ambient glows */}
                    <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-sky-300/10 rounded-full blur-2xl pointer-events-none" />
                    
                    <button
                      type="button"
                      onClick={() => {
                        setSubjectType('corporate');
                        setErrors({});
                      }}
                      className={`w-full p-4 rounded-[1.8rem] flex items-center gap-4 transition-all duration-300 relative z-10 ${
                        subjectType === 'corporate'
                          ? 'bg-gradient-to-r from-white to-blue-50/90 border border-blue-500/30 shadow-lg shadow-blue-900/10 -translate-y-0.5'
                          : 'bg-white/30 hover:bg-white/60 border border-white/40 hover:shadow-xs'
                      }`}
                    >
                      <div className={`p-3 rounded-2xl transition-all duration-300 ${
                        subjectType === 'corporate' 
                          ? 'bg-gradient-to-br from-[#03377B] to-blue-800 text-white shadow-md shadow-blue-900/20 scale-105' 
                          : 'bg-white/80 text-slate-400 border border-slate-100'
                      }`}>
                        <Building size={20} className="stroke-[2.2]" />
                      </div>
                      <div className="text-left">
                        <span className={`text-xs font-extrabold block transition-colors duration-300 ${subjectType === 'corporate' ? 'text-[#03377B]' : 'text-slate-700'}`}>
                          Doanh nghiệp
                        </span>
                        <span className="text-[10px] text-slate-400 block font-semibold mt-0.5">Mở tài khoản định danh Tổ chức</span>
                      </div>
                      {subjectType === 'corporate' && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSubjectType('personal');
                        setErrors({});
                      }}
                      className={`w-full p-4 rounded-[1.8rem] flex items-center gap-4 transition-all duration-300 relative z-10 ${
                        subjectType === 'personal'
                          ? 'bg-gradient-to-r from-white to-blue-50/90 border border-blue-500/30 shadow-lg shadow-blue-900/10 -translate-y-0.5'
                          : 'bg-white/30 hover:bg-white/60 border border-white/40 hover:shadow-xs'
                      }`}
                    >
                      <div className={`p-3 rounded-2xl transition-all duration-300 ${
                        subjectType === 'personal' 
                          ? 'bg-gradient-to-br from-[#03377B] to-blue-800 text-white shadow-md shadow-blue-900/20 scale-105' 
                          : 'bg-white/80 text-slate-400 border border-slate-100'
                      }`}>
                        <Users size={20} className="stroke-[2.2]" />
                      </div>
                      <div className="text-left">
                        <span className={`text-xs font-extrabold block transition-colors duration-300 ${subjectType === 'personal' ? 'text-[#03377B]' : 'text-slate-700'}`}>
                          Phi doanh nghiệp
                        </span>
                        <span className="text-[10px] text-slate-400 block font-semibold mt-0.5">Mở tài khoản định danh Cá nhân</span>
                      </div>
                      {subjectType === 'personal' && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Left Assistant Tools */}
                {subjectType === 'personal' ? (
                  <div className="p-5 bg-gradient-to-br from-blue-50/40 via-sky-50/15 to-transparent border border-blue-100/50 rounded-2xl space-y-4 text-xs animate-fade-in">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100/50 text-[#03377B] rounded-xl mt-0.5 flex-shrink-0">
                        <Camera size={16} className="stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-[#03377B] uppercase tracking-wider">Hỗ trợ nhận diện OCR</h4>
                        <p className="text-[11px] text-slate-500 leading-normal mt-0.5">Tải lên hoặc chụp mặt trước căn cước công dân gắn chip để điền tự động dữ liệu.</p>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={runSimulatedOcr}
                      disabled={ocrScanning}
                      className="w-full py-2.5 bg-[#03377B] hover:bg-opacity-95 text-white text-xs font-black rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
                    >
                      {ocrScanning ? (
                        <>
                          <Loader2 size={13} className="animate-spin" />
                          Đang đọc thông tin chip...
                        </>
                      ) : (
                        <>
                          <Camera size={13} />
                          {ocrSuccess ? 'Đọc lại căn cước khác' : 'Chụp / Quét CCCD'}
                        </>
                      )}
                    </button>

                    {ocrSuccess && (
                      <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-[11px] font-bold leading-normal animate-fade-in">
                        🎉 Nhận diện hoàn tất! Các trường Họ tên, Ngày sinh, số CCCD & Địa chỉ đã được hệ thống tự động điền.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-5 bg-gradient-to-br from-[#03377B]/5 via-sky-50/30 to-transparent border border-slate-100 rounded-2xl space-y-3.5 text-xs animate-fade-in">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 text-[#03377B] rounded-xl mt-0.5 flex-shrink-0">
                        <Building size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Truy vấn Mã số thuế</h4>
                        <p className="text-[11px] text-slate-500 leading-normal mt-0.5">Dữ liệu doanh nghiệp được tự động đối soát thông qua Tổng cục Thuế và Cổng ĐKKD Quốc gia.</p>
                      </div>
                    </div>
                    <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-400 space-y-1">
                      <p>● Đảm bảo mã số thuế gồm 10 chữ số.</p>
                      <p>● Hệ thống tự kiểm tra black-list & nợ đọng thuế.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Interactive Form */}
              <div className="lg:col-span-8 bg-slate-50/40 p-6 sm:p-8 rounded-3xl border border-slate-100 space-y-6">
                
                {/* Personal Form fields block */}
                {subjectType === 'personal' && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="border-b border-slate-200/50 pb-3">
                      <h4 className="text-xs font-black text-[#03377B] uppercase tracking-wider">Hồ sơ cá nhân định danh</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-extrabold text-slate-500 block">Họ và tên chủ thể <span className="text-rose-500">*</span></label>
                        <input
                          type="text"
                          value={pName}
                          onChange={(e) => { setPName(e.target.value); setErrors(prev => ({ ...prev, pName: '' })); }}
                          placeholder="NGUYỄN VĂN A"
                          className={`w-full bg-white border rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 outline-none transition ${
                            errors.pName ? 'border-rose-500 bg-rose-50/20 focus:border-rose-500' : 'border-slate-200 focus:border-[#03377B] focus:ring-1 focus:ring-[#03377B]'
                          }`}
                        />
                        {errors.pName && <span className="text-[10px] text-rose-500 font-bold block">{errors.pName}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-extrabold text-slate-500 block">Ngày sinh <span className="text-rose-500">*</span></label>
                        <input
                          type="date"
                          value={pBirthDate}
                          onChange={(e) => { setPBirthDate(e.target.value); setErrors(prev => ({ ...prev, pBirthDate: '' })); }}
                          className={`w-full bg-white border rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 outline-none transition ${
                            errors.pBirthDate ? 'border-rose-500 bg-rose-50/20 focus:border-rose-500' : 'border-slate-200 focus:border-[#03377B] focus:ring-1 focus:ring-[#03377B]'
                          }`}
                        />
                        {errors.pBirthDate && <span className="text-[10px] text-rose-500 font-bold block">{errors.pBirthDate}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-extrabold text-slate-500 block">Số CCCD / CMND / Hộ chiếu <span className="text-rose-500">*</span></label>
                        <input
                          type="text"
                          value={pIdentity}
                          onChange={(e) => { setPIdentity(e.target.value); setErrors(prev => ({ ...prev, pIdentity: '' })); }}
                          placeholder="001095001234"
                          className={`w-full bg-white border rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 outline-none transition ${
                            errors.pIdentity ? 'border-rose-500 bg-rose-50/20 focus:border-rose-500' : 'border-slate-200 focus:border-[#03377B] focus:ring-1 focus:ring-[#03377B]'
                          }`}
                        />
                        <span className="text-[9px] text-slate-400 block font-medium leading-relaxed">
                          Thử nghiệm đối soát (Trùng: 001095001234, Tạm ngưng: 001096005678).
                        </span>
                        {errors.pIdentity && <span className="text-[10px] text-rose-500 font-bold block">{errors.pIdentity}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-extrabold text-slate-500 block">Số điện thoại di động <span className="text-rose-500">*</span></label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-3.5 text-slate-400"><Phone size={13} /></span>
                          <input
                            type="tel"
                            value={pPhone}
                            onChange={(e) => { setPPhone(e.target.value); setErrors(prev => ({ ...prev, pPhone: '' })); }}
                            placeholder="0912345678"
                            className={`w-full bg-white border rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-bold text-slate-800 outline-none transition ${
                              errors.pPhone ? 'border-rose-500 bg-rose-50/20 focus:border-rose-500' : 'border-slate-200 focus:border-[#03377B] focus:ring-1 focus:ring-[#03377B]'
                            }`}
                          />
                        </div>
                        {errors.pPhone && <span className="text-[10px] text-rose-500 font-bold block">{errors.pPhone}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-extrabold text-slate-500 block">Địa chỉ Email (Nhận mã bảo mật e-ID)</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-3.5 text-slate-400"><Mail size={13} /></span>
                          <input
                            type="email"
                            value={pEmail}
                            onChange={(e) => { setPEmail(e.target.value); setErrors(prev => ({ ...prev, pEmail: '' })); }}
                            placeholder="khachhang@gmail.com"
                            className={`w-full bg-white border rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-bold text-slate-800 outline-none transition ${
                              errors.pEmail ? 'border-rose-500 bg-rose-50/20 focus:border-rose-500' : 'border-slate-200 focus:border-[#03377B] focus:ring-1 focus:ring-[#03377B]'
                            }`}
                          />
                        </div>
                        {errors.pEmail && <span className="text-[10px] text-rose-500 font-bold block">{errors.pEmail}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-extrabold text-slate-500 block">Địa chỉ thường trú</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-3.5 text-slate-400"><MapPin size={13} /></span>
                          <input
                            type="text"
                            value={pAddress}
                            onChange={(e) => setPAddress(e.target.value)}
                            placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố"
                            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-[#03377B] focus:ring-1 focus:ring-[#03377B] transition"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Corporate Form fields block */}
                {subjectType === 'corporate' && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="border-b border-slate-200/50 pb-3">
                      <h4 className="text-xs font-black text-[#03377B] uppercase tracking-wider">Hồ sơ pháp nhân Doanh nghiệp</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-extrabold text-slate-500 block">Tên Tổ chức / Doanh nghiệp <span className="text-rose-500">*</span></label>
                        <input
                          type="text"
                          value={cName}
                          onChange={(e) => { setCName(e.target.value); setErrors(prev => ({ ...prev, cName: '' })); }}
                          placeholder="CÔNG TY CỔ PHẦN CÔNG NGHỆ PTI"
                          className={`w-full bg-white border rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 outline-none transition ${
                            errors.cName ? 'border-rose-500 bg-rose-50/20 focus:border-rose-500' : 'border-slate-200 focus:border-[#03377B] focus:ring-1 focus:ring-[#03377B]'
                          }`}
                        />
                        {errors.cName && <span className="text-[10px] text-rose-500 font-bold block">{errors.cName}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-extrabold text-slate-500 block">Mã số thuế / Số ĐKKD <span className="text-rose-500">*</span></label>
                        <input
                          type="text"
                          value={cTaxCode}
                          onChange={(e) => { setCTaxCode(e.target.value); setErrors(prev => ({ ...prev, cTaxCode: '' })); }}
                          placeholder="0102030405"
                          className={`w-full bg-white border rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 outline-none transition ${
                            errors.cTaxCode ? 'border-rose-500 bg-rose-50/20 focus:border-rose-500' : 'border-slate-200 focus:border-[#03377B] focus:ring-1 focus:ring-[#03377B]'
                          }`}
                        />
                        <span className="text-[9px] text-slate-400 block font-medium leading-relaxed">
                          MST thật hệ thống lưu vết là "0102030405" để kiểm tra trùng lặp dữ liệu.
                        </span>
                        {errors.cTaxCode && <span className="text-[10px] text-rose-500 font-bold block">{errors.cTaxCode}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-extrabold text-slate-500 block">Số điện thoại Hotline / Văn phòng <span className="text-rose-500">*</span></label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-3.5 text-slate-400"><Phone size={13} /></span>
                          <input
                            type="tel"
                            value={cPhone}
                            onChange={(e) => { setCPhone(e.target.value); setErrors(prev => ({ ...prev, cPhone: '' })); }}
                            placeholder="0243987654"
                            className={`w-full bg-white border rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-bold text-slate-800 outline-none transition ${
                              errors.cPhone ? 'border-rose-500 bg-rose-50/20 focus:border-rose-500' : 'border-slate-200 focus:border-[#03377B] focus:ring-1 focus:ring-[#03377B]'
                            }`}
                          />
                        </div>
                        {errors.cPhone && <span className="text-[10px] text-rose-500 font-bold block">{errors.cPhone}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-extrabold text-slate-500 block">Người đại diện pháp luật</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-3.5 text-slate-400"><User size={13} /></span>
                          <input
                            type="text"
                            value={cRepresentative}
                            onChange={(e) => setCRepresentative(e.target.value)}
                            placeholder="Họ tên Giám đốc / Đại diện pháp lý"
                            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-[#03377B] focus:ring-1 focus:ring-[#03377B] transition"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-extrabold text-slate-500 block">Địa chỉ Email Doanh nghiệp</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-3.5 text-slate-400"><Mail size={13} /></span>
                          <input
                            type="email"
                            value={cEmail}
                            onChange={(e) => { setCEmail(e.target.value); setErrors(prev => ({ ...prev, cEmail: '' })); }}
                            placeholder="contact@abc.com"
                            className={`w-full bg-white border rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-bold text-slate-800 outline-none transition ${
                              errors.cEmail ? 'border-rose-500 bg-rose-50/20 focus:border-rose-500' : 'border-slate-200 focus:border-[#03377B] focus:ring-1 focus:ring-[#03377B]'
                            }`}
                          />
                        </div>
                        {errors.cEmail && <span className="text-[10px] text-rose-500 font-bold block">{errors.cEmail}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-extrabold text-slate-500 block">Địa chỉ trụ sở chính</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-3.5 text-slate-400"><MapPin size={13} /></span>
                          <input
                            type="text"
                            value={cAddress}
                            onChange={(e) => setCAddress(e.target.value)}
                            placeholder="Số nhà, Tên tòa nhà, Tên đường, Quận, Tỉnh/Thành phố"
                            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-[#03377B] focus:ring-1 focus:ring-[#03377B] transition"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Combined Action Buttons */}
                <div className="flex items-center justify-end pt-5 border-t border-slate-200/50">
                  <button
                    type="button"
                    onClick={handleStartAppraisal}
                    className="px-8 py-3.5 bg-[#03377B] text-white rounded-2xl text-xs font-black hover:bg-opacity-95 flex items-center gap-2.5 shadow-md transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Bắt đầu thẩm định hồ sơ
                    <ArrowRight size={15} className="stroke-[2.5]" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── INTERACTIVE APPRAISAL POPUP MODAL ── */}
      {showAppraisalPopup && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full border border-slate-100 space-y-6 text-center animate-scale-up text-slate-800">
            <div className="flex justify-center">
              <div className="relative">
                <div className={`w-16 h-16 border-4 rounded-full border-indigo-100 border-t-[#5d5fe1] ${!appraisalCompleted ? 'animate-spin' : ''}`}></div>
                <span className="absolute inset-0 flex items-center justify-center text-2xl">🛡️</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-black text-slate-800 tracking-tight">Hệ thống iPTI đang thẩm định thông tin</h3>
              <p className="text-slate-400 text-xs">Chuẩn hóa dữ liệu & kiểm tra chéo thời gian thực</p>
            </div>

            {/* Checklist of appraisal tasks */}
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-left space-y-3">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Các tác vụ đang chạy nền:</span>
              
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-600">1. Đối chiếu danh tính với CSDL Quốc gia</span>
                {appraisalProgress >= 1 ? (
                  <span className="text-emerald-500 font-bold flex items-center gap-1">✓ Đạt</span>
                ) : (
                  <span className="text-blue-500 flex items-center gap-1">
                    <RefreshCw className="animate-spin" size={11} /> Đang chạy
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-600">2. Quét trùng lặp trên Cloud Core iPTI</span>
                {appraisalProgress >= 2 ? (
                  <span className="text-emerald-500 font-bold flex items-center gap-1">✓ Đạt</span>
                ) : appraisalProgress === 1 ? (
                  <span className="text-blue-500 flex items-center gap-1">
                    <RefreshCw className="animate-spin" size={11} /> Đang chạy
                  </span>
                ) : (
                  <span className="text-slate-300">Chờ duyệt</span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-600">3. OCR & Rà soát danh mục rủi ro black-list</span>
                {appraisalProgress >= 3 ? (
                  <span className="text-emerald-500 font-bold flex items-center gap-1">✓ Đạt</span>
                ) : appraisalProgress === 2 ? (
                  <span className="text-blue-500 flex items-center gap-1">
                    <RefreshCw className="animate-spin" size={11} /> Đang chạy
                  </span>
                ) : (
                  <span className="text-slate-300">Chờ duyệt</span>
                )}
              </div>
            </div>

            {/* Completion state button */}
            {appraisalCompleted ? (
              <div className="space-y-3 animate-fade-in">
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-2xl p-3.5 text-xs font-bold leading-relaxed">
                  🎉 Thẩm định hoàn tất thành công! Không phát hiện rủi ro trùng lặp hoặc pháp lý.
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowAppraisalPopup(false);
                    setCurrentSubStep(2);
                  }}
                  className="w-full py-3 bg-[#5d5fe1] text-white rounded-2xl text-xs font-black hover:bg-opacity-95 shadow-md flex items-center justify-center gap-1.5 transition-all"
                >
                  Cấp mã định danh ngay ➔
                </button>
              </div>
            ) : (
              <div className="text-[11px] text-slate-400 font-mono italic animate-pulse">
                Đang đối soát dữ liệu, vui lòng giữ kết nối...
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── STEP 2: CREATE ID RESULT (4a, 4b, 4c) ── */}
      {currentSubStep === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm max-w-xl mx-auto space-y-6 text-left animate-fade-in">
          
          {/* Status 4a: Create New ID Successfully */}
          {resultStatus === '4a' && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl shadow-inner mb-2 animate-bounce">
                  <CheckCircle2 size={32} className="stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-black text-slate-800 tracking-tight">Tạo ID Khách Hàng Thành Công</h3>
                <p className="text-slate-400 text-xs">Mã ID định danh duy nhất vừa được cấp phát và lưu trữ vĩnh viễn trên hệ thống</p>
              </div>

              {/* ID Display Box */}
              <div className="p-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/20 border border-blue-100 rounded-2xl text-center space-y-1.5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">MÃ ĐỊNH DANH KHÁCH HÀNG (iPTI ID)</span>
                <span className="text-2xl sm:text-3xl font-black text-[#03377B] tracking-wider select-all block font-mono">{resultId}</span>
                <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider block bg-emerald-50 border border-emerald-100 px-3.5 py-1 rounded-full w-max mx-auto">
                  ● ĐANG HOẠT ĐỘNG (ACTIVE)
                </span>
              </div>
            </div>
          )}

          {/* Status 4b: Existing & Active ID */}
          {resultStatus === '4b' && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 bg-amber-50 text-amber-600 border border-amber-100 rounded-2xl shadow-inner mb-2">
                  <AlertTriangle size={32} className="stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-black text-amber-800 tracking-tight">Đã có hồ sơ trên hệ thống</h3>
                <p className="text-slate-400 text-xs">Tránh trùng lặp! Chủ thể đã được định danh từ trước và tài khoản đang hoạt động bình thường</p>
              </div>

              {/* ID Display Box */}
              <div className="p-6 bg-gradient-to-r from-amber-50/50 to-orange-50/20 border border-amber-100 rounded-2xl text-center space-y-1.5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">MÃ ĐỊNH DANH ĐÃ TỒN TẠI</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-700 tracking-wider select-all block font-mono">{resultId}</span>
                <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-wider block bg-amber-50 border border-amber-100 px-3.5 py-1 rounded-full w-max mx-auto">
                  ● ĐANG HOẠT ĐỘNG (ACTIVE)
                </span>
              </div>
            </div>
          )}

          {/* Status 4c: Existing & Inactive ID (Auto-activated) */}
          {resultStatus === '4c' && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 bg-sky-50 text-sky-600 border border-sky-100 rounded-2xl shadow-inner mb-2">
                  <RefreshCw size={32} className="stroke-[2.5] animate-spin-slow" />
                </div>
                <h3 className="text-lg font-black text-[#03377B] tracking-tight">Kích hoạt lại hồ sơ thành công</h3>
                <p className="text-slate-400 text-xs">Chủ thể này đã tồn tại nhưng ở trạng thái tạm ngưng hoạt động. Hệ thống đã tự động ghi nhận lại & tái kích hoạt.</p>
              </div>

              {/* ID Display Box */}
              <div className="p-6 bg-gradient-to-r from-sky-50/50 to-blue-50/20 border border-sky-100 rounded-2xl text-center space-y-1.5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">MÃ ĐỊNH DANH TÁI KÍCH HOẠT</span>
                <span className="text-2xl sm:text-3xl font-black text-[#03377B] tracking-wider select-all block font-mono">{resultId}</span>
                <span className="text-[10px] font-extrabold text-sky-600 uppercase tracking-wider block bg-sky-50 border border-sky-100 px-3.5 py-1 rounded-full w-max mx-auto">
                  ● TÁI KÍCH HOẠT THÀNH CÔNG (REACTIVATED)
                </span>
              </div>
            </div>
          )}

          {/* Subject Details Preview Card */}
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2 text-xs">
            <span className="font-extrabold text-slate-500 block uppercase tracking-wider border-b border-slate-200 pb-1">Chi tiết chủ thể định danh:</span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 font-medium text-slate-600">
              <div>Họ tên/Tên tổ chức:</div>
              <div className="font-bold text-slate-800 text-right">{finalSubjectData.name}</div>
              
              <div>{subjectType === 'personal' ? 'Số CCCD/Hộ chiếu:' : 'Mã số thuế/ĐKKD:'}</div>
              <div className="font-bold text-slate-800 text-right">{finalSubjectData.identityNumber}</div>

              <div>Số điện thoại liên hệ:</div>
              <div className="font-bold text-slate-800 text-right">{finalSubjectData.phone}</div>

              <div>Email liên lạc:</div>
              <div className="font-bold text-slate-800 text-right break-all">{finalSubjectData.email || 'N/A'}</div>

              <div>Địa chỉ thường trú:</div>
              <div className="font-bold text-slate-800 text-right break-words">{finalSubjectData.address || 'N/A'}</div>
            </div>
          </div>

          {/* Action Buttons & Utilities */}
          <div className="space-y-4 pt-5 border-t border-slate-100">
            <span className="text-[10px] bg-slate-100 text-slate-500 font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider block w-max">
              Tùy chọn Hành động truyền thông & Pháp lý
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  const alertDiv = document.createElement('div');
                  alertDiv.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-slate-800/90 text-white text-xs font-bold px-4 py-3 rounded-xl z-50 border border-white/20 backdrop-blur-md shadow-lg flex items-center gap-2 animate-fade-in';
                  alertDiv.innerHTML = '📥 <span>Đang khởi tạo tệp tin PDF và tải xuống Phiếu xác nhận Định danh...</span>';
                  document.body.appendChild(alertDiv);
                  setTimeout(() => alertDiv.remove(), 2500);
                }}
                className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/10 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Printer size={15} className="text-[#03377B]" />
                In/Tải phiếu xác nhận PDF
              </button>

              <button
                type="button"
                onClick={() => {
                  const alertDiv = document.createElement('div');
                  alertDiv.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-slate-800/90 text-white text-xs font-bold px-4 py-3 rounded-xl z-50 border border-white/20 backdrop-blur-md shadow-lg flex items-center gap-2 animate-fade-in';
                  alertDiv.innerHTML = '✉️ <span>Mã OTP & đường dẫn e-ID đã được gửi qua Email & SMS tới Khách hàng thành công!</span>';
                  document.body.appendChild(alertDiv);
                  setTimeout(() => alertDiv.remove(), 2500);
                }}
                className="p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/10 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Send size={15} className="text-emerald-600" />
                Gửi SMS / Email xác nhận
              </button>
            </div>

            {/* Reset button to start over */}
            <div className="pt-4 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={handleResetFlow}
                className="w-full px-6 py-3 bg-[#03377B] text-white rounded-2xl text-xs font-black hover:bg-opacity-95 shadow-md flex items-center justify-center gap-2 transition duration-200"
              >
                <RefreshCw size={14} className="stroke-[2.5]" />
                Tiếp tục cấp thêm ID Khách hàng khác
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ── STEP 5: GÁN MỐI QUAN HỆ (KHÔNG BẮT BUỘC) ── */}
      {currentSubStep === 5 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
          
          {/* Relationship Assigning Panel */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-base font-black text-slate-800 tracking-tight">5. Gán mối quan hệ pháp lý cho ID</h3>
              <p className="text-slate-400 text-xs">Liên kết ID này với các thực thể khác (Người phụ thuộc, Công ty mẹ/con, Người đại diện) để hỗ trợ tính phí & thẩm định tập trung.</p>
            </div>

            {/* Selected subject info banner */}
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-extrabold uppercase block">ĐANG GÁN QUAN HỆ CHO:</span>
                <span className="font-black text-slate-800 text-sm">{finalSubjectData.name}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase block">MÃ ĐỊNH DANH (PTI-ID):</span>
                <span className="font-mono font-bold text-[#03377B] text-xs bg-white border px-2 py-0.5 rounded-md shadow-xs">{resultId}</span>
              </div>
            </div>

            {/* 5.1 Tìm kiếm thực thể liên quan hoặc Chọn nhanh mẫu */}
            {!isManualRel && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 block uppercase tracking-wider">5.1 Tìm thực thể liên đới trên hệ thống</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-3 text-slate-400"><Search size={14} /></span>
                      <input
                        type="text"
                        value={searchRelQuery}
                        onChange={(e) => setSearchRelQuery(e.target.value)}
                        placeholder="Gõ Số CCCD, MST hoặc Họ tên để tìm..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-[#03377B] focus:bg-white transition"
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSearchRelSubject(); }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSearchRelSubject}
                      className="px-4 py-2 bg-[#03377B] hover:bg-opacity-90 text-white font-bold text-xs rounded-xl shadow-xs transition"
                    >
                      Tìm kiếm
                    </button>
                  </div>
                </div>

                {/* Quick suggestions grid - Extremely visual and clickable with 1 click */}
                <div className="p-4 bg-slate-50/60 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-black text-slate-400 block mb-2.5 uppercase tracking-widest">
                    👉 CHỌN NHANH CHỦ THỂ ĐỂ GÁN MỐI QUAN HỆ (KHÔNG CẦN TÌM KIẾM):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {MOCK_EXISTING_SUBJECTS.filter(s => s.id !== resultId).map((sub) => (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => {
                          setSelectedRelSubject(sub);
                          setIsManualRel(false);
                          setFoundRelSubjects([]);
                          setRelErrors('');
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between hover:bg-blue-50/40 ${
                          selectedRelSubject?.id === sub.id
                            ? 'border-[#03377B] bg-blue-50/40 ring-1 ring-[#03377B] shadow-sm'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <span className="font-extrabold text-slate-800 text-[11px] block truncate">{sub.name}</span>
                          <span className="text-[9px] text-slate-400 block font-mono">CCCD/MST: {sub.identityNumber}</span>
                        </div>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md flex-shrink-0 ${
                          sub.type === 'personal' ? 'bg-sky-50 text-sky-600 border border-sky-100' : 'bg-purple-50 text-purple-600 border border-purple-100'
                        }`}>
                          {sub.type === 'personal' ? 'Cá nhân' : 'Doanh nghiệp'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5.2 / 5.3 System checking of search results */}
                {foundRelSubjects.length > 0 && (
                  <div className="border border-slate-100 rounded-2xl divide-y divide-slate-100 overflow-hidden bg-slate-50/50 shadow-xs animate-fade-in">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest p-2 bg-slate-100 block">KẾT QUẢ TÌM THẤY TRÙNG KHỚP (ĐÃ XÁC THỰC ID)</span>
                    {foundRelSubjects.map((sub) => (
                      <div 
                        key={sub.id} 
                        onClick={() => { setSelectedRelSubject(sub); setFoundRelSubjects([]); }}
                        className="p-3 flex items-center justify-between hover:bg-blue-50/40 cursor-pointer transition text-xs"
                      >
                        <div>
                          <span className="font-extrabold text-slate-800 block">{sub.name}</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">Giấy tờ: {sub.identityNumber} | Số ĐT: {sub.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-[#03377B]/10 text-[#03377B] font-mono font-black px-2 py-0.5 rounded-md">{sub.id}</span>
                          <span className="text-[10px] text-blue-600 font-extrabold">Chọn ➔</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {relErrors && !isManualRel && (
                  <span className="text-[10px] text-rose-500 font-bold block bg-rose-50 border border-rose-100 p-2.5 rounded-xl">
                    ⚠️ {relErrors}
                  </span>
                )}
              </div>
            )}

            {/* Quick manual entry choice */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setIsManualRel(!isManualRel);
                  setSelectedRelSubject(null);
                  setFoundRelSubjects([]);
                  setRelErrors('');
                }}
                className={`w-full py-2 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                  isManualRel
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50'
                }`}
              >
                <Plus size={14} className="stroke-[2.5]" />
                {isManualRel ? '◀ Hủy nhập thủ công, quay lại tìm kiếm / chọn từ danh sách' : '🆕 TỰ NHẬP THỦ CÔNG ĐỐI TƯỢNG LIÊN KẾT MỚI'}
              </button>
            </div>

            {/* ── MODE A: IF CUSTOM MANUAL RELATIVE IS ACTIVE ── */}
            {isManualRel && (
              <div className="p-4 rounded-2xl bg-emerald-50/20 border border-emerald-200/50 space-y-4 animate-fade-in text-xs">
                <div className="flex items-center justify-between border-b border-emerald-200/30 pb-2">
                  <span className="font-black text-emerald-800 uppercase tracking-tight">NHẬP NHANH ĐỐI TƯỢNG LIÊN KẾT MỚI:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsManualRel(false);
                      setManualRelName('');
                      setManualRelIdentity('');
                    }}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-extrabold text-slate-500 block">Họ tên / Tên tổ chức mới <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      value={manualRelName}
                      onChange={(e) => setManualRelName(e.target.value)}
                      placeholder="Ví dụ: Trần Thị C"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-[#03377B] transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-extrabold text-slate-500 block">Số CCCD / MST mới <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      value={manualRelIdentity}
                      onChange={(e) => setManualRelIdentity(e.target.value)}
                      placeholder="Ví dụ: 037095009999"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-[#03377B] transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-emerald-100">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-extrabold text-slate-500 block">Loại đối tượng liên đới</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setManualRelType('personal')}
                        className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold border transition ${
                          manualRelType === 'personal'
                            ? 'border-[#03377B] bg-blue-50/50 text-[#03377B]'
                            : 'border-slate-200 bg-white text-slate-500'
                        }`}
                      >
                        Cá nhân
                      </button>
                      <button
                        type="button"
                        onClick={() => setManualRelType('corporate')}
                        className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold border transition ${
                          manualRelType === 'corporate'
                            ? 'border-[#03377B] bg-blue-50/50 text-[#03377B]'
                            : 'border-slate-200 bg-white text-slate-500'
                        }`}
                      >
                        Doanh nghiệp
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-extrabold text-slate-500 block">Mối quan hệ pháp lý <span className="text-rose-500">*</span></label>
                    <select
                      value={relType}
                      onChange={(e) => setRelType(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-[#03377B] transition"
                    >
                      <option value="">-- Chọn loại mối quan hệ --</option>
                      {subjectType === 'personal' && manualRelType === 'personal' && (
                        <>
                          <option value="Bố/Mẹ">Bố/Mẹ của chủ thể</option>
                          <option value="Con cái">Con ruột/Con nuôi</option>
                          <option value="Vợ/Chồng">Vợ/Chồng hợp pháp</option>
                          <option value="Người phụ thuộc">Người phụ thuộc khác</option>
                          <option value="Ủy quyền pháp lý">Người được ủy quyền</option>
                        </>
                      )}
                      {subjectType === 'personal' && manualRelType === 'corporate' && (
                        <>
                          <option value="Nhân viên">Chủ thể là Nhân viên của tổ chức này</option>
                          <option value="Đại diện Pháp luật">Chủ thể là Người đại diện pháp luật</option>
                          <option value="Cổ đông sáng lập">Chủ thể sở hữu cổ phần</option>
                        </>
                      )}
                      {subjectType === 'corporate' && manualRelType === 'personal' && (
                        <>
                          <option value="Nhân viên">Tổ chức này là Chủ quản/Sử dụng lao động</option>
                          <option value="Người thụ hưởng">Đối tượng được thụ hưởng bảo hiểm doanh nghiệp</option>
                        </>
                      )}
                      {subjectType === 'corporate' && manualRelType === 'corporate' && (
                        <>
                          <option value="Công ty mẹ/con">Quan hệ Công ty Mẹ - Công ty Con</option>
                          <option value="Đối tác chiến lược">Đối tác ký kết hợp đồng đại lý/hợp tác</option>
                          <option value="Đơn vị liên kết">Đơn vị thành viên liên kết kinh doanh</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-extrabold text-slate-500 block">Ngày hiệu lực liên kết</label>
                    <input
                      type="date"
                      value={relEffectiveDate}
                      onChange={(e) => setRelEffectiveDate(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-[#03377B] transition"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={handleConfirmManualRelationship}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <Plus size={14} className="stroke-[3]" />
                      THÊM QUAN HỆ THỦ CÔNG
                    </button>
                  </div>
                </div>

                {relErrors && isManualRel && (
                  <span className="text-[10px] text-rose-500 font-bold block bg-rose-50 border border-rose-100 p-2.5 rounded-xl">
                    ⚠️ {relErrors}
                  </span>
                )}
              </div>
            )}

            {/* ── MODE B: CHOOSE RELATIONSHIP FOR AN EXISTING SYSTEM SUBJECT ── */}
            {selectedRelSubject && !isManualRel && (
              <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-200/50 space-y-4 animate-fade-in text-xs">
                <div className="flex items-center justify-between border-b border-blue-200/30 pb-2">
                  <span className="font-black text-blue-900 uppercase tracking-tight">⚙️ THIẾT LẬP MỐI QUAN HỆ PHÁP LÝ:</span>
                  <button type="button" onClick={() => setSelectedRelSubject(null)} className="text-slate-400 hover:text-slate-600"><X size={14} /></button>
                </div>
                
                <div className="grid grid-cols-2 gap-2 font-medium text-slate-600 mb-2">
                  <div>Chủ thể liên quan được chọn:</div>
                  <div className="font-extrabold text-slate-800 text-right">{selectedRelSubject.name}</div>
                  <div>Mã ID (PTI ID):</div>
                  <div className="font-bold text-[#03377B] text-right font-mono">{selectedRelSubject.id}</div>
                  <div>Giấy tờ pháp lý:</div>
                  <div className="font-bold text-slate-800 text-right font-mono">{selectedRelSubject.identityNumber}</div>
                </div>

                {/* 5.4 Chọn loại quan hệ (Suggested intelligently by system based on pairing) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-blue-100">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-extrabold text-[#03377B] block uppercase tracking-wider font-black">5.4 Mối quan hệ được gán <span className="text-rose-500">*</span></label>
                    <select
                      value={relType}
                      onChange={(e) => setRelType(e.target.value)}
                      className="w-full bg-white border-2 border-blue-100 focus:border-[#03377B] rounded-xl px-3 py-2 text-xs font-black text-slate-800 outline-none transition"
                    >
                      <option value="">-- Chọn loại mối quan hệ --</option>
                      {getRelationshipOptions().map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* 5.5 Nhập ngày hiệu lực */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-extrabold text-slate-500 block uppercase tracking-wider">5.5 Ngày hiệu lực gán liên kết</label>
                    <input
                      type="date"
                      value={relEffectiveDate}
                      onChange={(e) => setRelEffectiveDate(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-[#03377B] rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none transition"
                    />
                  </div>
                </div>

                {/* Confirm Association Button */}
                <div className="text-right pt-2 border-t border-blue-200/30">
                  <button
                    type="button"
                    onClick={handleAddRelationship}
                    className="px-5 py-2.5 bg-[#03377B] text-white rounded-xl text-xs font-black hover:bg-opacity-90 flex items-center gap-1.5 ml-auto transition-all shadow-md"
                  >
                    <Plus size={13} className="stroke-[3]" />
                    Xác nhận liên kết pháp lý
                  </button>
                </div>
              </div>
            )}

            {/* List of successfully assigned relations */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-500 block uppercase tracking-wider">DANH SÁCH LIÊN KẾT ĐÃ THIẾT LẬP ({assignedRelationships.length})</label>
              
              {assignedRelationships.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100 border-dashed text-xs text-slate-400">
                  Chưa gán mối quan hệ nào. Tìm kiếm chủ thể ở trên để thêm liên kết.
                </div>
              ) : (
                <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                  {assignedRelationships.map((rel) => (
                    <div key={rel.relatedId} className="p-3 bg-emerald-50/40 border border-emerald-100/70 rounded-xl flex items-center justify-between text-xs animate-fade-in">
                      <div className="flex items-center gap-3">
                        <span className="text-sm">🔗</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-slate-800">{rel.relatedName}</span>
                            <span className="text-[10px] font-black text-emerald-600 bg-emerald-100/50 px-1.5 py-0.5 rounded-md uppercase tracking-wider font-mono">{rel.type}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 block mt-0.5">Giấy tờ: {rel.relatedIdentity} | Ngày hiệu lực: {rel.effectiveDate}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAssignedRelationships(assignedRelationships.filter(r => r.relatedId !== rel.relatedId))}
                        className="p-1.5 bg-white text-rose-500 hover:text-rose-700 hover:bg-rose-50 border border-slate-100 rounded-lg transition"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Finish action buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleSkipRelationships}
                className="px-5 py-2.5 rounded-2xl border border-slate-200 hover:border-slate-300 text-slate-600 text-xs font-bold transition"
              >
                Bỏ qua gán quan hệ
              </button>
              
              <button
                type="button"
                onClick={() => setCurrentSubStep(6)}
                className="px-6 py-2.5 bg-[#03377B] text-white rounded-2xl text-xs font-bold hover:bg-opacity-90 flex items-center gap-1.5 shadow-md transition-all"
              >
                Tiếp tục đến Bước hoàn tất
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Business Rules Sidebar info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-white/80 via-white/40 to-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/60 shadow-sm space-y-4">
              <h4 className="text-xs font-black text-[#03377B] uppercase tracking-wider">CHÍNH SÁCH QUY ĐỊNH LIÊN KẾT v6.3</h4>
              <div className="space-y-4 text-[11px] leading-relaxed">
                <div className="space-y-1">
                  <span className="font-extrabold text-slate-700 block">5.2 Thẩm định ID hợp lệ:</span>
                  <p className="text-slate-400">Hệ thống chỉ gán liên kết với các ID đã hoàn thành đăng ký và đang ở trạng thái ACTIVE trên iPTI Core.</p>
                </div>
                <div className="space-y-1">
                  <span className="font-extrabold text-slate-700 block">5.3 Kiểm tra trùng lặp quan hệ:</span>
                  <p className="text-slate-400">Hệ thống tự động phát hiện nếu mối quan hệ hai chiều đã tồn tại từ trước để tránh ghi nhận lặp hoặc mâu thuẫn pháp lý.</p>
                </div>
                <div className="space-y-1">
                  <span className="font-extrabold text-slate-700 block">5.4 Đề xuất loại quan hệ:</span>
                  <p className="text-slate-400">CSDL gợi ý chính xác cặp quan hệ phù hợp cho bạn lựa chọn (Vợ/Chồng cho Cá nhân - Cá nhân, Người đại diện cho Cá nhân - Tổ chức...).</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100 text-[10px] text-amber-800 font-medium leading-normal flex gap-2">
              <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={14} />
              <span><strong>Mẹo tìm nhanh:</strong> Bạn có thể gõ "Nguyễn Văn A" hoặc "0102030405" để tìm và gán thử nghiệm.</span>
            </div>
          </div>

        </div>
      )}

      {/* ── STEP 6: HOÀN TẤT ── */}
      {currentSubStep === 6 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm max-w-xl mx-auto space-y-8 text-left animate-fade-in">
          
          {/* Completion Header */}
          <div className="text-center space-y-2 border-b border-slate-100 pb-5">
            <div className="inline-flex p-3 bg-emerald-500 text-white rounded-full shadow-lg shadow-emerald-500/15 mb-2">
              <CheckCircle2 size={36} className="stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight">Quy trình cấp định danh hoàn tất</h3>
            <p className="text-slate-400 text-xs">Chủ thể đã được tích hợp toàn diện và gán các ràng buộc pháp lý thành công</p>
          </div>

          {/* 6.1 Tổng kết: ID chủ thể + danh sách quan hệ */}
          <div className="space-y-4">
            <span className="text-[10px] bg-slate-100 text-slate-500 font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider block w-max">
              6.1 Bản tổng kết định danh hồ sơ
            </span>

            <div className="border border-slate-200/80 rounded-2xl overflow-hidden divide-y divide-slate-100 text-xs shadow-xs bg-slate-50/30">
              <div className="p-4 bg-gradient-to-r from-blue-50/30 to-sky-50/15 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[10px] font-bold block uppercase">CHỦ THỂ CHÍNH</span>
                  <span className="font-black text-slate-800 text-sm">{finalSubjectData.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-[10px] font-bold block uppercase">MÃ ĐỊNH DANH (PTI-ID)</span>
                  <span className="font-mono font-black text-[#03377B] text-xs bg-white border px-2.5 py-1 rounded-lg shadow-xs select-all">{resultId}</span>
                </div>
              </div>

              <div className="p-4 grid grid-cols-2 gap-y-2 text-slate-600 font-medium">
                <div>Kênh tiếp nhận hồ sơ:</div>
                <div className="font-bold text-slate-800 text-right">
                  {channel === 'app_web' ? '📱 Tự động App / Web' : channel === 'hotline' ? '📞 Hotline 24/7' : '🏛️ Quầy Giao dịch trực tiếp'}
                </div>

                <div>Loại chủ thể:</div>
                <div className="font-bold text-slate-800 text-right">{subjectType === 'personal' ? 'Cá nhân' : 'Tổ chức / Doanh nghiệp'}</div>

                <div>{subjectType === 'personal' ? 'Số CCCD/CMND:' : 'Mã số thuế/ĐKKD:'}</div>
                <div className="font-bold text-slate-800 text-right">{finalSubjectData.identityNumber}</div>

                <div>Số điện thoại liên lạc:</div>
                <div className="font-bold text-slate-800 text-right">{finalSubjectData.phone}</div>

                {subjectType === 'personal' && (
                  <>
                    <div>Mối quan hệ pháp lý đã gán:</div>
                    <div className="font-bold text-slate-800 text-right">
                      {assignedRelationships.length === 0 ? 'Không thiết lập liên kết' : `${assignedRelationships.length} liên kết`}
                    </div>
                  </>
                )}
              </div>

              {subjectType === 'personal' && assignedRelationships.length > 0 && (
                <div className="p-4 space-y-2 bg-white">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Chi tiết danh sách liên kết đã gán:</span>
                  <div className="space-y-1.5">
                    {assignedRelationships.map((rel) => (
                      <div key={rel.relatedId} className="flex justify-between items-center text-[11px] p-2 bg-slate-50 border rounded-xl">
                        <span className="font-bold text-slate-700">{rel.relatedName}</span>
                        <div className="flex gap-2">
                          <span className="font-mono text-slate-400">{rel.relatedId}</span>
                          <span className="font-black text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-md uppercase text-[9px] tracking-wider border border-blue-100">{rel.type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 6.2 Tùy chọn: In/tải phiếu xác nhận, gửi SMS/Email */}
          <div className="space-y-4 pt-2">
            <span className="text-[10px] bg-slate-100 text-slate-500 font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider block w-max">
              6.2 Tùy chọn Hành động truyền thông & Pháp lý
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  const alertDiv = document.createElement('div');
                  alertDiv.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-slate-800/90 text-white text-xs font-bold px-4 py-3 rounded-xl z-50 border border-white/20 backdrop-blur-md shadow-lg flex items-center gap-2 animate-fade-in';
                  alertDiv.innerHTML = '📥 <span>Đang khởi tạo tệp tin PDF và tải xuống Phiếu xác nhận Định danh...</span>';
                  document.body.appendChild(alertDiv);
                  setTimeout(() => alertDiv.remove(), 2500);
                }}
                className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/10 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Printer size={15} className="text-[#03377B]" />
                In/Tải phiếu xác nhận PDF
              </button>

              <button
                type="button"
                onClick={() => {
                  const alertDiv = document.createElement('div');
                  alertDiv.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-slate-800/90 text-white text-xs font-bold px-4 py-3 rounded-xl z-50 border border-white/20 backdrop-blur-md shadow-lg flex items-center gap-2 animate-fade-in';
                  alertDiv.innerHTML = '✉️ <span>Mã OTP & đường dẫn e-ID đã được gửi qua Email & SMS tới Khách hàng thành công!</span>';
                  document.body.appendChild(alertDiv);
                  setTimeout(() => alertDiv.remove(), 2500);
                }}
                className="p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/10 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Send size={15} className="text-emerald-600" />
                Gửi SMS / Email xác nhận
              </button>
            </div>
          </div>

          {/* Reset button to start over */}
          <div className="pt-4 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={handleResetFlow}
              className="w-full px-6 py-3 bg-[#03377B] text-white rounded-2xl text-xs font-black hover:bg-opacity-95 shadow-md flex items-center justify-center gap-2 transition duration-200"
            >
              <RefreshCw size={14} className="stroke-[2.5]" />
              Tiếp tục cấp thêm ID Khách hàng khác
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
