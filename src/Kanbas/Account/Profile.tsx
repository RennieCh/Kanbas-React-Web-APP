import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-3">
      <h3>Profile</h3>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          id="wd-username"
          placeholder="alice"
          value="alice"
        />
      </div>

      <div className="mb-3">
        <input
          id="wd-password"
          className="form-control"
          placeholder="123"
          value="123"
          type="password"
        />
      </div>

      <div className="mb-3">
        <input
          id="wd-firstname"
          className="form-control"
          placeholder="Alice"
          value="Alice"
        />
      </div>

      <div className="mb-3">
        <input
          id="wd-lastname"
          className="form-control"
          placeholder="Wonderland"
          value="Wonderland"
        />
      </div>

      <div className="mb-3 input-group">
        <input
          id="wd-dob"
          className="form-control"
          placeholder="mm/dd/yyyy"
          type="date"
          value="2024-05-16"
        />
      </div>

      <div className="mb-3">
        <input
          id="wd-email"
          className="form-control"
          placeholder="alice@wonderland.com"
          value="alice@wonderland.com"
          type="email"
        />
      </div>

      <div className="mb-4">
        <select id="wd-role" className="form-select">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </select>
      </div>

      <Link to="/Kanbas/Account/Signin" className="btn btn-danger w-100 text-center">
        Signout
      </Link>
    </div>
  );
}
