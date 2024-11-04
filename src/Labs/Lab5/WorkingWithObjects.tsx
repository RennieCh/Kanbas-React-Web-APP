import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1,
        title: "NodeJS Assignmet",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10",
        completed: false,
        score: 0,
    });
    const [module, setModule] = useState({
        id: "M101",
        name: "Introduction to Rocket Propulsion",
        description: "Basic principles of rocket propulsion and rocket engines.",
        course: "RS101",
    });

    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>
            <h4>Retrieving Objects</h4>
            <a id="wd-retrieve-assignments" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/assignment`}>
                Get Assignment
            </a>
            <h4>Retrieving Properties</h4>
            <a id="wd-retrieve-assignment-title" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/assignment/title`}>
                Get Title
            </a>
            <h4>Modifying Properties</h4>
            <a id="wd-update-assignment-title"
                className="btn btn-primary float-end me-2"
                href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <input className="form-control w-75 mb-2" id="wd-assignment-title"
                defaultValue={assignment.title}
                onChange={(e) =>
                    setAssignment({ ...assignment, title: e.target.value })} />

            <a id="wd-update-assignment-score"
                className="btn btn-primary float-end me-2"
                href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                Update Score
            </a>
            <input className="form-control w-75 mb-2" id="wd-assignment-score"
                defaultValue={assignment.score}
                onChange={(e) =>
                    setAssignment({ ...assignment, score: parseInt(e.target.value) })} />

            <div className="d-flex align-items-center mb-2">
                <div className="form-check me-2">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="wd-assignment-completed"
                        checked={assignment.completed}
                        onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}
                    />
                    <label className="form-check-label" htmlFor="wd-assignment-completed">
                        Completed
                    </label>
                </div>
                <a
                    id="wd-update-assignment-completed"
                    className="btn btn-primary ms-auto me-2"
                    href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
                >
                    Update Completed Status
                </a>
            </div>
            <hr />
            <h4>Retrieving Module Objects</h4>
            <a id="wd-retrieve-module" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/module`}>
                Get Module
            </a>
            <h4>Retrieving Module Properties</h4>
            <a id="wd-retrieve-module-name" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/module/name`}>
                Get Module Name
            </a>
            <h4>Modifying Module Properties</h4>
            <a id="wd-update-module-name"
                className="btn btn-primary float-end me-2"
                href={`${MODULE_API_URL}/name/${module.name}`}>
                Update Name
            </a>
            <input className="form-control w-75 mb-2" id="wd-module-name"
                defaultValue={module.name}
                onChange={(e) =>
                    setModule({ ...module, name: e.target.value })} />
            <a id="wd-update-module-description"
                className="btn btn-primary float-end me-2"
                href={`${MODULE_API_URL}/description/${module.description}`}>
                Update description
            </a>
            <input className="form-control w-75 mb-2" id="wd-module-description"
                defaultValue={module.description}
                onChange={(e) =>
                    setModule({ ...module, description: e.target.value })} />
            <hr />
        </div>
    );
}