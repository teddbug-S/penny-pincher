# Personal Finance Dashboard with AI Assistant

This project is a comprehensive personal finance dashboard built with Next.js, offering users the ability to track income and expenses, manage budgets, categorize transactions, and gain insights into their spending habits. A key feature is the integrated AI assistant, powered by Genkit, which can provide intelligent suggestions and analysis related to personal finance.

## Features

Based on the project structure and component names, the application appears to offer the following key features:

- **Dashboard Overview:** Provides a summary of the user's financial status, including a budget overview, recent transactions, and a spending pie chart. (Inferred from `src/app/(app)/page.tsx`, `src/components/dashboard/budget-overview-card.tsx`, `src/components/dashboard/recent-transactions-card.tsx`, `src/components/dashboard/spending-pie-chart-card.tsx`, `src/components/dashboard/summary-card.tsx`)
- **Transaction Tracking:** Allows users to record and manage their financial transactions. (Inferred from `src/app/(app)/transactions/page.tsx`)
- **Budget Management:** Enables users to create and track budgets for different categories. (Inferred from `src/app/(app)/budgets/page.tsx`)
- **Category Management:** Provides functionality to define and manage transaction categories. (Inferred from `src/app/(app)/categories/page.tsx`)
- **Reporting:** Offers reports on financial activity. (Inferred from `src/app/(app)/reports/page.tsx`)
- **AI Budget Assistant:** An interactive AI assistant that can provide personalized financial advice and suggestions. (Inferred from `src/app/(app)/ai-assistant/page.tsx`, `src/components/ai/ai-budget-assistant-client.tsx`)

## Technologies Used

The project leverages a modern technology stack for building a robust and scalable web application:

- **Next.js:** A React framework for server-side rendering and static site generation.
- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** Adds static typing to JavaScript for improved code maintainability.
- **Tailwind CSS:** A utility-first CSS framework for rapid styling.
- **Shadcn UI:** A collection of reusable UI components built with Radix UI and Tailwind CSS.
- **Genkit:** A framework for building AI-powered applications, likely used for the AI assistant feature.
- **Firebase:** (Inferred from the project name "Firebase Studio") Likely used for backend services like authentication, database (Firestore), and potentially other features.
- **Tanstack Query:** (Inferred from `package.json` dependencies) Likely used for data fetching, caching, and state management.
- **Chart.js:** (Inferred from `package.json` dependencies and component names) Used for generating charts, such as the spending pie chart.

