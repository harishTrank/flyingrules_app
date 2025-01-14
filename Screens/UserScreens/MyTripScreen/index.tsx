import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import HeaderComp from "../../ReUseComponents/HeaderComp";
import theme from "../../../utils/theme";
import TripCard from "./Component/TripCard";
import { createStackNavigator } from "@react-navigation/stack";
import FlightTicketDetailsScreen from "./FlightTicketDetailsScreen";
const Stack = createStackNavigator<any>();

const { width, height } = Dimensions.get("window");

const tripsData = [
  {
    id: "1",
    airline: "FINNAIR",
    from: {
      code: "DEL",
      city: "Delhi",
      airport: "Indira Gandhi International Airport",
      date: "15/01/2025",
      time: "09.30",
    },
    to: {
      code: "JFK",
      city: "New York",
      airport: "Aalborg Airport",
      date: "15/01/2025", // You might want to adjust this
      time: "09.30", // You might want to adjust this
    },
    flightNumber: "IN 230",
    gate: "22",
    seat: "2B",
    class: "Economy",
  },
];

const MyTrips = ({ navigation }: any) => {
  const option: any = ["Active Trips", "Past Trips"];
  const [tripType, setTripType]: any = useState("Active Trips");

  return (
    <View style={styles.container}>
      <View style={styles.safeArea}>
        <HeaderComp navigation={navigation} />
        <View style={styles.toggleBox}>
          {option.map((item: any) => (
            <TouchableOpacity
              key={item}
              onPress={() => setTripType(item)}
              style={[
                styles.toggleButton,
                {
                  backgroundColor:
                    tripType === item
                      ? theme.colors.primary
                      : theme.colors.white,
                },
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  {
                    color:
                      tripType === item
                        ? theme.colors.white
                        : theme.colors.black,
                  },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.cardContainer}>
          <FlatList
            data={tripsData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TripCard navigation={navigation} trip={item} />
            )}
            contentContainerStyle={[styles.listContainer]}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

const MyTripsScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"BottomTabNavigation"}
    >
      <Stack.Screen name="BottomTabNavigation" component={MyTrips} />
      <Stack.Screen
        name="FlightTicketDetails"
        component={FlightTicketDetailsScreen}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primaryLight,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: width * 0.04,
  },
  cardContainer: {
    marginTop: height * 0.005,
    flex: 1, // Add this to make the FlatList fill the available space
    paddingHorizontal: width * 0.04, // Add horizontal padding
  },
  toggleBox: {
    flexDirection: "row",
    marginTop: height * 0.02, // Use height for consistent spacing
    marginHorizontal: width * 0.04, // Add horizontal margin
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "space-between",
    ...theme.elevationHeavy,
    backgroundColor: theme.colors.white,
    padding: 5, // Use width for consistent padding
  },
  toggleButton: {
    width: "49%", // Slightly less than 50% to avoid overlap due to rounding
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10, // Use height for consistent padding
    borderRadius: 25,
  },
  toggleText: {
    color: theme.colors.black,
    ...theme.font.fontSemiBold,
    fontSize: width * 0.035, // Responsive font size
  },
  listContainer: {
    paddingTop: height * 0.02, // Add padding to the top
    paddingBottom: height * 0.02, // Add padding to the bottom
  },
});

export default MyTripsScreen;
