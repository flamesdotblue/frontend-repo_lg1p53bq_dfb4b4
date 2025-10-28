import { useEffect, useState } from "react";
import CredentialCard from "./CredentialCard";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export default function CredentialList({ query, refreshSignal }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const url = new URL(`${API_BASE}/api/credentials`);
      if (query) url.searchParams.set("q", query);
      const res = await fetch(url.toString());
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, refreshSignal]);

  if (loading) {
    return (
      <div className="text-slate-400 text-sm">Loading your credentials...</div>
    );
  }

  if (!items.length) {
    return (
      <div className="text-slate-400 text-sm">No credentials found. Add your first one above.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((it) => (
        <CredentialCard key={it.id} item={it} />
      ))}
    </div>
  );
}
