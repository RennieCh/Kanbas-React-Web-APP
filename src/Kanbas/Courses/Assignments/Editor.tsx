export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor" className="container-fluid mt-4 p-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>

            <div className="row mb-3">
                <div className="col-12">
                    <label htmlFor="wd-name" className="form-label">Assignment Name</label>
                    <input id="wd-name" className="form-control" value="A1 - ENV + HTML" />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-12">
                    <textarea id="wd-description" className="form-control" cols={30} rows={10}>
                        The assignment is available online. Submit a link to the landing page of
                        your Web application running on Netlify. The landing page should include
                        the following: Your full name and section links to each of the lab assignments,
                        Link to the Kanbas application, Links to all relevant source code repositories.
                        The Kanbas application should include a link to navigate back to the landing page.
                    </textarea>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="wd-points" className="col-sm-3 col-form-label text-end">Point</label>
                <div className="col-sm-9">
                    <input id="wd-points" className="form-control" value={100} />
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="wd-group" className="col-sm-3 col-form-label text-end">Assignment Group</label>
                <div className="col-sm-9">
                    <select id="wd-group" className="form-select">
                        <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                        <option value="QUIZZES">QUIZZES</option>
                    </select>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="wd-display-grade-as" className="col-sm-3 col-form-label text-end">Display Grade as</label>
                <div className="col-sm-9">
                    <select id="wd-display-grade-as" className="form-select">
                        <option selected value="PERCENTAGE">Percentage</option>
                        <option value="NUMBER">Number</option>
                    </select>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="wd-submission-type" className="col-sm-3 col-form-label text-end">Submission Type</label>
                <div className="col-sm-9">
                    <div className="p-3 border rounded">
                        <select id="wd-submission-type" className="form-select mb-2">
                            <option selected value="ONLINE">Online</option>
                            <option value="HANDOUT">Handout</option>
                        </select>

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
                        <input type="datetime-local" className="form-control mb-2" id="wd-due-date" value="2024-05-13T23:59" />

                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="wd-available-from" className="form-label fw-bold">Available From</label>
                                <input type="datetime-local" className="form-control" id="wd-available-from" value="2024-05-16T23:59" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="wd-available-until" className="form-label fw-bold">Until</label>
                                <input type="datetime-local" className="form-control" id="wd-available-until" value="2024-05-20T23:59" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            <div className="row">
                <div className="col-12 text-end">
                    <button type="button" className="btn btn-secondary me-2">Cancel</button>
                    <button type="button" className="btn btn-danger">Save</button>
                </div>
            </div>
        </div>
    );
}
