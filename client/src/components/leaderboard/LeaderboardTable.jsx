const LeaderboardTable = ({
  users = [],
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-green-50">
          <tr>
            <th className="p-4 text-left">
              Rank
            </th>

            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Points
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map(
            (user, index) => (
              <tr
                key={user._id || index}
                className="border-t"
              >
                <td className="p-4">
                  #{index + 1}
                </td>

                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4 font-bold text-green-700">
                  {user.points}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;