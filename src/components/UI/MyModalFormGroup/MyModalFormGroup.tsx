import React, {FC} from 'react';
import {Form, FormInstance, Input, Modal} from "antd";
import classes from "./MyModalFormGroup.module.css";
import {groupNameRules} from "../../pages/Groups/Validations";
import MyButton from "../MyButton/MyButton";
import {IGroupModalForm} from "../../pages/Groups/useGroups";
import {IErrorResponse, IGroup} from "../../../types/types";

export interface IMyModalGroupEdit {
    modalGroup: {
        loading: boolean;
        error: IErrorResponse | null;
        typeModalOpen: ModalGroupType | null;
        group: IGroup | null;
    };
    cancelModalHandler: any;
    modalForm: FormInstance<IGroupModalForm>;
    groupOnFinishHandler: any;
    modalGroupType: ModalGroupType;
}

export enum ModalGroupType {
    edit,
    create,
}

const MyModalFormGroup: FC<IMyModalGroupEdit> = ({modalForm, modalGroup, cancelModalHandler, groupOnFinishHandler, modalGroupType}) => {
    const titles = ["Редактирование группы", "Создание группы"];
    const buttonText = ["Сохранить", "Создать"];

    return (
        <>
            <Modal
                centered
                open={modalGroup.typeModalOpen === modalGroupType}
                footer={false}
                onCancel={cancelModalHandler}
                title={titles[modalGroupType]}
                className={classes.groupFormModal}
                width={700}>
                <Form
                    form={modalForm}
                    layout="vertical"
                    requiredMark="optional"
                    onFinish={groupOnFinishHandler}
                    disabled={modalGroup.loading}>
                    <Form.Item
                        label="Название группы"
                        name="groupName"
                        rules={groupNameRules}>
                        <Input/>
                    </Form.Item>
                    <Form.Item className={classes.groupModalButtonContainer}>
                        <MyButton type="default" className={classes.groupModalButtonCancel} onClick={cancelModalHandler}>Отмена</MyButton>
                        <MyButton htmlType="submit" className={classes.groupModalButtonSave}>{buttonText[modalGroupType]}</MyButton>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default MyModalFormGroup;