import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <header className="bg-white shadow-sm px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-700">
          EcoReward
        </h1>

        <div className="flex items-center gap-4">
          <Link
            to="/profile"
            className="flex items-center gap-3"
          >
            <span className="font-medium">
              {user?.name || "User"}
            </span>

            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              👤
            </div>
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;