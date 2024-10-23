import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchProfile = () => {
    if (!currentUser) {
      navigate("/Kanbas/Account/Signin");
    } else {
      setProfile({
        ...currentUser,
        // Format the dob to match the YYYY-MM-DD format
        dob: currentUser.dob ? currentUser.dob.split("T")[0] : ""
      });
    }
  };
  
  const signout = () => {
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };

  useEffect(() => { fetchProfile(); }, []);

  return (
    <div id="wd-profile-screen" className="p-3">
      <h3>Profile</h3>
      {profile && (<>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="wd-username"
            placeholder="alice"
            defaultValue={profile.username}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <input
            id="wd-password"
            className="form-control"
            placeholder="123"
            type="password"
            defaultValue={profile.password}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <input
            id="wd-firstname"
            className="form-control"
            placeholder="Alice"
            defaultValue={profile.firstName}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <input
            id="wd-lastname"
            className="form-control"
            placeholder="Wonderland"
            defaultValue={profile.lastName}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          />
        </div>

        <div className="mb-3 input-group">
          <input
            id="wd-dob"
            className="form-control"
            placeholder="mm/dd/yyyy"
            type="date"
            defaultValue={profile.dob}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <input
            id="wd-email"
            className="form-control"
            placeholder="alice@wonderland.com"
            type="email"
            defaultValue={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <select id="wd-role" className="form-select" value={profile.role}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>
        <Link to="/Kanbas/Account/Signin" className="btn btn-danger w-100 text-center"
          onClick={signout}>
          Signout
        </Link>
      </>)}
    </div>
  );
}
