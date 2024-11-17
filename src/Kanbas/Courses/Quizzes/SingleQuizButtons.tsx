import { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import GrayCheckmark from "./GrayCheckmark";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteQuiz, updateQuiz, addQuiz } from "./reducer";

// Define the type for the component props
interface SingleQuizButtonsProps {
  isAvailable: boolean;
  quizId: string;
}

export default function SingleQuizButtons({ isAvailable, quizId }: SingleQuizButtonsProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get quizzes from the Redux store
  const quizzes = useSelector((state) => (state as any).quizzesReducer.quizzes);

  // Find the specific quiz in the Redux store
  const quiz = quizzes.find((q: any) => q._id === quizId);

  // Toggle the dropdown menu visibility
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  // Handle the "Edit" action
  const handleEdit = () => {
    if (quiz) {
      navigate(`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}/edit`);
    }
  };

  // Handle the "Delete" action
  const handleDelete = () => {
    if (quiz) {
      dispatch(deleteQuiz(quiz._id));
    }
  };

  // Handle the "Publish/Unpublish" action
  const handleTogglePublish = () => {
    if (quiz) {
      dispatch(updateQuiz({ ...quiz, published: !quiz.published }));
    }
  };

  // Handle the "Copy" action
  const handleCopy = () => {
    if (quiz) {
      const newQuiz = {
        ...quiz,
        _id: new Date().getTime().toString(), // Generate a new unique ID
        title: `${quiz.title} (Copy)`,
      };
      dispatch(addQuiz(newQuiz));
    }
  };

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
          <li className="dropdown-item" onClick={handleEdit}>
            Edit
          </li>
          <li className="dropdown-item" onClick={handleDelete}>
            Delete
          </li>
          <li className="dropdown-item" onClick={handleTogglePublish}>
            {quiz?.published ? "Unpublish" : "Publish"}
          </li>
          <li className="dropdown-item" onClick={handleCopy}>
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
