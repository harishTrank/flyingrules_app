import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import {} from "react-native-gesture-handler";
import theme from "../../utils/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ImageModule from "../../ImageModule";

const { width }: any = Dimensions.get("window");
const HeaderComp = ({ navigation }: any) => {
  return (
    <>
      <View
        style={{
          paddingTop: useSafeAreaInsets().top,
          backgroundColor: theme.colors.primary,
        }}
      />
      <View style={styles.mainContainer}>
        <Image style={styles.imageHead} source={ImageModule.appIcon} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    ...theme.elevationLight,
  },
  title: {
    ...theme.font.fontMedium,
    color: theme.colors.black,
    fontSize: 16,
    width: width - 70,
    textAlign: "center",
  },
  imageHead: {
    width: width * 0.5,
  },
});

export default HeaderComp;
