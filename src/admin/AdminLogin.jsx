import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);
      setError("Logged in successfully");
      navigate("/dashboard"); // Redirect to dashboard or another page
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Failed to log in. Please check your email and password.");
    }
  };
  return (
    <>
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center p-6 h-max sm:h-screen w-screen bg-[#6f6b2a]">
          <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
            <div className="absolute inset-0">
              <img
                className="h-full w-full rounded-lg object-cover object-top"
                src="https://images.pexels.com/photos/5380661/pexels-photo-5380661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="relative">
              <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
                <h3 className="text-2xl font-bold text-gray-600">
                  Having reached this login page, it is advisable to refrain
                  from attempting to log in or conducting any unauthorized
                  actions. Please ensure you do not proceed further to avoid
                  potential security breaches or violations.
                </h3>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Sign in
              </h2>

              <form onSubmit={handleLogin}>
                <div className="space-y-5">
                  <div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-[#e5deb1] px-3 py-2 text-sm placeholder:text-gray-600 text-[#514e23] focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between"></div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-[#e5deb1] px-3 py-2 text-sm placeholder:text-gray-600 text-[#514e23] focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      ></input>
                    </div>
                  </div>
                  <div>
                    {error && <p className="error-message">{error}</p>}
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      Login <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
