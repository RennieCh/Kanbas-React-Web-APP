import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { enrollCourse, unenrollCourse } from "./reducer"; // Import actions

export default function Dashboard({
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
    const { enrollments } = useSelector((state: any) => state.enrollmentReducer); // Get enrollment state from reducer
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State to toggle between all courses and enrolled courses
    const [showAllCourses, setShowAllCourses] = useState(false);

    // Function to toggle between all courses and enrolled courses
    const toggleEnrollments = () => {
        setShowAllCourses(!showAllCourses);
    };

    // Filter courses based on enrollment state
    const filteredCourses = showAllCourses
        ? courses // Show all courses when toggled on
        : courses.filter((course) =>
            enrollments.some((enrollment: any) => enrollment.user === currentUser._id && enrollment.course === course._id)
        );

    // Handle enrollment
    const handleEnroll = (courseId: string) => {
        dispatch(enrollCourse({ user: currentUser._id, course: courseId }));
    };

    // Handle unenrollment
    const handleUnenroll = (courseId: string) => {
        dispatch(unenrollCourse({ user: currentUser._id, course: courseId }));
    };

    // Protect route to a course, only allow access if enrolled
    const handleGoToCourse = (courseId: string) => {
        const isEnrolled = enrollments.some((enrollment: any) => enrollment.user === currentUser._id && enrollment.course === courseId);
        if (isEnrolled) {
            navigate(`/Kanbas/Courses/${courseId}/Home`);
        } else {
            alert("You are not enrolled in this course!");
        }
    };

    // Function to generate the image path based on course _id
    const getImagePath = (courseId: string): string => {
        return courseId.startsWith("RS") ? `/images/${courseId.toLowerCase()}.jpg` : "/images/reactjs.jpg";
    };

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            {currentUser.role === "FACULTY" && ( // Only show controls if user is FACULTY
                <>
                    <h5>New Course
                        <button className="btn btn-primary float-end" id="wd-add-new-course-click" onClick={addNewCourse}>
                            Add
                        </button>
                        <button className="btn btn-warning float-end me-2" onClick={updateCourse} id="wd-update-course-click">
                            Update
                        </button>
                    </h5><br />
                    <input value={course.name} className="form-control mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                    <textarea value={course.description} className="form-control" onChange={(e) => setCourse({ ...course, description: e.target.value })} />
                    <hr />
                </>
            )}

            <div className="d-flex justify-content-between">
                <h2 id="wd-dashboard-published">Published Courses ({filteredCourses.length})</h2>
                {currentUser.role === "STUDENT" && (
                    <button className="btn btn-primary float-end" onClick={toggleEnrollments}>
                        {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
                    </button>
                )}
            </div>
            <hr />

            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-3">
                    {filteredCourses.map((course) => (
                        <div className="wd-dashboard-course col" key={course._id} style={{ width: "300px" }}>
                            <div className="card h-100 rounded-3 overflow-hidden">
                                <img src={getImagePath(course._id)} width="100%" height={160} alt={course.name} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title" style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                                        {course.name}
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text" style={{ maxHeight: 100, overflow: "hidden" }}>
                                        {course.description}
                                    </p>
                                    <button onClick={() => handleGoToCourse(course._id)} className="btn btn-primary">Go</button>

                                    {currentUser.role === "STUDENT" && showAllCourses && (
                                        <>
                                            {enrollments.some((enrollment: any) => enrollment.user === currentUser._id && enrollment.course === course._id) ? (
                                                <button
                                                    className="btn btn-danger float-end"
                                                    onClick={() => handleUnenroll(course._id)}
                                                >
                                                    Unenroll
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-success float-end me-2"
                                                    onClick={() => handleEnroll(course._id)}
                                                >
                                                    Enroll
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
