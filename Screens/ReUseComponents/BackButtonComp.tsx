import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import theme from "../../utils/theme";

const BackButtonComp = ({ navigation }: any) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.backButton}
    >
      <Ionicons name="chevron-back" size={24} color={theme.colors.white} />
    </TouchableOpacity>
  );
};

export default BackButtonComp;
const styles = StyleSheet.create({
  backButton: {
    marginBottom: 20,
    backgroundColor: theme.colors.primary,
    width: 40,
    height: 40,
    alignItems:"center",
    justifyContent:"center",
    borderRadius: 20
  },
});
