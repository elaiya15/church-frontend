import React, { useState } from "react";
import { IoIosEye } from "react-icons/io";
import Spinners from "../Spinners";
import Pagination from "../Helpers/Pagination";
import moment from "moment";
import DetailModal from "../Expense/detailsModal";


export default function OfferingTable({ offerings, loading, Data}) {
  
const tableHeading = [
  "SI.No.",
  !Data ? "Member ID" : null, 
  !Data ? "Member Name" : "Name", 
  "Date",
  "Amount",
  "Description",
].filter(Boolean); // Filter out any null values

console.log(tableHeading);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to handle click on eye icon
  const handleShowDetails = (member) => {
    setSelectedMember(member); // Set the selected member for the modal
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  function truncateWords(text, numWords) {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= numWords) return text;
    return words.slice(0, numWords).join(" ") + "...";
  }

  if (loading) {
    return <Spinners />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full mt-8">
        <thead className=" ">
          <tr>
            {tableHeading?.map((heading) => (
              <th className="p-2 font-bold text-left" key={heading}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {offerings?.length > 0 ? (
            offerings?.map((member, index) => (
              <tr
                key={member._id}
                className="border-t border-gray-200 cursor-pointer"
                onClick={() => handleShowDetails(member)}
              >
                <td className="p-2 py-3 text-gray-700 text-left">
                  0{index + 1}
                </td>
                <td className={`p-2 text-gray-700 text-left ${Data ? 'hidden' : ''}`}>
  {member.member_id}
</td>
                <td className="p-2 text-gray-700 text-left">
                  {member.member_name}
                  
                </td>
                <td className="p-2 text-gray-700 text-left">
                  {moment(new Date(member?.date)).format("DD-MM-YYYY")}
                </td>
                <td className="p-2 text-gray-700 text-left">{member.amount}</td>
                {member?.description ? (
                  <td className="p-2 text-gray-700 text-left">
                    {truncateWords(member.description, 3)}
                  </td>
                ) : (
                  <td className="p-2 text-gray-700 text-left">Nil</td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="p-2 text-gray-700 text-center"
                colSpan={tableHeading.length}
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <DetailModal isOpen={isModalOpen} onClose={handleCloseModal}>
        {isLoading ? (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 animate-pulse">
              <span className="font-medium break-words bg-gray-300 h-6 w-20 rounded"></span>
              <span className="text-gray-600 break-words bg-gray-300 h-6 w-40 rounded"></span>
            </div>
            <div className="grid grid-cols-2 animate-pulse">
              <span className="break-words bg-gray-300 h-6 w-20 rounded"></span>
              <span className="text-gray-600 break-words bg-gray-300 h-6 w-40 rounded"></span>
            </div>
            <div className="grid grid-cols-2 animate-pulse">
              <span className="break-words bg-gray-300 h-6 w-20 rounded"></span>
              <span className="text-gray-600 break-words bg-gray-300 h-6 w-40 rounded"></span>
            </div>
            <div className="grid grid-cols-2 animate-pulse">
              <span className="break-words bg-gray-300 h-6 w-20 rounded"></span>
              <span className="text-gray-600 break-words bg-gray-300 h-6 w-40 rounded"></span>
            </div>
            <div className="animate-pulse bg-gray-300 h-48 w-full rounded"></div>
          </div>
        ) : selectedMember ? (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2">
              <span className="font-medium break-words">Date</span>
              <span className="text-gray-600 break-words">
                {moment(new Date(selectedMember?.date)).format("DD-MM-YYYY")}
              </span>
            </div>
            <div className="grid grid-cols-2">
              <span className="break-words">Category</span>
              <span className="text-gray-600 break-words">
                {selectedMember.category}
              </span>
            </div>
            <div className="grid grid-cols-2">
              <span className="break-words">Amount</span>
              <span className="text-gray-600 break-words">
                ₹ {selectedMember.amount}
              </span>
            </div>
            <div className="grid grid-cols-2">
              <span className="break-words">Description</span>
              <span className="text-gray-600 break-words">
                {selectedMember.description}
              </span>
            </div>
            {/* {selectedMember.image && (
              <ImageRenderer imageBuffer={selectedMember.image} />
            )} */}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <p>No details available</p>
          </div>
        )}
      </DetailModal>
    </div>
  );
}