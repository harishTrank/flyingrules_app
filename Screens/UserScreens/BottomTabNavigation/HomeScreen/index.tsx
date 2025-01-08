import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import HeaderComp from "../../../ReUseComponents/HeaderComp";
import DestinationCards from "./Components/DestinationCards";
import HeadingText from "./Components/HeadingText";
import ChooseCard from "./Components/ChooseCard";
import WhyImage from "./Components/WhyImage";

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

const chooseCardData = [
  {
    id: "1",
    path: require("../../../../assets/Image/cuate1.png"),
    title: "Easy Ticket Booking",
    description: "Effortless ticket booking at your fingertips",
  },
  {
    id: "2",
    path: require("../../../../assets/Image/cuate2.png"),
    title: "Best Tour Plan",
    description: "Embark on the ultimate adventure with our tour plan",
  },
  {
    id: "3",
    path: require("../../../../assets/Image/cuate3.png"),
    title: "24/7 customer support",
    description: "Ensuring assistance at every hour",
  },
];

const whyCardData = [
  {
    id: "1",
    path: require("../../../../assets/Image/whyimage1.png"),
  },
  {
    id: "1",
    path: require("../../../../assets/Image/whyimage2.png"),
  },
  {
    id: "1",
    path: require("../../../../assets/Image/whyimage3.png"),
  },
];

const HomeScreen = ({ navigation }: any) => {
  return (
    <View>
      <HeaderComp navigation={navigation} />
      <ScrollView style={styles.mainContainer}>
        <HeadingText text="Popular Destination" />

        <FlatList
          horizontal={true}
          data={destinationData} // data to be rendered
          renderItem={({ item }) => (
            <DestinationCards
              url={item.url}
              title={item.title}
              price={item.price}
            />
          )} // render each item using renderItem function
          keyExtractor={(item) => item.id} // unique key for each item
        />

        <HeadingText text="Why to choose us ?" />
        <FlatList
          horizontal={true}
          data={chooseCardData} // data to be rendered
          renderItem={({ item }) => (
            <ChooseCard
              path={item.path}
              title={item.title}
              description={item.description}
            />
          )} // render each item using renderItem function
          keyExtractor={(item) => item.id} // unique key for each item
        />

        <HeadingText text="Why to book with us ?" />
        <FlatList
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal={true}
          data={whyCardData} // data to be rendered
          renderItem={({ item }) => <WhyImage path={item.path} />} // render each item using renderItem function
          keyExtractor={(item) => item.id} // unique key for each item
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
  },
  cardScroll: {
    flexDirection: "row",
  },
});
