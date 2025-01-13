import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import ImageModule from "../../../../../ImageModule";
import theme from "../../../../../utils/theme";
import HeaderComp from "../../../../ReUseComponents/HeaderComp";

const { width, height } = Dimensions.get("window");

const FlightTicketDetailsScreen = ({ route, navigation }: any) => {
  const { trip }: any = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.primaryLight }}>
      <HeaderComp navigation={navigation} />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.airlineContainer}>
            <Text style={styles.airlineText}>{trip.airline}</Text>
          </View>

          <View style={styles.flightInfo}>
            <View style={styles.route}>
              <View style={styles.routeDetails}>
                <Text style={styles.routeCode}>{trip.from.code}</Text>
                <Text style={styles.routeCity}>{trip.from.city}</Text>
                <Text style={styles.routeAirport}>{trip.from.airport}</Text>
              </View>

              <Image
                source={ImageModule.planemid}
                style={styles.airplaneIcon}
              />

              <View style={styles.routeDetails}>
                <Text style={[styles.routeCode, styles.textAlignRight]}>
                  {trip.to.code}
                </Text>
                <Text style={[styles.routeCity, styles.textAlignRight]}>
                  {trip.to.city}
                </Text>
                <Text style={[styles.routeAirport, styles.textAlignRight]}>
                  {trip.to.airport}
                </Text>
              </View>
            </View>

            <View style={styles.dateTimeRow}>
              <View style={styles.dateTimeContainer}>
                <Image
                  source={ImageModule.Calendersecond}
                  style={styles.icon}
                />
                <Text style={styles.dateTimeText}>{trip.from.date}</Text>
              </View>
              <View style={styles.dateTimeContainer}>
                <Image source={ImageModule.clock} style={styles.icon} />
                <Text style={styles.dateTimeText}>{trip.from.time}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Flight</Text>
              <Text style={styles.detailsValue}>{trip.flightNumber}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Gate</Text>
              <Text style={styles.detailsValue}>{trip.gate}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Seat</Text>
              <Text style={styles.detailsValue}>{trip.seat}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Class</Text>
              <Text style={styles.detailsValue}>{trip.class}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: height * 0.02,
  },
  card: {
    backgroundColor: theme.colors.white,
    marginHorizontal: width * 0.04,
    borderRadius: 10,
    ...theme.elevationHeavy,
  },
  airlineContainer: {
    padding: width * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.basicGrey,
  },
  airlineText: {
    ...theme.font.fontBold,
    fontSize: width * 0.07,
    textAlign: "center",
    color: theme.colors.primary,
  },
  flightInfo: {
    padding: width * 0.04,
  },
  route: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  routeDetails: {
    flex: 1,
  },
  routeCode: {
    ...theme.font.fontBold,
    fontSize: width * 0.06,
    color: theme.colors.black,
  },
  routeCity: {
    ...theme.font.fontMedium,
    fontSize: width * 0.04,
    color: theme.colors.black,
  },
  routeAirport: {
    ...theme.font.fontRegular,
    fontSize: width * 0.035,
    color: theme.colors.basicGrey,
  },
  textAlignRight: {
    textAlign: "right",
  },
  airplaneIcon: {
    width: width * 0.35,
    height: width * 0.35,
    objectFit: "contain",
  },
  dateTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.02,
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: width * 0.05,
    height: width * 0.05,
    marginRight: width * 0.02,
    tintColor: theme.colors.black,
  },
  dateTimeText: {
    ...theme.font.fontRegular,
    fontSize: width * 0.04,
    color: theme.colors.black,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.basicGrey,
    marginVertical: height * 0.02,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height * 0.01,
  },
  detailsLabel: {
    ...theme.font.fontRegular,
    fontSize: width * 0.04,
    color: theme.colors.basicGrey,
  },
  detailsValue: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.04,
    color: theme.colors.black,
  },
});

export default FlightTicketDetailsScreen;
