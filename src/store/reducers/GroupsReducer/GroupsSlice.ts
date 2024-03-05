import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IErrorResponse, IGroup} from "../../../types/types";
import {groupsReducers} from "./GetGroupsThunkCreater";
import {deleteGroupReducers} from "./DeleteGroupThunkCreater";
import {editGroupReducers} from "./EditeGroupThunkCreater";

export interface IGroupsState {
    fetchingGroups: {
        loading: boolean;
        error: IErrorResponse | null;
    }
    deletingGroup: {
        loading: boolean;
        error: IErrorResponse | null;
    }
    editingGroup: {
        loading: boolean;
        error: IErrorResponse | null;
        modalOpen: boolean;
        group: IGroup | null;
    }
    groups: IGroup[];
}

const initialState: IGroupsState = {
    fetchingGroups: {
        loading: false,
        error:  null,
    },
    deletingGroup: {
        loading: false,
        error: null,
    },
    editingGroup: {
        loading: false,
        error: null,
        modalOpen: false,
        group: null,
    },
    groups: [],
}

export interface IModalEdit {
    modalOpen: boolean;
    group: IGroup | null
}

export const groupsSlice = createSlice({
   name: "groups",
   initialState,
   reducers: {
       setModal(state, action: PayloadAction<IModalEdit>) {
           state.editingGroup.modalOpen = action.payload.modalOpen
           state.editingGroup.group = action.payload.group;
       }
   },
   extraReducers: builder => {
       groupsReducers(builder);
       deleteGroupReducers(builder);
       editGroupReducers(builder);
   },
});

export default groupsSlice.reducer;
export const {actions, reducer} = groupsSlice;