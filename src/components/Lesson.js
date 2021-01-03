import React from "react";
import ScreenLayout from "../shared/ScreenLayout";
import SoundPlayButton from "../shared/SoundPlayButton";
import styled from "styled-components/native";

const btnLabel = "完了";

const Lesson = ({ route }) => {
  const { grammar } = route.params;
  const jpExample = grammar.examples.find(
    (example) => example.language === "jp"
  );
  const enExample = grammar.examples.find(
    (example) => example.language === "en"
  );

  return (
    <ScreenLayout
      pageTitle={grammar.label}
      btnLabel={btnLabel}
      backComponentName={"PatternList"}
    >
      <MediaContainer>
        <SoundPlayButton
          soundSource={require("../../assets/audio/hiroshima/iru_oru.m4a")}
        />
      </MediaContainer>
      <BodyText>{grammar.description}</BodyText>
      <ExampleContainer>
        <BodyTextExample>A: {jpExample.sentence1}</BodyTextExample>
        <BodyTextExample>B: {jpExample.sentence2}</BodyTextExample>
        <BodyTextExample>A: {enExample.sentence1}</BodyTextExample>
        <BodyTextExample>B: {enExample.sentence2}</BodyTextExample>
      </ExampleContainer>
    </ScreenLayout>
  );
};

const BodyText = styled.Text`
  text-align: center;
  font-size: 20px;
  margin: 10px;
  font-weight: bold;
`;

const BodyTextExample = styled.Text`
  text-align: left;
  font-size: 20px;
  margin: 10px;
`;

const MediaContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 40%;
  background-color: #5aa9e6;
  border-radius: 25px;
  margin: 10px;
`;

const ExampleContainer = styled.View`
  padding: 10px;
  margin-top: 30px;
`;

export default Lesson;
