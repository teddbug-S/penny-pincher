import { Metadata } from 'next';
import { SummaryCard } from '@/components/dashboard/summary-card';
import { RecentTransactionsCard } from '@/components/dashboard/recent-transactions-card';
import { BudgetOverviewCard } from '@/components/dashboard/budget-overview-card';
import { SpendingPieChartCard } from '@/components/dashboard/spending-pie-chart-card';
import { DollarSign, TrendingUp, TrendingDown, Activity, PiggyBank } from 'lucide-react'; // Added Activity and PiggyBank
import { formatCurrency } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Dashboard | Penny Pincher',
};

export default function DashboardPage() {
  // Mock data for demonstration
  const totalIncome = 2500;
  const totalExpenses = 1121.25;
  const netSavings = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          title="Total Income"
          value={formatCurrency(totalIncome)}
          icon={DollarSign}
          data-ai-hint="income summary"
          trend="positive"
          trendValue="+5% from last month"
        />
        <SummaryCard
          title="Total Expenses"
          value={formatCurrency(totalExpenses)}
          icon={TrendingDown} // Using TrendingDown for expenses
          data-ai-hint="expense summary"
          trend="negative"
          trendValue="+2% from last month"
        />
        <SummaryCard
          title="Net Savings"
          value={formatCurrency(netSavings)}
          icon={PiggyBank} // Using PiggyBank for savings
          data-ai-hint="savings summary"
          trend={netSavings > 0 ? "positive" : "negative"}
          trendValue={netSavings > 0 ? "Looking good!" : "Needs improvement"}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <RecentTransactionsCard />
        </div>
        <div className="lg:col-span-3">
          <SpendingPieChartCard />
        </div>
      </div>
      
      <div>
        <BudgetOverviewCard />
      </div>

    </div>
  );
}
