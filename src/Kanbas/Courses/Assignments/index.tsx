import AssignmentsControls from "./AssignmentsControls";
import { VscTriangleDown } from "react-icons/vsc";
import { BsGripVertical } from "react-icons/bs";
import { VscNotebook } from "react-icons/vsc";
import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";

export default function Assignments() {
    return (
        <div className="container-fluid">
            <div id="wd-assignments">
                <AssignmentsControls /> <br /><br />

                <ul id="wd-assignment-list" className="list-group rounded-0 w-100">
                    <li className="wd-assignment-list-item list-group-item p-0 mb-5 fs-5 border-gray">
                        <div className="p-3 ps-2 bg-secondary">
                            <BsGripVertical className="me-2 fs-3" />
                            <VscTriangleDown className="me-2 fs-5" />
                            <span style={{ fontWeight: "bold", color: "black" }}>ASSIGNMENTS</span>
                            <AssignmentControlButtons />
                        </div>

                        <ul className="wd-lessons list-group rounded-0">
                            <li className="wd-lesson list-group-item p-3 ps-1">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <BsGripVertical className="me-2 fs-3" />
                                        <VscNotebook className="me-2 fs-3 text-success" />
                                    </div>

                                    <div className="text-left">
                                        <a className="wd-assignment-link"
                                            href="#/Kanbas/Courses/1234/Assignments/123"
                                            style={{ textDecoration: "none", fontWeight: "bold", color: "black" }}>
                                            A1
                                        </a>
                                        <br />
                                        <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 5 at 12:00am |<br />
                                        <b>Due</b> May 13 at 11:59pm | 100 pts
                                    </div>

                                    <LessonControlButtons />
                                </div>
                            </li>

                            <li className="wd-lesson list-group-item p-3 ps-1">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <BsGripVertical className="me-2 fs-3" />
                                        <VscNotebook className="me-2 fs-3 text-success" />
                                    </div>
                                    <div className="text-left">
                                        <a className="wd-assignment-link"
                                            href="#/Kanbas/Courses/1234/Assignments/123"
                                            style={{ textDecoration: "none", fontWeight: "bold", color: "black" }}>
                                            A2
                                        </a>
                                        <br />
                                        <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 13 at 12:00am |<br />
                                        <b>Due</b> May 20 at 11:59pm | 100 pts
                                    </div>
                                    <LessonControlButtons />
                                </div>
                            </li>

                            <li className="wd-lesson list-group-item p-3 ps-1">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <BsGripVertical className="me-2 fs-3" />
                                        <VscNotebook className="me-2 fs-3 text-success" />
                                    </div>
                                    <div className="text-left">
                                        <a className="wd-assignment-link"
                                            href="#/Kanbas/Courses/1234/Assignments/123"
                                            style={{ textDecoration: "none", fontWeight: "bold", color: "black" }}>
                                            A3
                                        </a>
                                        <br />
                                        <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 20 at 12:00am |<br />
                                        <b>Due</b> May 27 at 11:59pm | 100 pts
                                    </div>
                                    <LessonControlButtons />
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}

