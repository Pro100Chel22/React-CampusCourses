import dayjs from "dayjs";

export interface IGroup {
    id: string
    name: string
}

export interface IUserProfileResponse {
    fullName: string;
    email: string;
    birthDate: string;
}

export interface IUserProfile {
    fullName: string;
    email: string;
    birthDate: dayjs.Dayjs;
}

export interface IRoles {
    isTeacher: boolean,
    isStudent: boolean,
    isAdmin: boolean
}

export interface IUserProfileRoles {
    userProfile: IUserProfileResponse,
    roles: IRoles
}

export interface IRegistration {
    fullName: string,
    birthDate: string,
    email: string,
    password: string,
    confirmPassword: string
}

export interface ILogin {
    email: string;
    password: string;
}

export interface ITokenResponse {
    token: string;
}

export interface IErrorResponse {
    status: number,
    massage: string
}