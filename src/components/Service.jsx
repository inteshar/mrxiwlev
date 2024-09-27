import React from "react";
import fullstack from "../assets/development.gif";
import ui from "../assets/ui.gif";
import mobile from "../assets/mobile.gif";
import wordpress from "../assets/wordpress.gif";

const Service = () => {
  return (
    <>
      <div
        id="services"
        className="w-full min-h-screen bg-[#e5deb1] flex flex-col items-top items-center justify-evenly gap-10 sm:p-6 p-4"
      >
        <p className="text-3xl font-bold text-gray-900 text-center">
          What can I do for you?
        </p>
        <span className="mx-auto max-w-4xl text-center text-base text-gray-600 sm:text-xl text-md">
          I provide services to bring your digital projects to life, from
          dynamic web apps and user-friendly interfaces to robust WordPress
          sites and high-performing mobile apps.
        </span>
        <div className="mx-auto max-w-7xl px-2 lg:px-8">
          <div className="grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
            <div className="bg-[#f9f7ec] p-6 rounded-lg drop-shadow-xl hover:scale-105 duration-500">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                <img width="50" height="50" src={fullstack} alt="code" />
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">
                Full Stack Development
              </h3>
              <p className="mt-4 text-sm text-gray-600">
                Crafting dynamic and scalable web applications using both
                front-end and back-end technologies for a seamless user
                experience.
              </p>
            </div>
            <div className="bg-[#f9f7ec] p-6 rounded-lg drop-shadow-xl hover:scale-105 duration-500">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
                <img
                  width="50"
                  height="50"
                  src={ui}
                  alt="web"
                  className="rounded-full"
                />
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">
                UI/UX Design
              </h3>
              <p className="mt-4 text-sm text-gray-600">
                Designing intuitive, user-friendly interfaces that ensure a
                visually appealing and effortless interaction with digital
                products.
              </p>
            </div>
            <div className="bg-[#f9f7ec] p-6 rounded-lg drop-shadow-xl hover:scale-105 duration-500">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <img
                  width="50"
                  height="50"
                  src={wordpress}
                  alt="wordpress"
                  className="rounded-full"
                />
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">
                Wordpress Development
              </h3>
              <p className="mt-4 text-sm text-gray-600">
                Building responsive and customizable websites using WordPress,
                offering flexibility and ease of content management.
              </p>
            </div>
            <div className="bg-[#f9f7ec] p-6 rounded-lg drop-shadow-xl hover:scale-105 duration-500">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                <img
                  width="50"
                  height="50"
                  src={mobile}
                  alt="external-mobile-development-ui-mobile-prettycons-flat-prettycons"
                  className="rounded-full"
                />
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">
                Mobile App Development
              </h3>
              <p className="mt-4 text-sm text-gray-600">
                Developing cross-platform mobile applications that provide
                engaging user experiences with smooth performance and
                functionality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
