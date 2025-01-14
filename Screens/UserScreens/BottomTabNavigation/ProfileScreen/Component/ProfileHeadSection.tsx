import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import ImageModule from "../../../../../ImageModule";
import theme from "../../../../../utils/theme";
import Entypo from "@expo/vector-icons/Entypo";

const { height, width }: any = Dimensions.get("window");

const ProfileHeadSection = ({ navigation, isLogin }: any) => {
  return (
    <ImageBackground
      source={ImageModule.profile_bg} // Replace with your background image
      style={[
        styles.backgroundImage,
        isLogin && {
          height: height * 0.35,
        },
      ]}
    >
      {isLogin ? (
        <View style={styles.overlay}>
          <Text style={styles.profileText}>Profile</Text>

          <View style={styles.profileInfo}>
            <Image
              source={require("../../../../../assets/Icons/dummyGirl.png")}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editIconContainer}>
              <Entypo
                name="camera"
                size={width * 0.05}
                color={theme.colors.white}
              />
            </TouchableOpacity>
            <Text style={styles.nameText}>Sophia Grace Bennett</Text>
          </View>
        </View>
      ) : (
        <View style={styles.overlay}>
          <Text style={styles.profileText}>Profile</Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Image style={styles.addUserIcon} source={ImageModule.addUser} />
            <View>
              <Text style={styles.loginButtonText}>Login/ Sign Up</Text>
              <Text style={styles.loginSubtitle}>
                Login/ Sign up to grab exclusive deals
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: width,
    height: height * 0.3,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    padding: width * 0.04,
  },
  profileText: {
    ...theme.font.fontBold,
    fontSize: width * 0.07,
    color: theme.colors.white,
    marginBottom: height * 0.02,
  },
  loginButton: {
    backgroundColor: theme.colors.white,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    borderRadius: 5,
  },
  addUserIcon: {
    height: width * 0.13,
    width: width * 0.13,
    objectFit: "contain",
    marginRight: 10,
  },
  loginButtonText: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.05,
    color: theme.colors.primary,
  },
  loginSubtitle: {
    ...theme.font.fontMedium,
    fontSize: width * 0.03,
    color: theme.colors.primary,
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  profileImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15, // Make it a circle
    borderWidth: 4,
    borderColor: theme.colors.white,
  },
  editIconContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: width * 0.04,
    padding: width * 0.02,
    position: "absolute",
    bottom: height * 0.055,
    right: width * 0.3,
  },
  nameText: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.04,
    color: theme.colors.white,
    marginTop: height * 0.02,
  },
});

export default ProfileHeadSection;
