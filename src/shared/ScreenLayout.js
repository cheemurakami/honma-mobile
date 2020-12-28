import FooterButton from "../shared/FooterButton";
import React from "react";
import { Title } from "react-native-paper";
import { View } from "react-native";
import styled from "styled-components/native";

const ScreenLayout = (props) => {
  const { pageTitle, btnLabel, backButton, children, onPressHandler } = props;
  return (
    <View>
      {backButton}
      <Title style={{ textAlign: "center" }}>{pageTitle}</Title>
      <BodyContainer>{children}</BodyContainer>
      <Footer>
        <FooterButton title={btnLabel} onPressHandler={onPressHandler} />
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

export default ScreenLayout;
