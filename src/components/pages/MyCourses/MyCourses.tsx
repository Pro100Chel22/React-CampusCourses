import React from 'react';
import {useMyCourses} from "./useMyCourses";
import classes from "./MyCourses.module.css";
import FetchingResult from "../../hoc/FetchingResult";
import MyCoursesList from "../../UI/panels/MyCoursesList/MyCoursesList";

const MyCourses = () => {
    const {fetchingMyCourses} = useMyCourses();

    return (
        <div className={classes.coursesContainerWrapper}>
            <div className={classes.coursesContainer}>
                <FetchingResult error={fetchingMyCourses.error}>
                    <MyCoursesList courses={fetchingMyCourses.courses} loading={fetchingMyCourses.loading}/>
                </FetchingResult>
            </div>
        </div>
    );
};

export default MyCourses;