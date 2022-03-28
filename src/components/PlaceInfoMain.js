import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/AntDesign";
import { ScrollView, View } from "react-native";

export const PlaceInfoMain = ({ selectedDialect, setModal, navigation }) => {
  const imageUrl = selectedDialect.default_image;
  const [expandDescription, setExpandDescription] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = ["Restaurants", "Museums", "Scenery", "Districts"];

  const showPlaceInfoList = (i) => {
    setSelectedCategory(categories[i]);
  };

  useEffect(() => {
    if (selectedCategory !== null) {
      navigation.navigate("PlaceInfoList", {
        selectedDialect,
        selectedCategory,
      });
    }
    return () => {
      setSelectedCategory(null);
    };
  }, [selectedCategory]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ModalContainer opacity={1}>
        <ScrollView>
          <ModalHeaderContainer>
            <ModalHeader>{selectedDialect.name_en}</ModalHeader>
            <Icon
              name="closesquare"
              size={30}
              style={{ color: "#255f85", lineHeight: 40 }}
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
                  onPress={() => showPlaceInfoList(i)}
                  style={
                    i == categories.indexOf(selectedCategory)
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
    </View>
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
  background-color: #fffceb;
`;

const ModalHeaderContainer = styled.View`
  width: 300px;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
`;

const ModalHeader = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #255f85;
  font-size: 30px;
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
  border-radius: 15px;
`;

const ModalWrapper = styled.TouchableOpacity``;

const ModalBody = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #255f85;
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

export default PlaceInfoMain;
