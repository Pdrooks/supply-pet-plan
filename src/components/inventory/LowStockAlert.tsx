import { AlertTriangle } from 'lucide-react';
import { Product, CATEGORY_ICONS } from '@/types/inventory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LowStockAlertProps {
  products: Product[];
}

export function LowStockAlert({ products }: LowStockAlertProps) {
  if (products.length === 0) return null;

  return (
    <Card className="border-destructive/30 bg-destructive/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-4 w-4" />
          Alertas de Estoque ({products.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2">
          {products.map((p) => (
            <Badge
              key={p.id}
              variant={p.quantity === 0 ? 'destructive' : 'warning'}
              className="text-xs py-1 px-2.5"
            >
              {CATEGORY_ICONS[p.category]} {p.name} — {p.quantity}/{p.minStock} {p.unit}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
