import * as a from "../rdx/actions";

import React, { useState } from "react";

import { Alert } from "react-native";
import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { connect } from "react-redux";
import styled from "styled-components/native";

export const Quiz = ({ selectedDialect, grammar, dispatch }) => {
  const [text, setText] = useState("");
  const [showCorrectButton, setShowCorrectButton] = useState(false);

  if (grammar.quizzes.length > 0) {
    const quizTokyo = grammar.quizzes[0].tokyo;
    const answer = grammar.quizzes[0].answer;

    const checkAnswer = (text) => {
      if (text === answer) {
        const action = a.completedGrammars(grammar.id);
        dispatch(action);
        setShowCorrectButton(true);
      } else {
        setShowCorrectButton(false);
        return Alert.alert("不正解！もう1度！");
      }
    };

    return (
      <>
        <BodyText>Please write this in {selectedDialect.name_en}:</BodyText>
        <BodyText>{quizTokyo}</BodyText>
        <TextInput
          label="Answer here"
          value={text}
          onChangeText={(text) => setText(text)}
          style={{ margin: 20 }}
        ></TextInput>
        <ButtonContainer>
          <Button
            mode="contained"
            onPress={() => {
              checkAnswer(text);
            }}
            color={showCorrectButton ? "#BDB2FF" : "#40BA62"}
            labelStyle={{ color: "#fff", fontSize: 18 }}
            style={{
              width: "50%",
              height: 45,
              justifyContent: "center",
            }}
          >
            {showCorrectButton ? "正解！！" : "答え合わせ"}
          </Button>
        </ButtonContainer>
      </>
    );
  } else {
    return <BodyText>More quizzes coming soon!</BodyText>;
  }
};

const BodyText = styled.Text`
  text-align: center;
  font-size: 18px;
  margin: 8px;
  font-weight: bold;
`;

const ButtonContainer = styled.View`
  align-items: center;
  margin: 10px;
`;

export default connect()(Quiz);
