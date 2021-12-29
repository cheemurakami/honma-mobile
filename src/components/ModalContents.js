import React from "react";
import styled from "styled-components/native";
import { Image } from 'react-native';

export const ModalContents = ({ selectedDialect }) => {

  const imageUrl = selectedDialect.default_image

  return (
    <>
      <ModalContainer opacity={1}>
        <ModalHeader>
          {selectedDialect.name_jp} {selectedDialect.name_en} 
        </ModalHeader>
        <ModalBody>
          {selectedDialect.description}
        </ModalBody>
        <Image
          style={{width: 200, height: 200}}
          source={{uri: imageUrl}}
        />
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

const ModalBody = styled.Text`
  color: black;
  font-size: 16px;
`;

const ModalBodyImage = styled.Image`
  background-color: white;
`;

export default ModalContents;
