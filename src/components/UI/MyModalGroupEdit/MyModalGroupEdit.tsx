import React, {FC} from 'react';
import {Form, FormInstance, Input, Modal} from "antd";
import classes from "../../pages/Groups/Groups.module.css";
import {groupNameRules} from "../../pages/Groups/Validations";
import MyButton from "../MyButton/MyButton";
import {IGroupEditForm} from "../../pages/Groups/useGroups";

export interface IMyModalGroupEdit {
    editingGroup: any;
    cancelModalEditHandler: any;
    formEdit: FormInstance<IGroupEditForm>;
    groupEditHandler: any;
}

const MyModalGroupEdit: FC<IMyModalGroupEdit> = ({formEdit, editingGroup, cancelModalEditHandler, groupEditHandler}) => {
    return (
        <>
            <Modal
                centered
                open={editingGroup.modalOpen}
                footer={false}
                onCancel={cancelModalEditHandler}
                title="Редактирование группы"
                className={classes.groupModalEdit}
                width={700}>
                <Form
                    form={formEdit}
                    layout="vertical"
                    requiredMark="optional"
                    onFinish={groupEditHandler}>
                    <Form.Item
                        label="Название группы"
                        name="groupName"
                        rules={groupNameRules}>
                        <Input/>
                    </Form.Item>
                    <Form.Item className={classes.groupButtonEditContainer}>
                        <MyButton type="default" className={classes.groupButtonEditCancel} onClick={cancelModalEditHandler}>Отмена</MyButton>
                        <MyButton htmlType="submit" className={classes.groupButtonEditSave}>Сохранить</MyButton>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default MyModalGroupEdit;