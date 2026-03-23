import { Package, DollarSign, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardsProps {
  totalProducts: number;
  totalItems: number;
  totalValue: number;
  lowStockCount: number;
}

const formatCurrency = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export function StatsCards({ totalProducts, totalItems, totalValue, lowStockCount }: StatsCardsProps) {
  const cards = [
    { label: 'Total de Produtos', value: totalProducts, icon: Package, accent: 'text-primary' },
    { label: 'Itens em Estoque', value: totalItems.toLocaleString('pt-BR'), icon: TrendingUp, accent: 'text-accent' },
    { label: 'Valor em Estoque', value: formatCurrency(totalValue), icon: DollarSign, accent: 'text-success' },
    { label: 'Estoque Baixo', value: lowStockCount, icon: AlertTriangle, accent: 'text-destructive' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <Card key={c.label} className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{c.label}</p>
                <p className="text-2xl font-bold mt-1">{c.value}</p>
              </div>
              <div className={`p-3 rounded-xl bg-secondary ${c.accent}`}>
                <c.icon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
