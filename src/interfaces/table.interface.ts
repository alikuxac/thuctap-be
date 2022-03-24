export interface TableInterface {
  name: string;
  limit: number;
  status: string;
}

export type TableStatus = 'Trống' | 'Có người';
