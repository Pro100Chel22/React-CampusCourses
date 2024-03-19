import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getCourseDetails} from "../../../store/reducers/CourseDetailReducer/GetCourseDetailsThunkCreator";
import {semesters, statuses} from "../../consts/consts";
import {StudentStatuses} from "../../../types/types";

export const useCourseDetail = () => {
    const {course, fetchingCourse} = useAppSelector(state => state.courseDetailReducer);
    const dispatch = useAppDispatch();
    const {id} = useParams();



    const courseDetails = {
        name: course?.name ?? "",
        status: statuses[course?.status ?? "Created"],
        yearStart: course?.startYear.toString() ?? "",
        semester: semesters[course?.semester ?? "Autumn"],
        maximumStudentsCount: course?.maximumStudentsCount.toString() ?? "",
        acceptedStudents: course?.students.filter(student => student.status === StudentStatuses.Accepted).length.toString() ?? "",
        inQueueStudents: course?.students.filter(student => student.status !== StudentStatuses.InQueue).length.toString() ?? "",
        notifications: course?.notifications ?? [],
        requirements: course?.requirements ?? "",
        annotations: course?.annotations ?? "",
        students: course?.students ?? [],
        teachers: course?.teachers ?? [],
    }

    useEffect(() => {
        dispatch(getCourseDetails(id ?? ""));
    }, []);

    return {courseDetails, fetchingCourse};
}