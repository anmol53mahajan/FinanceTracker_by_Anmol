import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Transactions from './pages/Transactions.jsx'
import AddTransaction from './pages/AddTransaction.jsx'
import Budget from './pages/Budget.jsx'
import Analytics from './pages/Analytics.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transactions/new" element={<AddTransaction />} />
        <Route path="/transactions/:transactionId/edit" element={<AddTransaction />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/analytics" element={<Analytics />} />
      </Route>
    </Routes>
  )
}