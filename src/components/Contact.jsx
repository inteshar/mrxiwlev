import React, { useState } from "react";
import logo from "../assets/logo.png";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import SuccessDialog from "./SuccessDialog";
import Loading from "../assets/loading.gif";

export function Contact() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "contacts"), {
        fname,
        lname,
        email,
        subject,
        message,
        timestamp: new Date(),
      });

      setFname("");
      setLname("");
      setEmail("");
      setSubject("");
      setMessage("");
      setLoading(false);
      setShowSuccessDialog(true);
      setTimeout(() => setShowSuccessDialog(false), 5000);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleCloseDialog = () => {
    setShowSuccessDialog(false);
  };
  return (
    <>
      <div className="bg-contact-bg bg-no-repeat bg-cover bg-blend-overlay bg-center">
        <div id="contact" className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
            <div className="mx-auto max-w-max rounded-full bg-[#f9f7ec] p-1 px-3">
              <p className="text-center text-xs font-semibold leading-normal  text-gray-900 md:text-sm">
                Share your thoughts
              </p>
            </div>
            <p className="text-center text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
              Love to hear from you
            </p>
            <p className="mx-auto max-w-4xl text-center text-base text-gray-600 text-md sm:text-xl">
              Whether you have a question, a project idea, or just want to say
              hello, feel free to drop me a message. Let's connect and create
              something awesome together!
            </p>
          </div>
          <div className="mx-auto max-w-7xl py-12 md:py-24">
            <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
              <div className="flex items-center justify-center">
                <div className="px-2 md:px-12">
                  <p className="text-2xl font-bold text-gray-900 md:text-4xl">
                    Get in touch
                  </p>
                  <p className="mt-4 sm:text-lg text-xs text-gray-600">
                    I'm excited to hear from you and happy to help with any
                    questions or ideas you have!
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleSubmit(e);
                      setLoading(true);
                    }}
                    className="font-semibold mt-8 space-y-4 text-[#6f6b2a]"
                  >
                    <input type="hidden" name="_template" value="table"></input>
                    <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
                      <div className="grid w-full items-center gap-1.5">
                        <input
                          className="text-[#6f6b2a] bg-[#f9f7ec] flex h-10 w-full rounded-md drop-shadow-xl px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#6f6b2a] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="text"
                          id="first_name"
                          placeholder="First Name"
                          value={fname}
                          onChange={(e) => setFname(e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <input
                          className="text-[#6f6b2a] bg-[#f9f7ec] flex h-10 w-full rounded-md drop-shadow-xl px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#6f6b2a] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="text"
                          id="last_name"
                          placeholder="Last Name"
                          value={lname}
                          onChange={(e) => setLname(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <input
                        className="text-[#6f6b2a] bg-[#f9f7ec] flex h-10 w-full rounded-md drop-shadow-xl px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#6f6b2a] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <input
                        className="text-[#6f6b2a] bg-[#f9f7ec] flex h-10 w-full rounded-md drop-shadow-xl px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#6f6b2a] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        id="phone_number"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <textarea
                        className="text-[#6f6b2a] bg-[#f9f7ec] rounded-md drop-shadow-xl px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#6f6b2a] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        id="message"
                        placeholder="Leave me a message"
                        cols={3}
                        rows={5} // Adjust rows for better UX
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex justify-center hover:custom-cursor-hover w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white drop-shadow-xl hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      {loading ? (
                        <img
                          className="rounded-full"
                          src={Loading}
                          height={24}
                          width={24}
                        />
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                </div>
              </div>
              <div className="backdrop-blur-xl h-full w-full rounded-lg shadow-xl border-2 border-[#6f6b2a] p-6 flex flex-col justify-evenly gap-4 text-gray-900">
                <div className="text-center">
                  <p className="text-sm font-bold">Mobile</p>
                  <p className="sm:text-2xl font-bold text-[#6f6b2a] drop-shadow-md">
                    <a
                      href="tel:+974-31396030"
                      className="hover:custom-cursor-hover"
                    >
                      +974-31396030
                    </a>
                    <br />
                    <a
                      href="tel:+977-9827834648"
                      className="hover:custom-cursor-hover"
                    >
                      +977-9827834648
                    </a>
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold">Email</p>
                  <p className="sm:text-2xl font-bold text-[#6f6b2a] drop-shadow-md">
                    <a
                      href="mailto:intesharalam01@gmail.com"
                      className="hover:custom-cursor-hover"
                    >
                      intesharalam01@gmail.com
                    </a>
                    <br />
                    <a
                      href="mailto:mrxiwlev@gmail.com"
                      className="hover:custom-cursor-hover"
                    >
                      mrxiwlev@gmail.com
                    </a>
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold">Location</p>
                  <p className="sm:text-2xl font-bold text-[#6f6b2a] drop-shadow-md">
                    Doha, Qatar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showSuccessDialog && <SuccessDialog onClose={handleCloseDialog} />}

        <section className="relative overflow-hidden py-8 bg-[#f2eed5]">
          <div className="container relative z-10 mx-auto px-4 text-gray-900">
            <div className="-m-8 flex flex-wrap items-center sm:justify-evenly justify-center">
              <div className="w-auto p-8">
                <a href="#hero" className="hover:custom-cursor-hover">
                  <div className="inline-flex items-center">
                    <img
                      src={logo}
                      alt=""
                      width={70}
                      height={70}
                      className="rounded-lg drop-shadow-lg"
                    />
                    <div className="">
                      <span className="ml-4 text-lg font-bold drop-shadow-lg">
                        MrXiwlev
                      </span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="w-max p-8">
                <ul className="flex gap-5">
                  <li>
                    <a
                      href="#about"
                      className="font-bold hover:custom-cursor-hover"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      className="font-bold hover:custom-cursor-hover"
                    >
                      Serives
                    </a>
                  </li>
                  <li>
                    <a
                      href="#blogs"
                      className="font-bold hover:custom-cursor-hover"
                    >
                      Blogs
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-auto p-8">
                <div className="-m-1.5 flex flex-wrap">
                  <div className="w-auto p-1.5">
                    <a
                      href="https://github.com/inteshar"
                      target="_blank"
                      className="hover:custom-cursor-hover drop-shadow-lg"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full">
                        <img
                          width="94"
                          height="94"
                          src="https://img.icons8.com/3d-fluency/94/github.png"
                          alt="github"
                        />
                      </div>
                    </a>
                  </div>
                  <div className="w-auto p-1.5">
                    <a
                      href="https://www.linkedin.com/in/mohammad-inteshar-alam"
                      className="hover:custom-cursor-hover drop-shadow-lg"
                      target="_blank"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full">
                        <img
                          width="94"
                          height="94"
                          src="https://img.icons8.com/3d-fluency/94/linkedin.png"
                          alt="linkedin"
                        />
                      </div>
                    </a>
                  </div>
                  <div className="w-auto p-1.5">
                    <a
                      href="https://www.facebook.com/profile.php?id=61554193742967"
                      className="hover:custom-cursor-hover drop-shadow-lg"
                      target="_blank"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full">
                        <img
                          width="94"
                          height="94"
                          src="https://img.icons8.com/3d-fluency/94/facebook-circled.png"
                          alt="facebook-circled"
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="bg-[#f2eed5] h-full w-full text-center sm:text-[12px] text-[8px] font-bold text-[#6f6b2a] pb-3">
        <p>Designed & Developed with ❤️ by Mohammad Inteshar Alam • 2024</p>
      </div>
      <div className="bg-[#f2eed5] h-[5px] w-full"></div>
      <div className="bg-[#f2eed5] h-[5px] w-full"></div>
    </>
  );
}
