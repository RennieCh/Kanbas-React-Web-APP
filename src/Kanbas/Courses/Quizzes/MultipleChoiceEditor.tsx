import React, { useState, useEffect } from "react";
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

type MultipleChoiceEditorProps = {
    question: Question;
};

export default function MultipleChoiceEditor({ question }: MultipleChoiceEditorProps) {
    const [answers, setAnswers] = useState(question.choices);
    const [correctAnswer, setCorrectAnswer] = useState(question.correctAnswer);

    // Update the correct answer based on user interaction
    const handleMarkCorrect = (choice: string) => {
        setCorrectAnswer(choice);
    };

    return (
        <div className="container mt-4">
            <div id="mul-question-description" className="mb-4">
                <span>Enter your question and multiple answers, then select the correct answer.</span>
                <br />
            </div>

            {/* Question Toolbar */}
            <QuestionTool />

            {/* Question Text Area */}
            <div className="mb-4">
                <textarea
                    className="form-control"
                    id="mul-question-text"
                    rows={5}
                    value={question.question}
                    placeholder="Enter your question here"
                    readOnly
                />
            </div>

            {/* Answers Section */}
            <div className="mb-4">
                <h4>Answers:</h4>
                {answers.map((choice, index) => (
                    <div key={index} className="d-flex align-items-center mb-3">
                        {/* Icon for Correct or Possible Answer */}
                        <div className="d-flex align-items-center">
                            <ImArrowRight className={choice === correctAnswer ? "text-success fs-4" : "text-muted fs-4"} />
                            <span className={choice === correctAnswer ? "me-3 text-success" : "me-3"}>
                                {choice === correctAnswer ? "Correct Answer" : "Possible Answer"}
                            </span>
                            <input
                                type="text"
                                className={`form-control ${choice === correctAnswer ? "border-success" : "border-muted"}`}
                                style={{ width: "300px" }}
                                value={choice}
                                readOnly
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="ms-auto d-flex align-items-center">
                            <div className="form-check me-2">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={choice === correctAnswer}
                                    onChange={() => handleMarkCorrect(choice)}
                                />
                                <label className="form-check-label">Mark Correct</label>
                            </div>
                            <button type="button" className="btn btn-outline-secondary me-2">
                                <PiPencilLight className="fs-5" style={{ transform: "rotate(270deg)" }} />
                            </button>
                            <button type="button" className="btn btn-outline-danger">
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add New Answer Button */}
            <div className="d-flex justify-content-end align-items-center">
                <button className="btn btn-link text-danger">
                    <FaPlus className="me-2" /> Add Another Answer
                </button>
            </div>

            {/* Save and Cancel Buttons */}
            <div className="d-flex justify-content-center">
                <button className="btn btn-secondary me-3">Cancel</button>
                <button className="btn btn-danger">Update Question</button>
            </div>
        </div>
    );
}
