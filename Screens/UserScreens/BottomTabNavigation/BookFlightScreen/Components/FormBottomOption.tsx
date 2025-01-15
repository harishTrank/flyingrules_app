import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import theme from "../../../../../utils/theme";

const { width } = Dimensions.get("window");

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
        <Text style={[styles.label, { width: width * 0.18 }]}>Traveller</Text>
        <View style={styles.textBox}>
          <Text style={styles.text}>{`${travellers.adult} Adult${
            travellers.child !== 0 ? `, ${travellers.child} Child` : ""
          }`}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondBox} onPress={onOpenClass}>
        <Text style={[styles.label, { width: width * 0.12 }]}>Class</Text>
        <View
          style={[
            styles.textBox,
            { alignItems: "center", justifyContent: "space-between" },
          ]}
        >
          <Text style={styles.text}>{classType?.name}</Text>
          <Entypo
            name="chevron-down"
            size={width * 0.05}
            color={theme.colors.black}
          />
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
    top: width * 0.03,
    zIndex: 2,
    textAlign: "center",
    left: width * 0.025,
    fontSize: width * 0.03,
    color: "#787878",
  },
  textBox: {
    borderWidth: 2,
    borderColor: theme.colors.grey,
    paddingVertical: width * 0.025,
    paddingHorizontal: width * 0.04,
    flexDirection: "row",
    borderRadius: 10,
  },
  text: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
    paddingLeft: width * 0.02,
    fontSize: width * 0.035,
  },
});
