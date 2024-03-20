import {useRef} from "react";
import ReactQuill from "react-quill";

export const useMyCourseFormForTeacher = () => {
    const requirementsRef = useRef<ReactQuill>(null);
    const annotationsRef = useRef<ReactQuill>(null);

    const buttonText = "Создать курс";

    return {buttonText, requirementsRef, annotationsRef};
}