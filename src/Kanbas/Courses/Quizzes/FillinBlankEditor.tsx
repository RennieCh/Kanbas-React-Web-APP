import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import QuestionTool from "./questiontool";
import { ImArrowRight } from "react-icons/im";

export default function FillInBlankEditor() {

    return (
        <div className="container mt-4">
            {/* Question Instructions */}
            <div id="fillblank-question-description" className="mb-4">
                <span>Enter your question text, then define all possible correct answers for the blank. Students will see the question followed by a small text box to type their answer.</span>
                <br />
            </div>

            {/* Question Toolbar */}
            <QuestionTool />

            {/* Question Title and Points */}
            <div className="d-flex align-items-center mb-4">
                <input
                    type="text"
                    className="form-control me-3"
                    placeholder="Question Title"
                    style={{ maxWidth: "300px" }}
                />
                <input
                    type="number"
                    className="form-control"
                    placeholder="Points"
                    style={{ width: "100px" }}
                />
            </div>

            {/* Question Text Area */}
            <div className="mb-4">
                <textarea
                    className="form-control"
                    id="fillblank-question-text"
                    rows={5}
                    placeholder="Enter your question here"
                ></textarea>
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
                                className="btn btn-outline-danger"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add New Answer Button */}
            <div className="d-flex justify-content-end align-items-center mb-4">
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
        </div>
    );
}