import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function AdminDashboard({ stats }) {
  const userStats = stats.userGrowth || [
    { day: "Mon", users: 5 },
    { day: "Tue", users: 12 },
    { day: "Wed", users: 20 },
  ];

  return (
    <div className="grid gap-6 p-6 md:grid-cols-2">
      <Card className="shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Site Performance</h2>
          <ul className="space-y-2">
            <li><strong>Total Users:</strong> {stats.totalUsers}</li>
            <li><strong>Active Today:</strong> {stats.activeToday}</li>
            <li><strong>Avg Session Time:</strong> {stats.avgSession} mins</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
