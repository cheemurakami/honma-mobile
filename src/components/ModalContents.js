import React from "react";
import styled from "styled-components/native";

export const ModalContents = ({ selectedDialect }) => {

  return (
    <>
      <ModalContainer opacity={1}>
        <ModalHeader>
          {selectedDialect.name_jp} {selectedDialect.name_en}
        </ModalHeader>
      </ModalContainer>
      </>
  );
};

const ModalContainer = styled.View`
  background-color: #fff;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  border-radius: 25px;
`;
const ModalHeader = styled.Text`
  color: black;
  font-weight: bold;
  font-size: 20px;
`;

export default ModalContents;
