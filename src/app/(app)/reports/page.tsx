import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Reports | Penny Pincher',
};

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Spending Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle>Analyze Your Spending Habits</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is where you will find detailed visual representations of your spending habits through various charts (bar, line, etc.).</p>
          <p className="mt-4 text-muted-foreground">Chart components will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
