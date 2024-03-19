import React, {FC} from 'react';
import classes from './MyModalFormAddTeacher.module.css';
import {Form, FormInstance, Modal, Select} from "antd";
import MyButton from "../../MyButton/MyButton";
import {IUser} from "../../../../types/types";
import {useMyModalFormAddTeacher} from "./useMyModalFormAddTeacher";
import {courseModalType} from "../../../../store/reducers/CourseDetailReducer/CourseDetailsSlice";
import {teacherIdRules} from "./Validations";

export interface IMyModalFormAddTeacher {
    modalTypeOpen: courseModalType | null;
    cancelModalHandler: any;
    onFinishHandler: any;
    modalForm: FormInstance<IFormAddTeacher>;
    users: IUser[];
}

export interface IFormAddTeacher {
    teacherId: string;
}

const MyModalFormAddTeacher: FC<IMyModalFormAddTeacher> = ({modalTypeOpen, cancelModalHandler, onFinishHandler, modalForm, users}) => {
    const {customFilterOption  } = useMyModalFormAddTeacher();

    const title = "Добавление преподавателя на курс";
    const buttonText = "Добавить";

    return (
        <>
            <Modal
                centered
                open={modalTypeOpen === courseModalType.addTeacher}
                footer={false}
                onCancel={cancelModalHandler}
                title={title}
                className={classes.addTeacherFormModal}
                width={700}>
                <Form
                    form={modalForm}
                    layout="vertical"
                    requiredMark="optional"
                    onFinish={onFinishHandler}>
                    <Form.Item
                        label="Выберите преподавателя"
                        name="teacherId"
                        rules={teacherIdRules}>
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            filterOption={customFilterOption}
                        >
                            {users.map((user) => {
                                return (<Select.Option key={user.id} value={user.id}>{user.fullName}</Select.Option>);
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item className={classes.addTeacherModalButtonContainer}>
                        <MyButton type="default" className={classes.addTeacherModalButtonCancel} onClick={cancelModalHandler}>Отмена</MyButton>
                        <MyButton htmlType="submit" className={classes.addTeacherButtonSave}>{buttonText}</MyButton>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default MyModalFormAddTeacher;