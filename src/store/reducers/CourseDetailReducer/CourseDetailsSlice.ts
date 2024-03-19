import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICourseDetails, IErrorResponse, IUser} from "../../../types/types";
import {courseDetailsReducers} from "./GetCourseDetailsThunkCreator";
import {addTeacherToCourseReducers} from "./AddTeacherToCourseThunkCreator";

export interface ICourseDetailsState {
    fetchingCourse: {
        loading: boolean;
        error: IErrorResponse | null;
        usersForAddTeacher: IUser [];
    }
    modalAddTeacher: {
        loading: boolean;
        error: IErrorResponse | null;
        isOpen: boolean;
    };
    course: ICourseDetails | null;
}

const initialState: ICourseDetailsState = {
    fetchingCourse: {
        loading: false,
        error: null,
        usersForAddTeacher: [],
    },
    modalAddTeacher: {
        loading: false,
        error: null,
        isOpen: false,
    },
    course: null,
}

export interface IAddTeacherModal {
    isOpen: boolean;
}

export const courseDetailsSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        setCourseCreationModal: (state, action: PayloadAction<IAddTeacherModal>) => {
            state.modalAddTeacher.isOpen = action.payload.isOpen;
        }
    },
    extraReducers: builder => {
        courseDetailsReducers(builder);
        addTeacherToCourseReducers(builder);
    },
});

export default courseDetailsSlice.reducer;
export const {actions} = courseDetailsSlice;