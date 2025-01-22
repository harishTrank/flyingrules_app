import React from "react";
import HeadingText from "../UserScreens/BottomTabNavigation/HomeScreen/Components/HeadingText";
import { FlatList, View, StyleSheet, Platform } from "react-native";
import DestinationCards from "./DestinationCards";
import dayjs from "dayjs";

const destinationData = [
  {
    id: "1",
    url: "https://media.istockphoto.com/id/1167975236/photo/the-statue-of-liberty-over-the-scene-of-new-york-cityscape-river-side-which-location-is-lower.webp?a=1&b=1&s=612x612&w=0&k=20&c=YGjmE6DoiytqYUk9CcWXl8bDA3VWGXzxyDT1IB1NUqY=",
    title: "New York",
    price: "399",
    depart: "NYC",
    arrival: "BOS",
  },
  {
    id: "2",
    url: "https://media.istockphoto.com/id/148773996/photo/big-ben.webp?a=1&b=1&s=612x612&w=0&k=20&c=9uMoHKCh1iEqNQu1AfFFKCZP8M_mih20s-rhHdNXVaY=",
    title: "London",
    price: "299",
    depart: "LON",
    arrival: "NYC",
  },
  {
    id: "3",
    url: "https://media.istockphoto.com/id/911570904/photo/view-of-venices-grand-canal.webp?a=1&b=1&s=612x612&w=0&k=20&c=JKgltRdcvC-l6j88GlbyNz7ikY38P0zNJHrWhU3sHlQ=",
    title: "Italy",
    price: "599",
    depart: "ROM",
    arrival: "LGW",
  },
  {
    id: "4",
    url: "https://media.istockphoto.com/id/1301579230/photo/spanish-cities-the-sacred-barcelona-family.webp?a=1&b=1&s=612x612&w=0&k=20&c=-7CYv3b-Z62pNVEZYguL8Kk95rujATVBQyIaPTTE82M=",
    title: "Spain",
    price: "799",
    depart: "POS",
    arrival: "LGW",
  },
];

const PopularDestination = ({ navigation }: any) => {
  const navigationWithBookData = (item: any) => {
    navigation.navigate("FlightResult", {
      locationDeparture: item?.depart,
      locationArrival: item?.arrival,
      departure: dayjs().add(1, "day").toDate(),
      arrival: undefined,
      travellers: { adult: 1, child: 0 },
      flightClass: "ECONOMY",
      tripType: "one-way",
    });
  };
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
            onPress={() => navigationWithBookData(item)}
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
