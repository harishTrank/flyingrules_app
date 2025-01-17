import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import theme from "../../../../../utils/theme";
import HeaderComp from "../../../../ReUseComponents/HeaderComp";
import ImageModule from "../../../../../ImageModule";
import { useAtom } from "jotai";
import { globalDictionaries } from "../../../../../JotaiStore";
import {
  createStringListFromObjectValues,
  getAirports,
  getNamesFromAirportObject,
} from "../../../../../utils/UserUtils";

const { width, height } = Dimensions.get("window");

interface FilterScreenProps {
  navigation: any;
}

const FilterScreen: React.FC<FilterScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<string>("Stops");
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const [dictionaries]: any = useAtom(globalDictionaries);
  const [filterOptions, setFilterOptions]: any = useState({});
  useEffect(() => {
    if (dictionaries) {
      const currentAirport = getAirports(dictionaries?.locations);
      setFilterOptions({
        Stops: ["NON-STOP", "1 STOP", "2 STOP"],
        Airlines: createStringListFromObjectValues(dictionaries?.carriers),
        Airport: getNamesFromAirportObject(currentAirport),
        Aircraft: createStringListFromObjectValues(dictionaries?.aircraft),
      });
    }
  }, [dictionaries]);

  console.log("selectedOptions", selectedOptions);

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  const handleClearAll = () => {
    setSelectedOptions({}); // Clear all selected options
  };

  const handleApple = () => {};

  // Function to handle option press (for toggling selection)
  const handleOptionPress = (tab: string, option: string) => {
    setSelectedOptions((prevOptions: any) => {
      const updatedOptions = { ...prevOptions };
      if (!updatedOptions[tab]) {
        updatedOptions[tab] = [];
      }
      const index = updatedOptions[tab].indexOf(option);
      if (index > -1) {
        updatedOptions[tab].splice(index, 1); // Remove if already selected
      } else {
        updatedOptions[tab].push(option); // Add if not selected
      }
      return updatedOptions;
    });
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const isSelected = selectedOptions[activeTab]?.includes(item);

    return (
      <TouchableOpacity
        style={[
          styles.optionRow,
          index % 2 === 0 && {
            backgroundColor: theme.colors.primarySecond,
          },
        ]}
        onPress={() => handleOptionPress(activeTab, item)} // Pass tab and item to the handler
      >
        <Text style={styles.optionText}>{item}</Text>
        <View
          style={[
            styles.checkbox,
            isSelected && styles.checkboxChecked, // Apply checked style if selected
          ]}
        >
          {isSelected && (
            <Image source={ImageModule.checkIcon} style={styles.checkIcon} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.white }}>
      <HeaderComp navigation={navigation} back={true} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Filters</Text>
        <View style={styles.buttonRap}>
          <TouchableOpacity style={styles.borderBtn} onPress={handleClearAll}>
            <Text style={styles.clearAllText}>Clear all</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.borderBtn} onPress={handleApple}>
            <Text style={styles.clearAllText}>Apply</Text>
          </TouchableOpacity>
        </View>
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
        keyExtractor={(item, index) => index.toString()}
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
    padding: width * 0.02,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
  },
  headerTitle: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.05,
    color: theme.colors.black,
  },
  buttonRap: {
    flexDirection: "row",
    alignItems: "center",
    width: "35%",
    justifyContent: "space-between",
  },
  clearAllText: {
    ...theme.font.fontMedium,
    fontSize: width * 0.032,
    color: theme.colors.white,
  },
  borderBtn: {
    padding: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
  },
  tab: {
    flex: 1,
    paddingVertical: width * 0.02,
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
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.03,
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
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary,
  },
  checkIcon: {
    width: width * 0.03,
    height: width * 0.03,
    objectFit: "cover",
  },
});

export default FilterScreen;
