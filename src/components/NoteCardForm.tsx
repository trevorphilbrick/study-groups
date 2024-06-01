import { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import React from "react";
import DocumentPicker from "react-native-document-picker";
import axios from "axios";
import { View } from "react-native";
import { theme } from "../constants/theme";

export type NoteCard = {
  prompt: string;
  answer: string;
};

export type NoteCardFormProps = {
  setCards: React.Dispatch<React.SetStateAction<NoteCard[]>>;
  setScreenLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const NoteCardForm = ({ setCards, setScreenLoading }: NoteCardFormProps) => {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddCard = () => {
    if (prompt && answer) {
      setCards((cards: NoteCard[]): NoteCard[] => [
        ...cards,
        { prompt, answer },
      ]);
      setPrompt("");
      setAnswer("");
    }
  };

  const handleAddAICards = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.docx,
          DocumentPicker.types.pdf,
          DocumentPicker.types.plainText,
        ],
      });

      const formData = new FormData();
      // @ts-ignore
      formData.append("document", {
        uri: res[0].uri,
        type: res[0].type,
        name: res[0].name,
      });
      setLoading(true);
      setScreenLoading(true);

      const response = await axios.post(
        "https://notecards-ai.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": res[0].type,
          },
        },
      );

      setLoading(false);
      setScreenLoading(false);
      setCards((cards: NoteCard[]): NoteCard[] => [...cards, ...response.data]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.error("User cancelled document selection");
      } else {
        console.error("Error during document selection or file upload: ", err);
      }
    }
  };

  return (
    <>
      <TextInput
        label="Prompt"
        value={prompt}
        onChangeText={setPrompt}
        style={{ marginVertical: 8 }}
      />
      <TextInput
        label="Answer"
        value={answer}
        onChangeText={setAnswer}
        style={{ marginTop: 8, marginBottom: 16 }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Button
          onPress={handleAddCard}
          style={{ marginTop: 16 }}
          mode="outlined"
          textColor={theme.colors.secondary}
        >
          Add Card
        </Button>
        <Button
          onPress={handleAddAICards}
          style={{ marginTop: 16 }}
          loading={loading}
          disabled={loading}
          mode="outlined"
          textColor={theme.colors.secondary}
          icon="creation"
        >
          Let AI Create Cards
        </Button>
      </View>
    </>
  );
};

export default NoteCardForm;
