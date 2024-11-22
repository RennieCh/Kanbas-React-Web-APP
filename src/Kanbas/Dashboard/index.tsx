import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchAllCourses, fetchAllEnrollments, enrollUser, unenrollUser } from "../Courses/client";
import { findMyCourses } from "../Account/client";

export default function Dashboard({
    courses,
    course,
    setCourse,
    addNewCourse,
    deleteCourse,
    updateCourse,
    fetchCourses,
}: {
    courses: any[];
    course: any;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (courseId: string) => void;
    updateCourse: () => void;
    fetchCourses: () => Promise<void>;
}) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const navigate = useNavigate();

    const handleAddCourse = async () => {
        const newCourseId = new Date().getTime().toString();

        // Prepare the new course
        const newCourse = {
            ...course,
            _id: newCourseId,
        };

        try {
            // Step 1: Add the course to the server
            await addNewCourse();

            // Step 2: Enroll the Faculty user on the server
            await enrollUser(currentUser._id, newCourseId);

            // Step 3: Update local state immediately to reflect the new course
            setAllCourses((prevCourses) => [...prevCourses, newCourse]);
            setMyEnrolledCourses((prevCourses) => [...prevCourses, newCourse]);
            setEnrollments((prevEnrollments) => [
                ...prevEnrollments,
                { user: currentUser._id, course: newCourseId },
            ]);

            // Trigger a re-fetch of all courses
            setCourseAdded(!courseAdded);

        } catch (error) {
            console.error("Error adding or enrolling in course:", error);

            // Revert local state if the operation fails
            setAllCourses((prevCourses) =>
                prevCourses.filter((course) => course._id !== newCourseId)
            );
            setMyEnrolledCourses((prevCourses) =>
                prevCourses.filter((course) => course._id !== newCourseId)
            );
            setEnrollments((prevEnrollments) =>
                prevEnrollments.filter(
                    (enrollment) => enrollment.course !== newCourseId
                )
            );
        }

        // Reset the course form
        setCourse({
            _id: "0",
            name: "New Course",
            number: "New Number",
            startDate: "2023-09-10",
            endDate: "2023-12-15",
            image: "/images/reactjs.jpg",
            description: "New Description",
        });
    };

    const handleUpdateCourse = async () => {
        await updateCourse();
        await refreshEnrolledCourses();
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

    // Optimized handleDeleteCourse function
    const handleDeleteCourse = async (courseId: string) => {
        try {
            // Delete the course on the server
            await deleteCourse(courseId);

            // Update the local state to remove the deleted course
            setCourse({
                _id: "0",
                name: "New Course",
                number: "New Number",
                startDate: "2023-09-10",
                endDate: "2023-12-15",
                image: "/images/reactjs.jpg",
                description: "New Description"
            });

            // Remove the course from the local courses array without re-fetching
            setMyEnrolledCourses((prevCourses) =>
                prevCourses.filter((course) => course._id !== courseId)
            );
            setAllCourses((prevCourses) =>
                prevCourses.filter((course) => course._id !== courseId)
            );
        } catch (error) {
            console.error("Failed to delete course:", error);
        }
    };

    // State to store all courses fetched from the server
    const [allCourses, setAllCourses] = useState<any[]>([]);
    // State to toggle between all courses and enrolled courses
    const [showAllCourses, setShowAllCourses] = useState(false);
    // State to store all enrollment fetched from the server
    const [enrollments, setEnrollments] = useState<any[]>([]);
    // Stare to store all my enrolled course fetched from the server
    const [myEnrolledCourses, setMyEnrolledCourses] = useState<any[]>([]);
    // Tracks if a course has been added
    const [courseAdded, setCourseAdded] = useState(false);

    // Fetch all courses when when `courseAdded` or `showAllCourses` changes
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
    }, [courseAdded, showAllCourses]);

    // Fetch all enrollments and the user's enrolled courses on component mount
    useEffect(() => {
        const fetchEnrollments = async () => {
            const fetchedEnrollments = await fetchAllEnrollments();
            setEnrollments(fetchedEnrollments);
        };

        const fetchMyCourses = async () => {
            if (currentUser) {
                const myCourses = await findMyCourses();
                setMyEnrolledCourses(myCourses);
            }
        };

        fetchEnrollments();
        fetchMyCourses();
    }, [currentUser]);

    // Refresh the enrolled courses list
    const refreshEnrolledCourses = async () => {
        const myCourses = await findMyCourses();
        setMyEnrolledCourses(myCourses);
    };

    // Filter courses based on the `showAllCourses` state
    const filteredCourses = showAllCourses ? allCourses : myEnrolledCourses;

    // Handle enrollment
    const handleEnroll = async (courseId: string) => {
        setEnrollments([...enrollments, { user: currentUser._id, course: courseId }]);
        try {
            await enrollUser(currentUser._id, courseId);
            await refreshEnrolledCourses();
        } catch (error) {
            console.error("Failed to enroll in course:", error);
        }
    };

    // Handle unenrollment
    const handleUnenroll = async (courseId: string) => {
        setEnrollments(enrollments.filter(enrollment => !(enrollment.user === currentUser._id && enrollment.course === courseId)));
        try {
            await unenrollUser(currentUser._id, courseId);
            await refreshEnrolledCourses();
        } catch (error) {
            console.error("Failed to unenroll from course:", error);
        }
    };

    // Toggle between showing all courses and only enrolled courses
    const toggleEnrollments = async () => {
        setShowAllCourses(!showAllCourses);
        if (!showAllCourses) {
            await refreshEnrolledCourses();
        }
    };

    const handleGoToCourse = async (courseId: string) => {
        const isEnrolled = enrollments.some(
            (enrollment) => enrollment.user === currentUser._id && enrollment.course === courseId
        );

        if (isEnrolled) {
            // Navigate immediately
            navigate(`/Kanbas/Courses/${courseId}/Home`);
        } else {
            try {
                // Refresh courses and enrollments
                await refreshEnrolledCourses();

                // Recheck enrollment after refreshing
                const refreshedIsEnrolled = enrollments.some(
                    (enrollment) => enrollment.user === currentUser._id && enrollment.course === courseId
                );

                if (refreshedIsEnrolled) {
                    navigate(`/Kanbas/Courses/${courseId}/Home`);
                } else {
                    alert("You are not enrolled in this course!");
                }
            } catch (error) {
                console.error("Failed to refresh enrollments or navigate:", error);
                alert("You are not enrolled in this course!");
            }
        }
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
                                            <button onClick={(event) => { event.preventDefault(); handleDeleteCourse(course._id); }}
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
                                            {enrollments.some(enrollment => enrollment.user === currentUser._id && enrollment.course === course._id) ? (
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