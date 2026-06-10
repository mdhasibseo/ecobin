import {
  useEffect,
  useState,
} from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getStats,
} from "../../services/adminService";

const Overview = () => {
  const [stats, setStats] =
    useState(null);

  useEffect(() => {
    const loadStats =
      async () => {
        try {
          const data =
            await getStats();

          setStats(
            data.stats
          );
        } catch (error) {
          console.log(error);
        }
      };

    loadStats();
  }, []);

  if (!stats) {
    return (
      <AdminLayout>
        Loading...
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">
        Admin Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-gray-500">
            Total Users
          </h3>

          <p className="text-3xl font-bold mt-2">
            {
              stats.totalUsers
            }
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-gray-500">
            Waste Uploads
          </h3>

          <p className="text-3xl font-bold mt-2">
            {
              stats.totalWaste
            }
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-gray-500">
            Total Weight
          </h3>

          <p className="text-3xl font-bold mt-2">
            {
              stats.totalWeight
            }{" "}
            KG
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-gray-500">
            Pending Redeems
          </h3>

          <p className="text-3xl font-bold mt-2">
            {
              stats.pendingRedeems
            }
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Overview;