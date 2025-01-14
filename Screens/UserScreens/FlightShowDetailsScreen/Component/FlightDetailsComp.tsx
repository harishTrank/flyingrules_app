import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import ImageModule from "../../../../ImageModule";
import theme from "../../../../utils/theme";

const { height, width } = Dimensions.get("window");

const FlightDetailsComp = ({ itineraryData }: any) => {
  return (
    <View style={styles.itineraryContainer}>
      <View>
        <View style={styles.head}>
          {/* <Image source={ImageModule.dummyLogo} style={styles.flightLogo} /> */}
          <Text style={styles.flightText}>
            {itineraryData.departure.flight}
          </Text>
        </View>
        <View>
          <Text
            style={styles.normalText}
          >{`${itineraryData.departure.time} ${itineraryData.departure.city}`}</Text>
          <View style={styles.secondRow}>
            <Text style={styles.normalText}>
              {itineraryData.departure.code}
            </Text>
            <Text style={styles.normalText}>
              {itineraryData.departure.date}
            </Text>
          </View>
        </View>
        <Text style={styles.terminalText}>
          {`${itineraryData.departure.airport}\nTerminal ${itineraryData.departure.terminal}`}
        </Text>
      </View>

      <View style={styles.flightmainRap}>
        <View style={styles.flightSapration}>
          <Text style={[styles.durationText]}>
            Flight Duration {itineraryData.departure.duration}
          </Text>
        </View>
      </View>

      <View>
        <View style={styles.head}>
          <Text style={styles.flightText}>
            {itineraryData.departure.flight}
          </Text>
        </View>
        <View>
          <Text
            style={styles.normalText}
          >{`${itineraryData.departure.time} ${itineraryData.departure.city}`}</Text>
          <View style={styles.secondRow}>
            <Text style={styles.normalText}>
              {itineraryData.departure.code}
            </Text>
            <Text style={styles.normalText}>
              {itineraryData.departure.date}
            </Text>
          </View>
        </View>
        <Text style={styles.terminalText}>
          {`${itineraryData.departure.airport}\nTerminal ${itineraryData.departure.terminal}`}
        </Text>
      </View>
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
    fontSize: width * 0.038,
  },
  terminalText: {
    color: theme.colors.basicGrey,
    ...theme.font.fontMedium,
    fontSize: width * 0.037,
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
});
