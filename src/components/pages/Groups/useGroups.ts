import {useAuth} from "../../../hooks/useAuth";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {useEffect, useState} from "react";
import {getGroups} from "../../../store/reducers/GroupsReducer/GetGroupsThunkCreater";
import {IGroup} from "../../../types/types";
import {deleteGroup} from "../../../store/reducers/GroupsReducer/DeleteGroupThunkCreater";
import {editGroup} from "../../../store/reducers/GroupsReducer/EditeGroupThunkCreater";
import {useForm} from "antd/es/form/Form";
import {actions} from "../../../store/reducers/GroupsReducer/GroupsSlice";

export interface IGroupEditForm {
    groupName: string
}

export const useGroups = () => {
    const {roles} = useAuth();
    const {groups, fetchingGroups, deletingGroup, editingGroup} = useAppSelector(state => state.groupsReducer);
    const dispatch = useAppDispatch();
    const [formEdit] = useForm<IGroupEditForm>();

    const showModalEditHandler = (group: IGroup) => {
        dispatch(actions.setModal({modalOpen: true, group}));
        formEdit.resetFields();
        formEdit.setFieldValue("groupName", group.name);
    };

    const cancelModalEditHandler = () => {
        dispatch(actions.setModal({modalOpen: false, group: null}));
    };

    const groupEditHandler = (value: IGroupEditForm) => {
        dispatch(editGroup({id: editingGroup.group?.id ?? "", name: value.groupName}));
    }

    const fetchGroupsHandler = () => {
        dispatch(getGroups());
    }

    const groupDeleteHandler = (group: IGroup) => {
        dispatch(deleteGroup(group));
    }

    useEffect(() => {
        fetchGroupsHandler();
    }, []);

    return {
        formEdit,
        showModalEditHandler,
        cancelModalEditHandler,
        groups,
        fetchingGroups,
        deletingGroup,
        editingGroup,
        fetchGroupsHandler,
        groupDeleteHandler,
        groupEditHandler,
        roles
    };
}