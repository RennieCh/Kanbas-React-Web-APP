import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { addQuestion, deleteQuestion } from "./reducer";

// Define the type for a quiz object (adjust as per your actual type definition)
interface Quiz {
    _id: string;
    course: string;
}

export default function QuestionEditorGate() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cid, aid } = useParams<{ cid: string; aid: string }>(); // Get course ID and quiz ID from URL
    const [newQuestionId, setNewQuestionId] = useState<string | null>(null);

    // Get quizzes and questions from the Redux store
    const questions = useSelector((state) => (state as any).quizzesReducer.questions);
    const quiz = useSelector((state) => (state as any).quizzesReducer.quizzes.find((q: Quiz) => q._id === aid && q.course === cid));

    // Filter questions based on the quiz ID
    const quizQuestions = questions.filter((question: any) => question.quiz === aid);

    // Use Effect to monitor the addition of a new question
    useEffect(() => {
        if (newQuestionId) {
            const questionExists = questions.some((question: any) => question._id === newQuestionId);
            if (questionExists) {
                // Navigate to the new question editor page once it exists in the state
                navigate(`/Kanbas/Courses/${cid}/Quizzes/${aid}/Questions/${newQuestionId}/edit`);
                setNewQuestionId(null);
            }
        }
    }, [questions, newQuestionId, navigate, cid, aid]);

    // Handle the case where the quiz is not found
    if (!quiz) {
        return (
            <div className="container mt-5">
                <h4 className="text-danger">Quiz not found!</h4>
                <p>Please check if the course and quiz IDs are correct.</p>
            </div>
        );
    }

    // Handler to navigate to the QuestionEditor for adding a new question
    const handleAddQuestion = () => {
        if (cid && aid) {
            const newQuestionId = new Date().getTime().toString();
            const newQuestion = {
                _id: newQuestionId,
                quiz: aid,
                title: "New Question",
                type: "Multiple choice",
                points: 0,
                question: "",
                correctAnswer: "",
                choices: [""],
            };
            dispatch(addQuestion(newQuestion));
            setNewQuestionId(newQuestionId);        }
    };

    // Handler to edit a question
    const handleEditQuestion = (questionId: string) => {
        if (cid && aid) {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${aid}/Questions/${questionId}/edit`);
        }
    };

    // Handler to delete a question
    const handleDeleteQuestion = (questionId: string) => {
        dispatch(deleteQuestion(questionId));
    };

    return (
        <div>
            {/* Render list of questions */}
            <ol className="list-group list-group-numbered">
                {quizQuestions.length === 0 ? (
                    <div className="alert alert-warning">No questions available. Click 'New Question' to add.</div>
                ) : (
                    quizQuestions.map((question: any) => (
                        <li key={question._id} className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{question.title || "Untitled Question"}</div>
                                {question.type} Question | {question.points} Points
                            </div>
                            <div className="d-flex">
                                <button
                                    type="button"
                                    className="btn btn-primary me-2"
                                    onClick={() => handleEditQuestion(question._id)}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteQuestion(question._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                )}
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
            </div>
            <hr />
        </div>
    );
}
