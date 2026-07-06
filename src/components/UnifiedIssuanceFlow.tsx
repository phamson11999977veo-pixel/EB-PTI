import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Search, 
  FileText, 
  UploadCloud, 
  AlertTriangle, 
  CreditCard, 
  Users, 
  Printer, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  Calendar, 
  Plane, 
  MapPin, 
  Activity, 
  Briefcase,
  Smartphone,
  Check,
  RefreshCw
} from 'lucide-react';
import { CompanyInfo, InvoiceInfo } from '../types';
import { 
  Accident3D, 
  TravelIntl3D, 
  TravelDom3D, 
  HealthPti3D, 
  EliteCare3D, 
  WorkersComp3D 
} from './ThreeDGraphics';

interface UnifiedIssuanceFlowProps {
  product: 'accident' | 'travel_intl' | 'travel_dom' | 'elitecare' | 'workers_comp';
  user: { name: string; username: string; role: string };
  onClose: () => void;
  onComplete: (newContract: {
    id: string;
    company: string;
    date: string;
    headcount: number;
    premium: number;
    status: string;
  }) => void;
}

export default function UnifiedIssuanceFlow({
  product,
  user,
  onClose,
  onComplete
}: UnifiedIssuanceFlowProps) {
  const [step, setStep] = useState<number>(1);
  const [isSearchingMst, setIsSearchingMst] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'bank'>('qr');
  const [isPaid, setIsPaid] = useState(false);

  // Form states
  const [mst, setMst] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState('2026-07-01');
  const [headcount, setHeadcount] = useState<number>(15);
  
  // Specific inputs
  const [destination, setDestination] = useState('');
  const [travelPurpose, setTravelPurpose] = useState('Du lịch');
  const [selectedPlanId, setSelectedPlanId] = useState('plan-2'); // default to middle
  const [selectedOccGroup, setSelectedOccGroup] = useState<number>(1);
  const [accidentSumInsured, setAccidentSumInsured] = useState('100,000,000 đ');
  const [accidentMedical, setAccidentMedical] = useState('20,000,000 đ');
  const [accidentDailyAllowance, setAccidentDailyAllowance] = useState('300,000 đ/ngày');

  // Exceptions list for Excel Upload (Step 4)
  const [exceptions, setExceptions] = useState([
    { id: 1, name: 'Nguyễn Thị B', cccd: '001234567890', dob: '15/03/1990', reason: 'Trùng CCCD với #8', type: 'dup' },
    { id: 2, name: 'Trần Văn C', cccd: '—', dob: '22/07/1985', reason: 'Thiếu CCCD', type: 'miss' },
    { id: 3, name: 'Lê Thị D', cccd: '036789012345', dob: '01/01/1958', reason: 'Tuổi 68 > 65', type: 'age' }
  ]);

  const [excelUploaded, setExcelUploaded] = useState(false);

  // Tra cứu MST nhanh demo
  const handleLookupTaxId = () => {
    if (!mst) return;
    setIsSearchingMst(true);
    setTimeout(() => {
      setIsSearchingMst(false);
      setCompanyName('Công ty Cổ phần Công nghệ & Giáo dục Đại Việt');
      setIndustry('Công nghệ phần mềm / Giáo dục');
      setContactName('Phạm Minh Sơn');
      setPhone('0987112233');
      setEmail('son.pham@daiviet.edu.vn');
    }, 1200);
  };

  // Get metadata per product
  const getProductMeta = () => {
    switch (product) {
      case 'accident':
        return {
          title: 'Bảo hiểm Tai nạn Con người',
          desc: 'Bảo vệ rủi ro tai nạn cho cá nhân và nhóm lao động theo nhóm nghề nghiệp.',
          icon: <Briefcase className="w-8 h-8 text-white" />,
          gradient: 'from-amber-500 to-amber-600',
          accentColor: 'text-amber-600',
          accentBg: 'bg-amber-500/10',
          accentBorder: 'border-amber-200',
          rule: 'QT264 / QT265'
        };
      case 'travel_intl':
        return {
          title: 'Bảo hiểm Du lịch Quốc tế',
          desc: 'Bảo vệ y tế, tai nạn, hành lý và Covid-19 cho các chuyến đi nước ngoài.',
          icon: <Plane className="w-8 h-8 text-white" />,
          gradient: 'from-blue-500 to-sky-600',
          accentColor: 'text-blue-600',
          accentBg: 'bg-blue-50/10',
          accentBorder: 'border-blue-200',
          rule: 'Hạn mức đến $50,000'
        };
      case 'travel_dom':
        return {
          title: 'Bảo hiểm Du lịch Trong nước',
          desc: 'An tâm khám phá Việt Nam với quyền lợi bảo hiểm tai nạn và y tế toàn diện.',
          icon: <MapPin className="w-8 h-8 text-white" />,
          gradient: 'from-emerald-500 to-teal-600',
          accentColor: 'text-emerald-600',
          accentBg: 'bg-emerald-500/10',
          accentBorder: 'border-emerald-200',
          rule: 'Phạm vi Nội địa VN'
        };
      case 'elitecare':
        return {
          title: 'Bảo hiểm Sức khỏe Cao cấp EliteCare',
          desc: 'Quyền lợi tối thượng cho lãnh đạo & chuyên gia, bảo lãnh y tế toàn cầu.',
          icon: <Sparkles className="w-8 h-8 text-white" />,
          gradient: 'from-indigo-600 to-purple-600',
          accentColor: 'text-indigo-600',
          accentBg: 'bg-indigo-500/10',
          accentBorder: 'border-indigo-200',
          rule: 'Bảo lãnh Toàn cầu'
        };
      case 'workers_comp':
        return {
          title: 'Bảo hiểm Bồi thường Người lao động',
          desc: 'Bảo hiểm tai nạn lao động và bệnh nghề nghiệp chuẩn theo Luật Lao động.',
          icon: <Building2 className="w-8 h-8 text-white" />,
          gradient: 'from-violet-500 to-fuchsia-600',
          accentColor: 'text-violet-600',
          accentBg: 'bg-violet-500/10',
          accentBorder: 'border-violet-200',
          rule: 'Chuẩn luật Lao động'
        };
    }
  };

  const meta = getProductMeta();

  // Price calculations based on parameters
  const calculatePremium = () => {
    let baseRate = 0; // percentage or fixed per head
    let pricePerHead = 0;

    if (product === 'accident') {
      const occRates = [0.0035, 0.005, 0.0075, 0.012];
      const rate = occRates[selectedOccGroup - 1] || 0.0035;
      const stbh = parseInt(accidentSumInsured.replace(/,/g, '')) || 100000000;
      pricePerHead = stbh * rate;
    } else if (product === 'travel_intl') {
      const planPrices = { 'plan-1': 350000, 'plan-2': 550000, 'plan-3': 950000 };
      pricePerHead = planPrices[selectedPlanId as 'plan-1' | 'plan-2' | 'plan-3'] || 550000;
    } else if (product === 'travel_dom') {
      const planPrices = { 'plan-1': 45000, 'plan-2': 90000, 'plan-3': 150000 };
      pricePerHead = planPrices[selectedPlanId as 'plan-1' | 'plan-2' | 'plan-3'] || 90000;
    } else if (product === 'elitecare') {
      const planPrices = { 'plan-1': 4500000, 'plan-2': 8500000, 'plan-3': 15000000 };
      pricePerHead = planPrices[selectedPlanId as 'plan-1' | 'plan-2' | 'plan-3'] || 8500000;
    } else if (product === 'workers_comp') {
      const planPrices = { 'plan-1': 180000, 'plan-2': 280000, 'plan-3': 450000 };
      pricePerHead = planPrices[selectedPlanId as 'plan-1' | 'plan-2' | 'plan-3'] || 280000;
    }

    const rawTotal = pricePerHead * headcount;
    const vat = rawTotal * 0.1;
    const discount = rawTotal * 0.05; // 5% group discount
    const commission = rawTotal * 0.15; // 15% CA commission
    const totalWithVat = rawTotal + vat - discount;

    return {
      pricePerHead,
      rawTotal,
      vat,
      discount,
      commission,
      totalWithVat
    };
  };

  const pricing = calculatePremium();

  const handleResolveException = (id: number, action: 'edit' | 'delete' | 'fix') => {
    if (action === 'delete') {
      setExceptions(exceptions.filter(e => e.id !== id));
    } else {
      setExceptions(exceptions.map(e => {
        if (e.id === id) {
          return { ...e, type: 'resolved', reason: 'Hợp lệ ✓' };
        }
        return e;
      }));
    }
  };

  const renderProduct3D = () => {
    switch (product) {
      case 'accident': return <Accident3D />;
      case 'travel_intl': return <TravelIntl3D />;
      case 'travel_dom': return <TravelDom3D />;
      case 'elitecare': return <EliteCare3D />;
      case 'workers_comp': return <WorkersComp3D />;
      default: return null;
    }
  };

  const handleFinish = () => {
    const contractId = `PTI-${product.toUpperCase().slice(0, 3)}-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    onComplete({
      id: contractId,
      company: companyName || 'Doanh nghiệp Khai thác Mới',
      date: new Date().toLocaleDateString('vi-VN'),
      headcount: headcount,
      premium: pricing.totalWithVat,
      status: 'Đã phát hành'
    });
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Header based on selected product with Glassmorphism and 3D Graphic */}
      <div className="relative rounded-[2rem] p-6 text-white overflow-hidden shadow-2xl border border-white/25 bg-gradient-to-br from-[#03377B] via-[#022D66] to-[#011B3D] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Apple iOS backlight glow */}
        <div className="absolute -top-12 right-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 left-1/4 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl"></div>
        
        {/* Left column details */}
        <div className="md:col-span-8 flex items-center gap-5 relative z-10">
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg flex-shrink-0">
            {meta.icon}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] bg-white/15 border border-white/10 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {meta.rule}
              </span>
              <span className="text-[10px] bg-amber-500/20 border border-amber-500/30 text-amber-300 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                iPTI Premium
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black mt-2 tracking-tight">{meta.title}</h2>
            <p className="text-blue-100/80 text-xs mt-1.5 max-w-xl leading-relaxed">{meta.desc}</p>
          </div>
        </div>

        {/* Right column: 3D Illustration in an Apple Glass card */}
        <div className="md:col-span-4 relative z-10 flex justify-center md:justify-end">
          <div className="w-full max-w-[200px] bg-white/5 backdrop-blur-md p-1 rounded-2xl border border-white/10 shadow-xl transform hover:scale-105 transition-transform duration-300">
            {renderProduct3D()}
          </div>
        </div>
      </div>

      {/* Progress Step Bar */}
      <div className="bg-white/45 backdrop-blur-xl rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-white/80">
        <div className="flex flex-wrap items-center justify-between gap-y-4">
          <div className="flex items-center gap-2.5">
            <span className="bg-[#03377B] text-white w-7 h-7 flex items-center justify-center font-bold rounded-lg text-sm">
              {step}
            </span>
            <div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">LUỒNG CẤP ĐƠN SỐ HÓA</span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                {step === 1 && '1. Khảo sát & Thông tin Cơ bản'}
                {step === 2 && '2. Thiết lập Chương trình & Quyền lợi'}
                {step === 3 && '3. Bảng Chào giá & Tài chính'}
                {step === 4 && '4. Danh sách Nhân viên & Lọc ngoại lệ'}
                {step === 5 && '5. Thông tin Xuất hóa đơn & Thanh toán'}
                {step === 6 && '6. Phát hành Thẻ Bảo lãnh Điện tử'}
              </span>
            </div>
          </div>

          {/* Small step tracker */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all ${idx + 1 === step ? 'w-8 bg-[#03377B]' : idx + 1 < step ? 'w-3 bg-emerald-500' : 'w-3 bg-slate-200'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────
           STEP 1: KHẢO SÁT & THÔNG TIN CƠ BẢN
         ────────────────────────────────────────────────── */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white/45 backdrop-blur-xl p-6 rounded-3xl border border-white/80 shadow-[0_20px_50px_rgba(15,23,42,0.03)] space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">Khảo sát & Thông tin Khai thác ban đầu</h3>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Điền các thông tin khai thác chính để hệ thống định danh mức thù lao và thuế.</p>
              </div>
              <button
                type="button"
                onClick={handleLookupTaxId}
                disabled={isSearchingMst}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-[#03377B] text-xs font-bold rounded-xl border border-blue-100 transition flex items-center gap-1.5"
              >
                {isSearchingMst ? (
                  <>
                    <RefreshCw className="animate-spin" size={12} />
                    <span>Đang nạp dữ liệu...</span>
                  </>
                ) : (
                  <>
                    <Search size={12} />
                    <span>⚡ Tra cứu MST nhanh</span>
                  </>
                )}
              </button>
            </div>

            {/* Seller profile auto-filled */}
            <div className="space-y-3">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Cán bộ khai thác trực đơn</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50/60 border border-slate-100/80 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Mã số người bán (CA)</span>
                  <span className="font-bold text-slate-700 block mt-0.5">{user.username}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Họ tên cán bộ</span>
                  <span className="font-bold text-slate-700 block mt-0.5">{user.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Đơn vị hạch toán</span>
                  <span className="font-bold text-slate-700 block mt-0.5">Chi nhánh Hà Nội</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Thông tin đối tác Doanh nghiệp</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Mã số thuế doanh nghiệp *</label>
                  <input
                    type="text"
                    value={mst}
                    onChange={(e) => setMst(e.target.value)}
                    placeholder="VD: 0109485721"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block">Tên doanh nghiệp mua bảo hiểm *</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="VD: Công ty Cổ phần Công nghệ Đại Việt"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Lĩnh vực hoạt động *</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="VD: Công nghệ thông tin"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Người liên hệ HR *</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Họ và tên nhân sự phụ trách"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Số điện thoại di động *</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="VD: 0987xxxxxx"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition"
                  />
                </div>
              </div>
            </div>

            {/* Product-specific context details */}
            <div className="space-y-4 pt-2">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Chi tiết chương trình & Quy mô</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {product === 'travel_intl' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Điểm đến Quốc tế *</label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition"
                    >
                      <option value="">-- Chọn vùng phủ sóng --</option>
                      <option value="asia">Châu Á / ASEAN</option>
                      <option value="europe">Châu Âu / Schengen</option>
                      <option value="usa">Mỹ & Canada</option>
                      <option value="global">Toàn cầu (Global)</option>
                    </select>
                  </div>
                )}

                {product === 'travel_dom' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Điểm du lịch chính nội địa *</label>
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="VD: Phú Quốc, Nha Trang"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition"
                    />
                  </div>
                )}

                {product === 'workers_comp' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Tên dự án / Công trình xây lắp *</label>
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="VD: Dự án Vinhome Ocean Park 3"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Ngày bắt đầu hiệu lực *</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Số người tham gia bảo hiểm *</label>
                  <input
                    type="number"
                    value={headcount}
                    onChange={(e) => setHeadcount(Number(e.target.value))}
                    min={1}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition font-mono font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-2xl transition flex items-center gap-2 bg-white"
            >
              <ArrowLeft size={14} />
              <span>Thoát ra Tổng quan</span>
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-3 bg-[#03377B] hover:bg-[#00285d] text-white text-xs font-black rounded-2xl transition flex items-center gap-1.5 shadow-lg shadow-blue-900/10"
            >
              <span>Tiếp theo: Thiết lập chương trình</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────
           STEP 2: THIẾT LẬP CHƯƠNG TRÌNH & QUYỀN LỢI
         ────────────────────────────────────────────────── */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white/45 backdrop-blur-xl p-6 rounded-3xl border border-white/80 shadow-[0_20px_50px_rgba(15,23,42,0.03)] space-y-6">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800">Cấu hình Chương trình & Quyền lợi Bảo hiểm</h3>
              <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Lựa chọn các gói quyền lợi chuẩn hóa theo quy tắc hoặc nhóm nguy cơ rủi ro cao.</p>
            </div>

            {/* Product-specific configuration area */}
            {product === 'accident' ? (
              <div className="space-y-6">
                {/* 4 Occupation Groups styled beautifully */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Phân loại Nhóm nghề nghiệp (1-4)</span>
                    <span className="text-[10px] bg-amber-500/10 text-amber-700 font-extrabold px-2 py-0.5 rounded-md border border-amber-500/10">Yêu cầu cao về tỷ lệ phí</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { g: 1, label: 'Nhóm 1', desc: 'Văn phòng, hành chính, giáo viên', rate: '0.35%' },
                      { g: 2, label: 'Nhóm 2', desc: 'Kỹ thuật, dã ngoại, bán hàng ngoài', rate: '0.50%' },
                      { g: 3, label: 'Nhóm 3', desc: 'Xây dựng, lắp đặt cơ khí, vận hành máy', rate: '0.75%' },
                      { g: 4, label: 'Nhóm 4', desc: 'Lao động nguy hiểm, bốc xếp, hầm mỏ', rate: '1.20%' }
                    ].map((occ) => (
                      <button
                        key={occ.g}
                        type="button"
                        onClick={() => setSelectedOccGroup(occ.g)}
                        className={`p-4 rounded-2xl border text-left transition-all ${selectedOccGroup === occ.g ? 'border-[#03377B] bg-blue-50/50 shadow-md ring-2 ring-[#03377B]/10' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                      >
                        <span className="block font-black text-xs text-slate-800">{occ.label}</span>
                        <span className="block text-[10px] text-slate-400 mt-1 min-h-[32px]">{occ.desc}</span>
                        <span className="block text-[11px] font-extrabold text-[#03377B] mt-2">Tỷ lệ phí: {occ.rate}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Coverages drop-downs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Số tiền bảo hiểm (Tử vong & TTVV) *</label>
                    <select
                      value={accidentSumInsured}
                      onChange={(e) => setAccidentSumInsured(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition"
                    >
                      <option value="50,000,000 đ">50.000.000 đ</option>
                      <option value="100,000,000 đ">100.000.000 đ</option>
                      <option value="200,000,000 đ">200.000.000 đ</option>
                      <option value="300,000,000 đ">300.000.000 đ</option>
                      <option value="500,000,000 đ">500.000.000 đ</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Hạn mức Chi phí Y tế do tai nạn *</label>
                    <select
                      value={accidentMedical}
                      onChange={(e) => setAccidentMedical(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition"
                    >
                      <option value="10,000,000 đ">10.000.000 đ</option>
                      <option value="20,000,000 đ">20.000.000 đ</option>
                      <option value="30,000,000 đ">30.000.000 đ</option>
                      <option value="50,000,000 đ">50.000.000 đ</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Trợ cấp nằm viện do tai nạn *</label>
                    <select
                      value={accidentDailyAllowance}
                      onChange={(e) => setAccidentDailyAllowance(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition"
                    >
                      <option value="150,000 đ/ngày">150.000 đ/ngày</option>
                      <option value="300,000 đ/ngày">300.000 đ/ngày</option>
                      <option value="500,000 đ/ngày">500.000 đ/ngày</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              // 3 plans grid for Travel / Elitecare / Workers
              <div className="space-y-6">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Lựa chọn Gói bảo hiểm phù hợp</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    {
                      id: 'plan-1',
                      title: product === 'elitecare' ? 'Elite Gold' : product === 'travel_intl' ? 'Gói Đồng (Bronze)' : 'Chương trình Cơ bản',
                      price: product === 'elitecare' ? '4.500.000 đ' : product === 'travel_intl' ? '350.000 đ' : product === 'travel_dom' ? '45.000 đ' : '180.000 đ',
                      coverages: product === 'elitecare' 
                        ? ['Quyền lợi y tế: 2 tỷ đ', 'Phạm vi: Toàn cầu', 'Bảo lãnh viện phí VIP', 'Thai sản bổ sung']
                        : product === 'travel_intl'
                        ? ['Quyền lợi y tế: $10,000', 'Phạm vi: Đông Nam Á', 'Sự cố hành lý: $500', 'Covid-19 hỗ trợ']
                        : product === 'travel_dom'
                        ? ['Quyền lợi y tế: 20 triệu đ', 'Tai nạn: 20 triệu đ', 'Nội địa Việt Nam', 'Hỗ trợ khẩn cấp']
                        : ['Quyền lợi tai nạn: 30 tháng lương', 'Y tế tai nạn: 10 triệu đ', 'Lao động thông thường', 'Pháp lý doanh nghiệp']
                    },
                    {
                      id: 'plan-2',
                      title: product === 'elitecare' ? 'Elite Platinum' : product === 'travel_intl' ? 'Gói Bạc (Silver)' : 'Chương trình Phổ thông',
                      price: product === 'elitecare' ? '8.500.000 đ' : product === 'travel_intl' ? '550.000 đ' : product === 'travel_dom' ? '90.000 đ' : '280.000 đ',
                      popular: true,
                      coverages: product === 'elitecare'
                        ? ['Quyền lợi y tế: 5 tỷ đ', 'Phạm vi: Toàn cầu trừ Mỹ', 'Bảo lãnh cao cấp', 'Thai sản & Nha khoa full']
                        : product === 'travel_intl'
                        ? ['Quyền lợi y tế: $30,000', 'Phạm vi: Toàn cầu', 'Hoãn chuyến bay: $300', 'Hành lý thất lạc: $1,000']
                        : product === 'travel_dom'
                        ? ['Quyền lợi y tế: 50 triệu đ', 'Tai nạn: 50 triệu đ', 'Phạm vi: Toàn quốc', 'Cứu trợ 24/7']
                        : ['Quyền lợi tai nạn: 36 tháng lương', 'Y tế tai nạn: 20 triệu đ', 'Lao động kỹ thuật cao', 'Bồi thường trọn gói']
                    },
                    {
                      id: 'plan-3',
                      title: product === 'elitecare' ? 'Elite Diamond' : product === 'travel_intl' ? 'Gói Vàng (Gold)' : 'Chương trình VIP',
                      price: product === 'elitecare' ? '15.000.000 đ' : product === 'travel_intl' ? '950.000 đ' : product === 'travel_dom' ? '150.000 đ' : '450.000 đ',
                      coverages: product === 'elitecare'
                        ? ['Quyền lợi y tế: 10 tỷ đ', 'Phạm vi: Toàn cầu (Gồm Mỹ)', 'Hỗ trợ y tế khẩn cấp VIP', 'Nha khoa & Nhãn khoa VIP']
                        : product === 'travel_intl'
                        ? ['Quyền lợi y tế: $50,000', 'Phạm vi: Toàn cầu VIP', 'Hủy chuyến bay: $1,500', 'Mất hành lý/Hộ chiếu: $2,000']
                        : product === 'travel_dom'
                        ? ['Quyền lợi y tế: 100 triệu đ', 'Tai nạn: 100 triệu đ', 'Hỗ trợ cứu hộ trực thăng', 'Toàn bộ chi phí cứu thương']
                        : ['Quyền lợi tai nạn: 48 tháng lương', 'Y tế tai nạn: 50 triệu đ', 'Công trình nguy hiểm nhóm 3-4', 'Bảo đảm an sinh NLĐ']
                    }
                  ].map((plan) => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`relative p-5 rounded-3xl border text-left transition-all ${selectedPlanId === plan.id ? 'border-[#03377B] bg-blue-50/50 shadow-md ring-2 ring-[#03377B]/10' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                    >
                      {plan.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-sky-500 text-white text-[8px] font-black uppercase px-2.5 py-1 rounded-full tracking-widest shadow-md">
                          GÓI PHỔ BIẾN
                        </span>
                      )}
                      <span className="block font-black text-xs text-slate-800 mt-1">{plan.title}</span>
                      <span className="block text-lg font-black text-[#03377B] mt-1.5">{plan.price} <span className="text-[10px] font-medium text-slate-400">/ người</span></span>
                      
                      <div className="h-px bg-slate-100 my-3"></div>
                      <ul className="space-y-1.5 text-[10px] text-slate-500">
                        {plan.coverages.map((cov, idx) => (
                          <li key={idx} className="flex items-center gap-1.5 font-medium">
                            <span className="text-[#03377B] font-black">✓</span>
                            <span>{cov}</span>
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-2xl transition flex items-center gap-2 bg-white"
            >
              <ArrowLeft size={14} />
              <span>Quay lại bước 1</span>
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-6 py-3 bg-[#03377B] hover:bg-[#00285d] text-white text-xs font-black rounded-2xl transition flex items-center gap-1.5 shadow-lg shadow-blue-900/10"
            >
              <span>Tiếp theo: Tính phí chào giá</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────
           STEP 3: BẢNG CHÀO GIÁ & TÀI CHÍNH
         ────────────────────────────────────────────────── */}
      {step === 3 && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white/45 backdrop-blur-xl p-6 rounded-3xl border border-white/80 shadow-[0_20px_50px_rgba(15,23,42,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-800">Báo giá & Phí bảo hiểm tạm tính</h3>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Bảng chi tiết tài chính bao gồm thuế VAT và các khoản thù lao được chiết khấu trực tiếp.</p>
              </div>

              {/* Fee breakdown details table */}
              <div className="bg-slate-50/60 rounded-2xl border border-slate-100 p-4 space-y-3.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Quy mô nhân sự</span>
                  <span className="font-extrabold text-slate-700">{headcount} người</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Đơn giá định mức / đầu người</span>
                  <span className="font-extrabold text-slate-700">{pricing.pricePerHead.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Tổng phí bảo hiểm gốc</span>
                  <span className="font-extrabold text-slate-700">{pricing.rawTotal.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Thuế VAT (10%)</span>
                  <span className="font-extrabold text-slate-700">{pricing.vat.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span className="font-medium">Chiết khấu ưu đãi nhóm (5%)</span>
                  <span>- {pricing.discount.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between text-amber-600 font-bold border-t border-dashed border-slate-200 pt-3">
                  <span className="font-medium">Thù lao của Cán bộ (15% chiết khấu đại lý)</span>
                  <span>+ {pricing.commission.toLocaleString('vi-VN')} đ</span>
                </div>
                
                <div className="h-px bg-slate-200/60 my-4"></div>

                <div className="flex justify-between items-center bg-[#03377B]/5 p-3.5 rounded-xl border border-[#03377B]/10">
                  <span className="text-[#03377B] font-black text-xs">TỔNG PHÍ KHÁCH HÀNG THANH TOÁN</span>
                  <span className="text-lg font-black text-[#03377B] font-mono">
                    {pricing.totalWithVat.toLocaleString('vi-VN')} đ
                  </span>
                </div>
              </div>
            </div>

            {/* Quyền lợi tóm tắt preview card on the right */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="bg-white/80 border border-slate-100 p-5 rounded-2xl shadow-sm space-y-4 flex-1">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Tóm tắt Chương trình xuất bảo hiểm</span>
                <div>
                  <h4 className="font-black text-xs text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>{meta.title}</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Áp dụng thời hạn chuẩn bảo hiểm 1 năm kể từ {startDate}</p>
                </div>

                <div className="space-y-2 text-[10px] text-slate-600">
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="font-medium text-slate-400">Doanh nghiệp</span>
                    <span className="font-bold text-slate-700 text-right max-w-[150px] truncate">{companyName || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="font-medium text-slate-400">Nhân sự tham gia</span>
                    <span className="font-bold text-slate-700">{headcount} thành viên</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="font-medium text-slate-400">Quy tắc bảo hiểm</span>
                    <span className="font-bold text-slate-700">{meta.rule}</span>
                  </div>
                </div>

                <div className="bg-emerald-50 text-emerald-700 text-[10px] font-bold p-3 rounded-xl border border-emerald-100 flex gap-2">
                  <span>✓</span>
                  <span>Báo giá chào phí của iPTI tự động khóa hiệu lực trong 30 ngày. Cán bộ CA có thể in chào giá cứng gửi HR.</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert('Đang khởi tạo tệp PDF Bảng Chào giá... Tải xuống sẽ bắt đầu trong giây lát.')}
                className="w-full py-3 border-2 border-dashed border-[#03377B]/30 hover:border-[#03377B] text-[#03377B] hover:bg-blue-50/50 text-xs font-black rounded-2xl transition flex items-center justify-center gap-1.5"
              >
                <Download size={14} />
                <span>XUẤT BẢO GIÁ CHÀO PHÍ (PDF)</span>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-2xl transition flex items-center gap-2 bg-white"
            >
              <ArrowLeft size={14} />
              <span>Quay lại bước 2</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setStep(4);
                // Trigger simulated excel loading
                setTimeout(() => setExcelUploaded(true), 1000);
              }}
              className="px-6 py-3 bg-[#03377B] hover:bg-[#00285d] text-white text-xs font-black rounded-2xl transition flex items-center gap-1.5 shadow-lg shadow-blue-900/10"
            >
              <span>Chấp nhận & Tải danh sách</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────
           STEP 4: DANH SÁCH NHÂN VIÊN & LỌC NGOẠI LỆ
         ────────────────────────────────────────────────── */}
      {step === 4 && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white/45 backdrop-blur-xl p-6 rounded-3xl border border-white/80 shadow-[0_20px_50px_rgba(15,23,42,0.03)] space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-800">Tải lên danh sách Nhân sự tham gia bảo hiểm</h3>
              <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Nhập tệp Excel thông tin nhân viên (Họ tên, Ngày sinh, CCCD, Giới tính) để thẩm định tự động.</p>
            </div>

            {/* Drag & Drop File Upload Area */}
            <div className="border-2 border-dashed border-slate-200 bg-slate-50/40 rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-3 hover:border-[#03377B]/50 transition cursor-pointer">
              <div className="p-3.5 bg-blue-50 text-[#03377B] rounded-2xl">
                <UploadCloud size={24} className="stroke-[2]" />
              </div>
              <div>
                <span className="font-extrabold text-xs text-slate-800 block">Kéo và thả tệp Excel danh sách ở đây</span>
                <span className="text-[10px] text-slate-400 block mt-1">Hỗ trợ các định dạng .xlsx, .xls tiêu chuẩn tối đa 10MB</span>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" className="px-3 py-1.5 bg-[#03377B] text-white font-bold text-[10px] rounded-lg">Chọn tệp từ máy</button>
                <button type="button" className="px-3 py-1.5 border border-slate-200 bg-white text-slate-600 font-bold text-[10px] rounded-lg hover:bg-slate-50">Tải mẫu Excel chuẩn</button>
              </div>
            </div>

            {/* Simulated interactive Exception list */}
            {excelUploaded && exceptions.length > 0 && (
              <div className="space-y-3.5">
                <div className="p-3 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-2.5">
                  <AlertTriangle size={16} className="text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-extrabold text-rose-800 block">Phát hiện {exceptions.length} ngoại lệ nhân viên chưa hợp lệ!</span>
                    <span className="text-[10px] text-rose-600/90 block mt-0.5">Mã số CCCD bị trùng, thiếu dữ liệu bắt buộc hoặc vượt quá độ tuổi bảo hiểm quy định (65 tuổi). Vui lòng xử lý để tiếp tục.</span>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-100">
                  <table className="w-full text-xs text-left min-w-[500px]">
                    <thead className="bg-slate-50 font-bold text-slate-400">
                      <tr>
                        <th className="py-2.5 px-3 text-[10px] tracking-wide uppercase">Họ và tên</th>
                        <th className="py-2.5 px-3 text-[10px] tracking-wide uppercase">Số CCCD</th>
                        <th className="py-2.5 px-3 text-[10px] tracking-wide uppercase">Ngày sinh</th>
                        <th className="py-2.5 px-3 text-[10px] tracking-wide uppercase">Lý do lỗi ngoại lệ</th>
                        <th className="py-2.5 px-3 text-[10px] tracking-wide uppercase text-right">Hành động khắc phục</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-semibold">
                      {exceptions.map((exc) => (
                        <tr key={exc.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-3 text-slate-800">{exc.name}</td>
                          <td className="py-3 px-3 text-slate-500 font-mono">{exc.cccd}</td>
                          <td className="py-3 px-3 text-slate-500 font-mono">{exc.dob}</td>
                          <td className="py-3 px-3">
                            <span className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-black border ${
                              exc.type === 'resolved' 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                : exc.type === 'dup'
                                ? 'bg-amber-50 text-amber-700 border-amber-100'
                                : exc.type === 'miss'
                                ? 'bg-orange-50 text-orange-700 border-orange-100'
                                : 'bg-rose-50 text-rose-700 border-rose-100'
                            }`}>
                              {exc.reason}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            {exc.type === 'resolved' ? (
                              <span className="text-emerald-500 font-bold text-[10px] pr-2">✓ Đã khắc phục</span>
                            ) : (
                              <div className="inline-flex gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleResolveException(exc.id, 'fix')}
                                  className="px-2 py-1 bg-blue-50 hover:bg-blue-100 border border-blue-100 text-[#03377B] text-[9px] font-black rounded-md"
                                >
                                  {exc.type === 'miss' ? 'Bổ sung' : 'Sửa'}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleResolveException(exc.id, 'delete')}
                                  className="px-2 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-600 text-[9px] font-black rounded-md"
                                >
                                  Loại bỏ
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-3">
              <div className="p-2 bg-emerald-500 text-white rounded-xl">
                <CheckCircle2 size={16} />
              </div>
              <div className="text-xs font-semibold text-emerald-800">
                <span>Danh sách hợp lệ: <strong>{headcount - (exceptions.filter(e => e.type !== 'resolved').length)}</strong> / {headcount} thành viên đã được phê duyệt tự động.</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-2xl transition flex items-center gap-2 bg-white"
            >
              <ArrowLeft size={14} />
              <span>Quay lại bước 3</span>
            </button>
            <button
              type="button"
              disabled={exceptions.filter(e => e.type !== 'resolved').length > 0}
              onClick={() => setStep(5)}
              className={`px-6 py-3 text-xs font-black rounded-2xl transition flex items-center gap-1.5 shadow-lg ${
                exceptions.filter(e => e.type !== 'resolved').length > 0
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-[#03377B] hover:bg-[#00285d] text-white shadow-blue-900/10'
              }`}
            >
              <span>Tiếp theo: Đơn hàng & Thanh toán</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────
           STEP 5: THÔNG TIN XUẤT HÓA ĐƠN & THANH TOÁN
         ────────────────────────────────────────────────── */}
      {step === 5 && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white/45 backdrop-blur-xl p-6 rounded-3xl border border-white/80 shadow-[0_20px_50px_rgba(15,23,42,0.03)] space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-800">Thông tin xuất hóa đơn & Kênh thanh toán</h3>
              <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Chọn phương thức xuất hóa đơn giá trị gia tăng VAT và thực hiện quét mã thanh toán số hóa.</p>
            </div>

            <div className="space-y-3.5">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Loại hình hóa đơn tài chính</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'none', label: 'Thanh toán tức thì', desc: 'Không xuất hóa đơn điện tử VAT' },
                  { id: 'buyer', label: 'Hóa đơn cho Doanh nghiệp', desc: 'Xuất theo MST mua hàng đã kê khai' },
                  { id: 'employee', label: 'Hóa đơn cho cá nhân', desc: 'Chia nhỏ hóa đơn cho từng nhân sự' }
                ].map((type) => (
                  <label key={type.id} className="flex items-start gap-3 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 cursor-pointer hover:bg-white transition-all">
                    <input
                      type="radio"
                      name="invoice_type"
                      defaultChecked={type.id === 'buyer'}
                      className="mt-1 text-[#03377B] focus:ring-[#03377B]"
                    />
                    <div>
                      <span className="font-extrabold text-xs text-slate-800 block">{type.label}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{type.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment methods choice */}
            <div className="space-y-4 pt-2">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Phương thức thanh toán trực tuyến</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('qr')}
                  className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${paymentMethod === 'qr' ? 'border-[#03377B] bg-blue-50/50 shadow-md' : 'border-slate-200 bg-white'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 text-[#03377B] rounded-xl">
                      <Smartphone size={18} />
                    </div>
                    <div>
                      <span className="font-black text-xs text-slate-800 block">Quét mã VietQR nhanh</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Thanh toán chuyển khoản 24/7 tự động</span>
                    </div>
                  </div>
                  {paymentMethod === 'qr' && <span className="text-[#03377B] font-black text-xs">✓ Đang chọn</span>}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${paymentMethod === 'bank' ? 'border-[#03377B] bg-blue-50/50 shadow-md' : 'border-slate-200 bg-white'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 text-[#03377B] rounded-xl">
                      <CreditCard size={18} />
                    </div>
                    <div>
                      <span className="font-black text-xs text-slate-800 block">Chuyển khoản Ngân hàng thủ công</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Xác thực chứng từ sau 10-30 phút</span>
                    </div>
                  </div>
                  {paymentMethod === 'bank' && <span className="text-[#03377B] font-black text-xs">✓ Đang chọn</span>}
                </button>
              </div>
            </div>

            {/* QR/Bank payment detail boxes */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 flex flex-col items-center justify-center">
              {paymentMethod === 'qr' ? (
                <div className="text-center space-y-3.5 max-w-[280px] w-full bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
                  <span className="inline-block text-[9px] font-black bg-emerald-500 text-white px-2.5 py-0.5 rounded-full uppercase tracking-widest">VIETQR CẤP ĐƠN</span>
                  
                  {/* Mock beautiful QR Image code placeholder */}
                  <div className="w-40 h-40 bg-gradient-to-tr from-sky-50 to-blue-50 border border-slate-100 rounded-2xl mx-auto flex flex-col items-center justify-center p-3 relative overflow-hidden">
                    {/* Corner markings for QR scan frame */}
                    <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#03377B]"></div>
                    <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#03377B]"></div>
                    <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#03377B]"></div>
                    <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#03377B]"></div>
                    {/* Inner graphic */}
                    <span className="text-3xl">📱</span>
                    <span className="text-[9px] font-bold text-[#03377B] uppercase mt-2">PTI AUTO-PAY</span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-slate-400 font-medium text-[10px] block">Số tiền cần thanh toán</span>
                    <span className="text-lg font-black text-[#03377B] block font-mono">{pricing.totalWithVat.toLocaleString('vi-VN')} đ</span>
                  </div>
                  <p className="text-[9px] text-slate-400 font-medium">Quét mã bằng app Ngân hàng bất kỳ. Hợp đồng phát hành ngay sau khi chuyển tiền thành công.</p>
                </div>
              ) : (
                <div className="w-full text-xs space-y-2.5 p-2">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Thông tin chuyển khoản ngân hàng</span>
                  <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-3 font-semibold text-slate-600">
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                      <span className="text-slate-400 font-medium">Ngân hàng thụ hưởng</span>
                      <span className="text-slate-800">Vietcombank - Chi nhánh Hà Nội</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                      <span className="text-slate-400 font-medium">Số tài khoản (STK)</span>
                      <span className="text-slate-800 font-mono flex items-center gap-1.5">
                        0011004567890
                        <button type="button" onClick={() => alert('Đã sao chép số tài khoản')} className="text-[#03377B] text-[10px] bg-blue-50 px-1.5 py-0.5 rounded">Copy</button>
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                      <span className="text-slate-400 font-medium">Chủ tài khoản</span>
                      <span className="text-slate-800">TỔNG CÔNG TY CỔ PHẦN BẢO HIỂM BƯU ĐIỆN (PTI)</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                      <span className="text-slate-400 font-medium">Nội dung chuyển khoản</span>
                      <span className="text-[#03377B] font-mono flex items-center gap-1.5">
                        {`PTI-PAY-${product.toUpperCase().slice(0,3)}-2026`}
                        <button type="button" onClick={() => alert('Đã sao chép nội dung')} className="text-[#03377B] text-[10px] bg-blue-50 px-1.5 py-0.5 rounded">Copy</button>
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-blue-50/50 p-2.5 rounded-xl border border-blue-100 pt-2">
                      <span className="text-slate-500 font-medium text-[10px]">Cần thanh toán chính xác</span>
                      <span className="text-[#03377B] font-black font-mono text-sm">{pricing.totalWithVat.toLocaleString('vi-VN')} đ</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setStep(4)}
              className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-2xl transition flex items-center gap-2 bg-white"
            >
              <ArrowLeft size={14} />
              <span>Quay lại bước 4</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsPaid(true);
                setStep(6);
              }}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-2xl transition flex items-center gap-1.5 shadow-lg shadow-emerald-900/10"
            >
              <Check size={14} className="stroke-[3]" />
              <span>Xác nhận Đã hoàn tất thanh toán</span>
            </button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────
           STEP 6: HOÀN TẤT & CẤP THẺ ĐIỆN TỬ
         ────────────────────────────────────────────────── */}
      {step === 6 && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white/45 backdrop-blur-xl p-8 rounded-3xl border border-white/80 shadow-[0_20px_50px_rgba(15,23,42,0.03)] text-center space-y-6 max-w-xl mx-auto">
            <div className="w-20 h-20 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 rounded-full mx-auto flex items-center justify-center text-4xl animate-bounce">
              🎉
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-900">PHÁT HÀNH HỢP ĐỒNG THÀNH CÔNG!</h3>
              <p className="text-xs text-slate-500">Hợp đồng điện tử đã được phê duyệt tự động và phát hành hóa đơn VAT cho đối tác.</p>
            </div>

            {/* Contract credentials dashboard */}
            <div className="bg-slate-50/60 rounded-2xl border border-slate-100 p-5 text-xs text-left space-y-3 font-semibold text-slate-600">
              <div className="flex justify-between border-b border-slate-100/50 pb-2">
                <span className="text-slate-400 font-medium">Mã số Hợp đồng</span>
                <span className="text-slate-800 font-mono font-black">{`PTI-${product.toUpperCase().slice(0,3)}-2026-${Math.floor(1000 + Math.random() * 9000)}`}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100/50 pb-2">
                <span className="text-slate-400 font-medium">Bên mua bảo hiểm</span>
                <span className="text-slate-800 text-right max-w-[200px] truncate">{companyName || 'Doanh nghiệp Khai thác Mới'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100/50 pb-2">
                <span className="text-slate-400 font-medium">Số lượng nhân viên</span>
                <span className="text-slate-800">{headcount} thành viên</span>
              </div>
              <div className="flex justify-between border-b border-slate-100/50 pb-2">
                <span className="text-slate-400 font-medium">Tổng phí thực thu (Đã gồm thuế)</span>
                <span className="text-[#03377B] font-black font-mono text-sm">{pricing.totalWithVat.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Trạng thái phát hành</span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 text-[10px]">ĐÃ KÍCH HOẠT THẺ E-CARD</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5 text-xs">
              <button
                type="button"
                onClick={() => alert('Đang tải xuống bộ hợp đồng PDF đầy đủ bao gồm chứng nhận bảo hiểm từng người...')}
                className="py-3 px-4 border border-slate-200 bg-white hover:bg-slate-50 rounded-2xl flex items-center justify-center gap-2 font-bold text-slate-700 shadow-sm transition"
              >
                <Printer size={15} className="text-[#03377B]" />
                <span>In hợp đồng điện tử</span>
              </button>
              <button
                type="button"
                onClick={() => alert('Đang gửi email mã số thẻ Bảo lãnh viện phí điện tử cho toàn thể nhân sự...')}
                className="py-3 px-4 border border-[#03377B]/20 bg-[#03377B]/5 hover:bg-[#03377B]/10 rounded-2xl flex items-center justify-center gap-2 font-black text-[#03377B] shadow-sm transition"
              >
                <Smartphone size={15} />
                <span>Gửi Thẻ e-Card (SMS/Viber)</span>
              </button>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleFinish}
                className="w-full py-3.5 bg-[#03377B] hover:bg-[#00285d] text-white text-xs font-black rounded-2xl shadow-xl shadow-blue-900/10 transition"
              >
                Hoàn tất & Lưu trữ hồ sơ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
