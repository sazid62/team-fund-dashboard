export default function ProgressBar({ value = 0 }) {
  return (
    <div className="h-2 bg-slate-950 border border-slate-800 rounded-full overflow-hidden mt-2">
      <span
        className="block h-full"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          background: "linear-gradient(90deg, #22c55e, #60a5fa)",
        }}
      />
    </div>
  );
}
