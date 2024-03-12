import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {IErrorResponse, IGroup} from "../../../types/types";
import {AxiosError} from "axios";
import {IGroupsState} from "./GroupsSlice";
import {GroupsService} from "../../../requests/GroupsService";
import {thunkSelector} from "../../../hooks/redux";

export const groupsReducers = (builder: ActionReducerMapBuilder<IGroupsState>) => {
    builder.addCase(getGroups.pending.type, (state) => {
        state.fetchingGroups.loading = true;
        state.fetchingGroups.error = null;
    });
    builder.addCase(getGroups.fulfilled.type, (state, action: PayloadAction<IGroup[]>) => {
        state.fetchingGroups.loading = false;
        state.fetchingGroups.error = null;
        state.groups = action.payload;
    });
    builder.addCase(getGroups.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.fetchingGroups.loading = false;
        state.fetchingGroups.error = action.payload;
    });
}

export const getGroups = createAsyncThunk(
    'groups/getGroups',
    async (_, thunkAPI) => {
        try {
            const response = await GroupsService.groups();
            console.log(response);
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: ""});
        }
    }
);