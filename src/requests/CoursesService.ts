import axiosInstanceFactory from "./AxiosInstance";
import {ICourse} from "../types/types";
import {AxiosPromise} from "axios";

const axios = axiosInstanceFactory();

const courses = async (groupId: string):  Promise<AxiosPromise<ICourse[]>> => {
    return axios.get<ICourse[]>(`groups/${groupId}`);
}

const myCourses = async ():  Promise<AxiosPromise<ICourse[]>> => {
    return axios.get<ICourse[]>(`courses/my`);
}

export const CoursesService = {
    courses,
    myCourses
}