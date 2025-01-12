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
    flexDirection: "row",
    width: width * 0.85,
    borderRadius: 15,
    marginRight: 15,
    margin: 10,
    paddingBottom: 50
  },
  img: {
    width: width * 0.85,
    height: 200,
    objectFit: "cover",
    borderRadius: 15,
  },
});

export default WhyImage;
