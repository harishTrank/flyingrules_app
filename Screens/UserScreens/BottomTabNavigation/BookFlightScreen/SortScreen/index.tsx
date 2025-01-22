import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import theme from "../../../../../utils/theme";
import HeaderComp from "../../../../ReUseComponents/HeaderComp";
import { useAtom } from "jotai";
import { sortFilter } from "../../../../../JotaiStore";

const { width, height } = Dimensions.get("window");

interface SortScreenProps {
  navigation: any;
}

const SortScreen: React.FC<SortScreenProps> = ({ navigation }) => {
  const [selectedOption, setSelectedOption]: any = useAtom(sortFilter); // Initial selected option

  const sortOptions = [
    "Relevance",
    "Price : High to Low",
    "Price : Low to High",
  ]; // Replace with your sort options

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.white }}>
      <HeaderComp navigation={navigation} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sort</Text>
      </View>

      {sortOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionRow,
            index % 2 === 0 && { backgroundColor: theme.colors.primarySecond },
          ]}
          onPress={() => handleOptionPress(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
          <View
            style={[
              styles.radioButton,
              selectedOption === option && styles.radioButtonSelected,
            ]}
          >
            {selectedOption === option && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: width * 0.04,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
  },
  headerTitle: {
    ...theme.font.fontBold,
    fontSize: width * 0.05,
    color: theme.colors.black,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: width * 0.04,
  },
  optionText: {
    ...theme.font.fontRegular,
    fontSize: width * 0.04,
    color: theme.colors.black,
  },
  radioButton: {
    width: width * 0.05,
    height: width * 0.05,
    borderRadius: width * 0.025, // Make it a circle
    borderWidth: 1,
    borderColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    backgroundColor: theme.colors.white,
  },
  radioButtonInner: {
    width: width * 0.03,
    height: width * 0.03,
    borderRadius: width * 0.015, // Make it a circle
    backgroundColor: theme.colors.primary,
  },
});

export default SortScreen;
