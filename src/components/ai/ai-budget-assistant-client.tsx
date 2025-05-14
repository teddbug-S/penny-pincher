'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles } from 'lucide-react';
import { suggestSavingsAreas, type SuggestSavingsAreasInput, type SuggestSavingsAreasOutput } from '@/ai/flows/suggest-savings-areas';
import { MOCK_TRANSACTIONS, MOCK_BUDGET_GOALS, PREDEFINED_CATEGORIES } from '@/lib/constants'; // For example data

const formSchema = z.object({
  spendingData: z.string().min(10, 'Spending data is too short.'),
  budgetGoals: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function AIBudgetAssistantClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setAiSuggestion(null);
    setError(null);
    try {
      const input: SuggestSavingsAreasInput = {
        spendingData: data.spendingData,
      };
      if (data.budgetGoals) {
        input.budgetGoals = data.budgetGoals;
      }
      const result: SuggestSavingsAreasOutput = await suggestSavingsAreas(input);
      setAiSuggestion(result.suggestions);
    } catch (e) {
      setError('Failed to get suggestions from AI assistant. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const loadExampleData = () => {
    const exampleSpending = `Recent Transactions:\n${MOCK_TRANSACTIONS.map(t => `- ${PREDEFINED_CATEGORIES.find(c=>c.id===t.categoryId)?.name}: $${t.amount.toFixed(2)} on ${t.date.toLocaleDateString()} for ${t.description}`).join('\n')}`;
    const exampleBudgets = `Budget Goals:\n${MOCK_BUDGET_GOALS.map(b => `- ${PREDEFINED_CATEGORIES.find(c=>c.id===b.categoryId)?.name}: $${b.amount.toFixed(2)}`).join('\n')}`;
    setValue("spendingData", exampleSpending);
    setValue("budgetGoals", exampleBudgets);
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="spendingData" className="mb-1 block">Spending Data</Label>
          <Textarea
            id="spendingData"
            {...register('spendingData')}
            placeholder="Describe your spending habits, e.g., 'Spent $50 on groceries, $20 on coffee last week...' or paste transaction data."
            rows={6}
            className={errors.spendingData ? 'border-destructive' : ''}
          />
          {errors.spendingData && <p className="text-sm text-destructive mt-1">{errors.spendingData.message}</p>}
        </div>
        <div>
          <Label htmlFor="budgetGoals" className="mb-1 block">Budget Goals (Optional)</Label>
          <Textarea
            id="budgetGoals"
            {...register('budgetGoals')}
            placeholder="Describe your budget goals, e.g., 'Try to spend less than $300 on food per month...' or paste budget data."
            rows={4}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
           <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Get Suggestions
          </Button>
          <Button type="button" variant="outline" onClick={loadExampleData} disabled={isLoading} className="w-full sm:w-auto">
            Load Example Data
          </Button>
        </div>
       
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {aiSuggestion && (
        <Card className="bg-secondary/50" data-ai-hint="AI suggestion finance tips">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Powered Suggestions
            </CardTitle>
            <CardDescription>Here are some tips to help you manage your finances better:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none whitespace-pre-line">
              {aiSuggestion}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
