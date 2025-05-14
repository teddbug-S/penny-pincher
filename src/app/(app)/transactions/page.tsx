import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Transactions | Penny Pincher',
};

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Transactions</h1>
      <Card>
        <CardHeader>
          <CardTitle>Manage Your Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is where you will view, add, edit, and delete your transactions.</p>
          <p className="mt-4 text-muted-foreground">Transaction table and form components will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
