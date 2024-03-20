import {IGroupsState} from "./GroupsSlice";
import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {IErrorResponse, IGroup} from "../../../types/types";
import {GroupsService} from "../../../requests/GroupsService";
import {AxiosError} from "axios";
import {customNotifications} from "../../../notifications/Notifications";

export const createGroupReducers = (builder: ActionReducerMapBuilder<IGroupsState>) => {
    builder.addCase(createGroups.pending.type, (state) => {
        state.modalGroup.loading = true;
        state.modalGroup.error = null;

        customNotifications.loading({massage: 'Создание группы...', key: 'createGroup'});
    });
    builder.addCase(createGroups.fulfilled.type, (state, action: PayloadAction<IGroup[]>) => {
        state.modalGroup.loading = false;
        state.modalGroup.error = null;
        state.groups = action.payload;
        state.modalGroup.typeModalOpen = null;

        customNotifications.success({massage: 'Успешное создание!', key: 'createGroup'});
    });
    builder.addCase(createGroups.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.modalGroup.loading = false;
        state.modalGroup.error = action.payload;

        customNotifications.error({massage: 'Произошла неизвестная ошибка!', key: 'createGroup'});
    });
}

export const createGroups = createAsyncThunk(
    'groups/createGroups',
    async (groupName: string, thunkAPI) => {
        try {
            await GroupsService.createGroup(groupName);
            const response = await GroupsService.groups();
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            console.log(err);
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: ""});
        }
    }
);