import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Modules() {
  const { cid } = useParams(); // Get the course ID from the URL
  const modules = db.modules; // Import modules from the database

  // Filter the modules that belong to the selected course
  const courseModules = modules.filter((module: any) => module.course === cid);

   // Get all lessons from the filtered modules
   const lessons = courseModules.flatMap((module: any) => module.lessons || []); // Flatten the lessons arrays

  return (
    <div className="container">
      <div className="w-100 mb-4 flex-nowrap">
        <ModulesControls />
        <br />
        <br />
        <br />
        <br />
      </div>

      <ul id="wd-modules" className="list-group rounded-0 w-100">
        {courseModules.map((module: any) => (
          <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {module.name} {/* Display module name */}
              <ModuleControlButtons />
            </div>

            {/* Display the lessons if available */}
            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: any) => (
                  <li key={lesson._id} className="wd-lesson list-group-item p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name} {/* Display lesson name */}
                    <LessonControlButtons />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
