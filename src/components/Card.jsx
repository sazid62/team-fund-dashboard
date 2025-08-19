export default function Card({ title, children, className = "" }) {
  return (
    <div className={`card ${className}`}>
      {title && (
        <h3 className="text-slate-400 text-sm font-semibold mb-2">{title}</h3>
      )}
      {children}
    </div>
  );
}
