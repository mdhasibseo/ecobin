import { Link } from "react-router-dom";

const Sidebar = () => {
  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "📊",
    },
    {
      name: "Upload Waste",
      path: "/upload",
      icon: "♻️",
    },
    {
      name: "History",
      path: "/history",
      icon: "📜",
    },
    {
      name: "Rewards",
      path: "/rewards",
      icon: "🎁",
    },
    {
      name: "Leaderboard",
      path: "/leaderboard",
      icon: "🏆",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "👤",
    },
    {
      name: "Redeems",
      path: "/redeem-history",
      icon: "💸",
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-green-700 text-white min-h-screen p-6 flex-col">
        <h2 className="text-2xl font-bold mb-8">EcoReward</h2>

        <nav className="flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-800 transition"
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="grid grid-cols-5">
          {links.slice(0, 5).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex flex-col items-center justify-center py-3 text-xs"
            >
              <span className="text-lg">{link.icon}</span>

              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
