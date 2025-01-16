import { defaults } from "../default";

export const travelEndpoints = {
  flightOffers: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/flight-offers",
    },
  },
};