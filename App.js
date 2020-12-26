import ChooseDialect from "./src/ChooseDialect";
import React from "react";
import styled from "styled-components/native";

export default function App() {
  return (
    <SafeareaContainer>
      <ChooseDialect />
    </SafeareaContainer>
  );
}

const SafeareaContainer = styled.SafeAreaView`
  flex: 1;
  flex-direction: row;
  background-color: #7fc8f8;
`;
