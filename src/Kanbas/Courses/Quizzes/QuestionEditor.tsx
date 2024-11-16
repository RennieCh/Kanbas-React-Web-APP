import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillInBlankEditor from "./FillinBlankEditor";
import { questions } from "../../Database";

// Define the structure of a Question
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

export default function QuestionEditor() {
    const { quiz, aid } = useParams<{ quiz: string; aid: string }>();
    const [question, setQuestion] = useState<Question | null>(null);
    const [questionType, setQuestionType] = useState("");


    useEffect(() => {
        console.log("Extracted params:", { quiz, aid });

        const selectedQuestion = questions.find(q => q._id === aid && q.quiz === quiz);
        if (selectedQuestion) {
            console.log("Selected Question Found:", selectedQuestion);
            setQuestion(selectedQuestion);

            // Normalize the question type to match the options in your dropdown
            const normalizedType = selectedQuestion.type.toLowerCase();
            if (normalizedType === "multiple choice") {
                setQuestionType("Multiple Choice");
            } else if (normalizedType === "true/false") {
                setQuestionType("True/False");
            } else if (normalizedType === "fill in the blank") {
                setQuestionType("Fill in the Blank");
            }
        } else {
            console.log("Question not found with ID:", aid);
        }
    }, [quiz, aid]);

    // If question is not found, show a message
    if (!question) {
        return <div>Question not found!</div>;
    }

    // Handler for changing question type
    const handleQuestionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = event.target.value;
        setQuestionType(newType);
        setQuestion({ ...question, type: newType });
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
                    value={question.title}
                    onChange={(e) => setQuestion({ ...question, title: e.target.value })}
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
                    <label htmlFor="quiz-question-pts" className="form-label me-2">Points</label>
                    <input
                        id="quiz-question-pts"
                        type="number"
                        className="form-control w-50"
                        value={question.points}
                        onChange={(e) => setQuestion({ ...question, points: parseInt(e.target.value) })}
                        placeholder="0"
                    />
                </div>
            </div>
            <hr />

            {/* Render the appropriate editor based on the selected question type */}
            {questionType === "Multiple Choice" && <MultipleChoiceEditor question={question} />}
            {questionType === "True/False" && <TrueFalseEditor question={question} />}
            {questionType === "Fill in the Blank" && <FillInBlankEditor question={question} />}
        </div>
    );
}