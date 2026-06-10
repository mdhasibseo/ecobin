const RecentActivity = ({
  activities = [],
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-xl font-bold mb-4">
        Recent Activity
      </h3>

      {activities.length === 0 ? (
        <p className="text-gray-500">
          No recent activity
        </p>
      ) : (
        activities.map((item) => (
          <div
            key={item._id}
            className="border-b py-3"
          >
            <p>
              {item.wasteType}
            </p>

            <p className="text-sm text-gray-500">
              {item.weight} KG
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecentActivity;