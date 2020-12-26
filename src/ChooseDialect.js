import { List } from "react-native-paper";
import React from "react";
import styled from "styled-components/native";

export const ChooseDialect = () => {
  const dialects = [
    {
      name: "広島弁",
      en: "Hiroshima",
    },
    {
      name: "大阪弁",
      en: "Osaka",
    },
    {
      name: "京都弁",
      en: "Kyoto",
    },
  ];

  return (
    <Container>
      <ContainerText>Choose your dialect</ContainerText>

      {dialects.map((dialect) => {
        return (
          <List.Item
            key={dialect.en}
            title={dialect.name + " " + dialect.en}
            style={{ width: "100%" }}
            left={(props) => <List.Icon {...props} icon="folder" />}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const ContainerText = styled.Text`
  text-align: center;
`;

export default ChooseDialect;
