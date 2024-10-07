import CoursesNavigation from "./Navigation";
import { Navigate, Route, Routes, useParams } from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import {courses} from "../Database";
import { FaAlignJustify } from "react-icons/fa6";

export default function Courses() {
    const {cid} = useParams();
    const course = courses.find((course) => course._id===cid);
    return (
        <div id="wd-courses" className="container-fluid">
            <h2 className="text-danger">
                <FaAlignJustify className="position-relative me-4 fs-4 mb-1" style={{ bottom: "1px" }} />
                {course && course.name}
            </h2> <hr />
            <div className="row">
                <div className="col-md-2 col-md-2 d-none d-lg-block">
                    <CoursesNavigation />
                </div>
                <div className="col-md-12 col-lg-10">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="People" element={<PeopleTable />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}