/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Users, 
  Award, 
  DollarSign, 
  Check, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  Smartphone, 
  Search, 
  FileText, 
  Sparkles, 
  UploadCloud, 
  Upload, 
  AlertTriangle, 
  CreditCard, 
  ArrowLeft, 
  ArrowRight, 
  Home, 
  LogOut, 
  Bell, 
  Settings, 
  QrCode, 
  Printer, 
  Download, 
  RefreshCw, 
  FileSpreadsheet, 
  UserCheck, 
  ChevronRight, 
  Fingerprint, 
  FileCheck,
  Clock,
  Trash2,
  Mail,
  Send,
  Maximize2,
  ShieldAlert
} from 'lucide-react';

import { 
  UserRole, 
  CompanyInfo, 
  GroupSizeInfo, 
  InsuranceProgram, 
  EmployeeTier, 
  InsuredEmployee, 
  InvoiceInfo,
  QuoteVersion
} from './types';

import BiometricModal from './components/BiometricModal';
import RegisterModal from './components/RegisterModal';
import QuotationCalculator from './components/QuotationCalculator';
import UnderwritingPanel from './components/UnderwritingPanel';
import ContractReview from './components/ContractReview';
import UnifiedIssuanceFlow from './components/UnifiedIssuanceFlow';
import { 
  Accident3D, 
  TravelIntl3D, 
  TravelDom3D, 
  HealthPti3D, 
  EliteCare3D, 
  WorkersComp3D,
  PersonalBanner3D,
  CorporateBanner3D
} from './components/ThreeDGraphics';

// Static programs list based on rules
const PROGRAMS: InsuranceProgram[] = [
  {
    id: 'ct-1',
    name: 'Chương trình 1',
    tierLabel: 'Hạng Đồng (Bronze)',
    accidentBenefit: '50.000.000 đ',
    accidentMedical: '10.000.000 đ',
    inpatientBenefit: '150.000.000 đ',
    outpatientBenefit: '6.000.000 đ',
    maternityBenefit: 'Không áp dụng',
    dentalBenefit: 'Không áp dụng',
    ratePerHead: 1200000
  },
  {
    id: 'ct-2',
    name: 'Chương trình 2',
    tierLabel: 'Hạng Bạc (Silver)',
    accidentBenefit: '100.000.000 đ',
    accidentMedical: '20.000.000 đ',
    inpatientBenefit: '250.000.000 đ',
    outpatientBenefit: '10.000.000 đ',
    maternityBenefit: '15.000.000 đ',
    dentalBenefit: '2.000.000 đ',
    ratePerHead: 2400000
  },
  {
    id: 'ct-3',
    name: 'Chương trình 3',
    tierLabel: 'Hạng Vàng (Gold)',
    accidentBenefit: '200.000.000 đ',
    accidentMedical: '40.000.000 đ',
    inpatientBenefit: '400.000.000 đ',
    outpatientBenefit: '20.000.000 đ',
    maternityBenefit: '30.000.000 đ',
    dentalBenefit: '5.000.000 đ',
    ratePerHead: 4800000
  }
];

// Dynamic estimated range calculation based on package and industry risk factor
const getEstimatedRange = (programId: string, industry: string) => {
  let base = 1200000;
  if (programId === 'ct-2') base = 2400000;
  if (programId === 'ct-3') base = 4800000;

  // Industry risk loading factors
  let factorMin = 0.95;
  let factorMax = 1.10;

  if (industry === 'Xây dựng / Bất động sản' || industry === 'Sản xuất / Chế biến') {
    factorMin = 1.05;
    factorMax = 1.25;
  } else if (industry === 'Công nghệ thông tin / Phần mềm' || industry === 'Tài chính / Ngân hàng / Bảo hiểm' || industry === 'Y tế / Dược phẩm') {
    factorMin = 0.90;
    factorMax = 1.05;
  }

  const minVal = Math.round((base * factorMin) / 10000) * 10000;
  const maxVal = Math.round((base * factorMax) / 10000) * 10000;

  return { min: minVal, max: maxVal };
};

// Elegant, crisp pure SVG representation of the iPTI Premium logo matching the attached design
export function IptiLogo({ className = "h-8", light = false }: { className?: string; light?: boolean }) {
  const textColor = light ? "#FFFFFF" : "#03377B";
  const separatorColor = light ? "rgba(255,255,255,0.4)" : "#03377B";
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <svg className="h-9 w-auto" viewBox="0 0 320 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 'i' orange letter */}
        <path d="M22 28.5C22 25.5 24.5 23 27.5 23C30.5 23 33 25.5 33 28.5C33 31.5 30.5 34 27.5 34C24.5 34 22 31.5 22 28.5Z" fill="#F48220" />
        <path d="M18 42C18 39.5 20.5 38 23 38C25.5 38 27.5 40 27.5 42.5V59C27.5 61.5 25.5 63 23 63C20.5 63 18 61 18 59V42Z" fill="#F48220" />
        <path d="M12 43.5C12 43.5 13.5 40 18 38C22.5 36 28 37 31 40C34 43 33 49 28 53C23 57 16 63 12 65" stroke="#F48220" strokeWidth="3" strokeLinecap="round" />
        
        {/* orange arc over pt */}
        <path d="M38 22C48 12 72 12 84 22" stroke="#F48220" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* 'p' blue letter */}
        <path d="M38 38H45V68C45 71 43 73 40 73C37 73 35 71 35 68V42C35 40 36 38 38 38Z" fill={textColor} />
        <circle cx="53" cy="48" r="7" fill="#F48220" />
        <path d="M53 38C59 38 64 43 64 49C64 55 59 60 53 60C48 60 44 56 44 50" stroke={textColor} strokeWidth="3.5" fill="none" />

        {/* 't' blue letter */}
        <path d="M72 32V60C72 63 74 64 77 64C79 64 81 63 81 61" stroke={textColor} strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M68 38H78" stroke={textColor} strokeWidth="4" strokeLinecap="round" />

        {/* 'i' blue letter */}
        <circle cx="90" cy="28.5" r="3.5" fill={textColor} />
        <path d="M90 38V60" stroke={textColor} strokeWidth="4" strokeLinecap="round" />

        {/* vertical separator */}
        <line x1="112" y1="20" x2="112" y2="64" stroke={separatorColor} strokeWidth="1.5" />

        {/* 'Premium' text */}
        <text x="128" y="55" fill={textColor} fontFamily="Inter, sans-serif" fontWeight="900" fontSize="30" letterSpacing="-0.5">Premium</text>
      </svg>
    </div>
  );
}

export default function App() {
  // Authentication & Role
  const [user, setUser] = useState<{ name: string; username: string; role: UserRole } | null>(null);
  const [usernameInput, setUsernameInput] = useState('CA-00123');
  const [passwordInput, setPasswordInput] = useState('pti_ca_pass');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isBiometricOpen, setIsBiometricOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Active view state (0 = Dashboard, 1 to 8 = Wizard Steps)
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'listing' | 'pending' | 'history'>('dashboard');
  const [selectedProduct, setSelectedProduct] = useState<'accident' | 'travel_intl' | 'travel_dom' | 'health_pti' | 'elitecare' | 'workers_comp' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'personal' | 'corporate' | null>(null);
  const [portfolioTab, setPortfolioTab] = useState<'all' | 'draft' | 'completed'>('all');

  // Draft management views search, sort, filters and deletion confirmation
  const [draftSearch, setDraftSearch] = useState('');
  const [draftSort, setDraftSort] = useState<'newest' | 'oldest' | 'overdue'>('newest');
  const [draftFilter, setDraftFilter] = useState<'active' | 'archived'>('active');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Progressive information distribution: "Quick Quote" (Báo giá nhanh) & "Firm Quote" (Báo giá chính thức)
  const [quoteMode, setQuoteMode] = useState<'quick' | 'firm'>('quick');
  const [quickProgramId, setQuickProgramId] = useState<string>('ct-1');

  // Multi-step Application States
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: '',
    taxCode: '',
    industry: '',
    size: '',
    contactName: '',
    contactRole: '',
    phone: '',
    email: '',
    address: '',
    channel: 'Zalo'
  });

  const [groupSizeInfo, setGroupSizeInfo] = useState<GroupSizeInfo>({
    headcount: 10,
    femaleRatio: 45,
    averageAge: 32,
    ageBracket18_35: 60,
    ageBracket36_50: 30,
    ageBracket51_65: 10,
    prevInsurance: 'no',
    lossRatio: 0,
    budgetPerHead: 2000000,
    geography: 'Việt Nam',
    duration: '1 năm (tiêu chuẩn)'
  });

  const [tiers, setTiers] = useState<EmployeeTier[]>([
    { id: 'tier-1', name: 'Ban Điều Hành / Giám đốc', headcount: 1, selectedProgramId: 'ct-3' },
    { id: 'tier-2', name: 'Quản lý / Trưởng phòng', headcount: 2, selectedProgramId: 'ct-2' },
    { id: 'tier-3', name: 'Nhân viên phổ thông', headcount: 7, selectedProgramId: 'ct-1' }
  ]);

  const [employees, setEmployees] = useState<InsuredEmployee[]>([]);
  const [clientType, setClientType] = useState<'new' | 'renew' | 'non_continuous'>('new');

  const [discountRate, setDiscountRate] = useState<number>(5);
  const [commissionRate, setCommissionRate] = useState<number>(5);

  const [invoiceInfo, setInvoiceInfo] = useState<InvoiceInfo>({
    type: 'pay_now',
    buyerName: '',
    taxCode: '',
    address: '',
    email: ''
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'qr' | 'bank'>('qr');
  const [contractId, setContractId] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Quote Actions & Framework Contract State
  const [isSendingQuote, setIsSendingQuote] = useState(false);
  const [showQuoteSentSuccess, setShowQuoteSentSuccess] = useState(false);
  const [isDownloadingQuote, setIsDownloadingQuote] = useState(false);
  const [showQuoteDownloadSuccess, setShowQuoteDownloadSuccess] = useState(false);
  const [isFrameworkContractSigned, setIsFrameworkContractSigned] = useState(false);
  const [isSigningContract, setIsSigningContract] = useState(false);
  const [isReviewMailSending, setIsReviewMailSending] = useState(false);
  const [isReviewMailSent, setIsReviewMailSent] = useState(false);
  const [isOtpLinkSending, setIsOtpLinkSending] = useState(false);
  const [isOtpLinkSent, setIsOtpLinkSent] = useState(false);
  const [showFullContractModal, setShowFullContractModal] = useState(false);
  const [isDownloadingContract, setIsDownloadingContract] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [quoteSuccessType, setQuoteSuccessType] = useState<'email' | 'download'>('email');
  const [gpkdFileName, setGpkdFileName] = useState<string>('');
  const [excelFileName, setExcelFileName] = useState<string>('');

  // Quote Versioning & STP/MCV Approvals (Mindmap v5 & v6.3)
  const [quoteVersions, setQuoteVersions] = useState<QuoteVersion[]>([
    {
      id: 'v1.0.0',
      version: 'v1.0.0 (Gốc)',
      timestamp: '2026-07-07 10:15',
      tiers: [
        { id: 'tier-1', name: 'Ban Điều Hành / Giám đốc', headcount: 1, selectedProgramId: 'ct-3' },
        { id: 'tier-2', name: 'Quản lý / Trưởng phòng', headcount: 2, selectedProgramId: 'ct-2' },
        { id: 'tier-3', name: 'Nhân viên phổ thông', headcount: 7, selectedProgramId: 'ct-1' }
      ],
      discountRate: 5,
      commissionRate: 5,
      totalPremium: 17850000,
      status: 'Auto_Approved',
      createdBy: 'Hệ thống',
      notes: 'Khởi tạo báo giá ban đầu'
    }
  ]);
  const [quoteApprovalStatus, setQuoteApprovalStatus] = useState<'Auto_Approved' | 'Pending_Approval' | 'Supervisor_Approved' | 'Supervisor_Rejected'>('Auto_Approved');

  const handleCreateNewVersion = (notes: string) => {
    const basePremium = tiers.reduce((sum, tier) => {
      const prog = PROGRAMS.find(p => p.id === tier.selectedProgramId);
      const rate = prog ? prog.ratePerHead : 0;
      return sum + (tier.headcount * rate);
    }, 0);
    const discountAmount = Math.round((basePremium * discountRate) / 100);
    const finalPrem = basePremium - discountAmount;

    const isOutOfStandard = discountRate > 20 || tiers.some(t => 
      t.customInpatientBenefit !== undefined || 
      t.customOutpatientBenefit !== undefined || 
      t.customAccidentBenefit !== undefined || 
      t.customMaternityBenefit !== undefined
    );
    const status = isOutOfStandard ? 'Pending_Approval' : 'Auto_Approved';

    const newVersion: QuoteVersion = {
      id: `v1.${quoteVersions.length}.0`,
      version: `v1.${quoteVersions.length}.0`,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      tiers: JSON.parse(JSON.stringify(tiers)),
      discountRate,
      commissionRate,
      totalPremium: finalPrem,
      status,
      createdBy: 'CA - Thẩm định viên',
      notes
    };

    setQuoteVersions([newVersion, ...quoteVersions]);
    setQuoteApprovalStatus(status);
  };

  const handleRestoreVersion = (version: QuoteVersion) => {
    setTiers(JSON.parse(JSON.stringify(version.tiers)));
    setDiscountRate(version.discountRate);
    setCommissionRate(version.commissionRate);
    setQuoteApprovalStatus(version.status);
  };

  useEffect(() => {
    const isOutOfStandard = discountRate > 20 || tiers.some(t => 
      t.customInpatientBenefit !== undefined || 
      t.customOutpatientBenefit !== undefined || 
      t.customAccidentBenefit !== undefined || 
      t.customMaternityBenefit !== undefined
    );
    if (!isOutOfStandard) {
      setQuoteApprovalStatus('Auto_Approved');
    } else {
      if (quoteApprovalStatus === 'Auto_Approved') {
        setQuoteApprovalStatus('Pending_Approval');
      }
    }
  }, [discountRate, tiers]);

  // Fetching States
  const [isSearchingMst, setIsSearchingMst] = useState(false);
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);

  // Helper to compute relative time relative to 2026-07-05T23:17:37-07:00
  const getRelativeTime = (lastUpdatedStr: string) => {
    const now = new Date('2026-07-05T23:17:37-07:00').getTime();
    const updated = new Date(lastUpdatedStr).getTime();
    const diffMs = now - updated;
    if (isNaN(diffMs) || diffMs < 0) {
      return { text: 'Vừa xong', days: 0, isOverdue: false, isArchived: false };
    }
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      return {
        text: `${diffDays} ngày trước`,
        days: diffDays,
        isOverdue: diffDays > 7,
        isArchived: diffDays > 30
      };
    } else if (diffHrs > 0) {
      return {
        text: `${diffHrs} giờ trước`,
        days: 0,
        isOverdue: false,
        isArchived: false
      };
    } else {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return {
        text: diffMins > 0 ? `${diffMins} phút trước` : 'Vừa xong',
        days: 0,
        isOverdue: false,
        isArchived: false
      };
    }
  };

  // Past Contracts List (Drafts & Completed with local storage sync)
  const [draftContracts, setDraftContracts] = useState<any[]>(() => {
    const saved = localStorage.getItem('ipti_draft_contracts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { 
        id: 'PTI-CARE-DFT-2012', 
        company: 'Công ty Cổ phần VinaGroup', 
        taxCode: '0109283748', 
        date: '25/06/2026', 
        step: 3, 
        headcount: 24, 
        amount: 0, 
        lastUpdated: '2026-06-26T14:30:00-07:00',
        companyInfo: { name: 'Công ty Cổ phần VinaGroup', taxCode: '0109283748', industry: 'Xây dựng / Bất động sản', size: 'Nhỏ (dưới 50 NV)', contactName: 'Nguyễn Văn Đạt', contactRole: 'HR Manager', phone: '0912345678', email: 'dat.nguyen@vinagroup.com', address: 'Hải Châu, Đà Nẵng', channel: 'Zalo' },
        groupSizeInfo: { headcount: 24, femaleRatio: 40, averageAge: 35, ageBracket18_35: 50, ageBracket36_50: 40, ageBracket51_65: 10, prevInsurance: 'no', lossRatio: 0, budgetPerHead: 1500000, geography: 'Việt Nam', duration: '1 năm' }
      },
      { 
        id: 'PTI-CARE-DFT-1992', 
        company: 'Công ty TNHH Giải pháp TechDev', 
        taxCode: '0315928374', 
        date: '22/06/2026', 
        step: 6, 
        headcount: 12, 
        amount: 14500000, 
        lastUpdated: '2026-07-05T21:17:37-07:00',
        companyInfo: { name: 'Công ty TNHH Giải pháp TechDev', taxCode: '0315928374', industry: 'Công nghệ thông tin / Phần mềm', size: 'Nhỏ (dưới 50 NV)', contactName: 'Trần Minh Hoàng', contactRole: 'CEO', phone: '0987654321', email: 'hoang.tran@techdev.vn', address: 'Quận 3, TP. Hồ Chí Minh', channel: 'Email' },
        groupSizeInfo: { headcount: 12, femaleRatio: 30, averageAge: 29, ageBracket18_35: 70, ageBracket36_50: 25, ageBracket51_65: 5, prevInsurance: 'no', lossRatio: 0, budgetPerHead: 2500000, geography: 'Việt Nam', duration: '1 năm' }
      },
      {
        id: 'PTI-CARE-DFT-1080',
        company: 'Công ty Cổ phần Thép Việt',
        taxCode: '0293847561',
        date: '15/05/2026',
        step: 5,
        headcount: 35,
        amount: 42000000,
        lastUpdated: '2026-05-15T10:00:00-07:00',
        companyInfo: { name: 'Công ty Cổ phần Thép Việt', taxCode: '0293847561', industry: 'Sản xuất / Chế biến', size: 'Nhỏ (dưới 50 NV)', contactName: 'Lê Văn Thắng', contactRole: 'Giám đốc Nhân sự', phone: '0905123456', email: 'thang.le@thepviet.vn', address: 'KCN Sóng Thần, Bình Dương', channel: 'Zalo' },
        groupSizeInfo: { headcount: 35, femaleRatio: 15, averageAge: 40, ageBracket18_35: 30, ageBracket36_50: 50, ageBracket51_65: 20, prevInsurance: 'yes', lossRatio: 45, budgetPerHead: 1200000, geography: 'Việt Nam', duration: '1 năm' }
      }
    ];
  });

  const [completedContracts, setCompletedContracts] = useState<any[]>(() => {
    const saved = localStorage.getItem('ipti_completed_contracts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { id: 'PTI-2026-BHCN-00213', company: 'Công ty TNHH Logistic Đại Việt', taxCode: '0108229348', date: '18/06/2026', headcount: 45, premium: 98400000, status: 'Đã cấp thẻ' },
      { id: 'PTI-2026-BHCN-00194', company: 'Công ty Cổ phần Xây dựng Hòa Bình', taxCode: '0304928174', date: '10/06/2026', headcount: 120, premium: 254000000, status: 'Đã cấp thẻ' },
    ];
  });

  // Sync commission rate based on active logged-in user role
  useEffect(() => {
    if (user) {
      if (user.role === 'CA') {
        setCommissionRate(5); // Cán bộ kinh doanh hưởng thù lao 5% mặc định
      } else if (user.role === 'ICA') {
        setCommissionRate(10); // Đại lý 10%
      } else {
        setCommissionRate(15); // CTV 15%
      }
    }
  }, [user]);

  // Auto classification logic details
  const getAutoRecommendedProgram = () => {
    const budget = groupSizeInfo.budgetPerHead;
    if (budget >= 4000000) {
      return { id: 'ct-3', name: 'Chương trình 3', reason: 'Ngân sách cao tương thích Gói Vàng (Gold)' };
    } else if (budget >= 2000000) {
      return { id: 'ct-2', name: 'Chương trình 2', reason: 'Ngân sách trung bình tương thích Gói Bạc (Silver) đề xuất.' };
    } else {
      return { id: 'ct-1', name: 'Chương trình 1', reason: 'Ngân sách tiêu chuẩn tương thích Gói Đồng (Bronze)' };
    }
  };

  const recommendedProgram = getAutoRecommendedProgram();

  const getFirmQuoteCalculations = () => {
    // Determine the program base rate based on budget recommendation
    const recommended = getAutoRecommendedProgram();
    let baseRate = 2400000; // Default for ct-2 (Bạc)
    if (recommended.id === 'ct-1') baseRate = 1200000;
    if (recommended.id === 'ct-3') baseRate = 4800000;

    let loadingFactor = 1.0;
    const loadings: string[] = [];

    // 1. Industry loading
    if (companyInfo.industry === 'Xây dựng / Bất động sản' || companyInfo.industry === 'Sản xuất / Chế biến') {
      loadingFactor += 0.15;
      loadings.push('Phụ phí ngành rủi ro cao: +15%');
    } else if (companyInfo.industry === 'Công nghệ thông tin / Phần mềm' || companyInfo.industry === 'Tài chính / Ngân hàng / Bảo hiểm' || companyInfo.industry === 'Y tế / Dược phẩm') {
      loadingFactor -= 0.10;
      loadings.push('Ưu đãi ngành rủi ro thấp: -10%');
    }

    // 2. Average Age loading
    if (groupSizeInfo.averageAge > 45) {
      loadingFactor += 0.12;
      loadings.push('Phụ phí độ tuổi cao (>45 tuổi): +12%');
    } else if (groupSizeInfo.averageAge > 35) {
      loadingFactor += 0.05;
      loadings.push('Phụ phí độ tuổi (>35 tuổi): +5%');
    } else {
      loadings.push('Ưu đãi độ tuổi lao động trẻ: -5%');
      loadingFactor -= 0.05;
    }

    // 3. Female Ratio loading
    if (groupSizeInfo.femaleRatio > 55) {
      loadingFactor += 0.08;
      loadings.push('Phụ phí rủi ro thai sản (Nữ >55%): +8%');
    }

    // 4. Loss Ratio loading
    if (groupSizeInfo.prevInsurance === 'yes' && groupSizeInfo.lossRatio > 80) {
      const extra = (groupSizeInfo.lossRatio - 80) / 100;
      loadingFactor += extra;
      loadings.push(`Phụ phí lịch sử bồi thường xấu (>80%): +${Math.round(extra * 100)}%`);
    } else if (groupSizeInfo.prevInsurance === 'yes' && groupSizeInfo.lossRatio < 40) {
      loadingFactor -= 0.10;
      loadings.push('Ưu đãi lịch sử bồi thường tốt (<40%): -10%');
    }

    const ratePerHead = Math.round((baseRate * loadingFactor) / 1000) * 1000;
    const totalPremium = ratePerHead * groupSizeInfo.headcount;

    return { 
      ratePerHead, 
      totalPremium, 
      loadingPercentage: Math.round((loadingFactor - 1.0) * 100),
      loadings
    };
  };

  const handleSendQuoteEmail = () => {
    setIsSendingQuote(true);
    setQuoteSuccessType('email');
    // Save snapshot with audit trail as requested (Mindmap v6.3)
    handleCreateNewVersion('Tự động lưu: Đã gửi email báo giá cho đại diện doanh nghiệp');
    setTimeout(() => {
      setIsSendingQuote(false);
      setShowQuoteSentSuccess(true);
    }, 1500);
  };

  const handleDownloadQuotePdf = () => {
    setIsDownloadingQuote(true);
    setQuoteSuccessType('download');
    // Save snapshot with audit trail as requested (Mindmap v6.3)
    handleCreateNewVersion('Tự động lưu: Đại lý xuất/Tải báo giá dạng bản chào PDF');
    setTimeout(() => {
      setIsDownloadingQuote(false);
      setShowQuoteDownloadSuccess(true);
    }, 1800);
  };

  useEffect(() => {
    let timer: any;
    if (isOtpSent && otpCountdown > 0) {
      timer = setTimeout(() => {
        setOtpCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isOtpSent, otpCountdown]);

  const handleSendOtp = () => {
    setIsOtpSent(true);
    setOtpCountdown(60);
    alert(`Hệ thống iPTI đã gửi mã OTP gồm 6 chữ số đến số điện thoại ${companyInfo.phone || '0988 234 567'} của đại diện doanh nghiệp.`);
  };

  const handleSendReviewEmail = () => {
    setIsReviewMailSending(true);
    setTimeout(() => {
      setIsReviewMailSending(false);
      setIsReviewMailSent(true);
      alert(`Đã gửi email hợp đồng khung nháp đến Khách hàng tại địa chỉ: ${companyInfo.email || 'đại diện doanh nghiệp'} để duyệt trước.`);
    }, 1500);
  };

  const handleSendOtpLink = () => {
    setIsOtpLinkSending(true);
    setTimeout(() => {
      setIsOtpLinkSending(false);
      setIsOtpLinkSent(true);
      alert(`Hệ thống iPTI đã gửi SMS & Email chứa liên kết xác thực ký số OTP đến đại diện doanh nghiệp (${companyInfo.contactName || 'Khách hàng'} - ${companyInfo.phone || 'SĐT liên hệ'}).`);
    }, 1200);
  };

  const handleDownloadContractPdf = () => {
    setIsDownloadingContract(true);
    setTimeout(() => {
      setIsDownloadingContract(false);
      alert('Tải xuống bản hợp đồng khung PTI_CARE_FRAMEWORK_CONTRACT.PDF thành công!');
    }, 1200);
  };

  const handleRemindSign = () => {
    alert(`Đã gửi email & SMS thông báo nhắc ký số hợp đồng khung đến đại diện doanh nghiệp tại ${companyInfo.email || 'đại diện doanh nghiệp'}. Trạng thái hiện tại: Đang chờ khách hàng xác thực.`);
  };

  const handleMockCustomerSign = () => {
    setIsSigningContract(true);
    setTimeout(() => {
      setIsSigningContract(false);
      setIsFrameworkContractSigned(true);
      alert('Khách hàng đã xác thực OTP thành công. Hợp đồng khung đã chính thức được ký số điện tử!');
    }, 1500);
  };

  const handleSignContract = () => {
    if (!otpInput) {
      alert('Vui lòng nhập mã OTP để ký hợp đồng.');
      return;
    }
    if (otpInput.length !== 6) {
      alert('Mã OTP phải gồm 6 chữ số.');
      return;
    }
    setIsSigningContract(true);
    setTimeout(() => {
      setIsSigningContract(false);
      setIsFrameworkContractSigned(true);
      alert('Ký điện tử Hợp đồng khung bảo hiểm sức khỏe PTI Care thành công!');
    }, 1500);
  };

  // Mock Tax ID Lookup
  const handleLookupTaxId = () => {
    if (!companyInfo.taxCode) {
      alert('Vui lòng nhập Mã số thuế trước');
      return;
    }
    setIsSearchingMst(true);
    setTimeout(() => {
      setIsSearchingMst(false);
      setCompanyInfo({
        ...companyInfo,
        name: 'CÔNG TY CỔ PHẦN CÔNG NGHỆ VÀ TRUYỀN THÔNG VEO',
        address: 'Tầng 12, Tòa nhà Keangnam Landmark, Đường Phạm Hùng, Phường Mễ Trì, Quận Nam Từ Liêm, Hà Nội',
        industry: 'Công nghệ thông tin / Phần mềm',
        size: 'Vừa (50 – 200 NV)',
        contactName: 'Phạm Sơn Lâm',
        contactRole: 'Trưởng phòng Nhân sự',
        phone: '0988 234 567',
        email: 'hr.contact@veotech.vn'
      });
    }, 1500);
  };

  // Log in user with dynamic role assignment based on username prefix
  const handleLogin = () => {
    if (!usernameInput || !passwordInput) {
      alert('Vui lòng điền đầy đủ tên đăng nhập và mật khẩu');
      return;
    }
    const upperInput = usernameInput.toUpperCase();
    const role: UserRole = upperInput.includes('ICA') ? 'ICA' : upperInput.includes('CR') ? 'CR' : 'CA';
    setUser({
      name: role === 'CA' ? 'Nguyễn Văn An' : role === 'ICA' ? 'Đại lý Việt Phát' : 'Trần Thu Trang',
      username: usernameInput,
      role: role
    });
    setCurrentStep(0);
    setActiveTab('dashboard');
    setSelectedCategory(null);
    setPortfolioTab('all');
  };

  const handleBiometricLoginSuccess = () => {
    // Dynamically assign based on current input, defaulting to CA if empty
    const upperInput = usernameInput.toUpperCase();
    const role: UserRole = upperInput.includes('ICA') ? 'ICA' : upperInput.includes('CR') ? 'CR' : 'CA';
    setUser({
      name: role === 'CA' ? 'Nguyễn Văn An' : role === 'ICA' ? 'Đại lý Việt Phát' : 'Trần Thu Trang',
      username: role === 'CA' ? 'CA-00123' : role === 'ICA' ? 'ICA-9988' : 'CR-015',
      role: role
    });
    setCurrentStep(0);
    setActiveTab('dashboard');
    setSelectedCategory(null);
    setPortfolioTab('all');
  };

  const handleRegistrationSuccess = (phone: string, fullName: string) => {
    // Default to CA for registered custom eKYC users
    setUser({
      name: fullName,
      username: 'USER_' + phone.slice(-4),
      role: 'CA'
    });
    setCurrentStep(0);
    setActiveTab('dashboard');
    setSelectedCategory(null);
    setPortfolioTab('all');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentStep(0);
    setSelectedCategory(null);
    setPortfolioTab('all');
  };

  // Start new listing creation
  const handleStartNewListing = () => {
    // Generate new contract ID in the format of the draft (PTI-CARE-DFT-XXXX)
    const dftId = 'PTI-CARE-DFT-' + Math.floor(1000 + Math.random() * 9000);
    setContractId(dftId);
    setPolicyNumber('PTI-' + Math.floor(100000 + Math.random() * 900000));
    
    // Clear draft form inputs for fresh entry
    setCompanyInfo({
      name: '',
      taxCode: '',
      industry: '',
      size: '',
      contactName: '',
      contactRole: '',
      phone: '',
      email: '',
      address: '',
      channel: 'Zalo'
    });
    setEmployees([]);
    setInvoiceInfo({
      type: 'pay_now',
      buyerName: '',
      taxCode: '',
      address: '',
      email: ''
    });
    setIsPaid(false);
    
    setCurrentStep(1);
    setActiveTab('listing');
  };

  // Manual Save & Exit
  const saveDraftState = (isManualExit = false) => {
    if (!contractId) return;

    // Map 5 steps to 8 display steps
    let draftStepDisplay = 1;
    if (currentStep === 1) draftStepDisplay = 1;
    else if (currentStep === 2) draftStepDisplay = 3;
    else if (currentStep === 3) draftStepDisplay = 5;
    else if (currentStep === 4) draftStepDisplay = 6;
    else if (currentStep === 5) draftStepDisplay = 8;

    const estAmount = tiers.reduce((sum, tier) => {
      const prog = PROGRAMS.find(p => p.id === tier.selectedProgramId);
      return sum + (tier.headcount * (prog?.ratePerHead || 0));
    }, 0);

    const nowStr = new Date('2026-07-05T23:17:37-07:00').toISOString();

    setDraftContracts(prev => {
      const existingIdx = prev.findIndex(d => d.id === contractId);
      const draftData = {
        id: contractId,
        company: companyInfo.name || 'Công ty chưa đặt tên',
        taxCode: companyInfo.taxCode || '',
        date: existingIdx >= 0 ? prev[existingIdx].date : new Date('2026-07-05T23:17:37-07:00').toLocaleDateString('vi-VN'),
        step: draftStepDisplay,
        headcount: groupSizeInfo.headcount || 10,
        amount: estAmount,
        lastUpdated: nowStr,
        companyInfo,
        groupSizeInfo,
        tiers,
        employees,
        invoiceInfo,
        clientType,
        discountRate,
        commissionRate,
        selectedPaymentMethod,
        isPaid
      };

      const updated = [...prev];
      if (existingIdx >= 0) {
        updated[existingIdx] = draftData;
      } else {
        updated.unshift(draftData);
      }
      localStorage.setItem('ipti_draft_contracts', JSON.stringify(updated));
      return updated;
    });

    if (isManualExit) {
      setCurrentStep(0);
      setActiveTab('pending');
      setSelectedProduct(null);
    }
  };

  // Robust Auto-save debounced effect to automatically save form state changes to draftContracts
  useEffect(() => {
    if (currentStep > 0 && selectedProduct === 'health_pti' && contractId) {
      const timer = setTimeout(() => {
        let draftStepDisplay = 1;
        if (currentStep === 1) draftStepDisplay = 1;
        else if (currentStep === 2) draftStepDisplay = 3;
        else if (currentStep === 3) draftStepDisplay = 5;
        else if (currentStep === 4) draftStepDisplay = 6;
        else if (currentStep === 5) draftStepDisplay = 8;

        const estAmount = tiers.reduce((sum, tier) => {
          const prog = PROGRAMS.find(p => p.id === tier.selectedProgramId);
          return sum + (tier.headcount * (prog?.ratePerHead || 0));
        }, 0);

        const nowStr = new Date('2026-07-05T23:17:37-07:00').toISOString();

        setDraftContracts(prev => {
          const existingIdx = prev.findIndex(d => d.id === contractId);
          const draftData = {
            id: contractId,
            company: companyInfo.name || 'Công ty chưa đặt tên',
            taxCode: companyInfo.taxCode || '',
            date: existingIdx >= 0 ? prev[existingIdx].date : new Date('2026-07-05T23:17:37-07:00').toLocaleDateString('vi-VN'),
            step: draftStepDisplay,
            headcount: groupSizeInfo.headcount || 10,
            amount: estAmount,
            lastUpdated: nowStr,
            companyInfo,
            groupSizeInfo,
            tiers,
            employees,
            invoiceInfo,
            clientType,
            discountRate,
            commissionRate,
            selectedPaymentMethod,
            isPaid
          };

          const updated = [...prev];
          if (existingIdx >= 0) {
            const existing = updated[existingIdx];
            // Compare step, name, taxCode, headcount, and amount to avoid infinite loop renders
            if (existing.step !== draftStepDisplay || 
                existing.company !== draftData.company || 
                existing.taxCode !== draftData.taxCode || 
                existing.amount !== draftData.amount ||
                existing.headcount !== draftData.headcount) {
              updated[existingIdx] = draftData;
              localStorage.setItem('ipti_draft_contracts', JSON.stringify(updated));
              return updated;
            }
            return prev;
          } else {
            updated.unshift(draftData);
            localStorage.setItem('ipti_draft_contracts', JSON.stringify(updated));
            return updated;
          }
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, companyInfo.name, companyInfo.taxCode, groupSizeInfo.headcount, tiers, employees.length, contractId, selectedProduct]);

  // Resume Draft
  const handleResumeDraft = (draft: any) => {
    setContractId(draft.id);
    setPolicyNumber(draft.id.replace('DFT', 'POL') || 'PTI-' + Math.floor(100000 + Math.random() * 900000));
    
    if (draft.companyInfo) {
      setCompanyInfo(draft.companyInfo);
    } else {
      setCompanyInfo({
        name: draft.company,
        taxCode: draft.taxCode,
        industry: 'Công nghệ thông tin / Phần mềm',
        size: draft.headcount > 50 ? 'Vừa (50 – 200 NV)' : 'Nhỏ (dưới 50 NV)',
        contactName: 'Nguyễn Bích Ngọc',
        contactRole: 'CFO',
        phone: '0901234567',
        email: 'finance@' + draft.company.toLowerCase().split(' ').slice(-1) + '.vn',
        address: 'Quận 1, TP. Hồ Chí Minh',
        channel: 'Email'
      });
    }

    if (draft.groupSizeInfo) {
      setGroupSizeInfo(draft.groupSizeInfo);
    } else {
      setGroupSizeInfo({
        ...groupSizeInfo,
        headcount: draft.headcount
      });
    }

    if (draft.tiers) {
      setTiers(draft.tiers);
    } else {
      setTiers([
        { id: 'tier-1', name: 'Ban Điều Hành / Giám đốc', headcount: Math.round(draft.headcount * 0.1) || 1, selectedProgramId: 'ct-3' },
        { id: 'tier-2', name: 'Quản lý / Trưởng phòng', headcount: Math.round(draft.headcount * 0.2) || 2, selectedProgramId: 'ct-2' },
        { id: 'tier-3', name: 'Nhân viên phổ thông', headcount: draft.headcount - (Math.round(draft.headcount * 0.1) || 1) - (Math.round(draft.headcount * 0.2) || 2), selectedProgramId: 'ct-1' }
      ]);
    }

    if (draft.employees && draft.employees.length > 0) {
      setEmployees(draft.employees);
    } else {
      const mockEmps: InsuredEmployee[] = Array.from({ length: draft.headcount }).map((_, idx) => ({
        id: `emp-res-${idx}`,
        name: idx === 1 ? 'Lê Thị Thu Thủy' : idx === 3 ? 'Nguyễn Bích Ngọc' : `Thành viên số ${idx + 1}`,
        dob: '15/06/1990',
        cccd: `00109000${1000 + idx}`,
        gender: idx % 2 === 0 ? 'Nam' : 'Nữ',
        email: `emp${idx + 1}@draftcompany.com`,
        tierId: idx === 0 ? 'tier-1' : idx < 3 ? 'tier-2' : 'tier-3',
        healthStatus: (idx === 1 || idx === 3) ? 'Có rủi ro' : 'Sạch',
        hasPreExisting: idx === 1,
        hasHospitalized12m: idx === 3,
        hasOngoingTreatment: idx === 3,
        treatmentDetails: idx === 1 ? 'Rối loạn nhịp tim nhẹ' : idx === 3 ? 'Phẫu thuật u xơ tử cung tháng 2/2026' : '',
        underwritingAction: 'none'
      }));
      setEmployees(mockEmps);
    }

    if (draft.invoiceInfo) {
      setInvoiceInfo(draft.invoiceInfo);
    }
    if (draft.clientType) setClientType(draft.clientType);
    if (draft.discountRate !== undefined) setDiscountRate(draft.discountRate);
    if (draft.commissionRate !== undefined) setCommissionRate(draft.commissionRate);
    if (draft.selectedPaymentMethod) setSelectedPaymentMethod(draft.selectedPaymentMethod);
    if (draft.isPaid !== undefined) setIsPaid(draft.isPaid);

    // Remap step (1-8) to the new 5 steps
    const mappedStep = draft.step === 8 ? 5 : (draft.step === 7 || draft.step === 4 || draft.step === 3) ? 4 : draft.step === 6 ? 3 : draft.step === 5 ? 2 : 1;
    setCurrentStep(mappedStep);
    
    // Set active product and tab
    setSelectedProduct('health_pti');
    setActiveTab('listing');
  };

  // Step Validation & Forward (Streamlined 5-step flow)
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!companyInfo.name || !companyInfo.taxCode || !companyInfo.phone || !companyInfo.email) {
        alert('Vui lòng điền đầy đủ các thông tin bắt buộc (*)');
        return;
      }
      if (groupSizeInfo.headcount < 5) {
        alert('Số lượng nhân viên tối thiểu để cấp đơn nhóm PTI Care là 5 người');
        return;
      }

      // Pre-distribute the headcount into tiers and pre-generate employee list
      const currentTotal = tiers.reduce((s, t) => s + t.headcount, 0);
      if (currentTotal !== groupSizeInfo.headcount || employees.length === 0) {
        const exeCount = Math.round(groupSizeInfo.headcount * 0.1) || 1;
        const mgrCount = Math.round(groupSizeInfo.headcount * 0.2) || 2;
        const staffCount = groupSizeInfo.headcount - exeCount - mgrCount;
        
        setTiers([
          { id: 'tier-1', name: 'Ban Điều Hành / Giám đốc', headcount: exeCount, selectedProgramId: recommendedProgram.id },
          { id: 'tier-2', name: 'Quản lý / Trưởng phòng', headcount: mgrCount, selectedProgramId: recommendedProgram.id },
          { id: 'tier-3', name: 'Nhân viên phổ thông', headcount: staffCount, selectedProgramId: recommendedProgram.id }
        ]);

        // Auto generate demo employees
        const generated: InsuredEmployee[] = Array.from({ length: groupSizeInfo.headcount }).map((_, idx) => {
          let tId = 'tier-3';
          let pos = 'Nhân viên';
          if (idx === 0) {
            tId = 'tier-1';
            pos = 'Giám đốc Điều hành (CEO)';
          } else if (idx < exeCount) {
            tId = 'tier-1';
            pos = 'Thành viên Ban giám đốc';
          } else if (idx < exeCount + mgrCount) {
            tId = 'tier-2';
            pos = 'Trưởng phòng / Quản lý';
          }
          
          const names = ['Nguyễn Hoàng Nam', 'Phạm Minh Trí', 'Trần Thị Thúy', 'Hoàng Minh Tuấn', 'Nguyễn Hương Ly', 'Lê Văn Thắng', 'Đặng Kim Chi', 'Vũ Quốc Khánh', 'Phạm Thị Mai', 'Đỗ Anh Dũng'];
          const sampleName = names[idx % names.length] + (idx >= names.length ? ` (${idx - names.length + 1})` : '');
          
          // Make 2 of the employees have pre-existing health issues
          let exception: 'none' | 'mild' | 'severe' = 'none';
          let note = 'Sức khỏe bình thường';
          if (idx === 1) {
            exception = 'mild';
            note = 'Cận thị nặng';
          } else if (idx === 3) {
            exception = 'severe';
            note = 'Tiểu đường, Viêm gan B';
          }

          return {
            id: `emp-auto-${idx}`,
            name: sampleName,
            dob: '15/06/1990',
            cccd: `00109000${1000 + idx}`,
            gender: idx % 2 === 0 ? 'Nam' : 'Nữ',
            email: `emp${idx + 1}@${companyInfo.email.split('@')[1] || 'company.com'}`,
            tierId: tId,
            healthStatus: exception === 'none' ? 'Sạch' : exception === 'mild' ? 'Đang xử lý' : 'Có rủi ro',
            hasPreExisting: exception !== 'none',
            hasHospitalized12m: exception === 'severe',
            hasOngoingTreatment: exception === 'severe',
            treatmentDetails: note,
            underwritingAction: 'none'
          };
        });
        setEmployees(generated);
      }
    }

    if (currentStep === 3) {
      if (employees.length === 0) {
        alert('Vui lòng tải lên danh sách nhân viên để tiếp tục');
        return;
      }
    }

    if (currentStep === 4) {
      if (!isFrameworkContractSigned) {
        alert('Vui lòng thực hiện Ký điện tử Hợp đồng khung bằng OTP trước khi tiến hành Thanh toán!');
        return;
      }
    }

    if (currentStep === 5) {
      return;
    }

    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Submit Mock Payment
  const handleProcessPayment = () => {
    setIsSubmittingPayment(true);
    setTimeout(() => {
      setIsSubmittingPayment(false);
      setIsPaid(true);
      setShowSuccessPopup(true);
    }, 2000);
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    // Add to completed contracts list
    const finalAmount = tiers.reduce((sum, tier) => {
      const prog = PROGRAMS.find(p => p.id === tier.selectedProgramId);
      return sum + (tier.headcount * (prog?.ratePerHead || 0));
    }, 0);
    const disc = Math.round((finalAmount * discountRate) / 100);

    const newCompleted = [
      {
        id: policyNumber,
        company: companyInfo.name || 'Công ty Cổ phần VEO',
        taxCode: companyInfo.taxCode || '0102934827',
        date: new Date().toLocaleDateString('vi-VN'),
        headcount: employees.length || groupSizeInfo.headcount,
        premium: finalAmount - disc,
        status: 'Đã cấp thẻ'
      },
      ...completedContracts
    ];

    setCompletedContracts(newCompleted);
    localStorage.setItem('ipti_completed_contracts', JSON.stringify(newCompleted));

    // Clear and remove corresponding draft
    if (contractId) {
      const remainingDrafts = draftContracts.filter(d => d.id !== contractId);
      setDraftContracts(remainingDrafts);
      localStorage.setItem('ipti_draft_contracts', JSON.stringify(remainingDrafts));
    }

    // Go back to Dashboard step 0
    setCurrentStep(0);
    setActiveTab('dashboard');
  };

  const formatVnd = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div className="font-sans min-h-screen bg-slate-50 flex flex-col text-slate-800">
      
      {/* Modals */}
      <BiometricModal 
        isOpen={isBiometricOpen} 
        onClose={() => setIsBiometricOpen(false)} 
        onSuccess={handleBiometricLoginSuccess} 
      />
      <RegisterModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)} 
        onSuccess={handleRegistrationSuccess} 
      />

      {/* QUOTE ACTION SUCCESS OVERLAYS */}
      {showQuoteSentSuccess && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100 text-center space-y-4">
            <button
              onClick={() => setShowQuoteSentSuccess(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition text-sm font-black p-1"
            >
              ✕
            </button>
            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-[#03377B] mb-2 animate-bounce">
              <FileSpreadsheet size={32} />
            </div>

            <h3 className="text-lg font-black text-slate-800">Gửi Bản chào phí thành công!</h3>
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto">
              Hệ thống iPTI Premium đã gửi bản chào phí bảo hiểm sức khỏe PTI Care đến đại diện khách hàng doanh nghiệp:
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Khách hàng:</span>
                <span className="font-bold text-slate-800">{companyInfo.name || 'Công ty Cổ phần VEO'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Email nhận:</span>
                <span className="font-semibold text-slate-800">{companyInfo.email || 'hr@companyveo.vn'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Số điện thoại / Zalo:</span>
                <span className="font-semibold text-slate-800">{companyInfo.phone || '0988 234 567'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Kênh gửi:</span>
                <span className="font-bold text-blue-600 uppercase">E-Mail & Zalo Official</span>
              </div>
            </div>

            <p className="text-[10px] text-emerald-600 font-semibold italic">
              ✓ Đối tác đã nhận được tài liệu đính kèm bảng quyền lợi & bảng phí tải chi tiết.
            </p>

            <button
              type="button"
              onClick={() => setShowQuoteSentSuccess(false)}
              className="w-full py-2.5 bg-[#03377B] hover:bg-blue-800 text-white font-extrabold text-xs rounded-xl shadow-md transition"
            >
              HOÀN TẤT & ĐÓNG
            </button>
          </div>
        </div>
      )}

      {showQuoteDownloadSuccess && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100 text-center space-y-4">
            <button
              onClick={() => setShowQuoteDownloadSuccess(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition text-sm font-black p-1"
            >
              ✕
            </button>
            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-2 animate-bounce">
              <Download size={32} />
            </div>

            <h3 className="text-lg font-black text-slate-800">Tải xuống Bản chào phí thành công!</h3>
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto">
              File hồ sơ báo giá chính thức của doanh nghiệp đã được xuất bản dưới dạng file PDF đóng dấu số PTI.
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Tên tài liệu:</span>
                <span className="font-bold text-slate-800 text-right truncate max-w-[200px]">PTI_Care_Proposal_{companyInfo.name ? companyInfo.name.replace(/\s+/g, '_') : 'DoanhNghiep'}.pdf</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Dung lượng:</span>
                <span className="font-semibold text-slate-800">2.4 MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Thời gian xuất:</span>
                <span className="font-semibold text-slate-800">{new Date().toLocaleString('vi-VN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Trạng thái:</span>
                <span className="font-bold text-emerald-600 uppercase">Đã lưu về máy tính</span>
              </div>
            </div>

            <p className="text-[10px] text-amber-600 font-semibold italic">
              💡 Bạn có thể dùng file PDF này để in ấn hoặc gửi tay trực tiếp cho Ban Giám đốc Khách hàng.
            </p>

            <button
              type="button"
              onClick={() => setShowQuoteDownloadSuccess(false)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition"
            >
              HOÀN TẤT & ĐÓNG
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS POPUP AFTER PAYMENT */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-100 text-center space-y-4">
            <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mb-2 animate-bounce">
              <CheckCircle2 size={48} />
            </div>

            <h3 className="text-xl font-bold text-emerald-600">Phát hành Hợp đồng Thành công!</h3>
            <p className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed">
              Hợp đồng bảo hiểm sức khỏe nhóm <strong>PTI Care</strong> số <strong>{policyNumber}</strong> đã được thanh toán và kích hoạt thành công trên hệ thống iPTI.
            </p>

            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-slate-400">Đơn vị thụ hưởng:</span>
                <span className="font-bold text-slate-800">{companyInfo.name || 'Công ty Cổ phần VEO'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Mã số thuế:</span>
                <span className="font-mono font-bold text-slate-800">{companyInfo.taxCode || '0102934827'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Thời hạn bảo hiểm:</span>
                <span className="font-semibold text-slate-700">12 Tháng (Từ {new Date().toLocaleDateString('vi-VN')} đến {new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('vi-VN')})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tổng phí thanh toán:</span>
                <span className="font-bold text-emerald-600">
                  {formatVnd(
                    tiers.reduce((sum, tier) => {
                      const prog = PROGRAMS.find(p => p.id === tier.selectedProgramId);
                      return sum + (tier.headcount * (prog?.ratePerHead || 0));
                    }, 0) - Math.round((tiers.reduce((sum, tier) => {
                      const prog = PROGRAMS.find(p => p.id === tier.selectedProgramId);
                      return sum + (tier.headcount * (prog?.ratePerHead || 0));
                    }, 0) * discountRate) / 100)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-[#03377B] pt-1.5 border-t border-slate-200/60 font-semibold">
                <span>Trạng thái phát hành:</span>
                <span className="bg-blue-50 text-[#03377B] px-2 py-0.5 rounded font-bold text-[10px]">ĐÃ CẤP HỢP ĐỒNG & E-CARD</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  alert('Đang tải xuống bộ hợp đồng PDF và giấy chứng nhận bảo hiểm điện tử...');
                }}
                className="py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
              >
                <Download size={14} />
                <span>Tải Hợp đồng (.PDF)</span>
              </button>
              <button
                onClick={() => {
                  alert('Gửi e-card bảo hiểm sức khỏe điện tử thành công đến danh sách email nhân viên!');
                }}
                className="py-2 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
              >
                <FileCheck size={14} />
                <span>Gửi Thẻ điện tử (E-Card)</span>
              </button>
            </div>

            <button
              onClick={handleCloseSuccessPopup}
              className="w-full bg-[#03377B] hover:bg-blue-800 text-white font-bold py-2.5 rounded-xl text-sm transition shadow-md shadow-blue-900/10"
            >
              Quay lại Màn hình chính Dashboard
            </button>
          </div>
        </div>
      )}


      {/* ── VIEW 1: LOGIN PAGE (Unauthenticated) ── */}
      {!user ? (
        <div className="min-h-screen bg-gradient-to-tr from-[#000d1e] via-[#03377B] to-[#001c3d] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
          <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-white/10 animate-fade-in">
            
            {/* Left Column: Login Form */}
            <div className="p-8 sm:p-12 flex flex-col justify-between bg-white">
              <div className="space-y-6">
                
                {/* Logo area with brand SVG */}
                <div className="flex justify-start">
                  <IptiLogo className="h-10" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Đăng nhập tài khoản iPTI</h2>
                  <p className="text-slate-500 text-xs">Hệ thống cấp đơn listing kỹ thuật số sản phẩm Bảo hiểm Sức khỏe con người</p>
                </div>

                {/* Login Inputs */}
                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Tên đăng nhập / Số điện thoại *</label>
                    <input
                      type="text"
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      placeholder="Nhập tên đăng nhập hoặc số điện thoại"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#03377B] focus:bg-white transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Mật khẩu *</label>
                      <button
                        type="button"
                        onClick={() => alert('Vui lòng liên hệ Admin trung tâm CNTT iPTI Hotline 1900 54 54 75 để reset mật khẩu.')}
                        className="text-xs text-slate-400 hover:text-[#03377B] font-medium transition"
                      >
                        Quên mật khẩu?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="Nhập mật khẩu"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-sm outline-none focus:border-[#03377B] focus:bg-white transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                      >
                        {showPassword ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center text-xs font-semibold pt-1">
                    <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-slate-350 text-[#03377B] focus:ring-[#03377B]"
                      />
                      <span>Ghi nhớ tài khoản đăng nhập</span>
                    </label>
                  </div>

                  {/* Login Button */}
                  <button
                    type="button"
                    onClick={handleLogin}
                    className="w-full py-3 bg-[#03377B] hover:bg-[#02285a] text-white font-bold rounded-xl shadow-lg shadow-blue-900/10 transition duration-150 flex items-center justify-center gap-2 text-sm tracking-wide"
                  >
                    <span>ĐĂNG NHẬP</span>
                  </button>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                    <div className="relative flex justify-center text-[10px] font-bold text-slate-400 uppercase"><span className="bg-white px-3">Bạn chưa có tài khoản?</span></div>
                  </div>

                  {/* Registration button */}
                  <button
                    type="button"
                    onClick={() => setIsRegisterOpen(true)}
                    className="w-full py-2.5 px-3 border border-slate-200 hover:border-[#03377B] rounded-xl flex items-center justify-center gap-2 font-bold text-slate-700 bg-white hover:bg-slate-50 transition text-xs"
                  >
                    <Smartphone size={15} className="text-[#03377B]" />
                    <span>Đăng ký tài khoản mới</span>
                  </button>

                </div>
              </div>

              {/* Developer / Tester tips */}
              <div className="border-t border-slate-100 pt-4 mt-6">
                <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                  <span className="font-extrabold text-[#03377B]">💡 Gợi ý thử nghiệm:</span> Nhập tài khoản mặc định <span className="font-bold text-slate-600">CA-00123</span> / <span className="font-bold text-slate-600">pti_ca_pass</span> (Cán bộ kinh doanh), <span className="font-bold text-slate-600">ICA-9988</span> (Đại lý) hoặc <span className="font-bold text-slate-600">CR-015</span> (Cộng tác viên) để khám phá luồng phân quyền và tính hoa hồng.
                </p>
              </div>
            </div>

            {/* Right Column: Beautiful Graphic Illustration */}
            <div className="hidden md:flex bg-gradient-to-br from-[#001430] to-[#002D62] p-12 flex-col justify-between relative overflow-hidden text-white border-l border-white/5">
              
              {/* Decorative dynamic circles and glow effects in background */}
              <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"></div>
              <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl"></div>
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                {/* SVG pattern overlay */}
                <svg width="100%" height="100%"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>
              </div>

              {/* Illustration content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8">
                
                {/* Central Security Shield & Orbiting badges */}
                <div className="relative w-72 h-72 flex items-center justify-center">
                  
                  {/* Decorative orbital rings */}
                  <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_40s_linear_infinite]"></div>
                  <div className="absolute inset-6 border border-dashed border-white/15 rounded-full animate-[spin_25s_linear_infinite_reverse]"></div>
                  <div className="absolute inset-16 border border-white/5 rounded-full"></div>

                  {/* Main Glowing Shield (Center) */}
                  <div className="absolute z-20 w-40 h-40 bg-gradient-to-tr from-blue-400/20 to-sky-400/20 backdrop-blur-md border border-white/30 rounded-[2.5rem] shadow-[0_0_50px_rgba(59,130,246,0.25)] flex flex-col items-center justify-center p-4 text-center">
                    <div className="bg-gradient-to-tr from-[#03377B] to-[#001430] p-4 rounded-3xl shadow-inner border border-blue-400/40 mb-1.5">
                      <ShieldCheck className="w-12 h-12 text-blue-400 animate-pulse" />
                    </div>
                    <span className="text-xs font-black tracking-widest text-blue-300">iPTI Care</span>
                    <span className="text-[9px] font-bold text-white/70 uppercase">Bảo hiểm Sức khỏe</span>
                  </div>

                  {/* Connected Orbiting Badges */}
                  {/* 1. Health Badge */}
                  <div className="absolute top-1 left-12 z-20 bg-gradient-to-r from-blue-600 to-indigo-600 p-2.5 rounded-full border border-white/20 shadow-lg flex items-center justify-center hover:scale-110 transition cursor-pointer group" title="Bảo hiểm sức khỏe">
                    <Users className="w-5 h-5 text-white" />
                    <span className="absolute left-12 bg-slate-900/90 text-white text-[9px] font-bold px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition duration-150">Gói Nhóm (EB)</span>
                  </div>

                  {/* 2. Hospital Badge */}
                  <div className="absolute top-20 right-0 z-20 bg-gradient-to-r from-sky-500 to-indigo-600 p-2.5 rounded-full border border-white/20 shadow-lg flex items-center justify-center hover:scale-110 transition cursor-pointer group" title="Nội trú & Phẫu thuật">
                    <Building className="w-5 h-5 text-white" />
                    <span className="absolute right-12 bg-slate-900/90 text-white text-[9px] font-bold px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition duration-150">Bảo lãnh Viện phí</span>
                  </div>

                  {/* 3. Dental Badge */}
                  <div className="absolute bottom-12 right-6 z-20 bg-gradient-to-r from-indigo-600 to-blue-700 p-2.5 rounded-full border border-white/20 shadow-lg flex items-center justify-center hover:scale-110 transition cursor-pointer group" title="Nha khoa">
                    <Award className="w-5 h-5 text-white" />
                    <span className="absolute right-12 bg-slate-900/90 text-white text-[9px] font-bold px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition duration-150">Chăm sóc Răng</span>
                  </div>

                  {/* 4. Digital e-Card Badge */}
                  <div className="absolute bottom-16 left-2 z-20 bg-gradient-to-r from-[#03377B] to-sky-600 p-2.5 rounded-full border border-white/20 shadow-lg flex items-center justify-center hover:scale-110 transition cursor-pointer group" title="Thẻ bảo hiểm điện tử">
                    <Smartphone className="w-5 h-5 text-white" />
                    <span className="absolute left-12 bg-slate-900/90 text-white text-[9px] font-bold px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition duration-150">Cấp thẻ E-Card</span>
                  </div>

                  {/* Connection lines from badges to center (subtle SVG lines) */}
                  <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 288 288">
                    <path d="M48,22 Q144,144 144,144" stroke="url(#line-grad)" strokeWidth="1.5" strokeDasharray="4,4" fill="none" />
                    <path d="M288,100 Q144,144 144,144" stroke="url(#line-grad)" strokeWidth="1.5" strokeDasharray="4,4" fill="none" />
                    <path d="M264,240 Q144,144 144,144" stroke="url(#line-grad)" strokeWidth="1.5" strokeDasharray="4,4" fill="none" />
                    <path d="M8,220 Q144,144 144,144" stroke="url(#line-grad)" strokeWidth="1.5" strokeDasharray="4,4" fill="none" />
                    <defs>
                      <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#ffffff" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Taglines */}
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-extrabold text-blue-300">Khỏe mạnh mỗi ngày, An tâm vững bước</h3>
                  <p className="text-xs text-white/70 max-w-xs mx-auto leading-relaxed">
                    Giải pháp bảo hiểm chăm sóc sức khỏe doanh nghiệp thông minh, thẩm định siêu tốc & chi trả bảo lãnh 24/7.
                  </p>
                </div>
              </div>

              {/* Footer labels */}
              <div className="relative z-10 flex justify-between items-center text-[10px] text-white/40 border-t border-white/5 pt-4 mt-4 font-mono">
                <span>© TỔNG CÔNG TY BẢO HIỂM PTI</span>
                <span>An toàn • Kỹ thuật số</span>
              </div>
            </div>

          </div>
        </div>
      ) : (
        
        /* ── VIEW 2: AUTHENTICATED PORTAL ── */
        <div id="pg-main" className="flex flex-1 overflow-hidden min-h-screen">
          
          {/* SIDEBAR - Redesigned with premium Apple iOS Glassmorphic style */}
          <div className="w-64 bg-gradient-to-b from-[#002D62] via-[#03377B] to-[#001430] flex-shrink-0 text-white flex flex-col justify-between hidden lg:flex relative overflow-hidden border-r border-white/10 shadow-2xl">
            {/* Ambient lighting glows inside the glass sidebar */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-sky-400/10 rounded-full blur-3xl -ml-20 -mt-20 pointer-events-none"></div>
            <div className="absolute bottom-1/3 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -mr-20 pointer-events-none"></div>

            {/* Beautiful, premium faint background graphic mimicking the medical safety shield */}
            <div className="absolute -bottom-6 -right-6 w-72 h-96 text-white/[0.08] pointer-events-none select-none mix-blend-screen overflow-visible">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 320" fill="none" className="w-full h-full">
                <defs>
                  {/* Sphere gradient */}
                  <radialGradient id="sphereG" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8"/>
                    <stop offset="70%" stopColor="#0369a1" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0"/>
                  </radialGradient>
                  
                  {/* Shield glassmorphic gradient */}
                  <linearGradient id="shieldG" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5"/>
                    <stop offset="40%" stopColor="#7dd3fc" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1"/>
                  </linearGradient>
                  
                  {/* Glass ribbon gradient */}
                  <linearGradient id="ribbonG" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.05"/>
                    <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.05"/>
                  </linearGradient>
                  
                  {/* Star pulse filter */}
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Ambient glow in background */}
                <circle cx="120" cy="180" r="100" fill="#0ea5e9" opacity="0.15" filter="url(#glow)"/>

                {/* Large 3D sphere at the base */}
                <ellipse cx="120" cy="240" rx="95" ry="32" fill="url(#sphereG)" />
                <ellipse cx="120" cy="248" rx="85" ry="24" fill="#0284c7" opacity="0.4" />
                <ellipse cx="120" cy="236" rx="60" ry="12" fill="#ffffff" opacity="0.1" />

                {/* Small multi-tiered pedestal */}
                <ellipse cx="120" cy="208" rx="45" ry="12" fill="#7dd3fc" opacity="0.3" stroke="#ffffff" strokeWidth="1" />
                <ellipse cx="120" cy="198" rx="35" ry="9" fill="#0284c7" opacity="0.5" stroke="#ffffff" strokeWidth="1" />

                {/* Swirling Glass Ribbon (Behind Shield) */}
                <path d="M 40, 160 C 20, 150 20, 110 50, 110 C 80, 110 160, 140 190, 140 C 220, 140 220, 170 190, 180" fill="none" stroke="url(#ribbonG)" strokeWidth="15" strokeLinecap="round" opacity="0.6" />

                {/* 3D Shield */}
                <path d="M120 70 C162 80, 190 90, 190 132 C190 192, 120 230, 120 230 C120 230, 50 192, 50 132 C50 90, 78 80, 120 70 Z" fill="url(#shieldG)" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.6" />
                
                {/* 3D Shield inner border */}
                <path d="M120 80 C154 88, 176 96, 176 130 C176 178, 120 212, 120 212 C120 212, 64 178, 64 130 C64 96, 86 88, 120 80 Z" fill="none" stroke="#7dd3fc" strokeWidth="1" strokeOpacity="0.3" />

                {/* White circular emblem */}
                <circle cx="120" cy="140" r="26" fill="#ffffff" fillOpacity="0.85" stroke="#38bdf8" strokeWidth="1.5" />
                <circle cx="120" cy="140" r="21" fill="none" stroke="#ef4444" strokeWidth="0.5" strokeOpacity="0.2" />

                {/* Bright red cross with nice pill rounding */}
                <rect x="115" y="125" width="10" height="30" rx="3" fill="#ef4444" />
                <rect x="105" y="135" width="30" height="10" rx="3" fill="#ef4444" />
                
                {/* Sparkles / star particles */}
                <path d="M50 80 L52 85 L57 87 L52 89 L50 94 L48 89 L43 87 L48 85 Z" fill="#ffffff" opacity="0.8" />
                <path d="M200 90 L201.5 94 L205.5 95.5 L201.5 97 L200 101 L198.5 97 L194.5 95.5 L198.5 94 Z" fill="#ffffff" opacity="0.9" />
                <path d="M80 280 L81 283 L84 284 L81 285 L80 288 L79 285 L76 284 L79 283 Z" fill="#ffffff" opacity="0.7" />
                
                {/* Floating translucent orbs / bubbles */}
                <circle cx="45" cy="180" r="8" fill="#e0f2fe" fillOpacity="0.3" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.5" />
                <circle cx="195" cy="115" r="10" fill="#e0f2fe" fillOpacity="0.4" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.6" />
                <circle cx="30" cy="225" r="5" fill="#e0f2fe" fillOpacity="0.2" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.4" />
                <circle cx="210" cy="220" r="6" fill="#e0f2fe" fillOpacity="0.3" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.4" />
              </svg>
            </div>

            <div className="relative z-10">
              {/* Sidebar Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-center backdrop-blur-xs">
                <IptiLogo className="h-7" light={true} />
              </div>

              {/* User Identity Box - Sleek Glassmorphic card */}
              <div className="mx-4 my-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] bg-emerald-500 text-white font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {user.role}
                  </span>
                  <span className="text-slate-300 font-mono text-[9px] font-medium">{user.username}</span>
                </div>
                <div className="font-extrabold text-white mt-1.5 text-sm tracking-tight">{user.name}</div>
                <div className="text-slate-300/70 text-[10px] font-semibold mt-0.5">Chi nhánh Hà Nội</div>
              </div>

              {/* Sidebar Nav */}
              <div className="p-4 space-y-1">
                <span className="text-[9px] font-black text-white/40 uppercase tracking-widest px-3 block mb-2">QUẢN LÝ NGHIỆP VỤ</span>
                <button
                  type="button"
                  onClick={() => { setCurrentStep(0); setActiveTab('dashboard'); setSelectedProduct(null); setSelectedCategory(null); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${activeTab === 'dashboard' && selectedProduct === null && selectedCategory === null ? 'bg-white/15 backdrop-blur-md text-white shadow-lg border border-white/10' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                >
                  <Home size={15} className={activeTab === 'dashboard' && selectedProduct === null && selectedCategory === null ? 'text-white' : 'text-slate-400'} />
                  <span>Tổng quan</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setCurrentStep(0); setActiveTab('dashboard'); setSelectedProduct(null); setSelectedCategory('personal'); }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${activeTab === 'dashboard' && selectedProduct === null && selectedCategory === 'personal' ? 'bg-white/15 backdrop-blur-md text-white shadow-lg border border-white/10' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                >
                  <Users size={15} className={activeTab === 'dashboard' && selectedProduct === null && selectedCategory === 'personal' ? 'text-white' : 'text-slate-400'} />
                  <span className="truncate">Bảo hiểm Khách hàng cá nhân</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setCurrentStep(0); setActiveTab('dashboard'); setSelectedProduct(null); setSelectedCategory('corporate'); }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${activeTab === 'dashboard' && selectedProduct === null && selectedCategory === 'corporate' ? 'bg-white/15 backdrop-blur-md text-white shadow-lg border border-white/10' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                >
                  <Building size={15} className={activeTab === 'dashboard' && selectedProduct === null && selectedCategory === 'corporate' ? 'text-white' : 'text-slate-400'} />
                  <span className="truncate">Khách hàng doanh nghiệp</span>
                </button>

                <span className="text-[9px] font-black text-white/40 uppercase tracking-widest px-3 block mt-6 mb-2">DANH MỤC HỒ SƠ</span>
                <button
                  type="button"
                  onClick={() => { setCurrentStep(0); setActiveTab('pending'); setSelectedProduct(null); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${activeTab === 'pending' ? 'bg-white/15 backdrop-blur-md text-white shadow-lg border border-white/10' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                >
                  <span className="flex items-center gap-3">
                    <FileText size={15} className={activeTab === 'pending' ? 'text-white' : 'text-slate-400'} />
                    <span>Hồ sơ nháp đang xử lý</span>
                  </span>
                  <span className="bg-amber-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-black shadow-sm">{draftContracts.filter(d => !getRelativeTime(d.lastUpdated).isArchived).length}</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setCurrentStep(0); setActiveTab('history'); setSelectedProduct(null); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${activeTab === 'history' ? 'bg-white/15 backdrop-blur-md text-white shadow-lg border border-white/10' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                >
                  <span className="flex items-center gap-3">
                    <CheckCircle2 size={15} className={activeTab === 'history' ? 'text-white' : 'text-slate-400'} />
                    <span>Hợp đồng đã cấp thành công</span>
                  </span>
                  <span className="bg-[#03377B] text-white border border-white/20 text-[9px] px-1.5 py-0.5 rounded-full font-black shadow-sm">{completedContracts.length}</span>
                </button>
              </div>
            </div>

            {/* Sidebar Footer Logout */}
            <div className="p-4 border-t border-white/10 relative z-10 backdrop-blur-xs">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-white/85 hover:bg-white/10 hover:text-white transition-all text-left"
              >
                <LogOut size={15} className="text-white/80" />
                <span>Đăng xuất tài khoản</span>
              </button>
            </div>
          </div>

          {/* MAIN WORKSPACE */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            
            {/* Header top bar */}
            <div className="bg-white border-b border-slate-200 py-3.5 px-6 flex items-center justify-between flex-shrink-0 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="text-lg font-extrabold text-slate-900">
                  {currentStep === 0 ? 'Tổng quan' : 
                   selectedProduct === 'accident' ? '🦺 Cấp bảo hiểm Tai nạn Con người' :
                   selectedProduct === 'travel_intl' ? '✈️ Cấp bảo hiểm Du lịch Quốc tế' :
                   selectedProduct === 'travel_dom' ? '🗺️ Cấp bảo hiểm Du lịch Trong nước' :
                   selectedProduct === 'elitecare' ? '💎 Cấp bảo hiểm Sức khỏe Cao cấp EliteCare' :
                   selectedProduct === 'workers_comp' ? '🏗️ Cấp bảo hiểm Bồi thường Người lao động' :
                   '🏥 Cấp bảo hiểm sức khỏe PTI Care (EB)'}
                </span>
                {currentStep > 0 && (
                  <span className="text-xs bg-slate-100 border border-slate-200 text-slate-500 font-bold px-2.5 py-0.5 rounded-full">
                    {selectedProduct === 'accident' ? 'Quy tắc 264/265/QĐ-PTI' :
                     selectedProduct === 'travel_intl' ? 'Quy tắc Du lịch Quốc tế/QĐ-PTI' :
                     selectedProduct === 'travel_dom' ? 'Quy tắc Du lịch Trong nước/QĐ-PTI' :
                     selectedProduct === 'elitecare' ? 'Quy tắc EliteCare/QĐ-PTI' :
                     selectedProduct === 'workers_comp' ? 'Quy tắc Bồi thường NLĐ/QĐ-PTI' :
                     'Quy tắc 270/QĐ-PTI-BHCN'}
                  </span>
                )}
              </div>

              {/* Mobile Logout trigger */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 hidden sm:inline">Phiên bản 4.1.2</span>
                <span className="p-1 text-slate-400 hover:text-[#03377B] cursor-pointer"><Bell size={18} /></span>
                <span className="p-1 text-slate-400 hover:text-[#03377B] cursor-pointer"><Settings size={18} /></span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="lg:hidden p-1.5 text-rose-500 bg-rose-50 rounded-lg"
                  title="Đăng xuất"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>

            {/* CONTENT CANVAS */}
            <div className="p-4 sm:p-6 lg:p-8 flex-1">
              
              {/* ── SUB-VIEW A: STEP 0 (DASHBOARD) ── */}
              {currentStep === 0 && activeTab === 'dashboard' && (
                <div className="space-y-8 animate-fade-in pb-12">
                  
                  {/* Redesigned Navigation Bar inside the page canvas mimicking top navbar */}
                  <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 bg-blue-50 text-[#03377B] rounded-xl font-black text-xs border border-blue-100">Pilot</span>
                        <span className="font-extrabold text-slate-800 text-sm tracking-tight">iPTI Premium Portal</span>
                      </div>
                      <div className="hidden md:flex items-center gap-5 text-xs font-semibold text-slate-500">
                        <button 
                          onClick={() => { setActiveTab('dashboard'); setSelectedCategory(null); }} 
                          className={`hover:text-[#03377B] transition-colors font-bold ${activeTab === 'dashboard' && selectedCategory === null ? 'text-[#03377B] font-extrabold' : 'text-slate-700'}`}
                        >
                          Trang chủ
                        </button>
                        <span className="text-slate-200">|</span>
                        <button 
                          onClick={() => { setActiveTab('dashboard'); setSelectedCategory('personal'); }} 
                          className={`hover:text-[#03377B] transition-colors font-bold ${activeTab === 'dashboard' && selectedCategory === 'personal' ? 'text-[#03377B] font-extrabold' : 'text-slate-700'}`}
                        >
                          Bảo hiểm Cá nhân
                        </button>
                        <span className="text-slate-200">|</span>
                        <button 
                          onClick={() => { setActiveTab('dashboard'); setSelectedCategory('corporate'); }} 
                          className={`hover:text-[#03377B] transition-colors font-bold ${activeTab === 'dashboard' && selectedCategory === 'corporate' ? 'text-[#03377B] font-extrabold' : 'text-slate-700'}`}
                        >
                          Bảo hiểm Doanh nghiệp
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] bg-slate-100 text-slate-500 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                        Phân quyền: {user.role}
                      </span>
                    </div>
                  </div>

                  {/* CASE 1: INITIAL CATEGORY CHOICE OVERVIEW */}
                  {selectedCategory === null && (
                    <div className="space-y-8 animate-fade-in">
                      
                      {/* ── HIGH-LEVEL OVERVIEW FEATURES SECTION (Concise, high-fidelity metrics/cards) ── */}
                      <div id="features-preview" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.02)] flex items-start gap-3.5 hover:shadow-md transition-all duration-300">
                          <div className="p-2.5 bg-blue-50 text-[#03377B] rounded-xl flex-shrink-0">
                            <ShieldCheck size={18} className="stroke-[2.5]" />
                          </div>
                          <div className="space-y-0.5 text-left">
                            <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm">Vận hành tự động hóa</h3>
                            <p className="text-slate-400 text-[11px] leading-normal">
                              Cấp đơn trực tuyến, sửa đổi bổ sung và gia hạn bảo hiểm tức thì.
                            </p>
                          </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.02)] flex items-start gap-3.5 hover:shadow-md transition-all duration-300">
                          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl flex-shrink-0">
                            <FileCheck size={18} className="stroke-[2.5]" />
                          </div>
                          <div className="space-y-0.5 text-left">
                            <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm">Thẩm định thông minh</h3>
                            <p className="text-slate-400 text-[11px] leading-normal">
                              Đối soát nhân sự tự động, thẩm định loại trừ y khoa tức thì qua OCR.
                            </p>
                          </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.02)] flex items-start gap-3.5 hover:shadow-md transition-all duration-300">
                          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl flex-shrink-0">
                            <Sparkles size={18} className="stroke-[2.5]" />
                          </div>
                          <div className="space-y-0.5 text-left">
                            <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm">Bảo lãnh Viện phí 24/7</h3>
                            <p className="text-slate-400 text-[11px] leading-normal">
                              Liên kết trực tiếp với hơn 300+ bệnh viện và phòng khám uy tín toàn quốc.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Dynamic Title */}
                      <div className="text-center space-y-2 py-4">
                        <span className="text-[11px] font-black text-[#03377B] uppercase tracking-widest block">
                          DANH MỤC BẢO HIỂM iPTI
                        </span>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 tracking-tight">
                          Chào mừng bạn đến với Cổng Bảo hiểm Premium
                        </h1>
                        <p className="text-slate-400 text-xs max-w-lg mx-auto leading-relaxed">
                          Vui lòng lựa chọn đối tượng bảo hiểm dưới đây để tiếp tục khai thác hợp đồng trực tuyến.
                        </p>
                      </div>

                      {/* TWO CATEGORY CARDS (Main overview entry points) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pt-2">
                        
                        {/* CATEGORY CARD 1: CÁ NHÂN (iOS Light Glassmorphic Banner) */}
                        <div 
                          onClick={() => setSelectedCategory('personal')}
                          className="bg-gradient-to-br from-white/95 via-slate-50/80 to-sky-50/30 backdrop-blur-xl border border-white/60 hover:border-sky-500/30 rounded-[2.5rem] p-7 text-left cursor-pointer group transition-all duration-500 transform hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(3,55,123,0.12)] relative overflow-hidden flex flex-col justify-between h-[360px]"
                        >
                          {/* Ambient sky blue background lighting glow */}
                          <div className="absolute -top-16 -left-16 w-48 h-48 bg-sky-300/15 rounded-full blur-3xl pointer-events-none group-hover:bg-sky-400/20 transition-all duration-500"></div>
                          
                          <div className="grid grid-cols-5 gap-4 items-center relative z-10">
                            {/* Text Column (60% width representation) */}
                            <div className="col-span-3 space-y-3.5">
                              <span className="inline-flex items-center gap-1.5 text-[9px] bg-blue-50/80 text-[#03377B] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-100/50 shadow-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#03377B] animate-pulse"></span>
                                CÁ NHÂN & GIA ĐÌNH
                              </span>
                              <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight leading-tight group-hover:text-[#03377B] transition-colors">
                                Bảo hiểm Khách hàng Cá nhân
                              </h3>
                              <p className="text-slate-400 text-[11px] leading-relaxed">
                                Bảo vệ sức khỏe bản thân & gia đình trước mọi rủi ro y tế, tai nạn cá nhân, du lịch trong nước và quốc tế.
                              </p>
                            </div>

                            {/* 3D Graphic Column (40% width representation) */}
                            <div className="col-span-2 flex justify-center items-center h-32 transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-500">
                              <PersonalBanner3D />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between border-t border-slate-100/80 pt-4 mt-auto relative z-10">
                            <span className="text-xs font-black text-slate-500 group-hover:text-[#03377B] transition-colors flex items-center gap-1.5">
                              Xem 3 chương trình bảo hiểm
                            </span>
                            <div className="w-10 h-10 bg-white hover:bg-sky-50 rounded-2xl border border-slate-200/60 flex items-center justify-center text-slate-400 group-hover:bg-[#03377B] group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-sm group-hover:translate-x-1">
                              <ChevronRight size={18} className="stroke-[2.5]" />
                            </div>
                          </div>
                        </div>

                        {/* CATEGORY CARD 2: DOANH NGHIỆP (iOS Dark/Deep Blue Glassmorphic Banner) */}
                        <div 
                          onClick={() => setSelectedCategory('corporate')}
                          className="bg-gradient-to-br from-[#022D66]/95 via-[#03377B]/85 to-[#011430]/95 backdrop-blur-xl border border-white/10 hover:border-amber-400/20 rounded-[2.5rem] p-7 text-left cursor-pointer group transition-all duration-500 transform hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(1,20,48,0.35)] relative overflow-hidden flex flex-col justify-between h-[360px]"
                        >
                          {/* Ambient gold/orange background lighting glow */}
                          <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-400/15 transition-all duration-500"></div>
                          
                          <div className="grid grid-cols-5 gap-4 items-center relative z-10">
                            {/* Text Column */}
                            <div className="col-span-3 space-y-3.5">
                              <span className="inline-flex items-center gap-1.5 text-[9px] bg-amber-500/10 text-amber-300 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-amber-500/20 shadow-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                                DOANH NGHIỆP & TỔ CHỨC
                              </span>
                              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-tight group-hover:text-amber-300 transition-colors">
                                Bảo hiểm Khách hàng Doanh nghiệp
                              </h3>
                              <p className="text-blue-100/70 text-[11px] leading-relaxed">
                                Chương trình bảo vệ sức khỏe nhân sự cao cấp PTI Care (EB), bồi thường người lao động & quản trị phúc lợi.
                              </p>
                            </div>

                            {/* 3D Graphic Column */}
                            <div className="col-span-2 flex justify-center items-center h-32 transform group-hover:scale-105 group-hover:-rotate-1 transition-all duration-500">
                              <CorporateBanner3D />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto relative z-10">
                            <span className="text-xs font-black text-blue-200 group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                              Quản trị & Khai thác cấp đơn mới
                            </span>
                            <div className="w-10 h-10 bg-white/10 hover:bg-white/15 rounded-2xl border border-white/10 flex items-center justify-center text-blue-100 group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-transparent transition-all duration-300 shadow-md group-hover:translate-x-1">
                              <ChevronRight size={18} className="stroke-[2.5]" />
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>
                  )}

                  {/* CASE 2: PERSONAL INSURANCE CATEGORY PREVIEW */}
                  {selectedCategory === 'personal' && (
                    <div className="space-y-8 animate-fade-in">
                      
                      {/* Back button and title */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => setSelectedCategory(null)}
                          className="flex items-center gap-2 text-slate-500 hover:text-[#03377B] font-extrabold text-xs transition-colors py-1.5 px-3 bg-white border border-slate-100 rounded-xl shadow-sm self-start"
                        >
                          <ArrowLeft size={14} />
                          <span>Quay lại Tổng quan</span>
                        </button>
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] font-extrabold text-[#03377B] uppercase tracking-wider block">BẢO HIỂM CÁ NHÂN</span>
                          <h2 className="text-lg font-black text-slate-800 tracking-tight">Khai thác Sản phẩm Cá nhân</h2>
                        </div>
                      </div>

                      {/* Products Grid for Personal */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        
                        {/* CARD 1: Bảo hiểm Tai nạn Con người */}
                        <div className="bg-white border border-slate-100 hover:border-[#03377B]/20 shadow-[0_12px_40px_-10px_rgba(15,23,42,0.03)] rounded-[2rem] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between text-left group relative overflow-hidden">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400"></div>
                          <div className="space-y-6">
                            {/* 3D Illustration */}
                            <div className="transform group-hover:scale-105 transition-transform duration-300">
                              <Accident3D />
                            </div>

                            <div className="space-y-1.5">
                              <h3 className="font-black text-slate-800 text-base leading-snug">Tai nạn Con người</h3>
                              <p className="text-[11px] text-slate-500 leading-relaxed">Bảo vệ rủi ro tai nạn cho cá nhân và nhóm lao động doanh nghiệp theo nhóm nghề nghiệp.</p>
                            </div>

                            <div className="border-t border-slate-100 pt-4 space-y-3">
                              <div className="flex items-baseline gap-1">
                                <span className="text-xl font-black text-[#03377B]">Từ 120.000đ</span>
                                <span className="text-[10px] text-slate-400">/người/năm</span>
                              </div>
                              <div className="space-y-1.5 text-[10px] text-slate-500 font-semibold font-sans">
                                <div className="flex items-center gap-2"><Check size={11} className="text-[#03377B] stroke-[3]" /><span>Quy tắc QT264 / QT265 của Bộ Tài Chính</span></div>
                                <div className="flex items-center gap-2"><Check size={11} className="text-[#03377B] stroke-[3]" /><span>Nhóm nghề nghiệp 1 đến 4</span></div>
                                <div className="flex items-center gap-2"><Check size={11} className="text-[#03377B] stroke-[3]" /><span>Tự động tính tỷ lệ tổn thất</span></div>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => { setSelectedProduct('accident'); setCurrentStep(1); setActiveTab('listing'); }}
                            className="mt-6 w-full py-2.5 bg-slate-50 hover:bg-[#03377B] hover:text-white text-slate-700 font-black text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm group-hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <span>Cấp đơn ngay →</span>
                          </button>
                        </div>

                        {/* CARD 2: Bảo hiểm Du lịch Quốc tế */}
                        <div className="bg-white border border-slate-100 hover:border-[#03377B]/20 shadow-[0_12px_40px_-10px_rgba(15,23,42,0.03)] rounded-[2rem] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between text-left group relative overflow-hidden">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500"></div>
                          <div className="space-y-6">
                            {/* 3D Illustration */}
                            <div className="transform group-hover:scale-105 transition-transform duration-300">
                              <TravelIntl3D />
                            </div>

                            <div className="space-y-1.5">
                              <h3 className="font-black text-slate-800 text-base leading-snug">Du lịch Quốc tế</h3>
                              <p className="text-[11px] text-slate-500 leading-relaxed">Bảo vệ toàn diện cho người Việt Nam đi du lịch nước ngoài: y tế, tai nạn, hành lý, Covid-19.</p>
                            </div>

                            <div className="border-t border-slate-100 pt-4 space-y-3">
                              <div className="flex items-baseline gap-1">
                                <span className="text-xl font-black text-[#03377B]">Từ 200.000đ</span>
                                <span className="text-[10px] text-slate-400">/chuyến/người</span>
                              </div>
                              <div className="space-y-1.5 text-[10px] text-slate-500 font-semibold font-sans">
                                <div className="flex items-center gap-2"><Check size={11} className="text-[#03377B] stroke-[3]" /><span>Phạm vi bảo hiểm toàn cầu VIP</span></div>
                                <div className="flex items-center gap-2"><Check size={11} className="text-[#03377B] stroke-[3]" /><span>Độ tuổi từ 14 ngày đến 75 tuổi</span></div>
                                <div className="flex items-center gap-2"><Check size={11} className="text-[#03377B] stroke-[3]" /><span>Hỗ trợ y tế SOS khẩn cấp</span></div>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => { setSelectedProduct('travel_intl'); setCurrentStep(1); setActiveTab('listing'); }}
                            className="mt-6 w-full py-2.5 bg-slate-50 hover:bg-[#03377B] hover:text-white text-slate-700 font-black text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm group-hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <span>Cấp đơn ngay →</span>
                          </button>
                        </div>

                        {/* CARD 3: Bảo hiểm Du lịch Trong nước */}
                        <div className="bg-white border border-slate-100 hover:border-[#03377B]/20 shadow-[0_12px_40px_-10px_rgba(15,23,42,0.03)] rounded-[2rem] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between text-left group relative overflow-hidden">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500"></div>
                          <div className="space-y-6">
                            {/* 3D Illustration */}
                            <div className="transform group-hover:scale-105 transition-transform duration-300">
                              <TravelDom3D />
                            </div>

                            <div className="space-y-1.5">
                              <h3 className="font-black text-slate-800 text-base leading-snug">Du lịch Trong nước</h3>
                              <p className="text-[11px] text-slate-500 leading-relaxed">Bảo vệ tai nạn, y tế, hành lý cho các chuyến hành trình du lịch nội địa tại Việt Nam.</p>
                            </div>

                            <div className="border-t border-slate-100 pt-4 space-y-3">
                              <div className="flex items-baseline gap-1">
                                <span className="text-xl font-black text-[#03377B]">Từ 50.000đ</span>
                                <span className="text-[10px] text-slate-400">/chuyến/người</span>
                              </div>
                              <div className="space-y-1.5 text-[10px] text-slate-500 font-semibold font-sans">
                                <div className="flex items-center gap-2"><Check size={11} className="text-[#03377B] stroke-[3]" /><span>Áp dụng toàn bộ địa điểm VN</span></div>
                                <div className="flex items-center gap-2"><Check size={11} className="text-[#03377B] stroke-[3]" /><span>Cá nhân và đoàn lữ hành lớn</span></div>
                                <div className="flex items-center gap-2"><Check size={11} className="text-[#03377B] stroke-[3]" /><span>Xử lý bồi thường qua App</span></div>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => { setSelectedProduct('travel_dom'); setCurrentStep(1); setActiveTab('listing'); }}
                            className="mt-6 w-full py-2.5 bg-slate-50 hover:bg-[#03377B] hover:text-white text-slate-700 font-black text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm group-hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <span>Cấp đơn ngay →</span>
                          </button>
                        </div>

                      </div>

                    </div>
                  )}

                  {/* CASE 3: CORPORATE INSURANCE CATEGORY PREVIEW (With "Tạo hồ sơ mới" & Portfolio Table) */}
                  {selectedCategory === 'corporate' && (
                    <div className="space-y-8 animate-fade-in">
                      
                      {/* Back button and title */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => setSelectedCategory(null)}
                          className="flex items-center gap-2 text-slate-500 hover:text-[#03377B] font-extrabold text-xs transition-colors py-1.5 px-3 bg-white border border-slate-100 rounded-xl shadow-sm self-start"
                        >
                          <ArrowLeft size={14} />
                          <span>Quay lại Tổng quan</span>
                        </button>
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] font-extrabold text-[#03377B] uppercase tracking-wider block">BẢO HIỂM DOANH NGHIỆP</span>
                          <h2 className="text-lg font-black text-slate-800 tracking-tight font-sans">Khai thác & Theo dõi Hồ sơ Doanh nghiệp</h2>
                        </div>
                      </div>

                      {/* Flagship PTI Care banner block with quick "Tạo hồ sơ mới" trigger */}
                      <div className="relative rounded-[2.5rem] p-7 sm:p-8 text-white overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-[#022D66] via-[#03377B] to-[#011430] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Ambient colorful backdrop lights */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="lg:col-span-7 space-y-5 text-left relative z-10">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[9px] bg-blue-500/20 border border-blue-400/30 text-sky-200 font-black px-3 py-1 rounded-full uppercase tracking-wider">
                              Flagship EB Product
                            </span>
                            <span className="text-[9px] bg-amber-500 text-slate-950 font-black px-3 py-1 rounded-full uppercase tracking-wider">
                              Quy tắc 270 / QĐ-PTI
                            </span>
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-tight">
                              Bảo hiểm Sức khỏe PTI Care (EB)
                            </h3>
                            <p className="text-blue-100/80 text-xs font-medium leading-relaxed">
                              Chương trình chăm sóc sức khỏe phúc lợi toàn diện dành cho cán bộ nhân viên các doanh nghiệp. Tự động đề xuất chương trình phù hợp nhóm ngành nghề, đối soát nhân sự trực tuyến, thẩm định loại trừ tự động và phát hành đơn bảo hiểm số hóa 24/7.
                            </p>
                          </div>
                          
                          <div className="pt-2 flex flex-wrap gap-4 items-center">
                            <button
                              type="button"
                              onClick={() => { setSelectedProduct('health_pti'); handleStartNewListing(); }}
                              className="py-3 px-6 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-2xl transition-all shadow-lg hover:-translate-y-0.5 flex items-center gap-2 active:scale-95"
                            >
                              <span>Tạo hồ sơ mới</span>
                              <ArrowRight size={14} className="stroke-[3]" />
                            </button>
                          </div>
                        </div>

                        {/* Beautiful iOS Style Glass Card Wrapper for Graphic illustration */}
                        <div className="lg:col-span-5 relative flex justify-center items-center h-44 sm:h-48 rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] p-4 group">
                          {/* Inner soft glows */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/10 via-transparent to-amber-400/5 pointer-events-none"></div>
                          
                          {/* 3D Glassmorphic HealthPti3D Graphic */}
                          <div className="w-full max-w-[200px] h-full flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                            <HealthPti3D />
                          </div>
                        </div>
                      </div>

                      {/* ── BẢNG THEO DÕI DANH MỤC HỒ SƠ (Apple Glassmorphic Style Portfolio Table) ── */}
                      <div className="bg-white rounded-3xl p-6 shadow-[0_20px_50px_rgba(15,23,42,0.03)] border border-slate-100 flex flex-col space-y-6">
                        
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-4">
                          <div className="space-y-1 text-left">
                            <h3 className="text-slate-900 font-extrabold text-base tracking-tight flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#03377B] animate-pulse"></span>
                              <span>Bảng theo dõi danh mục hồ sơ</span>
                            </h3>
                            <p className="text-slate-400 text-[11px] font-medium">Theo dõi các hồ sơ nháp và hợp đồng đã cấp trực tuyến của doanh nghiệp</p>
                          </div>

                          {/* Filter Tabs */}
                          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100 self-start">
                            <button
                              type="button"
                              onClick={() => setPortfolioTab('all')}
                              className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${portfolioTab === 'all' ? 'bg-white text-[#03377B] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                              Tất cả ({draftContracts.length + completedContracts.length})
                            </button>
                            <button
                              type="button"
                              onClick={() => setPortfolioTab('draft')}
                              className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${portfolioTab === 'draft' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                              Hồ sơ nháp ({draftContracts.length})
                            </button>
                            <button
                              type="button"
                              onClick={() => setPortfolioTab('completed')}
                              className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${portfolioTab === 'completed' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                              Đã cấp ({completedContracts.length})
                            </button>
                          </div>
                        </div>

                        {/* Portfolio Content List / Table */}
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs min-w-[650px]">
                            <thead>
                              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                                <th className="pb-3 px-2">Mã hồ sơ / Ngày tạo</th>
                                <th className="pb-3 px-2">Doanh nghiệp đối tác</th>
                                <th className="pb-3 px-2">Sản phẩm</th>
                                <th className="pb-3 px-2 text-center">Trạng thái / Tiến độ</th>
                                <th className="pb-3 px-2 text-right">Phí bảo hiểm</th>
                                <th className="pb-3 px-2 text-right">Thao tác</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100/50">
                              
                              {/* RENDER DRAFT CONTRACTS */}
                              {(portfolioTab === 'all' || portfolioTab === 'draft') && draftContracts.map((draft) => (
                                <tr key={draft.id} className="group hover:bg-slate-50/50 transition-colors duration-150">
                                  <td className="py-4 px-2">
                                    <span className="font-mono font-extrabold block text-amber-600 tracking-tight">{draft.id}</span>
                                    <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{draft.date}</span>
                                  </td>
                                  <td className="py-4 px-2">
                                    <span className="font-extrabold text-slate-800 block">{draft.company}</span>
                                    <span className="text-[10px] text-slate-400 font-medium block mt-0.5">MST: {draft.taxCode} · {draft.headcount} nhân sự</span>
                                  </td>
                                  <td className="py-4 px-2">
                                    <span className="font-semibold text-slate-600">Sức khỏe PTI Care (EB)</span>
                                  </td>
                                  <td className="py-4 px-2 text-center">
                                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500/10 text-amber-700 border border-amber-500/20">
                                      Nháp: Bước {draft.step}/8
                                    </span>
                                  </td>
                                  <td className="py-4 px-2 text-right">
                                    <span className="text-slate-400 font-semibold">—</span>
                                  </td>
                                  <td className="py-4 px-2 text-right">
                                    <button
                                      type="button"
                                      onClick={() => handleResumeDraft(draft)}
                                      className="px-3.5 py-1.5 bg-[#03377B] hover:bg-[#00285d] hover:scale-105 active:scale-95 text-white font-black rounded-xl text-[10px] transition-all shadow-md shadow-blue-900/10"
                                    >
                                      Làm tiếp
                                    </button>
                                  </td>
                                </tr>
                              ))}

                              {/* RENDER COMPLETED CONTRACTS */}
                              {(portfolioTab === 'all' || portfolioTab === 'completed') && completedContracts.map((cnt) => (
                                <tr key={cnt.id} className="group hover:bg-slate-50/50 transition-colors duration-150">
                                  <td className="py-4 px-2">
                                    <span className="font-mono font-extrabold block text-emerald-600 tracking-tight">{cnt.id}</span>
                                    <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{cnt.date}</span>
                                  </td>
                                  <td className="py-4 px-2">
                                    <span className="font-extrabold text-slate-800 block">{cnt.company}</span>
                                    <span className="text-[10px] text-slate-400 font-medium block mt-0.5">MST: {cnt.taxCode} · {cnt.headcount} nhân sự</span>
                                  </td>
                                  <td className="py-4 px-2">
                                    <span className="font-semibold text-slate-600">Sức khỏe PTI Care (EB)</span>
                                  </td>
                                  <td className="py-4 px-2 text-center">
                                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                                      Đã phát hành đơn
                                    </span>
                                  </td>
                                  <td className="py-4 px-2 text-right">
                                    <span className="font-black text-slate-900 tracking-tight">{formatVnd(cnt.premium)}</span>
                                  </td>
                                  <td className="py-4 px-2 text-right">
                                    <button
                                      type="button"
                                      onClick={() => alert(`Đang tiến hành xuất bản thẻ điện tử e-card & giấy chứng nhận bảo hiểm cho Hợp đồng ${cnt.id}...`)}
                                      className="text-[10px] text-[#03377B] hover:text-[#00285d] hover:underline flex items-center justify-end gap-1 font-bold ml-auto transition-colors"
                                    >
                                      <Printer size={12} className="text-[#03377B]" />
                                      <span>Thẻ e-card</span>
                                    </button>
                                  </td>
                                </tr>
                              ))}

                              {/* Empty State */}
                              {((portfolioTab === 'draft' && draftContracts.length === 0) || 
                                (portfolioTab === 'completed' && completedContracts.length === 0) || 
                                (draftContracts.length === 0 && completedContracts.length === 0)) && (
                                <tr>
                                  <td colSpan={6} className="py-8 text-center text-slate-400 font-semibold">
                                    Không tìm thấy hồ sơ nào trong mục này.
                                  </td>
                                </tr>
                              )}

                            </tbody>
                          </table>
                        </div>

                      </div>

                    </div>
                  )}

                </div>
              )}


              {/* ── DRAFT MANAGEMENT SCREEN ── */}
              {currentStep === 0 && activeTab === 'pending' && (() => {
                // Filter drafts by search and active/archived status
                const filteredDrafts = draftContracts.filter(draft => {
                  const rel = getRelativeTime(draft.lastUpdated);
                  const isArchived = rel.isArchived;
                  const matchesFilter = draftFilter === 'archived' ? isArchived : !isArchived;
                  
                  const matchesSearch = 
                    draft.id.toLowerCase().includes(draftSearch.toLowerCase()) ||
                    draft.company.toLowerCase().includes(draftSearch.toLowerCase()) ||
                    (draft.taxCode && draft.taxCode.includes(draftSearch));
                    
                  return matchesFilter && matchesSearch;
                });

                // Sort drafts
                const sortedDrafts = [...filteredDrafts].sort((a, b) => {
                  const timeA = new Date(a.lastUpdated).getTime();
                  const timeB = new Date(b.lastUpdated).getTime();
                  if (draftSort === 'newest') return timeB - timeA;
                  if (draftSort === 'oldest') return timeA - timeB;
                  if (draftSort === 'overdue') {
                    const daysA = getRelativeTime(a.lastUpdated).days;
                    const daysB = getRelativeTime(b.lastUpdated).days;
                    return daysB - daysA;
                  }
                  return 0;
                });

                // Count active drafts (excluding archived)
                const activeDraftsCount = draftContracts.filter(d => !getRelativeTime(d.lastUpdated).isArchived).length;
                const archivedDraftsCount = draftContracts.filter(d => getRelativeTime(d.lastUpdated).isArchived).length;

                // Find oldest unupdated active draft for the warning banner
                const overdueActiveDrafts = draftContracts.filter(d => {
                  const rel = getRelativeTime(d.lastUpdated);
                  return !rel.isArchived && rel.isOverdue;
                });
                const oldestOverdueDraft = overdueActiveDrafts.sort((a, b) => {
                  return getRelativeTime(b.lastUpdated).days - getRelativeTime(a.lastUpdated).days;
                })[0];

                const handleDeleteDraft = (id: string) => {
                  const updated = draftContracts.filter(d => d.id !== id);
                  setDraftContracts(updated);
                  localStorage.setItem('ipti_draft_contracts', JSON.stringify(updated));
                  setDeleteConfirmId(null);
                };

                const handleRestoreArchived = (draft: any) => {
                  // Update its lastUpdated to now to bring it back to active list
                  const updated = draftContracts.map(d => {
                    if (d.id === draft.id) {
                      return { ...d, lastUpdated: new Date('2026-07-05T23:17:37-07:00').toISOString() };
                    }
                    return d;
                  });
                  setDraftContracts(updated);
                  localStorage.setItem('ipti_draft_contracts', JSON.stringify(updated));
                };

                return (
                  <div className="space-y-6 animate-fade-in text-left">
                    {/* Title and subtitle */}
                    <div className="border-b border-slate-100 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2.5">
                          <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></span>
                          <span>Hồ sơ nháp đang xử lý</span>
                        </h2>
                        <p className="text-slate-400 text-xs font-semibold mt-1">
                          {activeDraftsCount} hồ sơ nháp đang chờ hoàn thiện trong danh sách chính
                        </p>
                      </div>

                      {/* Sub-tabs Capsule */}
                      <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start">
                        <button
                          type="button"
                          onClick={() => setDraftFilter('active')}
                          className={`px-3.5 py-1.5 text-xs font-black rounded-lg transition-all ${draftFilter === 'active' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          Đang xử lý ({activeDraftsCount})
                        </button>
                        <button
                          type="button"
                          onClick={() => setDraftFilter('archived')}
                          className={`px-3.5 py-1.5 text-xs font-black rounded-lg transition-all ${draftFilter === 'archived' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          Kho lưu trữ ({archivedDraftsCount})
                        </button>
                      </div>
                    </div>

                    {/* Filter & Sort Controls Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                      {/* Search */}
                      <div className="relative w-full max-w-md">
                        <Search className="absolute left-3.5 top-3.5 text-slate-400" size={14} />
                        <input
                          type="text"
                          placeholder="Tìm kiếm theo mã hồ sơ, tên công ty hoặc MST..."
                          value={draftSearch}
                          onChange={(e) => setDraftSearch(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white rounded-xl text-xs font-semibold outline-none transition-all"
                        />
                        {draftSearch && (
                          <button 
                            onClick={() => setDraftSearch('')} 
                            className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 text-xs font-bold"
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      {/* Sorting */}
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400 font-bold whitespace-nowrap">Sắp xếp:</span>
                        <select
                          value={draftSort}
                          onChange={(e: any) => setDraftSort(e.target.value)}
                          className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-black py-2.5 px-3 rounded-xl outline-none focus:border-amber-500 transition cursor-pointer"
                        >
                          <option value="newest">Cập nhật: Mới nhất</option>
                          <option value="oldest">Cập nhật: Cũ nhất</option>
                          <option value="overdue">Thời gian trễ hạn giảm dần</option>
                        </select>
                      </div>
                    </div>

                    {/* List/Table Container */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs min-w-[700px]">
                          <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                              <th className="py-4.5 px-5">Mã hồ sơ</th>
                              <th className="py-4.5 px-4">Doanh nghiệp đối tác</th>
                              <th className="py-4.5 px-4">Tiến độ</th>
                              <th className="py-4.5 px-4">Cập nhật cuối</th>
                              <th className="py-4.5 px-4 text-right">Phí dự kiến</th>
                              <th className="py-4.5 px-5 text-right">Thao tác</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100/60">
                            {sortedDrafts.length === 0 ? (
                              <tr>
                                <td colSpan={6} className="py-12 text-center text-slate-400 font-bold space-y-2">
                                  <div className="text-3xl">📁</div>
                                  <p className="text-xs text-slate-400">Không có hồ sơ nháp nào khớp với bộ lọc hiện tại.</p>
                                </td>
                              </tr>
                            ) : (
                              sortedDrafts.map((draft) => {
                                const rel = getRelativeTime(draft.lastUpdated);
                                
                                return (
                                  <tr key={draft.id} className="group hover:bg-slate-50/40 transition-colors duration-150">
                                    {/* Draft ID */}
                                    <td className="py-4.5 px-5">
                                      <span className="font-mono font-black text-amber-600 text-xs block tracking-tight">{draft.id}</span>
                                      <span className="text-[10px] text-slate-400 font-bold block mt-0.5">Khởi tạo: {draft.date}</span>
                                    </td>
                                    
                                    {/* Company Details */}
                                    <td className="py-4.5 px-4">
                                      <span className="font-extrabold text-slate-800 text-xs block leading-tight">{draft.company}</span>
                                      <span className="text-[10px] text-slate-400 font-bold block mt-1">
                                        MST: {draft.taxCode || '—'} · {draft.headcount} nhân sự
                                      </span>
                                    </td>
                                    
                                    {/* Progress Badge */}
                                    <td className="py-4.5 px-4">
                                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                                        draft.step >= 6 
                                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                                      }`}>
                                        Bước {draft.step}/8
                                      </span>
                                    </td>
                                    
                                    {/* Last Updated Badge */}
                                    <td className="py-4.5 px-4">
                                      {rel.isOverdue ? (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-red-50 text-red-600 border border-red-200">
                                          <Clock size={11} className="stroke-[2.5]" />
                                          <span>{rel.text}</span>
                                        </span>
                                      ) : (
                                        <span className="inline-flex items-center gap-1 text-slate-500 font-semibold text-[11px]">
                                          <Clock size={11} className="text-slate-400" />
                                          <span>{rel.text}</span>
                                        </span>
                                      )}
                                    </td>
                                    
                                    {/* Estimated Premium */}
                                    <td className="py-4.5 px-4 text-right">
                                      {draft.step >= 5 ? (
                                        <span className="font-black text-slate-900 text-xs tracking-tight">
                                          ~ {formatVnd(draft.amount)}
                                        </span>
                                      ) : (
                                        <span className="text-slate-400 font-bold text-[11px] italic">
                                          Chưa xác định
                                        </span>
                                      )}
                                    </td>
                                    
                                    {/* Actions */}
                                    <td className="py-4.5 px-5 text-right">
                                      <div className="flex items-center justify-end gap-2">
                                        {draftFilter === 'archived' ? (
                                          <button
                                            type="button"
                                            onClick={() => handleRestoreArchived(draft)}
                                            className="px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 font-black rounded-xl text-[10px] transition border border-amber-200"
                                          >
                                            Phục hồi
                                          </button>
                                        ) : (
                                          <button
                                            type="button"
                                            onClick={() => handleResumeDraft(draft)}
                                            className="px-3.5 py-1.5 bg-[#03377B] hover:bg-blue-800 text-white font-black rounded-xl text-[10px] transition shadow-sm"
                                          >
                                            Làm tiếp
                                          </button>
                                        )}
                                        
                                        <button
                                          type="button"
                                          onClick={() => setDeleteConfirmId(draft.id)}
                                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg border border-slate-200 hover:border-red-200 transition"
                                          title="Xóa hồ sơ nháp"
                                        >
                                          <Trash2 size={13} />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Warning Auto-archive Banner */}
                    {draftFilter === 'active' && oldestOverdueDraft && (
                      <div className="bg-red-50 border border-red-100 text-red-800 text-xs px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm mt-4 animate-fade-in text-left">
                        <AlertTriangle className="text-red-500 flex-shrink-0" size={16} />
                        <span className="font-semibold leading-relaxed">
                          ⚠️ Hồ sơ <strong className="font-extrabold">{oldestOverdueDraft.id}</strong> chưa cập nhật {getRelativeTime(oldestOverdueDraft.lastUpdated).days} ngày. Hệ thống sẽ tự động lưu trữ sau 30 ngày không thao tác.
                        </span>
                      </div>
                    )}

                    {/* Deletion Confirmation Modal */}
                    {deleteConfirmId && (() => {
                      const draftToDelete = draftContracts.find(d => d.id === deleteConfirmId);
                      return (
                        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
                          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100 text-center space-y-4">
                            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-2">
                              <Trash2 size={24} />
                            </div>
                            <h3 className="text-base font-black text-slate-800">Xác nhận xóa hồ sơ nháp?</h3>
                            <p className="text-slate-500 text-xs leading-relaxed">
                              Bạn có chắc chắn muốn xóa vĩnh viễn hồ sơ nháp <strong className="font-bold text-slate-800">{deleteConfirmId}</strong> của doanh nghiệp <strong className="font-bold text-slate-800">{draftToDelete?.company || 'đối tác'}</strong> không? Hành động này không thể hoàn tác.
                            </p>
                            <div className="flex items-center gap-3 pt-2">
                              <button
                                type="button"
                                onClick={() => setDeleteConfirmId(null)}
                                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl border border-slate-200 transition"
                              >
                                Hủy bỏ
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteDraft(deleteConfirmId)}
                                className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-red-600/10"
                              >
                                Xác nhận xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                );
              })()}

              {/* ── HISTORY / COMPLETED CONTRACTS VIEW ── */}
              {currentStep === 0 && activeTab === 'history' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                      <span>Hợp đồng đã cấp thành công</span>
                    </h2>
                    <p className="text-slate-400 text-xs font-semibold mt-1">
                      Danh sách hợp đồng bảo hiểm sức khỏe doanh nghiệp đã hoàn thành thanh toán và phát hành e-card
                    </p>
                  </div>

                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs min-w-[700px]">
                        <thead>
                          <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                            <th className="py-4.5 px-5">Mã hợp đồng / GCN</th>
                            <th className="py-4.5 px-4">Doanh nghiệp đối tác</th>
                            <th className="py-4.5 px-4">Sản phẩm</th>
                            <th className="py-4.5 px-4 text-center">Trạng thái</th>
                            <th className="py-4.5 px-4 text-right">Tổng phí bảo hiểm</th>
                            <th className="py-4.5 px-5 text-right">Chứng nhận</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/60">
                          {completedContracts.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="py-12 text-center text-slate-400 font-semibold">
                                Không có hợp đồng nào được cấp thành công.
                              </td>
                            </tr>
                          ) : (
                            completedContracts.map((cnt) => (
                              <tr key={cnt.id} className="group hover:bg-slate-50/40 transition-colors duration-150">
                                <td className="py-4.5 px-5">
                                  <span className="font-mono font-black text-emerald-600 text-xs block tracking-tight">{cnt.id}</span>
                                  <span className="text-[10px] text-slate-400 font-bold block mt-0.5">Cấp đơn: {cnt.date}</span>
                                </td>
                                <td className="py-4.5 px-4">
                                  <span className="font-extrabold text-slate-800 text-xs block leading-tight">{cnt.company}</span>
                                  <span className="text-[10px] text-slate-400 font-bold block mt-1">MST: {cnt.taxCode} · {cnt.headcount} nhân sự</span>
                                </td>
                                <td className="py-4.5 px-4">
                                  <span className="font-semibold text-slate-600 text-[11px]">Sức khỏe PTI Care (EB)</span>
                                </td>
                                <td className="py-4.5 px-4 text-center">
                                  <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    Đã phát hành đơn
                                  </span>
                                </td>
                                <td className="py-4.5 px-4 text-right">
                                  <span className="font-black text-slate-900 text-xs tracking-tight">{formatVnd(cnt.premium)}</span>
                                </td>
                                <td className="py-4.5 px-5 text-right">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const alertDiv = document.createElement('div');
                                      alertDiv.className = "fixed top-5 right-5 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-2xl z-50 animate-bounce font-bold";
                                      alertDiv.innerHTML = `⬇️ Đang tải xuống Giấy chứng nhận & Thẻ e-card của hợp đồng ${cnt.id}...`;
                                      document.body.appendChild(alertDiv);
                                      setTimeout(() => alertDiv.remove(), 2500);
                                    }}
                                    className="text-[10px] text-[#03377B] hover:text-[#00285d] hover:underline flex items-center justify-end gap-1 font-bold ml-auto transition-colors"
                                  >
                                    <Printer size={12} className="text-[#03377B]" />
                                    <span>Tải e-card</span>
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}


              {/* ── SUB-VIEW B: WIZARD STEPS (1-8) ── */}
              {currentStep > 0 && selectedProduct && selectedProduct !== 'health_pti' && (
                <div className="animate-slide-in">
                  <UnifiedIssuanceFlow
                    product={selectedProduct}
                    user={user}
                    onClose={() => { setSelectedProduct(null); setCurrentStep(0); setActiveTab('dashboard'); }}
                    onComplete={(contractData) => {
                      setCompletedContracts(prev => [contractData, ...prev]);
                      setSelectedProduct(null);
                      setCurrentStep(0);
                      setActiveTab('dashboard');
                    }}
                  />
                </div>
              )}

              {currentStep > 0 && (!selectedProduct || selectedProduct === 'health_pti') && (
                <div className="space-y-6 animate-slide-in">
                  
                  {/* Cohesive Glassmorphic Banner for health_pti */}
                  <div className="relative rounded-[2rem] p-6 text-white overflow-hidden shadow-2xl border border-white/25 bg-gradient-to-br from-[#03377B] via-[#022D66] to-[#011B3D] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Apple iOS backlight glow */}
                    <div className="absolute -top-12 right-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-12 left-1/4 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl"></div>
                    
                    {/* Left column details */}
                    <div className="md:col-span-8 flex items-center gap-5 relative z-10">
                      <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg flex-shrink-0">
                        <span className="text-2xl">🏥</span>
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] bg-white/15 border border-white/10 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                            Quy tắc 270/QĐ-PTI-BHCN
                          </span>
                          <span className="text-[10px] bg-amber-500/20 border border-amber-500/30 text-amber-300 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                            iPTI Premium
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black mt-2 tracking-tight">Bảo hiểm Sức khỏe PTI Care (EB)</h2>
                        <p className="text-blue-100/80 text-xs mt-1.5 max-w-xl leading-relaxed">
                          Chương trình bảo vệ sức khỏe toàn diện dành cho Doanh nghiệp, tự động phân hạng quyền lợi và thẩm định bệnh lý có sẵn 24/7.
                        </p>
                      </div>
                    </div>

                    {/* Right column: 3D Illustration in an Apple Glass card */}
                    <div className="md:col-span-4 relative z-10 flex justify-center md:justify-end">
                      <div className="w-full max-w-[200px] bg-white/5 backdrop-blur-md p-1 rounded-2xl border border-white/10 shadow-xl transform hover:scale-105 transition-transform duration-300">
                        <HealthPti3D />
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Step Bar */}
                  <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      
                      <div className="flex items-center gap-3">
                        <span className="bg-[#03377B] text-white w-9 h-9 flex items-center justify-center font-black rounded-xl text-sm shadow">
                          {currentStep}
                        </span>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">BẢO HIỂM DOANH NGHIỆP PTI CARE</span>
                          <span className="text-sm font-black text-slate-800">
                            {currentStep === 1 && 'Bước 1: Khảo sát và Upload giấy kèm ĐKKD'}
                            {currentStep === 2 && 'Bước 2: Bảng chào phí nhanh và AI phân bổ'}
                            {currentStep === 3 && 'Bước 3: Khai báo Sức khỏe &amp; Danh sách Nhân sự'}
                            {currentStep === 4 && 'Bước 4: Thiết lập Hợp đồng khung &amp; Hóa đơn'}
                            {currentStep === 5 && 'Bước 5: Thanh toán phí &amp; Auto phát hành e-card'}
                          </span>
                        </div>
                      </div>

                      {/* Phase Badge */}
                      <div className="flex items-center gap-3">
                        {currentStep <= 2 ? (
                          <div className="bg-[#03377B]/10 border border-[#03377B]/20 text-[#03377B] px-3.5 py-1.5 rounded-xl text-left">
                            <span className="text-[8px] font-extrabold uppercase tracking-widest block text-[#03377B]/60">GIAI ĐOẠN 1</span>
                            <span className="text-[11px] font-black block">Báo giá &amp; Chốt sơ bộ (Xem nháp)</span>
                          </div>
                        ) : (
                          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-1.5 rounded-xl text-left">
                            <span className="text-[8px] font-extrabold uppercase tracking-widest block text-emerald-600">GIAI ĐOẠN 2</span>
                            <span className="text-[11px] font-black block">Phát hành chính thức (Đã đồng ý)</span>
                          </div>
                        )}

                        {/* Step progress dots */}
                        <div className="flex items-center gap-1.5">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <div 
                              key={idx} 
                              className={`h-2 rounded-full transition-all duration-300 ${idx + 1 === currentStep ? 'w-8 bg-[#03377B]' : idx + 1 < currentStep ? 'w-3 bg-emerald-500' : 'w-3 bg-slate-200'}`}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ──────────────────────────────────────────────────
                       STEP 1: KHẢO SÁT & HỒ SƠ PHÁP LÝ (GIAI ĐOẠN 1)
                     ────────────────────────────────────────────────── */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      
                      {/* 1. Thông tin doanh nghiệp */}
                      <div className="card border border-slate-100">
                        <div className="card-title justify-between">
                          <span className="text-slate-800 font-bold flex items-center gap-2">
                            <Building className="text-[#03377B]" size={18} />
                            <span>1. Thông tin cơ bản Doanh nghiệp</span>
                          </span>
                          <button
                            type="button"
                            onClick={handleLookupTaxId}
                            disabled={isSearchingMst}
                            className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#03377B] text-xs font-bold rounded-lg border border-blue-200 transition flex items-center gap-1"
                          >
                            {isSearchingMst ? (
                              <>
                                <RefreshCw className="animate-spin" size={12} />
                                <span>Đang tra cứu...</span>
                              </>
                            ) : (
                              <>
                                <Search size={12} />
                                <span>⚡ Tra cứu MST nhanh</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 mb-6">Điền thông tin doanh nghiệp mua bảo hiểm. Click Tra cứu MST nhanh để tự động điền thông tin mẫu.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Mã số thuế doanh nghiệp *</label>
                            <input
                              type="text"
                              value={companyInfo.taxCode}
                              onChange={(e) => setCompanyInfo({ ...companyInfo, taxCode: e.target.value })}
                              placeholder="Nhập mã số thuế doanh nghiệp"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Tên doanh nghiệp mua bảo hiểm *</label>
                            <input
                              type="text"
                              value={companyInfo.name}
                              onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                              placeholder="Nhập tên đầy đủ của công ty"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition font-bold text-slate-800"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Ngành nghề kinh doanh chính *</label>
                            <select
                              value={companyInfo.industry}
                              onChange={(e) => setCompanyInfo({ ...companyInfo, industry: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition"
                            >
                              <option value="">-- Chọn ngành nghề --</option>
                              <option value="Công nghệ thông tin / Phần mềm">Công nghệ thông tin / Phần mềm</option>
                              <option value="Sản xuất / Chế biến">Sản xuất / Chế biến</option>
                              <option value="Tài chính / Ngân hàng / Bảo hiểm">Tài chính / Ngân hàng / Bảo hiểm</option>
                              <option value="Thương mại / Bán lẻ">Thương mại / Bán lẻ</option>
                              <option value="Xây dựng / Bất động sản">Xây dựng / Bất động sản</option>
                              <option value="Y tế / Dược phẩm">Y tế / Dược phẩm</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Quy mô doanh nghiệp</label>
                            <select
                              value={companyInfo.size}
                              onChange={(e) => setCompanyInfo({ ...companyInfo, size: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition"
                            >
                              <option value="">-- Chọn quy mô --</option>
                              <option value="Nhỏ (dưới 50 NV)">Nhỏ (dưới 50 NV)</option>
                              <option value="Vừa (50 – 200 NV)">Vừa (50 – 200 NV)</option>
                              <option value="Lớn (200 – 1000 NV)">Lớn (200 – 1000 NV)</option>
                              <option value="Tập đoàn (trên 1000 NV)">Tập đoàn (trên 1000 NV)</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Người đại diện liên hệ (HR / Admin) *</label>
                            <input
                              type="text"
                              value={companyInfo.contactName}
                              onChange={(e) => setCompanyInfo({ ...companyInfo, contactName: e.target.value })}
                              placeholder="Họ và tên người liên hệ trực tiếp"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Chức vụ người liên hệ</label>
                            <input
                              type="text"
                              value={companyInfo.contactRole}
                              onChange={(e) => setCompanyInfo({ ...companyInfo, contactRole: e.target.value })}
                              placeholder="VD: Trưởng phòng nhân sự, Admin..."
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Số điện thoại liên hệ *</label>
                            <input
                              type="text"
                              value={companyInfo.phone}
                              onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                              placeholder="Nhập số điện thoại liên lạc"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Email liên hệ nhận báo giá &amp; hóa đơn *</label>
                            <input
                              type="email"
                              value={companyInfo.email}
                              onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                              placeholder="VD: hr@congty.com"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition font-semibold"
                            />
                          </div>

                          <div className="col-span-1 md:col-span-2 space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Địa chỉ trụ sở chính doanh nghiệp</label>
                            <input
                              type="text"
                              value={companyInfo.address}
                              onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                              placeholder="Nhập số nhà, tên đường, phường, quận, tỉnh/thành phố..."
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Kênh khai thác tiếp cận</label>
                            <select
                              value={companyInfo.channel}
                              onChange={(e) => setCompanyInfo({ ...companyInfo, channel: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition"
                            >
                              <option value="Zalo">Zalo liên hệ trực tiếp</option>
                              <option value="Email">Email Marketing</option>
                              <option value="Hotline">Hotline / Tổng đài PTI</option>
                              <option value="Tự tìm kiếm">Cán bộ CA tự khai thác tìm kiếm</option>
                              <option value="Đại lý giới thiệu">Qua đại lý liên kết giới thiệu</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* 2. Đăng ký Giấy phép kinh doanh ngay */}
                      <div className="card border border-slate-100">
                        <div className="card-title">
                          <FileText className="text-[#03377B]" size={18} />
                          <span>2. Upload Giấy phép Đăng ký Kinh doanh (GPKD)</span>
                        </div>
                        <p className="text-xs text-slate-500 mb-4">Cung cấp bản chụp hoặc bản quét Giấy phép ĐKKD để làm cơ sở pháp lý và đẩy nhanh tiến trình chốt sơ bộ.</p>
                        
                        <div className="border-2 border-dashed border-slate-200 bg-slate-50/50 hover:border-[#03377B] rounded-2xl p-6 text-center transition cursor-pointer relative group flex flex-col items-center justify-center">
                          {gpkdFileName ? (
                            <div className="space-y-2 animate-fade-in text-center">
                              <span className="text-3xl">📄</span>
                              <p className="text-xs font-bold text-slate-800">{gpkdFileName}</p>
                              <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                                ✓ Đã đính kèm GPKD thành công
                              </span>
                            </div>
                          ) : (
                            <div className="space-y-2 text-center">
                              <span className="text-3xl block text-slate-300 group-hover:scale-110 transition-transform">📁</span>
                              <p className="text-xs font-semibold text-slate-500">Kéo thả file ĐKKD (.pdf, .jpg, .png) hoặc Click vào đây</p>
                            </div>
                          )}
                          
                          <button
                            type="button"
                            onClick={() => {
                              setGpkdFileName('GPKD_' + (companyInfo.taxCode || '0102934827') + '.pdf');
                            }}
                            className="mt-4 px-4 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#03377B] text-xs font-bold rounded-lg border border-blue-200 transition"
                          >
                            {gpkdFileName ? 'Thay đổi file' : '⚡ Tự động nạp bản scan GPKD mẫu'}
                          </button>
                        </div>
                      </div>

                      {/* 3. Quy mô, ngân sách và lịch sử bồi thường */}
                      <div className="card border border-slate-100">
                        <div className="card-title">
                          <Users className="text-[#03377B]" size={18} />
                          <span>3. Quy mô nhân sự &amp; Cơ cấu Ngân sách dự kiến</span>
                        </div>
                        <p className="text-xs text-slate-500 mb-6">Xác định tổng số lượng nhân sự tham gia bảo hiểm, thiết lập độ tuổi, giới tính và khoảng ngân sách đầu người để PTI Care đề xuất gói bảo hiểm tối ưu.</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          
                          {/* Left Column: Headcount & Budget */}
                          <div className="md:col-span-2 space-y-6">
                            
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Tổng số lượng nhân viên (Min 5) *</label>
                                <span className="text-lg font-black text-[#03377B] font-mono">{groupSizeInfo.headcount} người</span>
                              </div>
                              <div className="flex gap-2">
                                <div className="relative flex-1">
                                  <input
                                    type="number"
                                    min="5"
                                    max="500"
                                    value={groupSizeInfo.headcount}
                                    onChange={(e) => {
                                      const val = parseInt(e.target.value);
                                      setGroupSizeInfo({ ...groupSizeInfo, headcount: isNaN(val) ? 0 : val });
                                    }}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#03377B] focus:bg-white transition font-black text-slate-800"
                                    placeholder="VD: 15"
                                  />
                                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">nhân viên</span>
                                </div>
                                <div className="flex gap-1">
                                  <button
                                    type="button"
                                    onClick={() => setGroupSizeInfo({ ...groupSizeInfo, headcount: Math.max(5, groupSizeInfo.headcount - 1) })}
                                    className="px-4 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 text-xs font-black text-slate-700 transition"
                                  >
                                    -
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setGroupSizeInfo({ ...groupSizeInfo, headcount: groupSizeInfo.headcount + 1 })}
                                    className="px-4 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 text-xs font-black text-slate-700 transition"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              {groupSizeInfo.headcount < 5 && (
                                <p className="text-[10px] text-rose-500 font-bold">⚠️ Bảo hiểm sức khỏe nhóm PTI Care yêu cầu tối thiểu 5 nhân viên.</p>
                              )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 tracking-wide">Tỷ lệ nhân sự Nữ giới (%)</label>
                                <div className="relative">
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={groupSizeInfo.femaleRatio}
                                    onChange={(e) => setGroupSizeInfo({ ...groupSizeInfo, femaleRatio: parseInt(e.target.value) || 0 })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition font-semibold"
                                  />
                                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
                                </div>
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 tracking-wide">Độ tuổi trung bình</label>
                                <div className="relative">
                                  <input
                                    type="number"
                                    min="18"
                                    max="65"
                                    value={groupSizeInfo.averageAge}
                                    onChange={(e) => setGroupSizeInfo({ ...groupSizeInfo, averageAge: parseInt(e.target.value) || 0 })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition font-semibold"
                                  />
                                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">tuổi</span>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 tracking-wide">Ngân sách dự kiến/đầu người (VNĐ/năm) *</label>
                                <input
                                  type="number"
                                  step="500000"
                                  value={groupSizeInfo.budgetPerHead || ''}
                                  onChange={(e) => setGroupSizeInfo({ ...groupSizeInfo, budgetPerHead: parseInt(e.target.value) || 0 })}
                                  placeholder="VD: 2500000"
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition font-bold text-slate-900"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 tracking-wide">Phạm vi địa lý bảo lãnh</label>
                                <select
                                  value={groupSizeInfo.geography}
                                  onChange={(e) => setGroupSizeInfo({ ...groupSizeInfo, geography: e.target.value })}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#03377B] focus:bg-white transition"
                                >
                                  <option value="Việt Nam">Nội địa Việt Nam (Bảo lãnh viện phí liên kết)</option>
                                  <option value="Toàn cầu">Toàn cầu mở rộng (Áp dụng VIP)</option>
                                </select>
                              </div>
                            </div>

                          </div>

                          {/* Right Column: Previous Insurance & Loss Ratio */}
                          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                            <span className="text-[11px] font-black text-slate-800 uppercase tracking-widest block">Lịch sử bảo hiểm nhóm</span>
                            
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 tracking-wide">Đã mua bảo hiểm sức khỏe trước đây?</label>
                              <select
                                value={groupSizeInfo.prevInsurance}
                                onChange={(e) => setGroupSizeInfo({ ...groupSizeInfo, prevInsurance: e.target.value as 'yes' | 'no' })}
                                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-[#03377B] transition"
                              >
                                <option value="no">Chưa có (Mua mới hoàn toàn)</option>
                                <option value="yes">Đã từng mua bảo hiểm nhóm</option>
                              </select>
                            </div>

                            {groupSizeInfo.prevInsurance === 'yes' && (
                              <div className="space-y-1.5 animate-fade-in">
                                <label className="text-xs font-bold text-[#03377B] tracking-wide">Tỷ lệ bồi thường năm trước (%)</label>
                                <input
                                  type="number"
                                  value={groupSizeInfo.lossRatio}
                                  onChange={(e) => setGroupSizeInfo({ ...groupSizeInfo, lossRatio: parseInt(e.target.value) || 0 })}
                                  placeholder="VD: 65"
                                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-[#03377B] transition font-semibold"
                                />
                                <span className="text-[9px] text-slate-400 block leading-tight">Dưới 80%: Đạt chuẩn và nhận ưu đãi giảm phí</span>
                              </div>
                            )}

                            <div className="space-y-1.5 pt-1.5">
                              <label className="text-xs font-bold text-slate-700 tracking-wide">Thời hạn đơn bảo hiểm</label>
                              <select
                                value={groupSizeInfo.duration}
                                onChange={(e) => setGroupSizeInfo({ ...groupSizeInfo, duration: e.target.value })}
                                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-[#03377B] transition"
                              >
                                <option value="1 năm (tiêu chuẩn)">1 năm (Tiêu chuẩn 12 tháng)</option>
                                <option value="6 tháng">Ngắn hạn 6 tháng</option>
                                <option value="Khác">Phát hành trùng ngày tài chính</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}
                                {/* ──────────────────────────────────────────────────
                       STEP 2: BẢNG CHÀO GIÁ TỨC THỜI (GIAI ĐOẠN 1)
                     ────────────────────────────────────────────────── */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      
                      {/* Interactive Auto Recommendation Panel */}
                      <div className="bg-gradient-to-br from-[#03377B] to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-white/5 space-y-4">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">🤖</span>
                          <div>
                            <h4 className="text-sm font-black tracking-wider text-blue-200 uppercase">Engine Gợi ý Phân loại Quyền lợi Tự động</h4>
                            <p className="text-[11px] text-white/60">Bộ quy chuẩn đề xuất iPTI Premium dựa trên Ngân sách &amp; Quy mô</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs pt-1">
                          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                            <span className="text-[10px] text-blue-200/70 block uppercase tracking-wide">Quy mô nhân viên</span>
                            <span className="font-bold block mt-1">{groupSizeInfo.headcount} người</span>
                            <span className="text-[9px] text-emerald-400 block mt-0.5">
                              {groupSizeInfo.headcount >= 50 ? '✓ Nhóm lớn: Miễn thời gian chờ' : 'ℹ️ Nhóm nhỏ: Có thời gian chờ'}
                            </span>
                          </div>

                          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                            <span className="text-[10px] text-blue-200/70 block uppercase tracking-wide">Ngân sách bình quân</span>
                            <span className="font-bold block mt-1">{formatVnd(groupSizeInfo.budgetPerHead)} /người</span>
                            <span className="text-[9px] text-blue-300 block mt-0.5">Tương thích: {recommendedProgram.name}</span>
                          </div>

                          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                            <span className="text-[10px] text-blue-200/70 block uppercase tracking-wide">Tỷ lệ Nữ giới</span>
                            <span className="font-bold block mt-1">{groupSizeInfo.femaleRatio}%</span>
                            <span className="text-[9px] text-amber-300 block mt-0.5">
                              {groupSizeInfo.femaleRatio > 40 ? '⚡ Đề xuất mua kèm Thai Sản' : 'Bỏ qua tùy chọn Thai sản'}
                            </span>
                          </div>

                          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                            <span className="text-[10px] text-blue-200/70 block uppercase tracking-wide">Độ tuổi trung bình</span>
                            <span className="font-bold block mt-1">{groupSizeInfo.averageAge} tuổi</span>
                            <span className="text-[9px] text-emerald-400 block mt-0.5">Nhóm tuổi lao động trẻ, rủi ro thấp</span>
                          </div>
                        </div>

                        <div className="bg-white/10 p-4 rounded-xl border border-white/10 flex items-center justify-between gap-4">
                          <div className="space-y-1 text-left">
                            <span className="text-[10px] uppercase tracking-wide text-amber-300 font-bold">Chương trình đề xuất chủ đạo</span>
                            <div className="text-sm font-black text-white flex items-center gap-1">
                              <Sparkles size={14} className="text-amber-400 animate-pulse" />
                              <span>{recommendedProgram.name} ({recommendedProgram.id === 'ct-3' ? 'Hạng Vàng' : recommendedProgram.id === 'ct-2' ? 'Hạng Bạc' : 'Hạng Đồng'})</span>
                            </div>
                            <p className="text-xs text-slate-200">{recommendedProgram.reason}</p>
                          </div>
                          <span className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow">
                            RECOMMENDED
                          </span>
                        </div>
                      </div>

                      {/* Display of programs side-by-side */}
                      <div className="card border border-slate-100 text-left">
                        <div className="flex items-center gap-2 mb-4">
                          <Award className="text-[#03377B]" size={18} />
                          <span className="text-sm font-extrabold text-slate-800">Quy chuẩn Quyền lợi 3 Chương trình PTI Care</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          {PROGRAMS.map((prog) => {
                            const isRecommended = prog.id === recommendedProgram.id;
                            return (
                              <div 
                                key={prog.id} 
                                className={`rounded-2xl border-2 p-4 relative transition-all duration-200 ${isRecommended ? 'border-[#03377B] bg-blue-50/20 shadow-lg' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                              >
                                {isRecommended && (
                                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#03377B] text-white text-[8px] font-black px-3 py-0.5 rounded-full uppercase tracking-widest shadow">
                                    ĐỀ XUẤT
                                  </span>
                                )}

                                <div className="space-y-0.5">
                                  <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold block">{prog.tierLabel}</span>
                                  <h4 className="text-sm font-black text-slate-900">{prog.name}</h4>
                                </div>

                                <div className="border-t border-slate-100 pt-3 mt-3 space-y-2 text-[11px]">
                                  <div className="flex justify-between border-b border-slate-50 pb-1.5">
                                    <span className="text-slate-400">Nội trú tối đa:</span>
                                    <span className="font-bold text-slate-800">{prog.inpatientBenefit}</span>
                                  </div>
                                  <div className="flex justify-between border-b border-slate-50 pb-1.5">
                                    <span className="text-slate-400">Ngoại trú tối đa:</span>
                                    <span className="font-bold text-slate-800">{prog.outpatientBenefit}</span>
                                  </div>
                                  <div className="flex justify-between border-b border-slate-50 pb-1.5">
                                    <span className="text-slate-400">Tai nạn cá nhân:</span>
                                    <span className="font-bold text-slate-800">{prog.accidentBenefit}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Chăm sóc Răng:</span>
                                    <span className={`font-bold ${prog.dentalBenefit === 'Không áp dụng' ? 'text-slate-400' : 'text-emerald-600'}`}>{prog.dentalBenefit}</span>
                                  </div>
                                </div>
                                <div className="border-t border-slate-150 pt-3 mt-3 text-center">
                                  <span className="text-[9px] text-slate-400 block">Đơn giá cơ bản / người / năm</span>
                                  <span className="text-base font-black text-[#03377B] block mt-0.5">{formatVnd(prog.ratePerHead)}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Interactive Allocation & Pricing Customizer */}
                      <QuotationCalculator
                        tiers={tiers}
                        programs={PROGRAMS}
                        onChangeTiers={setTiers}
                        discountRate={discountRate}
                        onChangeDiscountRate={setDiscountRate}
                        commissionRate={commissionRate}
                        onChangeCommissionRate={setCommissionRate}
                        role={user.role}
                        headcount={groupSizeInfo.headcount}
                        quoteVersions={quoteVersions}
                        onCreateNewVersion={handleCreateNewVersion}
                        onRestoreVersion={handleRestoreVersion}
                        quoteApprovalStatus={quoteApprovalStatus}
                        onChangeApprovalStatus={setQuoteApprovalStatus}
                      />

                      {/* Instant Quotation Action Buttons */}
                      {quoteApprovalStatus === 'Pending_Approval' ? (
                        <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-6 text-left space-y-3 shadow-sm">
                          <div className="flex items-start gap-3">
                            <ShieldAlert className="text-amber-600 mt-0.5 shrink-0" size={18} />
                            <div>
                              <span className="text-[10px] font-extrabold text-amber-700 uppercase tracking-wider block">YÊU CẦU DUYỆT VƯỢT CHUẨN (STP/MCV)</span>
                              <h4 className="text-sm font-black text-amber-900 mt-1">Đang chờ phê duyệt từ Trưởng nhóm nghiệp vụ</h4>
                              <p className="text-xs text-amber-800 leading-relaxed">
                                Báo giá này có chiết khấu vượt chuẩn 20% hoặc có tùy chỉnh quyền lợi riêng. Hệ thống đã tự động route vào hàng đợi duyệt của Trưởng nhóm. Vui lòng bấm <strong>Phê duyệt (Approve)</strong> tại bảng giả lập phía trên trước khi tiếp tục gửi cho khách hàng.
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : quoteApprovalStatus === 'Supervisor_Rejected' ? (
                        <div className="bg-rose-50/70 border border-rose-200/80 rounded-3xl p-6 text-left space-y-3 shadow-sm">
                          <div className="flex items-start gap-3">
                            <ShieldAlert className="text-rose-600 mt-0.5 shrink-0" size={18} />
                            <div>
                              <span className="text-[10px] font-extrabold text-rose-700 uppercase tracking-wider block">BẢN CHÀO BỊ TỪ CHỐI</span>
                              <h4 className="text-sm font-black text-rose-900 mt-1">Trưởng nhóm đã từ chối bản chào vượt chuẩn này</h4>
                              <p className="text-xs text-rose-800 leading-relaxed">
                                Vui lòng giảm tỷ lệ chiết khấu xuống &le; 20% và đưa các quyền lợi chương trình về chuẩn cũ, hoặc khôi phục một phiên bản cũ hợp lệ từ mục <strong>Lịch sử các phiên bản Báo giá</strong>.
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 text-left space-y-4">
                          <div>
                            <span className="text-[10px] font-extrabold text-[#03377B] uppercase tracking-wider block">CHỐT SƠ BỘ — BÁO GIÁ NHANH</span>
                            <h4 className="text-sm font-black text-slate-800 mt-1">Xuất bản chào gửi Khách hàng duyệt trước</h4>
                            <p className="text-xs text-slate-500">Chưa ràng buộc pháp lý. Hỗ trợ xuất bản chào đẹp gửi đối tác.</p>
                          </div>

                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-3 border-t border-slate-200">
                            <button
                              type="button"
                              onClick={handleDownloadQuotePdf}
                              disabled={isDownloadingQuote}
                              className="px-5 py-2.5 bg-white hover:bg-slate-100 text-[#03377B] border border-slate-300 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                            >
                              {isDownloadingQuote ? (
                                <>
                                  <RefreshCw className="animate-spin text-[#03377B]" size={14} />
                                  <span>Đang xuất PDF...</span>
                                </>
                              ) : (
                                <>
                                  <Download size={14} />
                                  <span>TẢI BẢN CHÀO PHÍ (PDF)</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={handleSendQuoteEmail}
                              disabled={isSendingQuote}
                              className="px-6 py-2.5 bg-[#03377B] hover:bg-[#022D66] text-white text-xs font-black rounded-xl transition flex items-center justify-center gap-1.5 shadow-lg active:scale-95 cursor-pointer"
                            >
                              {isSendingQuote ? (
                                <>
                                  <RefreshCw className="animate-spin text-white" size={14} />
                                  <span>Đang gửi mail...</span>
                                </>
                              ) : (
                                <>
                                  <FileCheck size={14} strokeWidth={2.5} />
                                  <span>GỬI BÁO GIÁ CHO KHÁCH HÀNG</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      
                      {/* 1. EXCEL LIST UPLOAD ZONE */}
                      <div className="card border border-slate-150 text-left">
                        <div className="flex items-center justify-between gap-4 border-b border-slate-150 pb-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Upload className="text-[#03377B]" size={18} />
                            <span className="text-sm font-extrabold text-slate-800">Cung cấp Danh sách nhân viên &amp; GPKD thực tế</span>
                          </div>
                          <span className="bg-[#03377B]/10 text-[#03377B] text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                            GIAI ĐOẠN 2 — CẤP ĐƠN CHÍNH THỨC
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          
                          {/* Left: GPKD status */}
                          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                            <div>
                              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">1. Giấy phép Đăng ký kinh doanh (GPKD)</h4>
                              <p className="text-[11px] text-slate-400 mt-1">Sử dụng để đối soát tính pháp lý doanh nghiệp.</p>
                            </div>
                            
                            <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xl">📄</span>
                                <div className="text-left">
                                  <p className="text-xs font-bold text-slate-800">{gpkdFileName || `GPKD_${companyInfo.taxCode || '99999999'}.pdf`}</p>
                                  <span className="text-[9px] text-emerald-600 font-semibold block">✓ Đã đính kèm từ Bước 1</span>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setGpkdFileName('GPKD_Doi_Tac_' + (companyInfo.taxCode || '12345678') + '.pdf');
                                }}
                                className="text-[10px] text-[#03377B] hover:underline font-bold"
                              >
                                Thay đổi
                              </button>
                            </div>
                          </div>

                          {/* Right: Excel upload and template download */}
                          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                            <div>
                              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">2. Danh sách nhân sự thực tế (.xlsx)</h4>
                              <p className="text-[11px] text-slate-400 mt-1">Dùng để phân bổ quyền lợi và kê khai tình trạng sức khỏe của nhân viên.</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2">
                              <button
                                type="button"
                                onClick={() => alert('Đang tải xuống file mẫu danh sách nhân sự chuẩn PTI Care...')}
                                className="flex-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-[10px] font-bold py-2 rounded-xl transition flex items-center justify-center gap-1 shadow-sm"
                              >
                                <Download size={12} className="text-[#03377B]" />
                                <span>Tải Excel mẫu</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setExcelFileName('Danh_Sach_Nhan_Vien_Thuc_Te_iPTI.xlsx');
                                  // Re-trigger auto load if clicked
                                  handleNextStep(); // Trigger setup of tiers & employees if not done
                                }}
                                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-[10px] font-black py-2 rounded-xl transition flex items-center justify-center gap-1 shadow"
                              >
                                <span>⚡ Nạp nhanh danh sách mẫu</span>
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* 2. UNDERWRITING PANEL & HEALTH DECLARATION */}
                      <UnderwritingPanel
                        employees={employees}
                        onChangeEmployees={setEmployees}
                        tiers={tiers}
                        clientType={clientType}
                      />

                    </div>
                  )}
                  {/* ──────────────────────────────────────────────────
                       STEP 4: THIẾT LẬP HỢP ĐỒNG KHUNG & HÓA ĐƠN
                     ────────────────────────────────────────────────── */}
                  {currentStep === 4 && (
                    <div className="space-y-6 animate-fade-in">
                      
                      {/* Invoicing configuration */}
                      <div className="card border border-slate-100 text-left">
                        <div className="card-title">
                          <FileText className="text-[#03377B]" size={18} />
                          <span>Thông tin Hóa đơn &amp; Đối tượng thụ hưởng</span>
                        </div>
                        <p className="text-xs text-slate-500 mb-5">Xác định hình thức nhận hóa đơn tài chính VAT cho hợp đồng bảo hiểm sức khỏe nhóm.</p>

                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <button
                              type="button"
                              onClick={() => setInvoiceInfo({ ...invoiceInfo, type: 'pay_now' })}
                              className={`p-4 rounded-2xl border text-center transition ${invoiceInfo.type === 'pay_now' ? 'border-[#03377B] bg-blue-50/20' : 'border-slate-200 hover:border-slate-300'}`}
                            >
                              <span className="text-xl block mb-1">🏦</span>
                              <span className="text-xs font-bold text-slate-800 block">Thanh toán trực tiếp</span>
                              <span className="text-[10px] text-slate-400 block mt-0.5">Người mua trả tiền, không yêu cầu hóa đơn đỏ</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setInvoiceInfo({ 
                                ...invoiceInfo, 
                                type: 'invoice_buyer',
                                buyerName: companyInfo.name,
                                taxCode: companyInfo.taxCode,
                                address: companyInfo.address,
                                email: companyInfo.email
                              })}
                              className={`p-4 rounded-2xl border text-center transition ${invoiceInfo.type === 'invoice_buyer' ? 'border-[#03377B] bg-blue-50/20' : 'border-slate-200 hover:border-slate-300'}`}
                            >
                              <span className="text-xl block mb-1">🏢</span>
                              <span className="text-xs font-bold text-slate-800 block">Xuất HĐ cho Bên Mua (DN)</span>
                              <span className="text-[10px] text-slate-400 block mt-0.5">Xuất hóa đơn tài chính cho tên pháp nhân công ty</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setInvoiceInfo({ ...invoiceInfo, type: 'invoice_employee' })}
                              className={`p-4 rounded-2xl border text-center transition ${invoiceInfo.type === 'invoice_employee' ? 'border-[#03377B] bg-blue-50/20' : 'border-slate-200 hover:border-slate-300'}`}
                            >
                              <span className="text-xl block mb-1">👤</span>
                              <span className="text-xs font-bold text-slate-800 block">Xuất HĐ cho Người được BH</span>
                              <span className="text-[10px] text-slate-400 block mt-0.5">Xuất hóa đơn riêng cho từng cá nhân thành viên được BH</span>
                            </button>
                          </div>

                          {invoiceInfo.type !== 'pay_now' && (
                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 animate-fade-in text-xs text-left">
                              <span className="text-xs font-bold text-slate-600 block border-b border-slate-200 pb-1.5 uppercase">Chi tiết thông tin hóa đơn tài chính</span>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                  <label className="font-semibold text-slate-700">Tên bên mua bảo hiểm (Xuất hóa đơn) *</label>
                                  <input 
                                    type="text" 
                                    value={invoiceInfo.buyerName}
                                    onChange={(e) => setInvoiceInfo({ ...invoiceInfo, buyerName: e.target.value })}
                                    className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg"
                                  />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="font-semibold text-slate-700">Mã số thuế xuất hóa đơn *</label>
                                  <input 
                                    type="text" 
                                    value={invoiceInfo.taxCode}
                                    onChange={(e) => setInvoiceInfo({ ...invoiceInfo, taxCode: e.target.value })}
                                    className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg"
                                  />
                                </div>
                                <div className="space-y-1.5 sm:col-span-2">
                                  <label className="font-semibold text-slate-700">Địa chỉ xuất hóa đơn chính thức *</label>
                                  <input 
                                    type="text" 
                                    value={invoiceInfo.address}
                                    onChange={(e) => setInvoiceInfo({ ...invoiceInfo, address: e.target.value })}
                                    className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg"
                                  />
                                </div>
                                <div className="space-y-1.5 sm:col-span-2">
                                  <label className="font-semibold text-slate-700">Email nhận hóa đơn điện tử VAT *</label>
                                  <input 
                                    type="email" 
                                    value={invoiceInfo.email}
                                    onChange={(e) => setInvoiceInfo({ ...invoiceInfo, email: e.target.value })}
                                    className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Framework Contract & OTP Signing Card */}
                      <div className="card border border-slate-100 text-left">
                        <div className="card-title">
                          <ShieldCheck className="text-[#03377B]" size={18} />
                          <span>Ký hợp đồng khung Bảo hiểm điện tử bằng OTP</span>
                        </div>
                        <p className="text-xs text-slate-500 mb-4">
                          Hợp đồng khung (Hợp đồng nguyên tắc) quy định các điều khoản chung, quyền lợi bảo lãnh, tỷ lệ bồi thường và biểu phí áp dụng cho Công ty {companyInfo.name || 'đối tác'}.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                          {/* Contract View Simulator */}
                          <div className="md:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-4.5 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 mb-3">
                                <span className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                                  <FileText size={15} className="text-[#03377B]" />
                                  PTI_CARE_FRAMEWORK_CONTRACT.PDF
                                </span>
                                <span className="text-[10px] bg-slate-200 text-slate-500 font-bold px-2 py-0.5 rounded-sm">BẢN ĐỌC GHI CHỈ ĐỌC</span>
                              </div>

                              {/* Beautiful Real Document Formatted Preview */}
                              <div className="bg-white shadow-xs rounded-xl p-5 text-xs text-slate-700 leading-relaxed font-sans space-y-4 text-left border border-slate-200/85 h-80 overflow-y-auto relative select-none">
                                <div className="text-center space-y-1 mb-5">
                                  <p className="font-extrabold text-slate-800 tracking-wider text-[11px]">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                                  <p className="font-bold text-slate-500 text-[9px] uppercase">Độc lập - Tự do - Hạnh phúc</p>
                                  <div className="w-16 h-[1px] bg-slate-300 mx-auto mt-2"></div>
                                </div>
                                
                                <p className="font-black text-slate-900 text-center text-xs uppercase my-3 tracking-tight leading-snug">
                                  HỢP ĐỒNG NGUYÊN TẮC BẢO HIỂM SỨC KHỎE NHÓM<br />
                                  <span className="text-[#03377B] text-[10px] font-extrabold">CHƯƠNG TRÌNH PTI CARE DOANH NGHIỆP THẾ HỆ MỚI</span>
                                </p>
                                
                                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/60 text-[10px] text-slate-500 space-y-1">
                                  <p><strong>Số hợp đồng:</strong> HDNT/PTI-CARE/{companyInfo.taxCode || '12345678'}</p>
                                  <p><strong>Ngày lập dự thảo:</strong> {new Date().toLocaleDateString('vi-VN')}</p>
                                </div>

                                <p className="text-[11px] italic">Hôm nay, ngày {new Date().toLocaleDateString('vi-VN')}, chúng tôi gồm các bên dưới đây đồng ý ký kết hợp đồng này:</p>
                                
                                <div className="space-y-1 pt-1">
                                  <p className="font-extrabold text-slate-800 border-l-2 border-[#03377B] pl-2 uppercase text-[10px]">BÊN A: TỔNG CÔNG TY CỔ PHẦN BẢO HIỂM BƯU ĐIỆN (PTI)</p>
                                  <div className="pl-3.5 space-y-0.5 text-slate-600 text-[11px]">
                                    <p>• <strong>Địa chỉ:</strong> Tầng 8, Tòa nhà Harec, Số 4A Láng Hạ, Ba Đình, Hà Nội</p>
                                    <p>• <strong>Người đại diện:</strong> Nguyễn Văn An - Chức vụ: Giám đốc Ban Bảo hiểm Con người</p>
                                  </div>
                                </div>

                                <div className="space-y-1 pt-1">
                                  <p className="font-extrabold text-slate-800 border-l-2 border-[#03377B] pl-2 uppercase text-[10px]">BÊN B: {companyInfo.name || 'CÔNG TY ĐỐI TÁC KHÁCH HÀNG'}</p>
                                  <div className="pl-3.5 space-y-0.5 text-slate-600 text-[11px]">
                                    <p>• <strong>Mã số thuế:</strong> {companyInfo.taxCode || 'N/A'}</p>
                                    <p>• <strong>Đại diện:</strong> {companyInfo.contactName || 'N/A'} - Chức vụ: {companyInfo.contactRole || 'N/A'}</p>
                                    <p>• <strong>Số điện thoại:</strong> {companyInfo.phone || 'N/A'}</p>
                                  </div>
                                </div>

                                <div className="pt-2 text-[11px]">
                                  <p className="font-extrabold text-slate-900 uppercase text-[10px] border-b border-slate-100 pb-1">ĐIỀU 1: PHẠM VI BẢO HIỂM & QUYỀN LỢI</p>
                                  <p className="text-slate-600 mt-1">Bên A đồng ý cấp bảo hiểm sức khỏe PTI Care cho toàn bộ cán bộ nhân viên của Bên B theo danh sách đính kèm tại Bước 3.</p>
                                </div>

                                <div className="pt-1 text-[11px]">
                                  <p className="font-extrabold text-slate-900 uppercase text-[10px] border-b border-slate-100 pb-1">ĐIỀU 2: PHÍ BẢO HIỂM & THANH TOÁN</p>
                                  <p className="text-slate-600 mt-1">Bên B có trách nhiệm thanh toán đầy đủ phí bảo hiểm cho Bên A theo thời hạn quy định để kích hoạt tài khoản bảo hiểm điện tử.</p>
                                </div>
                              </div>
                            </div>

                            {/* View & Download Buttons */}
                            <div className="flex gap-2.5 mt-3.5">
                              <button
                                type="button"
                                onClick={() => setShowFullContractModal(true)}
                                className="flex-1 py-2 px-4 bg-white hover:bg-slate-50 text-[#03377B] border border-slate-200/80 font-black text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 hover:border-[#03377B]/50"
                              >
                                <Maximize2 size={13} className="text-[#03377B]" />
                                <span>Xem toàn văn hợp đồng</span>
                              </button>
                              <button
                                type="button"
                                onClick={handleDownloadContractPdf}
                                disabled={isDownloadingContract}
                                className="flex-1 py-2 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 font-black text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 hover:border-slate-300"
                              >
                                {isDownloadingContract ? (
                                  <>
                                    <RefreshCw className="animate-spin text-slate-500" size={13} />
                                    <span>Đang tải...</span>
                                  </>
                                ) : (
                                  <>
                                    <Download size={13} className="text-slate-500" />
                                    <span>Tải PDF bản gốc</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Digital OTP Signing Controls */}
                          <div className="md:col-span-5 flex flex-col justify-between">
                            
                            {isFrameworkContractSigned ? (
                              /* Completed Green Signed State */
                              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-5 space-y-4 shadow-md border border-emerald-500/10 animate-fade-in text-left flex flex-col justify-between h-full">
                                <div className="space-y-3.5">
                                  <div className="flex items-center gap-3 border-b border-white/20 pb-3.5">
                                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-base font-black shrink-0 shadow-inner">
                                      ✓
                                    </div>
                                    <div>
                                      <h4 className="font-black text-xs uppercase tracking-wider text-emerald-100">KÝ ĐIỆN TỬ HOÀN TẤT</h4>
                                      <p className="text-[10px] text-emerald-50/90 font-medium">Đã xác thực OTP & khóa mã hóa hợp đồng</p>
                                    </div>
                                  </div>

                                  <div className="space-y-2 text-[11px]">
                                    <div className="bg-white/10 p-2.5 rounded-xl border border-white/5 space-y-0.5">
                                      <span className="text-emerald-200 text-[9px] uppercase font-bold tracking-wider block">Thời gian xác nhận ký:</span>
                                      <span className="font-mono font-bold text-white block">06/07/2026 10:24:15 UTC+7</span>
                                    </div>

                                    <div className="bg-white/10 p-2.5 rounded-xl border border-white/5 space-y-0.5">
                                      <span className="text-emerald-200 text-[9px] uppercase font-bold tracking-wider block">Địa chỉ IP / Thiết bị:</span>
                                      <span className="font-bold text-white block truncate">113.161.42.xx (Chrome / macOS Sonoma)</span>
                                    </div>

                                    <div className="bg-white/10 p-2.5 rounded-xl border border-white/5 space-y-0.5">
                                      <span className="text-emerald-200 text-[9px] uppercase font-bold tracking-wider block">Số chứng thư số điện tử:</span>
                                      <span className="font-mono font-bold text-white block text-[10px] tracking-tight">CA-PTI-2026-992837482-SHA256</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-3.5 pt-4 border-t border-white/15">
                                  <div className="text-[10px] text-emerald-100 leading-normal bg-black/15 p-2.5 rounded-lg border border-emerald-500/10">
                                    🔒 Văn bản điện tử đã được mã hóa bảo mật, chống sửa đổi. Khách hàng đã chấp thuận các điều khoản PTI Care.
                                  </div>

                                  <div className="bg-emerald-800/40 border border-emerald-500/25 rounded-xl p-2.5 text-center">
                                    <span className="text-[9px] text-white font-extrabold block uppercase tracking-wider">✓ Sẵn sàng phát hành thẻ</span>
                                  </div>
                                </div>
                              </div>
                            ) : user?.role === 'CA' ? (
                              /* 3-Step Timeline View for Corporate Agent (CA) */
                              <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between h-full space-y-4">
                                <div className="space-y-4">
                                  <div className="space-y-1">
                                    <span className="text-xs font-black text-[#03377B] uppercase tracking-wider block">TIẾN TRÌNH DUYỆT & KÝ SỐ</span>
                                    <p className="text-[10px] text-slate-500 leading-normal">Giám sát trạng thái rà soát hợp đồng của Khách hàng theo thời gian thực.</p>
                                  </div>

                                  <div className="space-y-3.5 pt-1">
                                    {/* Step 1: Draft Sent */}
                                    <div className="flex gap-2.5">
                                      <div className="flex flex-col items-center">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                                          isReviewMailSent 
                                            ? 'bg-emerald-500 text-white' 
                                            : 'bg-amber-100 text-amber-700 ring-2 ring-amber-300'
                                        }`}>
                                          {isReviewMailSent ? '✓' : '1'}
                                        </div>
                                        <div className={`w-[1.5px] h-9 my-0.5 ${isReviewMailSent ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                                      </div>
                                      <div className="flex-1 text-left">
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-[11px] font-black text-slate-700">1. Gửi bản nháp duyệt</span>
                                          {isReviewMailSent ? (
                                            <span className="text-[8px] bg-emerald-500/10 text-emerald-700 px-1 py-0.2 rounded font-extrabold uppercase">ĐÃ GỬI</span>
                                          ) : (
                                            <span className="text-[8px] bg-amber-500/15 text-amber-700 px-1 py-0.2 rounded font-extrabold uppercase animate-pulse">CẦN LÀM</span>
                                          )}
                                        </div>
                                        <p className="text-[9px] text-slate-400">Gửi mail nháp kèm quyền lợi cho khách hàng kiểm tra trước.</p>
                                        
                                        {!isReviewMailSent && (
                                          <button
                                            type="button"
                                            onClick={handleSendReviewEmail}
                                            disabled={isReviewMailSending}
                                            className="mt-1.5 py-1 px-2 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-100 text-slate-950 disabled:text-slate-400 font-extrabold text-[9px] rounded-lg transition flex items-center gap-1 shadow-xs active:scale-95"
                                          >
                                            {isReviewMailSending ? (
                                              <>
                                                <RefreshCw className="animate-spin text-slate-950" size={10} />
                                                <span>Đang gửi...</span>
                                              </>
                                            ) : (
                                              <>
                                                <Send size={9} className="stroke-[2.5]" />
                                                <span>GỬI MAIL DUYỆT TRƯỚC</span>
                                              </>
                                            )}
                                          </button>
                                        )}
                                      </div>
                                    </div>

                                    {/* Step 2: Signing Link Sent */}
                                    <div className="flex gap-2.5">
                                      <div className="flex flex-col items-center">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                                          isOtpLinkSent 
                                            ? 'bg-emerald-500 text-white' 
                                            : isReviewMailSent 
                                              ? 'bg-blue-100 text-[#03377B] ring-2 ring-blue-300' 
                                              : 'bg-slate-100 text-slate-400'
                                        }`}>
                                          {isOtpLinkSent ? '✓' : '2'}
                                        </div>
                                        <div className={`w-[1.5px] h-9 my-0.5 ${isOtpLinkSent ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                                      </div>
                                      <div className="flex-1 text-left">
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-[11px] font-black text-slate-700">2. Gửi liên kết ký số OTP</span>
                                          {isOtpLinkSent ? (
                                            <span className="text-[8px] bg-emerald-500/10 text-emerald-700 px-1 py-0.2 rounded font-extrabold uppercase">ĐÃ GỬI</span>
                                          ) : isReviewMailSent ? (
                                            <span className="text-[8px] bg-blue-100 text-blue-700 px-1 py-0.2 rounded font-extrabold uppercase">SẴN SÀNG</span>
                                          ) : (
                                            <span className="text-[8px] bg-slate-100 text-slate-400 px-1 py-0.2 rounded font-bold">CHỜ B1</span>
                                          )}
                                        </div>
                                        <p className="text-[9px] text-slate-400">Gửi link SMS & Email bảo mật chứa mã OTP cho khách ký số.</p>
                                        
                                        {isReviewMailSent && !isOtpLinkSent && (
                                          <button
                                            type="button"
                                            onClick={handleSendOtpLink}
                                            disabled={isOtpLinkSending}
                                            className="mt-1.5 py-1 px-2 bg-[#03377B] hover:bg-blue-800 disabled:bg-slate-100 text-white disabled:text-slate-400 font-extrabold text-[9px] rounded-lg transition flex items-center gap-1 shadow-xs active:scale-95"
                                          >
                                            {isOtpLinkSending ? (
                                              <>
                                                <RefreshCw className="animate-spin text-white" size={10} />
                                                <span>Đang gửi link...</span>
                                              </>
                                            ) : (
                                              <>
                                                <Send size={9} />
                                                <span>GỬI LIÊN KẾT KÝ SỐ</span>
                                              </>
                                            )}
                                          </button>
                                        )}
                                      </div>
                                    </div>

                                    {/* Step 3: Customer Signature */}
                                    <div className="flex gap-2.5">
                                      <div className="flex flex-col items-center">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                                          isFrameworkContractSigned 
                                            ? 'bg-emerald-500 text-white' 
                                            : isOtpLinkSent 
                                              ? 'bg-orange-100 text-orange-700 ring-2 ring-orange-300' 
                                              : 'bg-slate-100 text-slate-400'
                                        }`}>
                                          {isFrameworkContractSigned ? '✓' : '3'}
                                        </div>
                                      </div>
                                      <div className="flex-1 text-left">
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-[11px] font-black text-slate-700">3. Khách hàng ký số</span>
                                          {isOtpLinkSent ? (
                                            <span className="text-[8px] bg-orange-100 text-orange-700 px-1 py-0.2 rounded font-extrabold uppercase animate-pulse">ĐANG KÝ</span>
                                          ) : (
                                            <span className="text-[8px] bg-slate-100 text-slate-400 px-1 py-0.2 rounded font-bold">CHỜ B2</span>
                                          )}
                                        </div>
                                        <p className="text-[9px] text-slate-400">Khách tự nhập OTP nhận được để kích hoạt chứng thư số.</p>
                                        
                                        {isOtpLinkSent && (
                                          <div className="mt-2 space-y-2">
                                            <button
                                              type="button"
                                              onClick={handleRemindSign}
                                              className="w-full py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-extrabold text-[9px] rounded-lg transition flex items-center justify-center gap-1 shadow-xs"
                                            >
                                              <Send size={10} className="text-slate-500" />
                                              <span>GỬI NHẮC KÝ LẠI (REMIND)</span>
                                            </button>

                                            {/* Beautiful simulation box for testing in the workspace */}
                                            <div className="bg-amber-50 border border-dashed border-amber-200 rounded-lg p-2 text-left">
                                              <span className="text-[8px] text-amber-700 font-extrabold block uppercase tracking-wider mb-0.5">⚡ GIẢ LẬP KHÁCH HÀNG KÝ</span>
                                              <p className="text-[8px] text-slate-500 mb-1 leading-relaxed">Ký thay Khách hàng để trải nghiệm tiếp quy trình hoàn tất.</p>
                                              <button
                                                type="button"
                                                onClick={handleMockCustomerSign}
                                                disabled={isSigningContract}
                                                className="w-full py-1 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-100 text-slate-950 font-black text-[9px] rounded-md transition flex items-center justify-center gap-1"
                                              >
                                                {isSigningContract ? (
                                                  <RefreshCw className="animate-spin text-slate-950" size={10} />
                                                ) : (
                                                  <span>Xác thực OTP (Mô phỏng Khách ký)</span>
                                                )}
                                              </button>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="pt-3 border-t border-slate-200 text-left">
                                  <div className="text-[10px] text-amber-600 font-extrabold flex items-start gap-1.5 leading-normal bg-amber-50/75 p-2 rounded-xl border border-amber-100">
                                    <span>⚠️</span>
                                    <span>CA không thể xem hoặc nhập mã OTP thay khách hàng. Khách hàng phải tự thao tác trên thiết bị cá nhân để đảm bảo tính pháp lý.</span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              /* Standard Direct OTP Signing for general users/clients */
                              <div className="bg-blue-50/20 border border-blue-100 rounded-2xl p-5 flex flex-col justify-between space-y-4 text-left h-full">
                                <div className="space-y-1.5">
                                  <span className="text-xs font-black text-[#03377B] uppercase tracking-wider block">XÁC THỰC CHỮ KÝ SỐ OTP</span>
                                  <p className="text-[11px] text-slate-500">Mã xác thực OTP ký số hợp đồng sẽ được gửi qua SMS đến số điện thoại của người đại diện Bên B.</p>
                                </div>

                                <div className="space-y-3">
                                  <div className="space-y-1 text-left">
                                    <span className="text-[10px] font-bold text-slate-500 block">Số điện thoại ký kết</span>
                                    <span className="text-xs font-bold text-slate-800 block bg-white px-3 py-2 rounded-xl border border-slate-200">{companyInfo.phone || '0988 234 567'}</span>
                                  </div>

                                  <div className="space-y-1.5">
                                    <div className="flex justify-between items-center">
                                      <span className="text-[10px] font-bold text-slate-500">Nhập mã xác thực OTP (6 chữ số)</span>
                                      {isOtpSent && (
                                        <span className="text-[9px] text-emerald-600 font-bold">✓ Đã gửi OTP</span>
                                      )}
                                    </div>
                                    
                                    <div className="flex gap-2">
                                      <input 
                                        type="text" 
                                        maxLength={6}
                                        placeholder="VD: 123456"
                                        value={otpInput}
                                        onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                                        disabled={!isOtpSent || isFrameworkContractSigned}
                                        className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-center tracking-widest outline-none focus:border-[#03377B] disabled:bg-slate-100 disabled:text-slate-400"
                                      />
                                      <button
                                        type="button"
                                        onClick={handleSendOtp}
                                        disabled={isFrameworkContractSigned || otpCountdown > 0}
                                        className="bg-[#03377B] hover:bg-blue-800 disabled:bg-slate-200 text-white disabled:text-slate-400 px-3 py-2 text-[11px] font-bold rounded-xl transition flex-shrink-0"
                                      >
                                        {otpCountdown > 0 ? `Gửi lại (${otpCountdown}s)` : isOtpSent ? 'Gửi lại mã' : 'Nhận mã OTP'}
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={handleSignContract}
                                  disabled={!isOtpSent || isSigningContract || otpInput.length !== 6}
                                  className="w-full py-2.5 bg-gradient-to-r from-[#03377B] to-sky-600 hover:from-blue-800 hover:to-sky-700 disabled:from-slate-200 disabled:to-slate-200 text-white disabled:text-slate-400 font-extrabold text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5 active:scale-95"
                                >
                                  {isSigningContract ? (
                                    <>
                                      <RefreshCw className="animate-spin text-white" size={14} />
                                      <span>Đang ký điện tử...</span>
                                    </>
                                  ) : (
                                    <>
                                      <span>KÝ ĐIỆN TỬ NGAY BẰNG OTP</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Complete Detailed Contract Preview Modal */}
                      {showFullContractModal && (
                        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
                          <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl flex flex-col h-[85vh] border border-slate-100 text-left overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-150 flex items-center justify-between bg-slate-50">
                              <div className="flex items-center gap-2">
                                <FileText className="text-[#03377B]" size={20} />
                                <div>
                                  <h3 className="font-black text-slate-800 text-sm">HỢP ĐỒNG NGUYÊN TẮC BẢO HIỂM SỨC KHỎE NHÓM</h3>
                                  <p className="text-[10px] text-slate-400">PTI_CARE_FRAMEWORK_CONTRACT.PDF (DỰ THẢO CHÍNH THỨC)</p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => setShowFullContractModal(false)}
                                className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-200/50 rounded-xl transition"
                              >
                                <X size={18} />
                              </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-6 max-h-[calc(85vh-130px)] bg-slate-50/30">
                              <div className="max-w-2xl mx-auto bg-white shadow-md border border-slate-200 rounded-2xl p-10 space-y-5 font-sans text-xs text-slate-700 leading-relaxed">
                                <div className="text-center space-y-1 mb-8">
                                  <p className="font-extrabold text-slate-800 tracking-wider text-xs">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                                  <p className="font-bold text-slate-500 text-[10px] uppercase">Độc lập - Tự do - Hạnh phúc</p>
                                  <div className="w-24 h-[1.5px] bg-slate-400 mx-auto mt-2"></div>
                                </div>

                                <p className="font-black text-slate-900 text-center text-sm uppercase my-6 tracking-tight leading-snug">
                                  HỢP ĐỒNG NGUYÊN TẮC BẢO HIỂM SỨC KHỎE NHÓM<br />
                                  <span className="text-[#03377B] text-xs">PTI CARE DOANH NGHIỆP</span>
                                </p>

                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 text-[11px] text-slate-600 space-y-1.5">
                                  <p><strong>Mã hợp đồng:</strong> HDNT/PTI-CARE/{companyInfo.taxCode || '12345678'}</p>
                                  <p><strong>Ngày lập dự thảo:</strong> {new Date().toLocaleDateString('vi-VN')}</p>
                                  <p><strong>Nơi thực hiện:</strong> Tổng Công ty Cổ phần Bảo hiểm Bưu điện (PTI) - Hà Nội</p>
                                </div>

                                <p className="indent-6"><em>Căn cứ Luật Kinh doanh bảo hiểm số 08/2022/QH15 được Quốc hội nước Cộng hòa Xã hội Chủ nghĩa Việt Nam thông qua ngày 16/06/2022; căn cứ nhu cầu thực tế và thỏa thuận giữa hai bên, hôm nay ngày {new Date().toLocaleDateString('vi-VN')}, chúng tôi gồm:</em></p>

                                <div className="space-y-2 pt-2">
                                  <p className="font-black text-slate-800 border-l-2 border-[#03377B] pl-2 uppercase text-[11px]">BÊN A: TỔNG CÔNG TY CỔ PHẦN BẢO HIỂM BƯU ĐIỆN (PTI)</p>
                                  <div className="pl-4 space-y-1 text-slate-600 text-[11px]">
                                    <p>• <strong>Địa chỉ trụ sở:</strong> Tầng 8, Tòa nhà Harec, Số 4A Láng Hạ, Ba Đình, Hà Nội</p>
                                    <p>• <strong>Đại diện bởi:</strong> Ông Nguyễn Văn An - Chức danh: Giám đốc Ban Bảo hiểm Con người</p>
                                    <p>• <strong>Điện thoại:</strong> 1900 54 54 75 | Email: contact@pti.com.vn</p>
                                  </div>
                                </div>

                                <div className="space-y-2 pt-2">
                                  <p className="font-black text-slate-800 border-l-2 border-[#03377B] pl-2 uppercase text-[11px]">BÊN B: {companyInfo.name || 'CÔNG TY ĐỐI TÁC KHÁCH HÀNG'}</p>
                                  <div className="pl-4 space-y-1 text-slate-600 text-[11px]">
                                    <p>• <strong>Mã số doanh nghiệp:</strong> {companyInfo.taxCode || 'N/A'}</p>
                                    <p>• <strong>Địa chỉ Đăng ký kinh doanh:</strong> {companyInfo.address || 'N/A'}</p>
                                    <p>• <strong>Người đại diện:</strong> {companyInfo.contactName || 'N/A'} - Chức vụ: {companyInfo.contactRole || 'N/A'}</p>
                                    <p>• <strong>SĐT liên hệ nhận OTP ký kết:</strong> {companyInfo.phone || 'N/A'}</p>
                                    <p>• <strong>Email chính thức:</strong> {companyInfo.email || 'N/A'}</p>
                                  </div>
                                </div>

                                <div className="pt-3 space-y-2">
                                  <p className="font-black text-slate-900 uppercase text-[11px] border-b border-slate-100 pb-1">ĐIỀU 1: PHẠM VI BẢO HIỂM & QUYỀN LỢI</p>
                                  <p className="text-slate-600">1.1. Bên A đồng ý cấp bảo hiểm sức khỏe PTI Care cho cán bộ nhân viên của Bên B theo danh sách và chương trình bảo hiểm chi tiết đã được hai bên đồng thuận xác nhận.</p>
                                  <p className="text-slate-600">1.2. Quyền lợi bảo hiểm bao gồm: Điều trị nội trú do ốm đau bệnh tật, điều trị ngoại trú mở rộng, tai nạn cá nhân 24/7 và quyền lợi chăm sóc răng miệng theo đúng báo giá đã được CA phê duyệt.</p>
                                </div>

                                <div className="pt-3 space-y-2">
                                  <p className="font-black text-slate-900 uppercase text-[11px] border-b border-slate-100 pb-1">ĐIỀU 2: BẢO LÃNH VIỆN PHÍ & GIẢI QUYẾT BỒI THƯỜNG</p>
                                  <p className="text-slate-600">2.1. Người được bảo hiểm được hưởng quyền lợi bảo lãnh viện phí trực tiếp tại hơn 200 bệnh viện/phòng khám liên kết của PTI trên toàn quốc khi xuất trình giấy tờ tùy thân và e-card điện tử.</p>
                                  <p className="text-slate-600">2.2. Đối với cơ sở y tế ngoài hệ thống bảo lãnh, người được bảo hiểm nộp hồ sơ yêu cầu bồi thường trực tuyến qua ứng dụng iPTI, thời gian giải quyết tối đa 5 ngày làm việc.</p>
                                </div>

                                <div className="pt-3 space-y-2">
                                  <p className="font-black text-slate-900 uppercase text-[11px] border-b border-slate-100 pb-1">ĐIỀU 3: HIỆU LỰC & CHỮ KÝ SỐ PHÁP LÝ</p>
                                  <p className="text-slate-600">3.1. Hợp đồng này chính thức có hiệu lực kể từ thời điểm Đại diện hợp pháp của hai bên ký điện tử thành công qua hệ thống chữ ký số dùng một lần OTP được cấp bởi tổ chức chứng thực CA hợp pháp.</p>
                                  <p className="text-slate-600">3.2. Chữ ký số OTP có giá trị pháp lý đầy đủ theo quy định của Luật Giao dịch điện tử hiện hành.</p>
                                </div>

                                <div className="pt-8 border-t border-slate-200 flex justify-between text-[10px] text-slate-400">
                                  <span>Đại diện Bên A</span>
                                  <span>Đại diện Bên B</span>
                                </div>
                              </div>
                            </div>

                            <div className="px-6 py-4 border-t border-slate-150 flex items-center justify-between bg-slate-50">
                              <button
                                type="button"
                                onClick={() => setShowFullContractModal(false)}
                                className="px-4 py-2 bg-slate-200 hover:bg-slate-250 text-slate-700 text-xs font-bold rounded-xl transition"
                              >
                                Đóng cửa sổ
                              </button>
                              <button
                                type="button"
                                onClick={handleDownloadContractPdf}
                                disabled={isDownloadingContract}
                                className="px-5 py-2.5 bg-[#03377B] hover:bg-blue-800 disabled:bg-slate-200 text-white disabled:text-slate-400 text-xs font-black rounded-xl shadow transition flex items-center gap-1.5"
                              >
                                {isDownloadingContract ? (
                                  <>
                                    <RefreshCw className="animate-spin text-white" size={14} />
                                    <span>Đang tải xuống...</span>
                                  </>
                                ) : (
                                  <>
                                    <Download size={14} />
                                    <span>TẢI FILE PDF CHÍNH THỨC</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Summary Review Component Sheet */}
                      <ContractReview
                        companyInfo={companyInfo}
                        groupSizeInfo={groupSizeInfo}
                        tiers={tiers}
                        employees={employees}
                        invoiceInfo={invoiceInfo}
                        programs={PROGRAMS}
                        discountRate={discountRate}
                        commissionRate={commissionRate}
                      />

                    </div>
                  )}



                  {/* ──────────────────────────────────────────────────
                       STEP 8: THANH TOÁN (QR SCANNING & COMPLETED VIEW)
                     ────────────────────────────────────────────────── */}
                  {currentStep === 5 && (
                    <div className="space-y-6">
                      
                      {/* Payment gateway selection */}
                      <div className="card border border-slate-100">
                        <div className="card-title">
                          <CreditCard className="text-[#03377B]" size={18} />
                          <span>Phương thức Thanh toán bảo hiểm</span>
                        </div>
                        <p className="text-xs text-slate-500 mb-6">Lựa chọn cổng quét mã QR thanh toán nhanh hoặc chuyển khoản thủ công vào tài khoản chuyên dụng của PTI.</p>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                          
                          {/* Left choice panel */}
                          <div className="md:col-span-5 space-y-4">
                            <div className="space-y-2.5 text-xs">
                              <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer hover:border-[#03377B] transition">
                                <input 
                                  type="radio" 
                                  name="payment_method" 
                                  checked={selectedPaymentMethod === 'qr'} 
                                  onChange={() => setSelectedPaymentMethod('qr')}
                                  className="text-[#03377B] focus:ring-[#03377B]"
                                />
                                <div>
                                  <span className="font-bold text-slate-800 text-sm block">Quét mã QR (VNPAY / VietQR)</span>
                                  <span className="text-[10px] text-slate-400 block mt-0.5">Xử lý thanh toán tự động trong 10 giây. Đóng đơn ngay lập tức.</span>
                                </div>
                              </label>

                              <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer hover:border-[#03377B] transition">
                                <input 
                                  type="radio" 
                                  name="payment_method" 
                                  checked={selectedPaymentMethod === 'bank'} 
                                  onChange={() => setSelectedPaymentMethod('bank')}
                                  className="text-[#03377B] focus:ring-[#03377B]"
                                />
                                <div>
                                  <span className="font-bold text-slate-800 text-sm block">Chuyển khoản Ngân hàng (IB/CK)</span>
                                  <span className="text-[10px] text-slate-400 block mt-0.5">Chuyển khoản thủ công bằng tài khoản công ty. Duyệt đơn trong 30 phút.</span>
                                </div>
                              </label>
                            </div>

                            {/* Net Remit Amount Callout */}
                            <div className="p-4 rounded-2xl bg-[#03377B]/5 border border-[#03377B]/10 space-y-2 text-xs text-[#03377B]">
                              <span className="font-bold uppercase tracking-wider block text-[10px]">Số tiền thực tế cần nộp:</span>
                              <span className="text-2xl font-black block">
                                {formatVnd(
                                  (tiers.reduce((sum, tier) => {
                                    const prog = PROGRAMS.find(p => p.id === tier.selectedProgramId);
                                    return sum + (tier.headcount * (prog?.ratePerHead || 0));
                                  }, 0) - Math.round((tiers.reduce((sum, tier) => {
                                    const prog = PROGRAMS.find(p => p.id === tier.selectedProgramId);
                                    return sum + (tier.headcount * (prog?.ratePerHead || 0));
                                  }, 0) * discountRate) / 100)) - 
                                  Math.round(((tiers.reduce((sum, tier) => {
                                    const prog = PROGRAMS.find(p => p.id === tier.selectedProgramId);
                                    return sum + (tier.headcount * (prog?.ratePerHead || 0));
                                  }, 0) - Math.round((tiers.reduce((sum, tier) => {
                                    const prog = PROGRAMS.find(p => p.id === tier.selectedProgramId);
                                    return sum + (tier.headcount * (prog?.ratePerHead || 0));
                                  }, 0) * discountRate) / 100)) * commissionRate) / 100)
                                )}
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium block mt-1">(Đã trừ thù lao {commissionRate}%: {formatVnd(Math.round(((tiers.reduce((sum, tier) => {
                                    const prog = PROGRAMS.find(p => p.id === tier.selectedProgramId);
                                    return sum + (tier.headcount * (prog?.ratePerHead || 0));
                                  }, 0) - Math.round((tiers.reduce((sum, tier) => {
                                    const prog = PROGRAMS.find(p => p.id === tier.selectedProgramId);
                                    return sum + (tier.headcount * (prog?.ratePerHead || 0));
                                  }, 0) * discountRate) / 100)) * commissionRate) / 100))})</span>
                            </div>
                          </div>

                          {/* Right dynamic panel with QR Code or Bank info */}
                          <div className="md:col-span-7 bg-slate-50 rounded-3xl p-6 border border-slate-200 text-center flex flex-col justify-center items-center">
                            
                            {selectedPaymentMethod === 'qr' ? (
                              <div className="space-y-4">
                                <div className="bg-white p-4 rounded-2xl shadow-md border border-slate-100 inline-block">
                                  {/* Custom beautiful QR Code representation using standard elements and an icon */}
                                  <div className="w-48 h-48 bg-slate-50 rounded-xl flex flex-col items-center justify-center relative border border-slate-150 overflow-hidden">
                                    <QrCode size={120} className="text-[#03377B]" />
                                    <span className="absolute text-[8px] font-black bg-[#03377B] text-white px-2 py-0.5 rounded bottom-3">PTI CARE PAYMENT</span>
                                    {/* Small central logo logo simulation */}
                                    <div className="absolute w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center font-black text-[9px] text-[#03377B] shadow-sm">PTI</div>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <span className="text-xs font-bold text-slate-700 block">Mã QR Thanh toán Bảo hiểm nhóm</span>
                                  <p className="text-[11px] text-slate-400 max-w-xs mx-auto">Vui lòng sử dụng ứng dụng Ngân hàng di động (Mobile Banking) quét mã QR để thanh toán phí cấp đơn nhanh.</p>
                                </div>
                              </div>
                            ) : (
                              <div className="w-full text-left space-y-4">
                                <div className="bg-white p-4 rounded-2xl border border-slate-150 space-y-3 text-xs">
                                  <div className="flex justify-between border-b border-slate-100 pb-2">
                                    <span className="text-slate-400">Ngân hàng thụ hưởng:</span>
                                    <span className="font-bold text-slate-800">TMCP Bưu Điện Liên Việt (LPBank)</span>
                                  </div>
                                  <div className="flex justify-between border-b border-slate-100 pb-2">
                                    <span className="text-slate-400">Số tài khoản:</span>
                                    <span className="font-mono font-bold text-[#03377B] text-sm">1234 5678 9999</span>
                                  </div>
                                  <div className="flex justify-between border-b border-slate-100 pb-2">
                                    <span className="text-slate-400">Tên đơn vị thụ hưởng:</span>
                                    <span className="font-bold text-slate-800 uppercase">TONG CONG TY CO PHAN BAO HIEM BUU DIEN</span>
                                  </div>
                                  <div className="flex justify-between border-b border-slate-100 pb-2">
                                    <span className="text-slate-400">Nội dung chuyển tiền:</span>
                                    <span className="font-mono font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded text-[11px] uppercase">{contractId} COMP PAY</span>
                                  </div>
                                  <div className="flex justify-between pt-1">
                                    <span className="text-slate-400">Số tiền chuyển khoản:</span>
                                    <span className="font-bold text-emerald-600 text-sm">
                                      {formatVnd(
                                        (tiers.reduce((sum, tier) => {
                                          const prog = PROGRAMS.find(p => p.id === tier.selectedProgramId);
                                          return sum + (tier.headcount * (prog?.ratePerHead || 0));
                                        }, 0) - Math.round((tiers.reduce((sum, tier) => {
                                          const prog = PROGRAMS.find(p => p.id === tier.selectedProgramId);
                                          return sum + (tier.headcount * (prog?.ratePerHead || 0));
                                        }, 0) * discountRate) / 100)) - 
                                        Math.round(((tiers.reduce((sum, tier) => {
                                          const prog = PROGRAMS.find(p => p.id === tier.selectedProgramId);
                                          return sum + (tier.headcount * (prog?.ratePerHead || 0));
                                        }, 0) - Math.round((tiers.reduce((sum, tier) => {
                                          const prog = PROGRAMS.find(p => p.id === tier.selectedProgramId);
                                          return sum + (tier.headcount * (prog?.ratePerHead || 0));
                                        }, 0) * discountRate) / 100)) * commissionRate) / 100)
                                      )}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-[10px] text-slate-400 leading-relaxed">
                                  💡 <em>Lưu ý: Bạn phải sao chép chính xác số tiền và nội dung chuyển tiền để hệ thống đối soát tự động duyệt đơn kịp thời.</em>
                                </p>
                              </div>
                            )}

                            {/* Mock confirm payment trigger button */}
                            <button
                              type="button"
                              onClick={handleProcessPayment}
                              disabled={isSubmittingPayment}
                              className="w-full max-w-xs mt-6 py-2.5 px-6 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-700/10 transition"
                            >
                              {isSubmittingPayment ? (
                                <>
                                  <RefreshCw className="animate-spin" size={14} />
                                  <span>Đang kiểm tra giao dịch...</span>
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 size={14} />
                                  <span>XÁC NHẬN ĐÃ CHUYỂN TIỀN THÀNH CÔNG</span>
                                </>
                              )}
                            </button>

                          </div>

                        </div>
                      </div>

                    </div>
                  )}

                  {/* Wizard Footer Controls */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl border border-slate-200 transition flex items-center gap-1.5"
                    >
                      <ArrowLeft size={14} />
                      <span>Quay lại bước trước</span>
                    </button>

                    {/* Manual Save & Exit Button */}
                    <button
                      type="button"
                      onClick={() => saveDraftState(true)}
                      className="px-5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 hover:text-amber-800 font-bold text-xs rounded-xl border border-amber-200 transition flex items-center gap-1.5 shadow-sm"
                    >
                      <FileText size={14} />
                      <span>Lưu hồ sơ nháp</span>
                    </button>

                    {currentStep < 5 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="px-6 py-2.5 bg-[#03377B] hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
                      >
                        <span>Tiếp theo</span>
                        <ArrowRight size={14} />
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Thanh toán để kết thúc cấp đơn</span>
                    )}
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
