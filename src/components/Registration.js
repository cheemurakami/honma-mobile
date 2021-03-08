import React from "react";
import styled from "styled-components/native";
import { Button } from "react-native-paper";

export const Registration = () => {
  return (
    <RegistrationContainer>
      <TextHonma>Honma</TextHonma>
      <SubText>Elevate your Japanese skills by learning dialects</SubText>
      <ButtonContainer>
        <Button
          mode="contained"
          color={"#E9A9BA"}
          labelStyle={{
            color: "#fff",
            fontSize: 18,
          }}
          style={{
            width: 250,
            height: 45,
            margin: 10,
            justifyContent: "center",
          }}
        >
          Get Started
        </Button>

        <Button
          mode="contained"
          color={"#E9A9BA"}
          labelStyle={{
            color: "#fff",
            fontSize: 18,
          }}
          style={{
            width: 250,
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
const TextHonma = styled.Text`
  font-size: 48px;
  color: #fff;
  font-weight: bold;
`;
const SubText = styled.Text`
  font-size: 18px;
  color: #fff;
`;
const ButtonContainer = styled.View`
  margin: 10px;
`;

export default Registration;
