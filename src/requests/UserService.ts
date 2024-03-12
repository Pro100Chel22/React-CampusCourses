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

const editProfile = async (form: IEditProfile): Promise<AxiosPromise<IUserProfileResponse>> => {
    return axios.put<IUserProfileResponse>("profile", form);
}

const logout = async (): Promise<AxiosPromise<IUserProfileResponse>> => {
    return axios.post<IUserProfileResponse>("logout", {});
}

const profile = async (): Promise<AxiosPromise<IUserProfileResponse>> => {
    return axios.get<IUserProfileResponse>("profile");
}

const roles = async (): Promise<AxiosPromise<IRoles>> => {
    return axios.get<IRoles>("roles");
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