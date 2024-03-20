import axiosInstanceFactory from "./AxiosInstance";
import {AxiosPromise} from "axios";
import {
    CourseStatuses,
    ICourseDetails, IEditCourse, IEditCourseForTeacher,
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

const signUpToCourse = async (courseId: string):  Promise<AxiosPromise> => {
    return axios.post(`courses/${courseId}/sign-up`);
}

const editeCourseForTeacher = async (courseId: string, newCourseInfoForTeacher: IEditCourseForTeacher):  Promise<AxiosPromise<ICourseDetails>> => {
    return axios.put<ICourseDetails>(`courses/${courseId}/requirements-and-annotations`, newCourseInfoForTeacher);
}

const editeCourse = async (courseId: string, newCourseInfo: IEditCourse):  Promise<AxiosPromise<ICourseDetails>> => {
    return axios.put<ICourseDetails>(`courses/${courseId}`, newCourseInfo);
}

export const CourseDetailService = {
    courseDetails,
    addTeacherToCourse,
    CreateNotificationCourse,
    changeStatusCourse,
    deleteCourse,
    setMarks,
    setStatus,
    signUpToCourse,
    editeCourse,
    editeCourseForTeacher,
}