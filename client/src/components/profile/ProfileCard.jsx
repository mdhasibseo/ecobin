const ProfileCard = ({
  user,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-3xl">
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
    </div>
  );
};

export default ProfileCard;