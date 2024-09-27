import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { db } from "../firebase/firebase";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { fetchBlogs } from "../firebase/firestoreQueries";

const Blog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [expandedBlogs, setExpandedBlogs] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10;

  const handleDelete = async () => {
    if (blogToDelete && !isBulkDelete) {
      try {
        await deleteDoc(doc(db, "blogs", blogToDelete));
        setBlogs(blogs.filter((blog) => blog.id !== blogToDelete));
        setToastMessage("Blog deleted successfully!");
      } catch (error) {
        setToastMessage("Error deleting blog.");
      } finally {
        setIsDeleteModalOpen(false);
        setBlogToDelete(null);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    } else if (isBulkDelete) {
      await handleBulkDelete();
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedBlogs.map((blogId) => deleteDoc(doc(db, "blogs", blogId)))
      );
      setBlogs(blogs.filter((blog) => !selectedBlogs.includes(blog.id)));
      setSelectedBlogs([]);
      setToastMessage("Selected blogs deleted successfully!");
    } catch (error) {
      setToastMessage("Error deleting selected blogs.");
    } finally {
      setIsDeleteModalOpen(false);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const blogsCollection = collection(db, "blogs");
      await addDoc(blogsCollection, {
        title: blogTitle,
        category: blogCategory,
        content: blogContent,
        image: imagePreview,
        createdAt: new Date(),
      });
      setBlogTitle("");
      setBlogCategory("");
      setBlogContent("");
      setImagePreview(null);
      alert("Blog posted successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to post blog.");
    }
  };

  const handleCheckboxChange = (blogId) => {
    if (selectedBlogs.includes(blogId)) {
      setSelectedBlogs(selectedBlogs.filter((id) => id !== blogId));
    } else {
      setSelectedBlogs([...selectedBlogs, blogId]);
    }
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedBlogs([]);
  };

  const handleContentChange = (content) => {
    setBlogContent(content);
  };

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const fetchedBlogs = await fetchBlogs();
        console.log(fetchedBlogs);
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error("Failed to load blogs:", error);
      }
    };

    loadBlogs();
  }, []);

  const handleSelectAll = () => {
    if (selectedBlogs.length === blogs.length) {
      // If all blogs are selected, clear the selection
      setSelectedBlogs([]);
    } else {
      // Otherwise, select all blogs
      setSelectedBlogs(blogs.map((blog) => blog.id));
    }
  };

  const toggleExpand = (blogId) => {
    setExpandedBlogs((prev) => ({ ...prev, [blogId]: !prev[blogId] }));
  };

  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");

  const sortBlogs = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    const sortedBlogs = [...blogs].sort((a, b) => {
      const aField = a[field];
      const bField = b[field];
      if (aField < bField) return order === "asc" ? -1 : 1;
      if (aField > bField) return order === "asc" ? 1 : -1;
      return 0;
    });
    setBlogs(sortedBlogs);
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <>
      <div className="w-full px-4">
        <p className="text-white h-10 text-center font-bold">
          Total Blogs Posted:{" "}
          <span className="font-bold text-orange-400">{blogs.length}</span>
        </p>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[68vh] min-h-[68vh] overflow-y-auto">
          <table className="w-full text-sm text-left bg-[#f9f7ec] table-auto">
            <thead className="text-xs text-gray-200 uppercase bg-gray-600 sticky top-0">
              <tr>
                <th scope="col" className="px-2 py-3">
                  <input
                    type="checkbox"
                    onChange={() => handleSelectAll()}
                    checked={selectedBlogs.length === blogs.length}
                  />
                </th>
                <th
                  scope="col"
                  className="px-2 py-3"
                  onClick={() => sortBlogs("title")}
                >
                  Title{" "}
                  {sortField === "title"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th
                  scope="col"
                  className="px-2 py-3"
                  onClick={() => sortBlogs("category")}
                >
                  Category{" "}
                  {sortField === "category"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th scope="col" className="px-2 py-3">
                  Image
                </th>
                <th
                  scope="col"
                  className="px-2 py-3"
                  onClick={() => sortBlogs("content")}
                >
                  Content{" "}
                  {sortField === "content"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th
                  scope="col"
                  className="px-2 py-3"
                  onClick={() => sortBlogs("createdAt")}
                >
                  Date{" "}
                  {sortField === "createdAt"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th scope="col" className="px-2 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No blogs posted yet.
                  </td>
                </tr>
              ) : (
                currentBlogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="border-b last:border-0 my-3 p-3 text-gray-700"
                  >
                    <td className="px-2 py-4">
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(blog.id)}
                        checked={selectedBlogs.includes(blog.id)}
                      />
                    </td>
                    <th className="px-2 py-4 w-52">{blog.title}</th>
                    <td className="px-2 py-4 truncate w-max">
                      {blog.category}
                    </td>
                    <td className="px-2 py-4 truncate w-max">
                      <img className="h-20" src={blog.image} alt="Blog" />
                    </td>
                    <td className="px-2 py-4 break-words w-2/5">
                      {blog.content.length > 30 ? (
                        <>
                          {expandedBlogs[blog.id] ? (
                            <div
                              className="whitespace-pre-wrap"
                              dangerouslySetInnerHTML={{ __html: blog.content }}
                            />
                          ) : (
                            <p
                              className="mt-1 text-gray-600"
                              dangerouslySetInnerHTML={{
                                __html:
                                  blog.content
                                    .split(". ")
                                    .slice(0, 1)
                                    .join(". ") + ".",
                              }}
                            ></p>
                          )}
                          <button
                            onClick={() => toggleExpand(blog.id)}
                            className="mt-2 text-[#6f6b2a] font-bold text-sm"
                          >
                            {expandedBlogs[blog.id] ? "Collapse" : "Expand"}
                          </button>
                        </>
                      ) : (
                        <p
                          className="mt-1 text-gray-600"
                          dangerouslySetInnerHTML={{
                            __html:
                              blog.content.split(". ").slice(0, 2).join(". ") +
                              ".",
                          }}
                        ></p>
                      )}
                    </td>
                    <td className="px-2 py-4">
                      {blog.createdAt.toDate().toLocaleDateString()}
                    </td>
                    <td className="px-2 py-4 flex gap-2">
                      <button
                        onClick={() => {
                          setBlogToDelete(blog.id);
                          setIsBulkDelete(false);
                          setIsDeleteModalOpen(true);
                        }}
                        className="font-medium text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4 gap-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-gray-600 text-white"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
          {/* Bulk Delete Button */}
          {selectedBlogs.length > 0 && (
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setIsBulkDelete(true);
                  setIsDeleteModalOpen(true);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete Selected
              </button>
            </div>
          )}
          <button
            className="px-1 py-1 rounded bg-[#f9f7ec] hover:bg-[#e5deb1]"
            onClick={toggleModal}
          >
            <img
              width="34"
              height="34"
              src="https://img.icons8.com/3d-fluency/94/hand-with-pen--v2.png"
              alt="hand-with-pen--v2"
            />
          </button>
        </div>

        {/* Modal for new blog */}
        {isModalOpen && (
          <div className="bg-white p-6 rounded-lg shadow-lg w-full h-max sm:p-20">
            <form className="flex flex-col h-max" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row justify-between">
                <h2 className="text-xl text-black font-bold mb-4">
                  Write a New Blog
                </h2>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Post Blog
                  </button>
                </div>
              </div>
              <div className="mb-4 flex justify-center items-center gap-10">
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-xs w-full max-w-xs bg-white"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 rounded border border-gray-300"
                    style={{ maxWidth: "100%", maxHeight: "80px" }}
                  />
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Blog Title
                </label>
                <input
                  type="text"
                  className="text-black mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter blog title"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Blog Category
                </label>
                <select
                  className="text-black mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={blogCategory}
                  onChange={(e) => setBlogCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  <option value="Technology">Technology</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                  <option value="Health">Health</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Education">Education</option>
                  <option value="Travel">Travel</option>
                  <option value="Finance">Finance</option>
                  <option value="Food">Food</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Sports">Sports</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Photography">Photography</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Music">Music</option>
                  <option value="Parenting">Parenting</option>
                  <option value="Art">Art</option>
                  <option value="DIY">DIY</option>
                  <option value="Home Improvement">Home Improvement</option>
                  <option value="Nature">Nature</option>
                  <option value="Science">Science</option>
                  <option value="Politics">Politics</option>
                  <option value="History">History</option>
                  <option value="Culture">Culture</option>
                  <option value="Relationships">Relationships</option>
                  <option value="Self-Improvement">Self-Improvement</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Cryptocurrency">Cryptocurrency</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Nonprofit">Nonprofit</option>
                  <option value="Tech Reviews">Tech Reviews</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Cryptography">Cryptography</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Artificial Intelligence">
                    Artificial Intelligence
                  </option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Blockchain">Blockchain</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Travel Tips">Travel Tips</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Mindfulness">Mindfulness</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Local News">Local News</option>
                  <option value="Global Issues">Global Issues</option>
                  <option value="Humor">Humor</option>
                  <option value="Motivation">Motivation</option>
                  <option value="Quotes">Quotes</option>
                  <option value="Survival Skills">Survival Skills</option>
                  <option value="Collectibles">Collectibles</option>
                  <option value="Home Decor">Home Decor</option>
                  <option value="Life Hacks">Life Hacks</option>
                  <option value="Pet Care">Pet Care</option>
                  <option value="Gardening">Gardening</option>
                  <option value="Philosophy">Philosophy</option>
                </select>
              </div>

              <div className="flex-grow mb-4 max-h-[400px]">
                {/* Parent div for the editor */}
                <label className="block text-sm font-medium text-gray-700">
                  Content
                </label>

                {/* Toolbar Container */}
                <div
                  id="toolbar-container"
                  className="rounded bg-gray-100 p-2 mb-4"
                >
                  {/* Text formatting options */}
                  <button className="ql-bold" />
                  <button className="ql-italic" />
                  <button className="ql-underline" />

                  {/* Lists */}
                  <button className="ql-list" value="ordered" />
                  <button className="ql-list" value="bullet" />

                  {/* Headers */}
                  <select className="ql-header">
                    <option value="1">H1</option>
                    <option value="2">H2</option>
                    <option value="" selected>
                      Normal
                    </option>
                  </select>

                  {/* Alignment */}
                  <select className="ql-align" />

                  {/* Blockquote */}
                  <button className="ql-blockquote" />

                  {/* Code Block */}
                  <button className="ql-code-block" />

                  {/* Color */}
                  <select className="ql-color" />
                  <select className="ql-background" />

                  {/* Link, Image, Video */}
                  <button className="ql-link" />
                  <button className="ql-image" />
                  <button className="ql-video" />

                  {/* Clear formatting */}
                  <button className="ql-clean" />
                </div>

                {/* Editor Container */}
                <div className="rounded h-max bg-white">
                  <ReactQuill
                    value={blogContent}
                    onChange={handleContentChange}
                    placeholder="Write your blog here..."
                    modules={{
                      toolbar: {
                        container: "#toolbar-container", // Linking the toolbar container to the editor
                      },
                    }}
                    formats={Blog.formats} // Ensuring correct formats are allowed
                    className="text-black"
                    style={{
                      minHeight: "200px", // Set min height for the editor
                      maxHeight: "400px", // Set max height
                      overflowY: "auto", // Enable scrolling for overflow content
                      zIndex: 1, // Ensure proper stacking
                    }}
                  />
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Toast for deletion result */}
        {showToast && (
          <div className="fixed bottom-4 right-4 toast">
            <div className="alert alert-success">
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <p className="text-black text-lg font-bold">
                {isBulkDelete
                  ? "Are you sure you want to delete the selected blogs?"
                  : "Are you sure you want to delete this blog?"}
              </p>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Quill modules to include the toolbar with formatting options
Blog.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }, { size: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ indent: "-1" }, { indent: "+1" }, { blockquote: "blockquote" }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

// Quill formats that you are allowing users to use
Blog.formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "align",
  "color",
  "background",
  "link",
  "image",
  "video",
  "blockquote",
  "code-block",
];

export default Blog;
