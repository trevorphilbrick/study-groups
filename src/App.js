import { StatusBar } from "expo-status-bar";
import { createContext, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigators/RootNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export const UserContext = createContext(undefined);

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <PaperProvider>
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
