import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import theme from "../../../utils/theme";
import HeaderComp from "../../ReUseComponents/HeaderComp";
import ImageModule from "../../../ImageModule";
import FlightDetailsComp from "./Component/FlightDetailsComp";

const { width, height } = Dimensions.get("window");

interface FlightShowDetailsScreenProps {
  navigation: any;
}

const FlightShowDetailsScreen: React.FC<FlightShowDetailsScreenProps> = ({
  navigation,
}) => {
  const [activeTab, setActiveTab] = useState<"itinerary" | "fares">(
    "itinerary"
  );

  // Dummy data (replace with actual data from API)
  const itineraryData = {
    departure: {
      city: "Delhi",
      airport: "Indira Gandhi International Airport",
      country: "India",
      terminal: "3",
      code: "DEL",
      time: "08:55 pm",
      date: "Thu, 09 Jan 2025",
      flight: "Air India A1-441",
      duration: "2 H 25 M",
    },
    transit: {
      city: "Mumbai",
      airport: "Chhatrapati Shivaji International Airport",
      country: "India",
      terminal: "2",
      code: "BOM",
      duration: "2 H 25 M",
    },
    arrival: {
      city: "New York",
      airport: "John F Kennedy International Airport",
      country: "United States",
      terminal: "4",
      code: "JFK",
      time: "6:55 am",
      date: "Thu, 10 Jan 2025",
      flight: "AI-119",
      duration: "15 H 40 M",
    },
  };

  const faresData = {
    adult: {
      count: 3,
      price: "578.07",
    },
    child: {
      count: 3,
      price: "192.69",
    },
    taxes: "136.00",
    grandTotal: "906.76",
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.white }}>
      <HeaderComp navigation={navigation} />

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "itinerary" && styles.activeTab]}
          onPress={() => setActiveTab("itinerary")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "itinerary" && styles.activeTabText,
            ]}
          >
            Itinerary
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "fares" && styles.activeTab]}
          onPress={() => setActiveTab("fares")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "fares" && styles.activeTabText,
            ]}
          >
            Fares
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {activeTab === "itinerary" ? (
          <View>
            <View style={styles.section}>
              <View style={styles.headerRow1}>
                <Image
                  source={ImageModule.airplaneTakeoff}
                  style={styles.iconImg}
                />
                <View>
                  <Text style={styles.sectionTitle}>
                    Departure - {itineraryData.departure.city}
                  </Text>
                  <Text
                    style={[styles.airportText, { color: theme.colors.black }]}
                  >
                    {`${itineraryData.departure.airport}, ${itineraryData.departure.country}`}
                  </Text>
                </View>
              </View>
            </View>
            <FlightDetailsComp itineraryData={itineraryData} />
            <View style={[styles.bottomTransit]}>
              <View style={styles.headerRow}>
                <Image
                  source={ImageModule.transitIcon}
                  style={styles.bottomiconImg}
                />
                <View>
                  <Text style={styles.sectionTitle}>
                    {itineraryData.transit.duration} transit in
                  </Text>
                  <Text style={styles.airportText}>
                    {`${itineraryData.departure.airport}, ${itineraryData.departure.country}`}
                  </Text>
                </View>
              </View>
            </View>
            <FlightDetailsComp itineraryData={itineraryData} />
          </View>
        ) : (
          <View style={styles.faresContainer}>
            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>
                Adult X {faresData.adult.count}
              </Text>
              <Text style={styles.fareValue}>$ {faresData.adult.price}</Text>
            </View>
            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>
                Child X {faresData.child.count}
              </Text>
              <Text style={styles.fareValue}>$ {faresData.child.price}</Text>
            </View>
            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Taxes</Text>
              <Text style={styles.fareValue}>$ {faresData.taxes}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Grand Total</Text>
              <Text style={styles.fareValue}>$ {faresData.grandTotal}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    paddingHorizontal: width * 0.04,
    paddingTop: height * 0.02,
  },
  tab: {
    flex: 1,
    paddingVertical: height * 0.01,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    ...theme.font.fontRegular,
    fontSize: width * 0.04,
    color: theme.colors.black,
  },
  activeTabText: {
    ...theme.font.fontBold,
    color: theme.colors.primary,
  },
  contentContainer: {
    paddingHorizontal: width * 0.04,
    paddingBottom: height * 0.04,
  },

  section: {
    marginBottom: height * 0.01,
  },
  bottomTransit: {
    padding: 10,
    width: "100%",
  },
  headerRow1: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: -15,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconImg: {
    width: width * 0.1,
    height: width * 0.1,
    marginRight: width * 0.02,
    objectFit: "contain",
  },
  bottomiconImg: {
    width: width * 0.07,
    height: width * 0.07,
    marginRight: width * 0.02,
    objectFit: "contain",
  },
  sectionTitle: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.042,
    color: theme.colors.black,
  },
  airportText: {
    ...theme.font.fontMedium,
    fontSize: width * 0.035,
    color: theme.colors.basicGrey,
    width: width * 0.85,
  },
  flightInfo: {
    marginBottom: height * 0.01,
    marginLeft: width * 0.04,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.01,
  },
  flightText: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.04,
    color: theme.colors.black,
  },
  timeText: {
    ...theme.font.fontBold,
    fontSize: width * 0.05,
    color: theme.colors.black,
  },
  cityText: {
    ...theme.font.fontBold,
    fontSize: width * 0.065,
    color: theme.colors.black,
    marginHorizontal: width * 0.02,
  },
  airportCodeText: {
    ...theme.font.fontRegular,
    fontSize: width * 0.04,
    color: theme.colors.black,
  },
  dateText: {
    ...theme.font.fontRegular,
    fontSize: width * 0.035,
    color: theme.colors.black,
    marginTop: height * 0.005,
  },
  terminalText: {
    ...theme.font.fontRegular,
    fontSize: width * 0.035,
    color: theme.colors.black,
  },
  durationText: {
    ...theme.font.fontRegular,
    fontSize: width * 0.035,
    color: theme.colors.black,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.basicGrey,
    marginVertical: height * 0.01,
  },
  faresContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    ...theme.elevationHeavy,
    padding: width * 0.04,
    marginTop: height * 0.02,
  },
  fareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height * 0.01,
  },
  fareLabel: {
    ...theme.font.fontMedium,
    fontSize: width * 0.04,
    color: theme.colors.black,
  },
  fareValue: {
    ...theme.font.fontMedium,
    fontSize: width * 0.04,
    color: theme.colors.black,
  },
});

export default FlightShowDetailsScreen;
