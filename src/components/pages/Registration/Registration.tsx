import React, {FC} from 'react';
import {DatePicker, Form, Input, message, Typography} from 'antd';
import dayjs from 'dayjs';
import MyButton from '../../UI/MyButton/MyButton';
import classes from './Registration.module.css'
import {birthdayRules, confirmRules, emailRules, fullNameRules, passwordRules} from "./Validations";
import {useRegistration} from "./useRegistration";

const {Title} = Typography;

const Registration: FC = () => {
    const {registrationLoading, form, tooltip, dateFormat, currentDate, registrationHandler} = useRegistration();

    console.log("Registration update!");

    return (
        <div className={classes.registrationWrapper}>
            <Title level={2} className={classes.registrationTitle}>Регистрация нового пользователя</Title>
            <div className={classes.registrationFormWrapper}>
                <Form
                    layout="vertical"
                    form={form}
                    className={classes.registrationForm}
                    requiredMark="optional"
                    onFinish={registrationHandler}
                    disabled={registrationLoading}>
                    <Form.Item
                        label="ФИО"
                        name="fullName"
                        rules={fullNameRules}
                        hasFeedback
                        tooltip={tooltip}>
                        <Input placeholder="Ивано Иван Иванович"/>
                    </Form.Item>
                    <Form.Item
                        label="День рождения"
                        name="birthDate"
                        rules={birthdayRules}
                        hasFeedback
                        tooltip={tooltip}>
                        <DatePicker
                            format={dateFormat}
                            className={classes.registrationFormDatePiker}
                            minDate={dayjs('01.01.1900', dateFormat)}
                            maxDate={dayjs(currentDate, dateFormat)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        extra="Email будет использоваться для входа в систему"
                        name="email"
                        rules={emailRules}
                        hasFeedback
                        tooltip={tooltip}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={passwordRules}
                        hasFeedback
                        tooltip={tooltip}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        label="Повторите пароль"
                        name="confirmPassword"
                        dependencies={['password']}
                        hasFeedback
                        rules={confirmRules}
                        tooltip={tooltip}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item>
                        <MyButton htmlType="submit" loading={registrationLoading}>Зарегистрироваться</MyButton>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Registration;