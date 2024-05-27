import { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import React from "react";
import DocumentPicker from "react-native-document-picker";
import axios from "axios";
import { View } from "react-native";

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

      console.log("File uploaded successfully:", response.data);
      setLoading(false);
      setScreenLoading(false);
      setCards((cards: NoteCard[]): NoteCard[] => [...cards, ...response.data]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled the document picker");
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
        style={{ marginVertical: 8 }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button onPress={handleAddCard} style={{ marginTop: 16 }}>
          Add Card
        </Button>
        <Button
          onPress={handleAddAICards}
          style={{ marginTop: 16 }}
          loading={loading}
          disabled={loading}
        >
          Let AI Create Cards
        </Button>
      </View>
    </>
  );
};

export default NoteCardForm;
