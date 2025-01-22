import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import theme from "../../../../utils/theme";
import ImageModule from "../../../../ImageModule";
import { currenKeys, durationFormator } from "../../../../utils/UserUtils";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { globalDictionaries } from "../../../../JotaiStore";
import { getAirportNames } from "../../../../utils/UserUtils";

const { width, height } = Dimensions.get("window");
const FlightSummary = ({ navigation, flight }: any) => {
  const [dictionaries]: any = useAtom(globalDictionaries);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>FLIGHT SUMMARY</Text>
      </View>
      <View style={styles.route}>
        <View style={styles.routeDetails}>
          <Text style={styles.routeCode}>
            {flight?.itineraries[0]?.segments[0]?.departure?.iataCode}
          </Text>
          <Text style={styles.routeTime}>
            {dayjs(flight?.itineraries[0]?.segments[0]?.departure?.at).format(
              "h:mma"
            )}
          </Text>
          <Text style={styles.routeDate}>
            {dayjs(flight?.itineraries[0]?.segments[0]?.departure?.at).format(
              "MMM DD, YYYY"
            )}
          </Text>
          <Text style={styles.airportText}>
            {`${getAirportNames(
              flight?.itineraries[0]?.segments[0]?.departure?.iataCode,
              dictionaries?.airportNames
            )}\nTerminal ${
              flight?.itineraries[0]?.segments[0]?.departure?.terminal || 0
            }`}
          </Text>
        </View>

        <View style={styles.flightInfo}>
          <Image style={styles.imageholder} source={ImageModule.planemid} />
          <View style={styles.durationStopsContainer}>
            <Text style={styles.durationText}>
              {durationFormator(flight?.itineraries[0]?.duration)}
            </Text>
          </View>
          <Text
            onPress={() => navigation.navigate("FlightShowDetails")}
            style={styles.showDetailsText}
          >
            Show Details
          </Text>
        </View>

        <View style={styles.routeDetailsLast}>
          <Text style={styles.routeCode}>
            {
              flight?.itineraries[0]?.segments[
                flight?.itineraries[0]?.segments?.length - 1
              ]?.arrival?.iataCode
            }
          </Text>
          <Text style={styles.routeTime}>
            {dayjs(
              flight?.itineraries[0]?.segments[
                flight?.itineraries[0]?.segments?.length - 1
              ]?.arrival?.at
            ).format("h:mma")}
          </Text>
          <Text style={styles.routeDate}>
            {dayjs(
              flight?.itineraries[0]?.segments[
                flight?.itineraries[0]?.segments?.length - 1
              ]?.arrival?.at
            ).format("MMM DD, YYYY")}
          </Text>
          <Text style={[styles.airportText, { textAlign: "right" }]}>
            {`${getAirportNames(
              flight.itineraries[0].segments[
                flight?.itineraries[0]?.segments?.length - 1
              ]?.arrival?.iataCode,
              dictionaries?.airportNames
            )}\nTerminal ${
              flight.itineraries[0].segments[
                flight?.itineraries[0]?.segments?.length - 1
              ]?.arrival?.terminal || 0
            }`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    marginBottom: 0,
    borderColor: theme.colors.grey,
  },
  header: {
    backgroundColor: theme.colors.primary,
    padding: width * 0.03,
    borderRadius: 5,
  },
  headerText: {
    ...theme.font.fontSemiBold,
    fontWeight: "bold",
    fontSize: width * 0.04,
    color: theme.colors.white,
  },
  route: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  routeDetails: {
    flex: 1,
    alignItems: "flex-start",
  },
  routeDetailsLast: {
    flex: 1,
    alignItems: "flex-end",
  },
  routeCode: {
    ...theme.font.fontSemiBold,
    fontWeight: "bold",
    fontSize: width * 0.065,
    color: theme.colors.black,
  },
  routeTime: {
    ...theme.font.fontMedium,
    fontSize: width * 0.035,
    color: theme.colors.black,
  },
  routeDate: {
    ...theme.font.fontMedium,
    fontSize: width * 0.03,
    color: theme.colors.black,
  },
  airportText: {
    ...theme.font.fontMedium,
    fontSize: width * 0.03,
    color: theme.colors.primary,
  },
  flightInfo: {
    alignItems: "center",
  },
  imageholder: {
    height: width * 0.1,
    width: width * 0.35,
    objectFit: "contain",
  },
  durationStopsContainer: {
    flexDirection: "row",
    gap: 5,
    marginTop: 0,
  },
  durationText: {
    ...theme.font.fontMedium,
    fontSize: width * 0.027,
    color: theme.colors.black,
    marginTop: 0,
    textAlign: "center",
  },
  showDetailsText: {
    ...theme.font.fontMedium,
    fontSize: width * 0.03,
    color: theme.colors.primary,
    textDecorationLine: "underline",
    marginTop: height * 0.005,
  },
});

export default FlightSummary;
