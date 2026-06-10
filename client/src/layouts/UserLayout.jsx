import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

const UserLayout = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default UserLayout;