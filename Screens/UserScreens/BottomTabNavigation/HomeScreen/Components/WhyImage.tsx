import React from "react";
import { View, StyleSheet, Image, Text, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");
const WhyImage = ({ path }: any) => {
  return (
    <View style={styles.containerCard}>
      <Image style={styles.img} source={path} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    width: width * 0.85,
    borderRadius: 15,
    marginRight: 15,
    margin: 10,
    marginTop: -10,
  },
  img: {
    width: width * 0.85,
    height: height * 0.3,
    objectFit: "contain",
    borderRadius: 15,
    flexShrink: 1,
  },
});

export default WhyImage;
