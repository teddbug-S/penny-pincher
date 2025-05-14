"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MOCK_TRANSACTIONS, PREDEFINED_CATEGORIES } from "@/lib/constants";
import type { Transaction } from "@/lib/types";
import { format } from "date-fns";

export function RecentTransactionsCard() {
  const recentTransactions = MOCK_TRANSACTIONS.slice(0, 5); // Show latest 5

  const getCategoryName = (categoryId: string) => {
    return PREDEFINED_CATEGORIES.find(cat => cat.id === categoryId)?.name || "Unknown";
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow" data-ai-hint="transaction list finance">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest financial activities.</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/transactions">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction: Transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{getCategoryName(transaction.categoryId)}</Badge>
                  </TableCell>
                  <TableCell>{format(transaction.date, "MMM dd, yyyy")}</TableCell>
                  <TableCell className={`text-right font-semibold ${transaction.type === 'income' ? 'text-accent' : 'text-destructive'}`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
