import React, { useEffect, useState } from 'react';
import QuizzesControls from "./QuizzesControls";
import { VscTriangleDown } from "react-icons/vsc";
import { IoRocketOutline } from "react-icons/io5";
import SingleQuizButtons from "./SingleQuizButtons";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz } from './reducer';
import { fetchQuizzesForCourse, createQuiz, fetchQuestionsForQuiz } from './client';

// Helper function to format dates for "YYYY-MM-DD" format
const formatDateToHtmlString = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

// Helper function to render dates in a consistent format
const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1); // Adjust for date gap issue
    return date.toLocaleDateString("en-US", {
        timeZone: "America/New_York",
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });
};

export default function Quizzes() {
    const { cid } = useParams(); // Get the course ID from the URL
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentDate = new Date();
    const [courseQuizzes, setCourseQuizzes] = useState<any[]>([]);
    const [questionsCount, setQuestionsCount] = useState<{ [key: string]: number }>({});
    const [newQuizId, setNewQuizId] = useState<string | null>(null);

    // Get current user
    const currentUser = useSelector((state) => (state as any).accountReducer.currentUser);

    // Fetch quizzes from the backend
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                if (cid) {
                    const quizzes = await fetchQuizzesForCourse(cid);
                    setCourseQuizzes(quizzes);
                }
            } catch (error) {
                console.error("Failed to fetch quizzes for course:", error);
            }
        };
        fetchQuizzes();
    }, [cid]);

    // Fetch questions count for each quiz
    useEffect(() => {
        const fetchQuestionsCounts = async () => {
            try {
                const counts: { [key: string]: number } = {};
                for (const quiz of courseQuizzes) {
                    const questions = await fetchQuestionsForQuiz(quiz._id);
                    counts[quiz._id] = questions.length;
                }
                setQuestionsCount(counts);
            } catch (error) {
                console.error("Failed to fetch questions for quizzes:", error);
            }
        };
        if (courseQuizzes.length > 0) {
            fetchQuestionsCounts();
        }
    }, [courseQuizzes]);

    // Use Effect to monitor the addition of a new quiz
    useEffect(() => {
        if (newQuizId) {
            const quizExists = courseQuizzes.some((quiz: any) => quiz._id === newQuizId);
            if (quizExists) {
                // Navigate to the new quiz detail page once it exists in the state
                navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuizId}`);
                setNewQuizId(null);
            }
        }
    }, [courseQuizzes, newQuizId, navigate, cid]);

    const onQuizChange = async () => {
        try {
          if (cid) {
            const quizzes = await fetchQuizzesForCourse(cid);
            setCourseQuizzes(quizzes);
          }
        } catch (error) {
          console.error("Failed to refresh quizzes after change:", error);
        }
      };

    // Function to handle adding a new quiz
    const addNewQuiz = async () => {
        const newQuizId = new Date().getTime().toString(); // Generate a unique ID
        const newQuiz = {
            _id: newQuizId,
            course: cid || "",
            title: "Unnamed Quiz",
            type: "Graded Quiz",
            points: 0,
            assignmentGroup: "QUIZZES",
            published: false,
            description: "",
            cloneable: false,
            shuffleAnswer: true,
            timeLimit: "20",
            allowMultiAttempts: false,
            numberOfAttempts: 1,
            showCorrectAnswers: "Immediately",
            oneQuestionaTime: true,
            accessCode: "",
            webCam: false,
            lockQuestionsAfterAnswering: false,
            availableFromDate: formatDateToHtmlString(new Date()),
            dueDate: formatDateToHtmlString(new Date()),
            availableUntilDate: formatDateToHtmlString(new Date()),
        };

        const createdQuiz = await createQuiz(newQuiz);
        dispatch(addQuiz(createdQuiz));
        setNewQuizId(createdQuiz._id);

        // navigate to quiz detail screen
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuizId}`);
    };

    // Function to determine quiz availability status
    const getAvailabilityStatus = (quiz: any) => {
        const availableFromDate = new Date(quiz.availableFromDate);
        const availableUntilDate = new Date(quiz.availableUntilDate);

        if (currentDate < availableFromDate) {
            return { status: "Not Available Until", isAvailable: false };
        } else if (currentDate >= availableFromDate && currentDate <= availableUntilDate) {
            return { status: "Available", isAvailable: true };
        } else {
            return { status: "Closed", isAvailable: false };
        }
    };

    return (
        <div className="container-fluid">
            <div id="wd-quizzes">
                {currentUser?.role === "FACULTY" && (
                    <QuizzesControls addNewQuiz={addNewQuiz} />
                )}
                <br />
                <hr />
                <br />

                {/* Conditional Rendering */}
                {courseQuizzes.length === 0 ? (
                    <div className="alert alert-warning" role="alert">
                        <b>Click the '+ Quiz' button to Create a New Quiz !!!!</b>
                    </div>
                ) : (
                    <ul id="wd-assignment-list" className="list-group rounded-0 w-100">
                        <li className="wd-assignment-list-item list-group-item p-0 mb-5 fs-5 border-gray">
                            <div className="p-3 ps-2 bg-secondary">
                                <VscTriangleDown className="me-2 fs-5" />
                                <span style={{ fontWeight: "bold", color: "black" }}>Assignments Quizzes</span>
                            </div>

                            {/* Dynamic List of Quizzes */}
                            <ul className="wd-lessons list-group rounded-0">
                                {courseQuizzes.map((quiz: any) => {
                                    const { status, isAvailable } = getAvailabilityStatus(quiz);
                                    const questionCount = questionsCount[quiz._id] || 0;
                                    return (
                                        <li key={quiz._id} className="wd-lesson list-group-item p-3 ps-1">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <IoRocketOutline className="me-4 fs-3 text-success" />
                                                </div>

                                                {/* Quiz Details */}
                                                <div className="text-left flex-grow-1">
                                                    <a
                                                        className="wd-assignment-link"
                                                        href={`#/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}`}
                                                        style={{ textDecoration: "none", fontWeight: "bold", color: "black" }}
                                                    >
                                                        {quiz.title}
                                                    </a>
                                                    <br />
                                                    {/* Availability, Due Date, Points, and Questions Count */}
                                                    <div>
                                                        {status === "Not Available Until" ?
                                                            (<><b>{status} </b>
                                                                {formatDateForDisplay(quiz.availableFromDate)} </>)
                                                            :
                                                            <b>{status} </b>}
                                                        |
                                                        <b> Due </b>
                                                        {formatDateForDisplay(quiz.dueDate)}
                                                        {" | "}
                                                        {quiz.points} pts | {questionCount} Questions
                                                    </div>
                                                </div>

                                                {/* Quiz Action Buttons with availability status */}
                                                {currentUser?.role === "FACULTY" && (
                                                    <SingleQuizButtons isAvailable={isAvailable} quizId={quiz._id} onQuizChange={onQuizChange} />
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    </ul>
                )}
                <br />
            </div>
        </div>
    );
}
