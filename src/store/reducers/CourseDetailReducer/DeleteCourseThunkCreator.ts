import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {ICourseDetailsState} from "./CourseDetailsSlice";
import {CourseDetailService} from "../../../requests/CourseDetailService";
import {AxiosError} from "axios";
import {customNotifications} from "../../../notifications/Notifications";
import {IErrorResponse} from "../../../types/types";

export interface IDeleteCourse {
    callbackRedirect: any;
    courseId: string;
}

export const deleteCourseReducers = (builder: ActionReducerMapBuilder<ICourseDetailsState>) => {
    builder.addCase(deleteCourseDetail.pending.type, (state) => {
        state.modal.loading = true;
        state.modal.error = null;

        customNotifications.loading({massage: 'Удаление курса...', key: 'createNotification'});
    });
    builder.addCase(deleteCourseDetail.fulfilled.type, (state) => {
        state.modal.loading = false;
        state.modal.error = null;
        state.modal.modalTypeOpen = null;
        state.course = null;

        customNotifications.success({massage: 'Курс успешно удален!', key: 'createNotification'});
    });
    builder.addCase(deleteCourseDetail.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.modal.loading = false;
        state.modal.error = action.payload;

        let message = "Произошла неизвестная ошибка!";
        customNotifications.error({massage: message, key: 'createNotification'});
    });
}

export const deleteCourseDetail = createAsyncThunk(
    'courseDetails/deleteCourse',
    async (request: IDeleteCourse, thunkAPI) => {
        try {
            const responseCourse = await CourseDetailService.deleteCourse(request.courseId);
            console.log(responseCourse.data);
            request.callbackRedirect();

            return;
        } catch (error) {
            const err = error as AxiosError;
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: ""});
        }
    }
);