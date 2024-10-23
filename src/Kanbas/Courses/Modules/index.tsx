import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "react-router";
import * as db from "../../Database";
import { useState } from "react";

export default function Modules() {
  const { cid } = useParams(); // Get the course ID from the URL
  const [modules, setModules] = useState<any[]>(db.modules);
  const [moduleName, setModuleName] = useState("");
  const addModule = () => {
    setModules([...modules, {
      _id: new Date().getTime().toString(),
      name: moduleName, course: cid, lessons: []
    }]);
    setModuleName("");
  };

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter((m) => m._id !== moduleId));
  };

  const editModule = (moduleId: string) => {
    setModules(modules.map((m) => (m._id === moduleId ? { ...m, editing: true } : m)));
  };

  const updateModule = (module: any) => {
    setModules(modules.map((m) => (m._id === module._id ? module : m)));
  };


  // Filter the modules that belong to the selected course
  const courseModules = modules.filter((module: any) => module.course === cid);

  return (
    <div className="container-fluid">
      <div className="w-100 mb-4 flex-nowrap">
        <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={addModule} />
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
              {!module.editing && module.name} {/* Display module name */}
              {module.editing && (
                <input className="form-control w-50 d-inline-block"
                onChange={(e) => updateModule({...module,name: e.target.value })}
                onKeyDown={(e) => {
                  if(e.key === "Enter") {
                    updateModule({...module, editing: false});
                  }
                }}
                value={module.name}/>
              )}
              <ModuleControlButtons moduleId={module._id} deleteModule={deleteModule} editModule={editModule}/>
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
