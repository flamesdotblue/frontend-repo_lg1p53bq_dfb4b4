import { useState } from "react";
import { Eye, EyeOff, Copy, ExternalLink, User } from "lucide-react";

export default function CredentialCard({ item }) {
  const [show, setShow] = useState(false);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-medium leading-tight">{item.title}</h3>
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
            >
              <ExternalLink size={14} /> Visit
            </a>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-slate-300">
        <User size={16} className="text-slate-400" />
        <span className="truncate">{item.username}</span>
        <button
          onClick={() => copy(item.username)}
          className="ml-auto text-slate-400 hover:text-slate-200"
          title="Copy username"
        >
          <Copy size={16} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <input
          type={show ? "text" : "password"}
          readOnly
          value={item.password}
          className="w-full px-3 py-2 rounded-lg bg-slate-800/60 text-slate-200 border border-white/10"
        />
        <button
          onClick={() => setShow((s) => !s)}
          className="p-2 rounded-lg bg-slate-800/60 border border-white/10 text-slate-300 hover:text-white"
          title={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        <button
          onClick={() => copy(item.password)}
          className="p-2 rounded-lg bg-slate-800/60 border border-white/10 text-slate-300 hover:text-white"
          title="Copy password"
        >
          <Copy size={18} />
        </button>
      </div>

      {item.note ? (
        <p className="text-sm text-slate-400 whitespace-pre-wrap">{item.note}</p>
      ) : null}

      <div className="text-xs text-slate-500">
        {item.created_at ? new Date(item.created_at).toLocaleString() : ""}
      </div>
    </div>
  );
}
