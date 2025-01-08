import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import theme from "../../../../../utils/theme";

const ToggleButton = ({ tripType, setTripType }: any) => {
  const option: any = ["One Way", "Round Trip"];
  return (
    <View style={styles.toggleBox}>
      {option.map((item: any) => (
        <TouchableOpacity
          key={item}
          onPress={() => setTripType(item)}
          style={[
            styles.toggleButton,
            {
              backgroundColor:
                tripType === item ? theme.colors.primary : theme.colors.white,
            },
          ]}
        >
          <Text
            style={[
              styles.toggleText,
              {
                color:
                  tripType === item ? theme.colors.white : theme.colors.black,
              },
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ToggleButton;

const styles = StyleSheet.create({
  toggleBox: {
    flexDirection: "row",
    marginTop: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "space-between",
    ...theme.elevationHeavy,
    backgroundColor: theme.colors.white,
    padding: 5,
  },
  toggleButton: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 20,
  },
  toggleText: {
    color: theme.colors.black,
    ...theme.font.fontSemiBold,
  },
});
