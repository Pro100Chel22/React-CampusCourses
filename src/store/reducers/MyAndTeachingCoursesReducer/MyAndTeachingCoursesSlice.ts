import {createSlice} from "@reduxjs/toolkit";
import {ICourse, IErrorResponse} from "../../../types/types";
import {myCoursesReducers} from "./GetMyCoursesThunkCreator";
import {teachingCoursesReducers} from "./GetTeachingCoursesThunkCreator";

export interface IMyAndTeachingCoursesSliceState {
    fetchingMyCourses: {
        loading: boolean;
        error: IErrorResponse | null;
        courses: ICourse[];
    }
    fetchingTeachingCourses: {
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
    fetchingTeachingCourses: {
        loading: false,
        error:  null,
        courses: [],
    }
}

export const myAndTeachingCoursesSlice = createSlice({
    name: "myAndTeachingCourses",
    initialState,
    reducers: {},
    extraReducers: builder => {
        myCoursesReducers(builder);
        teachingCoursesReducers(builder);
    },
});

export default myAndTeachingCoursesSlice.reducer;
export const {actions} = myAndTeachingCoursesSlice;