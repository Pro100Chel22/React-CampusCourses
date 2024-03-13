import React, {FC} from 'react';
import {useGroupCourses} from "./useGroupCourses";
import classes from './GroupCourses.module.css'
import {useParams} from "react-router-dom";
import {List, Typography} from "antd";
import MyButton from "../../UI/MyButton/MyButton";
import {CourseStatuses, ICourse, Semesters} from "../../../types/types";
import MyCourseStatus from "../../UI/MyCourseStatus/MyCourseStatus";

const {Title} = Typography;

const GroupCourses: FC = () => {
    const {} = useGroupCourses();
    const {id} = useParams();

    const groupTitle = "Компьютерные науки";
    const courses: ICourse[] = [
        {
            "id": "463a337b-1171-4939-1ee0-08dc38227e68",
            "name": "С++ introduction",
            "startYear": 2000,
            "maximumStudentsCount": 144,
            "remainingSlotsCount": 143,
            "status": CourseStatuses.Started,
            "semester": Semesters.Spring
        },
        {
            "id": "535ggd7b-1171-4939-1ee0-08dc38227e46",
            "name": "Java",
            "startYear": 2060,
            "maximumStudentsCount": 14,
            "remainingSlotsCount": 13,
            "status": CourseStatuses.Created,
            "semester": Semesters.Autumn
        },
        {
            "id": "50164d56-2fad-489c-eec1-08dc3fa63f9c",
            "name": "Проверка 4",
            "startYear": 2024,
            "maximumStudentsCount": 2,
            "remainingSlotsCount": 0,
            "status": CourseStatuses.OpenForAssigning,
            "semester": Semesters.Spring
        },
        {
            "id": "a208a585-e943-4004-655a-08dc39f7f84c",
            "name": "Продвинутый Angular",
            "startYear": 2024,
            "maximumStudentsCount": 2,
            "remainingSlotsCount": 0,
            "status": CourseStatuses.Finished,
            "semester": Semesters.Autumn
        }
    ];

    console.log("GroupCourses update!");

    return (
        <>
            <div className={classes.coursesContainerWrapper}>
                <div className={classes.coursesContainer}>
                    <Title level={2}>Группа - {groupTitle}</Title>
                    <MyButton className={classes.courseButtonCreate}>Создать курс</MyButton>
                    <List
                        className={classes.coursesList}
                        bordered
                        dataSource={courses}
                        renderItem={(item) => (
                            <List.Item>
                                <div className={classes.courseContainer}>
                                    <div className={classes.courseTopContainer}>
                                        <div className={classes.courseTitle}>{item.name}</div>
                                        <div className={classes.courseStatusContainer}><MyCourseStatus status={item.status} /></div>
                                    </div>
                                    <div>
                                        <div className={classes.courseMainInfo}>Учебный год - {item.startYear}</div>
                                        <div className={classes.courseMainInfo}>Семестр {item.semester}</div>
                                        <div className={classes.courseSecondInfo}>Мест всего - {item.maximumStudentsCount}</div>
                                        <div className={classes.courseSecondInfo}>Мест свободно - {item.remainingSlotsCount}</div>
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </>
    );
};

export default GroupCourses;