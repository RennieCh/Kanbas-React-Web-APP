import React, { useState, useEffect } from "react";
import CoursesNavigation from "./Navigation";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Quizzes from "./Quizzes";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import QuizzesDetails from "./Quizzes/Details";
import QuizzesEditor from "./Quizzes/Editor";
import PeopleTable from "./People/Table";
import { FaAlignJustify } from "react-icons/fa6";
import QuestionEditor from "./Quizzes/QuestionEditor";
import QuizPreview from "./Quizzes/QuizPreview";
import { fetchAllCourses } from "../Courses/client";

interface Course {
    _id: string;
    name: string;
    number: string,
    startDate: string,
    endDate: string,
    department: string,
    credits: number,
    description: string
}

export default function Courses({courses} : {courses:any[];}) {
    const { cid } = useParams(); // Get the course ID from the URL
    const { pathname } = useLocation();

    const [currentCourse, setCurrentCourse] = useState<any>(null);
    const [isFetching, setIsFetching] = useState(false);

        // Ensure `currentCourse` is updated dynamically
        useEffect(() => {
            const loadCourse = async () => {
                if (cid) {
                    let course = courses.find((course) => course._id === cid);
    
                    // If the course is not found, fetch all courses and retry
                    if (!course) {
                        setIsFetching(true);
                        try {
                            const allCourses = await fetchAllCourses();
                            course = allCourses.find((c :Course) => c._id === cid) || null;
                        } catch (error) {
                            console.error("Failed to fetch courses:", error);
                        }
                        setIsFetching(false);
                    }
    
                    setCurrentCourse(course || null);
                }
            };
    
            loadCourse();
        }, [cid, courses]);

    // Helper function to format the current section name 
    const formatSection = () => {
        const section = pathname.split("/")[4] || "Home"; // Get the current section from the URL
        return section.charAt(0).toUpperCase() + section.slice(1); // Capitalize the section name
    };

    return (
        <div id="wd-courses" className="container-fluid">
            <h2 className="text-danger">
                <FaAlignJustify className="position-relative me-4 fs-4 mb-1" style={{ bottom: "1px" }} />
                {isFetching
                    ? "Loading..."
                    : currentCourse
                    ? `${currentCourse.name} > ${formatSection()}`
                    : "Course Not Found"}
            </h2>
            <hr />
            <div className="row">
                <div className="col-md-2 d-none d-lg-block">
                    <CoursesNavigation /> {/* The navigation dynamically uses the correct course ID */}
                </div>
                <div className="col-md-12 col-lg-10">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="People" element={<PeopleTable />} />
                        <Route path="Quizzes" element={<Quizzes/>} />
                        <Route path="Quizzes/:aid" element={<QuizzesDetails />} />
                        <Route path="Quizzes/:aid/edit" element={<QuizzesEditor />} />
                        <Route path="Quizzes/:aid/questions/new" element={<QuestionEditor />} />
                        <Route path="Quizzes/:aid/Preview" element={<QuizPreview />}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}
