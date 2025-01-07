import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import React from "react";
import { LogBox } from "react-native";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import { en, registerTranslation } from "react-native-paper-dates";
import theme from "./utils/theme";
import { Toast } from "react-native-toast-message/lib/src/Toast";

registerTranslation("en", en);
LogBox.ignoreAllLogs();

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary, // Change the primary color here
    accent: theme.colors.primary, // Change the accent color here
    primaryContainer: theme.colors.primary,
    secondaryContainer: theme.colors.primary,
  },
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider theme={customTheme}>
        <Navigation />
        <Toast position="top" />
      </PaperProvider>
    );
  }
}
