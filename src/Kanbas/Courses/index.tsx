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


export default function Courses({courses} : {courses:any[];}) {
    const { cid } = useParams(); // Get the course ID from the URL
    const course = courses.find((course) => course._id === cid); // Find the course with the matching ID
    const { pathname } = useLocation();

    // Helper function to format the current section name 
    const formatSection = () => {
        const section = pathname.split("/")[4] || "Home"; // Get the current section from the URL
        return section.charAt(0).toUpperCase() + section.slice(1); // Capitalize the section name
    };

    return (
        <div id="wd-courses" className="container-fluid">
            <h2 className="text-danger">
                <FaAlignJustify className="position-relative me-4 fs-4 mb-1" style={{ bottom: "1px" }} />
                {course && `${course.name} > ${formatSection()}`}
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
                        <Route path="Quizzes/:quiz/Questions/:aid/edit" element={<QuestionEditor />} />
                        <Route path="Quizzes/:quiz/Preview" element={<QuizPreview />}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}
