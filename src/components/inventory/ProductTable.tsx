import { Pencil, Trash2, ArrowUpDown } from 'lucide-react';
import { Product, CATEGORY_LABELS, CATEGORY_ICONS } from '@/types/inventory';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onMovement: (product: Product) => void;
}

type SortKey = 'name' | 'quantity' | 'price' | 'category';

const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export function ProductTable({ products, onEdit, onDelete, onMovement }: ProductTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortAsc, setSortAsc] = useState(true);

  const sorted = [...products].sort((a, b) => {
    const dir = sortAsc ? 1 : -1;
    if (sortKey === 'name') return a.name.localeCompare(b.name) * dir;
    if (sortKey === 'quantity') return (a.quantity - b.quantity) * dir;
    if (sortKey === 'price') return (a.price - b.price) * dir;
    return a.category.localeCompare(b.category) * dir;
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const SortHeader = ({ label, k }: { label: string; k: SortKey }) => (
    <TableHead className="cursor-pointer select-none" onClick={() => toggleSort(k)}>
      <span className="flex items-center gap-1">
        {label} <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
      </span>
    </TableHead>
  );

  return (
    <div className="rounded-lg border border-border/60 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/50">
            <SortHeader label="Produto" k="name" />
            <TableHead>SKU</TableHead>
            <SortHeader label="Categoria" k="category" />
            <SortHeader label="Qtd" k="quantity" />
            <SortHeader label="Preço" k="price" />
            <TableHead>Valor Total</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                Nenhum produto encontrado.
              </TableCell>
            </TableRow>
          )}
          {sorted.map((p) => {
            const isLow = p.quantity <= p.minStock;
            const isOut = p.quantity === 0;
            return (
              <TableRow key={p.id} className="hover:bg-secondary/30 transition-colors">
                <TableCell className="font-medium max-w-[220px] truncate">{p.name}</TableCell>
                <TableCell className="text-muted-foreground text-xs font-mono">{p.sku}</TableCell>
                <TableCell>
                  <span className="text-sm">
                    {CATEGORY_ICONS[p.category]} {CATEGORY_LABELS[p.category]}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{p.quantity}</span>
                    {isOut && <Badge variant="destructive" className="text-[10px] px-1.5">Sem estoque</Badge>}
                    {isLow && !isOut && <Badge variant="warning" className="text-[10px] px-1.5">Baixo</Badge>}
                  </div>
                </TableCell>
                <TableCell>{fmt(p.price)}</TableCell>
                <TableCell className="font-medium">{fmt(p.quantity * p.price)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onMovement(p)} title="Movimentar">
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(p)} title="Editar">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => onDelete(p.id)} title="Excluir">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
