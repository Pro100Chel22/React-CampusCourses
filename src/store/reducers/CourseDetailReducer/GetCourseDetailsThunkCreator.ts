import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {ICourseDetailsState} from "./CourseDetailsSlice";
import {ICourse, ICourseDetails, IErrorResponse, IUser} from "../../../types/types";
import {CourseDetailService} from "../../../requests/CourseDetailService";
import {AxiosError} from "axios";
import {CoursesService} from "../../../requests/CoursesService";

export const courseDetailsReducers = (builder: ActionReducerMapBuilder<ICourseDetailsState>) => {
    builder.addCase(getCourseDetails.pending.type, (state) => {
        state.fetchingCourse.loading = true;
        state.fetchingCourse.error = null;
    });
    builder.addCase(getCourseDetails.fulfilled.type, (state, action: PayloadAction<IGetCourseDetailsResponse>) => {
        state.fetchingCourse.loading = false;
        state.fetchingCourse.error = null;
        state.course = action.payload.course;
        state.myCourse = action.payload.myCourses;
        state.fetchingCourse.usersForAddTeacher = action.payload.users;
    });
    builder.addCase(getCourseDetails.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.fetchingCourse.loading = false;
        state.fetchingCourse.error = action.payload;
    });
}

export interface IGetCourseDetails {
    courseId: string;
    loadUsers: boolean;
}

export interface IGetCourseDetailsResponse {
    course: ICourseDetails;
    myCourses: ICourse [];
    users: IUser[];
}

export const getCourseDetails = createAsyncThunk(
    'courseDetails/getCourseDetails',
    async (request: IGetCourseDetails, thunkAPI) => {
        try {
            const responseCourse = await CourseDetailService.courseDetails(request.courseId);
            const responseMyCourses = await CoursesService.myCourses();

            let responseUsers: IUser[] = [];
            if(request.loadUsers) {
                responseUsers = (await CoursesService.usersForCourseCreation()).data;
            }
            console.log({course: responseCourse.data, myCourses: responseMyCourses.data, users: responseUsers});

            return {course: responseCourse.data, myCourses: responseMyCourses.data, users: responseUsers};
        } catch (error) {
            const err = error as AxiosError;
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: ""});
        }
    }
);