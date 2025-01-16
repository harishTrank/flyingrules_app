import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import theme from "../../../../../utils/theme";

const ToggleButton = ({ tripType, setTripType }: any) => {
  const option: any = [
    { name: "One Way", apiKey: "one-way" },
    { name: "Round Trip", apiKey: "round-trip" },
  ];
  return (
    <View style={styles.toggleBox}>
      {option.map((item: any) => (
        <TouchableOpacity
          key={item?.name}
          onPress={() => setTripType(item?.apiKey)}
          style={[
            styles.toggleButton,
            {
              backgroundColor:
                tripType === item.apiKey
                  ? theme.colors.primary
                  : theme.colors.white,
            },
          ]}
        >
          <Text
            style={[
              styles.toggleText,
              {
                color:
                  tripType === item.apiKey
                    ? theme.colors.white
                    : theme.colors.black,
              },
            ]}
          >
            {item.name}
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
