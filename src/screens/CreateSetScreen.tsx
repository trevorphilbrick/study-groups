import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CreateSetScreen = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{
        marginTop: top,
        flex: 1,
        paddingHorizontal: 24,
      }}
    >
      <Text>
        Set name, tags, add card - each card can have a prompt and an answer
      </Text>
    </View>
  );
};

export default CreateSetScreen;
