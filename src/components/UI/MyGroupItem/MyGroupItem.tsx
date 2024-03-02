import React, {FC} from 'react';
import MyButton from "../MyButton/MyButton";
import {List} from "antd";
import classes from "./MyGroupItem.module.css";
import {IGroup} from "../../../types/types";

export interface IMyGroupItem {
    group: IGroup
}

const MyGroupItem : FC<IMyGroupItem> = ({group}) => {
    return (
        <List.Item>
            <div className={classes.GroupItemContainer}>
                <div className={classes.GroupTitle}>{group.name}</div>
                <div className={classes.GroupButtonsContainer}>
                    <MyButton className={classes.GroupButtonEdit}>Редактировать</MyButton>
                    <MyButton className={classes.GroupButtonDelete}>Удалить</MyButton>
                </div>
            </div>
        </List.Item>
    );
};

export default MyGroupItem;