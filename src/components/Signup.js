import React, { useState } from "react";
import styled from "styled-components/native";
import { TextInput, Button } from "react-native-paper";
import { connect } from "react-redux";

import * as a from "../rdx/actions";

export const Signup = ({ navigation, dispatch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [errMessage, setErrMessage] = useState({});

  const signup = (email, password, passwordConf) => {
    const data = {
      email: email,
      password: password,
      password_confirmation: passwordConf,
    };
    fetch("http://localhost:3000//users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: data }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.authentication_token) {
          dispatch(a.signup(resp));
          navigation.navigate("Loading");
          setErrMessage({});
        } else {
          setErrMessage(resp.errors);
        }
      });
  };

  const errorMessageEmail = (message) => {
    if (message && message.email) {
      return <ErrorText>Email {message.email}</ErrorText>;
    }
  };
  const errorMessagePassword = (message) => {
    if (message && message.password) {
      return <ErrorText>Password {message.password}</ErrorText>;
    }
  };
  const errorMessagePasswordConfirmation = (message) => {
    if (message && message.password_confirmation) {
      return <ErrorText>Password {message.password_confirmation}</ErrorText>;
    }
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
        {errorMessageEmail(errMessage)}
        <TextInput
          label="Password"
          secureTextEntry={true}
          style={{ margin: 20 }}
          autoCapitalize="none"
          value={password}
          onChangeText={(text) => setPassword(text)}
        ></TextInput>
        {errorMessagePassword(errMessage)}
        <TextInput
          label="Password Confirmation"
          secureTextEntry={true}
          style={{ margin: 20 }}
          autoCapitalize="none"
          value={passwordConf}
          onChangeText={(text) => setPasswordConf(text)}
        ></TextInput>
        {errorMessagePasswordConfirmation(errMessage)}
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
const ErrorText = styled.Text`
  text-align: center;
  flex-wrap: wrap;
  font-size: 20px;
  color: tomato;
`;

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
  };
};
export default connect(mapStateToProps)(Signup);
