"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { MOCK_TRANSACTIONS, PREDEFINED_CATEGORIES } from "@/lib/constants";
import type { Transaction } from "@/lib/types";
import { useMemo } from "react";

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
        fill: category.color,
        icon: category.icon,
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
              content={<ChartTooltipContent hideLabel nameKey="name" />}
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
            <ChartLegend content={<ChartLegendContent nameKey="name" className="text-xs" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
