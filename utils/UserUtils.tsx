import airports from "../extra/airports.json";

export const currenKeys: any = {
  USD: "$",
};

export const durationFormator = (value: any) => {
  const remPt = value?.split("PT")[1];
  let remH = remPt?.split("H");
  let tArr = remH?.[0] + "H" + " " + remH?.[1];
  return tArr;
};

export const getAirports = (airportLocations: any) => {
  const airportNames: any = {};
  for (let key in airportLocations) {
    airportNames[key] = airports.find((el: any) => el.code === key);
  }

  return airportNames;
};

export const getAirportNames = (iataCode: any, airportNames: any) => {
  if (!!airportNames)
    return !!airportNames[iataCode]
      ? `${airportNames[iataCode].name}, ${airportNames[iataCode].country}`
      : iataCode;
};
