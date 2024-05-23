import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import { AuthStackNavigation } from "../navigators/AuthNavigator";

const RegisterScreen = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<AuthStackNavigation>();
  const [email, setEmail] = useState("");
  const [displayname, setDisplayname] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!email || !password || !displayname) {
      Toast.show({
        type: "error",
        text1: "Missing fields",
        text2: "Please fill in all fields",
      });
      return;
    }
    setIsSubmitting(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.user.updateProfile({
          displayName: displayname,
        });
        setIsSubmitting(false);
        Toast.show({
          type: "success",
          text1: "Account created",
          text2: "Your account has been created successfully",
        });
      })
      .catch((error) => {
        setIsSubmitting(false);
        if (error.code === "auth/email-already-in-use") {
          Toast.show({
            type: "error",
            text1: "Email already in use",
            text2: "The email address is already in use by another account",
          });
        }

        if (error.code === "auth/invalid-email") {
          Toast.show({
            type: "error",
            text1: "Invalid email",
            text2: "The email address is not valid",
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
        label="Username"
        style={{ width: "100%", marginBottom: 16 }}
        value={displayname}
        onChange={(e) => setDisplayname(e.nativeEvent.text)}
      />
      <TextInput
        label="Password"
        style={{ width: "100%", marginBottom: 16 }}
        value={password}
        onChange={(e) => setPassword(e.nativeEvent.text)}
      />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={{ marginBottom: 24 }}>Already have an account? </Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={{ fontWeight: "600" }}>Sign in</Text>
        </Pressable>
      </View>
      <Button
        mode="contained"
        loading={isSubmitting}
        disabled={isSubmitting}
        style={{ width: "100%", marginBottom: 16 }}
        onPress={() => handleSubmit()}
      >
        Create Account
      </Button>
    </View>
  );
};

export default RegisterScreen;
