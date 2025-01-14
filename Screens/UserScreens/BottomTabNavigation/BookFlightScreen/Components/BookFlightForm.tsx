import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import theme from "../../../../../utils/theme";
import FlightSearchInput from "../../../../ReUseComponents/FlightSearchInput";
import ImageModule from "../../../../../ImageModule";
import DateInputComp from "./DateInputComp";
import FormBottomOption from "./FormBottomOption";
import CustomButton from "../../../../ReUseComponents/CustomButton";
import AirportSearchModal from "../../../../ReUseComponents/AirportSearchModal";

const { width } = Dimensions.get("window");

const BookFlightForm = ({
  tripType,
  modalizeRefTravel,
  modalizeRefClass,
  classType,
  travellers,
  navigation,
}: any) => {
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

  const searchFlightBtnHandler = () => {
    navigation.navigate("FlightResult");
  };
  return (
    <View style={styles.mainBox}>
      <FlightSearchInput
        label={"From"}
        icon={ImageModule.departIcon}
        value={selectedFromAirport ? selectedFromAirport.city : ""}
        onFocus={() => setIsFromModalVisible(true)} // Open the modal
        airport={selectedFromAirport}
      />
      <FlightSearchInput
        label={"To"}
        icon={ImageModule.arrivalIcon}
        value={selectedToAirport ? selectedToAirport.city : ""}
        onFocus={() => setIsToModalVisible(true)} // Open the modal
        airport={selectedToAirport}
      />

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
      <DateInputComp tripType={tripType} />
      <FormBottomOption
        modalizeRefTravel={modalizeRefTravel}
        modalizeRefClass={modalizeRefClass}
        classType={classType}
        travellers={travellers}
      />
      <CustomButton title={"Search"} onPress={searchFlightBtnHandler} />
    </View>
  );
};

export default BookFlightForm;

const styles = StyleSheet.create({
  mainBox: {
    padding: width * 0.04, // Use 4% of screen width for padding
    borderRadius: 15,
    backgroundColor: theme.colors.white,
    marginTop: 15,
    ...theme.elevationLight,
  },
});
