import React from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import theme from "../../utils/theme";

const { width } = Dimensions.get("window");

const FlightSearchInput = ({ label, icon }: any) => {
  return (
    <View style={styles.mainBox}>
      <Text style={[styles.lable, { width: label === "To" ? width * 0.05 : width * 0.11 }]}>
        {label}
      </Text>
      <View style={styles.inputBox}>
        <Image style={styles.iconImg} source={icon} />
        <View style={styles.textParentBox}>
          <View style={styles.textBox}>
            <Text style={styles.firstText}>Delhi</Text>
            <Text style={styles.secondText}>DEL</Text>
          </View>
          <Text style={styles.thirdText}>
            Indira Gandhi International Airport
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FlightSearchInput;

const styles = StyleSheet.create({
  mainBox: {
  },
  lable: {
    ...theme.font.fontMedium,
    backgroundColor: theme.colors.white,
    position: "relative",
    top: width * 0.03, // Use 3% of screen width
    zIndex: 2,
    textAlign: "center",
    left: width * 0.025, // Use 2.5% of screen width
    fontSize: width * 0.03, // Responsive font size
    color: "#787878",
  },
  inputBox: {
    borderWidth: 2,
    borderColor: theme.colors.grey,
    borderRadius: 10,
    paddingVertical: width * 0.025, // Use 2.5% of screen width
    paddingHorizontal: width * 0.04, // Use 4% of screen width
    flexDirection: "row",
  },
  iconImg: {
    height: width * 0.06, // Use 6% of screen width
    width: width * 0.06, // Use 6% of screen width
    objectFit: "contain",
  },
  textParentBox: {
    paddingLeft: width * 0.025, // Use 2.5% of screen width
  },
  textBox: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  firstText: {
    color: theme.colors.black,
    fontSize: width * 0.05, // Responsive font size
    ...theme.font.fontBold,
    marginBottom: -5,
  },
  secondText: {
    paddingLeft: width * 0.025, // Use 2.5% of screen width
    color: theme.colors.basicGrey,
    ...theme.font.fontSemiBold,
    fontSize: width * 0.035, // Responsive font size
  },
  thirdText: {
    color: theme.colors.basicGrey,
    ...theme.font.fontMedium,
    fontSize: width * 0.03, // Responsive font size
  },
});