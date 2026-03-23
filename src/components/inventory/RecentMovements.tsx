import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { StockMovement, Product } from '@/types/inventory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RecentMovementsProps {
  movements: StockMovement[];
  products: Product[];
}

export function RecentMovements({ movements, products }: RecentMovementsProps) {
  const recent = movements.slice(0, 6);
  const getProduct = (id: string) => products.find((p) => p.id === id);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Movimentações Recentes</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {recent.length === 0 && <p className="text-sm text-muted-foreground">Nenhuma movimentação registrada.</p>}
        <div className="space-y-3">
          {recent.map((m) => {
            const product = getProduct(m.productId);
            const isEntry = m.type === 'entrada';
            return (
              <div key={m.id} className="flex items-center gap-3 text-sm">
                <div className={`p-1.5 rounded-lg ${isEntry ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                  {isEntry ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{product?.name || 'Produto removido'}</p>
                  <p className="text-xs text-muted-foreground">{m.reason}</p>
                </div>
                <span className={`font-bold text-sm ${isEntry ? 'text-success' : 'text-destructive'}`}>
                  {isEntry ? '+' : '-'}{m.quantity}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
