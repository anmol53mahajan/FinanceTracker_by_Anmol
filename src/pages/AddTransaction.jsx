import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import * as yup from 'yup'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import PageHeader from '../components/PageHeader.jsx'
import Button from '../components/ui/button.jsx'
import Input from '../components/ui/input.jsx'
import Select from '../components/ui/select.jsx'
import Textarea from '../components/ui/textarea.jsx'
import Badge from '../components/ui/badge.jsx'
import { Card, CardBody } from '../components/ui/card.jsx'
import useTransactions from '../hooks/useTransactions.js'
import { expenseCategories, incomeCategories } from '../utils/finance.js'
import { yupResolver } from '../utils/yupResolver.js'

const schema = yup.object({
  title: yup.string().trim().required('Title is required').max(80, 'Title is too long'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .positive('Amount must be greater than zero')
    .required('Amount is required'),
  category: yup.string().required('Category is required'),
  type: yup.mixed().oneOf(['income', 'expense']).required('Type is required'),
  date: yup.string().required('Date is required'),
  notes: yup.string().trim().max(220, 'Notes are too long').nullable(),
  recurring: yup.boolean().default(false),
})

const defaultValues = {
  title: '',
  amount: '',
  category: 'Food',
  type: 'expense',
  date: format(new Date(), 'yyyy-MM-dd'),
  notes: '',
  recurring: false,
}

export default function AddTransaction() {
  const { transactionId } = useParams()
  const navigate = useNavigate()
  const { transactions, addTransaction, updateTransaction } = useTransactions()
  const editingTransaction = transactions.find((transaction) => transaction.id === transactionId)
  const isEditing = Boolean(editingTransaction)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  })

  const transactionType = useWatch({ control, name: 'type' })
  const selectedCategory = useWatch({ control, name: 'category' })
  const categoryOptions = transactionType === 'income' ? incomeCategories : expenseCategories

  useEffect(() => {
    if (editingTransaction) {
      reset({
        title: editingTransaction.title,
        amount: editingTransaction.amount,
        category: editingTransaction.category,
        type: editingTransaction.type,
        date: editingTransaction.date,
        notes: editingTransaction.notes || '',
        recurring: editingTransaction.recurring,
      })
    }
  }, [editingTransaction, reset])

  useEffect(() => {
    if (selectedCategory && !categoryOptions.includes(selectedCategory)) {
      reset((currentValues) => ({
        ...currentValues,
        category: categoryOptions[0],
      }))
    }
  }, [categoryOptions, reset, selectedCategory])

  const onSubmit = async (values) => {
    if (isEditing) {
      updateTransaction(transactionId, values)
      toast.success('Transaction updated successfully.')
    } else {
      addTransaction(values)
      toast.success('Transaction added successfully.')
      reset(defaultValues)
    }

    navigate('/transactions')
  }

  if (!isEditing && transactionId) {
    return (
      <Card>
        <CardBody className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Transaction not found</h2>
          <p className="text-sm text-zinc-400">The record you tried to edit no longer exists.</p>
          <Button asChild>
            <Link to="/transactions">Back to transactions</Link>
          </Button>
        </CardBody>
      </Card>
    )
  }

  return (
    <div className="space-y-4 pb-24 lg:pb-4">
      <PageHeader
        eyebrow={isEditing ? 'Edit record' : 'New record'}
        title={isEditing ? 'Edit transaction' : 'Add transaction'}
        description="Track income and expenses with validated inputs and recurring expense tagging."
        actions={
          <Badge tone={transactionType === 'income' ? 'income' : 'expense'}>
            {transactionType === 'income' ? 'Income entry' : 'Expense entry'}
          </Badge>
        }
      />

      <Card>
        <CardBody>
          <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm text-zinc-300">Title</span>
              <Input placeholder="Salary, rent, groceries, subscription..." {...register('title')} />
              {errors.title ? <p className="text-sm text-rose-300">{errors.title.message}</p> : null}
            </label>

            <label className="space-y-2">
              <span className="text-sm text-zinc-300">Amount</span>
              <Input type="number" step="0.01" placeholder="0.00" {...register('amount')} />
              {errors.amount ? <p className="text-sm text-rose-300">{errors.amount.message}</p> : null}
            </label>

            <label className="space-y-2">
              <span className="text-sm text-zinc-300">Type</span>
              <Select {...register('type')}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </Select>
              {errors.type ? <p className="text-sm text-rose-300">{errors.type.message}</p> : null}
            </label>

            <label className="space-y-2">
              <span className="text-sm text-zinc-300">Category</span>
              <Select {...register('category')}>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
              {errors.category ? <p className="text-sm text-rose-300">{errors.category.message}</p> : null}
            </label>

            <label className="space-y-2">
              <span className="text-sm text-zinc-300">Date</span>
              <Input type="date" {...register('date')} />
              {errors.date ? <p className="text-sm text-rose-300">{errors.date.message}</p> : null}
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-sm text-zinc-300">Notes</span>
              <Textarea placeholder="Add a memo or context for this transaction" {...register('notes')} />
              {errors.notes ? <p className="text-sm text-rose-300">{errors.notes.message}</p> : null}
            </label>

            <label className="flex items-center gap-3 md:col-span-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary/20"
                {...register('recurring')}
              />
              <span className="text-sm text-zinc-300">Mark as recurring expense or income</span>
            </label>

            <div className="flex flex-wrap gap-3 md:col-span-2">
              <Button type="submit" disabled={isSubmitting}>
                {isEditing ? 'Update transaction' : 'Save transaction'}
              </Button>
              <Button variant="secondary" type="button" onClick={() => navigate('/transactions')}>
                Cancel
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}