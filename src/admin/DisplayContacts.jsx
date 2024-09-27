import React, { useEffect, useState } from "react";
import { fetchContacts } from "../firebase/firestoreQueries";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Sad from "../assets/sad.gif";

const DisplayContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [expandedMessages, setExpandedMessages] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false); // Track if bulk delete is being confirmed
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState(""); // State for toast message
  const [showToast, setShowToast] = useState(false); // State to show/hide toast
  const [selectedContacts, setSelectedContacts] = useState([]); // Track selected contacts for bulk delete
  const [selectAll, setSelectAll] = useState(false); // Track select all checkbox
  const contactsPerPage = 10;

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsData = await fetchContacts();
        const sortedContacts = contactsData.sort((a, b) => {
          return b.timestamp.toDate() - a.timestamp.toDate();
        });
        setContacts(sortedContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    getContacts();
  }, []);

  const handleDelete = async () => {
    if (contactToDelete && !isBulkDelete) {
      try {
        await deleteDoc(doc(db, "contacts", contactToDelete));
        setContacts(
          contacts.filter((contact) => contact.id !== contactToDelete)
        );
        setToastMessage("Contact deleted successfully!");
      } catch (error) {
        setToastMessage("Error deleting contact.");
      } finally {
        setIsModalOpen(false);
        setContactToDelete(null);
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
        selectedContacts.map((contactId) =>
          deleteDoc(doc(db, "contacts", contactId))
        )
      );
      setContacts(
        contacts.filter((contact) => !selectedContacts.includes(contact.id))
      );
      setSelectedContacts([]); // Clear selected contacts after deletion
      setToastMessage("Selected contacts deleted successfully!");
    } catch (error) {
      setToastMessage("Error deleting selected contacts.");
    } finally {
      setIsModalOpen(false); // Close modal
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  const toggleExpand = (id) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCheckboxChange = (contactId) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(currentContacts.map((contact) => contact.id));
    }
    setSelectAll(!selectAll);
  };

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  const totalPages = Math.ceil(contacts.length / contactsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedContacts([]); // Clear selection when changing pages
    setSelectAll(false); // Reset 'Select All' when changing pages
  };

  return (
    <>
      <div className="w-full px-4">
        <p className="text-white h-10 text-center font-bold">
          Total Contacts:{" "}
          <span className="font-bold text-orange-400">{contacts.length}</span>
        </p>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[68vh] min-h-[68vh] overflow-y-auto">
          <table className="w-full text-sm text-left bg-[#f9f7ec] table-auto">
            <thead className="text-xs text-gray-200 uppercase bg-gray-600 sticky top-0">
              <tr>
                <th scope="col" className="px-2 py-3">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th scope="col" className="px-2 py-3">
                  Name
                </th>
                <th scope="col" className="px-2 py-3">
                  Email
                </th>
                <th scope="col" className="px-2 py-3">
                  Subject
                </th>
                <th scope="col" className="px-2 py-3">
                  Message
                </th>
                <th scope="col" className="px-2 py-3">
                  Date
                </th>
                <th scope="col" className="px-2 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {currentContacts.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-4 text-white bg-[#1d232a]"
                  >
                    <img
                      src={Sad}
                      alt="Sad"
                      className="rounded-full h-40 w-40 mx-auto my-10 object-cover"
                    />
                    <p className="text-2xl font-bold">Nobody contacted you.</p>
                  </td>
                </tr>
              ) : (
                currentContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="border-b last:border-0 my-3 p-3 text-gray-700"
                  >
                    <td className="px-2 py-4">
                      <input
                        type="checkbox"
                        checked={selectedContacts.includes(contact.id)}
                        onChange={() => handleCheckboxChange(contact.id)}
                      />
                    </td>
                    <th
                      scope="row"
                      className="px-2 py-4 font-bold text-black break-words w-max"
                    >
                      {contact.fname} {contact.lname}
                    </th>
                    <td className="px-2 py-4 break-words w-max">
                      {contact.email}
                    </td>
                    <td className="px-2 py-4 truncate w-max">
                      {contact.subject}
                    </td>
                    <td className="px-2 py-4 break-words w-max">
                      {contact.message.length > 30 ? (
                        <>
                          {expandedMessages[contact.id] ? (
                            <p className="whitespace-pre-wrap">
                              {contact.message}
                            </p>
                          ) : (
                            <p className="whitespace-pre-wrap">{`${contact.message.substring(
                              0,
                              30
                            )}...`}</p>
                          )}
                          <button
                            onClick={() => toggleExpand(contact.id)}
                            className="mt-2 text-[#6f6b2a] font-bold text-sm"
                          >
                            {expandedMessages[contact.id]
                              ? "Collapse"
                              : "Expand"}
                          </button>
                        </>
                      ) : (
                        <p className="whitespace-pre-wrap">{contact.message}</p>
                      )}
                    </td>
                    <td className="px-2 py-4">
                      {new Date(contact.timestamp.toDate()).toLocaleString()}
                    </td>
                    <td className="px-2 py-4 flex gap-2">
                      <button
                        onClick={() => {
                          setContactToDelete(contact.id);
                          setIsBulkDelete(false); // Set to false for single deletion
                          setIsModalOpen(true);
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

        {/* Toast for deletion result */}
        {showToast && (
          <div className="fixed bottom-4 right-4 toast">
            <div className="alert alert-success">
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
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
          {selectedContacts.length > 0 && (
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setIsBulkDelete(true); // Set to true for bulk deletion
                  setIsModalOpen(true);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete Selected
              </button>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <p className="text-black text-lg font-bold">
                {isBulkDelete
                  ? "Are you sure you want to delete the selected contacts?"
                  : "Are you sure you want to delete this contact?"}
              </p>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
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

export default DisplayContacts;
