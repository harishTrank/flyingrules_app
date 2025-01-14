import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import FlightCard from "../../../../ReUseComponents/FlightCard";
import theme from "../../../../../utils/theme";
import HeaderComp from "../../../../ReUseComponents/HeaderComp";
import ImageModule from "../../../../../ImageModule";
import Entypo from "@expo/vector-icons/Entypo";
const { width, height } = Dimensions.get("window");

interface FlightResultScreenProps {
  navigation: any;
}

const FlightResultScreen: React.FC<FlightResultScreenProps> = ({
  navigation,
}) => {
  const [flights, setFlights] = useState([
    // ... your flight data
    {
      airline: "FINNAIR",
      price: "$1265.85",
      departure: {
        code: "DEL",
        time: "2:30pm",
        date: "Fri, Jan 17",
      },
      arrival: {
        code: "JFK",
        time: "6:55pm",
        date: "Fri, Jan 17",
      },
      duration: "02hr 40min",
      stops: "1 Stop(s)",
    },
    {
      airline: "FINNAIR",
      price: "$1265.85",
      departure: {
        code: "DEL",
        time: "2:30pm",
        date: "Fri, Jan 17",
      },
      arrival: {
        code: "JFK",
        time: "6:55pm",
        date: "Fri, Jan 17",
      },
      duration: "02hr 40min",
      stops: "1 Stop(s)",
    },
    {
      airline: "FINNAIR",
      price: "$1265.85",
      departure: {
        code: "DEL",
        time: "2:30pm",
        date: "Fri, Jan 17",
      },
      arrival: {
        code: "JFK",
        time: "6:55pm",
        date: "Fri, Jan 17",
      },
      duration: "02hr 40min",
      stops: "1 Stop(s)",
    },
  ]);

  const handleBookNow = (flight: any) => {
    navigation.navigate("BookNowScreen", { trip: flight });
  };

  const renderItem = ({ item }: { item: any }) => (
    <FlightCard
      navigation={navigation}
      flight={item}
      onPress={() => handleBookNow(item)}
    />
  );

  // flight categories search
  const [currentFlight, setCurrentFlight]: any = useState("Cheapest");
  const flightCategories: any = [
    {
      name: "Cheapest",
      price: "$113.20 ⦿ 28H 45M",
    },
    {
      name: "Best",
      price: "$153.20 ⦿ 25H 45M",
    },
    {
      name: "Quickest",
      price: "$113.20 ⦿ 28H 45M",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.white }}>
      <HeaderComp navigation={navigation} />

      <View style={styles.filterSortContainer}>
        <View style={styles.filterSortRow}>
          {flightCategories.map((item: any) => (
            <TouchableOpacity
              style={[
                styles.optionContainer,
                currentFlight === item.name && {
                  backgroundColor: theme.colors.primary,
                },
              ]}
              key={item.name}
              onPress={() => setCurrentFlight(item.name)}
            >
              <Text
                style={[
                  styles.optionLabel,
                  currentFlight === item.name && {
                    color: theme.colors.white,
                  },
                ]}
              >
                {item.name}
              </Text>
              <Text
                style={[
                  styles.optionValue,
                  currentFlight === item.name && {
                    color: theme.colors.white,
                  },
                ]}
              >
                {item.price}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.filterSortRow, { borderWidth: 0 }]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("FilterScreen")}
          >
            <Image source={ImageModule.filterIcon} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Filter</Text>
            <Entypo name="chevron-down" size={20} color={theme.colors.black} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("SortScreen")}
          >
            <Image source={ImageModule.sortIcon} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Sort</Text>
            <Entypo name="chevron-down" size={20} color={theme.colors.black} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={flights}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContentContainer: {
    paddingHorizontal: width * 0.025,
    paddingTop: height * 0.02,
  },
  filterSortContainer: {
    backgroundColor: theme.colors.white,
    paddingTop: height * 0.02,
  },
  filterSortRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height * 0.01,
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: theme.colors.basicGrey,
    borderRadius: 5,
  },
  optionContainer: {
    alignItems: "center",
    borderRightWidth: 1,
    justifyContent: "center",
    borderRightColor: theme.colors.basicGrey,
    flexGrow: 1,
  },
  optionLabel: {
    ...theme.font.fontMedium,
    fontSize: width * 0.035,
    color: theme.colors.black,
  },
  optionValue: {
    ...theme.font.fontMedium,
    fontSize: width * 0.027,
    color: theme.colors.black,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: theme.colors.basicGrey,
    width: "40%",
    justifyContent: "space-around",
  },
  buttonIcon: {
    width: width * 0.05,
    height: width * 0.05,
    marginRight: width * 0.02,
  },
  buttonText: {
    ...theme.font.fontMedium,
    fontSize: width * 0.04,
  },
});

export default FlightResultScreen;
