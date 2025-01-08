import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import theme from "../../../../../utils/theme";

const ChooseCard = ({ path, title, description }: any) => {
  return (
    <View style={styles.containerCard}>
      <View style={styles.imageContainer}>
        <Image style={styles.img} source={path} />
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>"{description}"</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    flexDirection: "row",
    backgroundColor: "skyblue",
    height: 100,
    width: 330,
    borderRadius: 15,
    marginRight: 15,
  },
  card: {
    height: 50,
    width: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginHorizontal: 8,
  },
  imageContainer: {
    height: "100%",
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  img: {
    height: 80,
    width: 80,
  },
  rightContainer: {
    height: "100%",
    width: "70%",
    flexDirection: "column",
  },
  titleContainer: {
    height: "40%",
    width: "100%",
  },
  titleText: {
    fontSize: 20,
    color: theme.colors.white,
    ...theme.font.fontBold,
    marginTop: 15,
    marginHorizontal: 15,
  },
  descriptionContainer: {
    height: "60%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: theme.colors.white,
    ...theme.font.fontRegular,
    marginTop: -10,
  },
});

export default ChooseCard;
