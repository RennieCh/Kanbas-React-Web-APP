import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as db from "../Database";

export default function Dashboard() {
    // Convert courses constant to a state variable
    const [courses, setCourses] = useState(db.courses);

    const [course, setCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "/images/reactjs.jpg", description: "New Description"
    });

    // Function to generate the image path based on course _id
    const getImagePath = (courseId: string): string => {
        // If the courseId starts with "RS", return the corresponding image
        if (courseId.startsWith("RS")) {
            return `/images/${courseId.toLowerCase()}.jpg`;
        }
        // Otherwise, use the default reactjs image
        return "/images/reactjs.jpg";
    };

    // create addNewCourse event handler that sets courses as copy of current courses state array
    // add course at the end of the array, overriding _id to current time stamp
    const addNewCourse = () => {
        const newCourse = {
            ...course,
            _id: new Date().getTime().toString()
        };
        setCourses([...courses, { ...course, ...newCourse }]);
    };

    // add deleteCourse event handler accepting ID of course to remove by filtering out the course by its ID
    const deleteCourse = (courseId: string) => {
        setCourses(courses.filter((course) => course._id !== courseId));
    };

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <h5>New Course
                <button className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={addNewCourse} > Add
                </button> </h5><br />
            <input defaultValue={course.name} className="form-control mb-2"
                onChange={(e) => setCourse({ ...course, name: e.target.value })} />
            <textarea defaultValue={course.description} className="form-control"
                onChange={(e) => setCourse({ ...course, description: e.target.value })} />
            <hr />
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-3">
                    {courses.map((course) => (
                        <div className="wd-dashboard-course col" key={course._id} style={{ width: "300px" }}>
                            <Link className="text-decoration-none wd-dashboard-course-link" to={`/Kanbas/Courses/${course._id}/Home`}>
                                <div className="card h-100 rounded-3 overflow-hidden">
                                    <img
                                        src={getImagePath(course._id)}
                                        width="100%"
                                        height={160}
                                        alt={course.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title"
                                            style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}
                                        >
                                            {course.name}
                                        </h5>
                                        <p className="wd-dashboard-course-title card-text" style={{ maxHeight: 100, overflow: "hidden" }}>
                                            {course.description}
                                        </p>
                                        <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">Go</Link>
                                        <button onClick={(event) => {
                                            event.preventDefault();
                                            deleteCourse(course._id);
                                        }} className="btn btn-danger float-end"
                                            id="wd-delete-course-click">Delete</button>

                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
