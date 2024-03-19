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
import MyModalFormAddTeacher from "../../UI/MyModalFormAddTeacher/MyModalFormAddTeacher";

const {Title} = Typography;

const CourseDetail = () => {
    const {fetchCourse, addTeacherModal} = useCourseDetail();

    console.log("CourseDetail update!");

    return (
        <>
            <div className={classes.courseDetailContainerWrapper}>
                <div className={classes.courseDetailContainer}>
                    <LoadingLayer isLoading={fetchCourse.fetchingCourse.loading}>
                        <FetchingResult error={fetchCourse.fetchingCourse.error}>
                            <Title level={1}>{fetchCourse.courseDetails.name}</Title>
                            <div className={classes.courseTopContainer}>
                                <Title level={4} className={classes.title}>Основные данные курса</Title>
                                {fetchCourse.rolesThisCourse.isTeacherOrAdminThisCourse ?
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
                                            <MyCourseInfoItem title={"Статус курса"} value={fetchCourse.courseDetails.status.message} style={{color: fetchCourse.courseDetails.status.color}} flex={"1"}/>
                                            {fetchCourse.rolesThisCourse.isTeacherOrAdminThisCourse ?
                                                <MyButton className={classes.editButton} size="large">Изменить</MyButton>
                                                :
                                                <></>
                                            }
                                            {fetchCourse.canSignUp ?
                                                <MyButton className={classes.singUpButton} size="large">Записаться на курс</MyButton>
                                                :
                                                <></>
                                            }
                                        </div>
                                    </List.Item>
                                    <List.Item className={classes.infoListItem}>
                                        <MyCourseInfoItem title={"Учебный год"} value={fetchCourse.courseDetails.yearStart} flex={"1"}/>
                                        <MyCourseInfoItem title={"Семестр"} value={fetchCourse.courseDetails.semester.massage} flex={"1"}/>
                                    </List.Item>
                                    <List.Item className={classes.infoListItem}>
                                        <MyCourseInfoItem title={"Всего мест"} value={fetchCourse.courseDetails.maximumStudentsCount} flex={"1"}/>
                                        <MyCourseInfoItem title={"Студентов зачислено"} value={fetchCourse.courseDetails.acceptedStudents} flex={"1"}/>
                                    </List.Item>
                                    <List.Item className={classes.infoListItem}>
                                        <MyCourseInfoItem title={"Заявок на рассмотрении"} value={fetchCourse.courseDetails.inQueueStudents} flex={"1"}/>
                                    </List.Item>
                                </List>
                            </div>
                            <div className={classes.infoTabsContainer}>
                                <MyCourseInfoTabs
                                    notifications={fetchCourse.courseDetails.notifications}
                                    annotations={fetchCourse.courseDetails.annotations}
                                    requirements={fetchCourse.courseDetails.requirements}
                                    thisCourseRoles={fetchCourse.rolesThisCourse}
                                />
                            </div>
                            <div className={classes.usersTabsContainer}>
                                <MyCourseUsersTabs
                                    students={fetchCourse.courseDetails.students}
                                    teachers={fetchCourse.courseDetails.teachers}
                                    thisCourseRoles={fetchCourse.rolesThisCourse}
                                    showAddTeacherModal={addTeacherModal.showModal}
                                />
                            </div>
                        </FetchingResult>
                    </LoadingLayer>
                </div>
            </div>
            <MyModalFormAddTeacher
                isOpen={addTeacherModal.isOpen}
                cancelModalHandler={addTeacherModal.cancelModalHandler}
                onFinishHandler={addTeacherModal.onFinishHandler}
                modalForm={addTeacherModal.modalForm}
                users={addTeacherModal.users}
            />
        </>
    );
};

/* login
{
  "email": "gymboss@gachi.com",
  "password": "B0yNextD00r"
}
*/

export default CourseDetail;