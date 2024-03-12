import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {IGroupsState} from "./GroupsSlice";
import {message} from "antd";
import {IErrorResponse, IGroup} from "../../../types/types";
import {thunkSelector} from "../../../hooks/redux";
import {GroupsService} from "../../../requests/GroupsService";
import {AxiosError} from "axios";

export const editGroupReducers = (builder: ActionReducerMapBuilder<IGroupsState>) => {
    builder.addCase(editGroup.pending.type, (state) => {
        state.modalGroup.loading = true;
        state.modalGroup.error = null;

        message.open({duration: 0, type: 'loading', content: 'Редактирование группы...', key: "deleteGroup"});
    });
    builder.addCase(editGroup.fulfilled.type, (state, action: PayloadAction<IGroup[]>) => {
        state.modalGroup.loading = false;
        state.modalGroup.error = null;
        state.groups = action.payload;
        state.modalGroup.typeModalOpen = null;

        message.open({duration: 3, type: 'info', content: "Успешное редактирование!", key: "deleteGroup"});
    });
    builder.addCase(editGroup.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.modalGroup.loading = false;
        state.modalGroup.error = action.payload;

        let errorMessage = "Произошла неизвестная ошибка!";
        if(action.payload.status === 404) {
            errorMessage = "Группа была удалена другим пользователем!";
        }
        message.open({duration: 3, type: 'error', content: errorMessage, key: "deleteGroup"});
    });
}

export const editGroup = createAsyncThunk(
    'groups/editGroups',
    async (group: IGroup, thunkAPI) => {
        try {
            const token = thunkSelector(thunkAPI).userReducer.token ?? "";
            await GroupsService.editGroup(group, token);
            const response = await GroupsService.groups(token);
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            console.log(err);
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: ""});
        }
    }
);