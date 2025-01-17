import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, FlatList, Platform } from "react-native";
import HeaderComp from "../../../ReUseComponents/HeaderComp";
import DestinationCards from "../../../ReUseComponents/DestinationCards";
import HeadingText from "./Components/HeadingText";
import ChooseCard from "./Components/ChooseCard";
import WhyImage from "./Components/WhyImage";
import PopularDestination from "../../../ReUseComponents/PopularDestination";

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
    id: "2",
    path: require("../../../../assets/Image/whyimage2.png"),
  },
  {
    id: "3",
    path: require("../../../../assets/Image/whyimage3.png"),
  },
];

const HomeScreen = ({ navigation }: any) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % whyCardData.length;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <HeaderComp navigation={navigation} />
      <ScrollView
        style={[styles.mainContainer]}
        showsVerticalScrollIndicator={false}
      >
        <PopularDestination />

        <HeadingText text="Why to choose us ?" />
        <FlatList
          horizontal={true}
          data={chooseCardData}
          renderItem={({ item }) => (
            <ChooseCard
              path={item.path}
              title={item.title}
              description={item.description}
            />
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          style={styles.flatList}
        />

        <HeadingText text="Why to book with us ?" />
        <FlatList
          ref={flatListRef}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal={true}
          data={whyCardData}
          renderItem={({ item }) => <WhyImage path={item.path} />}
          keyExtractor={(item) => item.id}
          onViewableItemsChanged={onViewableItemsChanged.current}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContainer: {
    padding: 20,
  },
  flatList: {
    // Ensure FlatLists don't overflow their content
    ...(Platform.OS === "android" && { overflow: "hidden" }),
  },
});
