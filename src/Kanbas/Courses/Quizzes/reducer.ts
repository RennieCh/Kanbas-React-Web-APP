import { createSlice } from "@reduxjs/toolkit";
import { quizzes as quizzesDB, questions as questionsDB } from "../../Database";

const initialState = {
  quizzes: quizzesDB,
  questions: questionsDB,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    // Add a new quiz
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz = {
        _id: new Date().getTime().toString(),
        course: quiz.course,
        title: quiz.title || "Unnamed Quiz",
        type: quiz.type || "Graded Quiz",
        points: quiz.points || 0,
        assignmentGroup: quiz.assignmentGroup || "QUIZZES",
        published: quiz.published || false,
        description: quiz.description || "",
        cloneable: quiz.cloneable || false,
        shuffleAnswer: quiz.shuffleAnswer || true,
        timeLimit: quiz.timeLimit || "20",
        allowMultiAttempts: quiz.allowMultiAttempts || false,
        numberOfAttempts: quiz.numberOfAttempts || 1,
        showCorrectAnswers: quiz.showCorrectAnswers || "Immediately",
        oneQuestionaTime: quiz.oneQuestionaTime || true,
        accessCode: quiz.accessCode || "",
        webCam: quiz.webCam || false,
        lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering || false,
        availableFromDate: new Date().toISOString().split("T")[0],
        dueDate: new Date().toISOString().split("T")[0],
        availableUntilDate: new Date().toISOString().split("T")[0],
      };
      state.quizzes = [...state.quizzes, newQuiz];
    },
    // Delete a quiz by ID
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q) => q._id !== quizId);
      state.questions = state.questions.filter((question) => question.quiz !== quizId);
    },
    // Update an existing quiz
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q) => (q._id === quiz._id ? quiz : q));
    },
    // Edit an existing quiz (set editing mode)
    editQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((q) => (q._id === quizId ? { ...q, editing: true } : q));
    },
    // Add a new question to a quiz
    addQuestion: (state, { payload: question }) => {
      const newQuestion = {
        _id: new Date().getTime().toString(),
        quiz: question.quiz,
        title: question.title || "New Question",
        type: question.type || "Multiple choice",
        points: question.points || 0,
        question: question.question || "",
        correctAnswer: question.correctAnswer || "",
        choices: question.choices || [""],
      };
      state.questions = [...state.questions, newQuestion];
    },
    // Delete a question by ID
    deleteQuestion: (state, { payload: questionId }) => {
      state.questions = state.questions.filter((q) => q._id !== questionId);
    },
    // Update an existing question
    updateQuestion: (state, { payload: question }) => {
      state.questions = state.questions.map((q) => (q._id === question._id ? question : q));
    },
  },
});

export const {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  editQuiz,
  addQuestion,
  deleteQuestion,
  updateQuestion,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;
