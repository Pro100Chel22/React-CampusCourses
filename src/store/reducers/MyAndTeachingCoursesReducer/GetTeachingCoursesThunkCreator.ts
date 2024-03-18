import {ICourse, IErrorResponse} from "../../../types/types";
import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {CoursesService} from "../../../requests/CoursesService";
import {AxiosError} from "axios";
import {IMyAndTeachingCoursesSliceState} from "./MyAndTeachingCoursesSlice";

interface IGetTeachingCoursesResponse {
    courses: ICourse[];
}

export const teachingCoursesReducers = (builder: ActionReducerMapBuilder<IMyAndTeachingCoursesSliceState>) => {
    builder.addCase(getTeachingCourses.pending.type, (state) => {
        state.fetchingTeachingCourses.loading = true;
        state.fetchingTeachingCourses.error = null;
    });
    builder.addCase(getTeachingCourses.fulfilled.type, (state, action: PayloadAction<IGetTeachingCoursesResponse>) => {
        state.fetchingTeachingCourses.loading = false;
        state.fetchingTeachingCourses.error = null;
        state.fetchingTeachingCourses.courses = action.payload.courses;
    });
    builder.addCase(getTeachingCourses.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.fetchingTeachingCourses.loading = false;
        state.fetchingTeachingCourses.error = action.payload;
    });
}

export const getTeachingCourses = createAsyncThunk(
    'courses/getTeachingCourses',
    async (_, thunkAPI) => {
        try {
            const responseCourses = await CoursesService.teachingCourses();
            console.log({courses: responseCourses.data});

            return {courses: responseCourses.data};
        } catch (error) {
            const err = error as AxiosError;
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: ""});
        }
    }
);