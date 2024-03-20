import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {ICourseDetailsState} from "./CourseDetailsSlice";
import {ICourseDetails, IErrorResponse, INotification} from "../../../types/types";
import {customNotifications} from "../../../notifications/Notifications";
import {CourseDetailService} from "../../../requests/CourseDetailService";
import {AxiosError} from "axios";

export interface ICreateNotificationCourse {
    courseId: string;
    notification: INotification;
}

export const createNotificationReducers = (builder: ActionReducerMapBuilder<ICourseDetailsState>) => {
    builder.addCase(createNotificationCourse.pending.type, (state) => {
        state.modal.loading = true;
        state.modal.error = null;

        customNotifications.loading({massage: 'Создание уведомления...', key: 'createNotification'});
    });
    builder.addCase(createNotificationCourse.fulfilled.type, (state, action: PayloadAction<ICourseDetails>) => {
        state.modal.loading = false;
        state.modal.error = null;
        state.modal.modalTypeOpen = null;
        state.course = action.payload;

        customNotifications.success({massage: 'Уведомлене успешно создано!', key: 'createNotification'});
    });
    builder.addCase(createNotificationCourse.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {

        let message = "Произошла неизвестная ошибка!";
        customNotifications.error({massage: message, key: 'createNotification'});
    });
}

export const createNotificationCourse = createAsyncThunk(
    'courseDetails/createNotification',
    async (request: ICreateNotificationCourse, thunkAPI) => {
        try {
            const responseCourse = await CourseDetailService.CreateNotificationCourse(request.courseId, request.notification);
            console.log(responseCourse.data);

            return responseCourse.data;
        } catch (error) {
            const err = error as AxiosError;
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: ""});
        }
    }
);