import {useParams} from "react-router-dom";
import {useAuth} from "../../../hooks/useAuth";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {useEffect} from "react";
import {getCourses} from "../../../store/reducers/GroupCoursesReducer/GetCoursesThunkCreator";
import {useForm} from "antd/es/form/Form";
import {ICourseCreationModalForm} from "../../UI/MyModalFormGroupCreation/MyModalFormGroupCreation";
import {actions} from "../../../store/reducers/GroupCoursesReducer/GroupCoursesSlice";

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
        dispatch(actions.setCourseCreationModal({isOpen: false}));
    };

    const courseCreationOnFinishHandler = () => {

    };

    const showCourseCreationModal = () => {
        dispatch(actions.setCourseCreationModal({isOpen: true}));
    }

    useEffect(() => {
        dispatch(getCourses(id ?? ""));
    }, []);

    return {modalCourseCreation, cancelCourseCreationModalHandler, courseCreationOnFinishHandler, showCourseCreationModal, formCourseCreation, groupInfo, roles};
}