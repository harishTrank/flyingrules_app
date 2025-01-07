import React from "react";
import { View, StyleSheet, Text } from "react-native";
import HeaderComp from "../../../ReUseComponents/HeaderComp";

const ToggleButton = () => {
  return (
    <View>
      <View>
        <Text>One Wayeee</Text>
      </View>
      <View>
        <Text>Round Trip</Text>
      </View>
    </View>
  );
};

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1 }}>
      <HeaderComp navigation={navigation} />
      <View style={styles.mainContainer}>
        <ToggleButton />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
