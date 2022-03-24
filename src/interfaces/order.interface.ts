import { TableInterface } from './table.interface';

export interface OrderInterface {
  message: string;
  status: string;
  orderItems: OrderItemInterface[];
  table: TableInterface;
}

export interface OrderItemInterface {
  amount: number;
  message: string;
  order: OrderInterface;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
