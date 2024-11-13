import React from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { PiPencil } from "react-icons/pi";
import { BsQuestionCircle } from "react-icons/bs";
import { CgPentagonRight } from "react-icons/cg";


export default function QuizPreview() {
    return (
        <div className="container mt-4">
            {/* Quiz Title */}
            <h4>Quiz Title Placeholder</h4>

            {/* Alert Message */}
            <div className="alert alert-danger" role="alert">
                <BsExclamationCircle className="text-danger me-2" />
                <span>This is the preview of the published version of the quiz.</span>
            </div>

            {/* Quiz Instructions and Info */}
            <div>
                <p>Started: Nov 29 at 8:19am</p>
                <h4>Quiz Instructions</h4>
            </div>
            <hr />

            <div className="d-flex align-items-start mb-4">
                {/* Pentagon Icon aligned to the left of the card */}
                <CgPentagonRight className="fs-1 me-3 mt-1" />

                {/* Question Preview Card */}
                <div className="card flex-grow-1">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Question 1</h5>
                        <span>1 pts</span>
                    </div>
                    <div className="card-body">
                        <p>
                            An HTML <b>label</b> element can be associated with an HTML <b>input</b> element by setting their <b>id</b> attributes to the same value.
                        </p>
                        <p>
                            The resulting effect is that when you click on the <b>label</b> text, the <b>input</b> element receives focus as if you had clicked on the <b>input</b> element itself.
                        </p>
                        <hr />
                        {/* Answer Options */}
                        <div className="form-check mt-3">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="question1"
                                id="option1"
                            />
                            <label className="form-check-label" htmlFor="option1">
                                True
                            </label>
                        </div>
                        <hr />
                        <div className="form-check mt-2">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="question1"
                                id="option2"
                            />
                            <label className="form-check-label" htmlFor="option2">
                                False
                            </label>
                        </div>
                    </div>
                </div>
            </div>


            {/* Navigation Buttons */}
            <div className="d-flex justify-content-between align-items-center">
                <button className="btn btn-secondary"> <IoMdArrowDropleft className="me-1 fs-4" /> Previous</button>
                <button className="btn btn-secondary">Next <IoMdArrowDropright className="ms-1 fs-4" /></button>
            </div>
            <hr />

            {/* Footer Section */}
            <div className="d-flex justify-content-end align-items-center mt-3 p-3 border rounded">
                <span className="text-muted me-3">Quiz saved at 8:19am</span>
                <button className="btn btn-secondary">Submit Quiz</button>
            </div>

            {/* New Component: Question List with "Keep Editing This Quiz" */}
            <div className="container mt-5">
                <button className="btn btn-outline-secondary mb-4 d-flex align-items-center w-100 py-3">
                    <PiPencil className="me-2" style={{ transform: "rotate(270deg)" }} />
                    Keep Editing This Quiz
                </button>

                <h3>Questions</h3>
                <ol className="list-group list-group-flush">
                    <li className="list-group-item d-flex align-items-center">
                        <span className="text-muted me-2"><BsQuestionCircle /></span>
                        <span className="text-danger"><b>Question 1</b></span>
                    </li>
                    <li className="list-group-item d-flex align-items-center">
                        <span className="text-muted me-2"><BsQuestionCircle /></span>
                        <span className="text-danger">Question 2</span>
                    </li>
                    <li className="list-group-item d-flex align-items-center">
                        <span className="text-muted me-2"><BsQuestionCircle /></span>
                        <span className="text-danger">Question 3</span>
                    </li>
                    <li className="list-group-item d-flex align-items-center">
                        <span className="text-muted me-2"><BsQuestionCircle /></span>
                        <span className="text-danger">Question 4</span>
                    </li>
                    <li className="list-group-item d-flex align-items-center">
                        <span className="text-muted me-2"><BsQuestionCircle /></span>
                        <span className="text-danger">Question 5</span>
                    </li>
                </ol>
            </div>
        </div>
    );
}
