import React, { useState } from "react";
import { BsExclamationCircle, BsQuestionCircle } from "react-icons/bs";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { PiPencil } from "react-icons/pi";
import { CgPentagonRight } from "react-icons/cg";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

type Question = {
    _id: string;
    quiz: string;
    title: string;
    type: string;
    points: number;
    question: string;
    correctAnswer: string;
    choices: string[];
};

export default function QuizPreview() {
    const { quiz: quizId, cid } = useParams<{ quiz: string; cid: string }>();
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Get quizzes and questions from Redux state
    const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
    const questions = useSelector((state: any) => state.quizzesReducer.questions);

    // Find the specific quiz and its questions
    const quizData = quizzes.find((q: any) => q._id === quizId);
    const quizQuestions = questions.filter((q: Question) => q.quiz === quizId);

    // If no quiz is found, show a message
    if (!quizData || quizQuestions.length === 0) {
        return <div>No quiz or questions found!</div>;
    }

    const currentQuestion = quizQuestions[currentQuestionIndex];

    // Handler for navigation buttons
    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // Display the current date and time
    const getCurrentDateTime = () => {
        const now = new Date();
        return now.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "numeric", hour12: true });
    };

    // Navigate back to Quiz Result Screen
    const handleSubmit = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Result`);
    };

    // Navigate to the Question Editor
    const handleEditQuiz = () => {
        if (quizQuestions.length > 0) {
            // Navigate to the question editor of the current question
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Questions/${currentQuestion._id}/edit`);
        }
    };

    return (
        <div className="container mt-4">
            {/* Quiz Title */}
            <h4>{quizData.title}</h4>

            {/* Alert Message */}
            <div className="alert alert-danger" role="alert">
                <BsExclamationCircle className="text-danger me-2" />
                <span>This is the preview of the published version of the quiz.</span>
            </div>

            {/* Quiz Instructions and Info */}
            <div>
                <p>Started: {getCurrentDateTime()}</p>
                <h4>Quiz Instructions</h4>
            </div>
            <hr />

            {/* Display Current Question */}
            <div className="d-flex align-items-start mb-4">
                <CgPentagonRight className="fs-1 me-3 mt-1" />
                <div className="card flex-grow-1">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Question {currentQuestionIndex + 1} - {currentQuestion.title}</h5>
                        <span>{currentQuestion.points} pts</span>
                    </div>
                    <div className="card-body">
                        {/* Question Text */}
                        <p>{currentQuestion.question}</p>
                        <hr />

                        {/* Answer Input */}
                        {currentQuestion.type === "Fill in the blank" ? (
                            // Render input box for "Fill in the Blank" questions
                            <div className="form-group">
                                <label htmlFor={`fillInBlank${currentQuestionIndex}`}>Your Answer:</label>
                                <input
                                    type="text"
                                    className="form-control mt-2"
                                    id={`fillInBlank${currentQuestionIndex}`}
                                    placeholder="Enter your answer here"
                                />
                            </div>
                        ) : (
                            // Render radio buttons for other question types (e.g., Multiple Choice)
                            currentQuestion.choices.map((choice: string, index: number) => (
                                <div key={index} className="form-check mt-3">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name={`question${currentQuestionIndex}`}
                                        id={`option${index}`}
                                    />
                                    <label className="form-check-label" htmlFor={`option${index}`}>
                                        {choice}
                                    </label>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="d-flex justify-content-between align-items-center">
                <button
                    className="btn btn-secondary"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                >
                    <IoMdArrowDropleft className="me-1 fs-4" /> Previous
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === quizQuestions.length - 1}
                >
                    Next <IoMdArrowDropright className="ms-1 fs-4" />
                </button>
            </div>
            <hr />

            {/* Footer Section */}
            <div className="d-flex justify-content-end align-items-center mt-3 p-3 border rounded">
                <span className="text-muted me-3">Quiz saved at {getCurrentDateTime()}</span>
                <button className="btn btn-secondary" onClick={handleSubmit}>Submit Quiz</button>
            </div>

            {/* Questions List */}
            <div className="container mt-5">
                <button className="btn btn-outline-secondary mb-4 d-flex align-items-center w-100 py-3"
                onClick={handleEditQuiz}>
                    <PiPencil className="me-2" style={{ transform: "rotate(270deg)" }} />
                    Keep Editing This Quiz
                </button>

                <h3>Questions</h3>
                <ol className="list-group list-group-flush">
                    {quizQuestions.map((q: Question, index: number) => (
                        <li key={q._id} className="list-group-item d-flex align-items-center">
                            <span className="text-muted me-2"><BsQuestionCircle /></span>
                            <span className={index === currentQuestionIndex ? "text-danger" : ""}>
                                <b>{`Question ${index + 1}`}</b>
                            </span>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
