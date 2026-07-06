/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'CA' | 'ICA' | 'CR';

export interface CompanyInfo {
  name: string;
  taxCode: string;
  industry: string;
  size: string;
  contactName: string;
  contactRole: string;
  phone: string;
  email: string;
  address: string;
  channel: string;
}

export interface GroupSizeInfo {
  headcount: number;
  femaleRatio: number;
  averageAge: number;
  ageBracket18_35: number;
  ageBracket36_50: number;
  ageBracket51_65: number;
  prevInsurance: 'yes' | 'no';
  lossRatio: number;
  budgetPerHead: number;
  geography: string;
  duration: string;
}

export interface InsuranceProgram {
  id: string;
  name: string;
  tierLabel: string;
  accidentBenefit: string;
  accidentMedical: string;
  inpatientBenefit: string;
  outpatientBenefit: string;
  maternityBenefit: string;
  dentalBenefit: string;
  ratePerHead: number;
}

export interface EmployeeTier {
  id: string;
  name: string; // e.g. "Ban Điều Hành / Giám đốc", "Quản lý / Trưởng phòng", "Nhân viên"
  headcount: number;
  selectedProgramId: string;
  customInpatientBenefit?: string;
  customOutpatientBenefit?: string;
  customAccidentBenefit?: string;
  customMaternityBenefit?: string;
}

export interface InsuredEmployee {
  id: string;
  name: string;
  dob: string;
  cccd: string;
  gender: 'Nam' | 'Nữ';
  email: string;
  tierId: string;
  healthStatus: 'Sạch' | 'Có rủi ro' | 'Đang xử lý';
  hasPreExisting: boolean;
  hasHospitalized12m: boolean;
  hasOngoingTreatment: boolean;
  treatmentDetails: string;
  underwritingAction: 'approve' | 'exclude' | 'decline' | 'request_files' | 'none';
  medicalFileUploaded?: boolean;
}

export interface InvoiceInfo {
  type: 'pay_now' | 'invoice_buyer' | 'invoice_employee';
  buyerName: string;
  taxCode: string;
  address: string;
  email: string;
}

export interface ContractState {
  currentStep: number;
  companyInfo: CompanyInfo;
  groupSizeInfo: GroupSizeInfo;
  tiers: EmployeeTier[];
  employees: InsuredEmployee[];
  invoiceInfo: InvoiceInfo;
  selectedPaymentMethod: 'qr' | 'bank';
  contractId: string;
  policyNumber: string;
  isPaid: boolean;
  role: UserRole;
}
