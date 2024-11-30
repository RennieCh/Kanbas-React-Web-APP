import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillInBlankEditor from "./FillinBlankEditor";
import { fetchQuestionById} from "./client";

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
    const { aid } = useParams<{ aid: string }>();
    const [question, setQuestion] = useState<Question | null>(null);

    // Fetch the question from the server
    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                if (aid) {
                    const fetchedQuestion = await fetchQuestionById(aid);
                    setQuestion(fetchedQuestion);
                }
            } catch (error) {
                console.error("Failed to fetch question:", error);
            }
        };

        fetchQuestion();
    }, [aid]);

    // Handler for changing question type
    const handleQuestionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (!question) return;
        const newType = event.target.value;
        setQuestion({ ...question, type: newType });
    };

    // Handler for updating the question title
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!question) return;
        setQuestion({ ...question, title: event.target.value });
    };

    // Handler for updating points
    const handlePointsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!question) return;
        setQuestion({ ...question, points: parseInt(event.target.value) });
    };

    // If question is not found, show a message
    if (!question) {
        return <div>Question not found!</div>;
    }

    // Normalize the question type for rendering purposes
    const normalizedType = question.type.toLowerCase();
    const questionType =
        normalizedType === "multiple choice"
            ? "Multiple Choice"
            : normalizedType === "true/false"
                ? "True/False"
                : normalizedType === "fill in the blank"
                    ? "Fill in the Blank"
                    : "";

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
                    onChange={handleTitleChange}
                    style={{ width: "300px" }}
                />

                {/* Dropdown for Question Type */}
                <select
                    id="quiz-question-type"
                    className="form-select"
                    style={{ width: "200px" }}
                    value={question.type}
                    onChange={handleQuestionTypeChange}
                >
                    <option value="Multiple choice">Multiple choice</option>
                    <option value="True/false">True/false</option>
                    <option value="Fill in the blank">Fill in the blank</option>
                </select>

                {/* Points Input Field */}
                <div className="d-flex align-items-center justify-content-end">
                    <label htmlFor="quiz-question-pts" className="form-label me-2">Points</label>
                    <input
                        id="quiz-question-pts"
                        type="number"
                        className="form-control w-50"
                        value={question.points}
                        onChange={handlePointsChange}
                        placeholder="0"
                    />
                </div>
            </div>
            <hr />

            {/* Render the appropriate editor based on the selected question type */}
            {questionType === "Multiple Choice" && <MultipleChoiceEditor questionId={question._id} question={question} setQuestion={setQuestion} />}
            {questionType === "True/False" && <TrueFalseEditor questionId={question._id} question={question} setQuestion={setQuestion}/>}
            {questionType === "Fill in the Blank" && <FillInBlankEditor question={question} setQuestion={setQuestion} />}
        </div>
    );
}
