import React from "react";
import styled from "styled-components/native";
import { Button } from "react-native-paper";

export const Registration = ({navigation}) => {

  const goToNextpage = (page) => {
    navigation.navigate(page)
  }

  return (
    <RegistrationContainer>
      <TextHonma>Honma</TextHonma>
      <SubTextContainer>
        <SubText>Elevate your Japanese skills by learning dialects</SubText>
      </SubTextContainer>
      <ButtonContainer>
        <Button
          mode="contained"
          onPress={() => {
            goToNextpage("Signup");
          }}
          color={"#E9A9BA"}
          labelStyle={{
            color: "#fff",
            fontSize: 18,
          }}
          style={{
            width: 280,
            height: 45,
            margin: 10,
            justifyContent: "center",
          }}
        >
          Get Started
        </Button>

        <Button
          mode="contained"
          onPress={() => {
            goToNextpage("Signin");
          }}
          color={"#E9A9BA"}
          labelStyle={{
            color: "#fff",
            fontSize: 18,
          }}
          style={{
            width: 280,
            height: 45,
            margin: 10,
            justifyContent: "center",
          }}
        >
          LOG IN
        </Button>
      </ButtonContainer>
    </RegistrationContainer>
  );
};

const RegistrationContainer = styled.View`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
`;
const SubTextContainer = styled.View`
  flex-direction: row;
  width: 250px;
`;
const TextHonma = styled.Text`
  flex-shrink: 1;
  font-size: 48px;
  color: #fff;
  font-weight: bold;
`;
const SubText = styled.Text`
  text-align: center;
  flex-wrap: wrap;
  font-size: 20px;
  color: #fff;
`;
const ButtonContainer = styled.View`
  margin: 10px;
`;

export default Registration;
