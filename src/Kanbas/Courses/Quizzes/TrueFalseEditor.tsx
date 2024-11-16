import React, { useState, useEffect } from "react";
import QuestionTool from "./questiontool";
import { ImArrowRight } from "react-icons/im";

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

type TrueFalseEditorProps = {
    question: Question;
};

export default function TrueFalseEditor({ question }: TrueFalseEditorProps) {
    const [correctAnswer, setCorrectAnswer] = useState(question.correctAnswer);

    // Handle marking the correct answer
    const handleMarkCorrect = (choice: string) => {
        setCorrectAnswer(choice);
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
                    value={question.question}
                    readOnly
                />
            </div>

            {/* Answers Section */}
            <div className="mb-4">
                <h4>Answers:</h4>

                {/* Render the choices (True/False) */}
                {question.choices.map((choice, index) => (
                    <div key={index} className="d-flex align-items-center justify-content-between mb-3">
                        {/* Label for True/False */}
                        <div className="d-flex align-items-center">
                            <ImArrowRight className={choice === correctAnswer ? "text-success fs-4 me-2" : "text-muted fs-4 me-2"} />
                            <span className={choice === correctAnswer ? "fw-bold text-success" : "fw-bold"}>{choice}</span>
                        </div>

                        {/* Checkbox to mark correct answer */}
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={choice === correctAnswer}
                                onChange={() => handleMarkCorrect(choice)}
                            />
                            <label className="form-check-label">Mark Correct</label>
                        </div>
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
