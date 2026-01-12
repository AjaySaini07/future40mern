import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import StatsCharts from "../components/StatsCharts";
import { useAdminStats } from "../hooks/useAdminStats";
import Loader from "../components/loader/Loader";

export default function AdminDashboard() {
  const { stats, loading, fetchAdminStats } = useAdminStats();

  useEffect(() => {
    fetchAdminStats();
  }, []);

  if (loading) {
    return (
      // <div className="min-h-screen w-full flex items-center justify-center bg-slate-950">
      //   <Loader />
      // </div>
      // <div className="min-h-screen w-full flex items-center justify-center bg-black/60 backdrop-blur-md animate-fadeIn">
      //   <Loader />
      // </div>
      <div
        className="min-h-screen w-full flex items-center justify-center
      bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      >
        <Loader />
      </div>
    );
  }

  return (
    <div className="text-slate-200">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-xs text-slate-400">
          Overview of platform activity & performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value={stats?.totalStudents} />
        <StatCard title="Total Courses" value={stats?.totalCourses} />
        <StatCard title="Total Enrollments" value={stats?.totalEnrollments} />
        <StatCard title="Pending Stories" value={stats?.pendingStories} />
        <StatCard title="Approved Stories" value={stats?.approvedStories} />
        <StatCard title="New Users Today" value={stats?.newUsersToday} />
        <StatCard
          title="New Enrollments Today"
          value={stats?.newEnrollmentsToday}
        />
        <StatCard title="All Queries" value={stats?.totalQueries} />
        <StatCard title="Replied Queries" value={stats?.repliedQueries} />
        <StatCard title="Pending Queries" value={stats?.pendingQueries} />
      </div>

      {/* Charts */}
      <div className="mt-10 bg-slate-900/60 border border-slate-700 rounded-lg p-4">
        <StatsCharts stats={stats} />
      </div>
    </div>
  );
}
