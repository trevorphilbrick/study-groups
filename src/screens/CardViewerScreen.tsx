import { View, Text } from "react-native";
import { getCardSets } from "../api/getCardSets";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import { useQuery } from "@tanstack/react-query";
import { RouteProp, useRoute } from "@react-navigation/native";
import { MenuStackParamList } from "../navigators/MenuNavigator";
import { CardSet } from "../api/updateCardSet";
import { theme } from "../constants/theme";
import { IconButton, ProgressBar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CardViewerScreen = () => {
  const { user } = useContext(UserContext);
  const route = useRoute<RouteProp<MenuStackParamList, "CardViewer">>();
  const { id } = route.params;
  const { bottom } = useSafeAreaInsets();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const {
    data: cardSets,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["cardSets", user],
    queryFn: () => getCardSets(user),
  });

  const currentCardSet = cardSets?.find(
    (cardSet: CardSet) => cardSet.setId === id,
  );

  return (
    <View>
      {isLoading && <Text>Loading...</Text>}
      {isError && <Text>Error</Text>}
      {isSuccess && (
        <View
          style={{
            height: "100%",
            justifyContent: "space-between",
            paddingBottom: bottom,
            marginHorizontal: 24,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              marginVertical: 24,
            }}
          >
            <View>
              <Text
                style={{
                  color: theme.colors.onPrimary,
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {showAnswer ? "Answer" : "Prompt"}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 24,
                color: theme.colors.onBackground,
                textAlign: "center",
              }}
            >
              {showAnswer
                ? currentCardSet?.cards[currentCardIndex].answer
                : currentCardSet?.cards[currentCardIndex].prompt}
            </Text>
            <View>
              <ProgressBar
                progress={(currentCardIndex + 1) / currentCardSet?.cards.length}
                color={theme.colors.secondary}
                style={{ height: 8, borderRadius: 4, marginVertical: 24 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: theme.colors.onBackground,
                  textAlign: "center",
                }}
              >
                {currentCardIndex + 1} / {currentCardSet?.cards.length}
              </Text>
            </View>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 36,
              }}
            >
              <View>
                <IconButton
                  icon="close"
                  style={{ backgroundColor: "#eb4034", marginBottom: 24 }}
                  size={36}
                  iconColor="white"
                />
                <IconButton
                  icon="arrow-left"
                  size={36}
                  iconColor="white"
                  style={{ backgroundColor: theme.colors.primary }}
                  onPress={() => {
                    setCurrentCardIndex(
                      currentCardIndex === 0
                        ? currentCardSet.cards.length - 1
                        : currentCardIndex - 1,
                    );
                    setShowAnswer(false);
                  }}
                />
              </View>
              <IconButton
                icon="orbit"
                size={70}
                iconColor="white"
                style={{ backgroundColor: theme.colors.primary }}
                onPress={() => setShowAnswer(!showAnswer)}
              />
              <View>
                <IconButton
                  icon="check"
                  style={{ backgroundColor: "#32a852", marginBottom: 24 }}
                  size={36}
                  iconColor="white"
                />
                <IconButton
                  icon="arrow-right"
                  size={36}
                  iconColor="white"
                  style={{ backgroundColor: theme.colors.primary }}
                  onPress={() => {
                    setCurrentCardIndex(
                      currentCardIndex === currentCardSet.cards.length - 1
                        ? 0
                        : currentCardIndex + 1,
                    );
                    setShowAnswer(false);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default CardViewerScreen;
