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
} from "../firebase/firestoreQueries";
import Photo from "../assets/photo.webp";

const ProfilePic = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

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

    if (!imagePreview) {
      alert("Please select an image.");
      return;
    }

    try {
      const profilePicCollection = collection(db, "profilepic");

      // Step 1: Get all documents in the profilepic collection
      const querySnapshot = await getDocs(profilePicCollection);

      // Step 2: Delete each document in the collection
      const deletePromises = querySnapshot.docs.map((docSnapshot) =>
        deleteDoc(doc(db, "profilepic", docSnapshot.id))
      );

      // Wait for all deletions to complete
      await Promise.all(deletePromises);

      // Step 3: Add new image to the collection
      await addDoc(profilePicCollection, {
        image: imagePreview,
        createdAt: new Date(),
      });

      setImagePreview(null);
      alert("Profile pic updated successfully!");
    } catch (error) {
      console.error("Error updating profile pic: ", error);
      alert("Failed to update profile pic.", error);
    }
  };

  return (
    <div className="rounded-lg bg-[#f9f7ec] px-3 sm:px-10 py-5">
      <h1 className="text-black font-bold">Profile Picture</h1>
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
            <button
              type="submit"
              className="bg-orange-400 text-black px-5 h-10 rounded-lg"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const ProfileSummary = () => {
  const [profilesummary, setProfilesummary] = useState("");
  const [loadprofilesummary, setLoadprofilesummary] = useState("");
  const handleSubmitProfileSummary = async (event) => {
    event.preventDefault();

    // Ensure that profile summary is not empty before submission
    if (!profilesummary.trim()) {
      alert("Please enter a profile summary.");
      return;
    }

    try {
      const profileSummaryCollection = collection(db, "profilesummary");

      // Step 1: Get all documents in the profilesummary collection
      const querySnapshot = await getDocs(profileSummaryCollection);

      // Step 2: Check if the collection is not empty and delete each document
      if (!querySnapshot.empty) {
        const deletePromises = querySnapshot.docs.map((docSnapshot) =>
          deleteDoc(doc(db, "profilesummary", docSnapshot.id))
        );

        // Wait for all deletions to complete
        await Promise.all(deletePromises);
      }

      // Step 3: Add the new profile summary to the collection
      await addDoc(profileSummaryCollection, {
        summary: profilesummary.trim(), // Store the profile summary text
        createdAt: new Date(), // Save the current date and time
      });

      // Clear the input and alert success
      setProfilesummary(""); // Clear the input field
      alert("Profile summary updated successfully!");
    } catch (error) {
      console.error("Error updating profile summary: ", error);
      alert("Failed to update profile summary.");
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
      <h1 className="text-black font-bold">Profile Summary</h1>
      <p className="text-black bg-gray-200 p-3 rounded-lg my-3">
        <span className="text-orange-400">Current Profile Summary</span>
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
        <button className="w-full my-3 bg-orange-400 text-black px-5 h-10 rounded-lg">
          Save
        </button>
      </form>
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
    </div>
  );
};

export default Profile;
