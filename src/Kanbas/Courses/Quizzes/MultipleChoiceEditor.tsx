import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import QuestionTool from "./questiontool";
import { ImArrowRight } from "react-icons/im";
import { PiPencilLight } from "react-icons/pi";

type Answer = {
    id: number;
    text: string;
    isCorrect: boolean;
};

export default function MultipleChoiceEditor() {
    const [answers, setAnswers] = useState<Answer[]>([
        { id: 1, text: "", isCorrect: false }
    ]);

    const handleAddAnswer = () => {
        const newAnswer: Answer = { id: Date.now(), text: "", isCorrect: false };
        setAnswers([...answers, newAnswer]);
    };

    const handleUpdateAnswer = (id: number, text: string) => {
        setAnswers(answers.map((answer) =>
            answer.id === id ? { ...answer, text } : answer
        ));
    };

    const handleSelectCorrect = (id: number) => {
        setAnswers(answers.map((answer) =>
            answer.id === id ? { ...answer, isCorrect: true } : { ...answer, isCorrect: false }
        ));
    };

    const handleDeleteAnswer = (id: number) => {
        setAnswers(answers.filter((answer) => answer.id !== id));
    };

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
                {answers.map((answer, index) => (
                    <div key={answer.id} className="d-flex align-items-center mb-3">
                        {/* Correct Answer Icon */}
                        <div className="me-3">
                            {answer.isCorrect ? (
                                <div>
                                    <ImArrowRight className="text-success fs-4" onClick={() => handleSelectCorrect(answer.id)} />
                                    <span> Correct Answer</span>
                                </div>
                            ) : (
                                <div>
                                    <ImArrowRight className="text-muted fs-4" onClick={() => handleSelectCorrect(answer.id)} />
                                    <span> Possible Answer</span>
                                </div>
                            )}
                        </div>

                        {/* Answer Input */}
                        <input
                            type="text"
                            className={`form-control ${answer.isCorrect ? "border-success" : ""}`}
                            style={{ width: "300px" }}
                            value={answer.text}
                            onChange={(e) => handleUpdateAnswer(answer.id, e.target.value)}
                        />

                        {/* Action Buttons */}
                        <div className="ms-auto d-flex align-items-center">
                            <button
                                type="button"
                                className="btn btn-outline-secondary me-2"
                            >
                                <PiPencilLight className="fs-5" style={{ transform: "rotate(270deg)" }} />
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={() => handleDeleteAnswer(answer.id)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>

                ))}
            </div>

            {/* Add New Answer Button */}
            <div className="d-flex justify-content-end align-items-center">
                <button className="btn btn-link text-danger" onClick={handleAddAnswer}>
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
