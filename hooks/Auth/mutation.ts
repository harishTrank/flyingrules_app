import { useMutation } from "@tanstack/react-query";
import { createUserApi, loginUserApi, varifyOTPApi } from "../../store/Services/Auth";

export const useCreateUserApi = () => {
    return useMutation((payload) => createUserApi(payload));
};

export const useLoginUserApi = () => {
    return useMutation((payload) => loginUserApi(payload));
};

export const useVarifyOTPApi = () => {
    return useMutation((payload) => varifyOTPApi(payload));
};