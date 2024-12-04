import React, { useEffect, useState } from "react";
import AssignmentsControls from "./AssignmentsControls";
import { VscTriangleDown, VscNotebook } from "react-icons/vsc";
import { BsGripVertical } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { setAssignments, deleteAssignment } from "./reducer";
import { Modal, Button } from "react-bootstrap";
import * as assignmentsClient from "../Assignments/client";

export default function Assignments() {
    const { cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const [showModal, setShowModal] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const fetchedAssignments = await assignmentsClient.fetchAssignmentsForCourse(cid!);
                dispatch(setAssignments(fetchedAssignments));
            } catch (error) {
                console.error("Error fetching assignments:", error);
            }
        };
        if (cid) fetchAssignments();
    }, [cid, assignments, dispatch]);

    const courseAssignments = assignments.filter(
        (assignment: any) => assignment.course?._id === cid
    );
    const formatDateTime = (date: string, isDueDate = false) => {
        const dateObj = new Date(`${date}T00:00:00`);
        if (isDueDate) dateObj.setHours(23, 59, 0, 0);
        return format(dateObj, "MMMM d, yyyy h:mm a");
    };

    const handleDeleteClick = (assignment: any) => {
        setSelectedAssignment(assignment);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedAssignment) {
            try {
                await assignmentsClient.deleteAssignment(selectedAssignment._id);
                dispatch(deleteAssignment(selectedAssignment._id));
                setSelectedAssignment(null);
                setShowModal(false);
            } catch (error) {
                console.error("Error deleting assignment:", error);
            }
        }
    };

    const handleCancelDelete = () => {
        setSelectedAssignment(null);
        setShowModal(false);
    };

    const handleAssignmentClick = (assignmentId: string) => {
        if (currentUser.role === "FACULTY") {
            navigate(`/Kanbas/Courses/${cid}/Assignments/${assignmentId}`);
        } else {
            alert("You do not have permission to edit this assignment.");
        }
    };

    return (
        <div className="container-fluid">
            <div id="wd-assignments">
                {currentUser.role === "FACULTY" && <AssignmentsControls />}
                <br />
                <br />

                <ul id="wd-assignment-list" className="list-group rounded-0 w-100">
                    <li className="wd-assignment-list-item list-group-item p-0 mb-5 fs-5 border-gray">
                        <div className="p-3 ps-2 bg-secondary">
                            <BsGripVertical className="me-2 fs-3" />
                            <VscTriangleDown className="me-2 fs-5" />
                            <span style={{ fontWeight: "bold", color: "black" }}>ASSIGNMENTS</span>
                            <AssignmentControlButtons />
                        </div>
                        <ul className="wd-lessons list-group rounded-0">
                            {courseAssignments.map((assignment: any) => (
                                <li key={assignment._id} className="wd-lesson list-group-item p-3 ps-1">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <BsGripVertical className="me-2 fs-3" />
                                            <VscNotebook className="me-4 fs-3 text-success" />
                                        </div>
                                        <div className="text-left flex-grow-1">
                                            <span
                                                className="wd-assignment-link"
                                                onClick={() => handleAssignmentClick(assignment._id)}
                                                style={{ cursor: "pointer", fontWeight: "bold", color: "black", textDecoration: "none" }}
                                            >
                                                {assignment.title}
                                            </span>
                                            <br />
                                            <span className="text-danger">Multiple Modules</span> | <b>Not available until</b>{" "}
                                            {formatDateTime(assignment.available_date)} | <br />
                                            <b>Due</b> {formatDateTime(assignment.due_date, true)} | {assignment.points} pts
                                        </div>
                                        {currentUser.role === "FACULTY" && (
                                            <FaTrash
                                                className="text-danger me-2 mb-1"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => handleDeleteClick(assignment)}
                                            />
                                        )}
                                        <LessonControlButtons />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
                <Modal show={showModal} onHide={handleCancelDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete the assignment "{selectedAssignment?.title}"?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCancelDelete}>
                            No
                        </Button>
                        <Button variant="danger" onClick={handleConfirmDelete}>
                            Yes, Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
