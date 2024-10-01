
import { Link } from "react-router-dom";
export default function Signup() {
  return (
    <div id="wd-signup-screen" className="container-fluid d-flex flex-column mt-4">
      <h3 className="mb-3">Signup</h3>
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

      <input
        id="wd-password"
        className="form-control mb-2"
        placeholder="verify password"
        type="password"
      />

      <Link to="/Kanbas/Account/Profile"
        className="btn btn-primary align-items-center w-100 mb-2"> 
        Signup </Link>

      <Link to="/Kanbas/Account/Signin" >Sign in</Link>
    </div>
  );
}