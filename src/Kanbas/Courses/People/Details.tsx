import { useEffect, useState, useCallback } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { useParams, useNavigate } from "react-router";
import * as client from "../../Account/client";


export default function PeopleDetails() {
  const { uid } = useParams(); // Get the user ID from the URL params
  const [user, setUser] = useState<any>({}); // State to store user details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate(); // Navigate back on close

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate(-1);
  };

  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName, email, role };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    navigate(-1);
  };

  // Fetch user details based on the ID
  const fetchUser = useCallback(async () => {
    if (!uid) return; // Exit if no user ID is provided
    const user = await client.findUserById(uid); // Fetch user by ID
    setUser(user); // Update state with fetched user data
    setName(`${user.firstName} ${user.lastName}`); // Set name state
    setEmail(user.email); // Set email state
    setRole(user.role); // Set role state
  }, [uid]);

  // Fetch user whenever the UID changes
  useEffect(() => {
    fetchUser(); // Call the function directly
  }, [fetchUser]);

  // Return null if no UID is provided
  if (!uid) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      {/* Close button */}
      <button
        onClick={() => navigate(-1)} // Navigate back when clicked
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>

      {/* User Details */}
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      <div className="text-danger fs-4 wd-name">
        {!editing && (
          <FaPencil onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit" />)}
        {editing && (
          <FaCheck onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save" />)}
        {!editing && (
          <div className="wd-name"
            onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName}
          </div>)}
        {user && editing && (
          <input className="form-control w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }
            }} />)}
      </ div>
      <hr />
      {/* Email Field */}
      <div>
        <b>Email:</b>{" "}
        {editing ? (
          <input
            type="email"
            className="form-control w-75 wd-edit-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          <span className="wd-email">{user.email}</span>
        )}
      </div>
      {/* Role Dropdown */}
      <div>
        <b>Role:</b>{" "}
        {editing ? (
          <select
            className="form-select w-50 wd-edit-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="STUDENT">Student</option>
            <option value="FACULTY">Faculty</option>
            <option value="ADMIN">Administrator</option>
            <option value="USER">User</option>
          </select>
        ) : (
          <span className="wd-role">{user.role}</span>
        )}
      </div>
      <div>
        <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span>
      </div>
      <div>
        <b>Section:</b> <span className="wd-section">{user.section}</span>
      </div>
      <div>
        <b>Total Activity:</b>{" "}
        <span className="wd-total-activity">{user.totalActivity}</span>
      </div>
      <hr />
      <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" > Delete </button>
      <button onClick={() => navigate(-1)}
        className="btn btn-secondary float-start float-end me-2 wd-cancel" > Cancel </button>
    </div>
  );
}
