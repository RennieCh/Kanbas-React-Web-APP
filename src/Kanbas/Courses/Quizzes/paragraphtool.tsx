import React from "react";
import { TbLetterP } from "react-icons/tb";
import { FaRegKeyboard } from "react-icons/fa";
import { BsCodeSlash } from "react-icons/bs";
import { TfiArrowsCorner } from "react-icons/tfi";
import { PiDotsSixVertical } from "react-icons/pi";

export default function ParagraphTool() {
    return (
        <div className="d-flex align-items-center justify-content-between">
            {/* Float-start element */}
            <TbLetterP className="me-3 fs-5" />

            {/* Float-end elements */}
            <div className="d-flex align-items-center ms-auto">
                <FaRegKeyboard className="me-3 text-danger fs-3" />

                {/* Divider */}
                <span className="me-3">|</span>
                <span className="me-3 text-danger">0 Words</span>
                <span className="me-3">|</span>
                <BsCodeSlash className="me-3 text-danger fs-4" />
                <TfiArrowsCorner className="me-3 text-danger fs-4" style={{ transform: "rotate(90deg)" }} />

                <button className="btn btn-outline-danger mt-2">
                    <PiDotsSixVertical className="fs-6"/>
                </button>
            </div>
        </div>
    );
}
