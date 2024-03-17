import axiosInstanceFactory from "./AxiosInstance";
import {ICourse, IUser} from "../types/types";
import {AxiosPromise} from "axios";

const axios = axiosInstanceFactory();

const courses = async (groupId: string):  Promise<AxiosPromise<ICourse[]>> => {
    return axios.get<ICourse[]>(`groups/${groupId}`);
}

const usersForCourseCreation = async ():  Promise<AxiosPromise<IUser[]>> => {
    return axios.get<IUser[]>(`users`);
}

export const CoursesService = {
    courses,
    usersForCourseCreation,
}