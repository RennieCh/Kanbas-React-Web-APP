import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import QuestionTool from "./questiontool";
import { ImArrowRight } from "react-icons/im";
import { PiPencilLight } from "react-icons/pi";

export default function MultipleChoiceEditor() {

    return (
        <div className="container mt-4">
            {/* Question Instructions */}
            <div id="mul-question-description" className="mb-4">
                <span>Enter your question and multiple answers, then select the correct answer.</span>
                <br />
            </div>

            {/* Question Toolbar */}
            <QuestionTool />

            {/* Question Text Area */}
            <div className="mb-4">
                <textarea className="form-control" id="mul-question-text" rows={5} placeholder="Enter your question here"></textarea>
            </div>

            {/* Answers Section */}
            <div className="mb-4">
                <h4>Answers:</h4>
                <div className="container mt-4">
                    {/* Row 1: Correct Answer */}
                    <div className="d-flex align-items-center mb-3">
                        {/* Correct Answer Label and Input */}
                        <div className="d-flex align-items-center">
                            <ImArrowRight className="text-success fs-4 me-2" />
                            <span className="me-3">Correct Answer</span>
                            <input
                                type="text"
                                className="form-control border-success"
                                style={{ width: "300px" }}
                                value=""
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="ms-auto d-flex align-items-center">
                            <div className="form-check me-2">
                                <input className="form-check-input" type="checkbox" checked />
                                <label className="form-check-label" >
                                    Mark Correct
                                </label>
                            </div>
                            <button
                                type="button"
                                className="btn btn-outline-secondary me-2"
                            >
                                <PiPencilLight className="fs-5" style={{ transform: "rotate(270deg)" }} />
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-danger"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>

                    {/* Row 2: Possible Answer */}
                    <div className="d-flex align-items-center mb-3">
                        {/* Possible Answer Label and Input */}
                        <div className="d-flex align-items-center">
                            <ImArrowRight className="text-muted fs-4 me-2" />
                            <span className="me-3">Possible Answer</span>
                            <input
                                type="text"
                                className="form-control border-muted"
                                style={{ width: "300px" }}
                                value=""
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="ms-auto d-flex align-items-center">
                        <div className="form-check me-2">
                            <input className="form-check-input" type="checkbox" value="" />
                            <label className="form-check-label" >
                                Mark Correct
                            </label>
                        </div>
                            <button
                                type="button"
                                className="btn btn-outline-secondary me-2"
                            >
                                <PiPencilLight className="fs-5" style={{ transform: "rotate(270deg)" }} />
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-danger"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add New Answer Button */}
            <div className="d-flex justify-content-end align-items-center">
                <button className="btn btn-link text-danger">
                    <FaPlus className="me-2" /> Add Another Answer
                </button>
            </div>
            <hr />

            {/* Save and Cancel Buttons */}
            <div className="d-flex justify-content-center">
                <button className="btn btn-secondary me-3">Cancel</button>
                <button className="btn btn-danger">Update Question</button>
            </div>
        </div >
    );
}