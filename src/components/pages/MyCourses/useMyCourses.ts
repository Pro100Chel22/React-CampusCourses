import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {useEffect} from "react";
import {getMyCourses} from "../../../store/reducers/MyAndTeachingCoursesReducer/GetMyCoursesThunkCreator";

export const useMyCourses = () => {
    const fetchingMyCourses = useAppSelector(state => state.myAndTeachingCoursesReducer.fetchingMyCourses);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getMyCourses());
    }, []);

    return {fetchingMyCourses};
}