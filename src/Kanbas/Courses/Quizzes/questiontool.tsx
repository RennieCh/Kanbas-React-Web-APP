import Toolbar from "./toolbar";
import React from "react";

export default function QuestionTool() {
    return (
        <div className="container mt-4">
            {/* Heading */}
            <h4 className="mb-4">Question:</h4>

            {/* Menu Options - Aligning with Flexbox */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex gap-3 flex-wrap">
                    <span>Edit</span>
                    <span>View</span>
                    <span>Insert</span>
                    <span>Format</span>
                    <span>Tools</span>
                    <span>Table</span>
                </div>
            </div>

            <hr />

            {/* Toolbar Component */}
            <Toolbar />
        </div>
    );
}
