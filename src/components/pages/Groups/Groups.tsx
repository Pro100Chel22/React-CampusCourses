import React from 'react';
import {List, Typography} from "antd";
import MyButton from "../../UI/MyButton/MyButton";
import MyGroupItem from "../../UI/MyGroupItem/MyGroupItem";
import './Groups.css'
import {IGroup} from '../../../types/types'

const {Title} = Typography;

const Groups = () => {
    const data : IGroup[] = [
        {
            "id": "bec4728c-4d45-4608-e896-08db4ece065f",
            "name": "Хихология"
        },
        {
            "id": "79dc8474-69f5-4702-e897-08db4ece065f",
            "name": "Анекдоты"
        },
        {
            "id": "8bc74c07-8812-4a54-d2ea-08db5ab5db86",
            "name": "Винкс клуб"
        },
        {
            "id": "8c8fce86-1e46-4df9-7364-08db5b4aaa64",
            "name": "Гуманитарный 2sdfsdfsdfsdfs2 2dfsdfsdfsdfsdfsdjkk2 2kkkkkkkkkkkkkkkkk2 2kkkkkkkk2 2kkkkkkkksdfsdf2"
        },
        {
            "id": "9f75afbd-1479-458a-30cd-08db5ce6f12c",
            "name": "Алфавит"
        },
        {
            "id": "9157ca57-c3eb-436f-b29b-08dc320cc7b1",
            "name": "Всем ку"
        },
        {
            "id": "d20fbacb-319c-4bf0-b29c-08dc320cc7b1",
            "name": "Мемология"
        }
    ];

    return (
        <div className="GroupContainerWrapper">
            <div className="GroupContainer">
                <Title level={2}>Группы кампусных курсов</Title>
                <MyButton className="groupButtonCreate">Создать</MyButton>
                <List
                    className="groupList"
                    bordered
                    dataSource={data}
                    renderItem={(item) => (
                        <MyGroupItem group={item}/>
                    )}
                />
            </div>
        </div>
    );
};


/* login
{
  "email": "gymboss@gachi.com",
  "password": "B0yNextD00r"
}
*/
export default Groups;