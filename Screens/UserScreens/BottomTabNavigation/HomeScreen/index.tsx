import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import HeaderComp from "../../../ReUseComponents/HeaderComp";
import theme from "../../../../utils/theme";
import ToggleButton from "./Components/ToggleButton";
import BookFlightForm from "./Components/BookFlightForm";

const HomeScreen = ({ navigation }: any) => {
  const [tripType, setTripType]: any = useState("One Way");
  return (
    <View style={styles.screenRap}>
      <HeaderComp navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainContainer}
      >
        <ToggleButton tripType={tripType} setTripType={setTripType} />
        <BookFlightForm />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screenRap: {
    flex: 1,
    backgroundColor: theme.colors.primaryLight,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
