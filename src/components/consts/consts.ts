import {CourseStatuses, Semesters} from "../../types/types";

export const viewDateFormat = "DD.MM.YYYY";
export const serverDateFormat = "YYYY-MM-DD";
export const tooltipRequire = "Это поле обязательное";

export const statuses = {
    [CourseStatuses.Started]: {color: "#108ee9", message: "В процессе обучения"},
    [CourseStatuses.Finished]: {color: "#f50", message: "Закрыт"},
    [CourseStatuses.OpenForAssigning]: {color: "#87d068", message: "Открыт для записи"},
    [CourseStatuses.Created]: {color: "#939393", message: "Создан"},
}

export const semesters = {
    [Semesters.Autumn]: {massage: "Осенний"},
    [Semesters.Spring]: {massage: "Весенний"},
}