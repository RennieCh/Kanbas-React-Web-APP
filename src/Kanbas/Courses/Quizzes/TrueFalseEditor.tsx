import React from "react";
import QuestionTool from "./questiontool";
import { ImArrowRight } from "react-icons/im";


export default function TrueFalseEditor() {

    return (
        <div className="container mt-4">
            {/* Question Instructions */}
            <div id="tf-question-description" className="mb-4">
                <span>Enter your question text, then select if True or False is the correct answer.</span>
                <br />
            </div>

            {/* Question Toolbar */}
            <QuestionTool />

            {/* Question Text Area */}
            <div className="mb-4">
                <textarea
                    className="form-control"
                    id="tf-question-text"
                    rows={5}
                    placeholder="Enter your question here"
                ></textarea>
            </div>

            {/* Answers Section */}
            <div className="mb-4">
                <h4>Answers:</h4>

                {/* Row 1: True Answer */}
                <div className="d-flex align-items-center justify-content-between mb-3">
                    {/* True Label */}
                    <div className="d-flex align-items-center">
                        <ImArrowRight className="text-success fs-4 me-2" />
                        <span className="fw-bold text-success">True</span>
                    </div>

                    {/* Checkbox */}
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" checked />
                        <label className="form-check-label">Mark Correct</label>
                    </div>
                </div>

                {/* Row 2: False Answer */}
                <div className="d-flex align-items-center justify-content-between mb-3">
                    {/* False Label */}
                    <div className="d-flex align-items-center">
                        <ImArrowRight className="text-muted fs-4 me-2" />
                        <span className="fw-bold">False</span>
                    </div>

                    {/* Checkbox */}
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label">Mark Correct</label>
                    </div>
                </div>
            </div>

            <hr />
            {/* Save and Cancel Buttons */}
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-secondary me-3">Cancel</button>
                <button className="btn btn-danger">Update Question</button>
            </div>
        </div>
    );
}