import Account from "./Account";
import { Routes, Route, Navigate } from "react-router";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";

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

export default function Kanbas() {
    const [courses, setCourses] = useState<Course[]>([]);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [enrolling, setEnrolling] = useState<boolean>(false);

    const findCoursesForUser = async () => {
        try {
            const userCourses = await userClient.findCoursesForUser(currentUser._id);
            setCourses(userCourses);
        } catch (error) {
            console.error("Failed to fetch user courses:", error);
        }
    };

    const fetchCourses = async () => {
        try {
            const allCourses = await courseClient.fetchAllCourses();
            const enrolledCourses = await userClient.findCoursesForUser(currentUser._id);

            const combinedCourses = allCourses.map((course: Course) => ({
                ...course,
                enrolled: enrolledCourses.some((c: Course) => c._id === course._id),
            }));

            setCourses(combinedCourses);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        }
    };

    useEffect(() => {
        if (currentUser) {
            enrolling ? fetchCourses() : findCoursesForUser();
        }
    }, [currentUser, enrolling]);

    const [course, setCourse] = useState<Course>({
        _id: "",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description",
    });

    const addNewCourse = async () => {
        try {
            const newCourse = await courseClient.createCourse(course);

            if (newCourse && newCourse._id) {
                setCourses((prevCourses) => {
                    const uniqueCourses = prevCourses.filter(
                        (c) => c._id !== newCourse._id
                    );
                    return [...uniqueCourses, { ...newCourse, enrolled: false }];
                });
                return newCourse;
            } else {
                throw new Error("Server did not return a valid course object.");
            }
        } catch (error) {
            console.error("Failed to add a new course:", error);
            throw error;
        }
    };

    const updateEnrollment = async (courseId: string, enrolled: boolean) => {
        try {
            // Handle enrollment or unenrollment API call
            if (enrolled) {
                await userClient.enrollIntoCourse(currentUser._id, courseId);
            } else {
                await userClient.unenrollFromCourse(currentUser._id, courseId);
            }
    
            // Update the `courses` state to reflect the new enrollment state
            setCourses((prevCourses) => {
                const updatedCourses = prevCourses.map((course) => {
                    if (course._id === courseId) {
                        return { ...course, enrolled };
                    }
                    return course;
                });
    
                // Remove any duplicate entries for the same course
                const uniqueCourses = new Map();
                updatedCourses.forEach((course) => uniqueCourses.set(course._id, course));
    
                return Array.from(uniqueCourses.values());
            });
        } catch (error) {
            console.error("Failed to update enrollment:", error);
        }
    };
    ;

    const deleteCourse = async (courseId: string): Promise<{ message: string }> => {
        try {
            // Call the client function to delete the course
            const response = await courseClient.deleteCourse(courseId);
    
            // Update the state to immediately remove the deleted course
            setCourses((prevCourses) =>
                prevCourses.filter((course) => course._id !== courseId)
            );
    
            console.log(`Course with ID ${courseId} deleted successfully.`);
            return response;
        } catch (error: any) {
            if (error instanceof Error) {
                console.error("Failed to delete course:", error.message);
                alert(`Failed to delete course: ${error.message}`);
            } else {
                console.error("Unexpected error:", error);
                alert("Failed to delete course. Please check the server logs for details.");
            }
            throw error; // Re-throw to propagate the error to the calling function
        }
    };       
       

    const updateCourse = async () => {
        try {
            await courseClient.updateCourse(course);
            setCourses((prevCourses) =>
                prevCourses.map((c) => (c._id === course._id ? course : c))
            );
        } catch (error) {
            console.error("Failed to update course:", error);
        }
    };

    return (
        <Session>
            <div id="wd-kanbas" className="h-100">
                <div className="d-flex h-100">
                    <div className="d-none d-md-block bg-black">
                        <KanbasNavigation />
                    </div>
                </div>
                <div className="wd-main-content-offset flex-fill p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="Account" />} />
                        <Route path="/Account/*" element={<Account />} />
                        <Route
                            path="/Dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard
                                        courses={courses}
                                        course={course}
                                        setCourse={setCourse}
                                        addNewCourse={addNewCourse}
                                        deleteCourse={deleteCourse}
                                        updateCourse={updateCourse}
                                        fetchCourses={fetchCourses}
                                        enrolling={enrolling}
                                        setEnrolling={setEnrolling}
                                        updateEnrollment={updateEnrollment}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/Courses/:cid/*"
                            element={
                                <ProtectedRoute>
                                    <Courses courses={courses} />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/Calendar" element={<h1>Calendar</h1>} />
                        <Route path="/Inbox" element={<h1>Inbox</h1>} />
                    </Routes>
                </div>
            </div>
        </Session>
    );
}