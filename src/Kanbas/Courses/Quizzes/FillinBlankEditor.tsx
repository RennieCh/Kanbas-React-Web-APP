import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import QuestionTool from "./questiontool";
import { ImArrowRight } from "react-icons/im";
import { PiPencilLight } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { updateQuestion } from "./reducer";
import { useParams, useNavigate } from "react-router-dom";

type FillInBlankEditorProps = {
    questionId: string;
};

export default function FillInBlankEditor({ questionId }: FillInBlankEditorProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { quiz, cid } = useParams<{ quiz: string; cid: string }>();

    // Get the question from the Redux state
    const question = useSelector((state: any) =>
        state.quizzesReducer.questions.find((q: any) => q._id === questionId && q.quiz === quiz)
    );

    if (!question) {
        return <div>Question not found!</div>;
    }

    // Handle updating an answer's text
    const handleUpdateAnswer = (index: number, newValue: string) => {
        const updatedChoices = [...question.choices];
        updatedChoices[index] = newValue;
        dispatch(updateQuestion({ ...question, choices: updatedChoices }));
    };

    // Handle deleting an answer
    const handleDeleteAnswer = (index: number) => {
        const updatedChoices = question.choices.filter((_: string, i: number) => i !== index);
        dispatch(updateQuestion({ ...question, choices: updatedChoices }));
    };

    // Handle adding a new answer
    const handleAddAnswer = () => {
        const updatedChoices = [...question.choices, ""];
        dispatch(updateQuestion({ ...question, choices: updatedChoices }));
    };

    // Cancel changes and navigate back to Quiz Editor with the Questions tab active
    const handleCancel = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz}/edit#questions`);
    };

    // Update question and navigate back to Quiz Editor with the Questions tab active
    const handleUpdateQuestion = () => {
        dispatch(updateQuestion(question));
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz}/edit#questions`);
    };

    return (
        <div className="container mt-4">
            {/* Question Instructions */}
            <div id="fillblank-question-description" className="mb-4">
                <span>
                    Enter your question text, then define all possible correct answers for the blank. Students will see the question followed by a small text box to type their answer.
                </span>
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
                    onChange={(e) => dispatch(updateQuestion({ ...question, question: e.target.value }))}
                ></textarea>
            </div>

            {/* Answers Section */}
            <div className="mb-4">
                <h4>Answers:</h4>
                {question.choices.map((choice: string, index: number) => (
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
                            <button type="button" className="btn btn-outline-secondary me-2">
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
            <div className="d-flex justify-content-end align-items-center mb-4">
                <button className="btn btn-link text-danger" onClick={handleAddAnswer}>
                    <FaPlus className="me-2" /> Add Another Answer
                </button>
            </div>

            <hr />

            {/* Save and Cancel Buttons */}
            <div className="d-flex justify-content-center">
                <button className="btn btn-secondary me-3" onClick={handleCancel}>Cancel</button>
                <button className="btn btn-danger" onClick={handleUpdateQuestion}>Update Question</button>
            </div>
        </div>
    );
}
