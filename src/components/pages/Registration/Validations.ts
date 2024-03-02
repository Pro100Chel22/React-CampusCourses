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
export const emailRules: Rule[]  = [
    {
        type: 'email',
        message: 'Введенный email невалидный!',
    },
    {
        required: true,
        message: 'Введите свой email',
    },
];
export const passwordRules: Rule[]  = [
    {
        required: true,
        message: 'Введите свой пароль',
    },
    {
        pattern: RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-zA-Z0-9]).{6,}$"),
        message: "Пароль должен содеражать хотя бы одну заглавную букву и цифру"
    }
];
export const confirmRules: Rule[]  = [
    {
        required: true,
        message: 'Подтвердите свой пароль',
    },
    ({getFieldValue}) => ({
        validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error("Пароли не совпадают!"));
        },
    }),
];