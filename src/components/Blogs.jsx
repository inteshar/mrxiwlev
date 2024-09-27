import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Make sure to import Link for routing
import Logo from "../assets/logo.png";
import { fetchBlogs } from "../firebase/firestoreQueries";

const Navbar = ({ searchQuery, handleSearch }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Custom CSS */}
      <style>
        {`
          .scroll-hidden::-webkit-scrollbar {
            height: 0px;
            background: transparent;
          }
          .floating-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px; 
            z-index: 1000; 
            background-color: white; 
            padding: 10px; 
            border-radius: 50%; 
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); 
          }
        `}
      </style>

      <nav className="shadow sticky top-0 bg-white">
        <div className="container px-6 py-3 mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Link
                  to="/blogs"
                  className="hover:custom-cursor-hover flex items-center gap-2 drop-shadow-xl"
                >
                  <img className="w-auto h-12 sm:h-20" src={Logo} alt="Logo" />

                  <div className="flex flex-col -gap-0">
                    <p className="font-bold text-xl sm:text-3xl text-black">
                      MrXiwlev
                    </p>
                    <span className="text-xs text-gray-600">Blogs</span>
                  </div>
                </Link>

                <div className="relative md:ml-4 sm:block hidden">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="w-5 h-5 text-black"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <input
                    type="text"
                    className="w-full py-2 pl-10 pr-4 border rounded-md focus:outline-none"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                    style={{ backgroundColor: "transparent", color: "black" }}
                  />
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="flex lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="text-black hover:text-gray-600 focus:outline-none"
                  aria-label="toggle menu"
                >
                  {isOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 8h16M4 16h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div
              className={`bg-white absolute inset-x-0 z-20 w-full px-6 py-2 transition-all duration-300 ease-in-out top-20 md:mt-0 md:p-0 md:top-0 md:relative md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "opacity-0 -translate-x-full"
              }`}
            >
              <div className="flex flex-col md:flex-row md:mx-1">
                <Link
                  className="hover:custom-cursor-hover text-center text-white bg-[#a26398] hover:bg-[#b77db1] border border-gray-400 px-2 py-1 rounded drop-shadhow-xl my-2 text-sm leading-5 transition-colors duration-300 transform md:mx-4 md:my-0"
                  to="/"
                >
                  Portfolio
                </Link>

                <div className="relative md:ml-4 sm:hidden block">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="w-5 h-5 text-black"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <input
                    type="text"
                    className="w-full py-2 pl-10 pr-4 border rounded-md focus:outline-none"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                    style={{ backgroundColor: "transparent", color: "black" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const blogsPerPage = 8; // Number of blogs per page
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value); // Update search query
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const fetchedBlogs = await fetchBlogs(); // Fetch blogs from Firebase Realtime Database
        // Assuming each blog object has a createdAt timestamp in milliseconds
        const sortedBlogs = Object.keys(fetchedBlogs)
          .map((key) => ({
            id: key,
            ...fetchedBlogs[key],
          }))
          .sort((a, b) => b.createdAt - a.createdAt); // Sort directly by the timestamp

        setBlogs(sortedBlogs); // Update state with the sorted blogs
        setLoading(false);
      } catch (error) {
        console.error("Failed to load blogs:", error); // Log error if fetching fails
      }
    };

    loadBlogs();
  }, []);

  // Calculate the current blogs to display
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`; // This will display the date in the format of "12 March 2024"
  };

  return (
    <>
      <div className="bg-white h-auto w-screen custom-cursor">
        <Navbar searchQuery={searchQuery} handleSearch={handleSearch} />

        <div className="w-screen min-h-screen flex flex-col items-center justify-evenly gap-4 sm:p-4">
          <section className="w-screen sm:p-5">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {loading ? (
                  <div className="-mt-96 text-center text-gray-700 w-screen flex items-center justify-center">
                    <span className="loading loading-spinner loading-lg"></span>
                  </div>
                ) : currentBlogs.length > 0 ? ( // Check if there are blogs to display
                  currentBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="duration-500 rounded-lg hover:shadow-xl p-4 bg-white flex flex-col justify-between h-full"
                    >
                      <img
                        className="object-cover object-center w-full h-32 rounded-lg"
                        src={blog.image}
                        alt={blog.title}
                      />
                      <div className="mt-2">
                        <span className="text-[#a26398] uppercase">
                          {blog.category}
                        </span>
                        <h1 className="mt-1 text-lg font-bold text-black">
                          <Link
                            to={`/blogs/${blog.id}`}
                            className="hover:underline hover:custom-cursor-hover"
                          >
                            {blog.title}
                          </Link>
                        </h1>
                        <p
                          className="mt-1 text-gray-600 h-24 overflow-hidden"
                          dangerouslySetInnerHTML={{
                            __html:
                              blog.content.split(". ").slice(0, 1).join(". ") +
                              ".",
                          }}
                        ></p>
                        <div className="flex items-center justify-between mt-3">
                          <div>
                            <p className="text-base font-medium text-gray-600">
                              Admin
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDate(blog.createdAt.toDate())}
                            </p>
                          </div>
                          <Link
                            to={`/blogs/${blog.id}`}
                            className="hover:custom-cursor-hover inline-block text-[#a26398] underline hover:text-blue-400"
                          >
                            Read more
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    No blog found. Please check the URL or return to the
                    homepage.
                  </div>
                )}
              </div>
              {/* Pagination */}
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  className={`hover:custom-cursor-hover hover:text-white duration-500 hover:bg-[#a26398] border border-black px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md cursor-${
                    currentPage === 1 ? "not-allowed" : "pointer"
                  }`}
                  style={{ pointerEvents: currentPage === 1 ? "none" : "auto" }}
                >
                  <div className="flex items-center -mx-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-1 rtl:-scale-x-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16l-4-4m0 0l4-4m-4 4h18"
                      />
                    </svg>
                    <span className="mx-1">Previous</span>
                  </div>
                </button>

                {Array.from(
                  { length: Math.ceil(blogs.length / blogsPerPage) },
                  (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => paginate(index + 1)}
                      className={`hover:custom-cursor-hover duration-500 border border-[#a26398] text-black px-4 py-2 mx-1 transition-colors transform rounded-md hover:bg-[#a26398] hover:text-white ${
                        currentPage === index + 1
                          ? "bg-[#a26398] text-white"
                          : ""
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                )}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  className={`hover:custom-cursor-hover hover:text-white duration-500 hover:bg-[#a26398] border border-black px-4 py-2 mx-1 text-gray-700 transition-colors transform bg-white rounded-md cursor-${
                    currentPage === Math.ceil(blogs.length / blogsPerPage)
                      ? "not-allowed"
                      : "pointer"
                  }`}
                  style={{
                    pointerEvents:
                      currentPage === Math.ceil(blogs.length / blogsPerPage)
                        ? "none"
                        : "auto",
                  }}
                >
                  <div className="flex items-center -mx-1">
                    <span className="mx-1">Next</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-1 rtl:-scale-x-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </section>
        </div>
        <footer className="footer footer-center bg-base-300 text-base-content p-4">
          <aside>
            <p>
              Copyright © {new Date().getFullYear()} - All right reserved by{" "}
              <Link
                className="hover:underline hover:custom-cursor-hover"
                to="/"
              >
                MrXiwlev
              </Link>
            </p>
          </aside>
        </footer>
      </div>
    </>
  );
};

export default Blogs;
