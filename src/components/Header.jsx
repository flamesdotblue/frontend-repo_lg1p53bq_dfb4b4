import { Lock } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full py-6 border-b border-white/10 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400">
          <Lock size={22} />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Secure Credential Notes
          </h1>
          <p className="text-slate-400 text-sm">
            Save usernames, passwords, and related notes in one tidy place.
          </p>
        </div>
      </div>
    </header>
  );
}
