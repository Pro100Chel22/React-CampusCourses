import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getCourseDetails} from "../../../store/reducers/CourseDetailReducer/GetCourseDetailsThunkCreator";
import {semesters, statuses} from "../../consts/consts";
import {CourseStatuses, ICourseDetails, MarkType, StudentMarks, StudentStatuses} from "../../../types/types";
import {useAuth} from "../../../hooks/useAuth";
import {useForm} from "antd/es/form/Form";
import {IFormAddTeacher} from "../../UI/modals/MyModalFormAddTeacher/MyModalFormAddTeacher";
import {actions, courseModalType} from "../../../store/reducers/CourseDetailReducer/CourseDetailsSlice";
import {addTeacherToCourse} from "../../../store/reducers/CourseDetailReducer/AddTeacherToCourseThunkCreator";
import {IFormCreateNotification} from "../../UI/modals/MyModalFormCreateNotification/MyModalFormCreateNotification";
import {createNotificationCourse} from "../../../store/reducers/CourseDetailReducer/CreateNotificationThunkCreator";
import {IFormChangeStatus} from "../../UI/modals/MyModalFormChangeStatus/MyModalFormChangeStatus";
import {changeStatusCourse} from "../../../store/reducers/CourseDetailReducer/ChangeStatusThunkCreator";
import {deleteCourseDetail} from "../../../store/reducers/CourseDetailReducer/DeleteCourseThunkCreator";
import {IFormEditStudentMarks} from "../../UI/modals/MyModalFormEditStudentMarks/MyModalFormEditStudentMarks";
import {editStudentMark} from "../../../store/reducers/CourseDetailReducer/EditStudentMarkThunkCreator";
import {editStudentStatus} from "../../../store/reducers/CourseDetailReducer/EditStudentStatusThunkCreator";
import {signUpToCourse} from "../../../store/reducers/CourseDetailReducer/SignUpToCourseThunkCreator";
import {ICourseFormForTeacherValues} from "../../UI/others/MyCourseFormForTeacher/MyCourseFormForTeacher";
import {ICourseFormValues} from "../../UI/others/MyCourseForm/MyCourseForm";
import {editCourseInfo} from "../../../store/reducers/CourseDetailReducer/EditCourseInfoThunkCreator";

export interface IRolesThisCourse {
    isTeacherOrAdminThisCourse: boolean;
    isMainTeacherOrAdminThisCourse: boolean;
    isStudentThisCourse: boolean;
    isOnlyTeacherThisCourse: boolean;
    isAdmin: boolean;
    userEmail: string;
}

export const useCourseDetail = () => {
    const {
        course,
        fetchingCourse,
        modal,
        editingStudentMark,
        editingStudentStatus,
        myCourse,
        signUpingToCourse,
    } = useAppSelector(state => state.courseDetailReducer);
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const {roles, profile} = useAuth();
    const [addTeacherModalForm] = useForm<IFormAddTeacher>();
    const [creatNotificationModalForm] = useForm<IFormCreateNotification>();
    const [changeStatusModalForm] = useForm<IFormChangeStatus>();
    const [editMarkModalForm] = useForm<IFormEditStudentMarks>();
    const [editCourseModalForm] = useForm<ICourseFormValues>();
    const [editCourseForTeacherModalForm] = useForm<ICourseFormForTeacherValues>();
    const navigate = useNavigate();

    let isFirstCall = true;
    const setFieldsCallback = () => {
        if (rolesThisCourse.isAdmin) {
            editCourseModalForm.setFieldsValue({
                name: course?.name,
                startYear: course?.startYear,
                maximumStudentsCount: course?.maximumStudentsCount,
                semester: course?.semester,
                requirements: course?.requirements,
                annotations: course?.annotations,
            });
        } else {
            editCourseForTeacherModalForm.setFieldsValue({
                annotations: course?.annotations,
                requirements: course?.requirements,
            });
        }
    };

    const rolesThisCourse: IRolesThisCourse = {
        isTeacherOrAdminThisCourse: !!course?.teachers.find(teacher => teacher.email === profile?.email) || roles.isAdmin,
        isMainTeacherOrAdminThisCourse: !!course?.teachers.find(teacher => teacher.email === profile?.email && teacher.isMain) || roles.isAdmin,
        isStudentThisCourse: !!myCourse.find(course => course.id === id),
        isOnlyTeacherThisCourse: !!course?.teachers.find(teacher => teacher.email === profile?.email),
        isAdmin: roles.isAdmin,
        userEmail: profile?.email ?? "",
    }
    const fetchCourse = {
        canSignUp: course?.status === CourseStatuses.OpenForAssigning && !rolesThisCourse.isStudentThisCourse && !rolesThisCourse.isOnlyTeacherThisCourse,
        courseDetails: courseToCourseDetail(course),
        rolesThisCourse,
        fetchingCourse,
    }
    const addTeacherModal = {
        showModal() {
            addTeacherModalForm.resetFields();
            dispatch(actions.setCourseModal({modalTypeOpen: courseModalType.addTeacher}));
        },
        cancelModalHandler: () => {
            dispatch(actions.setCourseModal({modalTypeOpen: null}));
        },
        onFinishHandler: (values: IFormAddTeacher) => {
            dispatch(addTeacherToCourse({courseId: id ?? "", userId: values.teacherId}))
        },
        modalForm: addTeacherModalForm,
        users: fetchingCourse.usersForAddTeacher,
    }
    const creatNotification = {
        showModal() {
            creatNotificationModalForm.resetFields();
            dispatch(actions.setCourseModal({modalTypeOpen: courseModalType.createNotification}));
        },
        cancelModalHandler: () => {
            dispatch(actions.setCourseModal({modalTypeOpen: null}));
        },
        onFinishHandler: (values: IFormCreateNotification) => {
            console.log(values);
            dispatch(createNotificationCourse({courseId: id ?? "", notification: values}))
        },
        modalForm: creatNotificationModalForm,
    }
    const changeCourseStatus = {
        showModal() {
            dispatch(actions.setCourseModal({modalTypeOpen: courseModalType.changeCourseStatus}));
        },
        cancelModalHandler: () => {
            changeStatusModalForm.resetFields();
            dispatch(actions.setCourseModal({modalTypeOpen: null}));
        },
        onFinishHandler: (values: IFormChangeStatus) => {
            dispatch(changeStatusCourse({courseId: id ?? "", status: values.status}));
        },
        modalForm: changeStatusModalForm,
        startValue: course?.status ?? CourseStatuses.Created,
    }
    const editMark = {
        showFinalMarkModal (studentId: string, currentMark: StudentMarks) {
            editMarkModalForm.setFieldValue('mark', currentMark);
            dispatch(actions.setEditMarkModal({markType: MarkType.Final, studentId, currentMark}));
        },
        showMidtermMarkModal (studentId: string, currentMark: StudentMarks) {
            editMarkModalForm.setFieldValue('mark', currentMark);
            dispatch(actions.setEditMarkModal({markType: MarkType.Midterm, studentId, currentMark}));
        },
        cancelModalHandler: () => {
            dispatch(actions.setEditMarkModal({markType: null, studentId: "", currentMark: null}));
        },
        onFinishHandler: (values: IFormEditStudentMarks) => {
            dispatch(editStudentMark({
                courseId: id ?? "",
                studentId: editingStudentMark.studentId,
                mark: {markType: editingStudentMark.markType ?? MarkType.Final, mark: values.mark}
            }));
        },
        modalForm: editMarkModalForm,
        startValue: editingStudentMark.lastMark,
    }
    const editStatus = {
        acceptStudent: (courseId: string, studentId: string) => {
            dispatch(editStudentStatus({status: StudentStatuses.Accepted, courseId, studentId}));
        },
        declineStudent: (courseId: string, studentId: string) => {
            dispatch(editStudentStatus({status: StudentStatuses.Declined, courseId, studentId}));
        },
        loading: editingStudentStatus.loading,
        courseId: id ?? "",
    };
    const signUp = {
        do: () => {
            dispatch(signUpToCourse(id ?? ""));
        },
        loading: signUpingToCourse.loading,
    }
    const editCourse = {
        showModal() {
            if (!isFirstCall) setFieldsCallback();
            isFirstCall = false;
            dispatch(actions.setCourseModal({modalTypeOpen: courseModalType.editCourse}));
        },
        cancelModalHandler: () => {
            dispatch(actions.setCourseModal({modalTypeOpen: null}));
        },
        onFinishHandler: (values: ICourseFormForTeacherValues) => {
            dispatch(editCourseInfo({courseId: id ?? "", courseInfo: values, isForTeacher: false}));
        },
        onFinishHandlerForTeacher: (values: ICourseFormValues) => {
            dispatch(editCourseInfo({courseId: id ?? "", courseInfo: values, isForTeacher: true}));
        },
        setFieldsCallback,
        modal: modal,
        modalForm: editCourseModalForm,
        modalFormForTeacher: editCourseForTeacherModalForm,
        isForTeacher: !rolesThisCourse.isAdmin,
    }

    const deleteCourse = () => {
        dispatch(deleteCourseDetail({courseId: id ?? "", callbackRedirect: () => { navigate("/groups"); }}))
    };

    useEffect(() => {
        dispatch(getCourseDetails({courseId: id ?? "", loadUsers: rolesThisCourse.isMainTeacherOrAdminThisCourse}));
    }, [rolesThisCourse.isMainTeacherOrAdminThisCourse]);

    return {fetchCourse, addTeacherModal, creatNotification, changeCourseStatus, editMark, editStatus, signUp, editCourse, deleteCourse, modalTypeOpen: modal.modalTypeOpen, requirements: course?.requirements};
}

const courseToCourseDetail = (course: ICourseDetails | null) => {
     return {
        name: course?.name ?? "",
        status: statuses[course?.status ?? "Created"],
        yearStart: course?.startYear.toString() ?? "",
        semester: semesters[course?.semester ?? "Autumn"],
        maximumStudentsCount: course?.maximumStudentsCount.toString() ?? "",
        acceptedStudents: course?.students.filter(student => student.status === StudentStatuses.Accepted).length.toString() ?? "",
        inQueueStudents: course?.students.filter(student => student.status === StudentStatuses.InQueue).length.toString() ?? "",
        notifications: [...(course?.notifications ?? [])].reverse(),
        requirements: course?.requirements ?? "",
        annotations: course?.annotations ?? "",
        students: course?.students ?? [],
        teachers: course?.teachers ?? [],
    }
}