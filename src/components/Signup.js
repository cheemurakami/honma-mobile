import React from "react";
import styled from "styled-components/native";
import { TextInput, Button } from "react-native-paper";

export const Signup = () => {
  return (
    <RegistrationContainer>
      <TextHeader>Sign up</TextHeader>
      <FormContainer>
        <TextInput label="Email" style={{ margin: 20 }}></TextInput>
        <TextInput label="Password" style={{ margin: 20 }}></TextInput>
        <ButtonContainer>
          <Button
            mode="contained"
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
            Sign up
          </Button>
        </ButtonContainer>
      </FormContainer>
    </RegistrationContainer>
  );
};
const RegistrationContainer = styled.View`
  flex: 1;
  justify-content: center;
`;
const FormContainer = styled.View``;

const TextHeader = styled.Text`
  margin: 12px;
  font-size: 24px;
  color: #fff;
  font-weight: bold;
`;
const ButtonContainer = styled.View`
  margin: 10px;
  align-items: center;
`;
export default Signup;
