import React, {FC} from 'react';
import {useGroupCourses} from "./useGroupCourses";
import classes from './GroupCourses.module.css'
import {Typography} from "antd";
import MyButton from "../../UI/MyButton/MyButton";
import FetchingResult from "../../hoc/FetchingResult";
import LoadingLayer from "../../hoc/LoadingLayer";
import MyCoursesList from "../../UI/MyCoursesList/MyCoursesList";
import MyModalFormGroupCreation from "../../UI/modals/MyModalFormGroupCreation/MyModalFormGroupCreation";

const {Title} = Typography;

const GroupCourses: FC = () => {
    const {modalCourseCreation, showCourseCreationModal, formCourseCreation, courseCreationOnFinishHandler, cancelCourseCreationModalHandler, groupInfo, roles} = useGroupCourses();

    console.log("GroupCoursesReducer update!");

    return (
        <>
            <div className={classes.coursesContainerWrapper}>
                <div className={classes.coursesContainer}>
                    <LoadingLayer isLoading={groupInfo.fetchingCourses.loading}>
                        <FetchingResult error={groupInfo.fetchingCourses.error}>
                            <Title level={2}>Группа - {groupInfo.groupName}</Title>
                            {roles.isAdmin ?
                                <MyButton className={classes.courseButtonCreate} onClick={showCourseCreationModal}>Создать курс</MyButton>
                                :
                                <></>
                            }
                            <MyCoursesList courses={groupInfo.courses}/>
                        </FetchingResult>
                    </LoadingLayer>
                </div>
            </div>
            <MyModalFormGroupCreation
                modalCourseCreation={modalCourseCreation}
                cancelModalHandler={cancelCourseCreationModalHandler}
                courseOnFinishHandler={courseCreationOnFinishHandler}
                modalForm={formCourseCreation}
            />
        </>
    );
};

export default GroupCourses;