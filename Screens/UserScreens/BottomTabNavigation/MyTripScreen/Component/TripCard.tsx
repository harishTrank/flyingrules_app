import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import ImageModule from "../../../../../ImageModule";
import theme from "../../../../../utils/theme";

const { width, height } = Dimensions.get("window");

const TripCard = ({ trip, navigation }: any) => {
  const handleMoreDetailsPress = () => {
    console.log("trip12", trip);
    navigation.navigate("FlightTicketDetails", { trip }); // Navigate and pass data
  };
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.airlineText}>{trip.airline}</Text>
        <Text style={styles.priceText}>{trip.price}</Text>
      </View>

      <View style={styles.cardSecond}>
        <View style={styles.middleRow}>
          <View style={styles.locationContainer}>
            <Text style={styles.codeText}>{trip.from.code}</Text>
            <Text style={styles.cityText}>
              {trip.from.city}, {trip.from.country}
            </Text>
            <Text style={styles.dateText}>{trip.from.date}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image style={styles.middleImg} source={ImageModule.mytripplane} />
          </View>
          <View style={styles.locationContainer}>
            <Text style={[styles.codeText, { textAlign: "right" }]}>
              {trip.to.code}
            </Text>
            <Text style={[styles.cityText, { textAlign: "right" }]}>
              {trip.to.city}, {trip.to.country}
            </Text>
            <Text style={[styles.dateText, { textAlign: "right" }]}>
              {trip.to.date}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.moreDetailsButton}
          onPress={handleMoreDetailsPress}
        >
          <Text style={styles.moreDetailsText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    marginBottom: height * 0.02,
  },
  middleImg: {
    height: width * 0.1,
    width: width * 0.1,
  },
  cardSecond: {
    padding: width * 0.04,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.02,
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
  },
  airlineText: {
    ...theme.font.fontBold,
    fontSize: width * 0.045,
    color: theme.colors.white,
  },
  priceText: {
    ...theme.font.fontBold,
    fontSize: width * 0.04,
    color: theme.colors.white,
  },
  middleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  locationContainer: {
    flex: 1,
  },
  codeText: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.06,
    color: theme.colors.black,
  },
  cityText: {
    ...theme.font.fontRegular,
    fontSize: width * 0.03,
    color: theme.colors.basicGrey,
  },
  dateText: {
    ...theme.font.fontRegular,
    fontSize: width * 0.03,
    color: theme.colors.basicGrey,
  },
  iconContainer: {
    paddingHorizontal: width * 0.05,
  },
  moreDetailsButton: {
    alignSelf: "center",
  },
  moreDetailsText: {
    ...theme.font.fontMedium,
    fontSize: width * 0.035,
    color: theme.colors.primary,
  },
});

export default TripCard;
