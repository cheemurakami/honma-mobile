import { Dimensions, View } from "react-native";

import FooterButton from "../shared/FooterButton";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import { Title } from "react-native-paper";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

const ScreenLayout = (props) => {
  const navigation = useNavigation();

  const {
    pageTitle,
    btnLabel,
    backComponentName,
    children,
    onPressHandler,
  } = props;

  return (
    <View>
      {backComponentName && (
        <Icon
          name="arrow-left"
          size={30}
          style={{ margin: 10 }}
          onPress={() => navigation.navigate(backComponentName)}
        />
      )}
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
  height: ${height * 0.7}px;
  margin: 10px;
`;

const Footer = styled.View`
  align-items: center;
`;

export default ScreenLayout;
