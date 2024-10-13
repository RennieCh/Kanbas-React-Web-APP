import { useParams, Link } from "react-router-dom";
import * as db from "../../Database"; 

export default function AssignmentEditor() {
    const { cid, aid } = useParams(); // Get courseId (cid) and assignmentId (aid) from URL
    const assignment = db.assignments.find((a: any) => a._id === aid); // Find the assignment by ID

    // Helper function to format dates
    const formatDateTimeForInput = (date: string, isDueDate = false) => {
        const dateObj = new Date(`${date}T00:00:00`); // Parse the date
        if (isDueDate) {
            dateObj.setHours(23, 59, 0, 0); // Set to 11:59 PM for due dates
        } else {
            dateObj.setHours(0, 0, 0, 0); // Set to 12:00 AM for available dates
        }
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-based, pad with 0 if needed
        const day = String(dateObj.getDate()).padStart(2, '0');
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    
        // Return formatted date string for `datetime-local` input: "YYYY-MM-DDTHH:MM"
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    return (
        <div id="wd-assignments-editor" className="container-fluid mt-4 p-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="row mb-3">
                <div className="col-12">
                    <label htmlFor="wd-name" className="form-label">Assignment Name</label>
                    <input id="wd-name" className="form-control" value={assignment?.title || ""} readOnly />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-12">
                    <textarea id="wd-description" className="form-control" cols={30} rows={10}>
                        {assignment?.description || ""}
                    </textarea>
                </div>
            </div>

            {/* Points Section */}
            <div className="row mb-3">
                <label htmlFor="wd-points" className="col-sm-3 col-form-label text-end">Point</label>
                <div className="col-sm-9">
                    <input id="wd-points" className="form-control" value={assignment?.points || 0} readOnly />
                </div>
            </div>

            {/* Assignment Group */}
            <div className="row mb-3">
                <label htmlFor="wd-group" className="col-sm-3 col-form-label text-end">Assignment Group</label>
                <div className="col-sm-9">
                    <select id="wd-group" className="form-select">
                        <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                        <option value="QUIZZES">QUIZZES</option>
                    </select>
                </div>
            </div>

            {/* Display Grade As */}
            <div className="row mb-3">
                <label htmlFor="wd-display-grade-as" className="col-sm-3 col-form-label text-end">Display Grade as</label>
                <div className="col-sm-9">
                    <select id="wd-display-grade-as" className="form-select">
                        <option selected value="PERCENTAGE">Percentage</option>
                        <option value="NUMBER">Number</option>
                    </select>
                </div>
            </div>

            {/* Submission Type */}
            <div className="row mb-3">
                <label htmlFor="wd-submission-type" className="col-sm-3 col-form-label text-end">Submission Type</label>
                <div className="col-sm-9">
                    <div className="p-3 border rounded">
                        <select id="wd-submission-type" className="form-select mb-2">
                            <option selected value="ONLINE">Online</option>
                            <option value="HANDOUT">Handout</option>
                        </select>

                        {/* Online Entry Options */}
                        <label className="form-label fw-bold">Online Entry Options</label>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="wd-text-entry" />
                            <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="wd-website-url" defaultChecked />
                            <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="wd-media-recordings" />
                            <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="wd-student-annotation" />
                            <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="wd-file-upload" />
                            <label className="form-check-label" htmlFor="wd-file-upload">File Uploads</label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Assign To */}
            <div className="row mb-3">
                <label htmlFor="wd-assign-to" className="col-sm-3 col-form-label text-end">Assign</label>
                <div className="col-sm-9">
                    <div className="p-3 border rounded">
                        <label className="fw-bold">Assign to</label>
                        <div className="input-group mb-2">
                            <div className="form-control d-flex align-items-center">
                                <span className="badge bg-light text-dark p-2">
                                    Everyone
                                    <button type="button" className="btn-close btn-sm ms-2" aria-label="Remove"></button>
                                </span>
                            </div>
                        </div>

                        <label htmlFor="wd-due-date" className="form-label fw-bold">Due</label>
                        <input type="datetime-local" className="form-control mb-2" id="wd-due-date" value={assignment ? formatDateTimeForInput(assignment.due_date, true) : ""} />

                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="wd-available-from" className="form-label fw-bold">Available From</label>
                                <input type="datetime-local" className="form-control" id="wd-available-from" value={assignment ? formatDateTimeForInput(assignment.available_date, false) : ""}  />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="wd-available-until" className="form-label fw-bold">Until</label>
                                <input type="datetime-local" className="form-control" id="wd-available-until" value={assignment ? formatDateTimeForInput(assignment.due_date, true) : ""} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            {/* Cancel and Save Buttons */}
            <div className="row">
                <div className="col-12 text-end">
                    <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">Cancel</Link>
                    <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-danger">Save</Link>
                </div>
            </div>
        </div>
    );
}
