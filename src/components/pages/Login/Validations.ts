import {Rule} from "antd/lib/form";

export const emailRules: Rule[] = [
    {
        type: 'email',
        message: 'Введенный email невалидный!',
    },
    {
        required: true,
        message: 'Введите свой email',
    },
];

export const passwordRules: Rule[] = [
    {
        required: true,
        message: 'Введите свой пароль',
    }
];