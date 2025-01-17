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
import { currenKeys, getAirportNames } from "../../../utils/UserUtils";
import { useAtom } from "jotai";
import { globalDictionaries, travellersGlobal } from "../../../JotaiStore";

const { width, height } = Dimensions.get("window");

const FlightShowDetailsScreen = ({ navigation, route }: any) => {
  const [activeTab, setActiveTab] = useState<"itinerary" | "fares">(
    "itinerary"
  );
  const { flight } = route?.params;
  const [dictionaries]: any = useAtom(globalDictionaries);
  const [travellersGlobalData]: any = useAtom(travellersGlobal);
  console.log("flight?.price)", flight?.price?.base);
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
            {flight?.itineraries?.map((inter: any, index: any) => (
              <View key={index}>
                <View style={styles.section}>
                  <View style={styles.headerRow1}>
                    <Image
                      source={ImageModule.airplaneTakeoff}
                      style={styles.iconImg}
                    />
                    <View>
                      <Text style={styles.sectionTitle}>
                        {`${index === 0 ? "Departure" : "Return"}`} -{" "}
                        {inter?.segments?.[0]?.departure?.iataCode}
                      </Text>
                      <Text style={styles.airportText}>
                        {getAirportNames(
                          inter?.segments?.[0]?.departure?.iataCode,
                          dictionaries?.airportNames
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
                <FlightDetailsComp itineraryData={inter} />
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.faresContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>S. No.</Text>
              <Text style={styles.tableHeaderText}>Passenger</Text>
              <Text style={styles.tableHeaderText}>
                Base ({flight?.price?.currency})
              </Text>
              <Text style={styles.tableHeaderText}>
                TAX ({flight?.price?.currency})
              </Text>
            </View>

            {travellersGlobalData?.map((item: any) => (
              <View key={item?.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item?.id}</Text>
                <Text style={styles.tableCell}>{item?.travelerType}</Text>
                <Text style={styles.tableCell}>
                  {(
                    Number(flight?.price?.base) / travellersGlobalData?.length
                  )?.toFixed(2)}
                </Text>
                <Text style={styles.tableCell}>
                  {(
                    Number(flight?.price?.tax) / travellersGlobalData?.length
                  )?.toFixed(2)}
                </Text>
              </View>
            ))}

            <View style={styles.tableFooter}>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
              <Text style={[styles.tableCell, styles.grandTotalLabel]}>
                Grand Total ({flight?.price?.currency})
              </Text>
              <Text style={[styles.tableCell, styles.grandTotalValue]}>
                {`${flight?.price?.grandTotal}`}
              </Text>
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
  headerRow1: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: -15,
  },
  iconImg: {
    width: width * 0.1,
    height: width * 0.1,
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
    color: theme.colors.black,
    width: width * 0.85,
  },
  faresContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 5,
    borderColor: theme.colors.grey,
    borderWidth: 1,
    padding: width * 0.015,
    marginTop: height * 0.02,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: theme.colors.grey,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
    paddingVertical: height * 0.01,
  },
  tableHeaderText: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.032,
    color: theme.colors.black,
    flex: 1,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
    paddingVertical: height * 0.01,
  },
  tableCell: {
    ...theme.font.fontMedium,
    fontSize: width * 0.035,
    color: theme.colors.black,
    flex: 1,
    textAlign: "center",
  },
  tableFooter: {
    flexDirection: "row",
    paddingVertical: height * 0.01,
  },
  grandTotalLabel: {
    ...theme.font.fontBold,
    textAlign: "right",
    paddingRight: width * 0.02,
  },
  grandTotalValue: {
    ...theme.font.fontBold,
  },
});

export default FlightShowDetailsScreen;
