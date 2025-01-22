import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import theme from "../../utils/theme";
import { LinearGradient } from "expo-linear-gradient";

const DestinationCards = ({ url, title, price, onPress }: any) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{
          uri: url,
        }}
        style={styles.image}
      />
      <LinearGradient
        colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
        style={styles.gradient}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title} </Text>
        <Text style={styles.price}>${price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width * 0.37,
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
    elevation: 5,
    backgroundColor: theme.colors.black,
    marginVertical: 10,
    marginHorizontal: 7,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%", // Darkens only the bottom 40% of the card
  },
  textContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  title: {
    fontSize: 20,
    color: theme.colors.white,
    ...theme.font.fontSemiBold,
  },
  price: {
    fontSize: 20,
    color: theme.colors.white,
    ...theme.font.fontMedium,
  },
});

export default DestinationCards;
