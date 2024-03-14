import {useParams} from "react-router-dom";
import {useAuth} from "../../../hooks/useAuth";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {useEffect} from "react";
import {getCourses} from "../../../store/reducers/GroupCoursesReducer/GetCoursesThunkCreator";

export const useGroupCourses = () => {
    const {id} = useParams();
    const {roles} = useAuth();
    const {courses, groupName, fetchingCourses} = useAppSelector(state => state.coursesReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCourses(id ?? ""));
    }, [])

    const groupInfo = {
        groupName,
        courses,
        fetchingCourses,
    }

    return {groupInfo, roles};
}