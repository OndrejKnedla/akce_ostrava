import { cn } from '@/utils/cn';

interface FilterBarProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const categories = [
  { value: 'all', label: 'Vše' },
  { value: 'koncert', label: 'Koncert' },
  { value: 'festival', label: 'Festival' },
  { value: 'show', label: 'Show' },
];

export function FilterBar({ activeCategory, onCategoryChange, sortBy, onSortChange }: FilterBarProps) {
  return (
    <div className="glass sticky top-16 md:top-20 z-[6000] mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              className={cn(
                'px-4 py-2 rounded-lg font-heading text-xs uppercase tracking-wider transition-all',
                activeCategory === cat.value
                  ? 'bg-ostrava-cyan text-white shadow-[0_0_15px_rgba(0,175,210,0.3)]'
                  : 'bg-ostrava-ice text-ostrava-blue/50 hover:text-ostrava-blue'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-ostrava-ice border border-ostrava-blue/10 rounded-lg px-4 py-2 text-sm text-ostrava-blue/70 focus:border-ostrava-cyan focus:outline-none"
        >
          <option value="date">Datum</option>
          <option value="price">Cena</option>
          <option value="name">Název</option>
        </select>
      </div>
    </div>
  );
}
