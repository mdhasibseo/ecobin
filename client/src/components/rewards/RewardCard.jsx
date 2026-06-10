const RewardCard = ({
  reward,
  onRedeem,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="h-48 bg-green-100 flex items-center justify-center text-6xl">
        🎁
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold">
          {reward.name}
        </h3>

        <p className="text-green-700 font-semibold mt-2">
          {reward.points} Points
        </p>

        <button
          onClick={() =>
            onRedeem(reward)
          }
          className="mt-4 w-full bg-green-700 text-white py-3 rounded-xl"
        >
          Redeem
        </button>
      </div>
    </div>
  );
};

export default RewardCard;