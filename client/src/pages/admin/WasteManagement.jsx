import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import { getAllWaste } from "../../services/adminService";

const WasteManagement = () => {
  const [wastes, setWastes] = useState([]);

  useEffect(() => {
    const loadWaste = async () => {
      try {
        const data = await getAllWaste();

        setWastes(data.wastes);
      } catch (error) {
        console.log(error);
      }
    };

    loadWaste();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Waste Management</h1>

        <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-50">
              <tr>
                <th className="p-4">Image</th>

                <th className="p-4">User</th>

                <th className="p-4">Type</th>

                <th className="p-4">Weight</th>

                <th className="p-4">Points</th>
              </tr>
            </thead>

            <tbody>
              {wastes.map((waste) => (
                <tr key={waste._id} className="border-t">
                  <td className="p-4">
                    <img
                       src={`https://ecobin-api-ers9.onrender.com${waste.image}`}
                      alt=""
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>

                  <td className="p-4">{waste.user?.name}</td>

                  <td className="p-4">{waste.wasteType}</td>

                  <td className="p-4">{waste.weight} KG</td>

                  <td className="p-4 text-green-600">{waste.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default WasteManagement;
