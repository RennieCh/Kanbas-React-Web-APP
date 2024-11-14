import React from 'react';
import QuizzesControls from "./QuizzesControls";
import { VscTriangleDown } from "react-icons/vsc";
import { IoRocketOutline } from "react-icons/io5";
import SingleQuizButtons from "./SingleQuizButtons";
import { quizzes } from "../../Database"; // Import quizzes from database
import { useParams } from "react-router-dom";

export default function Quizzes() {
    const { cid } = useParams(); // Get the course ID from the URL
    const currentDate = new Date();

    // Filter quizzes by the current course ID
    const courseQuizzes = quizzes.filter(quiz => quiz.course === cid);

    // Function to determine quiz availability status
    const getAvailabilityStatus = (quiz: any) => {
        const availableFromDate = new Date(quiz.availableFromDate);
        const availableUntilDate = new Date(quiz.availableUntilDate);

        if (currentDate < availableFromDate) {
            return { status: "Not available", isAvailable: false };
        } else if (currentDate >= availableFromDate && currentDate <= availableUntilDate) {
            return { status: "Available", isAvailable: true };
        } else {
            return { status: "Closed", isAvailable: false };
        }
    };

    return (
        <div className="container-fluid">
            <div id="wd-quizzes">
                <QuizzesControls />
                <br />
                <hr />
                <br />

                {/* Conditional Rendering */}
                {courseQuizzes.length === 0 ? (
                    <div className="alert alert-warning" role="alert">
                        <b>Click the '+ Quiz' button to Create a New Quiz !!!!</b>
                    </div>
                ) : (
                    <ul id="wd-assignment-list" className="list-group rounded-0 w-100">
                        <li className="wd-assignment-list-item list-group-item p-0 mb-5 fs-5 border-gray">
                            <div className="p-3 ps-2 bg-secondary">
                                <VscTriangleDown className="me-2 fs-5" />
                                <span style={{ fontWeight: "bold", color: "black" }}>Assignments Quizzes</span>
                            </div>

                            {/* Dynamic List of Quizzes */}
                            <ul className="wd-lessons list-group rounded-0">
                                {courseQuizzes.map(quiz => {
                                    const { status, isAvailable } = getAvailabilityStatus(quiz);
                                    return (
                                        <li key={quiz._id} className="wd-lesson list-group-item p-3 ps-1">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <IoRocketOutline className="me-4 fs-3 text-success" />
                                                </div>

                                                {/* Quiz Details */}
                                                <div className="text-left flex-grow-1">
                                                    <a
                                                        className="wd-assignment-link"
                                                        href={`#/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}`}
                                                        style={{ textDecoration: "none", fontWeight: "bold", color: "black" }}
                                                    >
                                                        {quiz.title}
                                                    </a>
                                                    <br />
                                                    {/* Availability, Due Date, Points, and Questions Count */}
                                                    <div>
                                                        <b>{status}</b> | <b>Due </b>
                                                        {new Date(quiz.dueDate).toLocaleDateString("en-US", {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: 'numeric',
                                                            minute: 'numeric'
                                                        })}
                                                        {" | "}
                                                        {quiz.points} pts | {quiz.questions.length} Questions
                                                    </div>
                                                </div>

                                                {/* Quiz Action Buttons with availability status */}
                                                <SingleQuizButtons isAvailable={isAvailable} />
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    </ul>
                )}
                <br />
            </div>
        </div>
    );
}
