import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const updateAssignment = async (assignmentId: string, assignmentUpdates: any) => {
    const response = await axios.put(`${ASSIGNMENTS_API}/${assignmentId}`, assignmentUpdates);
    return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
    await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
};
