import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import QuestionTool from "./questiontool";

type Answer = {
    id: number;
    text: string;
};

export default function FillInBlankEditor() {
    // State to manage list of possible correct answers
    const [answers, setAnswers] = useState<Answer[]>([
        { id: 1, text: "" }
    ]);

    const [questionTitle, setQuestionTitle] = useState("");
    const [questionPoints, setQuestionPoints] = useState(0);
    const [questionText, setQuestionText] = useState("");

    // Function to add a new blank answer field
    const handleAddAnswer = () => {
        const newAnswer: Answer = { id: Date.now(), text: "" };
        setAnswers([...answers, newAnswer]);
    };

    // Function to update an existing answer
    const handleUpdateAnswer = (id: number, text: string) => {
        setAnswers(answers.map((answer) =>
            answer.id === id ? { ...answer, text } : answer
        ));
    };

    // Function to delete an answer
    const handleDeleteAnswer = (id: number) => {
        setAnswers(answers.filter((answer) => answer.id !== id));
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

            {/* Question Title and Points */}
            <div className="d-flex align-items-center mb-4">
                <input
                    type="text"
                    className="form-control me-3"
                    placeholder="Question Title"
                    value={questionTitle}
                    onChange={(e) => setQuestionTitle(e.target.value)}
                    style={{ maxWidth: "300px" }}
                />
                <input
                    type="number"
                    className="form-control"
                    placeholder="Points"
                    value={questionPoints}
                    onChange={(e) => setQuestionPoints(Number(e.target.value))}
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
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                ></textarea>
            </div>

            {/* Answers Section */}
            <div className="mb-4">
                <h4>Answers:</h4>
                {answers.map((answer, index) => (
                    <div key={answer.id} className="d-flex align-items-center mb-3">
                        {/* Correct Answer Icon */}
                        <span>Possible Answer: </span>

                        {/* Answer Input */}
                        <input
                            type="text"
                            className="form-control ms-3 me-3"
                            value={answer.text}
                            onChange={(e) => handleUpdateAnswer(answer.id, e.target.value)}
                            style={{ maxWidth: "300px" }}
                        />

                        {/* Action Buttons */}
                        <div className="ms-auto d-flex align-items-center">
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
