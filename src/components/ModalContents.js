import React from "react";
import styled from "styled-components/native";

export const ModalContents = ({ selectedDialect }) => {
  const imageUrl = selectedDialect.default_image;

  return (
    <>
      <ModalContainer opacity={1}>
        <ModalHeader>
          {selectedDialect.name_jp} {selectedDialect.name_en}
        </ModalHeader>
        <ModalBodyImage source={{ uri: imageUrl }} />
        <ModalBody>{selectedDialect.description}</ModalBody>
        <ButtonContainer>
          <CategoryButton>
            <CategoryButtonText>Restaurant</CategoryButtonText>
          </CategoryButton>
          <CategoryButton>
            <CategoryButtonText>Museum</CategoryButtonText>
          </CategoryButton>
          <CategoryButton>
            <CategoryButtonText>Scenery</CategoryButtonText>
          </CategoryButton>
          <CategoryButton>
            <CategoryButtonText>Districts</CategoryButtonText>
          </CategoryButton>
        </ButtonContainer>
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
  height: 85%;
  border-radius: 25px;
  margin-top: 0;
  margin-bottom: 20%;
`;

const ModalHeader = styled.Text`
  color: black;
  font-weight: bold;
  font-size: 20px;
`;

const ModalBodyImage = styled.Image`
  background-color: white;
  width: 200px;
  height: 200px;
  margin: 16px;
`;

const ModalBody = styled.Text`
  color: black;
  font-size: 16px;
  margin: 16px;
`;

const ButtonContainer = styled.View`
  background-color: #fff;
  justify-content: center;
  align-items: center;
  width: 280px;
`;

const CategoryButton = styled.TouchableOpacity`
  margin-bottom: 10px;
  border-radius: 5px;
  width: 180px;
  height: 30px;
  justify-content: center;
  background-color: #ffe45e;
  background-color: ${() => "#f5cc00"};
`;

const CategoryButtonText = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  color: #fff;
`;

export default ModalContents;
