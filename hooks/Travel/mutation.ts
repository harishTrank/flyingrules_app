import { useMutation } from "@tanstack/react-query";
import { addBookingApi, flightOffersApi } from "../../store/Services/Travel";

export const useFlightOffersApi = () => {
    return useMutation((payload) => flightOffersApi(payload));
};

export const useAddBookingApi = () => {
    return useMutation((payload) => addBookingApi(payload));
};

