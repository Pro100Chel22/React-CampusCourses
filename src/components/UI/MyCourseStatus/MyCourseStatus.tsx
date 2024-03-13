import React, {FC} from 'react';
import {CourseStatuses} from "../../../types/types";
import classes from './MyCourseStatus.module.css'
import {Tag} from "antd";

export interface IMyCourseStatus {
    status: CourseStatuses
}

const MyCourseStatus: FC<IMyCourseStatus> = ({status}) => {
    const statuses = {
        [CourseStatuses.Started]: {color: "#108ee9", message: "В процессе обучения"},
        [CourseStatuses.Finished]: {color: "#f50", message: "Закрыт"},
        [CourseStatuses.OpenForAssigning]: {color: "#87d068", message: "Открыт для записи"},
        [CourseStatuses.Created]: {color: "#939393", message: "Создан"},
    }

    return (<div><Tag color={statuses[status].color} className={classes.tag}>{statuses[status].message}</Tag></div>);
};

export default MyCourseStatus;