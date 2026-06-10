import UserLayout from "../../layouts/UserLayout";

const Profile = () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <UserLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <div className="bg-white rounded-3xl shadow-sm p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center text-4xl">
              👤
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {user?.name}
              </h2>

              <p className="text-gray-500">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-green-50 rounded-2xl p-5">
              <h3 className="text-gray-500">
                Total Points
              </h3>

              <p className="text-2xl font-bold text-green-700">
                {user?.points || 0}
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <h3 className="text-gray-500">
                Total Waste
              </h3>

              <p className="text-2xl font-bold text-green-700">
                {user?.totalWeight || 0} KG
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <h3 className="text-gray-500">
                Role
              </h3>

              <p className="text-2xl font-bold text-green-700">
                {user?.role || "user"}
              </p>
            </div>
          </div>

          <button className="mt-8 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl">
            Edit Profile
          </button>
        </div>
      </div>
    </UserLayout>
  );
};

export default Profile;