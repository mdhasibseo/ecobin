import UserLayout from "../../layouts/UserLayout";
import { useEffect, useState } from "react";
import { getLeaderboard } from "../../services/leaderboardService";

const Leaderboard = () => {
  const [users, setUsers] =
    useState([]);

  useEffect(() => {
    const loadLeaderboard =
      async () => {
        try {
          const data =
            await getLeaderboard();

          setUsers(
            data.users
          );
        } catch (error) {
          console.log(error);
        }
      };

    loadLeaderboard();
  }, []);

  return (
    <UserLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Leaderboard
        </h1>

        <div className="bg-white rounded-3xl shadow-sm p-4 md:p-6">
          {users.map(
            (
              user,
              index
            ) => (
              <div
                key={
                  user._id
                }
                className="flex justify-between items-center border-b py-4"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : "🏅"}
                  </span>

                  <span className="font-semibold">
                    {user.name}
                  </span>
                </div>

                <span className="font-bold text-green-600">
                  {user.points} pts
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default Leaderboard;