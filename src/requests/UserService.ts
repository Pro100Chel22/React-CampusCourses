import axiosInstanceFactory from "./AxiosInstance";
import {ILogin, IRegistration, IRoles, ITokenResponse, IUserProfile} from "../types/types";
import {AxiosPromise} from "axios";

const axios = axiosInstanceFactory();

const registration = async (form: IRegistration): Promise<AxiosPromise<ITokenResponse>> => {
    return axios.post<ITokenResponse>("registration", form);
}

const login = async (form: ILogin): Promise<AxiosPromise<ITokenResponse>> => {
    return axios.post<ITokenResponse>("login", form);
}

const logout = async (token: string): Promise<AxiosPromise<IUserProfile>> => {
    return axios.post<IUserProfile>("logout", {}, {headers: {
            Authorization: 'Bearer ' + token,
        }});
}

const profile = async (token: string): Promise<AxiosPromise<IUserProfile>> => {
    return axios.get<IUserProfile>("profile", {headers: {
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
    logout,
    profile,
    roles
}

// export default UserService;