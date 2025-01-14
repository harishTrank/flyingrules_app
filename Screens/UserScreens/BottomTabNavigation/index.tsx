import theme from "../../../utils/theme";
import { AntDesign, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./HomeScreen";
import BookFlightScreen from "./BookFlightScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigation = ({ navigation }: any) => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      activeColor={theme.colors.white}
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
              color={focused ? theme.colors.primary : theme.colors.white}
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
              color={focused ? theme.colors.primary : theme.colors.white}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }: any) => (
            <FontAwesome5
              name="user-alt"
              size={24}
              color={focused ? theme.colors.primary : theme.colors.white}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
