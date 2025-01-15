import { useMutation } from "@tanstack/react-query";
import { createUserApi } from "../../store/Services/Auth";


export const useCreateUserApi = () => {
    return useMutation((payload) => createUserApi(payload));
};
