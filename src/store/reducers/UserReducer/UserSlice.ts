import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IErrorResponse, IRoles, IUserProfile} from "../../../types/types";
import {registerReducers} from "./RegisterThunkCreater";
import {loginReducers} from "./LoginThunkCreater";
import {logoutReducers} from "./LogoutThunkCreater";
import {checkAuthReducers} from "./CheckAuthThunkCreater";
import {editProfileReducers} from "./EditProfileThunkCreater";
import {IModalGroup} from "../GroupsReducer/GroupsSlice";

export interface IUserState {
    profile: IUserProfile | null;
    roles: IRoles;
    checkingAuth: boolean;
    registrationLoading: boolean;
    loginLoading: boolean;
    editLoading: boolean;
    error: IErrorResponse | null;
    token: string | null; // если токен есть и не идет проверка авторизации, то пользователь авторизован, если нет токена - не авторизова, если есть токен и идет проварка, то нужно додаться окончание проверки
}

const initialState: IUserState = {
    profile: null,
    checkingAuth: true,
    registrationLoading: false,
    loginLoading: false,
    editLoading: false,
    error: null,
    token: localStorage.getItem("token"),
    roles: {
        isTeacher: false,
        isStudent: false,
        isAdmin: false,
    },
}

// Регаемся или логинимся => приходит токен, сохраняем его в локальное хранилище и обновляем isAuth на true и подгружаем профиль и роли
// При запуске приложения вначале делаем проверку на авторизацию, пока это происходит отображаем плейсхолдеры где нужно
// Если токен в локальном хранилище есть, то запрашиваем профиль пользователя и роли, при 200 сохраняем профиль и роли и пускаем пользователя куда ему нужно,
// а при любом другом обновляем isAuth на false и чистим токен
// Если токена нет, то обновляем isAuth на false
//
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        localLogout(state) {
            state.token = null;
            state.profile = null;
            state.roles = {
                isTeacher: false,
                isStudent: false,
                isAdmin: false
            };
            localStorage.removeItem("token");
        }
    },
    extraReducers: builder => {
        registerReducers(builder);
        loginReducers(builder);
        logoutReducers(builder);
        checkAuthReducers(builder);
        editProfileReducers(builder);
    }
});

export default userSlice.reducer;
export const {actions} = userSlice;