import React, { useEffect } from "react";
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
import { useAtom } from "jotai";
import {
  currentPassengerIndex,
  passengerDetailsGlobal,
} from "../../../JotaiStore";

const BookNowScreen = ({ navigation, route }: any) => {
  const { flight } = route?.params;
  const [passengerDetails]: any = useAtom(passengerDetailsGlobal);
  const [, setCurrentTravelerIndex]: any = useAtom(currentPassengerIndex);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setCurrentTravelerIndex(flight?.travelerPricings?.length - 1);
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      <HeaderComp navigation={navigation} />
      <PriceDetails flight={flight} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: useSafeAreaInsets().bottom }}
      >
        <FlightSummary navigation={navigation} flight={flight} />
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
