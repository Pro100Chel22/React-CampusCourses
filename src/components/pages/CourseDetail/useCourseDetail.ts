import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getCourseDetails} from "../../../store/reducers/CourseDetailReducer/GetCourseDetailsThunkCreator";
import {semesters, statuses} from "../../consts/consts";
import {CourseStatuses, StudentStatuses} from "../../../types/types";
import {useAuth} from "../../../hooks/useAuth";

export interface IRolesThisCourse {
    isTeacherOrAdminThisCourse: boolean;
    isMainTeacherOrAdminThisCourse: boolean;
    isStudentThisCourse: boolean;
    isAdmin: boolean;
    userEmail: string;
}

export const useCourseDetail = () => {
    const {course, fetchingCourse} = useAppSelector(state => state.courseDetailReducer);
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const {roles, profile} = useAuth();

    const isTeacherOrAdminThisCourse = !!course?.teachers.find(teacher => teacher.email === profile?.email) || roles.isAdmin;
    const isMainTeacherOrAdminThisCourse = !!course?.teachers.find(teacher => teacher.email === profile?.email && teacher.isMain) || roles.isAdmin;
    const isStudentThisCourse = !!course?.students.find(student => student.email === profile?.email);
    const rolesThisCourse : IRolesThisCourse = {
        isTeacherOrAdminThisCourse,
        isMainTeacherOrAdminThisCourse,
        isStudentThisCourse,
        isAdmin: roles.isAdmin,
        userEmail: profile?.email ?? "",
    }

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

    const canSignUp = course?.status === CourseStatuses.OpenForAssigning && !rolesThisCourse.isStudentThisCourse;

    useEffect(() => {
        dispatch(getCourseDetails(id ?? ""));
    }, []);

    return {courseDetails, fetchingCourse, rolesThisCourse, canSignUp};
}