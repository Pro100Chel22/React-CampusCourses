import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {ICourseDetails, IErrorResponse, StudentStatuses} from "../../../types/types";
import {ICourseDetailsState} from "./CourseDetailsSlice";
import {CourseDetailService} from "../../../requests/CourseDetailService";
import {AxiosError} from "axios";
import {customNotifications} from "../../../notifications/Notifications";

export const editStudentStatusReducers = (builder: ActionReducerMapBuilder<ICourseDetailsState>) => {
    builder.addCase(editStudentStatus.pending.type, (state) => {
        state.editingStudentStatus.loading = true;
        state.editingStudentStatus.error = null;

        customNotifications.loading({massage: 'Изменение статуса студента...', key: 'editStatus'});
    });
    builder.addCase(editStudentStatus.fulfilled.type, (state, action: PayloadAction<ICourseDetails>) => {
        state.editingStudentStatus.loading = false;
        state.editingStudentStatus.error = null;
        state.course = action.payload;

        customNotifications.success({massage: 'Статус успешно изменен!', key: 'editStatus'});
    });
    builder.addCase(editStudentStatus.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.editingStudentStatus.loading = false;
        state.editingStudentStatus.error = action.payload;

        let message = "Произошла неизвестная ошибка!";
        if(action.payload.massage === "Maximum student count reached.") {
            message = "Все места в этом курсе уже заняты!";
        }
        console.log(action.payload.massage)

        customNotifications.error({massage: message, key: 'editStatus'});
    });
}

export interface IEditStudentStatus{
    courseId: string;
    studentId: string;
    status: StudentStatuses;
}

export const editStudentStatus = createAsyncThunk(
    'courseDetails/editStudentStatus',
    async (request: IEditStudentStatus, thunkAPI) => {
        try {
            const responseCourse = await CourseDetailService.setStatus(request.courseId, request.studentId, request.status);
            console.log(responseCourse.data);

            return responseCourse.data;
        } catch (error) {
            const err = error as AxiosError;
            console.log(err);
            // @ts-ignore
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: err.response?.data?.message});
        }
    }
);