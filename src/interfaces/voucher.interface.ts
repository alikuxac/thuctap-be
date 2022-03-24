export interface VoucherInterface {
  name: string;
  description: string;
  code: string;
  value: number;
  status: string;
  amount: number;
  used: number;
  startDate: Date;
  endDate: Date;
}

export type VoucherStatus = 'Active' | 'Inactive' | 'Expired';
