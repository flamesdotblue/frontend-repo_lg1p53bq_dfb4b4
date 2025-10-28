import { useState } from "react";
import { Plus, Globe } from "lucide-react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export default function CredentialForm({ onCreated }) {
  const [form, setForm] = useState({
    title: "",
    username: "",
    password: "",
    url: "",
    note: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.username.trim() || !form.password.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/credentials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          username: form.username.trim(),
          password: form.password,
          url: form.url.trim() || undefined,
          note: form.note.trim() || undefined,
        }),
      });
      if (!res.ok) throw new Error("Failed to save credential");
      setForm({ title: "", username: "", password: "", url: "", note: "" });
      onCreated?.();
    } catch (err) {
      console.error(err);
      alert("Could not save. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-slate-900/60 border border-white/10 p-4 rounded-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm text-slate-300">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. GitHub Account"
            className="w-full px-3 py-2 rounded-lg bg-slate-800/60 focus:bg-slate-800 text-slate-200 placeholder:text-slate-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-300">Username / Email</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-3 py-2 rounded-lg bg-slate-800/60 focus:bg-slate-800 text-slate-200 placeholder:text-slate-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm text-slate-300">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-3 py-2 rounded-lg bg-slate-800/60 focus:bg-slate-800 text-slate-200 placeholder:text-slate-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-300 flex items-center gap-2"><Globe size={16}/> URL</label>
          <input
            name="url"
            value={form.url}
            onChange={handleChange}
            placeholder="https://example.com"
            className="w-full px-3 py-2 rounded-lg bg-slate-800/60 focus:bg-slate-800 text-slate-200 placeholder:text-slate-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-sm text-slate-300">Notes</label>
        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          rows={3}
          placeholder="Any additional details..."
          className="w-full px-3 py-2 rounded-lg bg-slate-800/60 focus:bg-slate-800 text-slate-200 placeholder:text-slate-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-60 transition-colors"
        >
          <Plus size={18} /> Save
        </button>
      </div>
    </form>
  );
}
