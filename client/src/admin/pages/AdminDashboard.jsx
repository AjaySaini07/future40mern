import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import StatsCharts from "../components/StatsCharts";
import { useAdminStats } from "../hooks/useAdminStats";

export default function AdminDashboard() {
  const { stats, loading, fetchAdminStats } = useAdminStats();

  useEffect(() => {
    fetchAdminStats();
  }, []);

  if (!stats) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Overview of platform activity & performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value={stats.totalStudents} />
        <StatCard title="Total Courses" value={stats.totalCourses} />
        <StatCard title="Total Enrollments" value={stats.totalEnrollments} />
        <StatCard title="Pending Stories" value={stats.pendingStories} />
        <StatCard title="Approved Stories" value={stats.approvedStories} />
        <StatCard title="New Users Today" value={stats.newUsersToday} />
        <StatCard
          title="New Enrollments Today"
          value={stats.newEnrollmentsToday}
        />
      </div>

      {/* Charts */}
      <div className="mt-10">
        <StatsCharts stats={stats} />
      </div>
    </div>
  );
}
