import { FaPlus } from "react-icons/fa6";
import SearchInput from "./SearchInput";
import { IoEllipsisVertical } from "react-icons/io5";

export default function QuizzesControls() {
    return (
        <div id="wd-assignments-controls" className="text-nowrap">
            <button id="wd-assignment-group" className="btn btn-lg btn-secondary me-1 float-end" type="button">
            <IoEllipsisVertical className="fs-4" style={{ cursor: "pointer" }} />
            </button>
            <button id="wd-add-assignment-btn" className="btn btn-lg btn-danger me-1 float-end">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Quiz
            </button>
            <SearchInput />
        </div>
    );
}