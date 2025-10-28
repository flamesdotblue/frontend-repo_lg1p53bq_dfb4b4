import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title or username..."
        className="w-full pl-10 pr-3 py-2 rounded-lg bg-slate-800/60 focus:bg-slate-800 text-slate-200 placeholder:text-slate-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
      />
    </div>
  );
}
