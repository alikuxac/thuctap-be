export interface Category {
  id: number;
  name: string;
  description: string;
  status: CategoryStatus;
}

export enum CategoryStatus {
  Enabled = 'Enabled',
  Disabled = 'Disabled',
}
