import React, { useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import theme from "../../../../../utils/theme";

const FormBottomOption = ({
  modalizeRefTravel,
  modalizeRefClass,
  classType,
  travellers,
}: any) => {
  const onOpenTravellers = () => {
    modalizeRefTravel.current?.open();
  };

  const onOpenClass = () => {
    modalizeRefClass.current?.open();
  };

  return (
    <View style={styles.mainBox}>
      <TouchableOpacity style={styles.firstBox} onPress={onOpenTravellers}>
        <Text style={styles.label}>Traveller</Text>
        <View style={styles.textBox}>
          <Text style={styles.text}>{`${travellers.adult} Adult${
            travellers.child !== 0 ? `, ${travellers.child} Child` : ""
          }`}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondBox} onPress={onOpenClass}>
        <Text style={[styles.label, { width: 45 }]}>Class</Text>
        <View
          style={[
            styles.textBox,
            { alignItems: "center", justifyContent: "space-between" },
          ]}
        >
          <Text style={styles.text}>{classType}</Text>
          <Entypo name="chevron-down" size={20} color={theme.colors.black} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FormBottomOption;

const styles = StyleSheet.create({
  mainBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  firstBox: { width: "48%" },
  secondBox: { width: "48%" },
  label: {
    ...theme.font.fontMedium,
    backgroundColor: theme.colors.white,
    position: "relative",
    top: 10,
    zIndex: 2,
    width: 60,
    textAlign: "center",
    left: 10,
    fontSize: 12,
    color: "#787878",
  },
  textBox: {
    borderWidth: 2,
    borderColor: theme.colors.grey,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    borderRadius: 10,
  },
  text: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
    paddingLeft: 5,
  },
});
