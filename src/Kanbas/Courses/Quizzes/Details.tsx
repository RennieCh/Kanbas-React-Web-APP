import { PiPencil } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";

export default function QuizzesDetails() {
    const navigate = useNavigate();
    const { aid } = useParams(); // Get the quiz ID from the URL

    // Function to handle navigation to the Editor screen, use 123 id as placeholder
    const handleEditClick = () => {
        if (aid) {
            navigate(`/Kanbas/Courses/1234/Quizzes/123/edit`);
        }
    };

    // Handler to navigate to QuizPreview
    const handlePreview = () => {
        navigate("/Kanbas/Courses/1234/Quizzes/123/Preview");
    };

    return (
        <div id="wd-quizzes-details" className="container-fluid mt-4 p-1"
            style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
            <h3 id="wd-quiz-title">Q1 - HTML</h3>
            <br />

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end" >
                    <b>Quiz Type</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">Graded Quiz</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Points</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">29</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Assignment Group</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">QUIZZES</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Shuffle Answers</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">No</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Time Limit</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">30 Minutes</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Multiple Attempts</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">No</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>View Responses</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">Always</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Show Correct Answers</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">Immediately</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>One Question at a Time</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">Yes</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Require Respondus LockDown Browser</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">No</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Required to View Quiz Results</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">No</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Webcam Required</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">No</span>
                </div>
            </div>

            <div className="row align-items-center mb-6">
                <label className="col-sm-6 col-form-label text-end">
                    <b>Lock Questions After Answering</b>
                </label>
                <div className="col-sm-6">
                    <span className="align-middle">No</span>
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
                <div className="col-3 text-center">Sep 21 at 1 pm</div>
                <div className="col-3 text-center">Everyone</div>
                <div className="col-3 text-center">Sep 21 at 11:40 am</div>
                <div className="col-3 text-center">Sep 21 at 1 pm</div>
            </div>
            <hr />
        </div>
    );
}
