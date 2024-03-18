import {createSlice} from "@reduxjs/toolkit";


export interface ICourseDetailState {

}

const initialState: ICourseDetailState = {

}

export const courseDetailSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: builder => {

    },
});

export default courseDetailSlice.reducer;
export const {actions} = courseDetailSlice;