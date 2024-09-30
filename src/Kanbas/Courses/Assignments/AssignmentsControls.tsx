import { FaPlus } from "react-icons/fa6";
import SearchInput from "./SearchInput";

export default function AssignmentsControls() {
    return (
        <div id="wd-assignments-controls" className="text-nowrap">
            <button id="wd-add-assignment-btn" className="btn btn-lg btn-danger me-1 float-end">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Assignment
            </button>
            <button id="wd-assignment-group" className="btn btn-lg btn-secondary me-1 float-end" type="button">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Group
            </button>
            <SearchInput />
        </div>
    );
}
