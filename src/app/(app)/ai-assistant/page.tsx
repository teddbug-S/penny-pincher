import { Metadata } from 'next';
import { AIBudgetAssistantClient } from '@/components/ai/ai-budget-assistant-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'AI Budgeting Assistant | Penny Pincher',
};

export default function AIAssistantPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">AI Budgeting Assistant</h1>
      <Card>
        <CardHeader>
          <CardTitle>Get Smart Savings Suggestions</CardTitle>
          <CardDescription>
            Let our AI analyze your spending and budget goals to provide personalized tips for improvement.
            For now, please manually input your spending data and budget goals as text.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AIBudgetAssistantClient />
        </CardContent>
      </Card>
    </div>
  );
}
