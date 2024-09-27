import React from "react";
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
  return (
    <div
      style={noSelectStyle}
      className="custom-cursor flex items-center max-h-screen font-outfit h-max bg-[#e5deb1] overflow-scroll"
    >
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
        <Route path="/blogs" element={<Blogs  />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
