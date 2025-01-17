import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import theme from "../../../../utils/theme";
import { useAtom } from "jotai";
import { globalDictionaries } from "../../../../JotaiStore";
import dayjs from "dayjs";
import { durationFormator, getAirportNames } from "../../../../utils/UserUtils";

const { height, width } = Dimensions.get("window");

const FlightDetailsComp = ({ itineraryData }: any) => {
  const [dictionaries]: any = useAtom(globalDictionaries);
  return (
    <View style={styles.itineraryContainer}>
      {itineraryData?.segments?.map((segment: any, index: any) => (
        <View key={index}>
          <View>
            <View style={styles.head}>
              <Text style={styles.flightText}>{`${
                dictionaries?.carriers?.[segment?.carrierCode]
              } ${segment?.carrierCode}-${segment?.number}`}</Text>
            </View>
            <View>
              <Text style={styles.normalText}>{`${dayjs(
                segment?.departure?.at
              )?.format("HH:mma")} ${
                dictionaries?.airportNames[segment?.departure?.iataCode].country
              }`}</Text>
              <View style={styles.secondRow}>
                <Text style={styles.normalText}>
                  {segment?.departure?.iataCode}
                </Text>
                <Text style={styles.normalText}>
                  {dayjs(segment?.departure?.at)?.format("ddd, DD MMM YYYY")}
                </Text>
              </View>
            </View>
            <Text style={styles.terminalText}>
              {`${getAirportNames(
                segment?.departure?.iataCode,
                dictionaries?.airportNames
              )}\nTerminal ${segment?.departure?.terminal || 0}`}
            </Text>
          </View>

          <View style={styles.flightmainRap}>
            <View style={styles.flightSapration}>
              <Text style={[styles.durationText]}>
                Flight Duration {durationFormator(segment?.duration)}
              </Text>
            </View>
          </View>

          <View>
            <View style={styles.head}>
              <Text style={styles.flightText}>{`${
                dictionaries?.carriers?.[segment?.carrierCode]
              } ${segment?.carrierCode}-${segment?.number}`}</Text>
            </View>
            <View>
              <Text style={styles.normalText}>{`${dayjs(
                segment?.arrival?.at
              )?.format("HH:mma")} ${getAirportNames(
                segment?.arrival?.iataCode,
                dictionaries?.airportNames
              )}`}</Text>
              <View style={styles.secondRow}>
                <Text style={styles.normalText}>
                  {segment?.arrival?.iataCode}
                </Text>
                <Text style={styles.normalText}>
                  {dayjs(segment?.arrival?.at)?.format("ddd, DD MMM YYYY")}
                </Text>
              </View>
            </View>
            <Text style={styles.terminalText}>
              {`${getAirportNames(
                segment?.arrival?.iataCode,
                dictionaries?.airportNames
              )}\nTerminal ${segment?.arrival?.terminal || 0}`}
            </Text>
          </View>
          <View style={styles.divider} />
        </View>
      ))}
    </View>
  );
};

export default FlightDetailsComp;

const styles = StyleSheet.create({
  itineraryContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 5,
    padding: 10,
    marginTop: height * 0.02,
    borderWidth: 2,
    borderColor: theme.colors.grey,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
  },
  flightLogo: {
    width: width * 0.05,
    height: width * 0.05,
    objectFit: "contain",
  },
  flightText: {
    color: theme.colors.black,
    ...theme.font.fontMedium,
    fontSize: width * 0.04,
    // marginLeft: 8,
  },
  secondRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  normalText: {
    color: theme.colors.black,
    ...theme.font.fontMedium,
    fontSize: width * 0.032,
  },
  terminalText: {
    color: theme.colors.basicGrey,
    ...theme.font.fontMedium,
    fontSize: width * 0.03,
  },
  flightmainRap: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  flightSapration: {
    borderColor: theme.colors.basicGrey,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.6,
  },
  durationText: {
    color: theme.colors.basicGrey,
    ...theme.font.fontMedium,
    fontSize: width * 0.036,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.basicGrey,
    marginVertical: height * 0.02,
  },
});
