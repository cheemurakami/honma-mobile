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
      <HeaderContainer>
        {backComponentName ? (
          <>
            <Icon
              name="arrow-left"
              size={30}
              style={{ flex: 1, marginLeft: 10, alignSelf: "center" }}
              onPress={() => navigation.navigate(backComponentName)}
            />
            <Title
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 28,
                color: "#fff",
              }}
            >
              Honma
            </Title>
            <View style={{ flex: 1 }}></View>
          </>
        ) : (
          <Title
            style={{ justifyContent: "center", fontSize: 28, color: "#fff" }}
          >
            Honma
          </Title>
        )}
      </HeaderContainer>

      <BodyContainer>
        <TitleContainer>
          <Title style={{ textAlign: "center" }}>{pageTitle}</Title>
        </TitleContainer>
        {children}
      </BodyContainer>
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
const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  margin-bottom: 5%;
`;
const TitleContainer = styled.View`
  margin-top: 5%;
  margin-bottom: 5%;
`;

const Footer = styled.View`
  align-items: center;
`;

export default ScreenLayout;
