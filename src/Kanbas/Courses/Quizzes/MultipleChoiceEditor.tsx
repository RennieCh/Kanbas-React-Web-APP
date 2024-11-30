import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import QuestionTool from "./questiontool";
import { ImArrowRight } from "react-icons/im";
import { PiPencilLight } from "react-icons/pi";
import { updateQuestion } from "./client";
import { useParams, useNavigate } from "react-router-dom";

type MultipleChoiceEditorProps = {
    questionId: string;
    question: any;
    setQuestion: React.Dispatch<React.SetStateAction<any>>;
};

export default function MultipleChoiceEditor({ questionId, question, setQuestion }: MultipleChoiceEditorProps) {
    const navigate = useNavigate();
    const { quiz, cid } = useParams<{ quiz: string; cid: string }>();

    if (!question) {
        return <div>Question not found!</div>;
    }

    // Update the correct answer based on user interaction
    const handleMarkCorrect = async (choice: string) => {
        const updatedQuestion = { ...question, correctAnswer: choice };
        await updateQuestionData(updatedQuestion);
    };

    // Handle updating an answer's text
    const handleUpdateAnswer = async (index: number, newValue: string) => {
        const updatedChoices = [...question.choices];
        updatedChoices[index] = newValue;
        const updatedQuestion = { ...question, choices: updatedChoices };
        await updateQuestionData(updatedQuestion);
    };

    // Handle deleting an answer
    const handleDeleteAnswer = async (index: number) => {
        const updatedChoices = question.choices.filter((_: string, i: number) => i !== index);
        const updatedQuestion = { ...question, choices: updatedChoices };
        await updateQuestionData(updatedQuestion);
    };

    // Handle adding a new answer
    const handleAddAnswer = async () => {
        const updatedChoices = [...question.choices, ""];
        const updatedQuestion = { ...question, choices: updatedChoices };
        await updateQuestionData(updatedQuestion);
    };

    // Function to update question data both locally and on the server
    const updateQuestionData = async (updatedQuestion: any) => {
        try {
            await updateQuestion(updatedQuestion._id, updatedQuestion);
            setQuestion(updatedQuestion);
        } catch (error) {
            console.error("Failed to update question:", error);
        }
    };

    // Cancel changes and navigate back to Quiz Editor with the Questions tab active
    const handleCancel = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz}/edit#questions`);
    };

    // Update question and navigate back to Quiz Editor with the Questions tab active
    const handleUpdateQuestion = async () => {
        await updateQuestionData(question);
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz}/edit#questions`);
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
                    onChange={(e) => setQuestion({ ...question, question: e.target.value })}
                    placeholder="Enter your question here"
                />
            </div>

            {/* Answers Section */}
            <div className="mb-4">
                <h4>Answers:</h4>
                {question.choices.map((choice: string, index: number) => (
                    <div key={index} className="d-flex align-items-center mb-3">
                        {/* Icon for Correct or Possible Answer */}
                        <div className="d-flex align-items-center">
                            <ImArrowRight className={choice === question.correctAnswer ? "text-success fs-4" : "text-muted fs-4"} />
                            <span className={choice === question.correctAnswer ? "me-3 text-success" : "me-3"}>
                                {choice === question.correctAnswer ? "Correct Answer" : "Possible Answer"}
                            </span>
                            <input
                                type="text"
                                className={`form-control ${choice === question.correctAnswer ? "border-success" : "border-muted"}`}
                                style={{ width: "300px" }}
                                value={choice}
                                onChange={(e) => handleUpdateAnswer(index, e.target.value)}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="ms-auto d-flex align-items-center">
                            <div className="form-check me-2">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={choice === question.correctAnswer}
                                    onChange={() => handleMarkCorrect(choice)}
                                />
                                <label className="form-check-label">Mark Correct</label>
                            </div>
                            <button
                                type="button"
                                className="btn btn-outline-secondary me-2"
                                onClick={() => handleUpdateAnswer(index, choice)}
                            >
                                <PiPencilLight className="fs-5 me-1" style={{ transform: "rotate(270deg)" }} />
                                Update Answer
                            </button>
                            <button type="button" className="btn btn-outline-danger" onClick={() => handleDeleteAnswer(index)}>
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

            {/* Save and Cancel Buttons */}
            <div className="d-flex justify-content-center">
                <button className="btn btn-secondary me-3" onClick={handleCancel}>Cancel</button>
                <button className="btn btn-danger" onClick={handleUpdateQuestion}>Update Question</button>
            </div>
        </div>
    );
}
