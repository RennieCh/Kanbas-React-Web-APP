import { IoEllipsisVertical } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <IoMdAdd />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}