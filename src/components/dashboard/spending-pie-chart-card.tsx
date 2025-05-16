"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, TooltipProps } from "recharts";
import { MOCK_TRANSACTIONS, PREDEFINED_CATEGORIES } from "@/lib/constants";
import type { Transaction } from "@/lib/types"; // Assuming Category type is also here or imported
import { formatCurrency } from "@/lib/utils";
import { useMemo } from "react";

// Define the custom tooltip content component
const CustomPieChartTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    // Accessing the original item from chartData via data.payload
    const originalItem = data.payload as { name: string; value: number; fill: string; icon: React.ElementType };
    const percentage = data.percent;

    return (
      <div className="rounded-lg border bg-background p-2.5 text-xs shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
            style={{ backgroundColor: originalItem.fill }}
          />
          <span className="font-medium text-muted-foreground">{originalItem.name}</span>
        </div>
        <div className="font-mono font-medium tabular-nums text-foreground text-right">
          {formatCurrency(originalItem.value as number)}
        </div>
        {percentage !== undefined && (
          <div className="text-muted-foreground text-right">
            ({(percentage * 100).toFixed(1)}%)
          </div>
        )}
      </div>
    );
  }
  return null;
};


export function SpendingPieChartCard() {
  const chartData = useMemo(() => {
    const spendingByCategory: { [key: string]: number } = {};
    MOCK_TRANSACTIONS.filter(t => t.type === 'expense').forEach(transaction => {
      spendingByCategory[transaction.categoryId] = (spendingByCategory[transaction.categoryId] || 0) + transaction.amount;
    });

    return PREDEFINED_CATEGORIES
      .filter(cat => spendingByCategory[cat.id] > 0)
      .map(category => ({
        name: category.name,
        value: spendingByCategory[category.id],
        fill: category.color, // Used by Cell and CustomPieChartTooltip
        icon: category.icon, // Used by chartConfig
      }));
  }, []);
  
  const chartConfig = useMemo(() => {
    const config: any = {};
    chartData.forEach(item => {
      config[item.name] = {
        label: item.name,
        color: item.fill,
        icon: item.icon,
      };
    });
    return config;
  }, [chartData]);


  if (chartData.length === 0) {
    return (
      <Card className="shadow-md hover:shadow-lg transition-shadow" data-ai-hint="spending chart finance">
        <CardHeader>
          <CardTitle>Spending Distribution</CardTitle>
          <CardDescription>No expense data available to display chart.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[250px]">
          <p className="text-muted-foreground">Enter some transactions to see your spending breakdown.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow" data-ai-hint="spending chart finance">
      <CardHeader>
        <CardTitle>Spending Distribution</CardTitle>
        <CardDescription>How your expenses are distributed across categories.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ChartContainer config={chartConfig} className="aspect-square h-[250px] w-full">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<CustomPieChartTooltip />} // Using custom tooltip
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              labelLine={false}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                 const RADIAN = Math.PI / 180;
                 const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                 const x = cx + radius * Math.cos(-midAngle * RADIAN);
                 const y = cy + radius * Math.sin(-midAngle * RADIAN);
                 return (percent * 100) > 5 ? ( // Only show label if percent is > 5%
                    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="10px">
                      {`${(percent * 100).toFixed(0)}%`}
                    </text>
                  ) : null;
              }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            {/* Added flex-wrap and justify-start to allow legend items to wrap */}
            <ChartLegend content={<ChartLegendContent nameKey="name" className="text-xs flex-wrap justify-start items-center" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
