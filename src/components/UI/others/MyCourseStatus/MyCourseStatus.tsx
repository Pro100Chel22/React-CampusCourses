import React, {FC} from 'react';
import {CourseStatuses} from "../../../../types/types";
import classes from './MyCourseStatus.module.css'
import {Tag} from "antd";
import {statuses} from "../../../consts/consts";

export interface IMyCourseStatus {
    status: CourseStatuses
}

const MyCourseStatus: FC<IMyCourseStatus> = ({status}) => {
    return (<div><Tag color={statuses[status].color} className={classes.tag}>{statuses[status].message}</Tag></div>);
};

export default MyCourseStatus;