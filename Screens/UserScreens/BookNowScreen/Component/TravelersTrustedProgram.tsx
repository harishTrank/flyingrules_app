import React from "react";
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

const TravelersTrustedProgram = () => {
  const services = [
    {
      name: "Baggage Protection Get benefits of up to $1000 per bag",
      standard: false,
      premium: true,
    },
    {
      name: "Dedicated Services Dedicated Personalized Service & Toll-Free",
      standard: false,
      premium: true,
    },
    {
      name: "Cancelation Within 24 hrs",
      standard: true,
      premium: true,
    },
    {
      name: "If the airline reschedules, we'll help find the best alternative.",
      standard: false,
      premium: true,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Traveler's Trusted Programm(TTP)</Text>
      </View>
      <Text style={styles.headerSubText}>
        Step up your travel game with Travelers' Trusted Program (TTP), for you
        can trust us with all of your travel-related assistance.
      </Text>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>Services</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Standard</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Premium</Text>
        </View>

        {services.map((service, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCellText, { flex: 2 }]}>
              {service.name}
            </Text>
            <View style={[styles.tableCell, { flex: 1 }]}>
              {service.standard ? (
                <View style={styles.greenCircle}>
                  <Entypo name="check" size={14} color={theme.colors.white} />
                </View>
              ) : (
                <Text style={styles.dash}>—</Text>
              )}
            </View>
            <View style={[styles.tableCell, { flex: 1 }]}>
              {service.premium ? (
                <View style={styles.greenCircle}>
                  <Entypo name="check" size={14} color={theme.colors.white} />
                </View>
              ) : (
                <Text style={styles.dash}>—</Text>
              )}
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add for $59.68</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 1,
    borderColor: theme.colors.grey,
    borderRadius: 5,
  },
  header: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerText: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.04,
    color: theme.colors.white,
  },
  headerSubText: {
    ...theme.font.fontMedium,
    fontSize: width * 0.033,
    color: theme.colors.black,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  table: {
    padding: 10,
  },
  tableHeader: {
    flexDirection: "row",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBlockColor: theme.colors.black,
  },
  tableHeaderText: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.035,
    color: theme.colors.black,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  tableCell: {
    alignItems: "center",
    justifyContent: "center",
  },
  tableCellText: {
    ...theme.font.fontMedium,
    fontSize: width * 0.032,
    color: theme.colors.black,
  },
  greenCircle: {
    backgroundColor: theme.colors.green,
    borderRadius: 20,
    padding: 3,
  },
  dash: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.035,
    color: theme.colors.black,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    alignItems: "center",
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
  },
  addButtonText: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.035,
    color: theme.colors.white,
  },
});

export default TravelersTrustedProgram;
