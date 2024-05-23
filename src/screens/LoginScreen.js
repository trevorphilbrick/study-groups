import { View, Text, Pressable } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginTop: top,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <TextInput label="Email" style={{ width: "100%", marginBottom: 16 }} />
      <TextInput label="Password" style={{ width: "100%", marginBottom: 16 }} />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={{ marginBottom: 24 }}>Don't have an account? </Text>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={{ fontWeight: "600" }}>Register</Text>
        </Pressable>
      </View>
      <Button mode="contained" style={{ width: "100%", marginBottom: 16 }}>
        {" "}
        Sign In{" "}
      </Button>
    </View>
  );
};

export default LoginScreen;
