export type ProductCategory = 
  | 'racao' 
  | 'brinquedos' 
  | 'higiene' 
  | 'acessorios' 
  | 'medicamentos' 
  | 'petiscos'
  | 'camas'
  | 'outros';

export type MovementType = 'entrada' | 'saida';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  price: number;
  costPrice: number;
  quantity: number;
  minStock: number;
  unit: string;
  supplier?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StockMovement {
  id: string;
  productId: string;
  type: MovementType;
  quantity: number;
  reason: string;
  date: Date;
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  racao: 'Ração',
  brinquedos: 'Brinquedos',
  higiene: 'Higiene',
  acessorios: 'Acessórios',
  medicamentos: 'Medicamentos',
  petiscos: 'Petiscos',
  camas: 'Camas & Casas',
  outros: 'Outros',
};

export const CATEGORY_ICONS: Record<ProductCategory, string> = {
  racao: '🥩',
  brinquedos: '🎾',
  higiene: '🧴',
  acessorios: '🦮',
  medicamentos: '💊',
  petiscos: '🦴',
  camas: '🛏️',
  outros: '📦',
};
