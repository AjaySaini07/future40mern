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

  // Bar chart data
  const mainData = [
    { name: "Students", value: stats.totalStudents },
    { name: "Courses", value: stats.totalCourses },
    { name: "Enrollments", value: stats.totalEnrollments },
  ];

  // Pie chart data
  const storiesData = [
    { name: "Approved", value: stats.approvedStories },
    { name: "Pending", value: stats.pendingStories },
  ];

  const COLORS = ["#22c55e", "#f97316"]; // green, orange

  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Bar Chart */}
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg p-4 border border-slate-300">
        <h3 className="font-semibold mb-3">Platform Overview</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mainData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg p-4 border border-slate-300">
        <h3 className="font-semibold mb-3">Success Stories Status</h3>
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
                label
              >
                {storiesData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
