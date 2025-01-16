import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import ImageModule from "../../ImageModule";
import theme from "../../utils/theme";
import Entypo from "@expo/vector-icons/Entypo";
import { currenKeys, durationFormator } from "../../utils/UserUtils";
import dayjs from "dayjs";

const { width, height } = Dimensions.get("window");

const FlightCard = ({ navigation, flight, dictionaries, onPress }: any) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.airlineText}>
          {dictionaries?.carriers?.[flight?.validatingAirlineCodes?.[0]]}
        </Text>
        <Text style={styles.priceText}>{`${
          currenKeys?.[flight?.price?.currency]
        }${flight?.price?.grandTotal}`}</Text>
      </View>

      <View style={styles.flightDetails}>
        {flight?.itineraries?.map((itiner: any, index: any) => (
          <View key={index}>
            <View style={styles.route}>
              <View style={styles.routeDetails}>
                <Text style={styles.routeCode}>
                  {itiner?.segments?.[0]?.departure?.iataCode}
                </Text>
                <Text style={styles.routeTime}>
                  {dayjs(itiner?.segments?.[0]?.departure?.at).format("h:mma")}
                </Text>
                <Text style={styles.routeDate}>
                  {dayjs(itiner?.segments?.[0]?.departure?.at).format(
                    "ddd, MMM DD"
                  )}
                </Text>
              </View>

              <View style={styles.flightInfo}>
                <Image
                  source={ImageModule.planemid}
                  style={styles.airplaneIcon}
                />
                <Text style={styles.durationText}>
                  {durationFormator(itiner?.duration)}
                </Text>
                <Text style={styles.stopsText}>{`${
                  itiner?.segments?.length - 1
                } Stop(s)`}</Text>
              </View>

              <View style={styles.routeDetails}>
                <Text style={[styles.routeCode, styles.textAlignRight]}>
                  {
                    itiner?.segments?.[itiner?.segments?.length - 1]?.arrival
                      ?.iataCode
                  }
                </Text>
                <Text style={[styles.routeTime, styles.textAlignRight]}>
                  {dayjs(
                    itiner?.segments?.[itiner?.segments?.length - 1]?.arrival
                      ?.at
                  ).format("h:mma")}
                </Text>
                <Text style={[styles.routeDate, styles.textAlignRight]}>
                  {dayjs(
                    itiner?.segments?.[itiner?.segments?.length - 1]?.arrival
                      ?.at
                  ).format("ddd, MMM DD")}
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
          </View>
        ))}

        <View style={styles.bottomRow}>
          <View style={styles.iconsContainer}>
            <Image source={ImageModule.baggageIcon} style={styles.icon} />
            <Image source={ImageModule.carryOnIcon} style={styles.icon} />
            <Image source={ImageModule.refreshIcon} style={styles.icon} />
          </View>
          <TouchableOpacity
            style={styles.showDetailsBox}
            onPress={() => navigation.navigate("FlightShowDetails", { flight })}
          >
            <Text style={styles.showDetailsText}>Show Details</Text>
            <Entypo
              name="chevron-down"
              size={18}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookNowButton} onPress={onPress}>
            <Text style={styles.bookNowText}>BOOK NOW</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    ...theme.elevationHeavy,
    marginBottom: 15,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: width * 0.025,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.basicGrey,
    backgroundColor: theme.colors.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  airlineText: {
    ...theme.font.fontBold,
    fontSize: width * 0.045,
    color: theme.colors.white,
  },
  priceText: {
    ...theme.font.fontBold,
    fontSize: width * 0.045,
    color: theme.colors.white,
  },
  flightDetails: {
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
    fontSize: width * 0.065,
    color: theme.colors.black,
  },
  showDetailsBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  routeTime: {
    ...theme.font.fontRegular,
    fontSize: width * 0.035,
    color: theme.colors.black,
  },
  routeDate: {
    ...theme.font.fontRegular,
    fontSize: width * 0.03,
    color: theme.colors.black,
  },
  textAlignRight: {
    textAlign: "right",
  },
  flightInfo: {
    alignItems: "center",
  },
  airplaneIcon: {
    width: width * 0.4,
    height: width * 0.1,
    marginBottom: height * 0.005,
    objectFit: "contain",
  },
  durationText: {
    ...theme.font.fontRegular,
    fontSize: width * 0.03,
    color: theme.colors.black,
  },
  stopsText: {
    ...theme.font.fontRegular,
    fontSize: width * 0.03,
    color: theme.colors.black,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.basicGrey,
    marginVertical: height * 0.02,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconsContainer: {
    flexDirection: "row",
  },
  icon: {
    width: width * 0.05,
    height: width * 0.05,
    marginRight: width * 0.01,
    objectFit: "contain",
  },
  showDetailsText: {
    ...theme.font.fontMedium,
    fontSize: width * 0.03,
    color: theme.colors.primary,
  },
  bookNowButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.01,
    borderRadius: 5,
  },
  bookNowText: {
    ...theme.font.fontBold,
    fontSize: width * 0.035,
    color: theme.colors.white,
  },
});

export default FlightCard;
