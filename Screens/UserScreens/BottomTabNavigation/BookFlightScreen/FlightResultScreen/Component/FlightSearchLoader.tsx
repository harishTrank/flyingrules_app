import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import ImageModule from "../../../../../../ImageModule";
import theme from "../../../../../../utils/theme";
import dayjs from "dayjs";

const { width, height } = Dimensions.get("window");

const FlightSearchLoader = ({ searchForm }: any) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Let us find the best flights for you</Text>
      <Image source={ImageModule.placeanimation} style={styles.animated} />
      <View style={styles.flightInfo}>
        <Text style={styles.route}>
          {searchForm?.locationDeparture}{" "}
          <Image source={ImageModule.circleplane} style={styles.icon} />{" "}
          {searchForm?.locationArrival}
        </Text>
        <Text style={styles.dates}>{`${dayjs(searchForm?.departure).format(
          "DD MMM YYYY"
        )}${
          searchForm?.tripType === "round-trip"
            ? `- ${dayjs(searchForm?.arrival).format("DD MMM YYYY")}`
            : ""
        }`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    marginTop: height * 0.13,
  },
  animated: {
    height: width * 0.5,
    width: width * 0.9,
    objectFit: "contain",
  },
  title: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.05,
    color: theme.colors.black,
    marginBottom: 20,
    textAlign: "center",
  },
  flightInfo: {
    marginTop: 20,
    alignItems: "center",
  },
  route: {
    ...theme.font.fontBold,
    fontSize: width * 0.06,
    color: theme.colors.primary,
    marginBottom: 5,
  },
  dates: {
    ...theme.font.fontMedium,
    fontSize: width * 0.04,
    color: theme.colors.black,
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
});

export default FlightSearchLoader;
