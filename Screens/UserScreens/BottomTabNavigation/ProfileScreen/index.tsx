import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import theme from "../../../../utils/theme";
import ImageModule from "../../../../ImageModule";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileHeadSection from "./Component/ProfileHeadSection";
import MyTripsScreen from "../../MyTripScreen";

const Stack = createStackNavigator<any>();

const { width, height } = Dimensions.get("window");

interface ProfileScreenProps {
  navigation: any;
}

const Profile: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [isLogin, setIsLogin]: any = useState(true);
  const nonLoginRoute: any = [
    {
      name: "Customer Support",
      icon: ImageModule.mic,
      onPress: () => {},
    },
    {
      name: "Settings",
      icon: ImageModule.settings,
      onPress: () => {},
    },
    {
      name: "About us",
      icon: ImageModule.aboutus,
      onPress: () => {},
    },
  ];

  const loginRoute: any = [
    {
      name: "My Account",
      icon: ImageModule.my_account,
      onPress: () => {},
    },
    {
      name: "View/ Manage Trips",
      icon: ImageModule.manage_trip,
      onPress: () => navigation.navigate("MyTripScreen"),
    },
    ...nonLoginRoute,
    {
      name: "Logout",
      icon: ImageModule.logout,
      onPress: () => {},
    },
  ];
  return (
    <View style={styles.container}>
      <ProfileHeadSection isLogin={isLogin} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.menu}>
        {(isLogin ? loginRoute : nonLoginRoute)?.map((item: any) => (
          <TouchableOpacity
            key={item?.name}
            style={styles.menuItem}
            onPress={item?.onPress}
          >
            <Image style={styles.menuIcon} source={item?.icon} />
            <Text style={styles.menuItemText}>{item?.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"Profile"}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="MyTripScreen" component={MyTripsScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  menu: {
    flex: 1,
    padding: width * 0.04,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.03,
  },
  menuIcon: {
    height: width * 0.1,
    width: width * 0.1,
    objectFit: "contain",
  },
  menuItemText: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.045,
    color: theme.colors.primary,
    marginLeft: 10,
  },
  iconMargin: {
    marginRight: width * 0.03,
  },
});

export default ProfileScreen;
