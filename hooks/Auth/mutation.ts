import { useMutation } from "@tanstack/react-query";
import { createUserApi, loginUserApi } from "../../store/Services/Auth";

export const useCreateUserApi = () => {
    return useMutation((payload) => createUserApi(payload));
};

export const useLoginUserApi = () => {
    return useMutation((payload) => loginUserApi(payload));
};
