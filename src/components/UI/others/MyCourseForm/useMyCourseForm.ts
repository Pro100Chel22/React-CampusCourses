import {useRef} from "react";
import ReactQuill from "react-quill";
import {useAppSelector} from "../../../../hooks/redux";

export const useMyCourseForm = () => {
    const usersFromCourses = useAppSelector(state => state.coursesReducer.modalCourseCreation.usersForCourseCreation);
    const usersFromCourseDetails = useAppSelector(state => state.courseDetailReducer.fetchingCourse.usersForAddTeacher);
    const requirementsRef = useRef<ReactQuill>(null);
    const annotationsRef = useRef<ReactQuill>(null);

    const teachers = usersFromCourses.length === 0 ? usersFromCourseDetails : usersFromCourses;
    const buttonText = "Создать курс";

    const customFilterOption = (inputValue: string, option?: React.ReactElement) => {
        // @ts-ignore
        const value = option?.children.toLowerCase();
        inputValue = inputValue.toLowerCase();

        return value?.includes(inputValue);
    };

    return {buttonText, requirementsRef, annotationsRef, teachers, customFilterOption};
}