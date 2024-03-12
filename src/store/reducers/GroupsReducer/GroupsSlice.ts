import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IErrorResponse, IGroup} from "../../../types/types";
import {groupsReducers} from "./GetGroupsThunkCreater";
import {deleteGroupReducers} from "./DeleteGroupThunkCreater";
import {editGroupReducers} from "./EditeGroupThunkCreater";
import {ModalGroupType} from "../../../components/UI/MyModalFormGroup/MyModalFormGroup";
import {createGroupReducers} from "./CreateGroupThunkCreater";

export interface IGroupsState {
    fetchingGroups: {
        loading: boolean;
        error: IErrorResponse | null;
    }
    deletingGroup: {
        loading: boolean;
        error: IErrorResponse | null;
    }
    modalGroup: {
        loading: boolean;
        error: IErrorResponse | null;
        typeModalOpen: ModalGroupType | null;
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
    modalGroup: {
        loading: false,
        error: null,
        typeModalOpen: null,
        group: null,
    },
    groups: [],
}

export interface IModalGroup {
    typeModalOpen: ModalGroupType | null;
    group: IGroup | null
}

export const groupsSlice = createSlice({
   name: "groups",
   initialState,
   reducers: {
       setModal(state, action: PayloadAction<IModalGroup>) {
           state.modalGroup.typeModalOpen = action.payload.typeModalOpen
           state.modalGroup.group = action.payload.group;
       }
   },
   extraReducers: builder => {
       groupsReducers(builder);
       deleteGroupReducers(builder);
       createGroupReducers(builder);
       editGroupReducers(builder);
   },
});

export default groupsSlice.reducer;
export const {actions, reducer} = groupsSlice;