import React, { useState } from "react";
import styled from "styled-components/native";
import { TextInput, Button } from "react-native-paper";
import { connect } from "react-redux";
import * as a from "../rdx/actions";

export const Signin = ({ dispatch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = (email, password) => {
    const data = {
      email: email,
      password: password,
    };
    fetch("http://localhost:3000/users/sign_in", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: data }),
    })
      .then((resp) => resp.json())
      .then((resp) => console.log("RESP", resp))
      .then((resp) => dispatch(a.signin(resp)));
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

const mapStateToProps = (state) => {
  console.log("AUTH REDUCER", state.authReducer);
  return {
    dialects: state.dialectReducer.dialects,
    completedGrammars: state.grammarsReducer.completedIds,
    auth: state.authReducer,
  };
};
export default connect(mapStateToProps)(Signin);
