import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-course">
                <div className="wd-dashboard-course">
                    <img src="/images/reactjs.jpg" width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link" 
                        to="/Kanbas/Courses/1234/Home">
                            CS1234 React JS
                        </Link>
                    </div>
                    <p className="wd-dashboard-course-title">
                        Full Stack software developer
                    </p>
                    <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
                </div>
                <div className="wd-dashboard-course">
                    <img src="/images/course1.jpg" width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link" 
                        to="/Kanbas/Courses/1234/Home">
                            CS 5001 Intensive Foundations of Computer Science
                        </Link>
                    </div>
                    <p className="wd-dashboard-course-title">
                        Professor A
                    </p>
                    <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
                </div>
                <div className="wd-dashboard-course">
                    <img src="/images/course2.jpg" width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link" 
                        to="/Kanbas/Courses/1234/Home">
                            CS5002 Discrete Structures
                        </Link>
                    </div>
                    <p className="wd-dashboard-course-title">
                        Professor B
                    </p>
                    <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
                </div>
                <div className="wd-dashboard-course">
                    <img src="/images/course3.jpg" width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link" 
                        to="/Kanbas/Courses/1234/Home">
                            CS5004 Object-Oriented Design
                        </Link>
                    </div>
                    <p className="wd-dashboard-course-title">
                        Professor C
                    </p>
                    <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
                </div>
                <div className="wd-dashboard-course">
                    <img src="/images/course4.jpg" width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link" 
                        to="/Kanbas/Courses/1234/Home">
                            CS5008 Data Structures and Algorithms
                        </Link>
                    </div>
                    <p className="wd-dashboard-course-title">
                        Professor D
                    </p>
                    <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
                </div>
                <div className="wd-dashboard-course">
                    <img src="/images/course5.jpg" width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link" 
                        to="/Kanbas/Courses/1234/Home">
                            CS5800 Algorithms
                        </Link>
                    </div>
                    <p className="wd-dashboard-course-title">
                        Professor E
                    </p>
                    <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
                </div>
                <div className="wd-dashboard-course">
                    <img src="/images/course6.jpg" width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link" 
                        to="/Kanbas/Courses/1234/Home">
                            CS5400 Principles of Programming Language
                        </Link>
                    </div>
                    <p className="wd-dashboard-course-title">
                        Professor F
                    </p>
                    <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
                </div>
            </div>
        </div>

    );
}