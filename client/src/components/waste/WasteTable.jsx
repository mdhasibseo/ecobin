const WasteTable = ({
  wastes = [],
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-x-hidden">
      <table className="w-full">
        <thead className="bg-green-50">
          <tr>
            <th className="p-4 text-left">
              Type
            </th>

            <th className="p-4 text-left">
              Weight
            </th>

            <th className="p-4 text-left">
              Points
            </th>

            <th className="p-4 text-left">
              Date
            </th>
          </tr>
        </thead>

        <tbody>
          {wastes.map((item) => (
            <tr
              key={item._id}
              className="border-t"
            >
              <td className="p-4">
                {item.wasteType}
              </td>

              <td className="p-4">
                {item.weight} KG
              </td>

              <td className="p-4 text-green-600 font-semibold">
                {item.points}
              </td>

              <td className="p-4">
                {new Date(
                  item.createdAt
                ).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WasteTable;