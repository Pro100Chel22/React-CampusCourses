import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {UserService} from "../../../requests/UserService";
import {AxiosError} from "axios";
import {message} from "antd";
import {IUserState} from "./UserSlice";
import {IEditProfile, IErrorResponse, IUserProfileResponse} from "../../../types/types";
import {thunkSelector} from "../../../hooks/redux";
import dayjs from "dayjs";
import {serverDateFormat} from "../../../components/consts/consts";

export const editProfileReducers = (builder: ActionReducerMapBuilder<IUserState>) => {
    builder.addCase(editProfile.pending.type, (state) => {
        state.editLoading = true;
        state.error = null;

        message.open({duration: 0, type: 'loading', content: 'Отправка формы...', key: "editeProfile"});
    });
    builder.addCase(editProfile.fulfilled.type, (state, action: PayloadAction<IUserProfileResponse>) => {
        state.editLoading = false;
        state.error = null;

        state.profile ={
            fullName: action.payload.fullName,
            email: action.payload.email,
            birthDate: dayjs(action.payload.birthDate.split("T")[0], serverDateFormat).format(serverDateFormat),
        };

        message.open({duration: 3, type: 'success', content: "Успешное редактирование!", key: "editeProfile"});
    });
    builder.addCase(editProfile.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.editLoading = false;
        state.error = action.payload;

        message.open({duration: 3, type: 'error', content: "Произошла неизвестная ошибка!", key: "editeProfile"});
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