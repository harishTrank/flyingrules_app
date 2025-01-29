import React, { useEffect, useState } from "react";
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
import { currentPassengerIndex } from "../../../JotaiStore";

const BookNowScreen = ({ navigation, route }: any) => {
  const { flight } = route?.params;
  const [, setCurrentTravelerIndex]: any = useAtom(currentPassengerIndex);
  const [choiceManager, setChoiceManager]: any = useState({
    refund: false,
    protection: false,
    trusted: false,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setCurrentTravelerIndex(flight?.travelerPricings?.length - 1);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <HeaderComp navigation={navigation} />
      <PriceDetails choiceManager={choiceManager} flight={flight} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: useSafeAreaInsets().bottom }}
      >
        <FlightSummary navigation={navigation} flight={flight} />
        <RefundableBooking
          setChoiceManager={setChoiceManager}
          choiceManager={choiceManager}
          flight={flight}
        />
        <TravelProtection
          choiceManager={choiceManager}
          setChoiceManager={setChoiceManager}
          flight={flight}
        />
        <TravelersTrustedProgram
          choiceManager={choiceManager}
          setChoiceManager={setChoiceManager}
          flight={flight}
        />
        <BillingForm flight={flight} />
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
