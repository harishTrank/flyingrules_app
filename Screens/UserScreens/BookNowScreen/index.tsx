import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import HeaderComp from "../../ReUseComponents/HeaderComp";
import FlightSummary from "./Component/FlightSummary";
import RefundableBooking from "./Component/RefundableBooking";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PriceDetails from "./Component/PriceDetails";
import theme from "../../../utils/theme";
import TravelProtection from "./Component/TravelProtection";
import TravelersTrustedProgram from "./Component/TravelersTrustedProgram";
import BillingForm from "./Component/BillingForm";

const BookNowScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <HeaderComp navigation={navigation} />
      <PriceDetails />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: useSafeAreaInsets().bottom }}
      >
        <FlightSummary navigation={navigation} />
        <RefundableBooking />
        <TravelProtection />
        <TravelersTrustedProgram />
        <BillingForm />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});

export default BookNowScreen;
