import React from "react";
import styled from "styled-components/native";

export const ChooseDialect = () => {
  return (
    <SafeareaContainer>
      <Container>
        <ContainerText>Hello</ContainerText>
      </Container>
    </SafeareaContainer>
  );
};

const SafeareaContainer = styled.SafeAreaView`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  background-color: #7fc8f8;
`;
const Container = styled.SafeAreaView`
  height: 100%;
`;
const ContainerText = styled.Text`
  text-align: center;
`;

export default ChooseDialect;
