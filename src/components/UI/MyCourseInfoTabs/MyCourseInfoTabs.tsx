import React, {FC} from 'react';
import {Tabs} from "antd";
import MyButton from "../MyButton/MyButton";
import classes from "./MyCourseInfoTabs.module.css"
import MyNotification from "../MyNotification/MyNotification";
import {INotification} from "../../../types/types";
// @ts-ignore
import ReactHtmlParser from 'html-react-parser';

export interface IMyCourseInfoTabs {
    notifications: INotification[];
    requirements: string;
    annotations: string;
}

const MyCourseInfoTabs: FC<IMyCourseInfoTabs> = ({notifications, requirements, annotations}) => {
    const tabs = [
        {
            label: "Требования к курсу",
            key: "1",
            children: ReactHtmlParser(requirements),
        },
        {
            label: "Аннотация",
            key: "2",
            children: ReactHtmlParser(annotations),
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
                    {notifications.length === 0 ?
                        <div className={classes.noNotification}>Уведомлений пока что нет</div>
                        :
                        <></>
                    }
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