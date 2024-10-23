import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Sidebar from "./components/Sidebar";
import { Hero } from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Service from "./components/Service";
import { Contact } from "./components/Contact";
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import ProtectedRoute from "./admin/ProtectedRoute";
import BlogDetail from "./components/BlogDetail"; // Ensure correct path
import NotFound from "./assets/404.svg";
import Blogs from "./components/Blogs";
import verses from "../src/Quran.json";

const FadeInSection = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
      }`}
    >
      {children}
    </div>
  );
};

const noSelectStyle = {
  userSelect: "none",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
};

const Home = () => {
  // State for managing loading
  const [loading, setLoading] = useState(true);
  const [randomVerse, setRandomVerse] = useState("");

  useEffect(() => {
    // Set a random verse from the JSON file
    const randomIndex = Math.floor(Math.random() * verses.length);
    const selectedVerse = verses[randomIndex];
    setRandomVerse({
      text: selectedVerse.text,
      surah: selectedVerse.surah,
      ayah: selectedVerse.ayah,
    });
    // Simulate loading time (you can replace this with real data fetching logic)
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false once everything is ready
    }, 5000);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <div
      style={noSelectStyle}
      className="custom-cursor flex items-center max-h-screen font-outfit h-max bg-[#e5deb1] overflow-scroll"
    >
      {/* Loading Screen */}
      {loading ? (
        <div className="h-screen w-screen text-center text-gray-700 flex flex-col gap-3 items-center justify-center">
          <span className="loading loading-spinner loading-sm text-blue-800"></span>
          <p className="text-center font-semibold px-5">
            {randomVerse.text}
            <br />
            <span className="text-blue-800">
              <em>
                Qur'an - {randomVerse.surah}:{randomVerse.ayah}
              </em>
            </span>
          </p>
        </div>
      ) : (
        // Main content after loading is done
        <>
          <Sidebar />
          <div className="w-screen h-screen overflow-scroll">
            <FadeInSection>
              <Hero />
            </FadeInSection>
            <FadeInSection>
              <About />
            </FadeInSection>
            <FadeInSection>
              <Projects />
            </FadeInSection>
            <FadeInSection>
              <Service />
            </FadeInSection>
            <FadeInSection>
              <Contact />
            </FadeInSection>
          </div>
        </>
      )}
    </div>
  );
};

const Page404 = () => {
  return (
    <div className="p-6 bg-white w-screen h-screen flex flex-col gap-10 items-center justify-center">
      <p className="text-center font-bold text-black text-3xl">
        Oops! It looks like you are lost. <br />
      </p>
      <img className="h-72" src={NotFound} alt="Page not found: 404" />
      <a className="text-black border border-black rounded px-3 py-2" href="/">
        Go to Homepage
      </a>
    </div>
  );
};

const App = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js").then(
        (registration) => {
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        },
        (err) => {
          console.log("ServiceWorker registration failed: ", err);
        }
      );
    });
  }

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Page404 />} />
        <Route path="/mrxiwlev" element={<AdminLogin />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
