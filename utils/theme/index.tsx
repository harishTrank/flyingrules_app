import { Platform } from "react-native";

const theme = {
  colors: {
    primary: "#1B5B93",
    primaryLight: "#f2f3fe",
    primarySecond: "#e4f4fd",
    black: "#000",
    white: "#FFF",
    grey: "#dedede",
    basicGrey: "#8e8b8b",
    red: "#e83731",
  },
  font: {
    fontBold: {
      fontFamily: "Poppins-Bold",
      top: Platform.OS == "android" ? 2 : 0,
    },
    fontSemiBold: {
      fontFamily: "Poppins-SemiBold",
      top: Platform.OS == "android" ? 2 : 0,
    },
    fontRegular: {
      fontFamily: "Poppins-Regular",
      top: Platform.OS == "android" ? 2 : 0,
    },
    fontMedium: {
      fontFamily: "Poppins-Medium",
      top: Platform.OS == "android" ? 2 : 0,
    },
    fontLight: {
      fontFamily: "Poppins-Light",
      top: Platform.OS == "android" ? 2 : 0,
    },
    fontCinzelBlack: {
      fontFamily: "Cinzel-Black",
      top: Platform.OS == "android" ? 2 : 0,
    },
    fontPlayFairLight: {
      fontFamily: "PlayfairDisplay-Black",
      top: Platform.OS == "android" ? 2 : 0,
    },
    fontPlayFairRegular: {
      fontFamily: "PlayfairDisplay-Regular",
      top: Platform.OS == "android" ? 2 : 0,
    },
  },

  elevationLight: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,

    elevation: 5,
  },

  elevationHeavy: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
  },
};

export default theme;
