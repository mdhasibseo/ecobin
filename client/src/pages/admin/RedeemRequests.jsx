import {
  useEffect,
  useState,
} from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getAllRedeems,
  approveRedeem,
  rejectRedeem,
} from "../../services/adminService";

const RedeemRequests = () => {
  const [redeems, setRedeems] =
    useState([]);

  const loadRedeems =
    async () => {
      try {
        const data =
          await getAllRedeems();

        setRedeems(
          data.redeems
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    loadRedeems();
  }, []);

  const handleApprove =
    async (id) => {
      try {
        await approveRedeem(id);

        alert(
          "Redeem Approved"
        );

        loadRedeems();
      } catch (error) {
        console.log(error);
      }
    };

  const handleReject =
    async (id) => {
      try {
        await rejectRedeem(id);

        alert(
          "Redeem Rejected"
        );

        loadRedeems();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Redeem Requests
        </h1>

        <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-50">
              <tr>
                <th className="p-4 text-left">
                  User
                </th>

                <th className="p-4 text-left">
                  Method
                </th>

                <th className="p-4 text-left">
                  Number
                </th>

                <th className="p-4 text-left">
                  Points
                </th>

                <th className="p-4 text-left">
                  Amount
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {redeems.map(
                (redeem) => (
                  <tr
                    key={
                      redeem._id
                    }
                    className="border-t"
                  >
                    <td className="p-4">
                      {
                        redeem.user
                          ?.name
                      }
                    </td>

                    <td className="p-4">
                      {
                        redeem.paymentMethod
                      }
                    </td>

                    <td className="p-4">
                      {
                        redeem.accountNumber
                      }
                    </td>

                    <td className="p-4">
                      {
                        redeem.pointsUsed
                      }
                    </td>

                    <td className="p-4">
                      ৳
                      {
                        redeem.amount
                      }
                    </td>

                    <td className="p-4">
                      {redeem.status}
                    </td>

                    <td className="p-4 flex gap-2">
                      {redeem.status ===
                        "Pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleApprove(
                                redeem._id
                              )
                            }
                            className="bg-green-600 text-white px-4 py-2 rounded-lg"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              handleReject(
                                redeem._id
                              )
                            }
                            className="bg-red-600 text-white px-4 py-2 rounded-lg"
                          >
                            Reject
                          </button>
                        </>
                      )}
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

export default RedeemRequests;