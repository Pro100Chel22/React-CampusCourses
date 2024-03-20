import React, {FC} from 'react';
import classes from './MyModalFormCourseCreation.module.css'
import {FormInstance, Modal} from "antd";
import {IErrorResponse} from "../../../../types/types";
import "react-quill/dist/quill.snow.css";
import MyCourseForm, {ICourseFormValues} from "../../others/MyCourseForm/MyCourseForm";

export interface IMyModalFormGroupCreation {
    modalCourseCreation: {
        loading: boolean;
        error: IErrorResponse | null;
        isOpen: boolean;
    };
    cancelModalHandler: any;
    courseOnFinishHandler: any;
    modalForm: FormInstance<ICourseFormValues>;
}

const MyModalFormCourseCreation: FC<IMyModalFormGroupCreation> = ({modalCourseCreation, cancelModalHandler, courseOnFinishHandler, modalForm}) => {
    const title = "Создание курса";

    return (
        <>
            <Modal
                open={modalCourseCreation.isOpen}
                footer={false}
                onCancel={cancelModalHandler}
                title={title}
                className={classes.courseCreationFormModal}
                width={900}>
                <MyCourseForm
                    modalCourse={modalCourseCreation}
                    courseOnFinishHandler={courseOnFinishHandler}
                    cancelModalHandler={cancelModalHandler}
                    modalForm={modalForm}
                />
            </Modal>
        </>
    );
};

export default MyModalFormCourseCreation;