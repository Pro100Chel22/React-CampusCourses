import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {IErrorResponse, ILogin, ITokenResponse} from "../../../types/types";
import {UserService} from "../../../requests/UserService";
import {AxiosError} from "axios";
import {IUserState} from "./UserSlice";
import {message} from "antd";

export const loginReducers = (builder: ActionReducerMapBuilder<IUserState>) => {
    builder.addCase(login.pending.type, (state) => {
        state.loginLoading = true;
        state.error = null;

        message.open({duration: 0, type: 'loading', content: 'Отправка формы...', key: "login"});
    });
    builder.addCase(login.fulfilled.type, (state, action: PayloadAction<ITokenResponse>) => {
        state.loginLoading = false;
        state.error = null;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);

        message.open({duration: 3, type: 'info', content: "Успешная авторизация!", key: "login"});
    });
    builder.addCase(login.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.loginLoading = false;
        state.error = action.payload;

        let errorMessage = "Произошла неизвестная ошибка!";
        if(action.payload.status === 400) {
            errorMessage = "Неверный логин или пароль!";
        }
        message.open({duration: 3, type: 'error', content: errorMessage, key: "login"});
    });
}

export const login = createAsyncThunk(
    'user/login',
    async (loginForm: ILogin, thunkAPI) => {
        try {
            const response = await UserService.login(loginForm);
            console.log(response);
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: ""});
        }
    }
);