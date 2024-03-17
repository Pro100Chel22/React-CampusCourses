import React, {FC} from 'react';
import classes from './MyModalFormGroupCreation.module.css'
import {Form, FormInstance, Input, Modal} from "antd";
import MyButton from "../MyButton/MyButton";
import {IErrorResponse} from "../../../types/types";

export interface ICourseCreationModalForm {

}

export interface IMyModalFormGroupCreation {
    modalCourseCreation: {
        loading: boolean;
        error: IErrorResponse | null;
        isOpen: boolean;
    };
    cancelModalHandler: any;
    courseOnFinishHandler: any;
    modalForm: FormInstance<ICourseCreationModalForm>;
}

const MyModalFormGroupCreation: FC<IMyModalFormGroupCreation> = ({modalCourseCreation, cancelModalHandler, courseOnFinishHandler, modalForm}) => {
    const title = "Создание курса";
    const buttonText = "Создать курс";

    return (
        <>
            <Modal
                centered
                open={modalCourseCreation.isOpen}
                footer={false}
                onCancel={cancelModalHandler}
                title={title}
                className={classes.courseCreationFormModal}
                width={900}>
                <Form
                    form={modalForm}
                    layout="vertical"
                    requiredMark="optional"
                    onFinish={courseOnFinishHandler}
                    disabled={modalCourseCreation.loading}>
                    <Form.Item
                        label="Название курса"
                        name="courseName">
                        <Input/>
                    </Form.Item>
                    <Form.Item className={classes.courseCreationModalButtonContainer}>
                        <MyButton type="default" className={classes.courseCreationModalButtonCancel} onClick={cancelModalHandler}>Отмена</MyButton>
                        <MyButton htmlType="submit" className={classes.courseCreationModalButtonSave}>{buttonText}</MyButton>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default MyModalFormGroupCreation;