import React, {FC} from 'react';
import classes from './MyStudentInfo.module.css'
import {IStudent, StudentStatuses} from "../../../types/types";
import MyResultStatusStudent from "../MyResultStatusStudent/MyResultStatusStudent";
import MyButton from "../MyButton/MyButton";
import {IRolesThisCourse} from "../../pages/CourseDetail/useCourseDetail";

export interface IMyStudentInfo {
    student: IStudent;
    isLast: boolean;
    thisCourseRoles: IRolesThisCourse;
}

const MyStudentInfo: FC<IMyStudentInfo> = ({student, isLast, thisCourseRoles}) => {
    const showMarks = student.status === StudentStatuses.Accepted &&
        (!thisCourseRoles.isTeacherOrAdminThisCourse ? thisCourseRoles.userEmail === student.email : true);
    const showButtons = student.status !== StudentStatuses.Accepted;

    return (
        <div className={classes.studentMainContainer + " " + (!isLast ? classes.bottomBorder : "")}>
            <div className={classes.studentInfoContainer}>
                <div className={classes.studentName}>{student.name}</div>
                <div className={classes.studentStatus}>Статус - {student.status}</div>
                <div className={classes.studentEmail}>{student.email}</div>
            </div>
            <div className={classes.studentMarksContainer + " " + (showMarks ? "" : classes.displayNone)}>
                <div className={classes.studentMarkContainer}>
                    <p className={classes.studentMarkWrapper}>
                        <span className={thisCourseRoles.isTeacherOrAdminThisCourse? classes.resultTitle : ""}>Промежуточная аттестация</span>
                        <span> - </span>
                        <MyResultStatusStudent status={student.midtermResult}/>
                    </p>
                </div>
                <div className={classes.studentMarkContainer}>
                    <p className={classes.studentMarkWrapper}>
                        <span className={thisCourseRoles.isTeacherOrAdminThisCourse? classes.resultTitle : ""}>Финальная аттестацияя</span>
                        <span> - </span>
                        <MyResultStatusStudent status={student.finalResult}/>
                    </p>
                </div>
            </div>
            <div className={classes.buttonsContainer + " " + (showButtons ? "" : classes.displayNone)}>
                <MyButton className={classes.acceptStudentButton}>Принять</MyButton>
                <MyButton className={classes.rejectStudentButton}>Отклонить</MyButton>
            </div>
        </div>
    );
};

export default MyStudentInfo;