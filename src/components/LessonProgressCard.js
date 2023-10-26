import React from "react";
import styled from "styled-components/native";

const LessonProgressCard = ({ dialect, grammars }) => {
  const availableGrammars = grammars
    ? grammars.filter(
        (grammar) =>
          grammar.dialect_id == dialect.id && grammar.quizzes.length > 0
      )
    : [];

  const lessonsCount = availableGrammars.length;

  const quizzes = availableGrammars
    .map((grammar) => {
      return grammar.quizzes;
    })
    .flat();

  const completedLessonsCount = () => {
    let grammarIncompletedList = {};

    if (quizzes.length > 0) {
      quizzes.forEach((quiz) => {
        if (quiz) {
          if (quiz.quiz_completed === null) {
            grammarIncompletedList[quiz.grammar_id] = true;
          }
        }
      });
    }
    const imcompletedLessonsCount = Object.keys(grammarIncompletedList).length;
    return lessonsCount - imcompletedLessonsCount;
  };

  return (
    <ProgressIcon>
      <ProgressText>
        {completedLessonsCount()} / {lessonsCount}
      </ProgressText>
      <ProgressText>Lessons</ProgressText>
    </ProgressIcon>
  );
};

const ProgressIcon = styled.View`
  width: 70px;
  height: 45px;
  margin: 10px;
  border-radius: 10px;
  background-color: #f6a704;
  align-items: center;
  justify-content: center;
`;
const ProgressText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export default LessonProgressCard;
