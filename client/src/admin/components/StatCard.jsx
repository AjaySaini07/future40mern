// export default function StatCard({ title, value }) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow text-center">
//       <h3 className="text-gray-500 text-sm">{title}</h3>
//       <p className="text-3xl font-bold mt-2 text-blue-600">{value}</p>
//     </div>
//   );
// }

export default function StatCard({ title, value }) {
  return (
    <div className="bg-white border rounded-xl shadow-md p-5 hover:shadow-lg border-slate-200 hover:border-slate-400 transition ease-in duration-500">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-3xl font-bold text-blue-600 mt-2">{value ?? 0}</h3>
    </div>
  );
}
