import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigation from "./BottomTabNavigation";
import LoginScreen from "./LoginScreen";
import OTPVerificationScreen from "./OTPVerificationScreen";
import ForgotPasswordScreen from "./ForgetPasswordScreen";
import ResetPasswordScreen from "./ResetPasswordScreen";
import CreateAccountScreen from "./CreateAccountScreen";
import FlightShowDetailsScreen from "./FlightShowDetailsScreen";
import BookNowScreen from "./BookNowScreen";
import AboutUsScreen from "./AboutUsScreen";

const Stack = createStackNavigator<any>();

const UserScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"BottomTabNavigation"}
    >
      <Stack.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
      />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen
        name="FlightShowDetails"
        component={FlightShowDetailsScreen}
      />
      <Stack.Screen name="BookNowScreen" component={BookNowScreen} />
      <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
    </Stack.Navigator>
  );
};

export default UserScreens;
