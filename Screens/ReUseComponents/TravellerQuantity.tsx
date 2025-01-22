import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import theme from "../../utils/theme";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

const TravellerQuantity = ({ travellers, setTravellers }: any) => {
  const travelHandler = (sign: any, type: any) => {
    setTravellers((oldVal: any) => {
      let newVal = { ...oldVal };

      if (type === "Adult") {
        if (sign === "Add") {
          newVal.adult = oldVal.adult + 1;
        } else if (oldVal.adult > 1) {
          newVal.adult = oldVal.adult - 1;
        }
      } else if (type === "Child") {
        if (sign === "Add") {
          newVal.child = oldVal.child + 1;
        } else if (oldVal.child > 0) {
          newVal.child = oldVal.child - 1;
        }
      } else if (type === "HELD_INFANT") {
        if (sign === "Add") {
          newVal.held_infant = oldVal.held_infant + 1;
        } else if (oldVal.held_infant > 0) {
          newVal.held_infant = oldVal.held_infant - 1;
        }
      } else if (type === "SEATED_INFANT") {
        if (sign === "Add") {
          newVal.seated_infant = oldVal.seated_infant + 1;
        } else if (oldVal.seated_infant > 0) {
          newVal.seated_infant = oldVal.seated_infant - 1;
        }
      }

      // Check if total infants exceed adults
      if (newVal.held_infant + newVal.seated_infant > newVal.adult) {
        Toast.show({
          type: "error",
          text1: "Adult not enough for infant",
        });
        return oldVal; // Return the old state to prevent the update
      }

      return newVal;
    });
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

      <View style={styles.travelComp}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => travelHandler("Sub", "HELD_INFANT")}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.resultText}>
          {travellers.held_infant} Held Infant
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => travelHandler("Add", "HELD_INFANT")}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.travelComp}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => travelHandler("Sub", "SEATED_INFANT")}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.resultText}>
          {travellers.seated_infant} Seated Infant
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => travelHandler("Add", "SEATED_INFANT")}
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
