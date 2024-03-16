import React, {FC} from 'react';
import MyButton from "../MyButton/MyButton";
import {List} from "antd";
import classes from "./MyGroupItem.module.css";
import {IGroup} from "../../../types/types";
import {Link} from "react-router-dom";

export interface IMyGroupItem {
    group: IGroup;
    isAdmin: boolean;
    onGroupDelete: (group: IGroup) => void;
    modalShow: (group: IGroup) => void;
    disabled: boolean;
}

const MyGroupItem: FC<IMyGroupItem> = ({group, isAdmin, onGroupDelete, disabled, modalShow}) => {
    return (
        <List.Item>
            <div className={classes.GroupItemContainer}>
                <Link to={`/groups/${group.id}`} className={classes.GroupTitle}>{group.name}</Link>
                <div className={classes.GroupButtonsContainer}>
                    {isAdmin ?
                        <>
                            <MyButton
                                className={classes.GroupButtonEdit}
                                onClick={() => modalShow(group)}
                                disabled={disabled}
                            >
                                Редактировать
                            </MyButton>
                            <MyButton
                                className={classes.GroupButtonDelete}
                                onClick={() => onGroupDelete(group)}
                                disabled={disabled}
                            >
                                Удалить
                            </MyButton>
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