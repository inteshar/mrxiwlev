import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  fetchProfilePic,
  fetchProfileSummary,
  fetchExp,
} from "../firebase/firestoreQueries";
import Photo from "../assets/photo.png";
import { Loader } from "lucide-react";

const ProfilePic = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleSubmitProfilePic = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!imagePreview) {
      alert("Please select an image.");
      setLoading(false);
      return;
    }

    try {
      const profilePicCollection = collection(db, "profilepic");

      const querySnapshot = await getDocs(profilePicCollection);

      const deletePromises = querySnapshot.docs.map((docSnapshot) =>
        deleteDoc(doc(db, "profilepic", docSnapshot.id))
      );

      await Promise.all(deletePromises);

      await addDoc(profilePicCollection, {
        image: imagePreview,
        createdAt: new Date(),
      });

      setImagePreview(null);
      setLoading(false);
      alert("Profile pic updated successfully!");
    } catch (error) {
      console.error("Error updating profile pic: ", error);
      alert("Failed to update profile pic.", error);
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg bg-[#f9f7ec] px-3 sm:px-10 py-5">
      <h1 className="text-black font-bold border-s-4 border-orange-400 ps-3">
        Profile Picture
      </h1>
      <div className="flex gap-10 sm:flex-row flex-col">
        <div className="flex flex-col sm:w-1/6 items-center p-2 my-2">
          <img
            src={profilePic ? profilePic : Photo}
            alt="Profile Picture"
            className="object-cover rounded-lg h-60"
          />
          <h2 className="text-gray-400">Current Profile Picture</h2>
        </div>
        <div className="flex flex-col justify-center sm:w-5/6 items-center p-2 my-2">
          <form
            onSubmit={handleSubmitProfilePic}
            className="flex sm:flex-row flex-col items-center gap-10 w-full"
          >
            <div className="mb-4 flex sm:flex-row flex-col justify-evenly items-center gap-10 w-full">
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs bg-white"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              <h2 className="text-gray-400">
                Replace with a new Profile Picture
              </h2>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="rounded border border-gray-300"
                  style={{ maxWidth: "100%", maxHeight: "80px" }}
                />
              )}
            </div>
            {loading ? (
              <div className="bg-orange-400 text-black px-5 h-10 w-20 rounded-lg flex justify-center items-center">
                <Loader className="animate-spin" />
              </div>
            ) : (
              <button
                type="submit"
                className="bg-orange-400 text-black px-5 h-10 rounded-lg"
              >
                Confirm
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

const ProfileSummary = () => {
  const [profilesummary, setProfilesummary] = useState("");
  const [loadprofilesummary, setLoadprofilesummary] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmitProfileSummary = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!profilesummary.trim()) {
      alert("Please enter a profile summary.");
      return;
    }

    try {
      const profileSummaryCollection = collection(db, "profilesummary");

      const querySnapshot = await getDocs(profileSummaryCollection);

      if (!querySnapshot.empty) {
        const deletePromises = querySnapshot.docs.map((docSnapshot) =>
          deleteDoc(doc(db, "profilesummary", docSnapshot.id))
        );

        await Promise.all(deletePromises);
      }

      await addDoc(profileSummaryCollection, {
        summary: profilesummary.trim(),
        createdAt: new Date(),
      });

      setProfilesummary("");
      setLoading(false);
      alert("Profile summary updated successfully!");
    } catch (error) {
      console.error("Error updating profile summary: ", error);
      alert("Failed to update profile summary.");
      setLoading(false);
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
    <div className="my-6 rounded-lg bg-[#f9f7ec] px-3 sm:px-10 py-5">
      <h1 className="text-black font-bold border-s-4 border-orange-400 ps-3">
        Profile Summary
      </h1>
      <p className="text-black bg-gray-200 p-3 rounded-lg my-3">
        <span className="text-orange-400 font-bold">
          Current Profile Summary
        </span>
        <br />
        {loadprofilesummary}
      </p>
      <form onSubmit={handleSubmitProfileSummary} className="w-full">
        <textarea
          className="textarea textarea-bordered text-black w-full bg-white border-gray-400"
          placeholder="Write your new profile summary here..."
          onChange={(e) => setProfilesummary(e.target.value)}
          value={profilesummary}
        ></textarea>
        {loading ? (
          <div className="w-full my-3 bg-orange-400 text-black px-5 h-10 w-20 rounded-lg flex justify-center items-center">
            <Loader className="animate-spin" />
          </div>
        ) : (
          <button className="w-full my-3 bg-orange-400 text-black px-5 h-10 rounded-lg">
            Confirm
          </button>
        )}
      </form>
    </div>
  );
};

const Experience = () => {
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [address, setAddress] = useState("");
  const [rolesResponsibilities, setRolesResponsibilities] = useState("");
  const [exp, setExp] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleExperienceSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (
      !position ||
      !company ||
      !dateFrom ||
      !address ||
      !companyUrl ||
      !rolesResponsibilities
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const experiencesCollection = collection(db, "experiences");
      await addDoc(experiencesCollection, {
        position: position,
        company: company,
        dateFrom: new Date(dateFrom),
        dateTo: dateTo ? new Date(dateTo) : "Present",
        address: address,
        rolesResponsibilities: rolesResponsibilities,
        url: companyUrl,
        createdAt: new Date(),
      });

      alert("Experience added successfully!");
      setLoading(false);
      setPosition("");
      setCompany("");
      setCompanyUrl("");
      setDateFrom("");
      setDateTo("");
      setAddress("");
      setRolesResponsibilities("");
    } catch (error) {
      console.error("Error adding experience: ", error);
      alert("Failed to add experience.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadExp = async () => {
      try {
        const fetchedExp = await fetchExp();
        console.log(fetchedExp);
        setExp(fetchedExp);
      } catch (error) {
        console.error("Failed to load experience:", error);
      }
    };

    loadExp();
  }, []);

  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");

  const sortExp = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    const sortedExp = [...exp].sort((a, b) => {
      const aField = a[field];
      const bField = b[field];
      if (aField < bField) return order === "asc" ? -1 : 1;
      if (aField > bField) return order === "asc" ? 1 : -1;
      return 0;
    });
    setExp(sortedExp);
    setSortField(field);
    setSortOrder(order);
  };

  const [expandedRows, setExpandedRows] = useState([]);
  const [selectedExperiences, setSelectedExperiences] = useState([]);

  // Toggle row expansion to show/hide roles & responsibilities
  const toggleRowExpansion = (id) => {
    setExpandedRows((prevState) =>
      prevState.includes(id)
        ? prevState.filter((rowId) => rowId !== id)
        : [...prevState, id]
    );
  };

  // Toggle selection of a single experience
  const toggleExperienceSelection = (id) => {
    setSelectedExperiences((prevState) =>
      prevState.includes(id)
        ? prevState.filter((expId) => expId !== id)
        : [...prevState, id]
    );
  };

  // Toggle selection of all experiences
  const toggleSelectAll = () => {
    if (selectedExperiences.length === exp.length) {
      setSelectedExperiences([]); // Deselect all
    } else {
      const allIds = exp.map((experience) => experience.id);
      setSelectedExperiences(allIds); // Select all
    }
  };

  // Delete selected experiences with confirmation
  const deleteSelectedExperiences = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete the selected experiences?"
      )
    ) {
      try {
        for (const id of selectedExperiences) {
          await deleteDoc(doc(db, "experiences", id));
        }
        // Remove deleted experiences from state
        const remainingExp = exp.filter(
          (experience) => !selectedExperiences.includes(experience.id)
        );
        setExp(remainingExp);
        setSelectedExperiences([]); // Clear selection after deletion
        alert("Selected experiences deleted successfully!");
      } catch (error) {
        console.error("Error deleting experience:", error);
        alert("Failed to delete selected experiences.");
      }
    }
  };

  return (
    <div className="my-6 rounded-lg bg-[#f9f7ec] px-3 sm:px-10 py-5">
      <p className="text-black font-bold border-s-4 border-orange-400 ps-3">
        Professional Experience
      </p>
      <div className="py-3 flex flex-col sm:flex-row gap-3 w-full h-auto sm:h-full">
        <form
          onSubmit={handleExperienceSubmit}
          className="mt-3 w-full sm:w-2/6 flex flex-col gap-3 text-black min-h-full sm:flex-grow"
        >
          <div className="flex flex-col w-full">
            <p className="text-xs font-bold">Position</p>
            <input
              type="text"
              placeholder="Position"
              className="input input-bordered w-full bg-white border-gray-400 text-black"
              onChange={(e) => setPosition(e.target.value)}
              value={position}
              required
            />
          </div>
          <div className="flex flex-col">
            <p className="text-xs font-bold">Company</p>
            <input
              type="text"
              placeholder="Company"
              className="input input-bordered w-full bg-white border-gray-400 text-black"
              onChange={(e) => setCompany(e.target.value)}
              value={company}
              required
            />
          </div>
          <div className="flex flex-col">
            <p className="text-xs font-bold">Company URL</p>
            <input
              type="text"
              placeholder="Company URL"
              className="input input-bordered w-full bg-white border-gray-400 text-black"
              onChange={(e) => setCompanyUrl(e.target.value)}
              value={companyUrl}
              required
            />
          </div>
          <div className="flex gap-3">
            <div className="w-2/4 flex flex-col">
              <p className="text-xs font-bold">From</p>
              <input
                type="date"
                placeholder="Date From"
                className="input input-bordered w-full bg-white border-gray-400 text-black"
                onChange={(e) => setDateFrom(e.target.value)}
                value={dateFrom}
                required
              />
            </div>
            <div className="w-2/4 flex flex-col">
              <p className="text-xs font-bold">To</p>
              <input
                type="date"
                placeholder="Date To"
                className="input input-bordered w-full bg-white border-gray-400 text-black"
                onChange={(e) => setDateTo(e.target.value)}
                value={dateTo}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-xs font-bold">Address</p>
            <input
              type="text"
              placeholder="Address"
              className="input input-bordered w-full bg-white border-gray-400 text-black"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              required
            />
          </div>
          <div className="flex flex-col">
            <p className="text-xs font-bold">Roles & Responsibilities</p>
            <textarea
              className="textarea textarea-bordered w-full bg-white border-gray-400 text-black"
              onChange={(e) => setRolesResponsibilities(e.target.value)}
              value={rolesResponsibilities}
              required
              placeholder="Roles & Responsibilities"
            ></textarea>
          </div>
          {loading ? (
            <div className="w-full my-3 bg-orange-400 text-black px-5 h-10 rounded-lg flex justify-center items-center">
              <Loader className="animate-spin" />
            </div>
          ) : (
            <button className="w-full my-3 bg-orange-400 text-black px-5 h-10 rounded-lg">
              Confirm
            </button>
          )}
        </form>

        <div className="overflow-x-auto overflow-y-auto w-full sm:w-4/6 min-h-full sm:flex-grow">
          <table className="table">
            <thead className="text-black bg-gray-200">
              <tr>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox border-gray-400"
                      checked={selectedExperiences.length === exp.length}
                      onChange={toggleSelectAll}
                    />
                  </label>
                </th>
                <th
                  onClick={() => sortExp("position")}
                  className="cursor-pointer"
                >
                  Position{" "}
                  {sortField === "position"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th
                  onClick={() => sortExp("company")}
                  className="cursor-pointer"
                >
                  Company{" "}
                  {sortField === "company"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th
                  onClick={() => sortExp("dateFrom")}
                  className="cursor-pointer"
                >
                  From{" "}
                  {sortField === "dateFrom"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th
                  onClick={() => sortExp("dateTo")}
                  className="cursor-pointer"
                >
                  To{" "}
                  {sortField === "dateTo"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th
                  onClick={() => sortExp("address")}
                  className="cursor-pointer"
                >
                  Address{" "}
                  {sortField === "address"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th onClick={() => sortExp("url")} className="cursor-pointer">
                  URL{" "}
                  {sortField === "url" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th
                  onClick={() => sortExp("rolesResponsibilities")}
                  className="cursor-pointer"
                >
                  Roles & Responsibilities{" "}
                  {sortField === "rolesResponsibilities"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
              </tr>
            </thead>
            <tbody className="text-black">
              {exp.length > 0 ? (
                exp.map((experience) => (
                  <React.Fragment key={experience.id}>
                    <tr>
                      <th>
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox border-gray-400"
                            checked={selectedExperiences.includes(
                              experience.id
                            )}
                            onChange={() =>
                              toggleExperienceSelection(experience.id)
                            }
                          />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="font-bold">{experience.position}</div>
                        </div>
                      </td>
                      <td>{experience.company}</td>
                      <td>
                        {new Date(
                          experience.dateFrom.seconds * 1000
                        ).toLocaleDateString()}
                      </td>
                      <td>
                        {
                          typeof experience.dateTo === "string"
                            ? experience.dateTo // If dateTo is "Present", show it directly
                            : new Date(
                                experience.dateTo.seconds * 1000
                              ).toLocaleDateString() // Otherwise, format the Firestore timestamp
                        }
                      </td>
                      <td>{experience.address}</td>
                      <td>
                        <a
                          href={experience.url}
                          target="_blank"
                          className="text-blue-500 hover:underline duration-300"
                        >
                          {experience.company}
                        </a>
                      </td>
                      <td>
                        <button
                          className="btn btn-link text-blue-500"
                          onClick={() => toggleRowExpansion(experience.id)}
                        >
                          {expandedRows.includes(experience.id)
                            ? "Hide"
                            : "Show"}{" "}
                          Details
                        </button>
                      </td>
                    </tr>
                    {/* Expandable Row for Roles & Responsibilities */}
                    {expandedRows.includes(experience.id) && (
                      <tr>
                        <td colSpan="8" className="bg-gray-100 p-3">
                          <strong>Roles & Responsibilities:</strong>
                          <p>{experience.rolesResponsibilities}</p>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No experiences found
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className="text-black bg-gray-200">
              <tr>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox border-gray-400"
                      checked={selectedExperiences.length === exp.length}
                      onChange={toggleSelectAll}
                    />
                  </label>
                </th>
                <th
                  onClick={() => sortExp("position")}
                  className="cursor-pointer"
                >
                  Position{" "}
                  {sortField === "position"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th
                  onClick={() => sortExp("company")}
                  className="cursor-pointer"
                >
                  Company{" "}
                  {sortField === "company"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th
                  onClick={() => sortExp("dateFrom")}
                  className="cursor-pointer"
                >
                  From{" "}
                  {sortField === "dateFrom"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th
                  onClick={() => sortExp("dateTo")}
                  className="cursor-pointer"
                >
                  To{" "}
                  {sortField === "dateTo"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th
                  onClick={() => sortExp("address")}
                  className="cursor-pointer"
                >
                  Address{" "}
                  {sortField === "address"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th onClick={() => sortExp("url")} className="cursor-pointer">
                  URL{" "}
                  {sortField === "url" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th
                  onClick={() => sortExp("rolesResponsibilities")}
                  className="cursor-pointer"
                >
                  Roles & Responsibilities{" "}
                  {sortField === "rolesResponsibilities"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
              </tr>
            </tfoot>
          </table>
          {/* Button to delete selected experiences */}
          {selectedExperiences.length > 0 && (
            <button
              className="btn bg-red-500 text-white mt-3"
              onClick={deleteSelectedExperiences}
            >
              Delete Selected
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <div className="w-full px-3 sm:px-10">
      <p className="text-white h-10 text-center font-bold">
        Profile <span className="font-bold text-orange-400">Settings</span>
      </p>
      <ProfilePic />
      <ProfileSummary />
      <Experience />
    </div>
  );
};

export default Profile;
