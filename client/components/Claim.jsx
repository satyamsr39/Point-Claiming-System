import { useState, useEffect } from "react";
import { useUserContext } from "../src/context/UserContext";

const Claim = () => {
  const { users, fetchUsers } = useUserContext(); // Access users and fetchUsers from context
  const [selectedUserId, setSelectedUserId] = useState("");

  // Optional: Set the first user as default selection on load
  useEffect(() => {
    if (users.length === 1) {
      setSelectedUserId(users[0]._id);
    }
  }, [users]);

  // Handles the claim button click
  const handleClaim = async () => {
    if (!selectedUserId) return alert("Please select a user");

    // Generate random points between 1 and 10
    const randomPoints = Math.floor(Math.random() * 10 + 1);

    try {
      // Send a PATCH request to update points for selected user
      const response = await fetch(`https://point-claiming-system.onrender.com/claim/${selectedUserId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ points: randomPoints }),
      });

      if (response.ok) {
        alert(`Successfully claimed ${randomPoints} points!`);
        await fetchUsers(); // Refresh leaderboard data
      } else {
        alert("Failed to claim points.");
      }
    } catch (error) {
      console.error("Error claiming points:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="shadow-xl w-full h-auto md:h-82 md:w-96 border border-gray-400 rounded m-2 bg-white">
      <div className="font-bold text-2xl text-gray-800 p-4">Claim Points</div>

      <div className="p-4">
        <div className="text-gray-500 mb-2">Select User</div>
        <select
          className="w-full border-2 border-gray-500 mb-4 p-2 rounded"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)} // Update selected user
        >
          {/* Populate dropdown with users */}
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.UserName} ({user.Points})
            </option>
          ))}
        </select>

        <button
          onClick={handleClaim}
          className="bg-blue-700 md:mt-8 p-2 text-xl w-full text-center border border-gray-500 rounded-xl text-white font-bold hover:bg-blue-800"
        >
          Claim Random Points
        </button>
      </div>
    </div>
  );
};

export default Claim;
