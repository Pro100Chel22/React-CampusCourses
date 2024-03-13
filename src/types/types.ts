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
    birthDate: string;
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

export interface IEditProfile {
    fullName: string,
    birthDate: string,
}


export interface ITokenResponse {
    token: string;
}

export interface IErrorResponse {
    status: number,
    massage: string
}

export enum CourseStatuses {
    Created = "Created",
    OpenForAssigning = "OpenForAssigning",
    Started = "Started",
    Finished = "Finished",
}
export enum Semesters {
    Autumn = "Autumn",
    Spring = "Spring",
}

export interface ICourse {
    id: string;
    name: string;
    startYear: number;
    maximumStudentsCount: number;
    remainingSlotsCount: number;
    status: CourseStatuses
    semester: Semesters
}