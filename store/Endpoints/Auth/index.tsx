import { defaults } from "../default";

export const authEndpoints = {
  createUser: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/register",
    },
  },
  loginUser: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/login",
    },
  },
};
