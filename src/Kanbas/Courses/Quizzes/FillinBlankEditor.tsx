import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import QuestionTool from "./questiontool";
import { ImArrowRight } from "react-icons/im";
import { PiPencilLight } from "react-icons/pi";

type Question = {
    _id: string;
    quiz: string;
    title: string;
    type: string;
    points: number;
    question: string;
    correctAnswer: string;
    choices: string[];
};

type FillInBlankEditorProps = {
    question: Question;
};

export default function FillInBlankEditor({ question }: FillInBlankEditorProps) {
    const [answers, setAnswers] = useState(question.choices);

    // Handle updating the text of an answer
    const handleUpdateAnswer = (index: number, newValue: string) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = newValue;
        setAnswers(updatedAnswers);
    };

    // Handle deleting an answer
    const handleDeleteAnswer = (index: number) => {
        const updatedAnswers = answers.filter((_, i) => i !== index);
        setAnswers(updatedAnswers);
    };

    // Handle adding a new answer
    const handleAddAnswer = () => {
        setAnswers([...answers, ""]);
    };

    return (
        <div className="container mt-4">
            {/* Question Instructions */}
            <div id="fillblank-question-description" className="mb-4">
                <span>Enter your question text, then define all possible correct answers for the blank. Students will see the question followed by a small text box to type their answer.</span>
                <br />
            </div>

            {/* Question Toolbar */}
            <QuestionTool />

            {/* Question Text Area */}
            <div className="mb-4">
                <textarea
                    className="form-control"
                    id="fillblank-question-text"
                    rows={5}
                    value={question.question}
                    placeholder="Enter your question here"
                    onChange={(e) => (question.question = e.target.value)}
                ></textarea>
            </div>

            {/* Answers Section */}
            <div className="mb-4">
                <h4>Answers:</h4>
                {answers.map((choice, index) => (
                    <div key={index} className="d-flex align-items-center mb-3">
                        {/* Answer Input */}
                        <div className="d-flex align-items-center">
                            <ImArrowRight className="text-muted fs-4 me-2" />
                            <span className="me-3">Possible Answer</span>
                            <input
                                type="text"
                                className="form-control border-muted"
                                style={{ width: "300px" }}
                                value={choice}
                                onChange={(e) => handleUpdateAnswer(index, e.target.value)}
                            />
                        </div>

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
                                onClick={() => handleDeleteAnswer(index)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add New Answer Button */}
            <div className="d-flex justify-content-end align-items-center mb-4">
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
        </div>
    );
}
