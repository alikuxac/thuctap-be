export interface Customer {
  id: string;
  username: string;
  password: string;
  fistname: string;
  lastname: string;
  phone: string;
  email: string;
  address: string;
  birthday: Date;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  rank: CustomerRank;
  point: number;
}

export type CustomerRank =
  | 'Standard'
  | 'Bronze'
  | 'Silver'
  | 'Gold'
  | 'Platinum'
  | 'Diamond';
export const CustomerRankArray = [
  'Standard',
  'Bronze',
  'Silver',
  'Gold',
  'Platinum',
  'Diamond',
];
