import React, {FC} from 'react';
import classes from './MyStudentInfo.module.css'
import {IStudent, StudentStatuses} from "../../../types/types";
import MyResultStatusStudent from "../MyResultStatusStudent/MyResultStatusStudent";
import MyButton from "../MyButton/MyButton";

export interface IMyStudentInfo {
    student: IStudent;
    isLast: boolean;
}

const MyStudentInfo: FC<IMyStudentInfo> = ({student, isLast}) => {
    return (
        <div className={classes.studentMainContainer + " " + (!isLast ? classes.bottomBorder : "")}>
            <div className={classes.studentInfoContainer}>
                <div className={classes.studentName}>{student.name}</div>
                <div className={classes.studentStatus}>Статус - {student.status}</div>
                <div className={classes.studentEmail}>{student.email}</div>
            </div>
            <div className={classes.studentMarksContainer + " " + (student.status === StudentStatuses.Accepted ? "" : classes.displayNone)}>
                <div className={classes.studentMarkContainer}>
                    <p className={classes.studentMarkWrapper}>
                        <span className={classes.resultTitle}>Промежуточная аттестация</span>
                        <span> - </span>
                        <MyResultStatusStudent status={student.midtermResult}/>
                    </p>
                </div>
                <div className={classes.studentMarkContainer}>
                    <p className={classes.studentMarkWrapper}>
                        <span className={classes.resultTitle}>Финальная аттестацияя</span>
                        <span> - </span>
                        <MyResultStatusStudent status={student.finalResult}/>
                    </p>
                </div>
            </div>
            <div className={classes.buttonsContainer + " " + (student.status !== StudentStatuses.Accepted ? "" : classes.displayNone)}>
                <MyButton className={classes.acceptStudentButton}>Принять</MyButton>
                <MyButton className={classes.rejectStudentButton}>Отклонить</MyButton>
            </div>
        </div>
    );
};

export default MyStudentInfo;