import {FC} from "react";
import {Checkbox, Form, FormInstance, Input, Modal} from "antd";
import classes from './MyModalFormCreateNotification.module.css';
import MyButton from "../../MyButton/MyButton";
import {courseModalType} from "../../../../store/reducers/CourseDetailReducer/CourseDetailsSlice";
import {notificationTextRules} from "./Validations";

const { TextArea } = Input;

export interface IMyModalFormNotification {
    modalTypeOpen: courseModalType | null;
    cancelModalHandler: any;
    onFinishHandler: any;
    modalForm: FormInstance<IFormCreateNotification>;
}

export interface IFormCreateNotification  {
    text: string;
    isImportant: boolean;
}

const MyModalFormCreateNotification: FC<IMyModalFormNotification> = ({modalTypeOpen, cancelModalHandler, onFinishHandler, modalForm}) => {
    const title = "Создать уведомление";
    const buttonText = "Создать уведомление";

    return (
        <>
            <Modal
                centered
                open={modalTypeOpen === courseModalType.createNotification}
                footer={false}
                onCancel={cancelModalHandler}
                title={title}
                className={classes.createNotificationFormModal}
                width={700}>
                <Form
                    form={modalForm}
                    layout="vertical"
                    requiredMark="optional"
                    onFinish={onFinishHandler}>
                    <Form.Item
                        label="Текст уведомления"
                        name="text"
                        rules={notificationTextRules}>
                        <TextArea maxLength={1000} size="large" allowClear showCount />
                    </Form.Item>
                    <Form.Item
                        label="Тип уведомления"
                        name="isImportant"
                        required
                        valuePropName="checked">
                        <Checkbox>Важное уведомление</Checkbox>
                    </Form.Item>
                    <Form.Item className={classes.createNotificationModalButtonContainer}>
                        <MyButton type="default" className={classes.createNotificationModalButtonCancel} onClick={cancelModalHandler}>Отмена</MyButton>
                        <MyButton htmlType="submit" className={classes.createNotificationButtonSave}>{buttonText}</MyButton>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default MyModalFormCreateNotification;