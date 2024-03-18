import axiosInstanceFactory from "./AxiosInstance";
import {AxiosPromise} from "axios";
import {ICourseDetails} from "../types/types";

const axios = axiosInstanceFactory();

const courseDetails = async (courseId: string):  Promise<AxiosPromise<ICourseDetails[]>> => {
    return axios.get<ICourseDetails[]>(`courses/${courseId}/details`);
}

export const CourseDetailService = {
    courseDetails,
}