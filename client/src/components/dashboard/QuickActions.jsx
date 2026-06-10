import { Link } from "react-router-dom";

const QuickActions = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-xl font-bold mb-4">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/upload"
          className="bg-green-700 text-white p-4 rounded-xl text-center"
        >
          Upload Waste
        </Link>

        <Link
          to="/rewards"
          className="bg-blue-600 text-white p-4 rounded-xl text-center"
        >
          Rewards
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;