import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getAnalytics } from "../../services/adminService";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
];

const Analytics = () => {
  const [analytics, setAnalytics] =
    useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics =
    async () => {
      try {
        const data =
          await getAnalytics();

        setAnalytics(
          data.analytics
        );
      } catch (error) {
        console.log(error);
      }
    };

  if (!analytics) {
    return (
      <AdminLayout>
        <div>Loading...</div>
      </AdminLayout>
    );
  }

  const wasteData =
    analytics.wasteTypes.map(
      (item) => ({
        name: item._id,
        value: item.count,
      })
    );

  const monthlyData =
    analytics.monthlyUploads.map(
      (item) => ({
        month: item._id.month,
        uploads:
          item.uploads,
      })
    );

  const redeemData = [
    {
      status: "Pending",
      count:
        analytics.redeems
          .pending,
    },
    {
      status: "Approved",
      count:
        analytics.redeems
          .approved,
    },
    {
      status: "Rejected",
      count:
        analytics.redeems
          .rejected,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">

        <h1 className="text-3xl font-bold">
          Analytics
        </h1>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-bold mb-4">
            Waste Types
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={wasteData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {wasteData.map(
                  (
                    entry,
                    index
                  ) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Uploads */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-bold mb-4">
            Monthly Uploads
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <LineChart
              data={
                monthlyData
              }
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="month"
              />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="uploads"
                stroke="#22c55e"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Redeems */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-bold mb-4">
            Redeem Status
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart
              data={
                redeemData
              }
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="status"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="#22c55e"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Users */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-bold mb-4">
            Top Recyclers
          </h2>

          <div className="space-y-3">
            {analytics.topUsers.map(
              (
                user,
                index
              ) => (
                <div
                  key={
                    user._id
                  }
                  className="flex justify-between border-b pb-2"
                >
                  <span>
                    #{index + 1}{" "}
                    {
                      user.name
                    }
                  </span>

                  <span className="font-bold text-green-600">
                    {
                      user.points
                    }{" "}
                    pts
                  </span>
                </div>
              )
            )}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default Analytics;