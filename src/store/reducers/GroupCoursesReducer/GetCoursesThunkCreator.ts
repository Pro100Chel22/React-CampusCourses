import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {ICourse, IErrorResponse, IGroup, IUser} from "../../../types/types";
import {AxiosError} from "axios";
import {ICoursesState} from "./GroupCoursesSlice";
import {CoursesService} from "../../../requests/CoursesService";
import {GroupsService} from "../../../requests/GroupsService";
import {thunkSelector} from "../../../hooks/redux";

interface IGetCoursesResponse {
    courses: ICourse[];
    group: IGroup;
    users: IUser[];
}

export const coursesReducers = (builder: ActionReducerMapBuilder<ICoursesState>) => {
    builder.addCase(getCourses.pending.type, (state) => {
        state.fetchingCourses.loading = true;
        state.fetchingCourses.error = null;
    });
    builder.addCase(getCourses.fulfilled.type, (state, action: PayloadAction<IGetCoursesResponse>) => {
        state.fetchingCourses.loading = false;
        state.fetchingCourses.error = null;
        state.courses = action.payload.courses;
        state.groupName = action.payload.group.name;
        state.modalCourseCreation.usersForCourseCreation = action.payload.users;
    });
    builder.addCase(getCourses.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.fetchingCourses.loading = false;
        state.fetchingCourses.error = action.payload;
    });
}

export const getCourses = createAsyncThunk(
    'groups/getCourses',
    async (groupId: string, thunkAPI) => {
        try {
            const responseCourses = await CoursesService.courses(groupId);
            const responseGroups = await GroupsService.groups();

            const isAdmin = thunkSelector(thunkAPI).userReducer.roles.isAdmin;

            let responseUsers: IUser[] = [];
            if(isAdmin) {
                responseUsers = (await CoursesService.usersForCourseCreation()).data;
            }

            console.log({courses: responseCourses.data, groups: responseGroups.data, users: responseUsers}, 1);
            return {courses: responseCourses.data, group: responseGroups.data.filter(item => item.id === groupId)[0], users: responseUsers};
        } catch (error) {
            const err = error as AxiosError;
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: ""});
        }
    }
);