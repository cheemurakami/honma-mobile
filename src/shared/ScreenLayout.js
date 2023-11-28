import { Dimensions, View } from "react-native";

import FooterButton from "../shared/FooterButton";
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from "../components/Modal";
import React from "react";
import { Title } from "react-native-paper";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
const { height } = Dimensions.get("window");

const ScreenLayout = (props) => {
  const navigation = useNavigation();

  const {
    pageTitle,
    btnLabel,
    btnSubLabel,
    backComponentName,
    navigationProps,
    children,
    onPressHandler,
    modal,
    setModal,
    selectedDialectId,
  } = props;

  const link = createHttpLink({ uri: "http://localhost:3000/graphql" });
  const client = new ApolloClient({ link: link, cache: new InMemoryCache() });

  const navigate = () => {
    if (navigationProps) {
      navigation.navigate(backComponentName, navigationProps)
    } else {
      navigation.navigate(backComponentName)
    }
  }

  return (
    <View>
      <HeaderContainer>
        {backComponentName ? (
          <>
            <Icon
              name="arrow-left"
              size={30}
              style={{ flex: 1, marginLeft: 10, alignSelf: "center" }}
              onPress={navigate}
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
        {!!btnLabel && (
          <FooterButton
            title={btnLabel}
            subTitle={btnSubLabel}
            onPressHandler={onPressHandler}
          />
        )}
      </Footer>

      <ApolloProvider client={client}>
        <Modal
          modal={modal}
          setModal={setModal}
          selectedDialectId={selectedDialectId}
        />
      </ApolloProvider>
    </View>
  );
};

const BodyContainer = styled.View`
  background-color: #fffceb;
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
