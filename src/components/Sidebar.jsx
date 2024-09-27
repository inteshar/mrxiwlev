import React from "react";
import logo from "../assets/3D-logo.gif";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="flex h-screen sm:w-16 w-10 flex-col shadow-lg items-center overflow-y-auto bg-white py-8">
      <nav className="flex flex-1 flex-col items-center justify-center space-y-6">
        <a href="#hero" className="hover:custom-cursor-hover">
          <img
            src={logo}
            className="sm:h-11 h-8 drop-shadow-xl rounded-lg mb-2"
            alt=""
          />
        </a>
        <div>
          <a
            href="#about"
            className="hover:custom-cursor-hover flex flex-col items-center drop-shadow-xl rounded-lg p-1.5 text-[#7f7285] transition-colors duration-200 bg-[#e5deb1] hover:bg-[#f2eed5] border-2 border-[#e5deb1] focus:outline-none"
          >
            <img
              className="sm:w-7 w-4"
              src="https://img.icons8.com/3d-fluency/94/guest-male--v5.png"
              alt="About Me"
            />
          </a>
          <p className="font-bold text-[8px] text-center text-[#6f6b2a] mt-1">
            About
          </p>
        </div>
        <div>
          <a
            href="#projects"
            className="hover:custom-cursor-hover flex flex-col items-center drop-shadow-xl rounded-lg p-1.5 text-[#7f7285] transition-colors duration-200 bg-[#e5deb1] hover:bg-[#f2eed5] border-2 border-[#e5deb1] focus:outline-none"
          >
            <img
              className="sm:w-7 w-4"
              src="https://img.icons8.com/3d-fluency/94/briefcase--v1.png"
              alt="Projects"
            />
          </a>
          <p className="font-bold text-[8px]  text-center text-[#6f6b2a] mt-1">
            Projects
          </p>
        </div>
        <div>
          <a
            href="#services"
            className="hover:custom-cursor-hover flex flex-col items-center drop-shadow-xl rounded-lg p-1.5 text-[#7f7285] transition-colors duration-200 bg-[#e5deb1] hover:bg-[#f2eed5] border-2 border-[#e5deb1] focus:outline-none"
          >
            <img
              className="sm:w-7 w-4"
              src="https://img.icons8.com/3d-fluency/94/maintenance.png"
              alt="Services"
            />
          </a>
          <p className="font-bold text-[8px]  text-center text-[#6f6b2a] mt-1">
            Services
          </p>
        </div>
        <div>
          <Link
            to={"/blogs"}
            className="hover:custom-cursor-hover flex flex-col items-center drop-shadow-xl rounded-lg p-1.5 text-[#7f7285] transition-colors duration-200 bg-[#e5deb1] hover:bg-[#f2eed5] border-2 border-[#e5deb1] focus:outline-none"
          >
            <img
              className="sm:w-7 w-4"
              src="https://img.icons8.com/3d-fluency/94/blog.png"
              alt="Blogs"
            />
          </Link>
          <p className="font-bold text-[8px]  text-center text-[#6f6b2a] mt-1">
            Blogs
          </p>
        </div>
        <div>
          <a
            href="#contact"
            className="hover:custom-cursor-hover flex flex-col items-center drop-shadow-xl rounded-lg p-1.5 text-[#7f7285] transition-colors duration-200 bg-[#e5deb1] hover:bg-[#f2eed5] border-2 border-[#e5deb1] focus:outline-none"
          >
            <img
              className="sm:w-7 w-4"
              src="https://img.icons8.com/3d-fluency/94/address-book.png"
              alt="Contact"
            />
          </a>
          <p className="font-bold text-[8px]  text-center text-[#6f6b2a] mt-1">
            Contact
          </p>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
