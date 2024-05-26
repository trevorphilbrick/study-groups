import { View, Pressable } from "react-native";
import React from "react";
import { Icon, Text } from "react-native-paper";
import { theme } from "../App";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Header = ({ title }: { title: string }) => {
  const navigate = useNavigation();
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 16,
        paddingTop: top + 16,
        paddingHorizontal: 24,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
        backgroundColor: theme.colors.secondaryContainer,
      }}
    >
      <Pressable
        style={{
          marginRight: 24,
          padding: 6,
          backgroundColor: theme.colors.surface,
          borderRadius: 24,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 2,
          backgroundColor: theme.colors.surface,
        }}
        onPress={() => navigate.goBack()}
      >
        <Icon source="arrow-left" size={24} />
      </Pressable>
      <Text variant="titleLarge" style={{ color: "#404040" }}>
        {title}
      </Text>
    </View>
  );
};

export default Header;
