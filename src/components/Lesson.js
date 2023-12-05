import React, { useState } from "react";
import { Button } from "react-native-paper";
import Commonness from "./Commonness";
import { Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Quiz from "./Quiz";
import ScreenLayout from "../shared/ScreenLayout";
import { ScrollView } from "react-native";
import SoundPlayButton from "../shared/SoundPlayButton";
import styled from "styled-components/native";
import yokudekimashita from "../../assets/yokudekimashita.png";
import GetCompletedAllQuizzes from "./helpers/GetCompletedAllQuizzes";
import PropTypes from 'prop-types';

const Lesson = ({ route, navigation }) => {
  const { selectedDialect, grammar, grammars, allQuizzesCompleted } =
    route.params;
  const btnLabel = selectedDialect.complete_btn_text;
  const [showQuiz, setShowQuiz] = useState(false);
  const jpExample = grammar.examples.find(
    (example) => example.language === "jp",
  );
  const enExample = grammar.examples.find(
    (example) => example.language === "en",
  );

  const nextLessonBtn = () => {
    const nextGrammar = grammars.find(
      (g) => g.position === grammar.position + 1,
    );
    setShowQuiz(false);

    if (nextGrammar) {
      quizzesCompleted = GetCompletedAllQuizzes(nextGrammar.quizzes);
      navigation.navigate("Lesson", {
        selectedDialect,
        grammar: nextGrammar,
        grammars,
        allQuizzesCompleted: quizzesCompleted,
      });
    } else {
      navigation.navigate("PatternList", {
        selectedDialect,
        dialectGrammars: grammars,
      });
    }
  };

  const showCompletedAt = () => {
    if (mostRecentlyCompletedQuiz(grammar.quizzes)) {
      const completedDate = mostRecentlyCompletedQuiz(
        grammar.quizzes,
      ).quiz_completed;
      return (
        <BodySubText>
          Completed at {new Date(completedDate).toLocaleDateString()}
        </BodySubText>
      );
    }
  };

  const mostRecentlyCompletedQuiz = (quizzes) => {
    const quizLength = quizzes.length;
    const completedQuizzes = quizzes.filter(
      (quiz) => quiz.quiz_completed !== null,
    );

    if (completedQuizzes.length === quizLength) {
      return completedQuizzes.reduce((a, b) =>
        a.quiz_completed > b.quiz_completed ? a : b,
      );
    }
  };

  return (
    <ScreenLayout
      pageTitle={grammar.label}
      btnLabel={allQuizzesCompleted ? btnLabel : null}
      btnSubLabel="Next lesson"
      backComponentName={"PatternList"}
      navigationProps={{ selectedDialect, dialectGrammars: grammars }}
      onPressHandler={nextLessonBtn}
    >
      <ScrollView>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ flex: 1 }}
          scrollEnabled={true}
        >
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
              <ButtonContainer completed={allQuizzesCompleted}>
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
                  accessibilityLabel="quiz-button"
                >
                  {allQuizzesCompleted ? "正解したクイズを見る" : "クイズに挑戦🌟"}
                </Button>
              </ButtonContainer>
              {allQuizzesCompleted && (
                <ButtonContainer completed={allQuizzesCompleted}>
                  <Button
                    mode="contained"
                    onPress={() => setShowQuiz(true)}
                    color="#1B70B1"
                    labelStyle={{ color: "#fff", fontSize: 18 }}
                    style={{
                      width: "60%",
                      height: 50,
                      justifyContent: "center",
                    }}
                    accessibilityLabel="reset-quizzes-button"
                  >
                    全てのクイズをリセット
                  </Button>
                </ButtonContainer>
              )}
            </>
          )}
          {allQuizzesCompleted && (
            <Image
              source={yokudekimashita}
              style={{
                left: '60%',
                height: 170,
                opacity: 0.3,
                position: "absolute",
                top: '60%',
                transform: [{ rotate: "20deg" }],
                width: 170,
              }}
            ></Image>
          )}
        </KeyboardAwareScrollView>
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
  align-items: ${(props) => (props.completed ? null : 'center')};
  margin: 10px;
`;

ButtonContainer.propTypes = {
  completed: PropTypes.bool,
};

export default Lesson;
