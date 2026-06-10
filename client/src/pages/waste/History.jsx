import UserLayout from "../../layouts/UserLayout";
import { useEffect, useState } from "react";
import { getWasteHistory } from "../../services/wasteService";

const History = () => {
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getWasteHistory();

        setHistory(data.wastes || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <UserLayout>
        <div className="text-center py-10">Loading...</div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Waste History</h1>

          <p className="text-gray-500 mt-2">
            Track all your recycling activities.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-50">
                <tr>
                  <th className="p-4 text-left">Image</th>

                  <th className="p-4 text-left">Type</th>

                  <th className="p-4 text-left">Weight</th>

                  <th className="p-4 text-left">Points</th>

                  <th className="p-4 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {history.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-8 text-gray-500">
                      No waste uploaded yet
                    </td>
                  </tr>
                ) : (
                  history.map((item) => (
                    <tr key={item._id} className="border-t hover:bg-gray-50">
                      <td className="p-4">
                        <img
                          src={`http://localhost:5000${item.image}`}
                          alt=""
                          className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover"
                        />
                      </td>

                      <td className="p-4 font-medium">{item.wasteType}</td>

                      <td className="p-4">{item.weight} KG</td>

                      <td className="p-4 text-green-600 font-semibold">
                        +{item.points}
                      </td>

                      <td className="p-4">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default History;
