import {CourseStatuses, Semesters, StudentMarks, StudentStatuses} from "../../types/types";

export const viewDateFormat = "DD.MM.YYYY";
export const serverDateFormat = "YYYY-MM-DD";
export const tooltipRequire = "Это поле обязательное";

export const statuses = {
    [CourseStatuses.Started]: {color: "#108ee9", message: "В процессе обучения"},
    [CourseStatuses.Finished]: {color: "#f50", message: "Закрыт"},
    [CourseStatuses.OpenForAssigning]: {color: "#87d068", message: "Открыт для записи"},
    [CourseStatuses.Created]: {color: "#737373", message: "Создан"},
}

export const semesters = {
    [Semesters.Autumn]: {massage: "Осенний"},
    [Semesters.Spring]: {massage: "Весенний"},
}

export const marks = {
    [StudentMarks.Failed]: {color: "#e12222", message: "зафейлена"},
    [StudentMarks.Passed]: {color: "#87d068", message: "успешно пройдена"},
    [StudentMarks.NotDefined]: {color: "#737373", message: "отметки нет"},
}

export const studentStatuses  = {
    [StudentStatuses.InQueue]: {color: "#108ee9", message: "в очереди"},
    [StudentStatuses.Accepted]: {color: "#87d068", message: "принят в группу"},
    [StudentStatuses.Declined]: {color: "#e12222", message: "отклонен"},
}