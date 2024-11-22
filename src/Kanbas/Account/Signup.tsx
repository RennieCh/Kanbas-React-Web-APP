import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signup = async () => {
    console.log("User data sent to signup API:", user); // A5 for debug purpose
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    navigate("/Kanbas/Account/Profile");
  };
  return (
    <div id="wd-signup-screen" className="container-fluid d-flex flex-column mt-4">
      <h3 className="mb-3">Signup</h3>
      <input
        className="wd-username form-control mb-2"
        placeholder="username"
        type="text"
        value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      <input
        className="wd-password form-control mb-2"
        placeholder="password"
        type="password"
        value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button onClick={signup} className="wd-signup-btn btn btn-primary mb-2 w-100"> Sign up </button><br />

      <Link to="/Kanbas/Account/Signin" >Sign in</Link>
    </div>
  );
}