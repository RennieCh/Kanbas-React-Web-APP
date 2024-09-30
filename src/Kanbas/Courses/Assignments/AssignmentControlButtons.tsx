import { IoEllipsisVertical } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

export default function AssignmentControlButtons() {
  return (
    <div className="d-flex align-items-center float-end">
      <button className="btn btn-outline-dark rounded-pill px-3 me-2">
        40% of Total
      </button>
      <IoMdAdd className="fs-4 me-2" style={{ cursor: "pointer" }} />
      <IoEllipsisVertical className="fs-4" style={{ cursor: "pointer" }} />
    </div>
  );
}
