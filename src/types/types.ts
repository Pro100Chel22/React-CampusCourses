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

export interface ICreateCourse {
    name: string;
    startYear: number;
    maximumStudentsCount: number;
    semester: Semesters;
    requirements: string;
    annotations: string;
    mainTeacherId: string;
}

export interface IUser {
    id: string;
    fullName: string;
}

export interface INotification {
    text: string;
    isImportant: boolean;
}

export enum StudentStatuses {
    InQueue = "InQueue",
    Accepted = "Accepted",
    Declined = "Declined",
}

export enum StudentMarks {
    NotDefined = "NotDefined",
    Passed = "Passed",
    Failed = "Failed",
}

export interface IStudent {
    id: string;
    name: string;
    email: string;
    status: StudentStatuses;
    midtermResult: StudentMarks;
    finalResult: StudentMarks;
}

export interface ITeacher {
    name: string;
    email: string;
    isMain: boolean;
}

export interface ICourseDetails {
    id: string;
    name: string;
    startYear: number;
    maximumStudentsCount: number;
    studentsEnrolledCount: number;
    studentsInQueueCount: number;
    requirements: string;
    annotations: string;
    status: CourseStatuses;
    semester: Semesters;
    students: IStudent[];
    teachers: ITeacher[];
    notifications: INotification[];
}

export enum MarkType {
    Midterm,
    Final
}

export interface IStudentMark {
    markType: MarkType;
    mark: StudentMarks
}

export interface IStudentStatus {
    status: StudentStatuses;
}