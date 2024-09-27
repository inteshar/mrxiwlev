import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

// Fetch all contacts from the "contacts" Firestore collection
const fetchContacts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "contacts"));
    const contacts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error; // Optionally throw the error to be handled elsewhere
  }
};

// Fetch all blogs from the "blogs" Firestore collection
const fetchBlogs = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    const blogs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error; // Optionally throw the error to be handled elsewhere
  }
};

// Fetch a single blog by ID
const fetchBlogById = async (id) => {
  const blogRef = doc(db, "blogs", id); // Use doc to reference the document
  const docSnap = await getDoc(blogRef); // Fetch the document snapshot
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null; // Return data if it exists
};

export { fetchContacts, fetchBlogs, fetchBlogById };
