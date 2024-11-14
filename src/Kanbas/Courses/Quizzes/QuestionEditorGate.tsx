import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { quizzes } from "../../Database";

export default function QuestionEditorGate() {
    const navigate = useNavigate();
    const { cid, aid } = useParams<{ cid: string; aid: string }>(); // Get course ID and quiz ID from URL

    // Fetch the quiz based on the course ID and aid parameter
    const quiz = quizzes.find(q => q._id === aid && q.course === cid);

    // Handle the case where the quiz is not found
    if (!quiz) {
        return (
            <div className="container mt-5">
                <h4 className="text-danger">Quiz not found!</h4>
                <p>Please check if the course and quiz IDs are correct.</p>
            </div>
        );
    }

    // Handler to navigate to the QuestionEditor
    const handleAddQuestion = () => {
        if (cid && aid) {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${aid}/Questions/new`);
        }
    };

    // Handler to edit a question
    const handleEditQuestion = (questionId: string) => {
        if (cid && aid) {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${aid}/Questions/${questionId}/edit`);
        }
    };

    return (
        <div>
            {/* Render list of questions */}
            <ol className="list-group list-group-numbered">
                {quiz.questions.map((question) => (
                    <li key={question._id} className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{question.title || "Untitled Question"}</div>
                            {question.type} Question | {question.points} Points
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary me-2"
                            onClick={() => handleEditQuestion(question._id)}
                        >
                            Edit
                        </button>
                    </li>
                ))}
            </ol>

            {/* Buttons for adding new questions or groups */}
            <div id="quiz-question-editor-btn" className="d-flex justify-content-center mt-3">
                <button id="wd-add-question-btn" className="btn btn-lg btn-secondary me-1" onClick={handleAddQuestion}>
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    New Question
                </button>
                <button id="wd-add-question-group-btn" className="btn btn-lg btn-secondary me-1">
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    New Question Group
                </button>
                <button id="wd-find-question-btn" className="btn btn-lg btn-secondary me-1">
                    <IoSearchOutline className="position-relative me-2" style={{ bottom: "1px" }} />
                    Find Question
                </button>
            </div>

            <hr />

            {/* Notification and Buttons Section */}
            <div className="d-flex justify-content-between align-items-center mt-4">
                {/* Notification Message */}
                <div id="quiz-user-notify" className="text-muted">
                    <input type="checkbox" className="form-check-input ms-1 me-2" id="quiz-user-notify-check" />
                    <label className="form-check-label" htmlFor="quiz-user-notify-check">
                        Notify Users this Quiz has changed
                    </label>
                </div>

                {/* Buttons for Cancel, Save, Save and Publish */}
                <div className="d-flex">
                    <button className="btn btn-secondary me-3">Cancel</button>
                    <button className="btn btn-primary me-3">Save</button>
                    <button className="btn btn-success">Save and Publish</button>
                </div>
            </div>
            <hr />
        </div>
    );
}
