import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaBold } from "react-icons/fa6";
import { GoItalic } from "react-icons/go";
import { FiUnderline } from "react-icons/fi";
import { MdFormatColorText } from "react-icons/md";
import { BiHighlight } from "react-icons/bi";
import { MdTitle } from "react-icons/md";
import { IoEllipsisVertical } from "react-icons/io5";

export default function Toolbar() {
    return (
        <div className="d-flex align-items-center">
            {/* Font Size Dropdown */}
            <span className="ms-2 me-3 mb-3 d-flex align-items-center">
                12pt <MdOutlineKeyboardArrowDown className="ms-1" />
            </span>

            {/* Paragraph Dropdown */}
            <span className="me-3 mb-3 d-flex align-items-center">
                Paragraph <MdOutlineKeyboardArrowDown className="ms-1" />
            </span>

            {/* Divider */}
            <span className="me-3 mb-3">|</span>

            {/* Formatting Icons */}
            <FaBold className="me-3 mb-3" />
            <GoItalic className="me-3 mb-3" />
            <FiUnderline className="me-3 mb-3" />

            {/* Text Color and Highlight */}
            <MdFormatColorText className="me-1 mb-3" />
            <MdOutlineKeyboardArrowDown className="me-3 mb-3" />
            <BiHighlight className="me-1 mb-3 fs-5" />
            <MdOutlineKeyboardArrowDown className="me-3 mb-3" />

            {/* Title Dropdown */}
            <MdTitle className="me-1 mb-3 fs-5" />
            <MdOutlineKeyboardArrowDown className="me-3 mb-3" />

            {/* Divider */}
            <span className="me-3 mb-3">|</span>

            {/* More Options */}
            <IoEllipsisVertical className="me-3 mb-3" />
        </div>
    );
}
