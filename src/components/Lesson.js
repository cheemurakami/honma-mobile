import { Text, View } from "react-native";

import FooterButton from "../shared/FooterButton"
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import { Title } from 'react-native-paper';
import styled from "styled-components/native";

const pageTitle = "いる / おる　おるん?"
const btnTitle = "完了"
const Lesson = ({ navigation }) => {
  return (
    <View>
      <Icon
        name="arrow-left"
        size={30}
        onPress={() => navigation.navigate("ChooseDialect")}
      />
      <Title style={{textAlign: 'center'}}>{pageTitle}</Title>
      <BodyContainer></BodyContainer>
      <Footer>
        <FooterButton title={btnTitle}/>
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

export default Lesson
