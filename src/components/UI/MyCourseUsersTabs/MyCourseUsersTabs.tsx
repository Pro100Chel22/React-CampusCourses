import React, {FC} from 'react';
import {Tabs} from "antd";
import './MyCourseUsersTabs.css'
import {IStudent, ITeacher} from "../../../types/types";
import MyTeacherInfo from "../MyTeacherInfo/MyTeacherInfo";
import classes from "./MyCourseUsersTabs.module.css";
import MyButton from "../MyButton/MyButton";
import MyStudentInfo from "../MyStudentInfo/MyStudentInfo";
import {IRolesThisCourse} from "../../pages/CourseDetail/useCourseDetail";

export interface IMyCourseUsersTabs {
    students: IStudent[];
    teachers: ITeacher[];
    thisCourseRoles: IRolesThisCourse;
}

const MyCourseUsersTabs: FC<IMyCourseUsersTabs> = ({students, teachers, thisCourseRoles}) => {
    const tabs = [
        {
            label: "Преподаватели",
            key: "1",
            children: (
                <>
                    {thisCourseRoles.isMainTeacherOrAdminThisCourse ?
                        <MyButton className={classes.addTeacherButton}>Добавить преподавателя</MyButton>
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
                        <MyStudentInfo student={student} isLast={index === students.length - 1} thisCourseRoles={thisCourseRoles} key={index}/>)}
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