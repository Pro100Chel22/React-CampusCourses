import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {UserService} from "../../../requests/UserService";
import {AxiosError} from "axios";
import {IUserState} from "./UserSlice";
import {IEditProfile, IErrorResponse, IUserProfileResponse} from "../../../types/types";
import dayjs from "dayjs";
import {serverDateFormat} from "../../../components/consts/consts";
import {customNotifications} from "../../../notifications/Notifications";

export const editProfileReducers = (builder: ActionReducerMapBuilder<IUserState>) => {
    builder.addCase(editProfile.pending.type, (state) => {
        state.editLoading = true;
        state.error = null;

        customNotifications.loading({massage: 'Отправка формы...', key: 'editProfile'});
    });
    builder.addCase(editProfile.fulfilled.type, (state, action: PayloadAction<IUserProfileResponse>) => {
        state.editLoading = false;
        state.error = null;

        state.profile ={
            fullName: action.payload.fullName,
            email: action.payload.email,
            birthDate: dayjs(action.payload.birthDate.split("T")[0], serverDateFormat).format(serverDateFormat),
        };

        customNotifications.success({massage: 'Успешное редактирование!', key: 'editProfile'});
    });
    builder.addCase(editProfile.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.editLoading = false;
        state.error = action.payload;

        customNotifications.error({massage: 'Произошла неизвестная ошибка!', key: 'editProfile'});
    });
}

export const editProfile = createAsyncThunk(
    'user/editeProfile',
    async (editForm: IEditProfile, thunkAPI) => {
        try {
            const response = await UserService.editProfile(editForm);
            console.log(response);
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: ""});
        }
    }
);