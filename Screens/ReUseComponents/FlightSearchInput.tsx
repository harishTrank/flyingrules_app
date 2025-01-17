import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import theme from "../../utils/theme";

const { width } = Dimensions.get("window");

const FlightSearchInput = ({ label, icon, value, onFocus, airport }: any) => {
  return (
    <TouchableOpacity
      style={styles.mainBox}
      onPress={onFocus}
      disabled={!onFocus}
    >
      <Text
        style={[
          styles.lable,
          { width: label === "To" ? width * 0.05 : width * 0.11 },
        ]}
      >
        {label}
      </Text>
      <View style={styles.inputBox}>
        <Image style={styles.iconImg} source={icon} />
        <View style={styles.textParentBox}>
          <View style={styles.textBox}>
            <Text style={styles.firstText}>
              {airport ? airport?.address?.cityName : value ? value : label}
            </Text>
            <Text style={styles.secondText}>
              {airport ? airport?.iataCode : `Code`}
            </Text>
          </View>
          <Text style={styles.thirdText}>
            {airport ? airport.address?.countryName : "Location"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FlightSearchInput;

const styles = StyleSheet.create({
  mainBox: {},
  lable: {
    ...theme.font.fontMedium,
    backgroundColor: theme.colors.white,
    position: "relative",
    top: width * 0.03,
    zIndex: 2,
    textAlign: "center",
    left: width * 0.025,
    fontSize: width * 0.03,
    color: "#787878",
  },
  inputBox: {
    borderWidth: 2,
    borderColor: theme.colors.grey,
    borderRadius: 10,
    paddingVertical: width * 0.01,
    paddingHorizontal: width * 0.03,
    flexDirection: "row",
    alignItems: "center", // Align items vertically in the center
  },
  iconImg: {
    height: width * 0.06,
    width: width * 0.06,
    objectFit: "contain",
  },
  textParentBox: {
    paddingLeft: width * 0.025,
  },
  textBox: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  firstText: {
    color: theme.colors.black,
    fontSize: width * 0.045,
    ...theme.font.fontBold,
    marginBottom: -5,
  },
  secondText: {
    paddingLeft: width * 0.01,
    color: theme.colors.basicGrey,
    ...theme.font.fontSemiBold,
    fontSize: width * 0.025,
  },
  thirdText: {
    color: theme.colors.basicGrey,
    ...theme.font.fontMedium,
    fontSize: width * 0.03,
  },
});
