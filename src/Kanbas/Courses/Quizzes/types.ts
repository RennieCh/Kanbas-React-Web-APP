export type Question = {
    _id: string;
    quiz: string;
    title: string;
    type: string;
    points: number;
    question: string;
    correctAnswer: string | boolean | string[];
    choices: string[] | boolean[];
};
