import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getCourseDetails} from "../../../store/reducers/CourseDetailReducer/GetCourseDetailsThunkCreator";
import {semesters, statuses} from "../../consts/consts";
import {CourseStatuses, ICourseDetails, StudentStatuses} from "../../../types/types";
import {useAuth} from "../../../hooks/useAuth";
import {useForm} from "antd/es/form/Form";
import {IFormAddTeacher} from "../../UI/MyModalFormAddTeacher/MyModalFormAddTeacher";
import {actions} from "../../../store/reducers/CourseDetailReducer/CourseDetailsSlice";
import {addTeacherToCourse} from "../../../store/reducers/CourseDetailReducer/AddTeacherToCourseThunkCreator";

export interface IRolesThisCourse {
    isTeacherOrAdminThisCourse: boolean;
    isMainTeacherOrAdminThisCourse: boolean;
    isStudentThisCourse: boolean;
    isAdmin: boolean;
    userEmail: string;
}

export const useCourseDetail = () => {
    const {course, fetchingCourse, modalAddTeacher} = useAppSelector(state => state.courseDetailReducer);
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const {roles, profile} = useAuth();
    const [addTeacherModalForm] = useForm<IFormAddTeacher>();

    const rolesThisCourse: IRolesThisCourse = {
        isTeacherOrAdminThisCourse: !!course?.teachers.find(teacher => teacher.email === profile?.email) || roles.isAdmin,
        isMainTeacherOrAdminThisCourse: !!course?.teachers.find(teacher => teacher.email === profile?.email && teacher.isMain) || roles.isAdmin,
        isStudentThisCourse: !!course?.students.find(student => student.email === profile?.email),
        isAdmin: roles.isAdmin,
        userEmail: profile?.email ?? "",
    }
    const fetchCourse = {
        canSignUp: course?.status === CourseStatuses.OpenForAssigning && !rolesThisCourse.isStudentThisCourse,
        courseDetails: courseToCourseDetail(course),
        rolesThisCourse,
        fetchingCourse,
    }

    const addTeacherModal = {
        showModal() {
            addTeacherModalForm.resetFields();
            dispatch(actions.setCourseCreationModal({isOpen: true}));
        },
        cancelModalHandler: () => {
            dispatch(actions.setCourseCreationModal({isOpen: false}));
        },
        onFinishHandler: (values: IFormAddTeacher) => {
            console.log(values.teacherId);
            dispatch(addTeacherToCourse({courseId: id ?? "", userId: values.teacherId}))
        },
        modalForm: addTeacherModalForm,
        users: fetchingCourse.usersForAddTeacher,
        isOpen: modalAddTeacher.isOpen,
    }

    useEffect(() => {
        dispatch(getCourseDetails({courseId: id ?? "", loadUsers: rolesThisCourse.isMainTeacherOrAdminThisCourse}));
    }, []);

    return {fetchCourse, addTeacherModal};
}

const courseToCourseDetail = (course: ICourseDetails | null) => {
     return {
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
}