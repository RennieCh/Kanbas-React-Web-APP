import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="container d-flex flex-column mt-5">
      <h3 className="mb-3">Signin</h3>

      <input
        id="wd-username"
        className="form-control mb-2"
        placeholder="username"
        type="text"
      />

      <input
        id="wd-password"
        className="form-control mb-2"
        placeholder="password"
        type="password"
      />

      <Link
        id="wd-signin-btn"
        to="/Kanbas/Dashboard"
        className="btn btn-primary align-items-center w-100 mb-2"
      >
        Signin
      </Link>

      <Link
        id="wd-signup-link"
        to="/Kanbas/Account/Signup"
        className="text-left"
      >
        Signup
      </Link>
    </div>
  );
}
