import { Link, useParams } from "react-router-dom";

export default function CoursesNavigation() {
  const { cid } = useParams(); // Get course ID from the URL

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0 d-none d-lg-block">
      <Link id="wd-course-home-link" to={`/Kanbas/Courses/${cid}/Home`} 
      className="list-group-item active border border-0">Home</Link>
      <Link id="wd-course-modules-link" to={`/Kanbas/Courses/${cid}/Modules`} 
      className="list-group-item text-danger border border-0">Modules</Link>
      <Link id="wd-course-piazza-link" to={`/Kanbas/Courses/${cid}/Piazza`} 
      className="list-group-item text-danger border border-0">Piazza</Link>
      <Link id="wd-course-zoom-link" to={`/Kanbas/Courses/${cid}/Zoom`} 
      className="list-group-item text-danger border border-0">Zoom</Link>
      <Link id="wd-course-quizzes-link" to={`/Kanbas/Courses/${cid}/Assignments`} 
      className="list-group-item text-danger border border-0">Assignments</Link>
      <Link id="wd-course-assignments-link" to={`/Kanbas/Courses/${cid}/Quizzes`} 
      className="list-group-item text-danger border border-0">Quizzes</Link>
      <Link id="wd-course-grades-link" to={`/Kanbas/Courses/${cid}/Grades`} 
      className="list-group-item text-danger border border-0">Grades</Link>
      <Link id="wd-course-people-link" to={`/Kanbas/Courses/${cid}/People`} 
      className="list-group-item text-danger border border-0">People</Link>
    </div>
  );
}
