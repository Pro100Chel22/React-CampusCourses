import React, {FC} from 'react';
import {Tabs} from "antd";
import './MyCourseUsersTabs.css'
import {IStudent, ITeacher, StudentMarks} from "../../../../types/types";
import MyTeacherInfo from "../../listItems/MyTeacherInfo/MyTeacherInfo";
import classes from "./MyCourseUsersTabs.module.css";
import MyButton from "../../others/MyButton/MyButton";
import MyStudentInfo from "../../listItems/MyStudentInfo/MyStudentInfo";
import {IRolesThisCourse} from "../../../pages/CourseDetail/useCourseDetail";

export interface IMyCourseUsersTabs {
    students: IStudent[];
    teachers: ITeacher[];
    thisCourseRoles: IRolesThisCourse;
    showAddTeacherModal: any;
    showFinalMarkModal: (studentId: string, currentMark: StudentMarks) => void;
    showMidtermMarkModal: (studentId: string, currentMark: StudentMarks) => void;
    acceptStudent: (courseId: string, studentId: string) => void;
    declineStudent: (courseId: string, studentId: string) => void;
    editingStudentStatus: boolean;
    courseId: string;
}

const MyCourseUsersTabs: FC<IMyCourseUsersTabs> = ({
    students,
    teachers,
    thisCourseRoles,
    showAddTeacherModal,
    showMidtermMarkModal,
    showFinalMarkModal,
    acceptStudent,
    editingStudentStatus,
    declineStudent,
    courseId
}) => {
    const tabs = [
        {
            label: "Преподаватели",
            key: "1",
            children: (
                <>
                    {thisCourseRoles.isMainTeacherOrAdminThisCourse ?
                        <MyButton className={classes.addTeacherButton} onClick={showAddTeacherModal}>Добавить
                            преподавателя</MyButton>
                        :
                        <></>
                    }
                    {teachers.map((teacher, index) =>
                        <MyTeacherInfo teacher={teacher} isLast={index === teachers.length - 1} key={index}/>)}
                </>
            ),
        },
        {
            label: "Студенты",
            key: "2",
            children: (
                <>
                    {students.map((student, index) =>
                        <MyStudentInfo
                            student={student}
                            isLast={index === students.length - 1}
                            thisCourseRoles={thisCourseRoles}
                            key={index}
                            showFinalMarkModal={showFinalMarkModal}
                            showMidtermMarkModal={showMidtermMarkModal}
                            acceptStudent={acceptStudent}
                            declineStudent={declineStudent}
                            editingStudentStatus={editingStudentStatus}
                            courseId={courseId}
                        />)}
                    {students.length === 0 ?
                        <div className={classes.noStudents}>В этом курсе еще нет студентов</div>
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
                className={"myCourseUsersTabs"}
            />
        </>
    );
};

export default MyCourseUsersTabs;