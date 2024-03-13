import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {IGroupsState} from "./GroupsSlice";
import {IErrorResponse, IGroup} from "../../../types/types";
import {GroupsService} from "../../../requests/GroupsService";
import {AxiosError} from "axios";
import {customNotifications} from "../../../notifications/Notifications";

export const editGroupReducers = (builder: ActionReducerMapBuilder<IGroupsState>) => {
    builder.addCase(editGroup.pending.type, (state) => {
        state.modalGroup.loading = true;
        state.modalGroup.error = null;

        customNotifications.loading({massage: 'Редактирование группы...', key: 'editGroup'});
    });
    builder.addCase(editGroup.fulfilled.type, (state, action: PayloadAction<IGroup[]>) => {
        state.modalGroup.loading = false;
        state.modalGroup.error = null;
        state.groups = action.payload;
        state.modalGroup.typeModalOpen = null;

        customNotifications.success({massage: 'Успешное редактирование!', key: 'editGroup'});
    });
    builder.addCase(editGroup.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.modalGroup.loading = false;
        state.modalGroup.error = action.payload;

        let errorMessage = "Произошла неизвестная ошибка!";
        if(action.payload.status === 404) {
            errorMessage = "Группа была удалена другим пользователем!";
        }
        customNotifications.error({massage: errorMessage, key: 'editGroup'});
    });
}

export const editGroup = createAsyncThunk(
    'groups/editGroups',
    async (group: IGroup, thunkAPI) => {
        try {
            await GroupsService.editGroup(group);
            const response = await GroupsService.groups();
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            console.log(err);
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: ""});
        }
    }
);