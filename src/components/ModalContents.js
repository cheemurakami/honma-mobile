import React, { useState } from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native";

export const ModalContents = ({ selectedDialect, setModal }) => {
  const imageUrl = selectedDialect.default_image;
  const [expandDescription, setExpandDescription] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = ["Restaurants", "Museums", "Scenery", "Districts"];

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
            <ModalWrapper
              onPress={() => setExpandDescription(!expandDescription)}
            >
              <ModalBody
                numberOfLines={expandDescription ? 30 : 10}
                ellipsizeMode="tail"
              >
                {selectedDialect.description}{" "}
              </ModalBody>
            </ModalWrapper>
          </ModalImageBodyContainer>

          <ButtonContainer>
            {categories.map((category, i) => {
              return (
                <CategoryButton
                  key={i}
                  onPress={() => setSelectedCategory(i)}
                  style={
                    i == selectedCategory
                      ? { backgroundColor: "#F6A704" }
                      : { backgroundColor: "#ffe45e" }
                  }
                >
                  <CategoryButtonText>{category}</CategoryButtonText>
                </CategoryButton>
              );
            })}
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

const ModalWrapper = styled.TouchableOpacity``;

const ModalBody = styled.Text`
  color: black;
  font-size: 16px;
  margin: 16px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
`;

const CategoryButton = styled.TouchableOpacity`
  margin: 10px;
  border-radius: 5px;
  width: 120px;
  height: 48px;
  justify-content: center;
`;

const CategoryButtonText = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: #255f85;
`;

export default ModalContents;
