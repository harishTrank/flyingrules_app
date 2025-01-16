import { callApi } from "../../../utils/api/apiUtils";
import { travelEndpoints } from "../../Endpoints/Travel";

export const flightOffersApi = ({ body }: any) =>
  callApi({
    uriEndPoint: travelEndpoints.flightOffers.v1,
    body,
  });
