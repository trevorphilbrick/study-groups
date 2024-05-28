import { Text } from "react-native";
import { useContext, useState } from "react";
import { Button, Card, IconButton, Modal, Portal } from "react-native-paper";
import { useMutation } from "@tanstack/react-query";
import { deleteCardSet } from "../api/deleteCardset";
import { UserContext } from "../App";
import { queryClient } from "../queryClient";

const CardSetContainer = ({ item }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useContext(UserContext);
  const deleteCardSetMutation = useMutation({
    mutationFn: () => deleteCardSet(item, user),
    onSuccess: (data) => {
      queryClient.setQueryData(["cardSets"], data);
    },
  });

  return (
    <Card
      style={{
        marginVertical: 8,
        borderRadius: 8,
      }}
    >
      <Card.Title
        title={item.name}
        subtitle={item.description}
        right={() => (
          <IconButton icon="dots-vertical" onPress={() => setShowMenu(true)} />
        )}
      />
      <Card.Content>
        <Text style={{ textAlign: "right" }}>
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
