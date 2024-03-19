import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getCourseDetails} from "../../../store/reducers/CourseDetailReducer/GetCourseDetailsThunkCreator";
import {semesters, statuses} from "../../consts/consts";
import {CourseStatuses, ICourseDetails, StudentStatuses} from "../../../types/types";
import {useAuth} from "../../../hooks/useAuth";
import {useForm} from "antd/es/form/Form";
import {IFormAddTeacher} from "../../UI/modals/MyModalFormAddTeacher/MyModalFormAddTeacher";
import {actions, courseModalType} from "../../../store/reducers/CourseDetailReducer/CourseDetailsSlice";
import {addTeacherToCourse} from "../../../store/reducers/CourseDetailReducer/AddTeacherToCourseThunkCreator";
import {IFormCreateNotification} from "../../UI/modals/MyModalFormCreateNotification/MyModalFormCreateNotification";
import {createNotificationCourse} from "../../../store/reducers/CourseDetailReducer/CreateNotificationThunkCreator";
import {IFormChangeStatus} from "../../UI/modals/MyModalFormChangeStatus/MyModalFormChangeStatus";
import {
    changeStatusCourse
} from "../../../store/reducers/CourseDetailReducer/ChangeStatusThunkCreator";
import {deleteCourseDetail} from "../../../store/reducers/CourseDetailReducer/DeleteCourseThunkCreator";

export interface IRolesThisCourse {
    isTeacherOrAdminThisCourse: boolean;
    isMainTeacherOrAdminThisCourse: boolean;
    isStudentThisCourse: boolean;
    isAdmin: boolean;
    userEmail: string;
}

export const useCourseDetail = () => {
    const {course, fetchingCourse, modal} = useAppSelector(state => state.courseDetailReducer);
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const {roles, profile} = useAuth();
    const [addTeacherModalForm] = useForm<IFormAddTeacher>();
    const [creatNotificationModalForm] = useForm<IFormCreateNotification>();
    const [changeStatusModalForm] = useForm<IFormChangeStatus>();
    let navigate = useNavigate();

    const rolesThisCourse: IRolesThisCourse = {
        isTeacherOrAdminThisCourse: !!course?.teachers.find(teacher => teacher.email === profile?.email) || roles.isAdmin,
        isMainTeacherOrAdminThisCourse: !!course?.teachers.find(teacher => teacher.email === profile?.email && teacher.isMain) || roles.isAdmin,
        isStudentThisCourse: !!course?.students.find(student => student.email === profile?.email),
        isAdmin: roles.isAdmin,
        userEmail: profile?.email ?? "",
    }
    const fetchCourse = {
        canSignUp: course?.status === CourseStatuses.OpenForAssigning && !rolesThisCourse.isStudentThisCourse && !rolesThisCourse.isTeacherOrAdminThisCourse,
        courseDetails: courseToCourseDetail(course),
        rolesThisCourse,
        fetchingCourse,
    }
    const addTeacherModal = {
        showModal() {
            addTeacherModalForm.resetFields();
            dispatch(actions.setCourseCreationModal({modalTypeOpen: courseModalType.addTeacher}));
        },
        cancelModalHandler: () => {
            dispatch(actions.setCourseCreationModal({modalTypeOpen: null}));
        },
        onFinishHandler: (values: IFormAddTeacher) => {
            console.log(values.teacherId);
            dispatch(addTeacherToCourse({courseId: id ?? "", userId: values.teacherId}))
        },
        modalForm: addTeacherModalForm,
        users: fetchingCourse.usersForAddTeacher,
    }
    const creatNotification = {
        showModal() {
            creatNotificationModalForm.resetFields();
            dispatch(actions.setCourseCreationModal({modalTypeOpen: courseModalType.createNotification}));
        },
        cancelModalHandler: () => {
            dispatch(actions.setCourseCreationModal({modalTypeOpen: null}));
        },
        onFinishHandler: (values: IFormCreateNotification) => {
            console.log(values);
            dispatch(createNotificationCourse({courseId: id ?? "", notification: values}))
        },
        modalForm: creatNotificationModalForm,
    }
    const changeCourseStatus = {
        showModal() {
            dispatch(actions.setCourseCreationModal({modalTypeOpen: courseModalType.changeCourseStatus}));
        },
        cancelModalHandler: () => {
            changeStatusModalForm.resetFields();
            dispatch(actions.setCourseCreationModal({modalTypeOpen: null}));
        },
        onFinishHandler: (values: IFormChangeStatus) => {
            console.log(values);
            dispatch(changeStatusCourse({courseId: id ?? "", status: values.status}));
        },
        modalForm: changeStatusModalForm,
        startValue: course?.status ?? CourseStatuses.Created,
    }

    const redirect = () => {
        navigate("/groups");
    }
    const deleteCourse = () => {
        dispatch(deleteCourseDetail({courseId: id ?? "", callbackRedirect: redirect}))
    }

    useEffect(() => {
        dispatch(getCourseDetails({courseId: id ?? "", loadUsers: rolesThisCourse.isMainTeacherOrAdminThisCourse}));
    }, []);

    return {fetchCourse, addTeacherModal, creatNotification, changeCourseStatus, deleteCourse, modalTypeOpen: modal.modalTypeOpen,};
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