import CoursesNavigation from "./Navigation";
import { Navigate, Route, Routes } from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import { HiMiniBars4 } from "react-icons/hi2";

export default function Courses() {
    return (
        <div id="wd-courses" className="container-fluid">
            <h2>
                <HiMiniBars4 className="position-relative me-2" style={{ bottom: "1px" }} />
                Course 1234
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