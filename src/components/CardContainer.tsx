import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { theme } from "../constants/theme";
import { Button, Card, Modal, Portal } from "react-native-paper";

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
          <Card style={{ width: 200 }}>
            <Card.Title
              title="Delete Card?"
              titleStyle={{ textAlign: "center", marginTop: 16 }}
            />
            <Card.Content>
              <Button onPress={() => console.log("delete")}>Delete</Button>
              <Button onPress={() => setShowModal(false)}>Close</Button>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
      <Pressable
        style={{ marginHorizontal: 24 }}
        onLongPress={() => setShowModal(true)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: theme.colors.onPrimary,
              fontWeight: "bold",
              marginBottom: 8,
              flex: 1,
              flexWrap: "wrap",
            }}
          >
            {item.prompt}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            color: theme.colors.onPrimary,
          }}
        >
          {item.answer}
        </Text>
      </Pressable>
    </>
  );
};

export default CardContainer;
