import axiosInstanceFactory from "./AxiosInstance";
import {AxiosPromise} from "axios";
import {
    CourseStatuses,
    ICourseDetails,
    INotification,
    IStudentMark,
    StudentStatuses
} from "../types/types";

const axios = axiosInstanceFactory();

const courseDetails = async (courseId: string):  Promise<AxiosPromise<ICourseDetails>> => {
    return axios.get<ICourseDetails>(`courses/${courseId}/details`);
}

const addTeacherToCourse = async (courseId: string, userId: string):  Promise<AxiosPromise<ICourseDetails>> => {
    return axios.post<ICourseDetails>(`courses/${courseId}/teachers`, {
        userId
    });
}

const CreateNotificationCourse = async (courseId: string, notification: INotification):  Promise<AxiosPromise<ICourseDetails>> => {
    return axios.post<ICourseDetails>(`courses/${courseId}/notifications`, notification);
}

const changeStatusCourse = async (courseId: string, status: CourseStatuses):  Promise<AxiosPromise<ICourseDetails>> => {
    return axios.post<ICourseDetails>(`courses/${courseId}/status`, {
        status: status,
    });
}

const deleteCourse = async (courseId: string):  Promise<AxiosPromise> => {
    return axios.delete(`courses/${courseId}`);
}

const setMarks = async (courseId: string, studentId: string, mark: IStudentMark):  Promise<AxiosPromise<ICourseDetails>> => {
    return axios.post<ICourseDetails>(`courses/${courseId}/marks/${studentId}`, mark);
}

const setStatus = async (courseId: string, studentId: string, status: StudentStatuses):  Promise<AxiosPromise<ICourseDetails>> => {
    return axios.post<ICourseDetails>(`courses/${courseId}/student-status/${studentId}`, {
        status: status,
    });
}

export const CourseDetailService = {
    courseDetails,
    addTeacherToCourse,
    CreateNotificationCourse,
    changeStatusCourse,
    deleteCourse,
    setMarks,
    setStatus,
}