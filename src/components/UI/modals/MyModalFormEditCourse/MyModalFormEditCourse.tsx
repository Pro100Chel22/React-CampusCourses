import React, {FC} from 'react';
import classes from './MyModalFormEditCourse.module.css'
import {FormInstance, Modal} from "antd";
import MyCourseForm, {ICourseFormValues} from "../../others/MyCourseForm/MyCourseForm";
import {ICourseDetails, IErrorResponse} from "../../../../types/types";
import MyCourseFormForTeacher, {ICourseFormForTeacherValues} from "../../others/MyCourseFormForTeacher/MyCourseFormForTeacher";
import {courseModalType} from "../../../../store/reducers/CourseDetailReducer/CourseDetailsSlice";

export interface IMyModalFormEditCourse {
    modalCourseEdit: {
        loading: boolean;
        error: IErrorResponse | null;
        modalTypeOpen: courseModalType | null;
    };
    cancelModalHandler: any;
    courseOnFinishHandler: any;
    courseOnFinishHandlerForTeacher: any;
    modalForm: FormInstance<ICourseFormValues>;
    modalFormForTeacher: FormInstance<ICourseFormForTeacherValues>;
    isForTeacher: boolean;
    setFieldsCallback?: () => void;
}

const MyModalFormEditCourse: FC<IMyModalFormEditCourse> = ({
    modalCourseEdit,
    cancelModalHandler,
    courseOnFinishHandler,
    courseOnFinishHandlerForTeacher,
    modalForm,
    modalFormForTeacher,
    isForTeacher,
    setFieldsCallback
}) => {
    const title = "Редактирование курса";

    return (
        <>
            <Modal
                open={modalCourseEdit.modalTypeOpen === courseModalType.editCourse}
                footer={false}
                onCancel={cancelModalHandler}
                title={title}
                className={classes.courseCreationFormModal}
                width={900}>
                {isForTeacher ?
                    <MyCourseFormForTeacher
                        modalCourse={modalCourseEdit}
                        cancelModalHandler={cancelModalHandler}
                        courseOnFinishHandler={courseOnFinishHandlerForTeacher}
                        modalForm={modalFormForTeacher}
                        setFieldsCallback={setFieldsCallback}
                    />
                    :
                    <MyCourseForm
                        modalCourse={modalCourseEdit}
                        courseOnFinishHandler={courseOnFinishHandler}
                        cancelModalHandler={cancelModalHandler}
                        modalForm={modalForm}
                        setFieldsCallback={setFieldsCallback}
                    />
                }

            </Modal>
        </>
    );
};

export default MyModalFormEditCourse;