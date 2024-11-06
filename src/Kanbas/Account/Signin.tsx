import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
//import * as db from "../Database";
import * as client from "./client"; // A5 Updated: Import client module for API requests


export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kanbas/Dashboard");
  };
  
  return (
    <div id="wd-signin-screen" className="container d-flex flex-column mt-5">
      <h3 className="mb-3">Signin</h3>

      <input
        defaultValue={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        id="wd-username"
        className="form-control mb-2"
        placeholder="username"
        type="text"
      />

      <input
        defaultValue={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        id="wd-password"
        className="form-control mb-2"
        placeholder="password"
        type="password"
      />

      <Link
        onClick={signin}
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
