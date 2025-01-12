import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigation from "./BottomTabNavigation";
import LoginScreen from "./LoginScreen";
import OTPVerificationScreen from "./OTPVerificationScreen";

const Stack = createStackNavigator<any>();

const UserScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"LoginScreen"}
    >
      <Stack.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
      />
       <Stack.Screen
        name="OTPVerification"
        component={OTPVerificationScreen}
      />
    </Stack.Navigator>
  );
};

export default UserScreens;
