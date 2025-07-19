import { useState } from "react";

const Navbar = () => {
  // State to store recent claim data
  const [recentClaims, setRecentClaims] = useState([]);
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Fetch recent claims from the backend
  const handleRecentClaims = async () => {
    try {
      const response = await fetch("https://point-claiming-system.onrender.com/recent-claims");
      const data = await response.json();
      setRecentClaims(data);     // Update state with recent claims
      setShowModal(true);        // Show the modal
    } catch (error) {
      console.error("Failed to fetch recent claims", error);
      alert("Error fetching recent claims.");
    }
  };

  // Close the modal
  const closeModal = () => setShowModal(false);

  return (
    <>
      {/* Top navigation bar */}
      <div className="shadow-xl p-4 mb-2 bg-white flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img
            src="trophy.svg"
            alt="trophy"
            className="h-12 w-12 text-gray-900 bg-blue-700 rounded-lg p-1"
          />
          <div>
            <div className="text-3xl logo flex gap-1">Point Claiming System</div>
            <div className="font-serif text-sm text-gray-600">
              Real-Time User Rankings and Point Management
            </div>
          </div>
        </div>

        {/* Button to trigger recent claims fetch */}
        <button
          onClick={handleRecentClaims}
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg shadow"
        >
          View Recent Claims
        </button>
      </div>

      {/* Modal to display recent claims */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Claims</h2>

            {/* Show message if no claims exist */}
            {recentClaims.length === 0 ? (
              <div className="text-gray-500">No recent claims</div>
            ) : (
              <ul className="space-y-2 max-h-64 overflow-y-auto">
                {/* List each claim */}
                {recentClaims.map((claim, idx) => (
                  <li key={claim._id} className="flex justify-between items-center border-b pb-1">
                    <span>
                      {idx + 1}. {claim.UserName}
                    </span>
                    <div className="text-sm text-gray-600 text-right">
                      <div>{claim.Points} pts</div>
                      <div className="text-xs">
                        {new Date(claim.lastClaimedAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Close modal button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
