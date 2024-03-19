import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICourseDetails, IErrorResponse, IUser} from "../../../types/types";
import {courseDetailsReducers} from "./GetCourseDetailsThunkCreator";
import {addTeacherToCourseReducers} from "./AddTeacherToCourseThunkCreator";
import {createNotificationReducers} from "./CreateNotificationThunkCreator";
import {changeCourseStatusReducers} from "./ChangeStatusThunkCreator";
import {deleteCourseReducers} from "./DeleteCourseThunkCreator";

export enum courseModalType {
    addTeacher,
    createNotification,
    changeCourseStatus,
}

export interface ICourseDetailsState {
    fetchingCourse: {
        loading: boolean;
        error: IErrorResponse | null;
        usersForAddTeacher: IUser [];
    }
    modal: {
        loading: boolean;
        error: IErrorResponse | null;
        modalTypeOpen: courseModalType | null;
    };
    course: ICourseDetails | null;
}

const initialState: ICourseDetailsState = {
    fetchingCourse: {
        loading: false,
        error: null,
        usersForAddTeacher: [],
    },
    modal: {
        loading: false,
        error: null,
        modalTypeOpen: null,
    },
    course: null,
}

export interface IAddTeacherModal {
    modalTypeOpen: courseModalType | null;
}

export const courseDetailsSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        setCourseCreationModal: (state, action: PayloadAction<IAddTeacherModal>) => {
            state.modal.modalTypeOpen = action.payload.modalTypeOpen;
        }
    },
    extraReducers: builder => {
        courseDetailsReducers(builder);
        addTeacherToCourseReducers(builder);
        createNotificationReducers(builder);
        changeCourseStatusReducers(builder);
        deleteCourseReducers(builder);
    },
});

export default courseDetailsSlice.reducer;
export const {actions} = courseDetailsSlice;