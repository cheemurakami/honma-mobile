import React, { useState } from "react";
import styled from "styled-components/native";
import { TextInput, Button } from "react-native-paper";
import { connect } from "react-redux";
import * as a from "../rdx/actions";

export const Signin = ({ navigation, dispatch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const signin = (email, password) => {
    const data = {
      email: email,
      password: password,
    };
    fetch("https://honma-api.herokuapp.com/users/sign_in", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: data }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.error) {
          setErrMessage(resp.error);
        } else {
          setErrMessage("");
          dispatch(a.signin(resp));
          navigation.navigate("Loading");
        }
      });
  };

  const errorMessage = (message) => {
    if (message) {
      return <ErrorText>{message}</ErrorText>;
    }
  };

  return (
    <RegistrationContainer>
      <TextHeader>Sign in</TextHeader>
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
        {errorMessage(errMessage)}
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
            onPress={() => signin(email, password)}
          >
            Sign in
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
export default connect(mapStateToProps)(Signin);
