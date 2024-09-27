import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase"; // Ensure the correct path to firebase config
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false once we know the auth state
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  if (loading) {
    return (
      <div className="text-white w-screen h-screen flex justify-center items-center">
        Loading...
      </div>
    ); // You can show a loader here while the auth state is being checked
  }

  return user ? children : <Navigate to="/mrxiwlev" />; // If user exists, render children, else redirect
};

export default ProtectedRoute;
