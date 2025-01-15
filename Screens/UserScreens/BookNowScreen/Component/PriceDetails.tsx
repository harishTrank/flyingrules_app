import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import theme from "../../../../utils/theme";
import Entypo from "@expo/vector-icons/Entypo";

const { width } = Dimensions.get("window");

const PriceDetails = () => {
  const [bottomOpen, setBottomOpen]: any = useState(false);
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
        <Text style={styles.headerPrice}>$ 4704.07</Text>
      </TouchableOpacity>

      {bottomOpen && (
        <>
          <View style={styles.passengerRow}>
            <Text style={styles.passengerLabel}>Passenger 1, Adult</Text>
            <Text style={styles.passengerPrice}>$ 1373.45</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Price per adult</Text>
            <Text style={styles.detailValue}>$ 1167.43</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Taxes & Fees</Text>
            <Text style={styles.detailValue}>$ 206.02</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.passengerRow}>
            <Text style={styles.passengerLabel}>Passenger 2, Adult</Text>
            <Text style={styles.passengerPrice}>$ 1373.45</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Price per adult</Text>
            <Text style={styles.detailValue}>$ 1167.43</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Taxes & Fees</Text>
            <Text style={styles.detailValue}>$ 206.02</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.passengerRow}>
            <Text style={styles.passengerLabel}>Passenger 3, Child</Text>
            <Text style={styles.passengerPrice}>$ 1373.45</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Price per adult</Text>
            <Text style={styles.detailValue}>$ 1167.43</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Taxes & Fees</Text>
            <Text style={styles.detailValue}>$ 206.02</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.travelProtectionRow}>
            <Text style={styles.travelProtectionLabel}>Travel Protection</Text>
            <Text style={styles.travelProtectionPrice}>$ 583.72</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalPriceRow}>
            <Text style={styles.totalPriceLabel}>Total Price</Text>
            <Text style={styles.totalPriceValue}>$ 4704.07</Text>
          </View>
        </>
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
