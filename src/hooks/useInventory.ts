import { useState, useCallback, useMemo } from 'react';
import { Product, StockMovement, MovementType, ProductCategory } from '@/types/inventory';

const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Ração Golden Premium Adulto 15kg', sku: 'RAC-001', category: 'racao', price: 189.90, costPrice: 120.00, quantity: 25, minStock: 10, unit: 'un', supplier: 'PremieRPet', createdAt: new Date('2024-01-10'), updatedAt: new Date('2024-03-15') },
  { id: '2', name: 'Shampoo Antipulgas 500ml', sku: 'HIG-001', category: 'higiene', price: 34.90, costPrice: 18.00, quantity: 3, minStock: 8, unit: 'un', supplier: 'Sanol', createdAt: new Date('2024-01-15'), updatedAt: new Date('2024-03-10') },
  { id: '3', name: 'Coleira Antipulgas Cães G', sku: 'ACE-001', category: 'acessorios', price: 79.90, costPrice: 42.00, quantity: 15, minStock: 5, unit: 'un', supplier: 'Bayer', createdAt: new Date('2024-02-01'), updatedAt: new Date('2024-03-12') },
  { id: '4', name: 'Bola de Tênis para Cães (3un)', sku: 'BRI-001', category: 'brinquedos', price: 24.90, costPrice: 10.00, quantity: 42, minStock: 15, unit: 'pct', supplier: 'PetBrink', createdAt: new Date('2024-02-10'), updatedAt: new Date('2024-03-01') },
  { id: '5', name: 'Vermífugo Comprimido Cães', sku: 'MED-001', category: 'medicamentos', price: 45.00, costPrice: 25.00, quantity: 8, minStock: 10, unit: 'cx', supplier: 'Bayer', createdAt: new Date('2024-02-15'), updatedAt: new Date('2024-03-14') },
  { id: '6', name: 'Petisco Bifinho Carne 500g', sku: 'PET-001', category: 'petiscos', price: 18.90, costPrice: 9.00, quantity: 55, minStock: 20, unit: 'un', supplier: 'PetDog', createdAt: new Date('2024-03-01'), updatedAt: new Date('2024-03-15') },
  { id: '7', name: 'Cama Pet Retangular M', sku: 'CAM-001', category: 'camas', price: 129.90, costPrice: 65.00, quantity: 7, minStock: 3, unit: 'un', supplier: 'PetConfort', createdAt: new Date('2024-03-05'), updatedAt: new Date('2024-03-16') },
  { id: '8', name: 'Ração Whiskas Gatos Adulto 10kg', sku: 'RAC-002', category: 'racao', price: 149.90, costPrice: 95.00, quantity: 2, minStock: 8, unit: 'un', supplier: 'Mars', createdAt: new Date('2024-03-08'), updatedAt: new Date('2024-03-17') },
];

const INITIAL_MOVEMENTS: StockMovement[] = [
  { id: '1', productId: '1', type: 'entrada', quantity: 10, reason: 'Reposição mensal', date: new Date('2024-03-15') },
  { id: '2', productId: '2', type: 'saida', quantity: 5, reason: 'Venda PDV', date: new Date('2024-03-14') },
  { id: '3', productId: '6', type: 'entrada', quantity: 30, reason: 'Compra fornecedor', date: new Date('2024-03-13') },
  { id: '4', productId: '8', type: 'saida', quantity: 6, reason: 'Venda PDV', date: new Date('2024-03-12') },
];

export function useInventory() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [movements, setMovements] = useState<StockMovement[]>(INITIAL_MOVEMENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | 'all'>('all');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);

  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalItems = products.reduce((sum, p) => sum + p.quantity, 0);
    const totalValue = products.reduce((sum, p) => sum + p.quantity * p.price, 0);
    const totalCost = products.reduce((sum, p) => sum + p.quantity * p.costPrice, 0);
    const lowStockProducts = products.filter((p) => p.quantity <= p.minStock);
    const outOfStock = products.filter((p) => p.quantity === 0);
    return { totalProducts, totalItems, totalValue, totalCost, lowStockProducts, outOfStock };
  }, [products]);

  const addProduct = useCallback((product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setProducts((prev) => [...prev, newProduct]);
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const addMovement = useCallback((productId: string, type: MovementType, quantity: number, reason: string) => {
    const movement: StockMovement = {
      id: Date.now().toString(),
      productId,
      type,
      quantity,
      reason,
      date: new Date(),
    };
    setMovements((prev) => [movement, ...prev]);
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        const newQty = type === 'entrada' ? p.quantity + quantity : Math.max(0, p.quantity - quantity);
        return { ...p, quantity: newQty, updatedAt: new Date() };
      })
    );
  }, []);

  return {
    products,
    filteredProducts,
    movements,
    stats,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    addProduct,
    updateProduct,
    deleteProduct,
    addMovement,
  };
}
