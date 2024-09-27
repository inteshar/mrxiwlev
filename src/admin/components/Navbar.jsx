import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase sign out
      console.log("User logged out successfully.");
      // Optionally redirect the user to the login page or another page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <>
      <ul className="flex items-center menu menu-horizontal bg-gray-200 rounded-box py-1">
        <li className="hover:bg-gray-300 rounded">
          <Link to="/dashboard" className="text-blue-500 hover:underline">
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/plumpy/50/communication.png"
              alt="contacts"
            />
          </Link>
        </li>
        <li className="hover:bg-gray-300 rounded">
          <Link to="/dashboard/blog" className="text-blue-500 hover:underline">
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/plumpy/50/create.png"
              alt="Blog"
            />
          </Link>
        </li>
        <div className="border border-red-600 rounded mx-1 h-5"></div>
        <li className="hover:bg-red-300 rounded">
          <button onClick={handleLogout}>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/plumpy/50/imac-exit-1.png"
              alt="imac-exit-1"
            />
          </button>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
