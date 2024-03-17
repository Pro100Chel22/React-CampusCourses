import {Rule} from "antd/lib/form";
import React from "react";
import ReactQuill from "react-quill";

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
export const setQuillRules = (quillRef: React.RefObject<ReactQuill>, errorMessage: string) => {
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
