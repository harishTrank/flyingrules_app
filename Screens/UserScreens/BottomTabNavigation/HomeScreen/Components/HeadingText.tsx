import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../../../../../utils/theme";

const HeadingText = ({ text }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  text: {
    fontSize: 18,
    color: theme.colors.black,
    ...theme.font.fontBold,
  },
});

export default HeadingText;
