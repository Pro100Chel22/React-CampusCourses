import axiosInstanceFactory from "./AxiosInstance";
import {IGroup} from "../types/types";
import {AxiosPromise} from "axios";

const axios = axiosInstanceFactory();

const groups = async (token: string):  Promise<AxiosPromise<IGroup[]>> => {
    return axios.get<IGroup[]>("groups", {headers: {
            Authorization: 'Bearer ' + token,
        }});
}

const deleteGroup = async (groupId: string, token: string):  Promise<AxiosPromise<void>> => {
    return axios.delete(`groups/${groupId}`, {headers: {
            Authorization: 'Bearer ' + token,
        }});
}

const editGroup = async (group: IGroup, token: string):  Promise<AxiosPromise<IGroup>> => {
    return axios.put<IGroup>(`groups/${group.id}`, {name: group.name}, {headers: {
            Authorization: 'Bearer ' + token,
        }});
}

export const GroupsService = {
    groups,
    deleteGroup,
    editGroup
}