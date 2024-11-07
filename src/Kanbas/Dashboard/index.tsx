import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { enrollCourse, unenrollCourse } from "./reducer";
import { fetchAllCourses } from "../Courses/client";

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
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddCourse = () => {
        const newCourseId = new Date().getTime().toString();
        setCourse({ ...course, _id: newCourseId });
        addNewCourse();

        if (currentUser && currentUser._id) {
            dispatch(enrollCourse({ user: currentUser._id, course: newCourseId }));
        }

        setCourse({
            _id: "0",
            name: "New Course",
            number: "New Number",
            startDate: "2023-09-10",
            endDate: "2023-12-15",
            image: "/images/reactjs.jpg",
            description: "New Description"
        });
    };

    const handleUpdateCourse = () => {
        updateCourse();
        setCourse({
            _id: "0",
            name: "New Course",
            number: "New Number",
            startDate: "2023-09-10",
            endDate: "2023-12-15",
            image: "/images/reactjs.jpg",
            description: "New Description"
        });
    };

    // **State to store all courses fetched from the server**
    const [allCourses, setAllCourses] = useState<any[]>([]);
    // State to toggle between all courses and enrolled courses
    const [showAllCourses, setShowAllCourses] = useState(false);

    // **Fetch all courses when showAllCourses is toggled on**
    useEffect(() => {
        const fetchAll = async () => {
            if (showAllCourses) {
                try {
                    const fetchedCourses = await fetchAllCourses();
                    setAllCourses(fetchedCourses);
                } catch (error) {
                    console.error("Failed to fetch all courses:", error);
                }
            }
        };
        fetchAll();
    }, [showAllCourses]);

    // **Create a list of enrolled course IDs**
    const enrolledCoursesIds = courses.map((course) => course._id);

    // Toggle function to switch between all and enrolled courses
    const toggleEnrollments = () => {
        setShowAllCourses(!showAllCourses);
    };

    // Filter courses based on the `showAllCourses` state
    const filteredCourses = showAllCourses ? allCourses : courses;

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
        navigate(`/Kanbas/Courses/${courseId}/Home`);
    };

    // Function to generate the image path based on course _id
    const getImagePath = (courseId: string): string => {
        return courseId.startsWith("RS") ? `/images/${courseId.toLowerCase()}.jpg` : "/images/reactjs.jpg";
    };

    // for debugging purpose
    useEffect(() => {
        console.log("Courses prop updated in Dashboard:", courses);
    }, [courses]);

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            {currentUser.role === "FACULTY" && (
                <>
                    <h5>New Course
                        <button
                            className="btn btn-primary float-end"
                            id="wd-add-new-course-click"
                            onClick={handleAddCourse}
                        >
                            Add
                        </button>
                        <button className="btn btn-warning float-end me-2"
                            onClick={handleUpdateCourse}
                            id="wd-update-course-click">
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
                        {showAllCourses ? "Enrollment : Show Enrolled Courses" : "Enrollment : Show All Courses"}
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
                                    {currentUser.role === "FACULTY" && (
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
                                    {currentUser.role === "STUDENT" && showAllCourses && (
                                        <>
                                            {enrolledCoursesIds.includes(course._id) ? (
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
