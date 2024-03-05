import React from 'react';
import {List, Result, Typography} from "antd";
import MyButton from "../../UI/MyButton/MyButton";
import MyGroupItem from "../../UI/MyGroupItem/MyGroupItem";
import classes from './Groups.module.css'
import {useGroups} from "./useGroups";
import MyModalGroupEdit from "../../UI/MyModalGroupEdit/MyModalGroupEdit";

const {Title} = Typography;

const Groups = () => {
    const {
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
    } = useGroups();

    console.log("Groups update!");

    return (
        <>
            <div className={classes.GroupContainerWrapper}>
                <div className={classes.GroupContainer}>
                    <Title level={2}>Группы кампусных курсов</Title>
                    {!!fetchingGroups.error ?
                        <Result
                            status="500"
                            title="500"
                            subTitle="Извините, что-то пошло не так!"
                            extra={<MyButton onClick={fetchGroupsHandler}>Повторить попытку</MyButton>}
                        />
                        :
                        <>
                            {roles.isAdmin ?
                                <MyButton className={classes.groupButtonCreate}
                                          disabled={fetchingGroups.loading}>Создать</MyButton>
                                :
                                <></>
                            }
                            <List
                                loading={fetchingGroups.loading}
                                className={classes.groupList}
                                bordered
                                dataSource={groups}
                                renderItem={(item) => (
                                    <MyGroupItem
                                        group={item}
                                        isAdmin={roles.isAdmin}
                                        onGroupDelete={groupDeleteHandler}
                                        modalShow={showModalEditHandler}
                                        disabled={deletingGroup.loading || editingGroup.loading}
                                    />
                                )}
                            />
                        </>
                    }
                </div>
            </div>
            <MyModalGroupEdit formEdit={formEdit} editingGroup={editingGroup} cancelModalEditHandler={cancelModalEditHandler} groupEditHandler={groupEditHandler}/>
        </>

    );
};


/* login
{
  "email": "gymboss@gachi.com",
  "password": "B0yNextD00r"
}
*/
export default Groups;