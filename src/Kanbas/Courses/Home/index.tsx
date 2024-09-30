import Modules from "../Modules";
import CourseStatus from "./Status";
export default function Home() {
    return(
        <div id="wd-home" className="container">
            <div className="row">
                <div className="col-12 col-lg-10">
                    <Modules />
                </div>
                <div className="col-2 d-none d-lg-block float-left">
                    <CourseStatus />
                </div>
            </div>
        </div>
    )
}