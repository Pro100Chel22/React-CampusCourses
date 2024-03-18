import React, {FC} from 'react';
import {Tabs} from "antd";
import MyButton from "../MyButton/MyButton";
import classes from "./MyCourseInfoTabs.module.css"
import MyNotification from "../MyNotification/MyNotification";
import {INotification} from "../../../types/types";

export interface IMyCourseInfoTabs {
    notifications: INotification[];
}

const MyCourseInfoTabs: FC<IMyCourseInfoTabs> = ({notifications}) => {
    const tabs = [
        {
            label: "Требования к курсу",
            key: "1",
            children: (<><p></p><h2><span style={{fontFamily: "monospace"}}>dlfjds</span></h2></>),
        },
        {
            label: "Аннотация",
            key: "2",
            children: (<p>Chipi Chapa1212</p>),
        },
        {
            label: "Уведомления",
            key: "3",
            children: (
                <>
                    <MyButton className={classes.createNotificationButton}>Создать уведомление</MyButton>
                    {notifications.map((item, index) => {
                        return (<MyNotification message={item.text} isImportant={item.isImportant} isLast={notifications.length - 1 === index} key={index}/>)
                    })}
                </>
            ),
        },
    ];

    return (
        <>
            <Tabs
                defaultActiveKey="1"
                type="card"
                size="large"
                items={tabs}
            />
        </>
    );
};

export default MyCourseInfoTabs;