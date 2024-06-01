import { Text } from "react-native";
import { useContext, useState } from "react";
import { Button, Card, IconButton, Modal, Portal } from "react-native-paper";
import { useMutation } from "@tanstack/react-query";
import { deleteCardSet } from "../api/deleteCardset";
import { UserContext } from "../App";
import { queryClient } from "../queryClient";
import { useNavigation } from "@react-navigation/native";
import { MenuStackNavigation } from "../navigators/MenuNavigator";
import { theme } from "../constants/theme";

const CardSetContainer = ({ item }) => {
  const navigation = useNavigation<MenuStackNavigation>();
  const [showMenu, setShowMenu] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const { user } = useContext(UserContext);
  const deleteCardSetMutation = useMutation({
    mutationFn: () => deleteCardSet(item, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cardSets"] });
    },
  });

  return (
    <Card
      style={{
        marginVertical: 8,
        borderRadius: 8,
        backgroundColor: isPressed
          ? theme.colors.primaryPressed
          : theme.colors.primary,
      }}
      onPress={() => navigation.navigate("CardViewer", { id: item.setId })}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onLongPress={() => setShowMenu(true)}
      elevation={2}
    >
      <Card.Title
        title={item.name}
        titleStyle={{ color: theme.colors.onPrimary, fontSize: 18 }}
        subtitle={item.description}
        subtitleStyle={{ color: theme.colors.onPrimary }}
        right={() => (
          <IconButton
            icon="dots-vertical"
            onPress={() => setShowMenu(true)}
            iconColor={theme.colors.onPrimary}
          />
        )}
      />
      <Card.Content>
        <Text
          style={{
            textAlign: "right",
            color: theme.colors.onPrimary,
            marginBottom: 16,
          }}
        >
          {new Date(item.timestamp).toUTCString()}
        </Text>
      </Card.Content>
      <Portal>
        <Modal
          visible={showMenu}
          onDismiss={() => setShowMenu(false)}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card style={{ width: 200 }}>
            <Card.Title title={item.name} />
            <Card.Content>
              <Button>Edit</Button>
              <Button onPress={() => deleteCardSetMutation.mutate()}>
                Delete
              </Button>
              <Button onPress={() => setShowMenu(false)}>Close</Button>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
    </Card>
  );
};

export default CardSetContainer;
