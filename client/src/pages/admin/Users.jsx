import {
  useEffect,
  useState,
} from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getAllUsers,
} from "../../services/adminService";

const Users = () => {
  const [users, setUsers] =
    useState([]);

  useEffect(() => {
    const loadUsers =
      async () => {
        try {
          const data =
            await getAllUsers();

          setUsers(
            data.users
          );
        } catch (error) {
          console.log(error);
        }
      };

    loadUsers();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Users
        </h1>

        <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-50">
              <tr>
                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Points
                </th>

                <th className="p-4 text-left">
                  Weight
                </th>

                <th className="p-4 text-left">
                  Role
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map(
                (user) => (
                  <tr
                    key={
                      user._id
                    }
                    className="border-t"
                  >
                    <td className="p-4">
                      {user.name}
                    </td>

                    <td className="p-4">
                      {user.email}
                    </td>

                    <td className="p-4 text-green-600 font-semibold">
                      {
                        user.points
                      }
                    </td>

                    <td className="p-4">
                      {
                        user.totalWeight
                      }{" "}
                      KG
                    </td>

                    <td className="p-4">
                      {user.role}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Users;