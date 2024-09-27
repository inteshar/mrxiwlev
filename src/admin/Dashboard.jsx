import React from "react";
import Contacts from "./DisplayContacts";
import Navbar from "./components/Navbar";
import Blog from "./Blog";
import { Routes, Route, Link } from "react-router-dom"; // Import Link

const Dashboard = () => {
  return (
    <>
      <div className="w-full flex flex-col items-top items-center justify-evenly gap-4 sm:p-6 p-4">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </>
  );
};

export default Dashboard;
