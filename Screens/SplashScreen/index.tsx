import React, { useEffect } from "react";
import { SafeAreaView, Image } from "react-native";
import ImageModule from "../../ImageModule";
import theme from "../../utils/theme";

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("UserScreens");
    }, 500);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.primary,
      }}
    >
      <Image
        source={ImageModule.appIcon}
        style={{
          height: 250,
          width: 250,
          resizeMode: "contain",
        }}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;
