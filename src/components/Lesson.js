import React from "react";
import ScreenLayout from "../shared/ScreenLayout";
import SoundPlayButton from "../shared/SoundPlayButton";
import styled from "styled-components/native";

const pageTitle = "いる / おる　おるん?";
const btnLabel = "完了";

const Lesson = () => {
  return (
    <ScreenLayout
      pageTitle={pageTitle}
      btnLabel={btnLabel}
      backComponentName={"PatternList"}
      soundSource={require("../../assets/IruOru.m4a")}
    >
      <MediaContainer>
        <SoundPlayButton soundSource={require("../../assets/IruOru.m4a")} />
      </MediaContainer>
      <BodyText>いる changes to おる </BodyText>
      <BodyText>おるん for questions</BodyText>
      <ExampleContainer>
        <BodyTextExample>Q: 今どこにおるん？</BodyTextExample>
        <BodyTextExample>A: 広島駅におるよ</BodyTextExample>
        <BodyTextExample>Q: Where are you now?</BodyTextExample>
        <BodyTextExample>A: I'm at Hiroshima Station.</BodyTextExample>
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
