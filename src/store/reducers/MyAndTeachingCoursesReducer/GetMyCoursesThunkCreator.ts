import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {ICourse, IErrorResponse} from "../../../types/types";
import {IMyAndTeachingCoursesSliceState} from "./MyAndTeachingCoursesSlice";
import {AxiosError} from "axios";
import {CoursesService} from "../../../requests/CoursesService";

interface IGetMyCoursesResponse {
    courses: ICourse[];
}

export const myCoursesReducers = (builder: ActionReducerMapBuilder<IMyAndTeachingCoursesSliceState>) => {
    builder.addCase(getMyCourses.pending.type, (state) => {
        state.fetchingMyCourses.loading = true;
        state.fetchingMyCourses.error = null;
    });
    builder.addCase(getMyCourses.fulfilled.type, (state, action: PayloadAction<IGetMyCoursesResponse>) => {
        state.fetchingMyCourses.loading = false;
        state.fetchingMyCourses.error = null;
        state.fetchingMyCourses.courses = action.payload.courses;
    });
    builder.addCase(getMyCourses.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.fetchingMyCourses.loading = false;
        state.fetchingMyCourses.error = action.payload;
    });
}

export const getMyCourses = createAsyncThunk(
    'courses/getMyCourses',
    async (_, thunkAPI) => {
        try {
            const responseCourses = await CoursesService.myCourses();
            console.log({courses: responseCourses.data});

            return {courses: responseCourses.data};
        } catch (error) {
            const err = error as AxiosError;
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: ""});
        }
    }
);