import { PiPencil } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function QuizzesDetails() {
    const navigate = useNavigate();
    const { cid, aid } = useParams<{ cid: string; aid: string }>(); // Get the course ID and quiz ID from the URL

    // Get quizzes from the store using useSelector with inline type assertion
    const quizzes = useSelector((state) => (state as any).quizzesReducer.quizzes);

    // Fetch the quiz based on the course ID and quiz ID
    const quiz = quizzes.find((q: any) => q._id === aid && q.course === cid);

    // Handle the case where the quiz is not found
    if (!quiz) {
        return (
            <div className="container mt-5">
                <h4 className="text-danger">Quiz not found for this course!</h4>
                <p>Please check if the course and quiz IDs are correct.</p>
            </div>
        );
    }

    // Function to handle navigation to the Editor screen
    const handleEditClick = () => {
        if (cid && aid) {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${aid}/edit`);
        }
    };

    // Handler to navigate to QuizPreview
    const handlePreview = () => {
        if (cid && aid) {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${aid}/Preview`);
        }
    };

    return (
        <div id="wd-quizzes-details" className="container-fluid mt-4 p-1"
            style={{ maxWidth: '1200px', margin: '0 auto' }}>

            {/* Faculty Quiz Controls */}
            <div id="wd-quizzes-details-btn" className="d-flex justify-content-center align-items-center">
                <button id="wd-quiz-preview-btn" className="btn btn-lg btn-secondary me-1" onClick={handlePreview}>
                    Preview
                </button>
                <button id="wd-quiz-edit-btn" className="btn btn-lg btn-secondary me-1" onClick={handleEditClick}>
                    <PiPencil className="position-relative me-2" style={{ bottom: "1px" }} />
                    Edit
                </button>
            </div>
            <hr />
            <h3 id="wd-quiz-title">{quiz.title}</h3>
            <br />

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end" >
                    <b>Quiz Type</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">{quiz.type}</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Points</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">{quiz.points}</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Assignment Group</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">{quiz.assignmentGroup}</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Shuffle Answers</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">{quiz.shuffleAnswer ? "Yes" : "No"}</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Time Limit</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">{quiz.timeLimit} Minutes</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Multiple Attempts</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">{quiz.allowMultiAttempts ? "Yes" : "No"}</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>How Many Attempts</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">{quiz.numberOfAttempts}</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Show Correct Answers</ b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">{quiz.showCorrectAnswers}</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>One Question at a Time</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">{quiz.oneQuestionaTime ? "Yes" : "No"}</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Access Code</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">{quiz.accessCode}</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Webcam Required</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">{quiz.webCam ? "Yes" : "No"}</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Lock Questions After Answering</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</span>
                </div>
            </div>
            <br />

            <div className="row mb-3">
                {/* Labels Row */}
                <div className="col-3 text-center"><b>Due</b></div>
                <div className="col-3 text-center"><b>For</b></div>
                <div className="col-3 text-center"><b>Available From</b></div>
                <div className="col-3 text-center"><b>Until</b></div>
            </div>
            <hr />
            <div className="row">
                {/* Values Row */}
                <div className="col-3 text-center">{new Date(quiz.dueDate).toLocaleString()}</div>
                <div className="col-3 text-center">Everyone</div>
                <div className="col-3 text-center">{new Date(quiz.availableFromDate).toLocaleString()}</div>
                <div className="col-3 text-center">{new Date(quiz.availableUntilDate).toLocaleString()}</div>
            </div>
            <hr />

            {/* start Quiz section for Student users */}
            <div className="d-flex justify-content-center mt-3">
                <button type="button" className="btn btn-secondary me-3">Start Quiz</button>
            </div>
        </div>
    );
}