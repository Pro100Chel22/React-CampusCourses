import {createSlice} from "@reduxjs/toolkit";
import {ICourse, IErrorResponse} from "../../../types/types";
import {myCoursesReducers} from "./GetMyCoursesThunkCreator";

export interface IMyAndTeachingCoursesSliceState {
    fetchingMyCourses: {
        loading: boolean;
        error: IErrorResponse | null;
        courses: ICourse[];
    }
}

const initialState: IMyAndTeachingCoursesSliceState = {
    fetchingMyCourses: {
        loading: false,
        error:  null,
        courses: [],
    },
}

export const myAndTeachingCoursesSlice = createSlice({
    name: "myAndTeachingCourses",
    initialState,
    reducers: {},
    extraReducers: builder => {
        myCoursesReducers(builder);
    },
});

export default myAndTeachingCoursesSlice.reducer;
export const {actions} = myAndTeachingCoursesSlice;