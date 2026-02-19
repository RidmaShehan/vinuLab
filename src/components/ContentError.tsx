"use client";

type ContentErrorProps = {
  message: string;
  onRetry: () => void;
};

export default function ContentError({ message, onRetry }: ContentErrorProps) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-[var(--page-bg)]">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-[var(--page-text)] mb-2">Content unavailable</h1>
        <p className="text-zinc-400 text-sm mb-8">{message}</p>
        <button
          type="button"
          onClick={onRetry}
          className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
