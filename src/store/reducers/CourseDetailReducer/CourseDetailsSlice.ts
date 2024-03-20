import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICourse, ICourseDetails, IErrorResponse, IUser, MarkType, StudentMarks} from "../../../types/types";
import {courseDetailsReducers} from "./GetCourseDetailsThunkCreator";
import {addTeacherToCourseReducers} from "./AddTeacherToCourseThunkCreator";
import {createNotificationReducers} from "./CreateNotificationThunkCreator";
import {changeCourseStatusReducers} from "./ChangeStatusThunkCreator";
import {deleteCourseReducers} from "./DeleteCourseThunkCreator";
import {editStudentMarkReducers} from "./EditStudentMarkThunkCreator";
import {editStudentStatusReducers} from "./EditStudentStatusThunkCreator";
import {signUpToCourseReducers} from "./SignUpToCourseThunkCreator";

export enum courseModalType {
    addTeacher,
    createNotification,
    changeCourseStatus,
    editStudentMidtermMark,
    editStudentFinalMark,
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
    editingStudentMark: {
        markType: MarkType | null;
        studentId: string;
        lastMark: StudentMarks | null;
    };
    editingStudentStatus: {
        loading: boolean;
        error: IErrorResponse | null;
    };
    signUpingToCourse: {
        loading: boolean;
        error: IErrorResponse | null;
    }
    course: ICourseDetails | null;
    myCourse: ICourse [];
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
    editingStudentMark: {
        markType: null,
        studentId: "",
        lastMark: null,
    },
    editingStudentStatus: {
        loading: false,
        error: null,
    },
    signUpingToCourse: {
        loading: false,
        error: null,
    },
    course: null,
    myCourse: [],
}

export interface IModal {
    modalTypeOpen: courseModalType | null;
}

export interface IEditMarkModal{
    markType: MarkType | null;
    studentId: string;
    currentMark: StudentMarks | null;
}

export const courseDetailsSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        setCourseModal: (state, action: PayloadAction<IModal>) => {
            state.modal.modalTypeOpen = action.payload.modalTypeOpen;
        },
        setEditMarkModal: (state, action: PayloadAction<IEditMarkModal>) => {
            state.modal.modalTypeOpen = action.payload.markType === MarkType.Final ?
                courseModalType.editStudentFinalMark : courseModalType.editStudentMidtermMark;

            if(action.payload.markType === null) state.modal.modalTypeOpen = null;

            state.editingStudentMark = {...action.payload, lastMark: action.payload.currentMark};
        }
    },
    extraReducers: builder => {
        courseDetailsReducers(builder);
        addTeacherToCourseReducers(builder);
        createNotificationReducers(builder);
        changeCourseStatusReducers(builder);
        deleteCourseReducers(builder);
        editStudentMarkReducers(builder);
        editStudentStatusReducers(builder);
        signUpToCourseReducers(builder);
    },
});

export default courseDetailsSlice.reducer;
export const {actions} = courseDetailsSlice;