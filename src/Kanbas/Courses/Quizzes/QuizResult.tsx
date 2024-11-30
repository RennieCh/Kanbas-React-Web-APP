import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { fetchQuizById, fetchQuestionsForQuiz, fetchAnswersForUser } from "./client";

export default function QuizResult() {
    const navigate = useNavigate();
    const { cid, quiz: quizId } = useParams<{ cid: string; quiz: string }>();

    // Get quizzes, questions, answers, and current user
    const [quizData, setQuizData] = useState<any>(null);
    const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
    const [userAnswer, setUserAnswer] = useState<any>(null);
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

    // Fetch quiz, questions, and user answers from the server
    useEffect(() => {
        const fetchQuizDetails = async () => {
            try {
                if (quizId && cid) {
                    const fetchedQuiz = await fetchQuizById(quizId);
                    setQuizData(fetchedQuiz);

                    const fetchedQuestions = await fetchQuestionsForQuiz(quizId);
                    setQuizQuestions(fetchedQuestions);

                    // Assuming the currentUser is available
                    // Fetch current user details if needed
                    // setCurrentUser(fetchedCurrentUser);
                    if (currentUser?._id) {
                        const fetchedAnswers = await fetchAnswersForUser(currentUser._id);
                        const userQuizAnswer = fetchedAnswers.find(
                            (a: any) => a.quizID === quizId && a.courseID === cid
                        );
                        setUserAnswer(userQuizAnswer);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch quiz details or answers:", error);
            }
        };

        fetchQuizDetails();
    }, [quizId, cid, currentUser]);

    // Handle the case where the quiz or user answer is not found
    if (!quizData || !userAnswer) {
        return (
            <div className="container mt-5">
                <h4 className="text-danger">Quiz or answers not found!</h4>
                <p>Please check if the course and quiz IDs are correct.</p>
            </div>
        );
    }

    // Display the start time
    const displayEndTime = () => {
        return new Date(userAnswer.endTime).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    // Function to format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, add 1
        const day = String(date.getDate() + 1).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    // Navigate back to Quiz Result Screen
    const handleExit = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/`);
    };
    return (
        <div className="container mt-4">
            {/* Quiz Title */}
            <h4>{quizData.title}</h4>
            <hr />
            <div>
                <span><b>Due </b>{formatDate(quizData.dueDate)}</span> | <span><b>Points </b>{quizData.points}</span> | <span><b>Questions </b>{quizQuestions.length}</span> <br />
                <span><b>Available </b>{formatDate(quizData.availableFromDate)} - {formatDate(quizData.availableUntilDate)}</span><br />
                <span><b>Time Limit </b>{quizData.timeLimit} Minutes</span>
            </div>
            <hr />

            {/* Attempt History */}
            <div className="container mt-4">
                <h4>Attempt History</h4>
                <div className="mt-3">
                    <div className="row fw-bold">
                        <div className="col-3"></div>
                        <div className="col-3">Attempt</div>
                        <div className="col-3">Score</div>
                        <div className="col-3">Submitted On</div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-3 fw-bold text-uppercase">Latest</div>
                        <div className="col-3 text-danger">Attempt {userAnswer.attemptTaken}</div>
                        <div className="col-3">{userAnswer.score} out of {quizData.points}</div>
                        <div className="col-3">{displayEndTime()}</div>
                    </div>
                    <hr />
                </div>
            </div>

            {/* Questions List */}
            <div className="questions-list mt-4">
                {quizQuestions.map((question: any, index: number) => {
                    const userAnswerText = userAnswer.answers[index] || "";
                    const isCorrect = userAnswerText === question.correctAnswer || (question.type === "Fill in the blank" && question.choices.includes(userAnswerText));
                    return (
                        <div className="card mb-4" key={question._id}>
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Question {index + 1}</h5>
                                <span>{isCorrect ? `${question.points} / ${question.points} pts` : `0 / ${question.points} pts`}</span>
                            </div>
                            <div className="card-body">
                                <p>{question.question}</p>
                                <hr />

                                {/* Answer Display */}
                                {question.type === "Fill in the blank" ? (
                                    <div className="form-check d-flex align-items-center justify-content-between mt-3">
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={userAnswerText}
                                            style={{ width: '100px' }}
                                            disabled
                                        />
                                        <span className={`badge rounded-pill text-bg-${isCorrect ? 'success' : 'danger'}`}>
                                            {isCorrect ? <><BsCheckCircle /> Correct!</> : <><BsXCircle /> Incorrect!</>}
                                        </span>
                                    </div>
                                ) : (
                                    question.choices.map((choice: string, choiceIndex: number) => (
                                        <div key={choiceIndex} className="form-check d-flex align-items-center justify-content-between mt-3">
                                            <div>
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    checked={userAnswerText === choice}
                                                    disabled
                                                />
                                                <label className="form-check-label ms-2">{choice}</label>
                                            </div>
                                            {userAnswerText === choice && (
                                                <span className={`badge rounded-pill text-bg-${isCorrect ? 'success' : 'danger'}`}>
                                                    {isCorrect ? <><BsCheckCircle /> Correct!</> : <><BsXCircle /> Incorrect!</>}
                                                </span>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <hr />

            {/* Footer Section */}
            <div className="d-flex justify-content-end align-items-center mt-3">
                <button className="btn btn-secondary" onClick={handleExit}>Exit</button>
            </div>
        </div>
    );
}
