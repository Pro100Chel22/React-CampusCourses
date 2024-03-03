import axiosInstanceFactory from "./AxiosInstance";
import {IEditProfile, ILogin, IRegistration, IRoles, ITokenResponse, IUserProfileResponse} from "../types/types";
import {AxiosPromise} from "axios";

const axios = axiosInstanceFactory();

const registration = async (form: IRegistration): Promise<AxiosPromise<ITokenResponse>> => {
    return axios.post<ITokenResponse>("registration", form);
}

const login = async (form: ILogin): Promise<AxiosPromise<ITokenResponse>> => {
    return axios.post<ITokenResponse>("login", form);
}

const editProfile = async (form: IEditProfile, token: string): Promise<AxiosPromise<IUserProfileResponse>> => {
    return axios.put<IUserProfileResponse>("profile", form, {headers: {
            Authorization: 'Bearer ' + token,
        }});
}

const logout = async (token: string): Promise<AxiosPromise<IUserProfileResponse>> => {
    return axios.post<IUserProfileResponse>("logout", {}, {headers: {
            Authorization: 'Bearer ' + token,
        }});
}

const profile = async (token: string): Promise<AxiosPromise<IUserProfileResponse>> => {
    return axios.get<IUserProfileResponse>("profile", {headers: {
            Authorization: 'Bearer ' + token,
        }});
}

const roles = async (token: string): Promise<AxiosPromise<IRoles>> => {
    return axios.get<IRoles>("roles", {headers: {
            Authorization: 'Bearer ' + token,
        }});
}

export const UserService = {
    registration,
    login,
    editProfile,
    logout,
    profile,
    roles
}

// export default UserService;