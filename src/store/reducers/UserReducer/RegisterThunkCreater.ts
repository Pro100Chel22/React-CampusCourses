import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {IErrorResponse, IRegistration, ITokenResponse} from "../../../types/types";
import {UserService} from "../../../requests/UserService";
import {AxiosError} from "axios";
import {IUserState} from "./UserSlice";
import {customNotifications} from "../../../notifications/Notifications";

export const registerReducers = (builder: ActionReducerMapBuilder<IUserState>) => {
    builder.addCase(register.pending.type, (state) => {
        state.registrationLoading = true;
        state.error = null;

        customNotifications.loading({massage: 'Отправка формы...', key: 'registration'});
    });
    builder.addCase(register.fulfilled.type, (state, action: PayloadAction<ITokenResponse>) => {
        state.registrationLoading = false;
        state.error = null;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);

        customNotifications.success({massage: 'Регистрация прошла успешно!', key: 'registration'});
    });
    builder.addCase(register.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.registrationLoading = false;
        state.error = action.payload;

        let errorMessage = "Произошла неизвестная ошибка!";
        if(action.payload.status === 409) {
            errorMessage = "Пользователь с таким email уже существует!";
        }
        customNotifications.error({massage: errorMessage, key: 'registration'});
    });
}

export const register = createAsyncThunk(
    'user/register',
    async (registrationForm: IRegistration, thunkAPI) => {
        try {
            const response = await UserService.registration(registrationForm);
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: ""});
        }
    }
);