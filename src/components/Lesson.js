import * as a from "../rdx/actions";

import React, { useState } from "react";

import { Button } from "react-native-paper";
import Commonness from "./Commonness";
import { Image } from "react-native";
import Quiz from "./Quiz";
import ScreenLayout from "../shared/ScreenLayout";
import { ScrollView } from "react-native";
import SoundPlayButton from "../shared/SoundPlayButton";
import { connect } from "react-redux";
import styled from "styled-components/native";
import yokudekimashita from "../../assets/yokudekimashita.png";

const Lesson = ({ route, navigation, dispatch, completedGrammars }) => {
  const { selectedDialect, grammar } = route.params;
  const btnLabel = selectedDialect.complete_btn_text;
  const [showQuiz, setShowQuiz] = useState(false);
  const jpExample = grammar.examples.find(
    (example) => example.language === "jp"
  );
  const enExample = grammar.examples.find(
    (example) => example.language === "en"
  );

  const nextLessonBtn = () => {
    const action = a.completedGrammars(grammar.id);
    dispatch(action);
    const nextGrammar = selectedDialect.grammars.find(
      (g) => g.position === grammar.position + 1
    );
    setShowQuiz(false);
    if (nextGrammar) {
      const action = a.selectedGrammar(nextGrammar.id);
      dispatch(action);
      navigation.navigate("Lesson", { selectedDialect, grammar: nextGrammar });
    } else {
      navigation.navigate("PatternList", { selectedDialect });
    }
  };

  const showCompletedAt = () => {
    if (completedGrammars[grammar.id]) {
      const completedDate = new Date(
        completedGrammars[grammar.id]
      ).toLocaleDateString();
      return <BodySubText>Completed at {completedDate}</BodySubText>;
    }
  };

  const buttonText = () => {
    if (completedGrammars[grammar.id]) {
      return "正解したクイズを見る";
    } else {
      return "クイズに挑戦🌟";
    }
  };

  return (
    <ScreenLayout
      pageTitle={grammar.label}
      btnLabel={btnLabel}
      btnSubLabel="Next lesson"
      backComponentName={"PatternList"}
      onPressHandler={() => nextLessonBtn()}
    >
      <ScrollView>
        <BodyText>{grammar.description}</BodyText>
        <Commonness rating={grammar.commonness} />
        {showCompletedAt()}
        <MediaContainer>
          <ExampleContainer>
            <BodyTextExample>A: {jpExample.sentence1}</BodyTextExample>
            <BodyTextExample>B: {jpExample.sentence2}</BodyTextExample>
          </ExampleContainer>
          <SoundPlayButton audioId={jpExample.id} />
        </MediaContainer>
        <ExampleContainer>
          <BodyTextExample>A: {enExample.sentence1}</BodyTextExample>
          <BodyTextExample>B: {enExample.sentence2}</BodyTextExample>
        </ExampleContainer>

        {showQuiz ? (
          <Quiz selectedDialect={selectedDialect} grammar={grammar} />
        ) : (
          <>
            <ButtonContainer>
              <Button
                mode="contained"
                onPress={() => setShowQuiz(true)}
                color="#1B70B1"
                labelStyle={{ color: "#fff", fontSize: 18 }}
                style={{
                  width: "60%",
                  height: 45,
                  justifyContent: "center",
                }}
              >
                {buttonText()}
              </Button>
            </ButtonContainer>
          </>
        )}
        {completedGrammars[grammar.id] ? (
          <>
            <Image
              source={yokudekimashita}
              style={{ width: 100, height: 100 }}
            ></Image>
          </>
        ) : null}
      </ScrollView>
    </ScreenLayout>
  );
};

const BodyText = styled.Text`
  text-align: center;
  font-size: 18px;
  margin: 5px;
  font-weight: bold;
`;

const BodySubText = styled.Text`
  margin-left: 15px;
  font-size: 16px;
  font-weight: bold;
  color: #a3a3a3;
`;

const BodyTextExample = styled.Text`
  text-align: left;
  font-size: 20px;
  margin: 10px;
`;

const MediaContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ExampleContainer = styled.View`
  margin-top: 10px;
`;
const ButtonContainer = styled.View`
  align-items: center;
  margin: 10px;
`;

const mapStateToProps = (state) => {
  return {
    completedGrammars: state.grammarsReducer.completedIds,
  };
};
export default connect(mapStateToProps)(Lesson);
