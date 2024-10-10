import { Link, useLocation } from "react-router-dom";

export default function AccountNavigation() {
    const { pathname } = useLocation(); // Get current pathname from the URL

    const links = ["Signin", "Signup", "Profile"];

    // Helper function to check if a link is active
    const isActiveLink = (link: string): boolean => {
        return pathname.includes(link); // Check if the current pathname contains the link name
    };

    return (
        <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0 d-none d-md-block">
            {links.map((link) => (
                <Link
                    key={link}
                    to={`/Kanbas/Account/${link}`}
                    className={`list-group-item border border-0 ${isActiveLink(link) ? "active" : "text-danger"}`}
                >
                    {link}
                </Link>
            ))}
        </div>
    );
}
