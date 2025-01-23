import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import HeaderComp from "../../../ReUseComponents/HeaderComp";
import theme from "../../../../utils/theme";
import ToggleButton from "./Components/ToggleButton";
import BookFlightForm from "./Components/BookFlightForm";
import { Modalize } from "react-native-modalize";
import ImageModule from "../../../../ImageModule";
import TravellerQuantity from "../../../ReUseComponents/TravellerQuantity";
import PopularDestination from "../../../ReUseComponents/PopularDestination";
import { createStackNavigator } from "@react-navigation/stack";
import FlightResultScreen from "./FlightResultScreen";
import FilterScreen from "./FilterScreen";
import SortScreen from "./SortScreen";
import AirportSearchModal from "../../../ReUseComponents/AirportSearchModal";
import PassengerDetailScreen from "./PassengerDetailScreen";

const Stack = createStackNavigator<any>();

const { height, width } = Dimensions.get("window");

const classData: any = [
  {
    name: "Economy",
    image: ImageModule.economy,
    apiKey: "ECONOMY",
  },
  {
    name: "P.Economy",
    image: ImageModule.peconomy,
    apiKey: "PREMIUM_ECONOMY",
  },
  {
    name: "Business",
    image: ImageModule.business,
    apiKey: "BUSINESS",
  },
  {
    name: "First",
    image: ImageModule.first,
    apiKey: "FIRST",
  },
];

const BookFlight = ({ navigation }: any) => {
  const modalizeRefTravel = useRef<Modalize>(null);
  const modalizeRefClass = useRef<Modalize>(null);
  const [tripType, setTripType]: any = useState("round-trip");
  const [classType, setClassType]: any = useState(classData?.[0]);
  const [travellers, setTravellers]: any = useState({
    adult: 1,
    child: 0,
    held_infant: 0,
    seated_infant: 0,
  });
  const [isFromModalVisible, setIsFromModalVisible]: any = useState(false);
  const [isToModalVisible, setIsToModalVisible]: any = useState(false);
  const [selectedFromAirport, setSelectedFromAirport]: any = useState(null);
  const [selectedToAirport, setSelectedToAirport]: any = useState(null);

  const handleFromAirportSelect = (airport: any) => {
    setSelectedFromAirport(airport);
    setIsFromModalVisible(false); // Close the modal
  };

  const handleToAirportSelect = (airport: any) => {
    setSelectedToAirport(airport);
    setIsToModalVisible(false); // Close the modal
  };

  return (
    <View style={styles.screenRap}>
      <HeaderComp navigation={navigation} />
      <AirportSearchModal
        isVisible={isFromModalVisible}
        onClose={() => setIsFromModalVisible(false)}
        onAirportSelect={handleFromAirportSelect}
        selectedAirport={selectedFromAirport}
      />

      <AirportSearchModal
        isVisible={isToModalVisible}
        onClose={() => setIsToModalVisible(false)}
        onAirportSelect={handleToAirportSelect}
        selectedAirport={selectedToAirport}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.mainContainer]}
      >
        <ToggleButton tripType={tripType} setTripType={setTripType} />
        <BookFlightForm
          tripType={tripType}
          modalizeRefTravel={modalizeRefTravel}
          modalizeRefClass={modalizeRefClass}
          classType={classType}
          travellers={travellers}
          navigation={navigation}
          selectedFromAirport={selectedFromAirport}
          setIsFromModalVisible={setIsFromModalVisible}
          selectedToAirport={selectedToAirport}
          setIsToModalVisible={setIsToModalVisible}
        />
        <PopularDestination navigation={navigation} />
      </ScrollView>
      <Modalize
        ref={modalizeRefTravel}
        modalHeight={height * 0.4}
        handleStyle={styles.modalHandle}
        handlePosition="inside"
        modalStyle={styles.modalStyle}
      >
        <TravellerQuantity
          travellers={travellers}
          setTravellers={setTravellers}
        />
      </Modalize>

      <Modalize
        ref={modalizeRefClass}
        modalHeight={height * 0.5}
        handleStyle={styles.modalHandle}
        handlePosition="inside"
        modalStyle={styles.modalStyle}
      >
        <View style={styles.classView}>
          {classData.map((item: any) => (
            <TouchableOpacity
              style={[
                styles.classItem,
                item.name === classType?.name && {
                  borderColor: "green",
                },
              ]}
              key={item.name}
              onPress={() => {
                setClassType(item);
                modalizeRefClass.current?.close();
              }}
            >
              <Image style={styles.classImage} source={item.image} />
            </TouchableOpacity>
          ))}
        </View>
      </Modalize>
    </View>
  );
};

const BookFlightScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"BookFlight"}
    >
      <Stack.Screen name="BookFlight" component={BookFlight} />
      <Stack.Screen name="FlightResult" component={FlightResultScreen} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
      <Stack.Screen name="SortScreen" component={SortScreen} />
      <Stack.Screen name="PassengerDetail" component={PassengerDetailScreen} />
    </Stack.Navigator>
  );
};

export default BookFlightScreen;

const styles = StyleSheet.create({
  screenRap: {
    flex: 1,
    backgroundColor: theme.colors.primaryLight,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: width * 0.04,
  },

  // class style
  classView: {
    padding: width * 0.04,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  classItem: {
    marginBottom: width * 0.02,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "transparent",
  },
  classImage: {
    height: width * 0.4,
    width: width * 0.4,
    resizeMode: "contain",
  },

  // Modal styles
  modalHandle: {
    backgroundColor: theme.colors.grey,
    width: width * 0.15,
    height: width * 0.015,
    top: width * 0.03,
  },
  modalStyle: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});
