import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Categories | Penny Pincher',
};

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Spending Categories</h1>
      <Card>
        <CardHeader>
          <CardTitle>Manage Your Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is where you will manage your spending categories.</p>
          <p className="mt-4 text-muted-foreground">Category list and form components will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
