import type { LucideIcon } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string; // For charts, e.g., 'hsl(var(--chart-1))'
}

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  categoryId: string;
  description: string;
  type: 'income' | 'expense';
}

export interface BudgetGoal {
  categoryId: string;
  amount: number; // Target budget amount for the month
}

export interface SpendingData {
  transactions: Transaction[];
  categories: Category[];
}

export interface AISuggestionPayload {
  spendingData: string; // Stringified JSON of transactions and categories
  budgetGoals?: string; // Stringified JSON of budget goals
}
