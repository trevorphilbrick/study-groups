if (__DEV__) {
  require("../ReactotronConfig");
}
import { StatusBar } from "expo-status-bar";
import { createContext, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigators/RootNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export const theme = {
  colors: {
    primary: "rgb(0, 100, 148)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(203, 230, 255)",
    onPrimaryContainer: "rgb(0, 30, 48)",
    secondary: "rgb(0, 105, 107)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(111, 246, 249)",
    onSecondaryContainer: "rgb(0, 32, 32)",
    tertiary: "rgb(0, 108, 73)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(133, 248, 194)",
    onTertiaryContainer: "rgb(0, 33, 20)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(252, 252, 255)",
    onBackground: "rgb(26, 28, 30)",
    surface: "rgb(252, 252, 255)",
    onSurface: "rgb(26, 28, 30)",
    surfaceVariant: "rgb(221, 227, 234)",
    onSurfaceVariant: "rgb(65, 71, 77)",
    outline: "rgb(114, 120, 126)",
    outlineVariant: "rgb(193, 199, 206)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(46, 49, 51)",
    inverseOnSurface: "rgb(240, 240, 243)",
    inversePrimary: "rgb(142, 205, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(239, 244, 250)",
      level2: "rgb(232, 240, 246)",
      level3: "rgb(224, 235, 243)",
      level4: "rgb(222, 234, 242)",
      level5: "rgb(217, 231, 240)",
    },
    surfaceDisabled: "rgba(26, 28, 30, 0.12)",
    onSurfaceDisabled: "rgba(26, 28, 30, 0.38)",
    backdrop: "rgba(43, 49, 55, 0.4)",
  },
};
export const UserContext = createContext(undefined);

export default function App() {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <StatusBar style="auto" />
            <RootNavigator />
            <Toast topOffset={40} />
          </SafeAreaProvider>
        </PaperProvider>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
