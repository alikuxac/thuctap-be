export interface ProductInterface {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  status: ProductStatus;
}

export enum ProductType {
  Primary = 'Primary',
  Extra = 'Extra',
}

export enum ProductStatus {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
  OUT_OF_STOCK = 'out_of_stock',
  SOON = 'soon',
}
