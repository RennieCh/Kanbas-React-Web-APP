import { useState, useEffect } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import GrayCheckmark from "./GrayCheckmark";
import { useNavigate } from "react-router-dom";
import { fetchQuizById, deleteQuiz, updateQuiz, createQuiz} from "./client";

// Define the type for the component props
interface SingleQuizButtonsProps {
  isAvailable: boolean;
  quizId: string;
  onQuizChange: () => void; // Callback to notify parent of changes
}

export default function SingleQuizButtons({ isAvailable, quizId, onQuizChange }: SingleQuizButtonsProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [quiz, setQuiz] = useState<any>(null);
  const navigate = useNavigate();

  // Fetch the quiz from the backend
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const fetchedQuiz = await fetchQuizById(quizId);
        setQuiz(fetchedQuiz);
      } catch (error) {
        console.error("Failed to fetch quiz:", error);
      }
    };
    fetchQuiz();
  }, [quizId]);

  // Toggle the dropdown menu visibility
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  // Handle the "Edit" action
  const handleEdit = () => {
    if (quiz) {
      navigate(`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}/edit`);
    }
  };

  // Handle the "Delete" action
  const handleDelete = async () => {
    if (quiz) {
      try {
        await deleteQuiz(quiz._id);
        onQuizChange(); // Notify parent to refresh the list
      } catch (error) {
        console.error("Failed to delete quiz:", error);
      }
    }
  };

  // Handle the "Publish/Unpublish" action
  const handleTogglePublish = async () => {
    if (quiz) {
      try {
        const updatedQuiz = { ...quiz, published: !quiz.published };
        await updateQuiz(updatedQuiz._id, updatedQuiz);
        setQuiz(updatedQuiz);
        onQuizChange(); // Notify parent to refresh the list
      } catch (error) {
        console.error("Failed to update quiz:", error);
      }
    }
  };

  // Handle the "Copy" action
  const handleCopy = async () => {
    if (quiz) {
      try {
        const newQuiz = {
          ...quiz,
          _id: new Date().getTime().toString(), // Generate a new unique ID
          title: `${quiz.title} (Copy)`
        };
        await createQuiz(newQuiz);
        onQuizChange(); // Notify parent to refresh the list
      } catch (error) {
        console.error("Failed to copy quiz:", error);
      }
    }
  };

  return (
    <div className="float-end position-relative">
      {/* Conditionally render the checkmark based on availability */}
      {isAvailable? <GreenCheckmark /> : <GrayCheckmark />}

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
