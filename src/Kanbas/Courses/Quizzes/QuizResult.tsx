import { useNavigate, useParams } from "react-router-dom";

export default function QuizResult() {
    const navigate = useNavigate();
    const { cid } = useParams<{ cid: string }>();

        // Navigate back to Quiz Result Screen
        const handleExit = () => {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/`);
        };
    return (
        <div className="container mt-4">
            {/* Quiz Title */}
            <h4>Quiz Title Placeholder</h4>
            <hr />
            <div>
                <span><b>Due </b>Sep 20, 11:59pm</span> | <span><b>Points </b>29</span> | <span><b>Questions </b>11</span> <br />
                <span><b>Available </b>Sep 16 at 11:59pm - Sep 20 at 11:59pm</span><br />
                <span><b>Time Limit </b>20 Minutes</span>
            </div>
            <hr />

            {/* Attempt History */}
            <div className="container mt-4">
                <h4>Attempt History</h4>
                <div className="mt-3">
                    <div className="row fw-bold">
                        <div className="col-2"></div>
                        <div className="col-2">Attempt</div>
                        <div className="col-2">Time</div>
                        <div className="col-2">Score</div>
                        <div className="col-2">Submitted On</div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-2 fw-bold text-uppercase">Latest</div>
                        <div className="col-2 text-danger">Attempt 1</div>
                        <div className="col-2">16 minutes</div>
                        <div className="col-2">29 out of 29</div>
                        <div className="col-2">Sep 19, 8:00PM</div>
                    </div>
                    <hr />
                </div>
            </div>

            {/* Questions List */}
            <div className="questions-list mt-4">
                {/* Question 1 */}
                <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Question 1</h5>
                        <span>1 / 1 pts</span>
                    </div>
                    <div className="card-body">
                        <p>What is 1 + 1?</p>
                        <hr />
                        {/* Answer Options */}
                        <div className="form-check d-flex align-items-center justify-content-between mt-3">
                            <div>
                                <input className="form-check-input" type="radio" checked disabled />
                                <label className="form-check-label ms-2">2</label>
                            </div>
                            <span className="badge rounded-pill text-bg-success">Correct!</span>
                        </div>
                        <div className="form-check mt-3">
                            <input className="form-check-input" type="radio" disabled/>
                            <label className="form-check-label ms-2">3</label>
                        </div>
                        <div className="form-check mt-3">
                            <input className="form-check-input" type="radio" disabled/>
                            <label className="form-check-label ms-2">4</label>
                        </div>
                        <div className="form-check mt-3">
                            <input className="form-check-input" type="radio" disabled/>
                            <label className="form-check-label ms-2">5</label>
                        </div>
                    </div>
                </div>

                {/* Question 2 */}
                <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Question 2</h5>
                        <span>0 / 1 pts</span>
                    </div>
                    <div className="card-body">
                        <p>Is 1 + 1 = 3?</p>
                        <hr />
                        {/* Answer Options */}
                        <div className="form-check mt-3">
                            <input className="form-check-input" type="radio" checked disabled />
                            <label className="form-check-label ms-2">True</label>
                        </div>
                        <div className="form-check d-flex align-items-center justify-content-between mt-3">
                            <div>
                                <input className="form-check-input" type="radio" disabled/>
                                <label className="form-check-label ms-2">False</label>
                            </div>
                            <span className="badge rounded-pill text-bg-success">Correct!</span>
                        </div>
                    </div>
                </div>

                {/* Question 3 */}
                <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Question 3</h5>
                        <span>0 / 1 pts</span>
                    </div>
                    <div className="card-body">
                        <p>Is 1 + 1 = ____ ?</p>
                        <hr />
                        {/* Answer Options */}
                        <div className="form-check mt-3">
                            <input className="form-control" type="text" value="0" style={{ width: '100px' }}  disabled />
                        </div>
                    </div>
                </div>

                                {/* Question 4 */}
                                <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Question 4</h5>
                        <span>1 / 1 pts</span>
                    </div>
                    <div className="card-body">
                        <p>Is 1 + 1 = ____ ?</p>
                        <hr />
                        {/* Answer Options */}
                        <div className="form-check d-flex align-items-center justify-content-between mt-3">
                            <input className="form-control" type="text" value="2" style={{ width: '100px' }}  disabled />
                            <span className="badge rounded-pill text-bg-success">Correct!</span>
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            {/* Footer Section */}
            <div className="d-flex justify-content-end align-items-center mt-3">
                <button className="btn btn-secondary" onClick={handleExit}>Exit</button>
            </div>
        </div>
    );
}
