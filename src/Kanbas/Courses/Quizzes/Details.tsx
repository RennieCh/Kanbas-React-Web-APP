import { PiPencil } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchQuizById, fetchAnswersForQuiz } from "./client";

// Helper function to format dates for display
const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1); // Adjust for date gap issue
    return date.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

export default function QuizzesDetails() {
    const navigate = useNavigate();
    const { cid, aid } = useParams<{ cid: string; aid: string }>(); // Get the course ID and quiz ID from the URL
    const [warningVisible, setWarningVisible] = useState(false);
    const [noAttemptVisible, setNoAttemptVisible] = useState(false);
    const [accessCode, setAccessCode] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [quiz, setQuiz] = useState<any>(null);
    const [answers, setAnswers] = useState<any[]>([]);

    // Get current user
    const currentUser = useSelector((state) => (state as any).accountReducer.currentUser);

    // Fetch quiz details from the backend
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                if (aid) {
                    const fetchedQuiz = await fetchQuizById(aid);
                    setQuiz(fetchedQuiz);
                }
            } catch (error) {
                console.error("Failed to fetch quiz:", error);
            }
        };
        fetchQuiz();
    }, [aid]);

    // Fetch answers for the quiz
    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                if (aid) {
                    const fetchedAnswers = await fetchAnswersForQuiz(aid);
                    setAnswers(fetchedAnswers);
                }
            } catch (error) {
                console.error("Failed to fetch answers:", error);
            }
        };
        fetchAnswers();
    }, [aid]);

    // Handle the case where the quiz is not found
    if (!quiz) {
        return (
            <div className="container mt-5">
                <h4 className="text-danger">Quiz not found for this course!</h4>
                <p>Please check if the course and quiz IDs are correct.</p>
            </div>
        );
    }

    // Function to handle navigation to the Editor screen
    const handleEditClick = () => {
        if (cid && aid) {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${aid}/edit`);
        }
    };

    // Handler to navigate to QuizPreview
    const handlePreview = () => {
        if (cid && aid) {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${aid}/Preview`);
        }
    };

    // Handler to start quiz with validation for STUDENT role
    const handleStartQuiz = () => {
        // Find the answer associated with the current user and quiz
        const userAnswer = answers.find((answer: any) => answer.quizID === aid && answer.userID === currentUser?._id);

        // Get the current date
        const currentDate = new Date();
        const availableFromDate = new Date(quiz.availableFromDate);
        const availableUntilDate = new Date(quiz.availableUntilDate);

        // Conditions for allowing to start the quiz
        const isPublished = quiz.published;
        const isWithinAvailablePeriod = currentDate >= availableFromDate && currentDate <= availableUntilDate;
        const hasAttemptsRemaining = !userAnswer || userAnswer.attemptTaken < quiz.numberOfAttempts;

        const canStartQuiz = isPublished && isWithinAvailablePeriod && hasAttemptsRemaining;

        // Check access code for STUDENT role
        if (canStartQuiz) {
            if (accessCode === quiz.accessCode) {
                navigate(`/Kanbas/Courses/${cid}/Quizzes/${aid}/Preview`);
            } else {
                setModalVisible(true); // Show modal if access code does not match
            }
        } else {
            setWarningVisible(true);
        }
    };

    // Handler to view last attempt
    const handleViewLastAttempt = () => {
        // Find the answer associated with the current user and quiz
        const userAnswer = answers.find((answer: any) => answer.quizID === aid && answer.userID === currentUser?._id);

        if (userAnswer) {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${aid}/Result`);
        } else {
            setNoAttemptVisible(true);
        }
    };

    return (
        <div id="wd-quizzes-details" className="container-fluid mt-4 p-1"
            style={{ maxWidth: '1200px', margin: '0 auto' }}>

            {/* Show Faculty Quiz Controls only for FACULTY */}
            {currentUser?.role === "FACULTY" && (
                <div id="wd-quizzes-details-btn" className="d-flex justify-content-center align-items-center">
                    <button id="wd-quiz-preview-btn" className="btn btn-lg btn-secondary me-1" onClick={handlePreview}>
                        Preview
                    </button>
                    <button id="wd-quiz-edit-btn" className="btn btn-lg btn-secondary me-1" onClick={handleEditClick}>
                        <PiPencil className="position-relative me-2" style={{ bottom: "1px" }} />
                        Edit
                    </button>
                </div>
            )}
            <hr />
            <h3 id="wd-quiz-title">{quiz.title}</h3>
            <br />

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end" >
                    <b>Quiz Type</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">{quiz.type}</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Points</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">{quiz.points}</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Assignment Group</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">{quiz.assignmentGroup}</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Shuffle Answers</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">{quiz.shuffleAnswer ? "Yes" : "No"}</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Time Limit</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">{quiz.timeLimit} Minutes</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Multiple Attempts</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">{quiz.allowMultiAttempts ? "Yes" : "No"}</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>How Many Attempts</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">{quiz.numberOfAttempts}</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Show Correct Answers</ b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">{quiz.showCorrectAnswers}</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>One Question at a Time</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">{quiz.oneQuestionaTime ? "Yes" : "No"}</span>
                </div>
            </div>

            {currentUser?.role === "FACULTY" && (
                <div className="row align-items-center mb-6">
                    <label className="col-sm-6 col-form-label text-end" htmlFor="faculty-access-code">
                        <b>Access Code</b>
                    </label>
                    <div className="col-sm-6">
                        <span className="align-middle" id="faculty-access-code">{quiz.accessCode}</span>
                    </div>
                </div>
            )}

            {currentUser?.role === "STUDENT" && (
                <div className="row align-items-center mb-6">
                    <label className="col-sm-6 col-form-label text-end" htmlFor="student-access-code">
                        <b>Access Code</b>
                    </label>
                    <div className="col-sm-6">
                        <input className="form-control align-middle" id="student-access-code" type="text"
                            value={accessCode}
                            onChange={(e) => setAccessCode(e.target.value)} />
                    </div>
                </div>
            )}

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Webcam Required</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">{quiz.webCam ? "Yes" : "No"}</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Lock Questions After Answering</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</span>
                </div>
            </div>
            <br />

            <div className="row mb-3">
                {/* Labels Row */}
                <div className="col-3 text-center"><b>Due</b></div>
                <div className="col-3 text-center"><b>For</b></div>
                <div className="col-3 text-center"><b>Available From</b></div>
                <div className="col-3 text-center"><b>Until</b></div>
            </div>
            <hr />
            <div className="row">
                {/* Values Row */}
                <div className="col-3 text-center">{formatDateForDisplay(quiz.dueDate)}</div>
                <div className="col-3 text-center">Everyone</div>
                <div className="col-3 text-center">{formatDateForDisplay(quiz.availableFromDate)}</div>
                <div className="col-3 text-center">{formatDateForDisplay(quiz.availableUntilDate)}</div>
            </div>
            <hr />

            {/* Show Start Quiz section and alerts only for STUDENT */}
            {currentUser?.role === "STUDENT" && (
                <>
                    {/* Alert for Quiz Not Available */}
                    {warningVisible && (
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            The Quiz is not available, or all attempts have been taken.
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                                onClick={() => setWarningVisible(false)}
                            />
                        </div>
                    )}

                    {/* Alert for No Attempt Available */}
                    {noAttemptVisible && (
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            No attempt has been taken.
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                                onClick={() => setNoAttemptVisible(false)}
                            />
                        </div>
                    )}

                    {/* Start Quiz section */}
                    <div className="d-flex justify-content-center mt-3">
                        <button type="button" className="btn btn-secondary me-3" onClick={handleStartQuiz}>
                            Start Quiz
                        </button>
                        <button type="button" className="btn btn-secondary me-3" onClick={handleViewLastAttempt}>
                            View Last Attempt
                        </button>
                    </div>

                    {/* Modal for Incorrect Access Code */}
                    {modalVisible && (
                        <div className="modal show d-block" tabIndex={-1}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Access Code Incorrect</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                            onClick={() => setModalVisible(false)}
                                        />
                                    </div>
                                    <div className="modal-body">
                                        <p>Access Code does not match. Please try again.</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setModalVisible(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}


        </div>
    );
}