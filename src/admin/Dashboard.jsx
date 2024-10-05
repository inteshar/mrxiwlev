import React from "react";
import Contacts from "./DisplayContacts";
import Navbar from "./components/Navbar";
import Blog from "./Blog";
import { Routes, Route, Link } from "react-router-dom";
import Profile from "./Profile";
import NotFound from "../assets/404.svg";

const Page404 = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-6 w-[50vw] h-auto flex flex-col gap-10 items-center justify-center">
        <p className="text-black text-center font-bold text-3xl">
          Oops! It looks like you are lost. <br />
        </p>
        <img className="h-72" src={NotFound} alt="Page not found: 404" />
        <Link
          className="text-black border border-black rounded px-3 py-2"
          to="/dashboard"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <>
      <div className="w-full flex flex-col items-top items-center justify-evenly gap-4 sm:p-6 p-4">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/*" element={<Page404 />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default Dashboard;
