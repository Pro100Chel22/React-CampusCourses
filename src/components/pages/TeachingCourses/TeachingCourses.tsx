import React from 'react';
import classes from "./TeachingCourses.module.css";
import FetchingResult from "../../hoc/FetchingResult";
import MyCoursesList from "../../UI/panels/MyCoursesList/MyCoursesList";
import {useTeachingCourses} from "./useTeachingCourses";

const TeachingCourses = () => {
    const {fetchingTeachingCourses} = useTeachingCourses();

    return (
        <div className={classes.coursesContainerWrapper}>
            <div className={classes.coursesContainer}>
                <FetchingResult error={fetchingTeachingCourses.error}>
                    <MyCoursesList courses={fetchingTeachingCourses.courses} loading={fetchingTeachingCourses.loading}/>
                </FetchingResult>
            </div>
        </div>
    );
};

export default TeachingCourses;