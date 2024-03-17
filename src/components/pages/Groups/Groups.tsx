import React from 'react';
import {List, Typography} from "antd";
import MyButton from "../../UI/MyButton/MyButton";
import MyGroupItem from "../../UI/MyGroupItem/MyGroupItem";
import classes from './Groups.module.css'
import {useGroups} from "./useGroups";
import MyModalFormGroup, {ModalGroupType} from "../../UI/MyModalFormGroup/MyModalFormGroup";
import FetchingResult from "../../hoc/FetchingResult";

const {Title} = Typography;

const Groups = () => {
    const {
        modalGroup,
        createModalGroup,
        editModalGroup,
        fetchGroups,
        removeGroup,
        roles
    } = useGroups();

    console.log("Groups update!");

    return (
        <>
            <div className={classes.GroupContainerWrapper}>
                <div className={classes.GroupContainer}>
                    <FetchingResult
                        error={fetchGroups.fetchingGroups.error}
                        errorResultChildren={<MyButton onClick={fetchGroups.fetchGroupsHandler}>Повторить попытку</MyButton>}
                    >
                        <Title level={2}>Группы кампусных курсов</Title>
                        {roles.isAdmin ?
                            <MyButton className={classes.groupButtonCreate}
                                      disabled={fetchGroups.fetchingGroups.loading}
                                      onClick={createModalGroup.showModalCreateHandler}>Создать</MyButton>
                            :
                            <></>
                        }
                        <List
                            loading={fetchGroups.fetchingGroups.loading}
                            className={classes.groupList}
                            bordered
                            dataSource={fetchGroups.groups}
                            renderItem={(item) => (
                                <MyGroupItem
                                    group={item}
                                    isAdmin={roles.isAdmin}
                                    onGroupDelete={removeGroup.groupDeleteHandler}
                                    modalShow={editModalGroup.showModalEditHandler}
                                    disabled={removeGroup.deletingGroup.loading || modalGroup.loading}
                                />
                            )}
                        />
                    </FetchingResult>
                </div>
            </div>
            <MyModalFormGroup
                modalForm={editModalGroup.formEdit}
                modalGroup={modalGroup}
                cancelModalHandler={editModalGroup.cancelModalEditHandler}
                groupOnFinishHandler={editModalGroup.groupEditHandler}
                modalGroupType={ModalGroupType.edit}
            />
            <MyModalFormGroup
                modalForm={createModalGroup.formCreate}
                modalGroup={modalGroup}
                cancelModalHandler={createModalGroup.cancelModalCreateHandler}
                groupOnFinishHandler={createModalGroup.groupCreateHandler}
                modalGroupType={ModalGroupType.create}
            />
        </>
    );
};

export default Groups;