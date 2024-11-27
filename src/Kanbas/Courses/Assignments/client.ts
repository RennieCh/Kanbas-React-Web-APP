import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;
const COURSE_ASSIGNMENTS_API = `${REMOTE_SERVER}/api/courses`; // For fetching assignments by course

// Fetch assignments for a specific course
export const fetchAssignmentsForCourse = async (courseId: string) => {
    try {
        const response = await axios.get(`${COURSE_ASSIGNMENTS_API}/${courseId}/assignments`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch assignments for course:", error);
        throw error;
    }
};

// Create a new assignment
export const createAssignment = async (assignment: any) => {
    try {
        const response = await axios.post(ASSIGNMENTS_API, assignment);
        return response.data;
    } catch (error) {
        console.error("Failed to create assignment:", error);
        throw error;
    }
};

// Update an existing assignment
export const updateAssignment = async (assignmentId: string, assignmentUpdates: any) => {
    try {
        const response = await axios.put(`${ASSIGNMENTS_API}/${assignmentId}`, assignmentUpdates);
        return response.data;
    } catch (error) {
        console.error("Failed to update assignment:", error);
        throw error;
    }
};

// Delete an existing assignment
export const deleteAssignment = async (assignmentId: string) => {
    try {
        await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
    } catch (error) {
        console.error("Failed to delete assignment:", error);
        throw error;
    }
};
