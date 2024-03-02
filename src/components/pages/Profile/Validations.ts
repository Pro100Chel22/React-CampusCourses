import {Rule} from "antd/lib/form";

export const fullNameRules: Rule[] = [
    {
        required: true,
        message: "Введите свое имя"
    }
]
export const birthdayRules: Rule[]  = [
    {
        required: true,
        message: "Введите дату рождения"
    }
]