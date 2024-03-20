import {Rule} from "antd/lib/form";

export const notificationTextRules: Rule[] = [
    {
        required: true,
        message: 'Введите текст уведомления',
    }
];