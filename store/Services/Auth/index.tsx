import { callApi } from "../../../utils/api/apiUtils";
import { authEndpoints } from "../../Endpoints/Auth";

export const createUserApi = ({ body }: any) =>
  callApi({
    uriEndPoint: authEndpoints.createUser.v1,
    body,
  });
