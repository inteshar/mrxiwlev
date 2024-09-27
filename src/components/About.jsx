import React from "react";
import photo from "/src/assets/photo.jpg";

const About = () => {
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
                src={photo}
                alt=""
                className="h-full w-full rounded-md object-cover shadow-lg border-2 border-[#e5deb1]"
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
                    A professional with 2 years of experience in Web
                    Development, holding a degree in Computer Science and
                    Engineering. Open to every opportunity to apply my knowledge
                    and skills to contribute to the success of the organization
                    and advance my career.
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
              <li className="border-s-2 border-black h-max ps-3 flex justify-between">
                <div>
                  <p className="font-bold text-[#6f6b2a] sm:text-lg text-[12px]">
                    13/07/2022 - 05/03/2024
                  </p>
                  <div className="text-sm font-bold text-gray-900">
                    JD Global Pvt. Ltd., Kathmandu, Nepal
                  </div>
                  <p className="sm:text-xl font-bold text-[#6f6b2a]">
                    Junior Web Developer
                  </p>
                  <ul className="text-gray-600 text-sm list-disc w-auto ps-3">
                    <li>
                      Developed and maintained responsive web applications using
                      modern technologies.
                    </li>
                    <li>
                      Collaborated with senior developers to implement features
                      and troubleshoot issues.
                    </li>
                    <li>
                      Identified and resolved bugs to improve functionality and
                      user experience.
                    </li>
                    <li>
                      Optimized websites for performance, scalability, and
                      cross-browser compatibility.
                    </li>
                    <li>
                      Followed coding best practices and stayed updated on
                      emerging web technologies.
                    </li>
                  </ul>
                </div>
              </li>
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
