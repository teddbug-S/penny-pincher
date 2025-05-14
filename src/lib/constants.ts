import type { Category, Transaction, BudgetGoal } from './types';
import {
  UtensilsCrossed,
  ShoppingBag,
  Home,
  Car,
  Film,
  ShoppingCart,
  Zap,
  HeartPulse,
  Receipt,
  Landmark,
  Shirt,
  Gift,
  GraduationCap,
  Plane,
  Target, // Added Target icon
  BarChart2, // Added BarChart2 icon
  Sparkles // Added Sparkles icon
} from 'lucide-react';

export const PREDEFINED_CATEGORIES: Category[] = [
  { id: 'food', name: 'Food & Drinks', icon: UtensilsCrossed, color: 'hsl(var(--chart-1))' },
  { id: 'shopping', name: 'Shopping', icon: ShoppingBag, color: 'hsl(var(--chart-2))' },
  { id: 'housing', name: 'Housing', icon: Home, color: 'hsl(var(--chart-3))' },
  { id: 'transportation', name: 'Transportation', icon: Car, color: 'hsl(var(--chart-4))' },
  { id: 'entertainment', name: 'Entertainment', icon: Film, color: 'hsl(var(--chart-5))' },
  { id: 'groceries', name: 'Groceries', icon: ShoppingCart, color: 'hsl(var(--chart-1))' }, // Re-use chart colors or add more
  { id: 'utilities', name: 'Utilities', icon: Zap, color: 'hsl(var(--chart-2))' },
  { id: 'healthcare', name: 'Healthcare', icon: HeartPulse, color: 'hsl(var(--chart-3))' },
  { id: 'bills', name: 'Bills & Fees', icon: Receipt, color: 'hsl(var(--chart-4))' },
  { id: 'clothing', name: 'Clothing', icon: Shirt, color: 'hsl(var(--chart-5))' },
  { id: 'gifts', name: 'Gifts', icon: Gift, color: 'hsl(var(--chart-1))' },
  { id: 'education', name: 'Education', icon: GraduationCap, color: 'hsl(var(--chart-2))' },
  { id: 'travel', name: 'Travel', icon: Plane, color: 'hsl(var(--chart-3))' },
  { id: 'salary', name: 'Salary', icon: Landmark, color: 'hsl(var(--accent))' }, // Income category
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', date: new Date(2024, 6, 15), amount: 2500, categoryId: 'salary', description: 'Monthly Salary', type: 'income' },
  { id: '2', date: new Date(2024, 6, 16), amount: 55.75, categoryId: 'food', description: 'Dinner with friends', type: 'expense' },
  { id: '3', date: new Date(2024, 6, 17), amount: 120.00, categoryId: 'groceries', description: 'Weekly groceries', type: 'expense' },
  { id: '4', date: new Date(2024, 6, 18), amount: 30.00, categoryId: 'transportation', description: 'Gasoline', type: 'expense' },
  { id: '5', date: new Date(2024, 6, 18), amount: 75.50, categoryId: 'shopping', description: 'New T-shirt', type: 'expense' },
  { id: '6', date: new Date(2024, 6, 20), amount: 800.00, categoryId: 'housing', description: 'Rent', type: 'expense' },
  { id: '7', date: new Date(2024, 6, 22), amount: 45.00, categoryId: 'entertainment', description: 'Movie tickets', type: 'expense' },
];

export const MOCK_BUDGET_GOALS: BudgetGoal[] = [
  { categoryId: 'food', amount: 400 },
  { categoryId: 'groceries', amount: 300 },
  { categoryId: 'shopping', amount: 150 },
  { categoryId: 'entertainment', amount: 100 },
  { categoryId: 'transportation', amount: 100 },
];

export const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/transactions", label: "Transactions", icon: Receipt },
  { href: "/categories", label: "Categories", icon: ShoppingBag }, // Using ShoppingBag as a general category icon
  { href: "/budgets", label: "Budgets", icon: Target }, // Lucide 'Target' icon
  { href: "/reports", label: "Reports", icon: BarChart2 }, // Lucide 'BarChart2' icon
  { href: "/ai-assistant", label: "AI Assistant", icon: Sparkles }, // Lucide 'Sparkles' icon
];
