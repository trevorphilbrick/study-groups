import { View, Text, Pressable } from "react-native";
import { useState, useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import { UserContext } from "../App";
import { AuthStackNavigation } from "../navigators/AuthNavigator";

const LoginScreen = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<AuthStackNavigation>();
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Missing fields",
        text2: "Please fill in all fields",
      });
      return;
    }
    setIsSubmitting(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setIsSubmitting(false);
        setUser(res.user);
        navigation.navigate("Menu", { screen: "Home" });
        Toast.show({
          type: "success",
          text1: "Logged in",
          text2: "You have been logged in successfully",
        });
      })
      .catch((error) => {
        setIsSubmitting(false);
        if (error.code === "auth/user-not-found") {
          Toast.show({
            type: "error",
            text1: "User not found",
            text2: "The email address is not associated with any account",
          });
        }

        if (error.code === "auth/wrong-password") {
          Toast.show({
            type: "error",
            text1: "Wrong password",
            text2: "The password is incorrect",
          });
        }

        console.error(error);
      });
  };

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
      <TextInput
        label="Email"
        style={{ width: "100%", marginBottom: 16 }}
        value={email}
        onChange={(e) => setEmail(e.nativeEvent.text)}
      />
      <TextInput
        label="Password"
        style={{ width: "100%", marginBottom: 16 }}
        value={password}
        onChange={(e) => setPassword(e.nativeEvent.text)}
      />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={{ marginBottom: 24 }}>Don&apos;t have an account? </Text>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={{ fontWeight: "600" }}>Register</Text>
        </Pressable>
      </View>
      <Button
        mode="contained"
        style={{ width: "100%", marginBottom: 16 }}
        onPress={() => handleSubmit()}
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        Sign In
      </Button>
    </View>
  );
};

export default LoginScreen;
