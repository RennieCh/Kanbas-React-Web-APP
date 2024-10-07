import { Link } from "react-router-dom";
import * as db from "../Database";

export default function Dashboard() {
    const courses = db.courses;

    // Function to generate the image path based on course _id
    const getImagePath = (courseId: string): string => {
        return `/images/${courseId.toLowerCase()}.jpg`;
    };

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-3">
                    {courses.map((course) => (
                        <div className="wd-dashboard-course col" key={course._id} style={{ width: "300px" }}>
                            <Link className="text-decoration-none" to={`/Kanbas/Courses/${course._id}/Home`}>
                                <div className="card h-100 rounded-3 overflow-hidden">
                                    <img
                                        src={getImagePath(course._id)}
                                        width="100%"
                                        height={160}
                                        alt={course.name}
                                    />
                                    <div className="card-body">
                                        <span className="wd-dashboard-course-link"
                                            style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                                            {course.name}
                                        </span>
                                        <p className="wd-dashboard-course-title card-text" style={{ maxHeight: 53, overflow: "hidden" }}>
                                            {course.description}
                                        </p>
                                        <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">Go</Link>
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
