import { FaCheckCircle, FaCircle } from "react-icons/fa";
export default function GrayCheckmark() {
  return (
    <span className="me-1 position-relative">
      <FaCheckCircle style={{ top: "2px" }}
        className="text-secondary me-1 position-absolute fs-5" />
      <FaCircle className="text-white me-1 fs-6" />
    </span>
);}