import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native";

export const ModalContents = ({ selectedDialect, setModal }) => {
  const imageUrl = selectedDialect.default_image;

  return (
    <>
      <ModalContainer opacity={1}>
        <ScrollView>
          <ModalHeaderContainer>
            <ModalHeader>
              {selectedDialect.name_jp} {selectedDialect.name_en}
            </ModalHeader>
            <Icon
              name="closesquareo"
              size={30}
              style={{ color: "#aacc00" }}
              onPress={() => setModal(false)}
            />
          </ModalHeaderContainer>

          <ModalImageBodyContainer>
            <ModalBodyImage source={{ uri: imageUrl }} />
            <ModalBody>{selectedDialect.description}</ModalBody>
          </ModalImageBodyContainer>

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
        </ScrollView>
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
  max-height: 80%;
  border-radius: 25px;
  margin-top: 0;
  margin-bottom: 30%;
`;

const ModalHeaderContainer = styled.View`
  width: 300px;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
`;

const ModalHeader = styled.Text`
  color: black;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
`;

const ModalImageBodyContainer = styled.View`
  justify-content: center;
  align-items: center;
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
  justify-content: center;
  align-items: center;
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
