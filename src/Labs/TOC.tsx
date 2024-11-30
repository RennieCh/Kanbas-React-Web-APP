
import { useLocation } from 'react-router';

export default function TOC() {
    const {pathname} = useLocation();
    return (
        <ul className="nav nav-pills">
            <li className="nav-item">
                <a id="wd-a" href="#/Labs" className="nav-link">
                Labs
                </a>
            </li>
            <li className="nav-item">
                <a id="wd-a1" href="#/Labs/Lab1" 
                className={`nav-link ${pathname.includes("Lab1") ? "active" : ""}`}>
                    Lab1
                </a>
            </li>
            <li className="nav-item">
                <a id="wd-a2" href="#/Labs/Lab2"
                className={`nav-link ${pathname.includes("Lab2") ? "active" : ""}`}>
                    Lab2
                </a>
            </li>
            <li className="nav-item">
                <a id="wd-a3" href="#/Labs/Lab3"
                className={`nav-link ${pathname.includes("Lab3") ? "active" : ""}`}>
                    Lab3
                </a>
            </li>
            <li className="nav-item">
                <a id="wd-a4" href="#/Labs/Lab4"
                className={`nav-link ${pathname.includes("Lab4") ? "active" : ""}`}>
                    Lab4
                </a>
            </li>
            <li className="nav-item">
                <a id="wd-a5" href="#/Labs/Lab5"
                className={`nav-link ${pathname.includes("Lab5") ? "active" : ""}`}>
                    Lab5
                </a>
            </li>
            <li className="nav-item">
                <a id="wd-k" href="#/Kanbas"
                className="nav-link">
                    Kanbas
                </a>
            </li>
            <li className="nav-item">
                <a id="wd-github" href="https://github.com/RennieCh/kanbas-react-web-app-cs5610-fa24"
                className='nav-link'>
                    GitHub
                </a>
            </li>
            <li className="nav-item">
                <a id="wd-render" href="https://kanbas-node-server-app-a6-z0az.onrender.com"
                className='nav-link'>
                    Render
                </a>
            </li>
        </ul>
    );
}