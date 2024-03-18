import axiosInstanceFactory from "./AxiosInstance";
import {ICourse, ICreateCourse, IUser} from "../types/types";
import {AxiosPromise} from "axios";

const axios = axiosInstanceFactory();

const courses = async (groupId: string):  Promise<AxiosPromise<ICourse[]>> => {
    return axios.get<ICourse[]>(`groups/${groupId}`);
}

const createCourse = async (createCourseForm: ICreateCourse, groupId: string):  Promise<AxiosPromise<ICourse[]>> => {
    return axios.post<ICourse[]>(`groups/${groupId}`, createCourseForm);
}

const usersForCourseCreation = async ():  Promise<AxiosPromise<IUser[]>> => {
    return axios.get<IUser[]>(`users`);
}

export const CoursesService = {
    courses,
    createCourse,
    usersForCourseCreation,
}