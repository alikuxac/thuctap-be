export interface Staff {
  id: number;
  password: string;
  firstname: string;
  lastname: string;
  idCard: string;
  sex: string;
  email: string;
  phone: string;
  birthday: Date;
  role: string;
  salary: number;
  address: string;
  createAt: Date;
  upddateAt: Date;
}

export enum StaffRole {
  MANAGER = 'Quản Lý',
  STAFF = 'Nhân Viên',
  GUARD = 'Bảo Vệ',
  WAITER = 'Bồi bàn',
  CASHIER = 'Thu Ngân',
  CHEF = 'Pha Chế',
  USER = 'Người dùng',
}

export enum StaffSession {
  MORNING = 'Sáng',
  AFTERNOON = 'Chiều',
  EVENING = 'Tối',
}
