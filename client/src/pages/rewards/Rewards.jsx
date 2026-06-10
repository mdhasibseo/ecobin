import { useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import { createRedeem } from "../../services/rewardService";

const Rewards = () => {
  const [number, setNumber] = useState("");

  const handleRedeem = async (reward) => {
    if (!number) {
      return alert("Enter mobile number");
    }

    if (!/^01[3-9]\d{8}$/.test(number)) {
      return alert("Enter valid mobile number");
    }

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (
      (user?.points || 0) < reward.points
    ) {
      return alert(
        "Not enough points"
      );
    }

    try {
      const response =
        await createRedeem({
          pointsUsed: reward.points,
          paymentMethod: "Bkash",
          accountNumber: number,
        });

      if (response.success) {
        const updatedUser = {
          ...user,
          points:
            user.points -
            reward.points,
        };

        localStorage.setItem(
          "user",
          JSON.stringify(
            updatedUser
          )
        );

        alert(
          "Redeem request submitted successfully"
        );

        window.location.reload();
      }
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data
          ?.message ||
          "Redeem failed"
      );
    }
  };

  const rewards = [
    {
      id: 1,
      title:
        "20 Tk Mobile Recharge",
      points: 100,
      type: "recharge",
      image:
        "https://picsum.photos/300/180?1",
    },
    {
      id: 2,
      title: "Bkash Cash Out",
      points: 100,
      type: "cashout",
      image:
        "https://picsum.photos/300/180?2",
    },
  ];

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            Rewards
          </h1>

          <p className="text-gray-500 mt-2">
            Redeem your points for
            exciting rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rewards.map(
            (reward) => (
              <div
                key={reward.id}
                className="bg-white rounded-3xl shadow-sm overflow-hidden"
              >
                <img
                  src={reward.image}
                  alt={
                    reward.title
                  }
                  className="w-full h-48 object-cover"
                />

                <div className="p-4 md:p-5">
                  <h3 className="text-xl font-bold">
                    {reward.title}
                  </h3>

                  <p className="text-green-600 font-semibold mt-2">
                    {
                      reward.points
                    }{" "}
                    Points
                  </p>

                  <div className="mt-4">
                    <label className="block mb-2 font-medium">
                      Mobile Number
                    </label>

                    <input
                      type="text"
                      value={
                        number
                      }
                      onChange={(
                        e
                      ) =>
                        setNumber(
                          e.target
                            .value
                        )
                      }
                      placeholder="01XXXXXXXXX"
                      className="w-full border p-3 rounded-xl"
                    />
                  </div>

                  <button
                    onClick={() =>
                      handleRedeem(
                        reward
                      )
                    }
                    className="w-full mt-4 bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl"
                  >
                    Redeem
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default Rewards;