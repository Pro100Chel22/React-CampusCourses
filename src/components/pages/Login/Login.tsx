import React from 'react';
import {Form, Input, Typography} from 'antd';
import MyButton from '../../UI/others/MyButton/MyButton';
import classes from './Login.module.css'
import {emailRules, passwordRules} from "./Validations";
import {useLogin} from "./useLogin";
import {tooltipRequire} from "../../consts/consts";

const {Title} = Typography;

const Login = () => {
    const {loginLoading, loginHandler, form} = useLogin();

    console.log("Login update!");

    return (
        <div className={classes.loginWrapper}>
            <Title level={2} className={classes.loginTitle}>Авторизация</Title>
            <div className={classes.loginFormWrapper}>
                <Form
                    layout="vertical"
                    form={form}
                    className={classes.loginForm}
                    requiredMark="optional"
                    onFinish={loginHandler}
                    disabled={loginLoading}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={emailRules}
                        hasFeedback
                        tooltip={tooltipRequire}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={passwordRules}
                        hasFeedback
                        tooltip={tooltipRequire}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item>
                        <MyButton htmlType="submit" loading={loginLoading}>Войти</MyButton>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;