import theme from "../../../utils/theme";
import { AntDesign, MaterialIcons, Foundation } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./HomeScreen";
import BookFlightScreen from "./BookFlightScreen";
import MyTripScreen from "./MyTripScreen";

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigation = ({ navigation }: any) => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      activeColor={theme.colors.black}
      inactiveColor={theme.colors.white}
      barStyle={{
        backgroundColor: theme.colors.primary,
      }}
      sceneAnimationType="shifting"
      sceneAnimationEnabled={true}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }: any) => (
            <AntDesign
              name="home"
              size={24}
              color={focused ? theme.colors.black : theme.colors.white}
            />
          ),
        }}
      />
      <Tab.Screen
        name="BookFlightScreen"
        component={BookFlightScreen}
        options={{
          tabBarLabel: "Book Flight",
          tabBarIcon: ({ focused }: any) => (
            <MaterialIcons
              name="flight"
              size={24}
              color={focused ? theme.colors.black : theme.colors.white}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyTripScreen"
        component={MyTripScreen}
        options={{
          tabBarLabel: "My Trip",
          tabBarIcon: ({ focused }: any) => (
            <Foundation
              name="clipboard-notes"
              size={24}
              color={focused ? theme.colors.black : theme.colors.white}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
