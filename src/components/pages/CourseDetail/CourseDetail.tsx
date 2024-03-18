import React from 'react';
import {useCourseDetail} from "./useCourseDetail";
import classes from './CourseDetail.module.css'
import './TabsStyles.css'
import {List, Typography} from "antd";
import MyButton from "../../UI/MyButton/MyButton";
import MyCourseInfoItem from "../../UI/MyCourseInfoItem/MyCourseInfoItem";
import MyCourseInfoTabs from "../../UI/MyCourseInfoTabs/MyCourseInfoTabs";
import FetchingResult from '../../hoc/FetchingResult';
import LoadingLayer from '../../hoc/LoadingLayer';

const {Title} = Typography;

const CourseDetail = () => {
    const {courseDetails, fetchingCourse} = useCourseDetail();

    console.log("CourseDetail update!");

    return (
        <div className={classes.courseDetailContainerWrapper}>
            <div className={classes.courseDetailContainer}>
                <LoadingLayer isLoading={fetchingCourse.loading}>
                    <FetchingResult error={fetchingCourse.error}>
                        <Title level={2}>{courseDetails.name}</Title>
                        <div className={classes.courseTopContainer}>
                            <Title level={4} className={classes.title}>Основные данные курса</Title>
                            <MyButton className={classes.editButton} size="large">Редактировать</MyButton>
                        </div>
                        <div>
                            <List
                                className={classes.infoList}
                                bordered>
                                <List.Item className={classes.infoListItem}>
                                    <MyCourseInfoItem title={"Статус курса"} value={courseDetails.status.message} style={{color: courseDetails.status.color}} flex={"1"}/>
                                    <MyButton className={classes.editButton} size="large">Изменить</MyButton>
                                </List.Item>
                                <List.Item className={classes.infoListItem}>
                                    <MyCourseInfoItem title={"Учебный год"} value={courseDetails.yearStart} flex={"1"}/>
                                    <MyCourseInfoItem title={"Семестр"} value={courseDetails.semester.massage} flex={"1"}/>
                                </List.Item>
                                <List.Item className={classes.infoListItem}>
                                    <MyCourseInfoItem title={"Всего мест"} value={courseDetails.maximumStudentsCount} flex={"1"}/>
                                    <MyCourseInfoItem title={"Студентов зачислено"} value={courseDetails.acceptedStudents} flex={"1"}/>
                                </List.Item>
                                <List.Item className={classes.infoListItem}>
                                    <MyCourseInfoItem title={"Заявок на рассмотрении"} value={courseDetails.inQueueStudents} flex={"1"}/>
                                </List.Item>
                            </List>
                        </div>
                        <div className={classes.firstTabsContainer}>
                            <MyCourseInfoTabs notifications={courseDetails.notifications} annotations={courseDetails.annotations} requirements={courseDetails.requirements}/>
                        </div>
                    </FetchingResult>
                </LoadingLayer>
            </div>
        </div>
    );
};

/* login
{
  "email": "gymboss@gachi.com",
  "password": "B0yNextD00r"
}
*/

export default CourseDetail;