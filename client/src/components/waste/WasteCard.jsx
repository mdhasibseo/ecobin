const WasteCard = ({
  image,
  wasteType,
  weight,
  points,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <img
        src={image}
        alt={wasteType}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-bold">
          {wasteType}
        </h3>

        <p className="text-gray-500 mt-2">
          Weight: {weight} KG
        </p>

        <p className="text-green-600 font-bold mt-2">
          +{points} Points
        </p>
      </div>
    </div>
  );
};

export default WasteCard;