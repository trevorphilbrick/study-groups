import { Text } from "react-native";
import { useContext, useState, Dispatch, SetStateAction } from "react";
import { Button, Card, IconButton, Modal, Portal } from "react-native-paper";
import { useMutation } from "@tanstack/react-query";
import { deleteCardSet } from "../api/deleteCardset";
import { UserContext } from "../App";
import { queryClient } from "../queryClient";
import { useNavigation } from "@react-navigation/native";
import { MenuStackNavigation } from "../navigators/MenuNavigator";
import { theme } from "../constants/theme";
import styled from "styled-components/native";

const CardSetCardContainer = styled(Card)<{ isPressed: boolean }>`
  margin-vertical: 8px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.isPressed ? theme.colors.primaryPressed : theme.colors.primary};
`;

const DateText = styled(Text)`
  text-align: right;
  color: ${theme.colors.onPrimary};
  margin-bottom: 16px;
`;

const ModalCardContainer = styled(Card)`
  width: 200px;
`;

const CardTitleRight = (setShowMenu: Dispatch<SetStateAction<boolean>>) => (
  <IconButton
    icon="dots-vertical"
    iconColor={theme.colors.onPrimary}
    onPress={() => setShowMenu(true)}
  />
);

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
    <CardSetCardContainer
      isPressed={isPressed}
      onPress={() => navigation.navigate("CardViewer", { id: item.setId })}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onLongPress={() => setShowMenu(true)}
      elevation={2}
    >
      <Card.Title
        title={item.name}
        titleStyle={{ color: theme.colors.onPrimary }}
        titleVariant="titleMedium"
        subtitle={item.description}
        subtitleStyle={{ color: theme.colors.onPrimary }}
        right={() => CardTitleRight(setShowMenu)}
      />
      <Card.Content>
        <DateText>{new Date(item.timestamp).toUTCString()}</DateText>
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
          <ModalCardContainer>
            <Card.Title title={item.name} />
            <Card.Content>
              <Button
                onPress={() => {
                  navigation.navigate("CreateNoteCardSet", item);
                  setShowMenu(false);
                }}
              >
                Edit
              </Button>
              <Button onPress={() => deleteCardSetMutation.mutate()}>
                Delete
              </Button>
              <Button onPress={() => setShowMenu(false)}>Close</Button>
            </Card.Content>
          </ModalCardContainer>
        </Modal>
      </Portal>
    </CardSetCardContainer>
  );
};

export default CardSetContainer;
