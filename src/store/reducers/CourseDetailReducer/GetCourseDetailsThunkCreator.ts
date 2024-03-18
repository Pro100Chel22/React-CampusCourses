import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {ICourseDetailsState} from "./CourseDetailsSlice";
import {ICourseDetails, IErrorResponse} from "../../../types/types";
import {CourseDetailService} from "../../../requests/CourseDetailService";
import {AxiosError} from "axios";

export const courseDetailsReducers = (builder: ActionReducerMapBuilder<ICourseDetailsState>) => {
    builder.addCase(getCourseDetails.pending.type, (state) => {
        state.fetchingCourse.loading = true;
        state.fetchingCourse.error = null;
    });
    builder.addCase(getCourseDetails.fulfilled.type, (state, action: PayloadAction<ICourseDetails>) => {
        state.fetchingCourse.loading = false;
        state.fetchingCourse.error = null;
        state.course = action.payload;
    });
    builder.addCase(getCourseDetails.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.fetchingCourse.loading = false;
        state.fetchingCourse.error = action.payload;
    });
}

export const getCourseDetails = createAsyncThunk(
    'courseDetails/getCourseDetails',
    async (courseId: string, thunkAPI) => {
        try {
            const responseCourses = await CourseDetailService.courseDetails(courseId);
            console.log(responseCourses.data);

            return responseCourses.data;
        } catch (error) {
            const err = error as AxiosError;
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: ""});
        }
    }
);