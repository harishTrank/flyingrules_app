import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../../../../../utils/theme";
import FlightSearchInput from "../../../../ReUseComponents/FlightSearchInput";
import ImageModule from "../../../../../ImageModule";
import DateInputComp from "./DateInputComp";
import FormBottomOption from "./FormBottomOption";
import CustomButton from "../../../../ReUseComponents/CustomButton";

const BookFlightForm = ({ tripType }: any) => {
  return (
    <View style={styles.mainBox}>
      <FlightSearchInput label={"From"} icon={ImageModule.departIcon} />
      <FlightSearchInput label={"To"} icon={ImageModule.arrivalIcon} />
      <DateInputComp tripType={tripType} />
      <FormBottomOption />
      <CustomButton title={"Search"} onPress={() => console.log("Fuck you")} />
    </View>
  );
};

export default BookFlightForm;

const styles = StyleSheet.create({
  mainBox: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: theme.colors.white,
    marginTop: 15,
    ...theme.elevationLight,
  },
});
