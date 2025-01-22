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

export function createStringListFromObjectValues(obj: any) {
  const valueList = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === "string") {
        valueList.push(value);
      } else {
        valueList.push(String(value));
      }
    }
  }
  return valueList;
}

export function getCodesFromAirlines(airlineObject: any, airlineList: any) {
  const reverseLookup = Object.fromEntries(
    Object.entries(airlineObject).map(([code, airline]) => [airline, code])
  );
  return airlineList
    .map((airline: any) => reverseLookup[airline])
    .filter((code: any) => code);
}

export function getNamesFromAirportObject(airportData: any) {
  const names = [];

  for (const airportKey in airportData) {
    if (airportData.hasOwnProperty(airportKey)) {
      const airport = airportData[airportKey];
      if (airport && airport.name && typeof airport.name === "string") {
        names.push(airport.name);
      }
    }
  }

  return names;
}

export function replaceNamesWithCodes(airportData: any, namesList: any) {
  const updatedList = [];
  for (const item of namesList) {
    let codeFound = false;
    for (const code in airportData) {
      if (airportData[code].name === item) {
        updatedList.push(code);
        codeFound = true;
        break;
      }
    }
    if (!codeFound) {
      updatedList.push(item);
    }
  }
  return updatedList;
}

export function shuffle(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Get random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

export function convertToNumber(priceString: any) {
  if (priceString == null) {
    return NaN;
  }
  const numericString = priceString.replace(/[^0-9.-]+/g, "");
  const number = parseFloat(numericString);
  return isNaN(number) ? NaN : number;
}
