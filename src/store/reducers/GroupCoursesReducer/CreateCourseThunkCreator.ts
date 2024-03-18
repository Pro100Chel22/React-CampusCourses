import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {ICourse, ICreateCourse, IErrorResponse} from "../../../types/types";
import {ICoursesState} from "./GroupCoursesSlice";
import {AxiosError} from "axios";
import {CoursesService} from "../../../requests/CoursesService";
import {customNotifications} from "../../../notifications/Notifications";

interface ICreateCoursesResponse {
    courses: ICourse [];
}

interface ICreateCoursesRequest {
    createCourseForm: ICreateCourse;
    groupId: string;
}

export const createCoursesReducers = (builder: ActionReducerMapBuilder<ICoursesState>) => {
    builder.addCase(createCourse.pending.type, (state) => {
        state.modalCourseCreation.loading = true;
        state.modalCourseCreation.error = null;

        customNotifications.loading({massage: 'Создание курса...', key: 'createCourse'});
    });
    builder.addCase(createCourse.fulfilled.type, (state, action: PayloadAction<ICreateCoursesResponse>) => {
        state.modalCourseCreation.loading = false;
        state.modalCourseCreation.error = null;
        state.modalCourseCreation.isOpen = false;
        state.courses = action.payload.courses;

        customNotifications.success({massage: 'Успешное создание курса!', key: 'createCourse'});
    });
    builder.addCase(createCourse.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.modalCourseCreation.loading = false;
        state.modalCourseCreation.error = action.payload;

        customNotifications.error({massage: 'Произошла неизвестная ошибка!', key: 'createCourse'});
    });
}

export const createCourse = createAsyncThunk(
    'groups/createCourse',
    async (createCourse: ICreateCoursesRequest, thunkAPI) => {
        try {
            const responseCourses = await CoursesService.createCourse(createCourse.createCourseForm, createCourse.groupId);
            console.log({courses: responseCourses.data});
            return {courses: responseCourses.data};
        } catch (error) {
            const err = error as AxiosError;
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: ""});
        }
    }
);