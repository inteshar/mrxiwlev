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
      arabic: selectedVerse.arabic,
    });
    // Simulate loading time (you can replace this with real data fetching logic)
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false once everything is ready
    }, 6000);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <div
      style={noSelectStyle}
      className="custom-cursor flex items-center max-h-screen font-outfit h-max bg-[#e5deb1] overflow-scroll"
    >
      {loading ? (
        <div className="h-screen w-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-sky-50 via-white to-blue-100 flex flex-col gap-6 items-center justify-center p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-100 rounded-full filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />

          <div className="max-w-3xl w-full rounded-2xl bg-white/70 backdrop-blur-md shadow-2xl p-12 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

            {/* <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-blue-200 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-blue-200 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-l-4 border-b-4 border-blue-200 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-blue-200 rounded-br-2xl" /> */}

            <div className="relative flex justify-center items-center mb-8">
              <div className="absolute w-12 h-12 rounded-full border-2 border-blue-100 animate-ping" />
              <div className="absolute w-12 h-12 rounded-full border-2 border-blue-200 animate-pulse" />
              <span className="loading loading-spinner loading-md text-blue-800 relative z-10" />
            </div>

            <div className="mt-8 space-y-8">
              <p className="text-center font-semibold text-sm sm:text-2xl text-gray-700 leading-relaxed px-5 font-serif">
                {randomVerse.text}
              </p>
              <p className="text-center font-semibold text-sm sm:text-2xl text-gray-700 leading-relaxed px-5 font-serif">
                ﴾ {randomVerse.arabic} ﴿
              </p>

              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center gap-4 w-full">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
                  <span className="text-blue-800 font-medium text-lg">
                    <em>
                      Qur'an - {randomVerse.surah}:{randomVerse.ayah}
                    </em>
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,transparent,rgba(0,0,0,0.03))]" />
        </div>
      ) : (
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
