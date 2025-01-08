import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import theme from "../../utils/theme";

const CustomButton = ({ title, onPress }: any) => {
  return (
    <TouchableOpacity style={styles.buttonBox} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
const styles = StyleSheet.create({
  buttonBox: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: theme.colors.white,
    ...theme.font.fontSemiBold,
    fontSize: 16,
  },
});
