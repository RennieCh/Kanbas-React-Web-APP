import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor" className="container-fluid mt-4 p-4">

            {/* Assignment Name */}
            <div className="row mb-3">
                <div className="col-sm-2">
                    <label htmlFor="wd-name" className="form-label">Assignment Name</label>
                </div>
                <div className="col-sm-10">
                    <input id="wd-name" className="form-control" value="A1 - ENV + HTML" />
                </div>
            </div>

            {/* Assignment Description */}
            <div className="row mb-3">
                <div className="col-sm-2">
                    <label htmlFor="wd-description" className="form-label">Assignment Description</label>
                </div>
                <div className="col-sm-10">
                    <textarea id="wd-description" className="form-control" rows={5}>
                        The assignment is available online. Submit a link to the landing page of
                        your Web application running on Netlify. The landing page should include
                        the following: Your full name and section links to each of the lab assignments,
                        Link to the Kanbas application, Links to all relevant source code repositories.
                        The Kanbas application should include a link to navigate back to the landing page.
                    </textarea>
                </div>
            </div>

            {/* Points, Assignment Group */}
            <div className="row mb-3">
                <div className="col-sm-2">
                    <label htmlFor="wd-points" className="form-label">Points</label>
                </div>
                <div className="col-sm-10">
                    <input id="wd-points" className="form-control" value={100} />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-2">
                    <label htmlFor="wd-group" className="form-label">Assignment Group</label>
                </div>
                <div className="col-sm-10">
                    <select id="wd-group" className="form-select">
                        <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                        <option value="QUIZZES">QUIZZES</option>
                    </select>
                </div>
            </div>

            {/* Display Grade */}
            <div className="row mb-3">
                <div className="col-sm-2">
                    <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
                </div>
                <div className="col-sm-10">
                    <select id="wd-display-grade-as" className="form-select">
                        <option selected value="PERCENTAGE">Percentage</option>
                        <option value="NUMBER">Number</option>
                    </select>
                </div>
            </div>

            {/* Submission Type */}
            <div className="row mb-3">
                <div className="col-sm-2">
                    <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
                </div>
                <div className="col-sm-10">
                    <select id="wd-submission-type" className="form-control mb-2">
                        <option selected value="ONLINE">Online</option>
                        <option value="HANDOUT">Handout</option>
                    </select>

                    <label className="form-label">Online Entry Options</label>
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

            {/* Assign to and Due Dates */}
            <div className="row mb-3">
                <div className="col-sm-2">
                    <label htmlFor="wd-assign-to" className="form-label">Assign to</label>
                </div>
                <div className="col-sm-10">
                    <input id="wd-assign-to" className="form-control mb-2" value="Everyone" />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-2">
                    <label htmlFor="wd-due-date" className="form-label">Due</label>
                </div>
                <div className="col-sm-10">
                    <input type="date" className="form-control mb-2" id="wd-due-date" value="2024-05-13" />
                </div>
            </div>

            <hr />

            {/* Action Buttons */}
            <div className="row">
                <div className="col-12 text-end">
                    <button type="button" className="btn btn-secondary me-2">Cancel</button>
                    <button type="button" className="btn btn-danger">Save</button>
                </div>
            </div>
        </div>
    );
}
