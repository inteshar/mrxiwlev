import React from "react";
import p11 from "../assets/p11.png";
import p12 from "../assets/p11.gif";
import p21 from "../assets/p21.png";
import p22 from "../assets/p22.gif";

const Projects = () => {
  return (
    <>
      <div
        id="projects"
        className="pt-20 w-full min-h-screen bg-[#e5deb1] flex flex-col items-top items-center justify-evenly gap-10 sm:p-6 p-4"
      >
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Check Out My Works
        </h1>
        <span className="mx-auto max-w-4xl text-center text-base text-gray-600 text-md sm:text-xl">
          Explore some of the projects I've had the pleasure to work on.
        </span>

        <div className="mx-auto max-w-7xl px-2 lg:px-8 text-gray-900">
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            <li>
              <div className="timeline-middle hidden sm:block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-[#6f6b2a]"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="w-full timeline-start flex flex-col sm:items-end mb-10 md:text-end border border-[#6f6b2a] rounded-lg p-4 bg-[#f9f7ec] drop-shadow-lg">
                <div className="relative w-full h-full">
                  <img
                    src={p11}
                    className="shadow-sm border border-[#6f6b2a] rounded-lg mb-2"
                    alt=""
                  />
                  <div className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="w-full h-full flex overflow-x-auto snap-x">
                      <img
                        src={p12}
                        className="object-cover snap-center shadow-sm border border-[#6f6b2a] rounded-lg mb-2"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <time className="font-mono italic text-sm">2024</time>
                <div className="sm:text-2xl text-md text-[#6f6b2a] font-bold">
                  Banking Management System
                </div>
                <ul className="flex gap-2 sm:text-sm text-[8px] mt-2">
                  <li className="bg-[#e0dbbb] sm:px-4 sm:py-1 w-max px-2 py-1 font-semibold rounded-lg text-gray-600 shadow-sm">
                    PHP
                  </li>
                  <li className="bg-[#e0dbbb] sm:px-4 sm:py-1 w-max px-2 py-1 font-semibold rounded-lg text-gray-600 shadow-sm">
                    HTML5
                  </li>
                  <li className="bg-[#e0dbbb] sm:px-4 sm:py-1 w-max px-2 py-1 font-semibold rounded-lg text-gray-600 shadow-sm">
                    CSS
                  </li>
                  <li className="bg-[#e0dbbb] sm:px-4 sm:py-1 w-max px-2 py-1 font-semibold rounded-lg text-gray-600 shadow-sm">
                    Bootstrap 5
                  </li>
                  <li className="bg-[#e0dbbb] sm:px-4 sm:py-1 w-max px-2 py-1 font-semibold rounded-lg text-gray-600 shadow-sm">
                    MySQL
                  </li>
                </ul>
                <div>
                  <ul className="flex gap-2 mt-2">
                    <li>
                      <a
                        href="https://github.com/inteshar/dev-of-group-project"
                        className="hover:custom-cursor-hover"
                        target="_blank"
                      >
                        <img
                          width="24"
                          height="24"
                          src="https://img.icons8.com/3d-fluency/94/github.png"
                          alt="github"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://owncd.infinityfreeapp.com/?i=1"
                        className="hover:custom-cursor-hover"
                        target="_blank"
                      >
                        <img
                          width="24"
                          height="24"
                          src="https://img.icons8.com/3d-fluency/94/link.png"
                          alt="github"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
                <details className="mt-2">
                  <summary className="hover:custom-cursor-hover font-bold text-[#6f6b2a] sm:text-sm text-xs">
                    Show more
                  </summary>
                  <p className="text-justify">
                    This web app was developed as per the need and demand of one
                    of our clients from India. The "Development of Group,"
                    offers flexible loan options to help individuals and
                    businesses achieve their financial goals. It provides a
                    range of financing solutions tailored to various needs, such
                    as starting a new business, expanding operations, or
                    managing daily expenses. The site emphasizes transparency,
                    competitive interest rates, and flexible repayment plans.
                    With features like quick approval processes and no hidden
                    fees, it aims to empower users to take control of their
                    finances confidently. Additionally, the platform includes a
                    helpful FAQ section to address common queries.
                  </p>
                </details>
              </div>
              <hr className="hidden sm:block" />
            </li>
            <li>
              <hr className="hidden sm:block" />
              <div className="timeline-middle hidden sm:block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-[#6f6b2a]"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="w-full timeline-end flex flex-col sm:items-start mb-10 border border-[#6f6b2a] rounded-lg p-4 bg-[#f9f7ec] drop-shadow-lg">
                <div className="relative w-full h-full">
                  <img
                    src={p21}
                    className="shadow-sm border border-[#6f6b2a] rounded-lg mb-2"
                    alt=""
                  />
                  <div className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="w-full h-full flex justify-center overflow-x-auto snap-x">
                      <img
                        src={p22}
                        className="object-cover snap-center shadow-sm border border-[#6f6b2a] rounded-lg mb-2 w-max sm:h-full h-[fit]"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <time className="font-mono italic text-sm">2023</time>
                <div className="text-lg font-black">Password Generator App</div>
                <ul className="flex gap-2 sm:text-sm text-[8px] mt-2">
                  <li className="bg-[#e0dbbb] sm:px-4 sm:py-1 w-max px-2 py-1 font-semibold rounded-lg text-gray-600 shadow-sm">
                    React Native
                  </li>
                  <li className="bg-[#e0dbbb] sm:px-4 sm:py-1 w-max px-2 py-1 font-semibold rounded-lg text-gray-600 shadow-sm">
                    Styled Components
                  </li>
                  <li className="bg-[#e0dbbb] sm:px-4 sm:py-1 w-max px-2 py-1 font-semibold rounded-lg text-gray-600 shadow-sm">
                    React Components
                  </li>
                  <li className="bg-[#e0dbbb] sm:px-4 sm:py-1 w-max px-2 py-1 font-semibold rounded-lg text-gray-600 shadow-sm">
                    CSS
                  </li>
                </ul>
                <div>
                  <ul className="flex gap-2 mt-2">
                    <li>
                      <a
                        href="https://github.com/inteshar/PasswordGenerator-in-react-native"
                        className="hover:custom-cursor-hover"
                        target="_blank"
                      >
                        <img
                          width="24"
                          height="24"
                          src="https://img.icons8.com/3d-fluency/94/github.png"
                          alt="github"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://apkpure.com/password-generator/com.passwordgenerator"
                        className="hover:custom-cursor-hover"
                        target="_blank"
                      >
                        <img
                          width="24"
                          height="24"
                          src="https://img.icons8.com/3d-fluency/94/link.png"
                          alt="github"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
                <details className="mt-2">
                  <summary className="hover:custom-cursor-hover font-bold text-[#6f6b2a] sm:text-sm text-xs">
                    Show more
                  </summary>
                  <p className="text-justify">
                    Built in React Native, this app effortlessly creates strong,
                    custom passwords. Users specify length and character types
                    (lowercase, uppercase, symbols, numbers) via Formik-based
                    forms. Yup schema ensures validation. Its intuitive
                    interface enables secure password creation tailored to
                    preferences.
                  </p>
                </details>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Projects;
