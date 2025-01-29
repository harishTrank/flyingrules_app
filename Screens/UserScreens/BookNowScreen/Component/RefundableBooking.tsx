import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import theme from "../../../../utils/theme";
import Entypo from "@expo/vector-icons/Entypo";
import { currenKeys } from "../../../../utils/UserUtils";

const { width } = Dimensions.get("window");

const RefundableBooking = ({
  flight,
  choiceManager,
  setChoiceManager,
}: any) => {
  const coveredItems = [
    { text: "Flight refund: ($38.54)" },
    { text: "Public Transport Failure" },
    { text: "Illness / Injury (including Covid-19)" },
    { text: "Pre-existing Medical Condition" },
    { text: "Sickness, Accident and Injury" },
    { text: "Adverse Weather" },
    { text: "Home Emergency" },
    { text: "Private vehicle failure" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Refundable Booking</Text>
      </View>

      <View style={styles.content}>
        {coveredItems.map((item, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.greenCircle}>
              <Entypo name="check" size={14} color={theme.colors.white} />
            </View>
            <Text style={styles.itemText}>{item.text}</Text>
          </View>
        ))}

        <Text style={styles.disclaimer}>
          * To a Maximum of $10,000 for Domestic Air Tickets or $50,000 for
          International Air Tickets. Trip cancelation due to government travel
          advisories or fear of travel is not covered.
        </Text>

        <Text style={styles.price}>
          {`${currenKeys?.[flight?.price?.currency]}${(
            flight?.price?.grandTotal * 0.2
          )?.toFixed(2)}`}{" "}
          per person
        </Text>

        <TouchableOpacity
          style={[
            styles.option,
            choiceManager?.refund && styles.selectedOption,
            { marginTop: 10 },
          ]}
          onPress={() => {
            setChoiceManager((oldVal: any) => {
              return { ...oldVal, refund: true };
            });
          }}
        >
          <View
            style={[
              styles.circle,
              choiceManager?.refund && { borderColor: theme.colors.black },
            ]}
          >
            {choiceManager?.refund && (
              <View style={styles.innerCircle}>
                <View style={styles.innerSmallCircle} />
              </View>
            )}
          </View>
          <Text style={styles.optionText}>Yes, make my booking refundable</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            !choiceManager?.refund && styles.selectedOption,
          ]}
          onPress={() => {
            setChoiceManager((oldVal: any) => {
              return { ...oldVal, refund: false };
            });
          }}
        >
          <View
            style={[
              styles.circle,
              !choiceManager?.refund && { borderColor: theme.colors.black },
            ]}
          >
            {!choiceManager?.refund && (
              <View style={styles.innerCircle}>
                <View style={styles.innerSmallCircle} />
              </View>
            )}
          </View>
          <Text style={styles.optionText}>
            No, don't make my booking refundable
          </Text>
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
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  greenCircle: {
    backgroundColor: theme.colors.green,
    borderRadius: 20,
    padding: 3,
  },
  itemText: {
    ...theme.font.fontMedium,
    marginLeft: 5,
    fontSize: width * 0.035,
    color: theme.colors.black,
    width: width * 0.85,
  },
  disclaimer: {
    fontSize: width * 0.032,
    color: theme.colors.black,
    marginTop: 10,
    ...theme.font.fontMedium,
  },
  price: {
    ...theme.font.fontBold,
    fontSize: width * 0.04,
    marginTop: 10,
    color: theme.colors.black,
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
  innerSmallCircle: {
    backgroundColor: theme.colors.primary,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  optionText: {
    fontSize: width * 0.03,
    ...theme.font.fontMedium,
    color: theme.colors.black,
  },
  selectedOption: {},
});

export default RefundableBooking;
