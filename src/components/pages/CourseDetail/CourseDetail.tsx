import React from 'react';
import {useCourseDetail} from "./useCourseDetail";
import classes from './CourseDetail.module.css'
import './TabsStyles.css'
import {List, Typography} from "antd";
import MyButton from "../../UI/MyButton/MyButton";
import MyCourseInfoItem from "../../UI/MyCourseInfoItem/MyCourseInfoItem";
import MyCourseInfoTabs from "../../UI/MyCourseInfoTabs/MyCourseInfoTabs";

const {Title} = Typography;

const CourseDetail = () => {
    const {notifications} = useCourseDetail();

    return (
        <div className={classes.courseDetailContainerWrapper}>
            <div className={classes.courseDetailContainer}>
                <Title level={2}>BIGDATA: ПРОГРАММЫНЕ МЕТОДЫ С PYTHON3</Title>
                <div className={classes.courseTopContainer}>
                    <Title level={4} className={classes.title}>Основные данные курса</Title>
                    <MyButton className={classes.editButton} size="large">Редактировать</MyButton>
                </div>
                <div>
                    <List
                        className={classes.infoList}
                        bordered>
                        <List.Item className={classes.infoListItem}>
                            <MyCourseInfoItem title={"Статус курса"} value={"Открыт для записи"} flex={"1"}/>
                            <MyButton className={classes.editButton} size="large">Изменить</MyButton>
                        </List.Item>
                        <List.Item className={classes.infoListItem}>
                            <MyCourseInfoItem title={"Учебный год"} value={"2022-2023"} flex={"1"}/>
                            <MyCourseInfoItem title={"Семестр"} value={"Осенний"} flex={"1"}/>
                        </List.Item>
                        <List.Item className={classes.infoListItem}>
                            <MyCourseInfoItem title={"Всего мест"} value={"100"} flex={"1"}/>
                            <MyCourseInfoItem title={"Студентов зачислено"} value={"5"} flex={"1"}/>
                        </List.Item>
                        <List.Item className={classes.infoListItem}>
                            <MyCourseInfoItem title={"Заявок на рассмотрении"} value={"30"} flex={"1"}/>
                        </List.Item>
                    </List>
                </div>
                <div className={classes.firstTabsContainer}>
                    <MyCourseInfoTabs notifications={notifications}/>
                </div>
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