import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { fetchBlogById } from "../firebase/firestoreQueries";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Navbar = () => {
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
            `}
      </style>

      <nav className="custom-cursor shadow sticky top-0 bg-white">
        <div className="container px-6 py-3 mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
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

            {/* Mobile Menu */}
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
              </div>

              {/* Search input on mobile screen */}
              <div className="my-4 md:hidden">
                <div className="relative">
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
                    className="w-full py-2 pl-10 pr-4 border rounded-md focus:border-black focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-black"
                    placeholder="Search"
                    style={{ backgroundColor: "transparent", color: "black" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="py-3 mt-3 -mx-3 overflow-y-auto whitespace-nowrap scroll-hidden">
            <ul className="flex">
              <li className="hover:custom-cursor-hover mx-4 text-sm leading-5 text-black transition-colors duration-300 transform hover:text-gray-600 hover:underline md:my-0">
                Technology
              </li>
              <li className="hover:custom-cursor-hover mx-4 text-sm leading-5 text-black transition-colors duration-300 transform hover:text-gray-600 hover:underline md:my-0">
                Business
              </li>
              <li className="hover:custom-cursor-hover mx-4 text-sm leading-5 text-black transition-colors duration-300 transform hover:text-gray-600 hover:underline md:my-0">
                Health
              </li>
              <li className="hover:custom-cursor-hover mx-4 text-sm leading-5 text-black transition-colors duration-300 transform hover:text-gray-600 hover:underline md:my-0">
                Lifestyle
              </li>
              <li className="hover:custom-cursor-hover mx-4 text-sm leading-5 text-black transition-colors duration-300 transform hover:text-gray-600 hover:underline md:my-0">
                Education
              </li>
              <li className="hover:custom-cursor-hover mx-4 text-sm leading-5 text-black transition-colors duration-300 transform hover:text-gray-600 hover:underline md:my-0">
                Finance
              </li>
              <li className="hover:custom-cursor-hover mx-4 text-sm leading-5 text-black transition-colors duration-300 transform hover:text-gray-600 hover:underline md:my-0">
                E-commerce
              </li>
              <li className="hover:custom-cursor-hover mx-4 text-sm leading-5 text-black transition-colors duration-300 transform hover:text-gray-600 hover:underline md:my-0">
                Food
              </li>
              <li className="hover:custom-cursor-hover mx-4 text-sm leading-5 text-black transition-colors duration-300 transform hover:text-gray-600 hover:underline md:my-0">
                Marketing
              </li>
              <li className="hover:custom-cursor-hover mx-4 text-sm leading-5 text-black transition-colors duration-300 transform hover:text-gray-600 hover:underline md:my-0">
                Science
              </li>
            </ul>
          </div> */}
        </div>
      </nav>
    </>
  );
};
const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const fetchedBlog = await fetchBlogById(id);
        if (!fetchedBlog) {
          setError("No blog found.");
          console.log(error);
        } else {
          setBlog(fetchedBlog);
        }
      } catch (error) {
        setError("Failed to fetch blog.");
      } finally {
        setLoading(false);
      }
    };

    getBlog();
  }, [id]);

  const [recentPosts, setRecentPosts] = useState([]);

  // Fetch recent posts
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        // Create a query to get the latest 5 posts ordered by the createdAt field
        const postsQuery = query(
          collection(db, "blogs"),
          orderBy("createdAt", "desc"),
          limit(5)
        );

        const postsSnapshot = await getDocs(postsQuery);
        const postsList = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRecentPosts(postsList); // Set the fetched posts in state
      } catch (error) {
        console.error("Error fetching recent posts: ", error);
      }
    };

    fetchRecentPosts();
  }, []);

  useEffect(() => {
    if (blog) {
      document.title = blog.title; // Set the HTML page title to the blog title
    }
  }, [blog]);

  return (
    <>
      <style>
        {`/* Hide scrollbar for Chrome, Safari, and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge, and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;     /* Firefox */
        }
      `}
      </style>

      <Navbar />
      <div className="flex sm:flex-row flex-col justify-evenly bg-white h-max sm:max-h-[80vh] sm:overflow-y-hidden w-screen custom-cursor p-6">
        <div className="text-black sm:w-[65vw] sm:h-[75vh] sm:overflow-y-auto no-scrollbar">
          {loading ? (
            <div className="text-gray-700 flex justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : blog ? (
            <div className="flex flex-col gap-6">
              <div className="flex items-center py-4 -my-5 overflow-x-auto whitespace-nowrap bg-white">
                <Link to="/blogs" className="text-gray-600 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </Link>

                <span className="mx-5 text-gray-500 rtl:-scale-x-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                  </svg>
                </span>

                <Link to="#" className="text-blue-600 hover:underline">
                  {blog.title}
                </Link>
              </div>
              <h1 className="sm:text-4xl text-2xl font-bold">{blog.title}</h1>
              {blog.image && (
                <div className="flex flex-col gap-0">
                  <img className="sm:h-96" src={blog.image} alt={blog.title} />
                  <br />
                  <ul className="flex gap-8 italic text-xs text-gray-700 font-bold">
                    <li>By Admin</li>
                    <li>Category: {blog.category}</li>
                    <li>
                      Date: {blog.createdAt.toDate().toLocaleDateString()}
                    </li>
                  </ul>
                </div>
              )}
              <p dangerouslySetInnerHTML={{ __html: blog.content }}></p>
              <div className="pb-10"></div> {/* Added extra space here */}
            </div>
          ) : (
            <div>
              No blog found. Please check the URL or return to the homepage.
            </div>
          )}
        </div>
        <div className="sm:min-h-screen sm:w-[20vw]  text-black sm:max-h-screen">
          <h1>Recent Posts</h1>
          <ul className="space-y-4">
            {loading ? (
              <div className="text-gray-700 flex justify-center">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              recentPosts.map((post) => (
                <li key={post.id} className="border-b pb-1 pt-1">
                  <p className="text-sm text-[#a26398]">{post.category}</p>
                  <Link
                    to={`/blogs/${post.id}`}
                    onClick={() => setLoading(true)}
                    className="hover:custom-cursor-hover text-md text-black hover:underline"
                  >
                    {post.title}
                  </Link>
                  <p className="text-xs text-gray-500">
                    {new Date(post.createdAt.toDate()).toLocaleDateString()}
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      <footer className="footer footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All rights reserved by{" "}
            <Link className="hover:underline hover:custom-cursor-hover" to="/">
              MrXiwlev
            </Link>
          </p>
        </aside>
      </footer>
    </>
  );
};

export default BlogDetail;
