import AdminSidebar from "../components/sidebar/AdminSidebar";
import Navbar from "../components/navbar/Navbar";

const AdminLayout = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6 pb-24">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;