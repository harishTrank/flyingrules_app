import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import theme from "../../../../utils/theme";
import ImageModule from "../../../../ImageModule";

const { width, height } = Dimensions.get("window");

const FlightSummary = ({ navigation, flight }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>FLIGHT SUMMARY</Text>
      </View>
      <View style={styles.route}>
        <View style={styles.routeDetails}>
          <Text style={styles.routeCode}>DEL</Text>
          <Text style={styles.routeTime}>7:50 AM</Text>
          <Text style={styles.routeDate}>JAN 17,2025</Text>
          <Text style={styles.airportText}>
            Indira Gandhi International Airport
          </Text>
        </View>

        <View style={styles.flightInfo}>
          <Image style={styles.imageholder} source={ImageModule.planemid} />
          <View style={styles.durationStopsContainer}>
            <Text style={styles.durationText}>{`13hrs 45min\n1 stop(s)`}</Text>
          </View>
          <Text
            onPress={() => navigation.navigate("FlightShowDetails", { flight })}
            style={styles.showDetailsText}
          >
            Show Details
          </Text>
        </View>

        <View style={styles.routeDetailsLast}>
          <Text style={styles.routeCode}>JFK</Text>
          <Text style={styles.routeTime}>7:05 PM</Text>
          <Text style={styles.routeDate}>JAN 17,2025</Text>
          <Text style={[styles.airportText, { textAlign: "right" }]}>
            John F Kennedy International Airport
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
