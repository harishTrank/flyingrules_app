import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import theme from "../../utils/theme";

const FlightSearchInput = ({ label, icon }: any) => {
  return (
    <View style={styles.mainBox}>
      <Text style={[styles.lable, { width: label === "To" ? 20 : 45 }]}>
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
  mainBox: {},
  lable: {
    ...theme.font.fontMedium,
    backgroundColor: theme.colors.white,
    position: "relative",
    top: 10,
    zIndex: 2,
    width: 45,
    textAlign: "center",
    left: 10,
    fontSize: 12,
    color: "#787878",
  },
  inputBox: {
    borderWidth: 2,
    borderColor: theme.colors.grey,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
  },
  iconImg: {
    height: 25,
    width: 25,
    objectFit: "contain",
  },
  textParentBox: {
    paddingLeft: 10,
  },
  textBox: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  firstText: {
    color: theme.colors.black,
    fontSize: 25,
    ...theme.font.fontBold,
    marginBottom: -5,
  },
  secondText: {
    paddingLeft: 10,
    color: theme.colors.basicGrey,
    ...theme.font.fontSemiBold,
  },
  thirdText: {
    color: theme.colors.basicGrey,
    fontSize: 12,
    ...theme.font.fontMedium,
  },
});
