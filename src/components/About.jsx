import React, { useState, useEffect } from "react";
import photo from "../assets/photo.png";
import {
  fetchProfilePic,
  fetchProfileSummary,
  fetchExp,
} from "../firebase/firestoreQueries";

const About = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [loadprofilesummary, setLoadprofilesummary] = useState("");

  useEffect(() => {
    const loadProfilePic = async () => {
      try {
        const fetchedProfilePic = await fetchProfilePic();
        setProfilePic(fetchedProfilePic);
      } catch (error) {
        console.error("Failed to load profile pic:", error);
      }
    };

    loadProfilePic();
  }, []);

  const [exp, setExp] = useState([]);

  useEffect(() => {
    const loadExp = async () => {
      try {
        const fetchedExp = await fetchExp();
        const sortedExp = Object.keys(fetchedExp)
          .map((key) => ({
            id: key,
            ...fetchedExp[key],
          }))
          .sort((a, b) => b.createdAt - a.createdAt);

        setExp(sortedExp);
      } catch (error) {
        console.error("Failed to load blogs:", error);
      }
    };

    loadExp();
  }, []);

  const [expandedRowsExp, setExpandedRowsExp] = useState([]);

  // Toggle the expansion of roles and responsibilities for the selected experience
  const toggleRowExpansion = (experienceId) => {
    if (expandedRowsExp.includes(experienceId)) {
      setExpandedRowsExp(expandedRowsExp.filter((id) => id !== experienceId));
    } else {
      setExpandedRowsExp([...expandedRowsExp, experienceId]);
    }
  };

  useEffect(() => {
    const loadProfileSummary = async () => {
      try {
        const fetchedProfileSummary = await fetchProfileSummary();
        setLoadprofilesummary(fetchedProfileSummary);
      } catch (error) {
        console.error("Failed to load profile summary:", error);
      }
    };

    loadProfileSummary();
  }, []);

  return (
    <>
      <div
        id="about"
        className="w-full h-max bg-[#e5deb1] flex flex-col sm:flex-row items-top justify-between gap-6 sm:p-6 p-4"
      >
        <div className="rounded-lg h-max sm:w-6/12 w-full flex flex-col justify-evenly gap-6">
          <div className="flex max-w-full flex-col items-center rounded-md border md:flex-row bg-[#f9f7ec] drop-shadow-xl">
            <div className="h-full w-full md:h-[200px] md:w-[500px] p-2">
              <img
                src={profilePic ? profilePic : photo}
                alt="Image"
                className="h-full w-full object-cover drop-shadow-xl"
              />
            </div>
            <div>
              <div className="p-4">
                <h1 className="inline-flex items-center sm:text-3xl text-xl font-bold text-[#6f6b2a]">
                  Mohammad Inteshar Alam
                </h1>
                <p className="text-sm text-gray-600">Software Engineer</p>

                <p className="text-sm text-gray-600">Doha, Qatar</p>
                <div className="mt-4">
                  <p className="mt-3 text-sm text-gray-600 text-justify">
                    {loadprofilesummary ? (
                      loadprofilesummary
                    ) : (
                      <div className="text-center text-gray-700 flex items-center justify-center">
                        <span className="loading loading-spinner loading-sm"></span>
                      </div>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#f9f7ec] rounded-md drop-shadow-xl p-4">
            <p className="text-xs mb-5 font-bold text-[#6f6b2a]">
              Education Qualifications
            </p>
            <ul className="flex flex-col gap-4">
              <li className="border-s-2 border-black h-max ps-3 flex justify-between">
                <div>
                  <div className="text-sm font-bold text-gray-900">
                    Bachelor of Technology
                  </div>
                  <p className="sm:text-xl font-bold text-[#6f6b2a]">
                    Computer Science and Engineering
                  </p>
                  <p className="text-gray-600 sm:text-lg text-sm">
                    Quantum University, Uttarakhand, India
                  </p>
                </div>
                <div>
                  <p className="font-bold text-[#6f6b2a] sm:text-lg text-[8px] text-right -ms-6">
                    2018-2022
                  </p>
                </div>
              </li>
              <li className="border-b-2 border-[#e5deb1]"></li>
              <li className="border-e-2 border-black h-max pe-3 flex justify-between text-right">
                <div>
                  <p className="font-bold text-[#6f6b2a] sm:text-lg text-[8px] text-left -me-6">
                    2016-2028
                  </p>
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">
                    Intermediate (12th Grade)
                  </div>
                  <p className="sm:text-xl font-bold text-[#6f6b2a]">
                    Physics, Chemistry & Mathematics
                  </p>
                  <p className="text-gray-600 sm:text-lg text-sm">
                    NGM College, Jharkhand, India
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="w-full bg-[#f9f7ec] rounded-md drop-shadow-xl p-4">
            <p className="text-xs mb-5 font-bold text-[#6f6b2a]">
              Trainings & Certifications
            </p>
            <ul className="flex flex-col gap-4">
              <li className="border-s-2 border-black h-max ps-3 flex justify-between">
                <div>
                  <p className="sm:text-xl font-bold text-[#6f6b2a]">
                    Web Development
                  </p>
                  <p className="text-gray-600 sm:text-lg text-sm">
                    6 Weeks Online Training by Internshala Trainings
                  </p>
                </div>
                <div>
                  <p className="font-bold text-[#6f6b2a] text-right sm:text-lg text-[8px]">
                    June 2021
                  </p>
                </div>
              </li>
              <li className="border-b-2 border-[#e5deb1]"></li>
              <li className="border-e-2 border-black h-max pe-3 flex justify-between text-right">
                <div>
                  <p className="font-bold text-[#6f6b2a] text-left sm:text-lg text-[8px]">
                    April 2021
                  </p>
                </div>
                <div>
                  <p className="sm:text-xl font-bold text-[#6f6b2a]">
                    Android App Development
                  </p>
                  <p className="text-gray-600 sm:text-lg text-sm">
                    8 Weeks Online Training by Internshala Trainings
                  </p>
                </div>
              </li>
              <li className="border-b-2 border-[#e5deb1]"></li>
              <li className="border-s-2 border-black h-max ps-3 flex justify-between">
                <div>
                  <p className="sm:text-xl font-bold text-[#6f6b2a]">
                    Database Foundation
                  </p>
                  <p className="text-gray-600 sm:text-lg text-sm">
                    6 months Training at Quantum University by Oracle Academy
                  </p>
                </div>
                <div>
                  <p className="font-bold text-[#6f6b2a] text-right sm:text-lg text-[8px]">
                    December 2019
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="h-max sm:w-6/12 w-full flex flex-col gap-6">
          <div className="bg-[#f9f7ec] p-6 rounded-lg drop-shadow-xl ">
            <p className="text-xs mb-5 font-bold text-[#6f6b2a]">
              Professional Career
            </p>
            <ul className="flex flex-col gap-4">
              {exp.length > 0 ? (
                exp.map((experience) => (
                  <li
                    key={experience.id}
                    className="border-s-2 border-black h-max ps-3 flex justify-between mb-4"
                  >
                    <div>
                      <p className="font-bold text-[#6f6b2a] sm:text-lg text-[12px]">
                        {new Date(
                          experience.dateFrom.seconds * 1000
                        ).toLocaleDateString()}{" "}
                        -{" "}
                        {typeof experience.dateTo === "string"
                          ? experience.dateTo
                          : new Date(
                              experience.dateTo.seconds * 1000
                            ).toLocaleDateString()}
                      </p>

                      <p className="text-sm font-bold text-gray-900 flex items-center">
                        {experience.company}, {experience.address}{" "}
                        <a
                          href={experience.url}
                          target="_blank"
                          className="mx-2 hover:custom-cursor-hover duration-300 text-[#6f6b2a]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-square-arrow-out-up-right"
                          >
                            <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                            <path d="m21 3-9 9" />
                            <path d="M15 3h6v6" />
                          </svg>
                        </a>
                      </p>

                      <p className="sm:text-xl font-bold text-[#6f6b2a]">
                        {experience.position}
                      </p>

                      <button
                        className="text-[#6f6b2a] text-sm mt-2 hover:custom-cursor-hover duration-300 flex items-center gap-2"
                        onClick={() => toggleRowExpansion(experience.id)}
                      >
                        Roles & Responsibilities{" "}
                        {expandedRowsExp.includes(experience.id) ? (
                          <div>
                            <img
                              width="16"
                              height="16"
                              src="https://img.icons8.com/ios/50/circled-chevron-down.png"
                              alt="Hide"
                            />
                          </div>
                        ) : (
                          <div>
                            <img
                              width="16"
                              height="16"
                              src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/external-right-arrows-those-icons-lineal-those-icons-5.png"
                              alt="Show"
                            />
                          </div>
                        )}
                      </button>

                      {expandedRowsExp.includes(experience.id) && (
                        <ul className="text-gray-600 text-sm list-disc w-auto ps-3 mt-2">
                          {experience.rolesResponsibilities
                            .split("\n")
                            .map((role, index) => (
                              <li key={index}>{role}</li>
                            ))}
                        </ul>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <div className="text-center text-gray-700 flex items-center justify-center">
                  <span className="loading loading-spinner loading-sm"></span>
                </div>
              )}
            </ul>
          </div>
          <div className="bg-[#f9f7ec] p-6 rounded-lg drop-shadow-xl ">
            <p className="text-xs mb-5 font-bold text-[#6f6b2a]">
              Languages I Know
            </p>
            <ul className="flex flex-col gap-4">
              <li className="border-s-2 border-black h-max ps-3 flex justify-between">
                <div>
                  <p className="sm:text-xl font-bold text-[#6f6b2a]">English</p>
                </div>
                <div>
                  <p className="font-bold text-[#6f6b2a]">
                    Read, Write & Speak
                  </p>
                </div>
              </li>
              <li className="border-b-2 border-[#e5deb1]"></li>
              <li className="border-s-2 border-black h-max ps-3 flex justify-between">
                <div>
                  <p className="sm:text-xl font-bold text-[#6f6b2a]">Nepali</p>
                </div>
                <div>
                  <p className="font-bold text-[#6f6b2a]">
                    Read, Write & Speak
                  </p>
                </div>
              </li>
              <li className="border-b-2 border-[#e5deb1]"></li>
              <li className="border-s-2 border-black h-max ps-3 flex justify-between">
                <div>
                  <p className="sm:text-xl font-bold text-[#6f6b2a]">Hindi</p>
                </div>
                <div>
                  <p className="font-bold text-[#6f6b2a]">
                    Read, Write & Speak
                  </p>
                </div>
              </li>
              <li className="border-b-2 border-[#e5deb1]"></li>
              <li className="border-s-2 border-black h-max ps-3 flex justify-between">
                <div>
                  <p className="sm:text-xl font-bold text-[#6f6b2a]">Urdu</p>
                </div>
                <div>
                  <p className="font-bold text-[#6f6b2a]">Read & Speak</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
