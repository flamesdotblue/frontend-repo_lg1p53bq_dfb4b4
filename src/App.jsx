import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CredentialForm from "./components/CredentialForm";
import CredentialList from "./components/CredentialList";

function App() {
  const [query, setQuery] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-white">Add a new credential</h2>
          <CredentialForm onCreated={() => setRefreshKey((k) => k + 1)} />
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-medium text-white">Your saved accounts</h2>
            <div className="flex-1 max-w-sm">
              <SearchBar value={query} onChange={setQuery} />
            </div>
          </div>
          <CredentialList query={query} refreshSignal={refreshKey} />
        </section>
      </main>

      <footer className="py-8 text-center text-xs text-slate-500">
        Built for safely organizing your credentials as notes.
      </footer>
    </div>
  );
}

export default App;
