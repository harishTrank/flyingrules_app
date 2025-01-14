import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList, // Import FlatList
  TouchableOpacity,
} from "react-native";
import theme from "../../../../../utils/theme";
import HeaderComp from "../../../../ReUseComponents/HeaderComp";

const { width, height } = Dimensions.get("window");

interface FilterScreenProps {
  navigation: any;
}

const FilterScreen: React.FC<FilterScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<string>("Stops");

  // Dummy data for filter options (replace with actual data from API)
  const filterOptions: any = {
    Stops: ["NON-STOP", "1 STOP", "2 STOP"],
    Airlines: [
      "KLM ROYAL DUTCH AIRLINES",
      "AIR CANADA",
      "LOT POUSH AIRLINES",
      "FINNAIR",
      "DELTA AIR LINES",
      "ITA AIRWAYS",
      "ALL NIPPON AIRWAYS",
      "UNITED AIRLINES",
      "EUROATLANTIC AIRWAYS",
      "VIRGIN ATLANTIC",
      "ETHIOPIAN AIRLINES",
    ],
    Airport: [
      "Newark International Airport",
      "Bole International Airport",
      "LaGuardia Airport",
      "Charles de Gaulle International Airport",
      "Schiphol Airport",
      "Indira Gandhi International Airport",
      "Okecie International Airport",
      "John F Kennedy International Airport",
      "Helsinki Vantaa Airport",
      "Aéroport International Pierre-Elliott-Trudeau d",
      "Leonardo da Vinci International Airport",
      "London Heathrow Airport",
      "Toronto Lester B Pearson International Airport",
      "Tokyo International Airport",
    ],
    Aircraft: [
      "AIRBUS A320",
      "AIRBUS A321",
      "AIRBUS A330-300",
      "AIRBUS A350-900",
      "AIRBUS A320 (SHARKLETS)",
      "AIRBUS A320 NEO",
      "BOEING 737-800",
      "BOEING 737-900",
      "BOEING 787-9",
      "BOEING 737 ALL SEARIES PASSENGER",
      "BOEING 737 MAX 8",
      "BOEING 737-800(WINGLETS)",
      "BOEING 777-300ER",
    ],
  };

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  const handleClearAll = () => {
    // Handle clearing all selected filters
    console.log("Clear All Filters");
  };

  const renderItem = ({ item, index }: any) => (
    <TouchableOpacity
      style={[
        styles.optionRow,
        index % 2 === 0 && {
          backgroundColor: theme.colors.primarySecond,
        },
      ]}
    >
      <Text style={styles.optionText}>{item}</Text>
      <View style={styles.checkbox} />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.white }}>
      <HeaderComp navigation={navigation} back={true} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Filters</Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={styles.clearAllText}>Clear all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        {Object.keys(filterOptions).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => handleTabPress(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filterOptions[activeTab]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} // Use index as a fallback key
        // contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: width * 0.04,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
  },
  headerTitle: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.05,
    color: theme.colors.black,
  },
  clearAllText: {
    ...theme.font.fontRegular,
    fontSize: width * 0.04,
    color: theme.colors.primary,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
  },
  tab: {
    flex: 1,
    paddingVertical: height * 0.02,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    ...theme.font.fontRegular,
    fontSize: width * 0.04,
    color: theme.colors.basicGrey,
  },
  activeTabText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
  },
  contentContainer: {
    padding: width * 0.04,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: width * 0.04,
  },
  optionText: {
    ...theme.font.fontMedium,
    fontSize: width * 0.035,
    color: theme.colors.black,
  },
  checkbox: {
    width: width * 0.05,
    height: width * 0.05,
    borderWidth: 1,
    borderColor: theme.colors.basicGrey,
    borderRadius: 4,
  },
});

export default FilterScreen;
