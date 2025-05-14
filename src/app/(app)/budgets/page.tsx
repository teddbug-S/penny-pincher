import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Budgets | Penny Pincher',
};

export default function BudgetsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Budget Goals</h1>
      <Card>
        <CardHeader>
          <CardTitle>Set and Track Your Budgets</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is where you will set monthly budget goals for each spending category and track your progress.</p>
          <p className="mt-4 text-muted-foreground">Budget goal setting forms and progress displays will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
