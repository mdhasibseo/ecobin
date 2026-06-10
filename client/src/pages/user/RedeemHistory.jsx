import {
  useEffect,
  useState,
} from "react";

import UserLayout from "../../layouts/UserLayout";

import {
  getRedeemHistory,
} from "../../services/rewardService";

const RedeemHistory = () => {
  const [history, setHistory] =
    useState([]);

  useEffect(() => {
    const loadHistory =
      async () => {
        try {
          const data =
            await getRedeemHistory();

          setHistory(
            data.history
          );
        } catch (error) {
          console.log(error);
        }
      };

    loadHistory();
  }, []);

  return (
    <UserLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Redeem History
        </h1>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-50">
              <tr>
                <th className="p-4 text-left">
                  Points
                </th>

                <th className="p-4 text-left">
                  Number
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {history.map(
                (item) => (
                  <tr
                    key={
                      item._id
                    }
                    className="border-t"
                  >
                    <td className="p-4">
                      {
                        item.pointsUsed
                      }
                    </td>

                    <td className="p-4">
                      {
                        item.accountNumber
                      }
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          item.status ===
                          "Approved"
                            ? "bg-green-100 text-green-700"
                            : item.status ===
                              "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {
                          item.status
                        }
                      </span>
                    </td>

                    <td className="p-4">
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </UserLayout>
  );
};

export default RedeemHistory;