import { callApi } from "../../../utils/api/apiUtils";
import { authEndpoints } from "../../Endpoints/Auth";

export const createUserApi = ({ body }: any) =>
  callApi({
    uriEndPoint: authEndpoints.createUser.v1,
    body,
  });

export const loginUserApi = ({ body }: any) =>
  callApi({
    uriEndPoint: authEndpoints.loginUser.v1,
    body,
  });

export const varifyOTPApi = ({ body }: any) =>
  callApi({
    uriEndPoint: authEndpoints.varifyOTP.v1,
    body,
  });
