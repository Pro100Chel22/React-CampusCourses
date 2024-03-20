import {Rule} from "antd/lib/form";

export const teacherIdRules: Rule[] = [
    {
        required: true,
        message: 'Выберите основного учителя',
    }
];