import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import theme from "../../../../utils/theme";
import Entypo from "@expo/vector-icons/Entypo";
import { currenKeys } from "../../../../utils/UserUtils";

const { width } = Dimensions.get("window");

const PriceDetails = ({ flight, choiceManager }: any) => {
  const [bottomOpen, setBottomOpen]: any = useState(false);
  const [totalPriceManager, setTotalPriceManager]: any = useState(
    flight?.price?.total
  );

  useEffect(() => {
    let newTotalPrice = Number(flight?.price?.total);
    if (choiceManager?.refund) {
      newTotalPrice += flight?.price?.grandTotal * 0.2;
    }
    if (choiceManager?.protection) {
      newTotalPrice += flight?.price?.grandTotal * 0.1;
    }
    if (choiceManager?.trusted) {
      newTotalPrice += flight?.price?.base * 0.07;
    }
    setTotalPriceManager(newTotalPrice.toFixed(2));
  }, [choiceManager, flight]);

  return (
    <View style={styles.priceDetailsContainer}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setBottomOpen(!bottomOpen)}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headerText}>Price Details</Text>
          <Entypo name="chevron-down" size={20} color={theme.colors.white} />
        </View>
        <Text style={styles.headerPrice}>{`${
          currenKeys?.[flight?.price?.currency]
        }${totalPriceManager}`}</Text>
      </TouchableOpacity>

      {bottomOpen && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {flight?.travelerPricings?.map((travel: any) => (
            <View key={travel?.travelerId}>
              <View style={styles.passengerRow}>
                <Text
                  style={styles.passengerLabel}
                >{`Passenger ${travel?.travelerId}, ${travel?.travelerType}`}</Text>
                <Text style={styles.passengerPrice}>{`${
                  currenKeys?.[travel?.price?.currency]
                }${travel?.price?.total}`}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>
                  Price per {travel?.travelerType?.toLowerCase()}
                </Text>
                <Text style={styles.detailValue}>{`${
                  currenKeys?.[travel?.price?.currency]
                }${travel?.price?.base}`}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Taxes & Fees</Text>
                <Text style={styles.detailValue}>{`${
                  currenKeys?.[travel?.price?.currency]
                }${travel?.price?.tax}`}</Text>
              </View>

              <View style={styles.divider} />
            </View>
          ))}
          {choiceManager?.refund && (
            <View style={[styles.passengerRow, { paddingBottom: 5 }]}>
              <Text style={styles.passengerLabel}>Refundable Booking</Text>
              <Text style={styles.passengerPrice}>{`${
                currenKeys?.[flight?.price?.currency]
              }${(flight?.price?.grandTotal * 0.2)?.toFixed(2)}`}</Text>
            </View>
          )}
          {choiceManager?.protection && (
            <View style={[styles.passengerRow, { paddingBottom: 5 }]}>
              <Text style={styles.passengerLabel}>Travel Protection</Text>
              <Text style={styles.passengerPrice}>{`${
                currenKeys?.[flight?.price?.currency]
              }${(flight?.price?.grandTotal * 0.1)?.toFixed(2)}`}</Text>
            </View>
          )}
          {choiceManager?.trusted && (
            <View style={[styles.passengerRow, { paddingBottom: 5 }]}>
              <Text style={styles.passengerLabel}>TTP</Text>
              <Text style={styles.passengerPrice}>{`${
                currenKeys?.[flight?.price?.currency]
              }${(flight?.price?.base * 0.07)?.toFixed(2)}`}</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  priceDetailsContainer: {
    backgroundColor: theme.colors.white, // White background
    borderWidth: 1,
    borderColor: theme.colors.grey, // Dark blue border
    borderRadius: 5,
    margin: 10,
    marginBottom: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  headerText: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.04,
    color: theme.colors.white, // White text
  },
  headerPrice: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.04,
    color: theme.colors.white, // White text
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.primary, // Dark blue divider
    marginTop: 8,
    marginBottom: 8,
    marginHorizontal: 10,
  },
  passengerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  passengerLabel: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.04,
    color: theme.colors.black,
  },
  passengerPrice: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.04,
    color: theme.colors.black,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  detailLabel: {
    fontSize: width * 0.035,
    color: theme.colors.primary,
    ...theme.font.fontMedium,
  },
  detailValue: {
    fontSize: width * 0.035,
    color: theme.colors.primary,
  },
  travelProtectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  travelProtectionLabel: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.04,
    color: theme.colors.black,
  },
  travelProtectionPrice: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.04,
    color: theme.colors.black,
  },
  totalPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  totalPriceLabel: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.045,
    color: theme.colors.black,
  },
  totalPriceValue: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.045,
    color: theme.colors.black,
  },
});

export default PriceDetails;
