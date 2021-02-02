import React from "react";
import styled from "styled-components/native";

const FooterButton = ({ title, subTitle, onPressHandler }) => {
  return (
    <NextLessonButton onPress={onPressHandler}>
      <TitleText>{title}</TitleText>
      <SubTitleText>{subTitle}</SubTitleText>
    </NextLessonButton>
  );
};

const NextLessonButton = styled.TouchableOpacity`
  margin-top: 10px;
  border-radius: 5px;
  width: 70%;
  height: 64px;
  justify-content: center;
  background-color: ${() => "#f5cc00"};
`;
const TitleText = styled.Text`
  text-align: center;
  font-size: 30px;
  color: #fff;
`;
const SubTitleText = styled.Text`
  text-align: center;
  font-size: 22px;
  color: #fff;
`;

export default FooterButton;
