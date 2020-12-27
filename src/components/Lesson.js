import { Text, View } from "react-native";

import FooterButton from "../shared/FooterButton";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import SoundPlayButton from "../shared/SoundPlayButton";
import { Title } from "react-native-paper";
import styled from "styled-components/native";

const pageTitle = "いる / おる　おるん?";
const btnTitle = "完了";
const Lesson = ({ navigation }) => {
  return (
    <View>
      <Icon
        name="arrow-left"
        size={30}
        style={{ margin: 10 }}
        onPress={() => navigation.navigate("ChooseDialect")}
      />
      <Title style={{ textAlign: "center" }}>{pageTitle}</Title>
      <BodyContainer>
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
      </BodyContainer>

      <Footer>
        <FooterButton title={btnTitle} />
      </Footer>
    </View>
  );
};

const BodyContainer = styled.View`
  background-color: white;
  height: 80%;
  margin: 10px;
`;

const Footer = styled.View`
  align-items: center;
`;

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
