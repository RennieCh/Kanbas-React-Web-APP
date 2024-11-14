import React, { useState } from "react";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillInBlankEditor from "./FillinBlankEditor";

export default function QuestionEditor() {
    // State to manage selected question type
    const [questionType, setQuestionType] = useState("Multiple Choice");

    // Handler for changing question type
    const handleQuestionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setQuestionType(event.target.value);
    };

    return (
        <div className="container mt-5 p-4 border rounded">
            {/* Question Editor Form */}
            <div className="d-flex align-items-center mb-3 gap-2">
                {/* Question Title */}
                <input
                    id="quiz-question-title"
                    type="text"
                    className="form-control"
                    placeholder="Enter question title"
                    style={{ width: "300px" }}
                />

                {/* Dropdown for Question Type */}
                <select
                    id="quiz-question-type"
                    className="form-select"
                    style={{ width: "200px" }}
                    value={questionType}
                    onChange={handleQuestionTypeChange}
                >
                    <option>Multiple Choice</option>
                    <option>True/False</option>
                    <option>Fill in the Blank</option>
                </select>

                {/* Points Input Field */}
                <div className="d-flex align-items-center justify-content-end">
                    <label htmlFor="quiz-question-pts" className="form-label me-2">
                        Points
                    </label>
                    <input
                        id="quiz-question-pts"
                        type="number"
                        className="form-control w-50"
                        placeholder="0"
                    />
                </div>
            </div>
            <hr />

            {/* Render the appropriate editor based on the selected question type */}
            {questionType === "Multiple Choice" && <MultipleChoiceEditor />}
            {questionType === "True/False" && <TrueFalseEditor />}
            {questionType === "Fill in the Blank" && <FillInBlankEditor />}
        </div>
    );
}