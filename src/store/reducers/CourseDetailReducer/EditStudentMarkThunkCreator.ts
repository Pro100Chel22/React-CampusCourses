import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {ICourseDetails, IErrorResponse, IStudentMark} from "../../../types/types";
import {AxiosError} from "axios";
import {CourseDetailService} from "../../../requests/CourseDetailService";
import {ICourseDetailsState} from "./CourseDetailsSlice";
import {customNotifications} from "../../../notifications/Notifications";

export const editStudentMarkReducers = (builder: ActionReducerMapBuilder<ICourseDetailsState>) => {
    builder.addCase(editStudentMark.pending.type, (state) => {
        state.modal.loading = true;
        state.modal.error = null;

        customNotifications.loading({massage: 'Изменение оценки студента...', key: 'editMark'});
    });
    builder.addCase(editStudentMark.fulfilled.type, (state, action: PayloadAction<ICourseDetails>) => {
        state.modal.loading = false;
        state.modal.error = null;
        state.modal.modalTypeOpen = null;
        state.course = action.payload;

        customNotifications.success({massage: 'Оценка успешно изменена!', key: 'editMark'});
    });
    builder.addCase(editStudentMark.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.modal.loading = false;
        state.modal.error = action.payload;

        customNotifications.success({massage: 'Произошла неизвестная ошибка!', key: 'editMark'});
    });
}

export interface IEditStudentMark{
    courseId: string;
    studentId: string;
    mark: IStudentMark;
}

export const editStudentMark = createAsyncThunk(
    'courseDetails/editStudentMark',
    async (request: IEditStudentMark, thunkAPI) => {
        try {
            const responseCourse = await CourseDetailService.setMarks(request.courseId, request.studentId, request.mark);
            console.log(responseCourse.data);

            return responseCourse.data;
        } catch (error) {
            const err = error as AxiosError;
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: ""});
        }
    }
);