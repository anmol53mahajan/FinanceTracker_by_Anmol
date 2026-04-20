import { FiSearch } from 'react-icons/fi'
import Input from './ui/input.jsx'
import Select from './ui/select.jsx'
import Button from './ui/button.jsx'

export default function FiltersBar({
  search,
  setSearch,
  category,
  setCategory,
  type,
  setType,
  sortKey,
  setSortKey,
  sortDirection,
  setSortDirection,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  categories,
  onReset,
}) {
  return (
    <div className="glass-panel rounded-2xl p-4">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
        <div className="relative xl:col-span-2">
          <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <Input
            className="pl-11"
            placeholder="Search title or notes"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <Select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="all">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <Select value={type} onChange={(event) => setType(event.target.value)}>
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </Select>
        <Select value={sortKey} onChange={(event) => setSortKey(event.target.value)}>
          <option value="date">Sort by date</option>
          <option value="amount">Sort by amount</option>
          <option value="category">Sort by category</option>
        </Select>
        <Select value={sortDirection} onChange={(event) => setSortDirection(event.target.value)}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </Select>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
        <Input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
        <Input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
        <Button variant="ghost" onClick={onReset}>
          Reset filters
        </Button>
      </div>
    </div>
  )
}