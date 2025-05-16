"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MOCK_BUDGET_GOALS, MOCK_TRANSACTIONS, PREDEFINED_CATEGORIES } from "@/lib/constants";
import type { BudgetGoal, Transaction } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

export function BudgetOverviewCard() {
  const getCategoryDetails = (categoryId: string) => {
    return PREDEFINED_CATEGORIES.find(cat => cat.id === categoryId);
  };

  const calculateSpentAmount = (categoryId: string) => {
    return MOCK_TRANSACTIONS
      .filter(t => t.categoryId === categoryId && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow" data-ai-hint="budget progress finance">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Budget Overview</CardTitle>
          <CardDescription>Track your spending against your budget goals.</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/budgets">Manage Budgets <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px] pr-4">
          <div className="space-y-4">
            {MOCK_BUDGET_GOALS.map((goal: BudgetGoal) => {
              const category = getCategoryDetails(goal.categoryId);
              if (!category) return null;
              const spentAmount = calculateSpentAmount(goal.categoryId);
              const progress = Math.min((spentAmount / goal.amount) * 100, 100);
              const isOverBudget = spentAmount > goal.amount;

              return (
                <div key={goal.categoryId}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <category.icon className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{category.name}</span>
                    </div>
                    <span className={`text-sm font-semibold ${isOverBudget ? 'text-destructive' : 'text-muted-foreground'}`}>
                      ${formatNumber(spentAmount)} / ${formatNumber(goal.amount)}
                    </span>
                  </div>
                  <Progress value={progress} className={isOverBudget ? "[&>div]:bg-destructive" : ""} />
                  {isOverBudget && (
                    <p className="text-xs text-destructive mt-1">You've exceeded your budget for {category.name}!</p>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
