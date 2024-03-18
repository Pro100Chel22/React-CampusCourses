import {useParams} from "react-router-dom";

export const useCourseDetail = () => {
    const {id} = useParams();

    const notifications = [
        {
            "text": "Приветствую всех на курсе111111111111111111111111111111111111111111111111111111111111",
            "isImportant": true
        },
        {
            "text": "Дефолт",
            "isImportant": true
        },
        {
            "text": "Обычное",
            "isImportant": false
        },
        {
            "text": "Высока",
            "isImportant": true
        },
        {
            "text": "Высока",
            "isImportant": false
        },
        {
            "text": "дадада",
            "isImportant": true
        }
    ]

    return {notifications};
}