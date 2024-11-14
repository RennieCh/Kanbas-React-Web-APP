import { FaPlus } from "react-icons/fa6";
import SearchInput from "./SearchInput";
import { IoEllipsisVertical } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


export default function QuizzesControls() {
    const navigate = useNavigate();


    // Function to handle navigation to the Quiz Details screen
    const handleAddQuiz = () => {
            navigate(`/Kanbas/Courses/1234/Quizzes/123`);
    };

    return (
        <div id="wd-assignments-controls" className="text-nowrap">
            <button id="wd-assignment-group" className="btn btn-lg btn-secondary me-1 float-end"
                type="button">
                <IoEllipsisVertical className="fs-4" style={{ cursor: "pointer" }} />
            </button>
            <button id="wd-add-assignment-btn" className="btn btn-lg btn-danger me-1 float-end"
            onClick={handleAddQuiz}>
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Quiz
            </button>
            <SearchInput />
        </div>
    );
}