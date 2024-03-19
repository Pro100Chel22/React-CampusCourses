import React, {FC} from 'react';
import classes from "./MyResultStatusStudent.module.css";
import {StudentMarks} from "../../../types/types";
import {marks} from "../../consts/consts";
import {Tag} from "antd";

export interface IMyResultStatusStudent {
    status: StudentMarks;
}

const MyResultStatusStudent: FC<IMyResultStatusStudent> = ({status}) => {
    return (<Tag color={marks[status].color} className={classes.tag}>{marks[status].message}</Tag>);
};

export default MyResultStatusStudent;