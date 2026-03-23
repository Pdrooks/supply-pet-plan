import { useState } from 'react';
import { Product, MovementType } from '@/types/inventory';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MovementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onSave: (productId: string, type: MovementType, quantity: number, reason: string) => void;
}

export function MovementDialog({ open, onOpenChange, product, onSave }: MovementDialogProps) {
  const [type, setType] = useState<MovementType>('entrada');
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    onSave(product.id, type, quantity, reason);
    setQuantity(1);
    setReason('');
    onOpenChange(false);
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Movimentação de Estoque</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{product.name}</span> — Estoque atual: <span className="font-bold">{product.quantity} {product.unit}</span>
        </p>
        <form onSubmit={handleSubmit} className="grid gap-4 mt-2">
          <div className="grid gap-2">
            <Label>Tipo</Label>
            <Select value={type} onValueChange={(v) => setType(v as MovementType)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="entrada">📦 Entrada</SelectItem>
                <SelectItem value="saida">📤 Saída</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mov-qty">Quantidade</Label>
            <Input id="mov-qty" type="number" min="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mov-reason">Motivo</Label>
            <Input id="mov-reason" value={reason} onChange={(e) => setReason(e.target.value)} required placeholder="Ex: Compra fornecedor, Venda PDV" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit">Registrar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
