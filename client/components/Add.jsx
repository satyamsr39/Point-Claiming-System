import { useState } from "react";
import { useUserContext } from "../src/context/UserContext";

const Add = () => {
  const [user, setUser] = useState("");
  const { fetchUsers } = useUserContext();

  // Save new user to backend
  const save = async () => {
    if (!user.trim()) return alert("Username cannot be empty");

    const response = await fetch("https://point-claiming-system.onrender.com/Add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        UserName: user,
        Points: 0, // Default initial points
      })
    });

    if (response.ok) {
      alert("User Saved Successfully!");
      setUser(""); // Clear input field
      await fetchUsers(); // Refresh global user list via context
    } else {
      alert("Failed to save user.");
    }
  };

  const handleClick = () => {
    save();
  };

  return (
    <div className="shadow-xl h-auto md:h-64 md:w-96 w-full flex-row bg-white m-2 border border-gray-400 rounded">
      <div className="text-2xl font-bold p-2 text-gray-800">Add New User</div>
      <div className="p-4 flex-row">
        <div className="text-gray-500">Username</div>
        <input
          onChange={(e) => setUser(e.target.value)}
          type="text"
          name="username"
          value={user}
          placeholder="Enter Username"
          className="h-12 p-2 border rounded border-gray-300 w-full"
        />
      </div>
      <button
        onClick={handleClick}
        className="bg-blue-700 p-2 text-xl w-3/4 text-center border ml-8 border-gray-500 rounded-xl text-white font-bold hover:bg-blue-800"
      >
        Add User
      </button>
    </div>
  );
};

export default Add;
