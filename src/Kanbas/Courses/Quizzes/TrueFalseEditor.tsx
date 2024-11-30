import React, { useEffect } from "react";
import QuestionTool from "./questiontool";
import { ImArrowRight } from "react-icons/im";
import { updateQuestion } from "./client";
import { useParams, useNavigate } from "react-router-dom";

type TrueFalseEditorProps = {
    questionId: string;
    question: any;
    setQuestion: React.Dispatch<React.SetStateAction<any>>;
};

export default function TrueFalseEditor({ questionId, question, setQuestion }: TrueFalseEditorProps) {
    const navigate = useNavigate();
    const { quiz, cid } = useParams<{ quiz: string; cid: string }>();

    useEffect(() => {
        const updateQuestionData = async (updatedQuestion: any) => {
            try {
                await updateQuestion(updatedQuestion._id, updatedQuestion);
                setQuestion(updatedQuestion);
            } catch (error) {
                console.error("Failed to update question:", error);
            }
        }
        if (question && question.type === "True/false" && question.choices.length !== 2) {
            // Update the choices to ["True", "False"] if not already set
            const updatedQuestion = { ...question, choices: ["True", "False"] };
            updateQuestionData(updatedQuestion);
        }
    }, [question, setQuestion]);

    if (!question) {
        return <div>Question not found!</div>;
    }

    // Handle marking the correct answer
    const handleMarkCorrect = async (choice: string) => {
        const updatedQuestion = { ...question, correctAnswer: choice };
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
                    onChange={(e) =>
                        setQuestion({ ...question, question: e.target.value })
                    }
                />
            </div>

            {/* Answers Section */}
            <div className="mb-4">
                <h4>Answers:</h4>

                {/* Render the choices (True/False) */}
                {question.choices.map((choice: string, index: number) => (
                    <div key={index} className="d-flex align-items-center justify-content-between mb-3">
                        {/* Label for True/False */}
                        <div className="d-flex align-items-center">
                            <ImArrowRight className={choice === question.correctAnswer ? "text-success fs-4 me-2" : "text-muted fs-4 me-2"} />
                            <span className={choice === question.correctAnswer ? "fw-bold text-success" : "fw-bold"}>{choice}</span>
                        </div>

                        {/* Checkbox to mark correct answer */}
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={choice === question.correctAnswer}
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
                <button className="btn btn-secondary me-3" onClick={handleCancel}>Cancel</button>
                <button className="btn btn-danger" onClick={handleUpdateQuestion}>
                    Update Question
                </button>
            </div>
        </div>
    );
}
