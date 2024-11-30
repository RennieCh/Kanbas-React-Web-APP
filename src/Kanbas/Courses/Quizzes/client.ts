import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;
const ANSWERS_API = `${REMOTE_SERVER}/api/answers`;

// Quizzes Client Functions

// Fetch all quizzes for a specific course
export const fetchQuizzesForCourse = async (courseId: string) => {
  try {
    const response = await axios.get(`${REMOTE_SERVER}/api/courses/${courseId}/quizzes`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch quizzes for course:", error);
    throw error;
  }
};

// Fetch a quiz by its ID
export const fetchQuizById = async (quizId: string) => {
  try {
    const response = await axios.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch quiz by ID:", error);
    throw error;
  }
};

// Create a new quiz
export const createQuiz = async (quiz: any) => {
  try {
    const response = await axios.post(QUIZZES_API, quiz);
    return response.data;
  } catch (error) {
    console.error("Failed to create quiz:", error);
    throw error;
  }
};

// Update an existing quiz
export const updateQuiz = async (quizId: string, quizUpdates: any) => {
  try {
    const response = await axios.put(`${QUIZZES_API}/${quizId}`, quizUpdates);
    return response.data;
  } catch (error) {
    console.error("Failed to update quiz:", error);
    throw error;
  }
};

// Delete an existing quiz
export const deleteQuiz = async (quizId: string) => {
  try {
    await axios.delete(`${QUIZZES_API}/${quizId}`);
  } catch (error) {
    console.error("Failed to delete quiz:", error);
    throw error;
  }
};

// Questions Client Functions

// Fetch all questions for a specific quiz
export const fetchQuestionsForQuiz = async (quizId: string) => {
  try {
    const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch questions for quiz:", error);
    throw error;
  }
};

// Fetch a question by its ID
export const fetchQuestionById = async (questionId: string) => {
  try {
    const response = await axios.get(`${QUESTIONS_API}/${questionId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch question:", error);
    throw error;
  }
};

// Create a new question
export const createQuestion = async (question: any) => {
  try {
    const response = await axios.post(QUESTIONS_API, question);
    return response.data;
  } catch (error) {
    console.error("Failed to create question:", error);
    throw error;
  }
};

// Update an existing question
export const updateQuestion = async (questionId: string, questionUpdates: any) => {
  try {
    const response = await axios.put(`${QUESTIONS_API}/${questionId}`, questionUpdates);
    return response.data;
  } catch (error) {
    console.error("Failed to update question:", error);
    throw error;
  }
};

// Delete an existing question
export const deleteQuestion = async (questionId: string) => {
  try {
    await axios.delete(`${QUESTIONS_API}/${questionId}`);
  } catch (error) {
    console.error("Failed to delete question:", error);
    throw error;
  }
};

// Answers Client Functions

// Fetch all answers for a specific quiz
export const fetchAnswersForQuiz = async (quizId: string) => {
  try {
    const response = await axios.get(`${QUIZZES_API}/${quizId}/answers`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch answers for quiz:", error);
    throw error;
  }
};

// Fetch all answers for a specific user
export const fetchAnswersForUser = async (userId: string) => {
  try {
    const response = await axios.get(`${REMOTE_SERVER}/api/users/${userId}/answers`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch answers for user:", error);
    throw error;
  }
};

// Create a new answer
export const createAnswer = async (answer: any) => {
  try {
    const response = await axios.post(ANSWERS_API, answer);
    return response.data;
  } catch (error) {
    console.error("Failed to create answer:", error);
    throw error;
  }
};

// Update an existing answer
export const updateAnswer = async (answerId: string, answerUpdates: any) => {
  try {
    const response = await axios.put(`${ANSWERS_API}/${answerId}`, answerUpdates);
    return response.data;
  } catch (error) {
    console.error("Failed to update answer:", error);
    throw error;
  }
};

// Delete an existing answer
export const deleteAnswer = async (answerId: string) => {
  try {
    await axios.delete(`${ANSWERS_API}/${answerId}`);
  } catch (error) {
    console.error("Failed to delete answer:", error);
    throw error;
  }
};
