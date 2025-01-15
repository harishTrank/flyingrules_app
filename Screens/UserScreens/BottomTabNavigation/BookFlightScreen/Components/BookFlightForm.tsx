import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import theme from "../../../../../utils/theme";
import FlightSearchInput from "../../../../ReUseComponents/FlightSearchInput";
import ImageModule from "../../../../../ImageModule";
import DateInputComp from "./DateInputComp";
import FormBottomOption from "./FormBottomOption";
import CustomButton from "../../../../ReUseComponents/CustomButton";
import AirportSearchModal from "../../../../ReUseComponents/AirportSearchModal";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

const BookFlightForm = ({
  tripType,
  modalizeRefTravel,
  modalizeRefClass,
  classType,
  travellers,
  navigation,
  selectedFromAirport,
  setIsFromModalVisible,
  selectedToAirport,
  setIsToModalVisible,
}: any) => {
  const searchFlightBtnHandler = () => {
    if (!selectedFromAirport) {
      return Toast.show({
        type: "error",
        text1: "Please Select From Location.",
      });
    } else if (!selectedToAirport) {
      return Toast.show({
        type: "error",
        text1: "Please Select To Location.",
      });
    }
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
