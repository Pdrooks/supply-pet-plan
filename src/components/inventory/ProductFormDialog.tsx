import { useState, useEffect } from 'react';
import { Product, ProductCategory, CATEGORY_LABELS } from '@/types/inventory';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSave: (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdate?: (id: string, data: Partial<Product>) => void;
}

const emptyForm = {
  name: '', sku: '', category: 'racao' as ProductCategory,
  price: 0, costPrice: 0, quantity: 0, minStock: 5, unit: 'un', supplier: '',
};

export function ProductFormDialog({ open, onOpenChange, product, onSave, onUpdate }: ProductFormDialogProps) {
  const [form, setForm] = useState(emptyForm);
  const isEditing = !!product;

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name, sku: product.sku, category: product.category,
        price: product.price, costPrice: product.costPrice, quantity: product.quantity,
        minStock: product.minStock, unit: product.unit, supplier: product.supplier || '',
      });
    } else {
      setForm(emptyForm);
    }
  }, [product, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && onUpdate) {
      onUpdate(product!.id, form);
    } else {
      onSave(form);
    }
    onOpenChange(false);
  };

  const set = (key: string, value: string | number) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEditing ? 'Editar Produto' : 'Novo Produto'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 mt-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome do Produto</Label>
            <Input id="name" value={form.name} onChange={(e) => set('name', e.target.value)} required placeholder="Ex: Ração Premium 15kg" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="sku">SKU</Label>
              <Input id="sku" value={form.sku} onChange={(e) => set('sku', e.target.value)} required placeholder="RAC-001" />
            </div>
            <div className="grid gap-2">
              <Label>Categoria</Label>
              <Select value={form.category} onValueChange={(v) => set('category', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Preço de Venda (R$)</Label>
              <Input id="price" type="number" step="0.01" min="0" value={form.price} onChange={(e) => set('price', parseFloat(e.target.value) || 0)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="costPrice">Preço de Custo (R$)</Label>
              <Input id="costPrice" type="number" step="0.01" min="0" value={form.costPrice} onChange={(e) => set('costPrice', parseFloat(e.target.value) || 0)} required />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantidade</Label>
              <Input id="quantity" type="number" min="0" value={form.quantity} onChange={(e) => set('quantity', parseInt(e.target.value) || 0)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="minStock">Estoque Mín.</Label>
              <Input id="minStock" type="number" min="0" value={form.minStock} onChange={(e) => set('minStock', parseInt(e.target.value) || 0)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unit">Unidade</Label>
              <Input id="unit" value={form.unit} onChange={(e) => set('unit', e.target.value)} placeholder="un, kg, cx" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="supplier">Fornecedor</Label>
            <Input id="supplier" value={form.supplier} onChange={(e) => set('supplier', e.target.value)} placeholder="Nome do fornecedor" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit">{isEditing ? 'Salvar Alterações' : 'Cadastrar Produto'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
