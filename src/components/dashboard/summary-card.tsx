import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: 'positive' | 'negative' | 'neutral';
  trendValue?: string;
  className?: string;
  'data-ai-hint'?: string;
}

export function SummaryCard({ title, value, icon: Icon, trend, trendValue, className, 'data-ai-hint': aiHint }: SummaryCardProps) {
  return (
    <Card className={cn("shadow-md hover:shadow-lg transition-shadow", className)} data-ai-hint={aiHint}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {trendValue && (
          <p className={cn(
            "text-xs text-muted-foreground mt-1",
            trend === 'positive' && 'text-accent',
            trend === 'negative' && 'text-destructive'
          )}>
            {trendValue}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
