import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";

export default function QuestionEditorGate() {
    const navigate = useNavigate();

    // Handler to navigate to the QuestionEditor
    const handleAddQuestion = () => {
        navigate("/Kanbas/Courses/1234/Quizzes/123/Questions/new");
    };
    return (
        <div>
            <ol className="list-group list-group-numbered">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Quesiton Name Placehoder 1</div>
                        Multiple Choice Quesiton | 5 Points
                    </div>
                    <button type="button" className="btn btn-primary me-2">
                        Edit
                    </button>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Quesiton Name Placehoder 2</div>
                        True/false Choice Quesiton | 3 Points
                    </div>
                    <button type="button" className="btn btn-primary me-2">
                        Edit
                    </button>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Quesiton Name Placehoder 3</div>
                        Fill in a Blank Quesiton | 10 Points
                    </div>
                    <button type="button" className="btn btn-primary me-2">
                        Edit
                    </button>

                </li>
            </ol>
            <div id="quiz-question-editor-btn" className="d-flex justify-content-center mt-3">
                <button id="wd-add-quesiton-btn" className="btn btn-lg btn-secondary me-1" onClick={handleAddQuestion}>
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    New Question
                </button>
                <button id="wd-add-quesiton-group-btn" className="btn btn-lg btn-secondary me-1">
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    New Question Group
                </button>
                <button id="wd-find-quesiton-btn" className="btn btn-lg btn-secondary me-1">
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
                    <label className="form-check-label" htmlFor="quiz-user-notify-check">Notify Users this Quiz has changed</label>
                </div>

                {/* Buttons for Cancel, Save, Save and Publish */}
                <div className="d-flex">
                    <button className="btn btn-secondary me-3">
                        Cancel
                    </button>
                    <button className="btn btn-primary me-3">
                        Save
                    </button>
                    <button className="btn btn-success">
                        Save and Publish
                    </button>
                </div>
            </div>
            <hr />
        </div>
    );
}
