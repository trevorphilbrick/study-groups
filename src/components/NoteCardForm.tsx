import { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import React from "react";
import DocumentPicker from "react-native-document-picker";
import axios from "axios";
import { Platform, View } from "react-native";
import { theme } from "../constants/theme";
import styled from "styled-components/native";

export type NoteCard = {
  prompt: string;
  answer: string;
};

export type NoteCardFormProps = {
  setCards: React.Dispatch<React.SetStateAction<NoteCard[]>>;
  setScreenLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const PromptInput = styled(TextInput)`
  margin-bottom: 8px;
`;

const AnswerInput = styled(TextInput)`
  margin-top: 8px;
  margin-bottom: 16px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  margin-top: 16px;
`;

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

      const fileUri = res[0].uri;

      console.log(fileUri);

      // @ts-ignore
      formData.append("document", {
        uri: fileUri,
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
            "Content-Type": "multipart/form-data",
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
      <PromptInput label="Prompt" value={prompt} onChangeText={setPrompt} />
      <AnswerInput label="Answer" value={answer} onChangeText={setAnswer} />
      <ButtonContainer>
        <Button
          onPress={handleAddCard}
          mode="outlined"
          textColor={theme.colors.secondary}
        >
          Add Card
        </Button>
        <Button
          onPress={handleAddAICards}
          loading={loading}
          disabled={loading}
          mode="outlined"
          textColor={theme.colors.secondary}
          icon="creation"
        >
          Let AI Create Cards
        </Button>
      </ButtonContainer>
    </>
  );
};

export default NoteCardForm;
