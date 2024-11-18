import { createSlice } from "@reduxjs/toolkit";
import { quizzes as quizzesDB, questions as questionsDB } from "../../Database";

// Define the Answer type
interface Answer {
  _id: string;
  userID: string;
  quizID: string;
  courseID: string;
  score: number;
  answers: string[];
  attemptTaken: number;
  startTime: string;
  endTime: string | null;
}

interface Question {
  _id: string;
  quiz: string;
  title: string;
  type: string;
  points: number;
  question: string;
  correctAnswer: string;
  choices: string[];
};

interface Quiz {
  _id: string,
  course: string,
  title: string,
  type: string,
  points: number,
  assignmentGroup: string,
  cloneable: boolean,
  published: boolean,
  description: string,
  shuffleAnswer: boolean,
  timeLimit: string,
  allowMultiAttempts: boolean,
  numberOfAttempts: number,
  showCorrectAnswers: string,
  oneQuestionaTime: boolean,
  accessCode: string,
  webCam: boolean,
  lockQuestionsAfterAnswering: boolean,
  availableFromDate: string,
  dueDate: string,
  availableUntilDate: string
}

// Define the initial state type
interface InitialState {
  quizzes: Quiz[];
  questions: Question[];
  answers: Answer[];
}

// Initialize the initial state with explicit types
const initialState: InitialState = {
  quizzes: quizzesDB,
  questions: questionsDB,
  answers: [],
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

      // Update the quiz points
      const quizId = question.quiz;
      const updatedQuestions = state.questions.filter((q) => q.quiz === quizId);
      const updatedQuizPoints = updatedQuestions.reduce((sum, q) => sum + q.points, 0);

      state.quizzes = state.quizzes.map((quiz) =>
        quiz._id === quizId ? { ...quiz, points: updatedQuizPoints } : quiz
      );
    },
    // Delete a question by ID
    deleteQuestion: (state, { payload: questionId }) => {
      const questionToDelete = state.questions.find((q) => q._id === questionId);
      if (!questionToDelete) return;

      const quizId = questionToDelete.quiz;
      state.questions = state.questions.filter((q) => q._id !== questionId);

      // Update the quiz points after deleting the question
      const updatedQuestions = state.questions.filter((q) => q.quiz === quizId);
      const updatedQuizPoints = updatedQuestions.reduce((sum, q) => sum + q.points, 0);

      state.quizzes = state.quizzes.map((quiz) =>
        quiz._id === quizId ? { ...quiz, points: updatedQuizPoints } : quiz
      );
    },
    // Update an existing question
    updateQuestion: (state, { payload: question }) => {
      state.questions = state.questions.map((q) => (q._id === question._id ? question : q));

      // Update the quiz points after updating the question
      const quizId = question.quiz;
      const updatedQuestions = state.questions.filter((q) => q.quiz === quizId);
      const updatedQuizPoints = updatedQuestions.reduce((sum, q) => sum + q.points, 0);

      state.quizzes = state.quizzes.map((quiz) =>
        quiz._id === quizId ? { ...quiz, points: updatedQuizPoints } : quiz
      );
    },
    // Set a new answer (replace all answers with the new list)
    setAnswer: (state, { payload: answers }) => {
      state.answers = answers;
    },
    // Add a new answer
    addAnswer: (state, { payload: answer }) => {
      const newAnswer = {
        _id: new Date().getTime().toString(),
        userID: answer.userID,
        quizID: answer.quizID,
        courseID: answer.courseID,
        score: answer.score || 0,
        answers: answer.answers || [],
        attemptTaken: answer.attemptTaken || 1,
        startTime: answer.startTime || new Date().toISOString(),
        endTime: answer.endTime || null,
      };
      state.answers = [...state.answers, newAnswer];
    },
    // Update an existing answer
    updateAnswer: (state, { payload: answer }) => {
      state.answers = state.answers.map((a) => (a._id === answer._id ? answer : a));
    },
    // Delete an answer by ID
    deleteAnswer: (state, { payload: answerId }) => {
      state.answers = state.answers.filter((a) => a._id !== answerId);
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
  setAnswer,
  addAnswer,
  updateAnswer,
  deleteAnswer,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;
