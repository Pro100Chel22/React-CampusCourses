import axiosInstanceFactory from "./AxiosInstance";
import {AxiosPromise} from "axios";
import {CourseStatuses, ICourseDetails, INotification} from "../types/types";

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
export const CourseDetailService = {
    courseDetails,
    addTeacherToCourse,
    CreateNotificationCourse,
    changeStatusCourse,
    deleteCourse,
}