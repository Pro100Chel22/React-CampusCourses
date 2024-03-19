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
import MyCourseUsersTabs from "../../UI/MyCourseUsersTabs/MyCourseUsersTabs";

const {Title} = Typography;

const CourseDetail = () => {
    const {courseDetails, fetchingCourse, rolesThisCourse, canSignUp} = useCourseDetail();

    console.log("CourseDetail update!");

    return (
        <div className={classes.courseDetailContainerWrapper}>
            <div className={classes.courseDetailContainer}>
                <LoadingLayer isLoading={fetchingCourse.loading}>
                    <FetchingResult error={fetchingCourse.error}>
                        <Title level={2}>{courseDetails.name}</Title>
                        <div className={classes.courseTopContainer}>
                            <Title level={4} className={classes.title}>Основные данные курса</Title>
                            {rolesThisCourse.isTeacherOrAdminThisCourse ?
                                <MyButton className={classes.editButton} size="large">Редактировать</MyButton>
                                :
                                <></>
                            }
                        </div>
                        <div>
                            <List
                                className={classes.infoList}
                                bordered>
                                <List.Item className={classes.infoListItem}>
                                    <div className={classes.topInfoListItem}>
                                        <MyCourseInfoItem title={"Статус курса"} value={courseDetails.status.message} style={{color: courseDetails.status.color}} flex={"1"}/>
                                        {rolesThisCourse.isTeacherOrAdminThisCourse ?
                                            <MyButton className={classes.editButton} size="large">Изменить</MyButton>
                                            :
                                            <></>
                                        }
                                        {canSignUp ?
                                            <MyButton className={classes.singUpButton} size="large">Записаться на курс</MyButton>
                                            :
                                            <></>
                                        }
                                    </div>
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
                        <div className={classes.infoTabsContainer}>
                            <MyCourseInfoTabs
                                notifications={courseDetails.notifications}
                                annotations={courseDetails.annotations}
                                requirements={courseDetails.requirements}
                                thisCourseRoles={rolesThisCourse}
                            />
                        </div>
                        <div className={classes.usersTabsContainer}>
                            <MyCourseUsersTabs
                                students={courseDetails.students}
                                teachers={courseDetails.teachers}
                                thisCourseRoles={rolesThisCourse}
                            />
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