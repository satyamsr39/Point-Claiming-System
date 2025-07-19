import { useUserContext } from "../src/context/UserContext";

const Leaderboard = () => {
    // Access users from global context
    const { users } = useUserContext();

    // Sort users by points in descending order and take top 10
    const sortedUsers = [...users]
        .sort((a, b) => b.Points - a.Points)
        .slice(0, 10);

    // Return medal emoji for top 3, otherwise return rank number
    const getMedal = (index) => {
        const medals = ["🥇", "🥈", "🥉"];
        return medals[index] || `${index + 1}`;
    };

    return (
        <div className="border border-gray-300 rounded bg-white shadow-xl w-full max-w-3xl mx-auto mt-6">
            <div className="text-gray-800 text-3xl font-extrabold p-4 text-center border-b border-gray-300 bg-blue-50 rounded-t">
                🏆 Live Leaderboard
            </div>

            <div className="divide-y divide-gray-200">
                {/* Display sorted user list with ranks */}
                {sortedUsers.map((user, idx) => (
                    <div
                        key={user._id}
                        className={`flex justify-between items-center p-4 transition-all ${
                            idx === 0
                                ? "bg-yellow-100 font-semibold" // Highlight top user
                                : "hover:bg-gray-100"
                        }`}
                    >
                        <div className="flex items-center space-x-4 text-lg">
                            <span className="w-8 text-center">{getMedal(idx)}</span>
                            <span>{user.UserName}</span>
                        </div>
                        <div className="text-blue-800 font-bold text-lg">{user.Points} pts</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;
