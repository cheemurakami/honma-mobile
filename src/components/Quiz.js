import * as a from "../rdx/actions";

import React, { useState } from "react";
import { useEffect } from "react";

import { Alert } from "react-native";
import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { connect } from "react-redux";
import styled from "styled-components/native";

export const Quiz = ({ selectedDialect, grammar, auth, dispatch }) => {
  const [text, setText] = useState("");
  const [showCorrectButton, setShowCorrectButton] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [buttonText, setButtonText] = useState("答え合わせ");

  if (grammar.quizzes.length > 0) {
    useEffect(() => {
      if (showCorrectButton && quizIndex + 1 === grammar.quizzes.length) {
        setButtonText("全問正解！");
        const action = a.completedGrammars(grammar.id);
        dispatch(action);
      } else if (showCorrectButton && quizIndex + 1 < grammar.quizzes.length) {
        setButtonText("正解！次の問題へ");
      } else {
        setButtonText("答え合わせ");
      }
    }, [showCorrectButton, buttonText]);

    const quiz = grammar.quizzes[quizIndex];
    const quizTokyo = quiz.tokyo;
    const answer = quiz.answer;

    const checkAnswer = (text) => {
      if (text === answer) {
        const data = {
          quiz_id: quiz.id,
          authentication_token: auth.auth_token,
        };
        completedQuiz(data);
        setShowCorrectButton(true);
      } else {
        setShowCorrectButton(false);
        return Alert.alert("不正解！もう1度！");
      }

      if (buttonText == "正解！次の問題へ") {
        setQuizIndex(quizIndex + 1);
        setShowCorrectButton(false);
      }
    };

    const completedQuiz = (data) => {
      fetch("http://localhost:3000/api/quiz_completions", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((resp) => console.log(resp));
    };

    return (
      <>
        <BodyText>Please write this in {selectedDialect.name_en}:</BodyText>
        <BodyText>
          {`Q${quizIndex + 1}`}: {quizTokyo}
        </BodyText>
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
            {buttonText}
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

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
  };
};

export default connect(mapStateToProps)(Quiz);
