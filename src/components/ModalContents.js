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
        <ModalBodyImage
          source={{uri: imageUrl}}
        />
        <ModalBody>
          {selectedDialect.description}
        </ModalBody>
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
  height: 80%;
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
  margin: 16px; 
`;

const ModalBodyImage = styled.Image`
  background-color: white;
  width: 200px;
  height: 200px;
  margin: 16px; 
`;

export default ModalContents;
