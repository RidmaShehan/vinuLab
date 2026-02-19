"use client";

import { useState, useEffect } from "react";
import type { ConsultationRequest } from "@/lib/consultations";

export default function ConsultationsTab() {
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<ConsultationRequest | null>(null);

  const fetchRequests = () => {
    setLoading(true);
    setError("");
    fetch("/api/consultations", { credentials: "include" })
      .then((r) => {
        if (!r.ok) throw new Error("Unauthorized");
        return r.json();
      })
      .then((data) => {
        setRequests(data);
        setError("");
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const toggleGotIt = async (id: string, gotIt: boolean) => {
    try {
      const res = await fetch(`/api/consultations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ gotIt }),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setRequests((prev) => prev.map((r) => (r.id === id ? updated : r)));
      if (selected?.id === id) {
        setSelected(updated);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
    }
  };

  const formatDate = (ts: number) => new Date(ts).toLocaleString();

  if (loading && requests.length === 0) {
    return (
      <div className="flex justify-center py-24">
        <p className="text-zinc-400">Loading consultations...</p>
      </div>
    );
  }

  if (error && requests.length === 0) {
    return (
      <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] space-y-4">
        <h3 className="font-semibold text-zinc-300">Consultation Requests</h3>
        <p className="text-zinc-400 text-sm">
          {error === "Unauthorized"
            ? "Enter the correct admin password in the header above, then click Refresh."
            : error}
        </p>
        <button
          onClick={fetchRequests}
          className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors text-sm"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Consultation Requests</h2>
        <button
          onClick={fetchRequests}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 disabled:opacity-50 text-sm"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {requests.length === 0 ? (
        <p className="text-zinc-400 py-8">No consultation requests yet.</p>
      ) : (
        <div className="space-y-2">
          {requests.map((r) => (
            <div
              key={r.id}
              onClick={() => setSelected(r)}
              className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/30 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-white truncate">{r.name}</p>
                  <p className="text-sm text-zinc-500 truncate">{r.email}</p>
                  <p className="text-sm text-zinc-400 mt-1 line-clamp-1">{r.message}</p>
                  <p className="text-xs text-zinc-600 mt-1">{formatDate(r.timestamp)}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleGotIt(r.id, !r.gotIt);
                  }}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    r.gotIt
                      ? "bg-green-500/20 text-green-400"
                      : "bg-zinc-500/20 text-zinc-400 hover:bg-zinc-500/30"
                  }`}
                >
                  {r.gotIt ? "Got it" : "Mark as got it"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start gap-4 mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{selected.name}</h3>
                <a
                  href={`mailto:${selected.email}`}
                  className="text-cyan-400 hover:underline text-sm"
                >
                  {selected.email}
                </a>
                <p className="text-xs text-zinc-500 mt-1">{formatDate(selected.timestamp)}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-sm text-zinc-400 mb-1">Message</p>
              <p className="text-white whitespace-pre-wrap">{selected.message}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  toggleGotIt(selected.id, !selected.gotIt);
                  setSelected({ ...selected, gotIt: !selected.gotIt });
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selected.gotIt
                    ? "bg-green-500/20 text-green-400"
                    : "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
                }`}
              >
                {selected.gotIt ? "Got it ✓" : "Mark as got it"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
