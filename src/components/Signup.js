import React, { useState } from "react";
import styled from "styled-components/native";
import { TextInput, Button } from "react-native-paper";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const signup = (email, password, passwordConf) => {
    console.log(email, password, passwordConf);
  };

  return (
    <RegistrationContainer>
      <TextHeader>Sign up</TextHeader>
      <FormContainer>
        <TextInput
          label="Email"
          style={{ margin: 20 }}
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
        <TextInput
          label="Password"
          style={{ margin: 20 }}
          autoCapitalize="none"
          value={password}
          onChangeText={(text) => setPassword(text)}
        ></TextInput>
        <TextInput
          label="Password Confirmation"
          style={{ margin: 20 }}
          autoCapitalize="none"
          value={passwordConf}
          onChangeText={(text) => setPasswordConf(text)}
        ></TextInput>
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
            type="submit"
            onPress={() => signup(email, password, passwordConf)}
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
