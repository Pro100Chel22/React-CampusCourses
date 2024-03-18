import {createSlice} from "@reduxjs/toolkit";
import {ICourseDetails, IErrorResponse} from "../../../types/types";
import {courseDetailsReducers} from "./GetCourseDetailsThunkCreator";

export interface ICourseDetailsState {
    fetchingCourse: {
        loading: boolean;
        error: IErrorResponse | null;
    }
    course: ICourseDetails | null;
}

const initialState: ICourseDetailsState = {
    fetchingCourse: {
        loading: false,
        error: null,
    },
    course: null,
}

export const courseDetailsSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: builder => {
        courseDetailsReducers(builder);
    },
});

export default courseDetailsSlice.reducer;
export const {actions} = courseDetailsSlice;