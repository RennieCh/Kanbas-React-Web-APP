import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-course" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-5">
                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card h-100">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                                <img src="/images/reactjs.jpg" width="100%" height={160} alt="CS1234" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title">
                                        CS1234 React JS
                                    </h5>
                                    <p className="card-text">
                                        Full Stack software developer
                                    </p>
                                    <p className="card-text">
                                        <small className="text-body-secondary">202410_1 Fall 2024 Semester Full Term</small>
                                    </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card h-100">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                                <img src="/images/course1.jpg" width="100%" height={160} alt="CS5001" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title">
                                        CS5001
                                    </h5>
                                    <p className="card-text">
                                        Intensive Foundations of Computer Science
                                    </p>
                                    <p className="card-text">
                                        <small className="text-body-secondary">202410_1 Fall 2024 Semester Full Term</small>
                                    </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card h-100">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                                <img src="/images/course2.jpg" width="100%" height={160} alt="CS5002" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title">
                                        CS5002
                                    </h5>
                                    <p className="card-text">
                                        Discrete Structures
                                    </p>
                                    <p className="card-text">
                                        <small className="text-body-secondary">202410_1 Fall 2024 Semester Full Term</small>
                                    </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card h-100">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                                <img src="/images/course3.jpg" width="100%" height={160} alt="CS5004" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title">
                                        CS5004
                                    </h5>
                                    <p className="card-text">
                                        Object-Oriented Design
                                    </p>
                                    <p className="card-text">
                                        <small className="text-body-secondary">202410_1 Fall 2024 Semester Full Term</small>
                                    </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card h-100">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                                <img src="/images/course4.jpg" width="100%" height={160} alt="CS5008" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title">
                                        CS5008
                                    </h5>
                                    <p className="card-text">
                                        Data Structures and Algorithms
                                    </p>
                                    <p className="card-text">
                                        <small className="text-body-secondary">202410_1 Fall 2024 Semester Full Term</small>
                                    </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card h-100">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                                <img src="/images/course5.jpg" width="100%" height={160} alt="CS5800" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title">
                                        CS5800
                                    </h5>
                                    <p className="card-text">
                                        Algorithms
                                    </p>
                                    <p className="card-text">
                                        <small className="text-body-secondary">202410_1 Fall 2024 Semester Full Term</small>
                                    </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card h-100">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                                <img src="/images/course6.jpg" width="100%" height={160} alt="CS5400"/>
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title">
                                        CS5400
                                    </h5>
                                    <p className="card-text">
                                        Principles of Programming Language
                                    </p>
                                    <p className="card-text">
                                        <small className="text-body-secondary">202410_1 Fall 2024 Semester Full Term</small>
                                    </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}