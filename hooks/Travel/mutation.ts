import { useMutation } from "@tanstack/react-query";
import { flightOffersApi } from "../../store/Services/Travel";

export const useFlightOffersApi = () => {
    return useMutation((payload) => flightOffersApi(payload));
};
