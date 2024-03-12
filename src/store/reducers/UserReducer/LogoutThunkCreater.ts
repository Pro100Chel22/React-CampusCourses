import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {IUserState} from "./UserSlice";
import {message} from "antd";
import {IErrorResponse} from "../../../types/types";
import {UserService} from "../../../requests/UserService";
import {AxiosError} from "axios";

export const logoutReducers = (builder: ActionReducerMapBuilder<IUserState>) => {
    builder.addCase(logout.pending.type, (state) => {
        state.error = null;

        message.open({duration: 0, type: 'loading', content: 'Выход с аккаунта...', key: "logout"});
    });
    builder.addCase(logout.fulfilled.type, (state, action: PayloadAction<string>) => {
        state.error = null;
        state.token = null;
        state.profile = null;
        state.roles = {
            isTeacher: false,
            isStudent: false,
            isAdmin: false
        };
        localStorage.removeItem("token");

        message.open({duration: 3, type: 'success', content: "Выход выполнен!", key: "logout"});
    });
    builder.addCase(logout.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.error = action.payload;

        if(action.payload.status === 401) {
            state.token = null;
            state.profile = null;
            state.roles = {
                isTeacher: false,
                isStudent: false,
                isAdmin: false
            };
            localStorage.removeItem("token");
            message.destroy("logout");
        }
        else {
            message.open({duration: 3, type: 'error', content: "Произошла неизвестная ошибка!", key: "logout"});
        }
    });
}

export const logout = createAsyncThunk(
    'user/logout',
    async (_, thunkAPI) => {
        try {
            const response = await UserService.logout();
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: ""});
        }
    }
);