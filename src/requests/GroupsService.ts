import axiosInstanceFactory from "./AxiosInstance";
import {IGroup} from "../types/types";
import {AxiosPromise} from "axios";

const axios = axiosInstanceFactory();

const groups = async ():  Promise<AxiosPromise<IGroup[]>> => {
    return axios.get<IGroup[]>("groups");
}

const deleteGroup = async (groupId: string):  Promise<AxiosPromise<void>> => {
    return axios.delete(`groups/${groupId}`);
}

const createGroup = async (name: string):  Promise<AxiosPromise<IGroup>> => {
    return axios.post<IGroup>(`groups`, {name: name});
}

const editGroup = async (group: IGroup):  Promise<AxiosPromise<IGroup>> => {
    return axios.put<IGroup>(`groups/${group.id}`, {name: group.name});
}

export const GroupsService = {
    groups,
    deleteGroup,
    createGroup,
    editGroup
}