import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { theme } from "../constants/theme";
import { Button, Card, Modal, Portal } from "react-native-paper";
import styled from "styled-components/native";

const ModalCardContainer = styled(Card)`
  width: 200px;
`;

const PromptContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CardPressable = styled.Pressable`
  margin-horizontal: 24px;
`;

const PromptText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.onPrimary};
  font-weight: bold;
  margin-bottom: 8px;
`;

const AnswerText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.onPrimary};
`;

const CardContainer = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Portal>
        <Modal
          visible={showModal}
          onDismiss={() => setShowModal(false)}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ModalCardContainer>
            <Card.Title
              title="Delete Card?"
              titleStyle={{ textAlign: "center", marginTop: 16 }}
            />
            <Card.Content>
              <Button onPress={() => console.log("delete")}>Delete</Button>
              <Button onPress={() => setShowModal(false)}>Close</Button>
            </Card.Content>
          </ModalCardContainer>
        </Modal>
      </Portal>
      <CardPressable onLongPress={() => setShowModal(true)}>
        <PromptContainer>
          <PromptText>{item.prompt}</PromptText>
        </PromptContainer>
        <AnswerText>{item.answer}</AnswerText>
      </CardPressable>
    </>
  );
};

export default CardContainer;
