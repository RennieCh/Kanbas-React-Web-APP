import React, { useState } from "react";
import QuestionTool from "./questiontool";
import { ImArrowRight } from "react-icons/im";

type Answer = {
    id: number;
    text: string;
    isCorrect: boolean;
};

export default function TrueFalseEditor() {
    const [answers, setAnswers] = useState<Answer[]>([
        { id: 1, text: "True", isCorrect: true },
        { id: 2, text: "False", isCorrect: false }
    ]);

    const handleSelectCorrect = (id: number) => {
        setAnswers(answers.map(answer => ({
            ...answer,
            isCorrect: answer.id === id
        })));
    };

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
                {answers.map((answer) => (
                    <div key={answer.id} className="d-flex align-items-center mb-3">
                        {/* Correct Answer Icon */}
                        <div className="me-2">
                            {answer.isCorrect ? (
                                <ImArrowRight className="text-success fs-4" />
                            ) : (
                                <ImArrowRight className="text-muted fs-4" />
                            )}
                        </div>
                        <span
                            className={`fw-bold ${answer.isCorrect ? "text-success" : ""}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSelectCorrect(answer.id)}
                        >
                            {answer.text}
                        </span>
                    </div>
                ))}
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
