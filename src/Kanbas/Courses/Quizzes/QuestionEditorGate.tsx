import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { fetchQuizById, fetchQuestionsForQuiz, createQuestion, deleteQuestion } from "./client";


// Define the type for a quiz object 
interface Quiz {
    _id: string;
    course: string;
}

export default function QuestionEditorGate() {
    const navigate = useNavigate();
    const { cid, aid } = useParams<{ cid: string; aid: string }>(); // Get course ID and quiz ID from URL
    const [questions, setQuestions] = useState<any[]>([]);
    const [quiz, setQuiz] = useState<Quiz | null>(null);

    // Fetch quiz details and questions from the server
    useEffect(() => {
        const fetchQuizAndQuestions = async () => {
            try {
                if (aid) {
                    // Fetch the quiz details
                    const fetchedQuiz = await fetchQuizById(aid);
                    setQuiz(fetchedQuiz);

                    // Fetch the quiz questions
                    const fetchedQuestions = await fetchQuestionsForQuiz(aid);
                    setQuestions(fetchedQuestions);
                }
            } catch (error) {
                console.error("Failed to fetch quiz or questions:", error);
            }
        };

        fetchQuizAndQuestions();
    }, [aid]);

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
    const handleAddQuestion = async () => {
        if (cid && aid) {
            try {
                const newQuestion = {
                    quiz: aid,
                    title: "New Question",
                    type: "Multiple choice",
                    points: 0,
                    question: "",
                    correctAnswer: "",
                    choices: [""],
                };
                const createdQuestion = await createQuestion(newQuestion);
                setQuestions((prevQuestions) => [...prevQuestions, createdQuestion]);
            } catch (error) {
                console.error("Failed to add question:", error);
            }
        }
    };

    // Handler to edit a question
    const handleEditQuestion = (questionId: string) => {
        if (cid && aid) {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${aid}/Questions/${questionId}/edit`);
        }
    };

    // Handler to delete a question
    const handleDeleteQuestion = async (questionId: string) => {
        try {
            await deleteQuestion(questionId);
            setQuestions((prevQuestions) => prevQuestions.filter((question) => question._id !== questionId));
        } catch (error) {
            console.error("Failed to delete question:", error);
        }
    };

    return (
        <div>
            {/* Render list of questions */}
            <ol className="list-group list-group-numbered">
                {questions.length === 0 ? (
                    <div className="alert alert-warning">No questions available. Click 'New Question' to add.</div>
                ) : (
                    questions.map((question: any) => (
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
