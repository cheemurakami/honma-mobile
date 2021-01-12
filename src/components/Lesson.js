import * as a from "../rdx/actions";

import React from "react";
import ScreenLayout from "../shared/ScreenLayout";
import SoundPlayButton from "../shared/SoundPlayButton";
import { connect } from "react-redux";
import styled from "styled-components/native"

const Lesson = ({ route, navigation, dispatch }) => {
  const { selectedDialect, grammar } = route.params;
  const btnLabel = selectedDialect.complete_btn_text;
  const jpExample = grammar.examples.find(
    (example) => example.language === "jp"
  );
  const enExample = grammar.examples.find(
    (example) => example.language === "en"
  );

  const completeBtn = () => {
    const action = a.completedGrammars(grammar.id)
    dispatch(action)
    const nextGrammar = selectedDialect.grammars.find(
      (g) => g.position === grammar.position + 1
    );
    if (nextGrammar) {
      navigation.navigate("Lesson", { selectedDialect, grammar: nextGrammar });
    } else {
      navigation.navigate("PatternList", { selectedDialect });
    }
  };

  return (
    <ScreenLayout
      pageTitle={grammar.label}
      btnLabel={btnLabel}
      backComponentName={"PatternList"}
      onPressHandler={() => completeBtn()}
    >
      <MediaContainer>
        {jpExample.audio_clip_url && (
          <SoundPlayButton soundSource={jpExample.audio_clip_url} />
        )}
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

export default connect()(Lesson);
