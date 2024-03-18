import {useAuth} from "../../../hooks/useAuth";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {useEffect} from "react";
import {getGroups} from "../../../store/reducers/GroupsReducer/GetGroupsThunkCreater";
import {IGroup} from "../../../types/types";
import {deleteGroup} from "../../../store/reducers/GroupsReducer/DeleteGroupThunkCreater";
import {editGroup} from "../../../store/reducers/GroupsReducer/EditeGroupThunkCreater";
import {useForm} from "antd/es/form/Form";
import {actions} from "../../../store/reducers/GroupsReducer/GroupsSlice";
import {IGroupModalForm, ModalGroupType} from "../../UI/MyModalFormGroup/MyModalFormGroup";
import {createGroups} from "../../../store/reducers/GroupsReducer/CreateGroupThunkCreater";

export const useGroups = () => {
    const {roles} = useAuth();
    const {groups, fetchingGroups, deletingGroup, modalGroup} = useAppSelector(state => state.groupsReducer);
    const dispatch = useAppDispatch();
    const [formEdit] = useForm<IGroupModalForm>();
    const [formCreate] = useForm<IGroupModalForm>();

    const createModalGroup = {
        formCreate,
        showModalCreateHandler: () => {
            dispatch(actions.setModal({typeModalOpen: ModalGroupType.create, group: null}));
            formCreate.resetFields();
        },
        cancelModalCreateHandler: () => {
            dispatch(actions.setModal({typeModalOpen: null, group: null}));
        },
        groupCreateHandler: (value: IGroupModalForm) => {
            dispatch(createGroups(value.groupName));
        }
    }
    const editModalGroup = {
        formEdit,
        showModalEditHandler: (group: IGroup) => {
            dispatch(actions.setModal({typeModalOpen: ModalGroupType.edit, group}));
            formEdit.resetFields();
            formEdit.setFieldValue("groupName", group.name);
        },
        cancelModalEditHandler: () => {
            dispatch(actions.setModal({typeModalOpen: null, group: null}));
        },
        groupEditHandler: (value: IGroupModalForm) => {
            dispatch(editGroup({id: modalGroup.group?.id ?? "", name: value.groupName}));
        }
    }
    const fetchGroups = {
        groups,
        fetchingGroups,
        fetchGroupsHandler: () => {
            dispatch(getGroups());
        }
    }
    const removeGroup = {
        deletingGroup,
        groupDeleteHandler: (group: IGroup) => {
            dispatch(deleteGroup(group));
        }
    }

    useEffect(() => {
        fetchGroups.fetchGroupsHandler();
    }, []);

    return {
        modalGroup,
        createModalGroup,
        editModalGroup,
        fetchGroups,
        removeGroup,
        roles
    };
}