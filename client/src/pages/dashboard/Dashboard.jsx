import UserLayout from "../../layouts/UserLayout";
import { useEffect, useState } from "react";
import { getDashboard } from "../../services/wasteService";
import { getLeaderboard } from "../../services/leaderboardService";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [leaders, setLeaders] =
  useState([]);

useEffect(() => {
  const loadDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data.dashboard);
    } catch (error) {
      console.log(error);
    }
  };

  loadDashboard();
  const loadLeaderboard =
  async () => {
    try {
      const data =
        await getLeaderboard();

      setLeaders(
        data.users.slice(0, 3)
      );
    } catch (error) {
      console.log(error);
    }
  };

loadLeaderboard();
}, []);
 const stats = [
  {
    title: "Total Points",
    value:
      dashboard?.totalPoints || 0,
    icon: "🌟",
  },
  {
    title: "Total Waste",
    value: `${
      dashboard?.totalWeight || 0
    } KG`,
    icon: "♻️",
  },
  {
    title: "Uploads",
    value:
      dashboard?.totalUploads || 0,
    icon: "📦",
  },
];

  if (!dashboard) {
  return (
    <UserLayout>
      <div>
        Loading...
      </div>
    </UserLayout>
  );
}

  return (
    <UserLayout>
      
      <div className="space-y-6">
        
        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Welcome back to EcoReward
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="text-4xl">
                {item.icon}
              </div>

              <h3 className="text-gray-500 mt-4">
                {item.title}
              </h3>

              <p className="text-3xl font-bold mt-2">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-5">
            Recent Activity
          </h2>

          <div className="space-y-4">
            {dashboard?.recentActivity?.map(
  (item) => (
    <div
      key={item._id}
      className="flex justify-between items-center border-b pb-3"
    >
      <div>
        <h3 className="font-semibold">
          {item.wasteType}
        </h3>

        <p className="text-sm text-gray-500">
          {item.weight} KG
        </p>
      </div>

      <span className="text-green-600 font-bold">
        +{item.points} Points
      </span>
    </div>
  )
)}
          </div>
        </div>

        {/* Leaderboard Preview */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-5">
            Top Recyclers
          </h2>

          <div className="space-y-3">
  {leaders.map(
    (user, index) => (
      <div
        key={user._id}
        className="flex justify-between"
      >
        <span>
          {index === 0
            ? "🥇"
            : index === 1
            ? "🥈"
            : "🥉"}{" "}
          {user.name}
        </span>

        <span>
          {user.points} pts
        </span>
      </div>
    )
  )}
</div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Dashboard;