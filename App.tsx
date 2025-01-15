import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from "./navigation";
import React, { useEffect } from "react";
import { LogBox } from "react-native";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import { en, registerTranslation } from "react-native-paper-dates";
import theme from "./utils/theme";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import useCachedResources from "./hooks/useCachedResources";
import { useAtom } from "jotai";
import { loginGlobalFlag } from "./JotaiStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

registerTranslation("en", en);
LogBox.ignoreAllLogs();
export const queryClient = new QueryClient();

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary, // Change the primary color here
    accent: theme.colors.primaryLight, // Change the accent color here
    primaryContainer: theme.colors.primaryLight,
    secondaryContainer: theme.colors.primaryLight,
  },
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [, setGlobalFlag]: any = useAtom(loginGlobalFlag);
  const manageFlagHandler = async () => {
    const getToken: any = await AsyncStorage.getItem("accessToken");
    if (getToken) {
      setGlobalFlag(true);
    }
  };
  useEffect(() => {
    manageFlagHandler();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={customTheme}>
          <Navigation />
          <Toast position="top" />
        </PaperProvider>
      </QueryClientProvider>
    );
  }
}
