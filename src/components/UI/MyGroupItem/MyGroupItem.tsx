import React, {FC} from 'react';
import MyButton from "../MyButton/MyButton";
import {List, Popconfirm} from "antd";
import classes from "./MyGroupItem.module.css";
import {IGroup} from "../../../types/types";
import {QuestionCircleOutlined} from "@ant-design/icons";

export interface IMyGroupItem {
    group: IGroup;
    isAdmin: boolean;
    onGroupDelete: (group: IGroup) => void;
    modalShow: (group: IGroup) => void;
    disabled: boolean;
}

const MyGroupItem : FC<IMyGroupItem> = ({group, isAdmin, onGroupDelete, disabled, modalShow}) => {
    const confirm = () => {
        onGroupDelete(group);
    }

    return (
        <List.Item>
            <div className={classes.GroupItemContainer}>
                <div className={classes.GroupTitle}>{group.name}</div>
                <div className={classes.GroupButtonsContainer}>
                    {isAdmin ?
                        <>
                            <MyButton className={classes.GroupButtonEdit} onClick={() => modalShow(group)} disabled={disabled}>Редактировать</MyButton>
                            <Popconfirm
                                onConfirm={confirm}
                                title={`Удаление группы "${group.name}"`}
                                description="Вы уверены, что хотите удалить эту группу?"
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            >
                                <MyButton className={classes.GroupButtonDelete} disabled={disabled}>Удалить</MyButton>
                            </Popconfirm>
                        </>
                        :
                        <></>
                    }
                </div>
            </div>
        </List.Item>
    );
};

export default MyGroupItem;