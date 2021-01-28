import React, { useState } from "react";

import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import styled from "styled-components/native";

export const Quiz = ({ selectedDialect }) => {
  const [text, setText] = useState("");

  return (
    <>
      <BodyText>Please write this in {selectedDialect.name_en}:</BodyText>
      <BodyText>お母さんは部屋にいるよ。</BodyText>
      <TextInput
        label="Answer here"
        value={text}
        onChangeText={(text) => setText(text)}
        style={{ margin: 20 }}
      ></TextInput>
      <ButtonContainer>
        <Button
          mode="contained"
          onPress={() => console.log("button pressed")}
          color="#40BA62"
          labelStyle={{ color: "#fff", fontSize: 18 }}
          style={{
            width: "50%",
            height: 45,
            justifyContent: "center",
          }}
        >
          答え合わせ
        </Button>
      </ButtonContainer>
    </>
  );
};

const BodyText = styled.Text`
  text-align: center;
  font-size: 18px;
  margin: 5px;
  font-weight: bold;
`;

const ButtonContainer = styled.View`
  align-items: center;
  margin: 10px;
`;
export default Quiz;
