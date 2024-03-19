import {useParams} from "react-router-dom";
import {useAuth} from "../../../hooks/useAuth";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {useEffect} from "react";
import {getCourses} from "../../../store/reducers/GroupCoursesReducer/GetCoursesThunkCreator";
import {useForm} from "antd/es/form/Form";
import {actions} from "../../../store/reducers/GroupCoursesReducer/GroupCoursesSlice";
import {ICreateCourse, Semesters} from "../../../types/types";
import {Modal} from "antd";
import {createCourse} from "../../../store/reducers/GroupCoursesReducer/CreateCourseThunkCreator";
import {ICourseCreationModalForm} from "../../UI/MyModalFormGroupCreation/MyModalFormGroupCreation";

export const useGroupCourses = () => {
    const {id} = useParams();
    const {roles} = useAuth();
    const {courses, groupName, fetchingCourses, modalCourseCreation} = useAppSelector(state => state.coursesReducer);
    const dispatch = useAppDispatch();
    const [formCourseCreation] = useForm<ICourseCreationModalForm>();

    const groupInfo = {
        groupName,
        courses,
        fetchingCourses,
    }

    const cancelCourseCreationModalHandler = () => {
        Modal.confirm({
            title: 'Подтверждение',
            content: 'Вы уверены, что хотите закрыть форму? Все данные будут стерты!',
            okText: 'Подтвердить',
            cancelText: 'Отмена',
            okType: 'danger',
            onOk() {
                dispatch(actions.setCourseCreationModal({isOpen: false}));
            },
        });
    };

    const courseCreationOnFinishHandler = (value: ICourseCreationModalForm) => {
        dispatch(createCourse({createCourseForm: value, groupId: id ?? ""}));
    };

    const showCourseCreationModal = () => {
        formCourseCreation.resetFields();
        dispatch(actions.setCourseCreationModal({isOpen: true}));
    }

    useEffect(() => {
        dispatch(getCourses(id ?? ""));
    }, []);

    return {modalCourseCreation, cancelCourseCreationModalHandler, courseCreationOnFinishHandler, showCourseCreationModal, formCourseCreation, groupInfo, roles};
}