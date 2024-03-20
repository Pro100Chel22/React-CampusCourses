import {CourseStatuses, ICourseDetails, IErrorResponse} from "../../../types/types";
import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {ICourseDetailsState} from "./CourseDetailsSlice";
import {customNotifications} from "../../../notifications/Notifications";
import {CourseDetailService} from "../../../requests/CourseDetailService";
import {AxiosError} from "axios";

export interface IChangeStatus {
    courseId: string;
    status: CourseStatuses;
}

export const changeCourseStatusReducers = (builder: ActionReducerMapBuilder<ICourseDetailsState>) => {
    builder.addCase(changeStatusCourse.pending.type, (state) => {
        state.modal.loading = true;
        state.modal.error = null;

        customNotifications.loading({massage: 'Изменение статуса курса...', key: 'changeCourseStatus'});
    });
    builder.addCase(changeStatusCourse.fulfilled.type, (state, action: PayloadAction<ICourseDetails>) => {
        state.modal.loading = false;
        state.modal.error = null;
        state.modal.modalTypeOpen = null;
        state.course = action.payload;

        customNotifications.success({massage: 'Статус курса успешно изменен!', key: 'changeCourseStatus'});
    });
    builder.addCase(changeStatusCourse.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.modal.loading = false;
        state.modal.error = action.payload;

        let message = "Произошла неизвестная ошибка!";
        customNotifications.error({massage: message, key: 'changeCourseStatus'});
    });
}

export const changeStatusCourse = createAsyncThunk(
    'courseDetails/changeCourseStatus',
    async (request: IChangeStatus, thunkAPI) => {
        try {
            const responseCourse = await CourseDetailService.changeStatusCourse(request.courseId, request.status);
            console.log(responseCourse.data);

            return responseCourse.data;
        } catch (error) {
            const err = error as AxiosError;
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: ""});
        }
    }
);