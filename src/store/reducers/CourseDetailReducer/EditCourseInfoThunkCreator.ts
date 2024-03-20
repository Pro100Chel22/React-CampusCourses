import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {CourseDetailService} from "../../../requests/CourseDetailService";
import {ICourseDetails, IEditCourse, IEditCourseForTeacher, IErrorResponse} from "../../../types/types";
import {AxiosError} from "axios";
import {customNotifications} from "../../../notifications/Notifications";
import {ICourseDetailsState} from "./CourseDetailsSlice";

export const editCourseReducers = (builder: ActionReducerMapBuilder<ICourseDetailsState>) => {
    builder.addCase(editCourseInfo.pending.type, (state) => {
        state.modal.loading = true;
        state.modal.error = null;

        customNotifications.loading({massage: 'Изменение курса...', key: 'editCourseInfo'});
    });
    builder.addCase(editCourseInfo.fulfilled.type, (state, action: PayloadAction<ICourseDetails>) => {
        state.modal.loading = false;
        state.modal.error = null;
        state.modal.modalTypeOpen = null;
        state.course = action.payload;

        customNotifications.success({massage: 'Курс успешно изменен!', key: 'editCourseInfo'});
    });
    builder.addCase(editCourseInfo.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.modal.loading = false;
        state.modal.error = action.payload;

        customNotifications.error({massage: 'Произошла неизвестная ошибка!', key: 'editCourseInfo'});
    });
}

export interface IEditCourseRequest {
    courseId: string;
    courseInfo: IEditCourse | IEditCourseForTeacher;
    isForTeacher: boolean;
}

export const editCourseInfo = createAsyncThunk(
    'courseDetails/editCourseInfo',
    async (request: IEditCourseRequest, thunkAPI) => {
        try {
            let responseCourse: any;
            if(request.isForTeacher) {
                responseCourse = await CourseDetailService.editeCourseForTeacher(request.courseId, request.courseInfo as IEditCourseForTeacher);
            }
            else {
                responseCourse = await CourseDetailService.editeCourse(request.courseId, request.courseInfo as IEditCourse);
            }

            console.log(responseCourse.data);

            return responseCourse.data;
        } catch (error) {
            const err = error as AxiosError;
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: ""});
        }
    }
);