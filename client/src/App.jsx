import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import UploadWaste from "./pages/waste/UploadWaste";
import ProtectedRoute from "./routes/ProtectedRoute";
import History from "./pages/waste/History";
import Rewards from "./pages/rewards/Rewards";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import Profile from "./pages/profile/Profile";

import Overview from "./pages/admin/Overview";
import Users from "./pages/admin/Users";
import WasteManagement from "./pages/admin/WasteManagement";
import RedeemRequests from "./pages/admin/RedeemRequests";
import AdminRoute from "./routes/AdminRoute";
import RedeemHistory from "./pages/user/RedeemHistory";
import Analytics from "./pages/admin/Analytics";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Overview />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <Users />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/waste"
        element={
          <AdminRoute>
            <WasteManagement />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/redeems"
        element={
          <AdminRoute>
            <RedeemRequests />
          </AdminRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadWaste />
          </ProtectedRoute>
        }
      />
      <Route
        path="/rewards"
        element={
          <ProtectedRoute>
            <Rewards />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/admin/analytics" element={<Analytics />} />
      <Route path="/redeem-history" element={<RedeemHistory />} />
    </Routes>
  );
}

export default App;
