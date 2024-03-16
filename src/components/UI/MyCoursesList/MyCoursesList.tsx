import React, {FC} from 'react';
import classes from './MyCoursesList.module.css';
import {List} from "antd";
import MyCourseStatus from "../MyCourseStatus/MyCourseStatus";
import {ICourse} from "../../../types/types";
import {semesters} from "../../consts/consts";

export interface IMyCoursesList {
    courses: ICourse [];
}

const MyCoursesList: FC<IMyCoursesList> = ({courses}) => {
    return (
        <>
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
                            <div className={classes.courseInfoWrapper}>
                                <div className={classes.courseMainInfo}>Учебный год - {item.startYear}</div>
                                <div className={classes.courseMainInfo}>Семестр - {semesters[item.semester].massage}</div>
                                <div className={classes.courseSecondInfo}>Мест всего - {item.maximumStudentsCount}</div>
                                <div className={classes.courseSecondInfo}>Мест свободно - {item.remainingSlotsCount}</div>
                            </div>
                        </div>
                    </List.Item>
                )}

            >
                {courses.length === 0 ?
                    <List.Item>
                        <div className={classes.noCoursesContainer}>
                            <div className={classes.noCourses}>В этой группе еще нет курсов</div>
                        </div>
                    </List.Item>
                    :
                    <></>
                }
            </List>
        </>
    );
};

export default MyCoursesList;