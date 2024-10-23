import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as db from "../Database";

export default function Dashboard(
    {
        courses,
        course,
        setCourse,
        addNewCourse,
        deleteCourse,
        updateCourse
    }: {
        courses: any[];
        course: any;
        setCourse: (course: any) => void;
        addNewCourse: () => void;
        deleteCourse: (courseId: string) => void;
        updateCourse: () => void;
    }) {

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = db;


    // Function to generate the image path based on course _id
    const getImagePath = (courseId: string): string => {
        if (courseId.startsWith("RS")) {
            return `/images/${courseId.toLowerCase()}.jpg`;
        }
        return "/images/reactjs.jpg";
    };

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            {currentUser.role === "FACULTY" && ( // Only show controls if user is FACULTY
                <>
                    <h5>New Course
                        <button className="btn btn-primary float-end"
                            id="wd-add-new-course-click" onClick={addNewCourse}>
                            Add
                        </button>
                        <button className="btn btn-warning float-end me-2"
                            onClick={updateCourse} id="wd-update-course-click">
                            Update
                        </button>
                    </h5><br />
                    <input
                        value={course.name}
                        className="form-control mb-2"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })}
                    />
                    <textarea
                        value={course.description}
                        className="form-control"
                        onChange={(e) => setCourse({ ...course, description: e.target.value })}
                    />
                    <hr />
                </>
            )}

            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-3">
                    {courses.filter((course) => enrollments.some(
                        (enrollment) => enrollment.user === currentUser._id &&
                            enrollment.course === course._id)).map((course) => (
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
                                                    style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                                                    {course.name}
                                                </h5>
                                                <p className="wd-dashboard-course-title card-text" style={{ maxHeight: 100, overflow: "hidden" }}>
                                                    {course.description}
                                                </p>
                                                <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">Go</Link>
                                                {currentUser.role === "FACULTY" && ( // Only show controls if user is FACULTY
                                                    <>
                                                        <button onClick={(event) => { event.preventDefault(); deleteCourse(course._id); }}
                                                            className="btn btn-danger float-end" id="wd-delete-course-click">
                                                            Delete
                                                        </button>
                                                        <button id="wd-edit-course-click" onClick={(event) => { event.preventDefault(); setCourse(course); }}
                                                            className="btn btn-warning me-2 float-end">
                                                            Edit
                                                        </button>
                                                    </>
                                                )}
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
