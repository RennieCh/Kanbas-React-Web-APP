import React, { useState } from "react";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { IoEllipsisVertical } from "react-icons/io5";
import { CgShapeHalfCircle } from "react-icons/cg";
import Toolbar from "./toolbar";
import ParagraphTool from "./paragraphtool";
import QuestionEditorGate from "./QuestionEditorGate";


export default function QuizzesEditor() {
    const [activeTab, setActiveTab] = useState("details");

    // Function to handle tab switching
    const handleTabSwitch = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "1000px" }}>
            {/* Header Section */}
            <div className="d-flex align-items-center justify-content-end mb-3">
                <h5 className="me-3 mb-0">Points 0</h5>
                <MdDoNotDisturbAlt className="fs-4 me-2" />
                <span className="me-3">Not Published</span>
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
                        <input type="text" className="form-control" id="quizTitle" placeholder="Unnamed Quiz" value="Unnamed Quiz" />
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
                        <textarea className="form-control" id="quizDescription" rows={5} placeholder="Enter quiz instructions" />
                        <ParagraphTool />

                    </div>

                    {/* Quiz Type */}
                    <div className="row mb-3 align-items-center">
                        <label htmlFor="quiz-type" className="col-3 col-form-label text-end">
                            Quiz Type
                        </label>
                        <div className="col-9">
                            <select id="quiz-type" className="form-select">
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
                            <select id="quiz-assignment-group" className="form-select">
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
                                <input type="checkbox" className="form-check-input" id="shuffleAnswers" defaultChecked />
                                <label className="form-check-label" htmlFor="shuffleAnswers">Shuffle Answers</label>
                            </div>

                            {/* Time Limit */}
                            <div className="mb-4 d-flex align-items-center">
                                <input type="checkbox" className="form-check-input ms-1 me-2" id="quiz-time-limit" />
                                <label htmlFor="quiz-time-limit" className="form-check-label me-3"><b>Time Limit</b></label>
                                <input type="number" className="form-control w-25" id="quiz-minute" placeholder="20" />
                                <label htmlFor="quiz-minute" className="ms-2">Minutes</label>
                            </div>

                            <div className="p-4 border rounded form-check">
                                <input type="checkbox" className="form-check-input ms-1 me-2" id="quiz-multipleAttempts" />
                                <label className="form-check-label" htmlFor="quiz-multipleAttempts">Allow Multiple Attempts</label>
                                <br />
                                <input type="checkbox" className="form-check-input ms-1 me-2" id="quiz-show-answer" />
                                <label className="form-check-label" htmlFor="quiz-show-answer">Show Correct Answer</label>
                                <br />
                                <input type="checkbox" className="form-check-input ms-1 me-2" id="quiz-one-question" />
                                <label className="form-check-label" htmlFor="quiz-one-question">One Question at a Time</label>
                                <br />
                                <input type="checkbox" className="form-check-input ms-1 me-2" id="quiz-webcam" />
                                <label className="form-check-label" htmlFor="quiz-webcam">Webcam Required</label>
                                <br />
                                <input type="checkbox" className="form-check-input ms-1 me-2" id="quiz-lock-quesiton" />
                                <label className="form-check-label" htmlFor="quiz-lock-quesiton">Lock Questions After Answering</label>
                                <br />
                                {/* Access Code */}
                                <div className="d-flex align-items-center mt-4">
                                    <label className="form-check-label me-3" htmlFor="quiz-access-code">Access Code</label>
                                    <input type="text" className="form-control w-50" id="quiz-access-code" placeholder="Enter access code" />
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
                                <input type="datetime-local" className="form-control mb-2" id="wd-quiz-due-date" value="2024-05-13T23:59" />

                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="wd-quiz-available-from" className="form-label fw-bold">Available From</label>
                                        <input type="datetime-local" className="form-control" id="wd-quiz-available-from" value="2024-05-16T23:59" />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="wd-quiz-available-until" className="form-label fw-bold">Until</label>
                                        <input type="datetime-local" className="form-control" id="wd-quiz-available-until" value="2024-05-20T23:59" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr />
                    {/* Buttons for Cancel, Save, Save and Publish */}
                    <div className="d-flex justify-content-center mt-3">
                        <button type="button" className="btn btn-secondary me-3">Cancel</button>
                        <button type="button" className="btn btn-secondary me-3">Save & Publish</button>
                        <button type="button" className="btn btn-danger me-3">Save</button>
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
