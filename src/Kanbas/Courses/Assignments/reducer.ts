import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

const initialState = {
    assignments: assignments, // Initialize with the assignments from the database
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, { payload: assignment }) => {
            const newAssignment: any = {
                _id: new Date().getTime().toString(), // Assign a unique ID
                title: assignment.title,
                course: assignment.course,
                description: assignment.description,
                points: assignment.points,
                due_date: assignment.due_date,
                available_date: assignment.available_date,
            };
            state.assignments = [...state.assignments, newAssignment] as any;
        },
        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (a: any) => a._id !== assignmentId
            );
        },
        updateAssignment: (state, { payload: updatedAssignment }) => {
            state.assignments = state.assignments.map((a: any) =>
                a._id === updatedAssignment._id ? updatedAssignment : a
            );
        },
        editAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.map((a: any) =>
                a._id === assignmentId ? { ...a, editing: true } : a
            );
        },
    },
});

export const { addAssignment, deleteAssignment, updateAssignment, editAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
