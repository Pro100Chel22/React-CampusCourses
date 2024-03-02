import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {IErrorResponse, IRegistration, ITokenResponse} from "../../../types/types";
import {UserService} from "../../../requests/UserService";
import {AxiosError} from "axios";
import {message} from "antd";
import {IUserState} from "./UserSlice";

export const registerReducers = (builder: ActionReducerMapBuilder<IUserState>) => {
    builder.addCase(register.pending.type, (state) => {
        state.registrationLoading = true;
        state.error = null;

        message.open({duration: 0, type: 'loading', content: 'Отправка формы...', key: "registration"});
    });
    builder.addCase(register.fulfilled.type, (state, action: PayloadAction<ITokenResponse>) => {
        state.registrationLoading = false;
        state.error = null;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);

        message.open({duration: 3, type: 'info', content: "Регистрация прошла успешно!", key: "registration"});
    });
    builder.addCase(register.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.registrationLoading = false;
        state.error = action.payload;

        let errorMessage = "Произошла неизвестная ошибка!";
        if(action.payload.status === 409) {
            errorMessage = "Пользователь с таким email уже существует!";
        }
        message.open({duration: 3, type: 'error', content: errorMessage, key: "registration"});
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