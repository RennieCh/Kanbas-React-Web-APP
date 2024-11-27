import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchAllCourses, fetchAllEnrollments, enrollUser, unenrollUser } from "../Courses/client";
import { findMyCourses } from "../Account/client";

type Course = {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    image: string;
    description: string;
    enrolled?: boolean;
};

// Utility function to remove duplicates by _id
const mergeUniqueCourses = (existing: any[], newCourses: any[]) => {
    const uniqueById = new Map();
    [...existing, ...newCourses].forEach((course) => {
        uniqueById.set(course._id, course);
    });
    return Array.from(uniqueById.values());
};

export default function Dashboard({
    courses,
    course,
    setCourse,
    addNewCourse,
    deleteCourse,
    updateCourse,
    fetchCourses,
    enrolling,
    setEnrolling,
    updateEnrollment,
}: {
    courses: any[];
    course: any;
    setCourse: (course: any) => void;
    addNewCourse: () => Promise<any>;
    deleteCourse: (courseId: string) => void;
    updateCourse: () => void;
    fetchCourses: () => Promise<void>;
    enrolling: boolean;
    setEnrolling: (enrolling: boolean) => void;
    updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const navigate = useNavigate();

    const [allCourses, setAllCourses] = useState<any[]>([]);
    const [myEnrolledCourses, setMyEnrolledCourses] = useState<any[]>([]);
    const [enrollments, setEnrollments] = useState<any[]>([]);
    const [showAllCourses, setShowAllCourses] = useState(false);

    const fetchAndSetCourses = async () => {
        try {
            if (showAllCourses) {
                const allFetchedCourses = await fetchAllCourses();
                const enrolledFetchedCourses = await findMyCourses();

                // Merge all courses and deduplicate by `_id`
                const mergedCourses = mergeUniqueCourses(
                    allFetchedCourses,
                    enrolledFetchedCourses.map((course: Course) => ({
                        ...course,
                        enrolled: true,
                    }))
                );

                setAllCourses(mergedCourses);
            } else {
                const myCourses = await findMyCourses();
                setMyEnrolledCourses(myCourses);
            }
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        }
    };


    useEffect(() => {
        fetchAndSetCourses();
    }, [showAllCourses, currentUser]);


    const handleAddCourse = async () => {
        try {
            const newCourse = await addNewCourse();
            if (newCourse) {
                // Update all courses without duplicates
                setAllCourses((prevCourses) => mergeUniqueCourses(prevCourses, [newCourse]));

                if (currentUser.role === "FACULTY") {
                    // Enroll the current user (faculty) in the course if not already enrolled
                    const existingEnrollment = enrollments.find(
                        (enrollment) => enrollment.user === currentUser._id && enrollment.course === newCourse._id
                    );
                    if (!existingEnrollment) {
                        await updateEnrollment(newCourse._id, true);
                    }

                    // Add the new course to `myEnrolledCourses`
                    setMyEnrolledCourses((prevCourses) => mergeUniqueCourses(prevCourses, [newCourse]));
                }
            }
        } catch (error) {
            console.error("Failed to handle adding a new course:", error);
        }
    };


    const handleUpdateCourse = async () => {
        try {
            await updateCourse();
            fetchAndSetCourses();
        } catch (error) {
            console.error("Failed to update course:", error);
        }
    };

    const handleDeleteCourse = async (courseId: string) => {
        try {
            // Remove the course from state immediately
            setAllCourses((prevCourses) =>
                prevCourses.filter((course) => course._id !== courseId)
            );
            setMyEnrolledCourses((prevCourses) =>
                prevCourses.filter((course) => course._id !== courseId)
            );
    
            // Call the deleteCourse function to delete the course from the backend
            await deleteCourse(courseId);
    
            console.log(`Course with ID ${courseId} deleted successfully.`);
        } catch (error: any) {
            if (error instanceof Error) {
                console.error("Failed to delete course:", error.message);
                alert(`Failed to delete course: ${error.message}`);
            } else {
                console.error("Unexpected error:", error);
                alert("Failed to delete course. Please check the server logs for details.");
            }
        }
    };
    
    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const data = await fetchAllEnrollments(); // Use the function from client.ts
                setEnrollments(data);
            } catch (error) {
                console.error("Error fetching enrollments:", error);
            }
        };
    
        fetchEnrollments();
    }, [currentUser]);   

    const handleGoToCourse = (courseId: string) => {
    
        if (currentUser.role === "ADMIN") {
            navigate(`/Kanbas/Courses/${courseId}/Home`);
            return;
        }
    
        // Check if the user is enrolled
        const isEnrolled = enrollments.some(
            (enrollment) =>
                enrollment.status === "ENROLLED" &&
                String(enrollment.user._id) === String(currentUser._id) &&
                String(enrollment.course._id) === String(courseId)
        );
    
        if (isEnrolled) {
            navigate(`/Kanbas/Courses/${courseId}/Home`);
        } else {
            alert("You are not enrolled in this course!");
        }
    };    
    

    const getImagePath = (courseId: string): string => {
        return courseId.startsWith("RS") ? `/images/${courseId.toLowerCase()}.jpg` : "/images/reactjs.jpg";
    };

    const filteredCourses = showAllCourses ? allCourses : myEnrolledCourses;

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
                        <button
                            className="btn btn-warning float-end me-2"
                            onClick={handleUpdateCourse}
                            id="wd-update-course-click"
                        >
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

            <div className="d-flex justify-content-between">
                <h2 id="wd-dashboard-published">Published Courses ({filteredCourses.length})</h2>
                {currentUser.role === "STUDENT" && (
                    <button
                        className="btn btn-primary float-end"
                        onClick={() => setShowAllCourses(!showAllCourses)}
                    >
                        {showAllCourses ? "Show My Courses" : "Show All Courses"}
                    </button>
                )}
            </div>
            <hr />

            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-3">
                    {filteredCourses.map((course) => (
                        <div className="wd-dashboard-course col" key={course._id} style={{ width: "300px" }}>
                            <div className="card h-100 rounded-3 overflow-hidden">
                                <img
                                    src={getImagePath(course._id)}
                                    width="100%"
                                    height={160}
                                    alt={course.name}
                                />
                                <div className="card-body">
                                    <h5
                                        className="wd-dashboard-course-title card-title"
                                        style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}
                                    >
                                        {course.name}
                                    </h5>
                                    <p
                                        className="wd-dashboard-course-title card-text"
                                        style={{ maxHeight: 100, overflow: "hidden" }}
                                    >
                                        {course.description}
                                    </p>
                                    <button
                                        onClick={() => handleGoToCourse(course._id)}
                                        className="btn btn-primary"
                                    >
                                        Go
                                    </button>
                                    {currentUser.role === "FACULTY" && (
                                        <>
                                            <button
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    handleDeleteCourse(course._id);
                                                }}
                                                className="btn btn-danger float-end"
                                                id="wd-delete-course-click"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                id="wd-edit-course-click"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    setCourse(course);
                                                }}
                                                className="btn btn-warning me-2 float-end"
                                            >
                                                Edit
                                            </button>
                                        </>
                                    )}
                                    {currentUser.role === "STUDENT" && showAllCourses && (
                                        <>
                                            {enrolling && (
                                                <button
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        updateEnrollment(course._id, !course.enrolled);
                                                    }}
                                                    className={`btn ${course.enrolled ? "btn-danger" : "btn-success"
                                                        } float-end`}
                                                >
                                                    {course.enrolled ? "Unenroll" : "Enroll"}
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