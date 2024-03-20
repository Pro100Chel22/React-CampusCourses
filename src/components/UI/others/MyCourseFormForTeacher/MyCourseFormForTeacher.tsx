import React, {FC, useEffect} from 'react';
import classes from './MyCourseFormForTeacher.module.css'
import {Form, FormInstance} from "antd";
import ReactQuill from "react-quill";
import MyButton from "../MyButton/MyButton";
import {ICourseDetails, IErrorResponse} from "../../../../types/types";
import {setQuillRules} from "../../modals/MyModalFormCourseCreation/Validations";
import {quillModules} from "../../../consts/consts";
import {useMyCourseFormForTeacher} from "./useMyCourseFormForTeacher";

export interface IMyCourseFormForTeacher {
    modalCourse: {
        loading: boolean;
        error: IErrorResponse | null;
    };
    cancelModalHandler: any;
    courseOnFinishHandler: any;
    modalForm: FormInstance<ICourseFormForTeacherValues>;
    setFieldsCallback?: () => void;
}

export interface ICourseFormForTeacherValues {
    requirements: string;
    annotations: string;
}

const MyCourseFormForTeacher: FC<IMyCourseFormForTeacher> = ({modalCourse, courseOnFinishHandler, cancelModalHandler, modalForm, setFieldsCallback}) => {
    const {buttonText, requirementsRef, annotationsRef} = useMyCourseFormForTeacher();

    useEffect(() => {
        if(setFieldsCallback) setFieldsCallback();
    }, [])

    return (
        <Form
            form={modalForm}
            layout="vertical"
            requiredMark="optional"
            onFinish={courseOnFinishHandler}
            disabled={modalCourse.loading}>
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
            <Form.Item className={classes.courseFormForTeacherButtonContainer}>
                <MyButton type="default" onClick={cancelModalHandler}>Отмена</MyButton>
                <MyButton htmlType="submit" className={classes.courseFormForTeacherButtonSave}>{buttonText}</MyButton>
            </Form.Item>
        </Form>
    );
};

export default MyCourseFormForTeacher;