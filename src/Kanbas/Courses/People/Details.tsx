import { useEffect, useState, useCallback } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import * as client from "../../Account/client";

export default function PeopleDetails() {
  const { uid } = useParams(); // Get the user ID from the URL params
  const [user, setUser] = useState<any>({}); // State to store user details
  const navigate = useNavigate(); // Navigate back on close

  // Fetch user details based on the ID
  const fetchUser = useCallback(async () => {
    if (!uid) return; // Exit if no user ID is provided
    const user = await client.findUserById(uid); // Fetch user by ID
    setUser(user); // Update state with fetched user data
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
        {user.firstName} {user.lastName}
      </div>
      <hr />
      <div>
        <b>Roles:</b> <span className="wd-role">{user.role}</span>
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
    </div>
  );
}
