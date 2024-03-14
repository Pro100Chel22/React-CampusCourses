import {ICourse, IErrorResponse} from "../../../types/types";
import {createSlice} from "@reduxjs/toolkit";
import {coursesReducers} from "./GetCoursesThunkCreator";

export interface ICoursesState {
    fetchingCourses: {
        loading: boolean;
        error: IErrorResponse | null;
    }
    groupName: string | null;
    courses: ICourse[];
}

const initialState: ICoursesState = {
    fetchingCourses: {
        loading: false,
        error:  null,
    },
    groupName: null,
    courses: [],
}

export const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: builder => {
        coursesReducers(builder);
    },
});

export default coursesSlice.reducer;
export const {actions, reducer} = coursesSlice;