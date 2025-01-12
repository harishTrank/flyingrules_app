import React from "react";
import HeadingText from "../UserScreens/BottomTabNavigation/HomeScreen/Components/HeadingText";
import { FlatList, View, StyleSheet, Platform } from "react-native";
import DestinationCards from "./DestinationCards";

const destinationData = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Paris",
    price: "400",
  },
  {
    id: "2",
    url: "https://plus.unsplash.com/premium_photo-1677829177642-30def98b0963?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Bali",
    price: "499",
  },
  {
    id: "3",
    url: "https://plus.unsplash.com/premium_photo-1661962958462-9e52fda9954d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Thailand",
    price: "450",
  },
];

const PopularDestination = () => {
  return (
    <View>
      <HeadingText text="Popular Destination" />

      <FlatList
        horizontal={true}
        data={destinationData}
        renderItem={({ item }) => (
          <DestinationCards
            url={item.url}
            title={item.title}
            price={item.price}
          />
        )}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
      />
    </View>
  );
};

export default PopularDestination;

const styles = StyleSheet.create({
  flatList: {
    // Ensure FlatLists don't overflow their content
    ...(Platform.OS === "android" && { overflow: "hidden" }),
  },
});
