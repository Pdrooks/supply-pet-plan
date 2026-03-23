import { useState } from 'react';
import { Search, Plus, PawPrint, Filter, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useInventory } from '@/hooks/useInventory';
import { Product, CATEGORY_LABELS, ProductCategory } from '@/types/inventory';
import { StatsCards } from '@/components/inventory/StatsCards';
import { ProductTable } from '@/components/inventory/ProductTable';
import { ProductFormDialog } from '@/components/inventory/ProductFormDialog';
import { MovementDialog } from '@/components/inventory/MovementDialog';
import { LowStockAlert } from '@/components/inventory/LowStockAlert';
import { RecentMovements } from '@/components/inventory/RecentMovements';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Index = () => {
  const {
    products, filteredProducts, movements, stats,
    searchTerm, setSearchTerm, categoryFilter, setCategoryFilter,
    addProduct, updateProduct, deleteProduct, addMovement,
  } = useInventory();

  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [movementDialogOpen, setMovementDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [movementProduct, setMovementProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setProductDialogOpen(true);
  };

  const handleNewProduct = () => {
    setEditingProduct(null);
    setProductDialogOpen(true);
  };

  const handleMovement = (product: Product) => {
    setMovementProduct(product);
    setMovementDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/60 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary text-primary-foreground">
              <PawPrint className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Pet Supply</h1>
              <p className="text-xs text-muted-foreground">Controle de Estoque</p>
            </div>
          </div>
          <Button onClick={handleNewProduct} className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" />
            Novo Produto
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <StatsCards
          totalProducts={stats.totalProducts}
          totalItems={stats.totalItems}
          totalValue={stats.totalValue}
          lowStockCount={stats.lowStockProducts.length}
        />

        {/* Alerts */}
        <LowStockAlert products={stats.lowStockProducts} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Product table */}
          <div className="lg:col-span-3 space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as ProductCategory | 'all')}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <ProductTable
              products={filteredProducts}
              onEdit={handleEdit}
              onDelete={deleteProduct}
              onMovement={handleMovement}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <RecentMovements movements={movements} products={products} />
          </div>
        </div>
      </main>

      {/* Dialogs */}
      <ProductFormDialog
        open={productDialogOpen}
        onOpenChange={setProductDialogOpen}
        product={editingProduct}
        onSave={addProduct}
        onUpdate={updateProduct}
      />
      <MovementDialog
        open={movementDialogOpen}
        onOpenChange={setMovementDialogOpen}
        product={movementProduct}
        onSave={addMovement}
      />
    </div>
  );
};

export default Index;
