import {Layout, Menu} from 'antd';
import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import MyOverflowedIndicator from '../../UI/others/MyOverflowedIndicator/MyOverflowedIndicator';
import './CustomLayout.css'
import {useCustomLayout} from "./useCustomLayout";

const {Header, Content, Footer} = Layout;

const CustomLayout = () => {
    const {logoutHandler, location, roles, token, checkingAuth, profile} = useCustomLayout();

    console.log("CustomLayout update!")

    return (
        <Layout className="mainLayout">
            <Header className="remove-padding-lg mainHeader">
                <Menu
                    selectedKeys={[location]}
                    theme="dark"
                    mode="horizontal"
                    style={{flex: 1, minWidth: 0}}
                    overflowedIndicator={<MyOverflowedIndicator/>}>
                    <Menu.Item key="/" className="logo">
                        <Link to='/'>Кампусные курсы</Link>
                    </Menu.Item>
                    {token && !checkingAuth ?
                        <Menu.Item key="/groups">
                            <Link to='/groups'>Группы курсов</Link>
                        </Menu.Item>
                        :
                        <></>
                    }
                    {roles.isStudent ?
                        <Menu.Item key="/courses/my">
                            <Link to='/courses/my'>Мои курсы</Link>
                        </Menu.Item>
                        :
                        <></>
                    }
                    {roles.isTeacher ?
                        <Menu.Item key="/courses/teaching">
                            <Link to='/courses/teaching'>Преподаваемые курсы</Link>
                        </Menu.Item>
                        :
                        <></>
                    }
                    {/*// есть токен, но идет проверка - плейсхолдеры; есть токен и проверка закончена - профиль и логаут; токен нет - регистрация и вход*/}
                    {!token ?
                        <>
                            <Menu.Item key="/registration" className="marginLeftAuto">
                                <Link to='/registration'>Регистрация</Link>
                            </Menu.Item>
                            <Menu.Item key="/login">
                                <Link to='/login'>Вход</Link>
                            </Menu.Item>
                        </>
                        :
                        <>
                            {checkingAuth ?
                                <></>
                                :
                                <>
                                    <Menu.Item key="/profile" className="marginLeftAuto">
                                        <Link to='/profile'>{profile?.email}</Link>
                                    </Menu.Item>
                                    <Menu.Item key="/logout" onClick={logoutHandler}>
                                        Выход
                                    </Menu.Item>
                                </>
                            }
                        </>

                    }
                </Menu>
            </Header>
            <Content className="mainContent">
                <Outlet/>
            </Content>
            <Footer className="mainFooter">
                Кампусные курсы ©{new Date().getFullYear()}
            </Footer>
        </Layout>
    );
};

export default CustomLayout;