export default function StatCard({ title, value }) {
  return (
    <div
      className="
        bg-slate-900/90
        border border-slate-700
        rounded-lg
        p-5
         hover:-translate-y-0.5
        shadow-md shadow-slate-900/50
        hover:shadow-lg hover:shadow-slate-900/70
        hover:border-slate-500
        transition-all duration-500
      "
    >
      <p className="text-sm text-slate-400 font-semibold">{title}</p>

      <h3 className="text-3xl font-bold text-blue-500 mt-2">{value ?? 0}</h3>
    </div>
  );
}
