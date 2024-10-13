import AssignmentsControls from "./AssignmentsControls";
import { VscTriangleDown } from "react-icons/vsc";
import { BsGripVertical } from "react-icons/bs";
import { VscNotebook } from "react-icons/vsc";
import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { useParams } from "react-router";
import * as db from "../../Database";
import { format } from 'date-fns'; // To format the dates

export default function Assignments() {
    const { cid } = useParams(); // Get the course ID from the URL
    const assignments = db.assignments; // Import assignments from the database

    // Filter assignments for the current course
    const courseAssignments = assignments.filter((assignment: any) => assignment.course === cid);

    // Helper function to format date and time
    const formatDateTime = (date: string, isDueDate = false) => {
        const dateObj = new Date(`${date}T00:00:00`); // Default to midnight

        if (isDueDate) {
            // Manually set the time to 11:59 PM for due dates
            dateObj.setHours(23, 59, 0, 0);
        }

        return format(dateObj, 'MMMM d, yyyy h:mm a'); // Format date accordingly
    };

    return (
        <div className="container-fluid">
            <div id="wd-assignments">
                <AssignmentsControls />
                <br /><br />

                <ul id="wd-assignment-list" className="list-group rounded-0 w-100">
                    <li className="wd-assignment-list-item list-group-item p-0 mb-5 fs-5 border-gray">
                        <div className="p-3 ps-2 bg-secondary">
                            <BsGripVertical className="me-2 fs-3" />
                            <VscTriangleDown className="me-2 fs-5" />
                            <span style={{ fontWeight: "bold", color: "black" }}>ASSIGNMENTS</span>
                            <AssignmentControlButtons />
                        </div>

                        {/* Render filtered assignments */}
                        <ul className="wd-lessons list-group rounded-0">
                            {courseAssignments.map((assignment: any) => (
                                <li key={assignment._id} className="wd-lesson list-group-item p-3 ps-1">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <BsGripVertical className="me-2 fs-3" />
                                            <VscNotebook className="me-4 fs-3 text-success" />
                                        </div>

                                        <div className="text-left flex-grow-1">
                                            <a className="wd-assignment-link"
                                                href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                                                style={{ textDecoration: "none", fontWeight: "bold", color: "black" }}>
                                                {assignment.title}
                                            </a>
                                            <br />
                                            <span className="text-danger">Multiple Modules</span> |
                                            <b>Not available until</b> {formatDateTime(assignment.available_date)} |<br />
                                            <b>Due</b> {formatDateTime(assignment.due_date, true)} | {assignment.points} pts
                                        </div>

                                        <LessonControlButtons />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}
