import {Rule} from "antd/lib/form";

export const statusRules: Rule[] = [
    {
        required: true,
        message: 'Выберите статус курса',
    }
];