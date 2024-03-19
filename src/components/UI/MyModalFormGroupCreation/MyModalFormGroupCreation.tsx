import React, {FC} from 'react';
import classes from './MyModalFormGroupCreation.module.css'
import {Form, FormInstance, Input, InputNumber, Modal, Radio, Select} from "antd";
import MyButton from "../MyButton/MyButton";
import {IErrorResponse, Semesters} from "../../../types/types";
import {semesters} from "../../consts/consts";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
    courseNameRules,
    mainTeacherIdRules,
    maximumStudentsCountRules,
    semesterRules,
    setQuillRules,
    startYearRules
} from "./Validations";
import {useMyModalFormGroupCreation} from "./useMyModalFormGroupCreation";

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

export interface ICourseCreationModalForm {
    name: string;
    startYear: number;
    maximumStudentsCount: number;
    semester: Semesters;
    requirements: string;
    annotations: string;
    mainTeacherId: string;
}

const MyModalFormGroupCreation: FC<IMyModalFormGroupCreation> = ({modalCourseCreation, cancelModalHandler, courseOnFinishHandler, modalForm}) => {
    const {
        title,
        buttonText,
        requirementsRef,
        annotationsRef,
        quillModules,
        usersForCourseCreation,
        customFilterOption
    } = useMyModalFormGroupCreation();
    console.log(usersForCourseCreation, "12312")
    return (
        <>
            <Modal
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
                        rules={courseNameRules}
                        label="Название курса"
                        name="name">
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        rules={startYearRules}
                        label="Год начала курса"
                        name="startYear">
                        <InputNumber className={classes.inputWidth} />
                    </Form.Item>
                    <Form.Item
                        rules={maximumStudentsCountRules}
                        label="Общее количество мест"
                        name="maximumStudentsCount">
                        <InputNumber className={classes.inputWidth}/>
                    </Form.Item>
                    <Form.Item
                        rules={semesterRules}
                        label="Семестр"
                        name="semester">
                        <Radio.Group>
                            <Radio value="Spring">{semesters[Semesters.Spring].massage}</Radio>
                            <Radio value="Autumn">{semesters[Semesters.Autumn].massage}</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        rules={setQuillRules(requirementsRef, 'Введите требования')}
                        label="Требования"
                        name="requirements">
                        <ReactQuill modules={quillModules} theme="snow" ref={requirementsRef}/>
                    </Form.Item>
                    <Form.Item
                        rules={setQuillRules(annotationsRef, 'Введите аннотацию')}
                        label="Аннотация"
                        name="annotations">
                        <ReactQuill modules={quillModules} theme="snow" ref={annotationsRef}/>
                    </Form.Item>
                    <Form.Item
                        rules={mainTeacherIdRules}
                        label="Основной преподаватель курса"
                        name="mainTeacherId">
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            filterOption={customFilterOption}
                        >
                            {usersForCourseCreation.map((user) => {
                              return (<Select.Option key={user.id} value={user.id}>{user.fullName}</Select.Option>);
                            })}
                        </Select>
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