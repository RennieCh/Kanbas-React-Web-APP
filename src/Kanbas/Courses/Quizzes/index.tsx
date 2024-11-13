import QuizzesControls from "./QuizzesControls";
import { VscTriangleDown } from "react-icons/vsc";
import { IoRocketOutline } from "react-icons/io5";
import SingleQuizButtons from "./SingleQuizButtons";

export default function Quizzes() {

    return (
        <div className="container-fluid">
            <div id="wd-quizzes">
                <QuizzesControls /> <br />
                <hr />
                <br />

                <ul id="wd-assignment-list" className="list-group rounded-0 w-100">
                    <li className="wd-assignment-list-item list-group-item p-0 mb-5 fs-5 border-gray">
                        <div className="p-3 ps-2 bg-secondary">
                            <VscTriangleDown className="me-2 fs-5" />
                            <span style={{ fontWeight: "bold", color: "black" }}>Assignments Quizzes</span>
                        </div>

                        <ul className="wd-lessons list-group rounded-0">
                            <li className="wd-lesson list-group-item p-3 ps-1">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <IoRocketOutline className="me-4 fs-3 text-success" />
                                    </div>

                                    <div className="text-left flex-grow-1">
                                        <a className="wd-assignment-link"
                                            href="#/Kanbas/Courses/1234/Quizzes/123"
                                            style={{ textDecoration: "none", fontWeight: "bold", color: "black" }}>
                                            Q1 - HTML
                                        </a>
                                        <br />
                                        <b>Closed |</b><b>Due</b> Sep 21 at 1:00pm | 29 pts | 11 Questions
                                    </div>
                                    <SingleQuizButtons />

                                </div>
                            </li>

                            <li className="wd-lesson list-group-item p-3 ps-1">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <IoRocketOutline className="me-4 fs-3 text-success" />
                                    </div>
                                    <div className="text-left flex-grow-1">
                                        <a className="wd-assignment-link"
                                            href="#/Kanbas/Courses/1234/Quizzes/123"
                                            style={{ textDecoration: "none", fontWeight: "bold", color: "black" }}>
                                            Q2 - CSS
                                        </a>
                                        <br />
                                        <b>Closed |</b><b>Due</b> Oct 5 at 1:00pm | 32 pts | 7 Questions
                                    </div>
                                    <SingleQuizButtons />
                                </div>
                            </li>

                            <li className="wd-lesson list-group-item p-3 ps-1">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <IoRocketOutline className="me-4 fs-3 text-success" />
                                    </div>
                                    <div className="text-left flex-grow-1">
                                        <a className="wd-assignment-link"
                                            href="#/Kanbas/Courses/1234/Quizzes/123"
                                            style={{ textDecoration: "none", fontWeight: "bold", color: "black" }}>
                                            EXAM 1 FA 23
                                        </a>
                                        <br />
                                        <b>Closed |</b><b>Due</b> Oct 26 at 5:30pm | 113 pts | 20 Questions
                                    </div>
                                    <SingleQuizButtons />
                                </div>
                            </li>

                            <li className="wd-lesson list-group-item p-3 ps-1">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <IoRocketOutline className="me-4 fs-3 text-success" />
                                    </div>
                                    <div className="text-left flex-grow-1">
                                        <a className="wd-assignment-link"
                                            href="#/Kanbas/Courses/1234/Quizzes/123"
                                            style={{ textDecoration: "none", fontWeight: "bold", color: "black" }}>
                                            Q3 - JS, ES6
                                        </a>
                                        <br />
                                        <b>Available </b><span className="text-danger">Multiple Dates</span> | <b>Due</b> <span className="text-danger">Multiple Dates</span> | 38 pts | 13 Questions<br />
                                    </div>
                                    <SingleQuizButtons />
                                </div>
                            </li>

                            <li className="wd-lesson list-group-item p-3 ps-1">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <IoRocketOutline className="me-4 fs-3 text-success" />
                                    </div>
                                    <div className="text-left flex-grow-1">
                                        <a className="wd-assignment-link"
                                            href="#/Kanbas/Courses/1234/Quizzes/123"
                                            style={{ textDecoration: "none", fontWeight: "bold", color: "black" }}>
                                            Q3
                                        </a>
                                        <br />
                                        <b>Available </b><span className="text-danger">Multiple Dates</span> | <b>Due</b> <span className="text-danger">Multiple Dates</span> | 31 pts | 8 Questions<br />
                                    </div>
                                    <SingleQuizButtons />
                                </div>
                            </li>

                            <li className="wd-lesson list-group-item p-3 ps-1">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <IoRocketOutline className="me-4 fs-3 text-success" />
                                    </div>
                                    <div className="text-left flex-grow-1">
                                        <a className="wd-assignment-link"
                                            href="#/Kanbas/Courses/1234/Quizzes/123"
                                            style={{ textDecoration: "none", fontWeight: "bold", color: "black" }}>
                                            Q5 - MONGO
                                        </a>
                                        <br />
                                        <b>Not available until</b> Nov 30 at 11:40am |<b> Due</b> Nov 30 at 11:40am | 38 pts | 10 Questions
                                    </div>
                                    <SingleQuizButtons />
                                </div>
                            </li>
                            <li className="wd-lesson list-group-item p-3 ps-1">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <IoRocketOutline className="me-4 fs-3 text-success" />
                                    </div>
                                    <div className="text-left flex-grow-1">
                                        <a className="wd-assignment-link"
                                            href="#/Kanbas/Courses/1234/Quizzes/123"
                                            style={{ textDecoration: "none", fontWeight: "bold", color: "black" }}>
                                            EXAM 2 FA23
                                        </a>
                                        <br />
                                        <b>Not available until</b> Dec 15 at 10:30am |<b> Due</b> Dec 15 at 10:30am | 104 pts | 18 Questions
                                    </div>
                                    <SingleQuizButtons />
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul><br/>
            </div>
        </div>
    );
}
