import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import theme from "../../utils/theme";

const { width } = Dimensions.get("window");

const TravellerQuantity = ({ travellers, setTravellers }: any) => {
  const travelHandler = (sign: any, type: any) => {
    if (type === "Adult") {
      if (sign === "Add") {
        setTravellers((oldVal: any) => {
          return {
            ...oldVal,
            adult: oldVal.adult + 1,
          };
        });
      } else {
        if (travellers.adult !== 1) {
          setTravellers((oldVal: any) => {
            return {
              ...oldVal,
              adult: oldVal.adult - 1,
            };
          });
        }
      }
    } else {
      if (sign === "Add") {
        setTravellers((oldVal: any) => {
          return {
            ...oldVal,
            child: oldVal.child + 1,
          };
        });
      } else {
        if (travellers.child !== 0) {
          setTravellers((oldVal: any) => {
            return {
              ...oldVal,
              child: oldVal.child - 1,
            };
          });
        }
      }
    }
  };
  return (
    <View style={styles.travelBox}>
      <View style={styles.travelComp}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => travelHandler("Sub", "Adult")}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.resultText}>{travellers.adult} Adult</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => travelHandler("Add", "Adult")}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.travelComp}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => travelHandler("Sub", "Child")}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.resultText}>{travellers.child} Child</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => travelHandler("Add", "Child")}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TravellerQuantity;

const styles = StyleSheet.create({
  travelBox: {
    marginTop: width * 0.04,
    paddingHorizontal: width * 0.04,
  },
  travelComp: {
    flexDirection: "row",
    marginVertical: width * 0.02,
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonStyle: {
    backgroundColor: "#0060e3",
    height: width * 0.12,
    width: width * 0.12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: width * 0.06,
  },
  buttonText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.white,
    fontSize: width * 0.05,
  },
  resultText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
    fontSize: width * 0.04,
  },
});