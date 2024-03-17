import React, {FC, useRef} from 'react';
import classes from './MyModalFormGroupCreation.module.css'
import {Form, FormInstance, Input, InputNumber, Modal, Radio, Select, SelectProps} from "antd";
import MyButton from "../MyButton/MyButton";
import {IErrorResponse, Semesters} from "../../../types/types";
import {semesters} from "../../consts/consts";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {ICourseCreationModalForm} from "../../pages/GroupCourses/useGroupCourses";
import {Rule} from "antd/lib/form";

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

const  modules  = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        ["link", "image", "video"],
        ["clean"],
    ],
};

export const courseNameRules: Rule[] = [
    {
        required: true,
        message: 'Введите название курса',
    }
];
export const startYearRules: Rule[] = [
    {
        required: true,
        message: 'Введите год начала курса',
    }
];
export const maximumStudentsCountRules: Rule[] = [
    {
        required: true,
        message: 'Введите количество мест',
    }
];
export const semesterRules: Rule[] = [
    {
        required: true,
        message: 'Выберите семестр',
    }
];
export const mainTeacherIdRules: Rule[] = [
    {
        required: true,
        message: 'Выберите основного учителя',
    }
];
const setQuillRules = (quillRef: React.RefObject<ReactQuill>, errorMessage: string) => {
    const requirementsRules: Rule[] = [
        () => ({
            validator(_, value) {
                const editor = quillRef.current?.getEditor();
                const text = (editor?.getText() ?? '123').trim();
                const editorElement = editor?.root;

                if(!!value && text && text.length > 0) {
                    if (editorElement) editorElement.style.border = '0';
                    return Promise.resolve();
                }

                if (editorElement) editorElement.style.border = '2px solid red';
                return Promise.reject(new Error(errorMessage));
            },
        }),
    ];

    return requirementsRules;
}

const MyModalFormGroupCreation: FC<IMyModalFormGroupCreation> = ({modalCourseCreation, cancelModalHandler, courseOnFinishHandler, modalForm}) => {
    const title = "Создание курса";
    const buttonText = "Создать курс";
    const options: SelectProps['options'] = [];

    const requirementsRef = useRef<ReactQuill>(null);
    const annotationsRef = useRef<ReactQuill>(null);

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
                        <InputNumber style={{width: "100%"}}/>
                    </Form.Item>
                    <Form.Item
                        rules={maximumStudentsCountRules}
                        label="Общее количество мест"
                        name="maximumStudentsCount">
                        <InputNumber style={{width: "100%"}}/>
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
                        <ReactQuill modules={modules} theme="snow" ref={requirementsRef}/>
                    </Form.Item>
                    <Form.Item
                        rules={setQuillRules(annotationsRef, 'Введите аннотацию')}
                        label="Аннотация"
                        name="annotations">
                        <ReactQuill modules={modules} theme="snow" ref={annotationsRef}/>
                    </Form.Item>
                    <Form.Item
                        rules={mainTeacherIdRules}
                        label="Основной преподаватель курса"
                        name="mainTeacherId">
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            options={options}
                        />
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
/* login
{
  "email": "gymboss@gachi.com",
  "password": "B0yNextD00r"
}
*/
export default MyModalFormGroupCreation;