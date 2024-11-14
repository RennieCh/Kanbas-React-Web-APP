import { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import GrayCheckmark from "./GrayCheckmark";

// Define the type for the component props
interface SingleQuizButtonsProps {
  isAvailable: boolean;
}

export default function SingleQuizButtons({ isAvailable }: SingleQuizButtonsProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  // Toggle the dropdown menu visibility
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className="float-end position-relative">
      {/* Conditionally render the checkmark based on availability */}
      {isAvailable ? <GreenCheckmark /> : <GrayCheckmark />}

      {/* Dropdown Trigger */}
      <IoEllipsisVertical
        className="fs-4 dropdown-toggle"
        style={{ cursor: "pointer" }}
        onClick={toggleDropdown}
      />

      {/* Dropdown Menu */}
      {showDropdown && (
        <ul className="dropdown-menu show position-absolute end-0 mt-2">
          <li className="dropdown-item" onClick={() => alert("Edit clicked")}>
            Edit
          </li>
          <li className="dropdown-item" onClick={() => alert("Delete clicked")}>
            Delete
          </li>
          <li className="dropdown-item" onClick={() => alert("Publish clicked")}>
            Publish
          </li>
          <li className="dropdown-item" onClick={() => alert("Copy clicked")}>
            Copy
          </li>
          <li className="dropdown-item" onClick={() => alert("Sort clicked")}>
            Sort
          </li>
        </ul>
      )}
    </div>
  );
}
