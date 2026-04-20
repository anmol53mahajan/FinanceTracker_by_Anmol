# Personal Finance and Expense Analytics App

A complete React application designed to help students, early-career professionals, and freelancers track expenses, monitor budgets, and understand spending behavior through practical analytics.

This project is built as PRD 2: Personal Finance and Expense Analytics App.

## Table of Contents

1. Product Overview
2. Problem Statement
3. Product Goals
4. Target Users
5. Core Features
6. Non-Functional Requirements
7. Routes and Pages
8. System Architecture
9. Data Model
10. React Concepts Used
11. External Packages
12. Folder Structure
13. APIs and Integrations
14. Analytics and Calculation Logic
15. Validation Rules
16. Setup and Run Instructions
17. Available Scripts
18. Usage Guide
19. UI and UX Behavior
20. Evaluation Criteria Mapping
21. Future Improvements
22. Student Details

## 1. Product Overview

Personal Finance and Expense Analytics App is a modern, single-page React application focused on personal money management.

The app helps users:

- Record income and expense transactions
- Categorize financial activity
- Set and track monthly budgets
- Search and filter transaction history
- Analyze spending behavior using charts and summary insights

It simulates a real consumer finance product with practical user flows, reusable React architecture, and scalable code organization.

## 2. Problem Statement

Many students and young professionals struggle to understand where their money goes every month.

Expenses are usually spread across:

- UPI payments
- Credit card transactions
- Subscription renewals
- Cash spending

Without a structured tracking system, users cannot clearly answer:

- How much did I spend this month?
- Which category consumes the most money?
- Am I exceeding my monthly budget?
- Where can I reduce unnecessary spending?

Traditional approaches like raw spreadsheets or notes are often insufficient because they typically do not provide:

- Fast categorization
- Searchable transaction history
- Dynamic filters
- Real-time analytics
- Visual trend insights

This project addresses these gaps through an interactive React-based finance dashboard.

## 3. Product Goals

### Primary Goals

The system is designed to allow users to:

- Record income and expense transactions
- Categorize all financial activity
- Monitor spending patterns over time
- Track budget usage and remaining amount
- Visualize financial insights through charts

### Secondary Goals

- Build healthy spending habits through awareness
- Improve financial decision making
- Demonstrate scalable React architecture and reusable component patterns

## 4. Target Users

### Primary Users

- Students managing day-to-day personal expenses
- Early-career professionals planning monthly cash flow
- Freelancers handling irregular income streams

### User Pain Points

Users frequently:

- Overspend without noticing
- Lose track of recurring subscriptions
- Fail to review spending distribution by category
- Lack clarity on monthly trends and budget status

## 5. Core Features

### Feature 1: Add Transactions

Users can add financial entries with complete metadata.

Supported transaction types:

- Income
- Expense

Required fields:

- Title
- Amount
- Category
- Date
- Transaction Type
- Notes

Expense categories include:

- Food
- Travel
- Rent
- Shopping
- Entertainment
- Health
- Utilities
- Subscriptions

Form implementation:

- react-hook-form for controlled and performant form handling
- yup for schema-based validation

Additional behavior:

- Optional recurring flag for repetitive expenses
- User-friendly validation errors
- Toast notifications for success or failure states

### Feature 2: Transaction List

All transactions are displayed in an organized list/card layout.

Each item includes:

- Title
- Category
- Amount
- Date
- Type

Actions available on each transaction:

- Edit transaction
- Delete transaction

### Feature 3: Search Transactions

Users can search transactions by:

- Title
- Notes

Expected behavior:

- Dynamic filtering as the user types
- Optimized search experience through debouncing

### Feature 4: Filtering

Transactions can be filtered by:

- Category
- Transaction type
- Date range

Example category filters:

- Food
- Travel
- Rent
- Subscriptions

### Feature 5: Sorting

Sorting options:

- Date
- Amount
- Category

Both ascending and descending sort directions can be supported depending on UI preference.

### Feature 6: Budget Tracking

Users can define a monthly budget and monitor consumption.

Budget section displays:

- Monthly budget amount
- Total spending
- Remaining budget
- Percentage used

Example:

- Monthly Budget: INR 50,000

### Feature 7: Analytics Dashboard

Dashboard provides high-level financial insights.

Key metrics:

- Total Income
- Total Expenses
- Net Balance
- Top Spending Category

Visual analytics:

- Pie chart: spending by category
- Line chart: monthly spending trend
- Bar chart: income vs expense comparison

### Feature 8: Recurring Expense Tracking

Users can mark expenses as recurring, such as:

- Netflix subscription
- Rent
- Gym membership

Recurring entries are highlighted in transaction views so users can quickly identify fixed monthly commitments.

## 6. Non-Functional Requirements

The system is designed to:

- Work well on mobile screens
- Load quickly and remain responsive
- Show loading states during async actions
- Handle empty states clearly when no data is present

## 7. Routes and Pages

Routing is implemented using React Router DOM.

Core routes:

- /dashboard: financial overview and summary widgets
- /transactions: full transaction listing with search, filter, sort
- /transactions/new: add transaction form
- /budget: budget tracking and usage indicators
- /analytics: detailed chart visualizations

## 8. System Architecture

The project follows a modular architecture where responsibilities are separated into pages, reusable components, hooks, services, and utilities.

### High-Level Design

- Presentation layer: reusable UI components and pages
- State layer: FinanceContext for global finance state
- Hook layer: reusable domain-specific hooks
- Service layer: API integrations through a dedicated service module
- Utility layer: formatting and finance helper logic

### State Management Strategy

Global state uses Context API to avoid prop drilling across pages.

Finance context typically manages:

- transactions
- budget
- addTransaction()
- updateTransaction()
- deleteTransaction()

This design keeps data operations centralized and UI components focused on rendering.

## 9. Data Model

### Transaction Object

```json
{
	"id": "string",
	"title": "string",
	"amount": 0,
	"category": "string",
	"type": "income | expense",
	"date": "date",
	"notes": "string",
	"recurring": false
}
```

### Budget Object

```json
{
	"monthlyBudget": 0
}
```

## 10. React Concepts Used

### useState

Used for local state such as:

- Form inputs
- Search query
- Filter options
- Sort configuration
- Local UI states

### useEffect

Used for:

- Recalculating analytics on transaction updates
- Handling side effects for data loading and updates

### Context API

FinanceContext provides global, shared finance data and actions throughout the app.

### Custom Hooks

Reusable hooks used in the project:

- useTransactions: transaction CRUD logic
- useBudget: budget metrics and remaining calculations
- useCurrency: consistent currency formatting and conversion helpers
- useDebounce: optimized search input behavior

### React Router DOM

Navigation across the required page structure:

- /dashboard
- /transactions
- /transactions/new
- /budget
- /analytics

## 11. External Packages

Required packages used:

- react-router-dom: routing and page navigation
- axios: API requests and HTTP abstraction
- react-icons: iconography for UI clarity
- react-toastify: non-blocking user notifications
- react-hook-form: performant and scalable form handling
- yup: schema validation
- recharts: analytics charts
- date-fns: date formatting and range utilities
- uuid: unique transaction IDs
- framer-motion: smooth UI animations

Core project stack:

- React
- Vite
- Tailwind CSS
- ESLint

## 12. Folder Structure

Current project structure:

```text
src/
	assets/
	components/
		ChartsSection.jsx
		FiltersBar.jsx
		Layout.jsx
		PageHeader.jsx
		StatCard.jsx
		TransactionCard.jsx
		ui/
			badge.jsx
			button.jsx
			card.jsx
			empty-state.jsx
			input.jsx
			select.jsx
			textarea.jsx
	context/
		FinanceContext.jsx
	hooks/
		useBudget.js
		useCurrency.js
		useDebounce.js
		useTransactions.js
	pages/
		AddTransaction.jsx
		Analytics.jsx
		Budget.jsx
		Dashboard.jsx
		Transactions.jsx
	services/
		api.js
	utils/
		currencyFormatter.js
		finance.js
		yupResolver.js
	App.css
	App.jsx
	index.css
	main.jsx
```

This structure keeps business logic, display components, and cross-cutting utilities cleanly separated for maintainability.

## 13. APIs and Integrations

### Currency Exchange API

Recommended endpoint example:

- https://api.exchangerate-api.com

Use case:

- Optional conversion for users handling multiple currencies
- Display converted values in analytics or summaries

### Financial News API (Optional)

Recommended endpoint example:

- https://newsapi.org

Use case:

- Optional news feed on dashboard or analytics page to increase finance awareness

### API Layer Pattern

All external API calls should be centralized in the service module to:

- Keep components clean
- Avoid repeated request code
- Improve testability and maintainability

## 14. Analytics and Calculation Logic

Common formulas used by the app:

- Total Income = sum of amounts where type is income
- Total Expenses = sum of amounts where type is expense
- Net Balance = Total Income minus Total Expenses
- Remaining Budget = Monthly Budget minus Total Expenses
- Budget Usage Percentage = (Total Expenses divided by Monthly Budget) multiplied by 100

Category breakdown for pie chart:

- Group expense transactions by category
- Aggregate totals per category
- Convert to chart dataset format

Monthly trend for line chart:

- Group entries by month and year
- Plot monthly totals to reveal spending trajectory

Income vs Expense bar chart:

- Aggregate totals per month for both income and expense
- Visualize side-by-side comparison for each period

Top spending category:

- Identify category with highest total expense amount

## 15. Validation Rules

Typical validation constraints with yup:

- Title is required and non-empty
- Amount is required and must be greater than zero
- Category is required
- Type must be income or expense
- Date is required and valid
- Notes can be optional but length constrained if needed

User experience expectations:

- Field-level validation messages
- Prevent submit on invalid data
- Clear error states and helpful prompts

## 16. Setup and Run Instructions

### Prerequisites

- Node.js (recommended: latest LTS)
- npm

### Installation

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## 17. Available Scripts

Project scripts:

- npm run dev: starts Vite development server
- npm run build: creates optimized production build
- npm run lint: runs ESLint checks
- npm run preview: previews production build locally

## 18. Usage Guide

Suggested user flow:

1. Navigate to Add Transaction page and create income and expense entries.
2. Open Transactions page to search, filter, and sort records.
3. Set monthly budget in Budget page.
4. Review Dashboard metrics for overall financial health.
5. Open Analytics page to inspect visual category and trend insights.
6. Mark recurring expenses to track fixed commitments clearly.

## 19. UI and UX Behavior

The app emphasizes practical financial clarity through:

- Readable card-based summaries
- Quick-access filters and search controls
- Meaningful loading indicators
- Empty-state components for first-time users
- Consistent visual hierarchy for amounts and categories
- Responsive layouts for mobile and desktop usage

## 20. Evaluation Criteria Mapping

This implementation aligns with the evaluation rubric:

- Feature completeness (25%): includes all major PRD flows
- React architecture (25%): modular pages, components, hooks, and context
- State management (20%): centralized finance state with Context API
- UI design (15%): responsive, reusable UI patterns, chart-driven insights
- Code quality (15%): structured folders, utility separation, validation, and linting

## 21. Future Improvements

Possible enhancements:

- Persistent data storage using backend or cloud database
- Authentication and user accounts
- Recurring transaction auto-generation each month
- Advanced analytics with trend predictions
- Export to CSV or PDF reports
- Budget alerts and notification rules
- Multi-currency dashboard with live exchange updates
- Financial news integration panel

## 22. Student Details

Name: Anmol Mahajan  
Roll Number: 25bcs10037

