import { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import React from "react";

export type NoteCard = {
  prompt: string;
  answer: string;
};

export type NoteCardFormProps = {
  setCards: React.Dispatch<React.SetStateAction<NoteCard[]>>;
};

const NoteCardForm = ({ setCards }: NoteCardFormProps) => {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAddCard = () => {
    if (prompt && answer) {
      setCards((cards: NoteCard[]): NoteCard[] => {
        return [...cards, { prompt, answer }];
      });
      setPrompt("");
      setAnswer("");
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
      <Button onPress={handleAddCard} style={{ marginTop: 16 }}>
        Add Card
      </Button>
    </>
  );
};

export default NoteCardForm;
