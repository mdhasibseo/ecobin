import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const links = [
    {
      name: "Overview",
      path: "/admin",
      icon: "📊",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "👥",
    },
    {
      name: "Waste Management",
      path: "/admin/waste",
      icon: "♻️",
    },
    {
      name: "Redeem Requests",
      path: "/admin/redeems",
      icon: "💰",
    },
    {
      name: "Analytics",
      path: "/admin/analytics",
      icon: "📈",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-slate-900 text-white min-h-screen p-6 flex-col">
        <h2 className="text-2xl font-bold mb-8">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800"
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-700 text-left"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="grid grid-cols-5">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex flex-col items-center justify-center py-3 text-xs"
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;