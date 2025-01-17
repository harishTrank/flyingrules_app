import React from "react";
import { Image, Text, View, StyleSheet, Dimensions } from "react-native";
import ImageModule from "../../../../ImageModule";
import theme from "../../../../utils/theme";

const { height, width } = Dimensions.get("window");

const LayoverComp = () => {
  return (
    <View style={[styles.section, styles.bottomTransit]}>
      <View style={styles.headerRow}>
        <Image source={ImageModule.transitIcon} style={styles.bottomiconImg} />
        <View>
          <Text style={styles.sectionTitle}>111 transit in</Text>
          <Text style={styles.airportText}>{`${"123"}, ${"123"}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default LayoverComp;

const styles = StyleSheet.create({
  section: {
    marginBottom: height * 0.01,
  },
  bottomTransit: {
    padding: 10,
    width: "100%",
  },
  bottomiconImg: {
    width: width * 0.07,
    height: width * 0.07,
    marginRight: width * 0.02,
    objectFit: "contain",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.042,
    color: theme.colors.black,
  },
  airportText: {
    ...theme.font.fontMedium,
    fontSize: width * 0.035,
    color: theme.colors.black,
    width: width * 0.85,
  },
});
