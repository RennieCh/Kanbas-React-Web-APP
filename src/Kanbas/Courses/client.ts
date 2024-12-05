import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const USERS_API = `${REMOTE_SERVER}/api/users`;
const ENROLLMENT_API = `${REMOTE_SERVER}/api/enrollments`;

export const fetchAllCourses = async () => {
    try {
        const { data } = await axiosWithCredentials.get(COURSES_API);
        console.log("Courses fetched from API:", data); // Debug log
        return data;
    } catch (error) {
        console.error("Error fetching all courses:", error);
        return [];
    }
};

export const fetchAllEnrollments = async () => {
    const { data } = await axiosWithCredentials.get(ENROLLMENT_API);
    return data;
}

export const deleteCourse = async (courseId: string): Promise<{ message: string }> => {
    try {
        const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}`);
        // Ensure `data` contains the message and return it
        return { message: data.message || "Course deleted successfully." };
    } catch (error: any) {
        console.error("Error deleting course:", error.response?.data || error.message);
        throw new Error(error.response?.data?.error || error.message || "Failed to delete course.");
    }
};


export const updateCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
    return data;
};

export const createCourse = async (course: any) => {
    try {
        const { data } = await axiosWithCredentials.post(COURSES_API, course);
        return data;
    } catch (error) {
        console.error("Failed to create course:", error);
        throw error;
    }
};

export const findModulesForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials
        .get(`${COURSES_API}/${courseId}/modules`);
    return response.data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
    const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/modules`,
        module);
    return response.data;
};

export const createAssignment = async (courseId: string, assignment: any) => {
    const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/assignments`, assignment);
    return response.data;
};

export const fetchAssignments = async (courseId: string) => {
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/assignments`);
    return response.data;
};

// Enroll a user in a course
export const enrollUser = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}/enroll`);
    return response.data;
};

// Unenroll a user from a course
export const unenrollUser = async (userId: string, courseId: string) => {
    await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}/unenroll`);
};

// Find users enrolled in a course
export const findUsersForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/users`);
    return response.data;
};