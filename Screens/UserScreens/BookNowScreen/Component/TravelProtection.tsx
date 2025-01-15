import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import theme from "../../../../utils/theme"; // Your theme file
import Entypo from "@expo/vector-icons/Entypo";
import ImageModule from "../../../../ImageModule";

const { width } = Dimensions.get("window");

const TravelProtection = () => {
  const [yesNoSelected, setYesNoSelected] = useState(false);

  const protectionItems = [
    {
      text: "Airfare covered if the trip is canceled due to a companion's illness or other covered reasons.",
    },
    { text: "Up to $50,000 Emergency Evacuation." },
    {
      text: "Up to $750 Travel Delay, including delays relating to quarantine.",
    },
    {
      text: "Up to $25,000 Medical Expense, covers COVID-19 the same as any sickness.",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Travel Protection Plan</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Image source={ImageModule.protection} style={styles.icon} />
          <Text style={styles.iconText}>
            Reasons you might need travel protection
          </Text>
        </View>

        {protectionItems.map((item, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.greenCircle}>
              <Entypo name="check" size={14} color={theme.colors.white} />
            </View>
            <Text style={styles.itemText}>{item.text}</Text>
          </View>
        ))}

        <Text style={styles.price}>$ 94.41 per person</Text>

        <TouchableOpacity
          style={[
            styles.option,
            yesNoSelected && styles.selectedOption,
            { marginTop: 10 },
          ]}
          onPress={() => {
            setYesNoSelected(true);
          }}
        >
          <View
            style={[
              styles.circle,
              yesNoSelected && { borderColor: theme.colors.black },
            ]}
          >
            {yesNoSelected && (
              <View style={styles.innerCircle}>
                <View style={styles.innerSmallCircle} />
              </View>
            )}
          </View>
          <Text style={styles.optionText}>Yes, I want to protect my trip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, !yesNoSelected && styles.selectedOption]}
          onPress={() => {
            setYesNoSelected(false);
          }}
        >
          <View
            style={[
              styles.circle,
              !yesNoSelected && { borderColor: theme.colors.black },
            ]}
          >
            {!yesNoSelected && (
              <View style={styles.innerCircle}>
                <View style={styles.innerSmallCircle} />
              </View>
            )}
          </View>
          <Text style={styles.optionText}>No, I would risk my entire trip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 1,
    borderColor: theme.colors.grey,
    borderRadius: 5,
  },
  header: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerText: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.04,
    color: theme.colors.white,
  },
  content: {
    padding: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    width: 40, // Adjust as needed
    height: 40, // Adjust as needed
    marginRight: 10,
  },
  iconText: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.035,
    color: theme.colors.black,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  itemText: {
    ...theme.font.fontMedium,
    marginLeft: 5,
    fontSize: width * 0.033,
    color: theme.colors.black,
    width: width * 0.85,
  },
  price: {
    ...theme.font.fontBold,
    fontSize: width * 0.04,
    marginTop: 10,
    color: theme.colors.black,
  },
  innerSmallCircle: {
    backgroundColor: theme.colors.primary,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.grey,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontSize: width * 0.03,
    ...theme.font.fontMedium,
    color: theme.colors.black,
  },
  greenCircle: {
    backgroundColor: theme.colors.green,
    borderRadius: 20,
    padding: 3,
  },
  selectedOption: {},
});

export default TravelProtection;
