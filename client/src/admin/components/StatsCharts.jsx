import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function StatsCharts({ stats }) {
  if (!stats) return null;

  /* 📊 Bar chart data */
  const mainData = [
    { name: "Students", value: stats.totalStudents },
    { name: "Courses", value: stats.totalCourses },
    { name: "Enrollments", value: stats.totalEnrollments },
  ];

  /* 🥧 Pie chart data */
  const storiesData = [
    { name: "Approved", value: stats.approvedStories },
    { name: "Pending", value: stats.pendingStories },
  ];

  const COLORS = ["#22c55e", "#f97316"]; // green / orange

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 📊 Bar Chart */}
      <div
        className="bg-slate-900/80 border border-slate-800
        rounded-lg p-4
        shadow-md shadow-slate-900/50
        hover:shadow-lg transition"
      >
        <h3 className="font-semibold mb-3 text-white">Platform Overview</h3>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mainData}>
              <XAxis
                dataKey="name"
                tick={{ fill: "#cbd5f5", fontSize: 12 }}
                axisLine={{ stroke: "#334155" }}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: "#cbd5f5", fontSize: 12 }}
                axisLine={{ stroke: "#334155" }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#020617",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#e5e7eb",
                }}
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
              />
              <Bar dataKey="value" fill="#60a5fa" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🥧 Pie Chart */}
      <div
        className="bg-slate-900/80 border border-slate-800
        rounded-lg p-4
        shadow-md shadow-slate-900/50
        hover:shadow-lg transition"
      >
        <h3 className="font-semibold mb-3 text-white">
          Success Stories Status
        </h3>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={storiesData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {storiesData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#020617",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#e5e7eb",
                }}
              />

              <Legend
                verticalAlign="bottom"
                wrapperStyle={{
                  color: "#cbd5f5",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
