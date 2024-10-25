import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enrollments as initialEnrollments } from "../Database";

const initialState = {
    enrollments: initialEnrollments,
};

const enrollmentSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        enrollCourse: (state, action: PayloadAction<{ user: string; course: string }>) => {
            const newEnrollment = {
                _id: new Date().getTime().toString(), // Generate a unique ID
                user: action.payload.user,
                course: action.payload.course,
            };
            state.enrollments.push(newEnrollment);
        },
        unenrollCourse: (state, action: PayloadAction<{ user: string; course: string }>) => {
            state.enrollments = state.enrollments.filter(
                (enrollment) => !(enrollment.user === action.payload.user && enrollment.course === action.payload.course)
            );
        },
    },
});

export const { enrollCourse, unenrollCourse } = enrollmentSlice.actions;

export default enrollmentSlice.reducer;
