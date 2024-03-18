import {useRef} from "react";
import ReactQuill from "react-quill";
import {useAppSelector} from "../../../hooks/redux";

const quillModules  = {
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

export const useMyModalFormGroupCreation = () => {
    const usersForCourseCreation = useAppSelector(state => state.coursesReducer.modalCourseCreation.usersForCourseCreation)
    const requirementsRef = useRef<ReactQuill>(null);
    const annotationsRef = useRef<ReactQuill>(null);

    const title = "Создание курса";
    const buttonText = "Создать курс";

    const customFilterOption = (inputValue: string, option?: React.ReactElement) => {
        const value = option?.props.children.toLowerCase();
        inputValue = inputValue.toLowerCase();

        return value?.includes(inputValue);
    };

    return {title, buttonText, requirementsRef, annotationsRef, quillModules, usersForCourseCreation, customFilterOption};
}