import React, {FC} from 'react';
import classes from './MyTeacherInfo.module.css'
import {ITeacher} from "../../../../types/types";
import {Tag} from "antd";

export interface IMyTeacherInfo {
    teacher: ITeacher;
    isLast: boolean;
}

const MyTeacherInfo: FC<IMyTeacherInfo> = ({teacher, isLast}) => {
    return (
        <div className={classes.teacherInfoContainer + " " + (!isLast ? classes.bottomBorder : "")}>
            <div className={classes.topTeacherInfoContainer}>
                <div className={classes.teacherName}>
                    {teacher.name}
                </div>
                {teacher.isMain ?
                    <div className={classes.teacherRole}><Tag color="green-inverse">Основной</Tag></div>
                    :
                    <></>
                }
            </div>
            <div className={classes.bottomTeacherInfoContainer}>
                <div className={classes.teacherEmail}>
                    {teacher.email}
                </div>
            </div>
        </div>
    );
};

export default MyTeacherInfo;