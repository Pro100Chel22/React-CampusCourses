import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {useEffect} from "react";
import {getTeachingCourses} from "../../../store/reducers/MyAndTeachingCoursesReducer/GetTeachingCoursesThunkCreator";

export const useTeachingCourses = () => {
    const fetchingTeachingCourses = useAppSelector(state => state.myAndTeachingCoursesReducer.fetchingTeachingCourses);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTeachingCourses());
    }, []);

    return {fetchingTeachingCourses};
}