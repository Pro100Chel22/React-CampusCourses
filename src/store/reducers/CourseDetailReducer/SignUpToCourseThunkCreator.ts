import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {ICourse, IErrorResponse} from "../../../types/types";
import {CourseDetailService} from "../../../requests/CourseDetailService";
import {AxiosError} from "axios";
import {ICourseDetailsState} from "./CourseDetailsSlice";
import {customNotifications} from "../../../notifications/Notifications";
import {CoursesService} from "../../../requests/CoursesService";

export const signUpToCourseReducers = (builder: ActionReducerMapBuilder<ICourseDetailsState>) => {
    builder.addCase(signUpToCourse.pending.type, (state) => {
        state.signUpingToCourse.loading = true;
        state.signUpingToCourse.error = null;

        customNotifications.loading({massage: 'Подача заявки на курс!', key: 'editStatus'});
    });
    builder.addCase(signUpToCourse.fulfilled.type, (state, action: PayloadAction<ISignUpToCourseResponse>) => {
        state.signUpingToCourse.loading = false;
        state.signUpingToCourse.error = null;
        state.myCourse = action.payload.myCourses;

        customNotifications.success({massage: 'Заявка успешно подана!', key: 'editStatus'});
    });
    builder.addCase(signUpToCourse.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.signUpingToCourse.loading = false;
        state.signUpingToCourse.error = action.payload;

        let message = "Произошла неизвестная ошибка!";
        customNotifications.error({massage: message, key: 'editStatus'});
    });
}

export interface ISignUpToCourseResponse {
    myCourses: ICourse[];
}

export const signUpToCourse = createAsyncThunk(
    'courseDetails/singUpToCourse',
    async (courseId: string, thunkAPI) => {
        try {
            await CourseDetailService.signUpToCourse(courseId);
            const responseMyCourses = await CoursesService.myCourses();

            return {myCourses: responseMyCourses.data} as ISignUpToCourseResponse;
        } catch (error) {
            const err = error as AxiosError;
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: ""});
        }
    }
);