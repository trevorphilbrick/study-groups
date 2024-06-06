if (__DEV__) {
  require("../ReactotronConfig");
}
import { StatusBar } from "expo-status-bar";
import { createContext, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import RootNavigator from "./navigators/RootNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { QueryClientProvider } from "@tanstack/react-query";
import { theme } from "./constants/theme";
import { queryClient } from "./queryClient";

export const UserContext = createContext(undefined);

export default function App() {
  const [user, setUser] = useState();

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser }}>
        <NavigationContainer
          theme={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: theme.colors.background,
            },
          }}
        >
          <PaperProvider theme={theme}>
            <SafeAreaProvider>
              <StatusBar style="light" />
              <RootNavigator />
              <Toast topOffset={40} />
            </SafeAreaProvider>
          </PaperProvider>
        </NavigationContainer>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}
