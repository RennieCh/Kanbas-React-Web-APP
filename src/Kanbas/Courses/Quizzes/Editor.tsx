import React, { useState, useEffect } from "react";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { IoEllipsisVertical } from "react-icons/io5";
import { CgShapeHalfCircle } from "react-icons/cg";
import Toolbar from "./toolbar";
import ParagraphTool from "./paragraphtool";
import QuestionEditorGate from "./QuestionEditorGate";
import GreenCheckmark from "./GreenCheckmark";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateQuiz } from "./reducer";


export default function QuizzesEditor() {
    const { cid, aid } = useParams<{ cid: string; aid: string }>(); // Get the course ID and quiz ID from the URL
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get quizzes from the Redux store
    const quizzes = useSelector((state) => (state as any).quizzesReducer.quizzes);

    // Fetch the quiz based on the course ID and quiz ID from the Redux state
    const quiz = quizzes.find((q: any) => q._id === aid && q.course === cid);

    // Helper function to format dates for "datetime-local" HTML input
    const formatDateTimeForInput = (date: string | undefined) => {
        if (!date) return ""; // Handle undefined or empty date

        const dateObj = new Date(date); // Convert string to Date object

        // Extract year, month, day, hours, and minutes
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    // state variables with conditional defaults
    const [isPublished, setIsPublished] = useState<boolean>(quiz.published);
    const [quizTitle, setQuizTitle] = useState<string>(quiz.title);
    const [quizDescription, setQuizDescription] = useState<string>(quiz.description);
    const [quizType, setQuizType] = useState<string>(quiz.type);
    const [assignmentGroup, setAssignmentGroup] = useState<string>(quiz.assignmentGroup);
    const [shuffleAnswer, setShuffleAnswer] = useState<boolean>(quiz.shuffleAnswer);
    const [timeLimit, setTimeLimit] = useState<string>(quiz.timeLimit);
    const [allowMultiAttempts, setAllowMultiAttempts] = useState<boolean>(quiz.allowMultiAttempts);
    const [quizShowCorrectAnswers, setQuizShowCorrectAnswers] = useState<string>(quiz.showCorrectAnswers);
    const [quizOneQuestionAtATime, setQuizOneQuestionAtATime] = useState<boolean>(quiz.oneQuestionaTime);
    const [quizWebCam, setQuizWebCam] = useState<boolean>(quiz.webCam);
    const [quizLockQuestionsAfterAnswering, setQuizLockQuestionsAfterAnswering] = useState<boolean>(quiz.lockQuestionsAfterAnswering);
    const [quizAccessCode, setQuizAccessCode] = useState<string>(quiz.accessCode);
    const [dueDate, setDueDate] = useState<string>(formatDateTimeForInput(quiz.dueDate));
    const [availableFromDate, setAvailableFromDate] = useState<string>(formatDateTimeForInput(quiz.availableFromDate));
    const [availableUntilDate, setAvailableUntilDate] = useState<string>(formatDateTimeForInput(quiz.availableUntilDate));

    const [activeTab, setActiveTab] = useState<string>("details");


    // Effect to update the active tab when URL hash changes or on initial load
    useEffect(() => {
        const updateActiveTabFromHash = () => {
            const hash = window.location.hash;
            console.log("Current hash:", hash); // Added console log to print the hash value (debug purpose)
            if (hash.endsWith("#questions")) {
                setActiveTab("questions");
            } else {
                setActiveTab("details");
            }
        };

        // Set the active tab based on the initial hash on component load
        updateActiveTabFromHash();

        // Listen for hash changes
        window.addEventListener("hashchange", updateActiveTabFromHash);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener("hashchange", updateActiveTabFromHash);
        };
    }, []);

    // Handle case where the quiz is not found
    if (!quiz) {
        return (
            <div className="container mt-5">
                <h4 className="text-danger">Quiz not found!</h4>
                <p>Please check the course and quiz IDs.</p>
            </div>
        );
    }

    // Function to handle tab switching without modifying the URL hash
    const handleTabSwitch = (tab: string) => {
        setActiveTab(tab);
        if (tab === "questions") {
            // Update the URL with full path and #questions
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${aid}/edit#questions`);
        } else {
            // Update the URL with full path for details
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${aid}/edit`);
        }
    };


    // Toggle publish status
    const togglePublishStatus = () => {
        const updatedStatus = !isPublished;
        setIsPublished(updatedStatus);

        // Dispatch the action to update the quiz in the Redux store
        if (quiz) {
            dispatch(updateQuiz({ ...quiz, published: updatedStatus }));
        }

        // Navigate to the Quiz Details screen
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${aid}`);
    };

    // Save the quiz to Redux store
    const handleSave = () => {
        const updatedQuiz = {
            ...quiz,
            published: isPublished,
            title: quizTitle,
            description: quizDescription,
            type: quizType,
            assignmentGroup: assignmentGroup,
            shuffleAnswer: shuffleAnswer,
            timeLimit: timeLimit,
            allowMultiAttempts: allowMultiAttempts,
            showCorrectAnswers: quizShowCorrectAnswers,
            oneQuestionaTime: quizOneQuestionAtATime,
            webCam: quizWebCam,
            lockQuestionsAfterAnswering: quizLockQuestionsAfterAnswering,
            accessCode: quizAccessCode,
            dueDate: dueDate,
            availableFromDate: availableFromDate,
            availableUntilDate: availableUntilDate,
        };

        // Dispatch the updateQuiz action to save changes to the Redux store
        dispatch(updateQuiz(updatedQuiz));
    };

    // Save the quiz and set publish status to true
    const handleSaveAndPublish = () => {
        const updatedQuiz = {
            ...quiz,
            published: true,
            title: quizTitle,
            description: quizDescription,
            type: quizType,
            assignmentGroup: assignmentGroup,
            shuffleAnswer: shuffleAnswer,
            timeLimit: timeLimit,
            allowMultiAttempts: allowMultiAttempts,
            showCorrectAnswers: quizShowCorrectAnswers,
            oneQuestionaTime: quizOneQuestionAtATime,
            webCam: quizWebCam,
            lockQuestionsAfterAnswering: quizLockQuestionsAfterAnswering,
            accessCode: quizAccessCode,
            dueDate: dueDate,
            availableFromDate: availableFromDate,
            availableUntilDate: availableUntilDate,
        };

        // Dispatch the updateQuiz action to save changes and mark as published in the Redux store
        dispatch(updateQuiz(updatedQuiz));

        // Navigate back to quiz details after saving
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${aid}`);
    };

    // Cancel changes and navigate back to Quiz List screen
    const handleCancel = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "1000px" }}>
            {/* Header Section */}
            <div className="d-flex align-items-center justify-content-end mb-3">
                <h5 className="me-3 mb-0">Points {quiz.points}</h5>
                {/* Toggle Publish Status */}
                {isPublished ? (
                    <div className="d-flex align-items-center" onClick={togglePublishStatus} style={{ cursor: "pointer" }}>
                        <GreenCheckmark />
                        <span className="ms-2 me-3">Published</span>
                    </div>
                ) : (
                    <div onClick={togglePublishStatus} style={{ cursor: "pointer" }}>
                        <MdDoNotDisturbAlt className="fs-4 me-2" />
                        <span className="me-3">Not Published</span>
                    </div>
                )}

                <button className="btn btn-lg btn-secondary">
                    <IoEllipsisVertical />
                </button>
            </div>
            <hr />
            {/* Tabs for Details and Questions */}
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "details" ? "active" : ""}`}
                        onClick={() => handleTabSwitch("details")}
                    >
                        Details
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "questions" ? "active" : ""}`}
                        onClick={() => handleTabSwitch("questions")}
                    >
                        Questions
                    </button>
                </li>
            </ul>

            {/* Content for the Details Tab */}
            {activeTab === "details" && (
                <form>
                    {/* Quiz Title */}
                    <div className="mb-4">
                        <input type="text"
                            className="form-control"
                            id="quizTitle"
                            placeholder="Unnamed Quiz"
                            value={quizTitle}
                            onChange={(e) => setQuizTitle(e.target.value)} />
                    </div>

                    {/* WYSIWYG Editor (TextArea as a placeholder) */}
                    <div className="mb-4">
                        <label htmlFor="quizDescription" className="form-label"><b>Quiz Instructions:</b></label>
                        {/* Toolbar Row */}
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            {/* First Half: Menu Options */}
                            <div className="col-6 d-flex flex-grow-1 justify-content-around">
                                <span>Edit</span>
                                <span>View</span>
                                <span>Insert</span>
                                <span>Format</span>
                                <span>Tools</span>
                                <span>Table</span>
                            </div>

                            {/* Second Half: Percentage Icon */}
                            <div className="col-6 d-flex justify-content-end align-items-center float-end">
                                <CgShapeHalfCircle
                                    className="fs-2 text-success"
                                    style={{ transform: "rotate(90deg)" }}
                                />
                                <span className="ms-2">100%</span>
                            </div>
                        </div>
                        <Toolbar />
                        <textarea className="form-control" id="quizDescription" rows={5}
                            placeholder="Enter quiz instructions"
                            value={quizDescription}
                            onChange={(e) => setQuizDescription(e.target.value)} />
                        <ParagraphTool />

                    </div>

                    {/* Quiz Type */}
                    <div className="row mb-3 align-items-center">
                        <label htmlFor="quiz-type" className="col-3 col-form-label text-end">
                            Quiz Type
                        </label>
                        <div className="col-9">
                            <select id="quiz-type" className="form-select" value={quizType} onChange={(e) => setQuizType(e.target.value)}>
                                <option>Graded Quiz</option>
                                <option>Practice Quiz</option>
                                <option>Graded Survey</option>
                                <option>Ungraded Survey</option>
                            </select>
                        </div>
                    </div>

                    {/* Assignment Group */}
                    <div className="row mb-3 align-items-center">
                        <label htmlFor="quiz-assignment-group" className="col-3 col-form-label text-end">
                            Assignment Group
                        </label>
                        <div className="col-9">
                            <select id="quiz-assignment-group" className="form-select" value={assignmentGroup}
                                onChange={(e) => setAssignmentGroup(e.target.value)}>
                                <option>Quizzes</option>
                                <option>Exams</option>
                                <option>Assignments</option>
                                <option>Projects</option>
                            </select>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="row mb-3 align-items-center">
                        <div className="col-3">
                        </div>
                        <div className="col-9">
                            <h6><b>Options</b></h6>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="shuffleAnswers" checked={shuffleAnswer}
                                    onChange={() => setShuffleAnswer(!shuffleAnswer)} />
                                <label className="form-check-label" htmlFor="shuffleAnswers">Shuffle Answers</label>
                            </div>

                            {/* Time Limit */}
                            <div className="mb-4 d-flex align-items-center">
                                <input type="checkbox" className="form-check-input ms-1 me-2" id="quiz-time-limit" />
                                <label htmlFor="quiz-time-limit" className="form-check-label me-3"><b>Time Limit</b></label>
                                <input type="number" className="form-control w-25" id="quiz-minute" placeholder="20"
                                    value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} />
                                <label htmlFor="quiz-minute" className="ms-2">Minutes</label>
                            </div>

                            <div className="p-4 border rounded form-check">
                                <input type="checkbox" className="form-check-input ms-1 me-2" id="quiz-multipleAttempts"
                                    checked={allowMultiAttempts} onChange={() => setAllowMultiAttempts(!allowMultiAttempts)} />
                                <label className="form-check-label" htmlFor="quiz-multipleAttempts">Allow Multiple Attempts</label>
                                <br />
                                <input type="checkbox" className="form-check-input ms-1 me-2" id="quiz-show-answer"
                                    checked={quizShowCorrectAnswers === "Immediately"}
                                    onChange={(e) => setQuizShowCorrectAnswers(e.target.checked ? "Immediately" : "Never")} />
                                <label className="form-check-label" htmlFor="quiz-show-answer">Show Correct Answer</label>
                                <br />
                                <input type="checkbox" className="form-check-input ms-1 me-2" id="quiz-one-question"
                                    checked={quizOneQuestionAtATime} onChange={() => setQuizOneQuestionAtATime(!quiz.oneQuestionaTime)} />
                                <label className="form-check-label" htmlFor="quiz-one-question">One Question at a Time</label>
                                <br />
                                <input type="checkbox" className="form-check-input ms-1 me-2" id="quiz-webcam" checked={quizWebCam} onChange={() => setQuizWebCam(!quiz.webCam)} />
                                <label className="form-check-label" htmlFor="quiz-webcam">Webcam Required</label>
                                <br />
                                <input type="checkbox" className="form-check-input ms-1 me-2" id="quiz-lock-quesiton" checked={quizLockQuestionsAfterAnswering}
                                    onChange={() => setQuizLockQuestionsAfterAnswering(!quiz.lockQuestionsAfterAnswering)} />
                                <label className="form-check-label" htmlFor="quiz-lock-quesiton">Lock Questions After Answering</label>
                                <br />
                                {/* Access Code */}
                                <div className="d-flex align-items-center mt-4">
                                    <label className="form-check-label me-3" htmlFor="quiz-access-code">Access Code</label>
                                    <input type="text" className="form-control w-50" id="quiz-access-code" placeholder="Enter access code"
                                        value={quizAccessCode} onChange={(e) => setQuizAccessCode(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Date Pickers for Due, Available, and Until Dates */}

                    <div className="row mb-3">
                        <label htmlFor="wd-quiz-assign-to" className="col-sm-3 col-form-label text-end">Assign</label>
                        <div className="col-sm-9">
                            <div className="p-3 border rounded">
                                <label className="fw-bold">Assign to</label>
                                <div className="quiz-input-group mb-2">
                                    <div className="form-control d-flex align-items-center">
                                        <span className="badge bg-light text-dark p-2">
                                            Everyone
                                            <button type="button" className="btn-close btn-sm ms-2" aria-label="Remove"></button>
                                        </span>
                                    </div>
                                </div>

                                <label htmlFor="wd-quiz-due-date" className="form-label fw-bold">Due</label>
                                <input type="datetime-local" className="form-control mb-2" id="wd-quiz-due-date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="wd-quiz-available-from" className="form-label fw-bold">Available From</label>
                                        <input type="datetime-local" className="form-control" id="wd-quiz-available-from" value={availableFromDate}
                                            onChange={(e) => setAvailableFromDate(e.target.value)} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="wd-quiz-available-until" className="form-label fw-bold">Until</label>
                                        <input type="datetime-local" className="form-control" id="wd-quiz-available-until" value={availableUntilDate}
                                            onChange={(e) => setAvailableUntilDate(e.target.value)} />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr />
                    {/* Buttons for Cancel, Save, Save and Publish */}
                    <div className="d-flex justify-content-center mt-3">
                        <button type="button" className="btn btn-secondary me-3" onClick={handleCancel}>Cancel</button>
                        <button type="button" className="btn btn-secondary me-3"
                            onClick={handleSaveAndPublish}>Save & Publish</button>
                        <button type="button" className="btn btn-danger me-3" onClick={handleSave}>Save</button>
                    </div>
                    <hr />
                </form>
            )}



            {/* Content for the Questions Tab */}
            {activeTab === "questions" && (
                <div>
                    <QuestionEditorGate />
                </div>
            )}
        </div>
    );
}