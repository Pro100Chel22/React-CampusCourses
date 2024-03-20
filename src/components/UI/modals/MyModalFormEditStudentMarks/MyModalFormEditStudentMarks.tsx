import React, {FC} from 'react';
import classes from './MyModalFormEditStudentMarks.module.css'
import {StudentMarks} from "../../../../types/types";
import {Form, FormInstance, Modal, Radio} from "antd";
import {courseModalType} from "../../../../store/reducers/CourseDetailReducer/CourseDetailsSlice";
import {marks} from "../../../consts/consts";
import MyButton from "../../others/MyButton/MyButton";

export interface IMyModalFormEditStudentMarks {
    modalTypeOpen: courseModalType | null;
    cancelModalHandler: any;
    onFinishHandler: any;
    modalForm: FormInstance<IFormEditStudentMarks>;
    startValue: StudentMarks | null;
}

export interface IFormEditStudentMarks {
    mark: StudentMarks;
}

interface AssociativeArray {
    [key: string]: {title: string}
}

const MyModalFormEditStudentMarks: FC<IMyModalFormEditStudentMarks> = ({modalTypeOpen, cancelModalHandler, onFinishHandler, startValue, modalForm}) => {
    const modalType: AssociativeArray  = {
        [courseModalType.editStudentFinalMark]: {title: 'Изменение статуса для "Финальная аттестация"'},
        [courseModalType.editStudentMidtermMark]: {title: 'Изменение статуса для "Промежуточная аттестация"'},
    }

    const title = modalType[modalTypeOpen ?? ""]?.title ?? null;
    const buttonText = "Сохранить";
    const isOpen = modalTypeOpen === courseModalType.editStudentMidtermMark ||
                   modalTypeOpen === courseModalType.editStudentFinalMark;

    return (
        <>
            <Modal
                centered
                open={isOpen}
                footer={false}
                onCancel={cancelModalHandler}
                title={title}
                width={700}>
                <Form
                    form={modalForm}
                    layout="vertical"
                    requiredMark="optional"
                    onFinish={onFinishHandler}>
                    <Form.Item
                        name="mark"
                        initialValue={startValue}>
                        <Radio.Group>
                            <Radio value="Passed">{marks[StudentMarks.Passed].message}</Radio>
                            <Radio value="Failed">{marks[StudentMarks.Failed].message}</Radio>
                            <Radio value="NotDefined">{marks[StudentMarks.NotDefined].message}</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item className={classes.editMarkModalButtonContainer}>
                        <MyButton type="default" onClick={cancelModalHandler}>Отмена</MyButton>
                        <MyButton htmlType="submit" className={classes.editMarkModalButtonSave}>{buttonText}</MyButton>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default MyModalFormEditStudentMarks;