import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {CourseDetailService} from "../../../requests/CourseDetailService";
import {AxiosError} from "axios";
import {ICourseDetails, IErrorResponse} from "../../../types/types";
import {ICourseDetailsState} from "./CourseDetailsSlice";
import {customNotifications} from "../../../notifications/Notifications";

export interface IAddTeacherToCourse {
    courseId: string;
    userId: string;
}

export const addTeacherToCourseReducers = (builder: ActionReducerMapBuilder<ICourseDetailsState>) => {
    builder.addCase(addTeacherToCourse.pending.type, (state) => {
        state.modalAddTeacher.loading = true;
        state.modalAddTeacher.error = null;

        customNotifications.loading({massage: 'Добавление преподавателя...', key: 'addTeacher'});
    });
    builder.addCase(addTeacherToCourse.fulfilled.type, (state, action: PayloadAction<ICourseDetails>) => {
        state.modalAddTeacher.loading = false;
        state.modalAddTeacher.error = null;
        state.modalAddTeacher.isOpen = false;
        state.course = action.payload;

        customNotifications.success({massage: 'Успешное добавление преподавателя!', key: 'addTeacher'});
    });
    builder.addCase(addTeacherToCourse.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.modalAddTeacher.loading = false;
        state.modalAddTeacher.error = action.payload;

        let message = "Произошла неизвестная ошибка!";
        if(action.payload.status === 400) {
            message = "Этот пользователь уже находится в этом курсе";
        }

        customNotifications.error({massage: message, key: 'addTeacher'});
    });
}

export const addTeacherToCourse = createAsyncThunk(
    'courseDetails/addTeacherToCourse',
    async (request: IAddTeacherToCourse, thunkAPI) => {
        try {
            const responseCourse = await CourseDetailService.addTeacherToCourse(request.courseId, request.userId);
            console.log(responseCourse.data);

            return responseCourse.data;
        } catch (error) {
            const err = error as AxiosError;
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: ""});
        }
    }
);