import React, {FC, useEffect} from 'react';
import {Form, FormInstance, Input, InputNumber, Radio, Select} from "antd";
import {
    courseNameRules,
    mainTeacherIdRules,
    maximumStudentsCountRules,
    semesterRules,
    setQuillRules,
    startYearRules
} from "../../modals/MyModalFormCourseCreation/Validations";
import classes from "./MyCourseForm.module.css";
import {quillModules, semesters} from "../../../consts/consts";
import {ICourseDetails, IErrorResponse, Semesters} from "../../../../types/types";
import ReactQuill from "react-quill";
import MyButton from "../MyButton/MyButton";
import {useMyCourseForm} from "./useMyCourseForm";

export interface IMyCourseForm {
    modalCourse: {
        loading: boolean;
        error: IErrorResponse | null;
    };
    cancelModalHandler: any;
    courseOnFinishHandler: any;
    modalForm: FormInstance<ICourseFormValues>;
    setFieldsCallback?: () => void;
}

export interface ICourseFormValues {
    name: string;
    startYear: number;
    maximumStudentsCount: number;
    semester: Semesters;
    requirements: string;
    annotations: string;
    mainTeacherId: string;
}

const MyCourseForm: FC<IMyCourseForm> = ({modalCourse, modalForm, courseOnFinishHandler, cancelModalHandler, setFieldsCallback}) => {
    const {
        buttonText,
        requirementsRef,
        annotationsRef,
        teachers,
        customFilterOption
    } = useMyCourseForm();

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
                <ReactQuill modules={quillModules} theme="snow" ref={requirementsRef} />
            </Form.Item>
            <Form.Item
                rules={setQuillRules(annotationsRef, 'Введите аннотацию')}
                label="Аннотация"
                name="annotations">
                <ReactQuill modules={quillModules} theme="snow" ref={annotationsRef} />
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
                    {teachers.map((teacher) => {
                        return (<Select.Option key={teacher.id} value={teacher.id}>{teacher.fullName}</Select.Option>);
                    })}
                </Select>
            </Form.Item>
            <Form.Item className={classes.courseFormButtonContainer}>
                <MyButton type="default" onClick={cancelModalHandler}>Отмена</MyButton>
                <MyButton htmlType="submit" className={classes.courseFormButtonSave}>{buttonText}</MyButton>
            </Form.Item>
        </Form>
    );
};

export default MyCourseForm;