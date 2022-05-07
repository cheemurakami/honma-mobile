import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";

import styled from "styled-components/native";
import Icon from "react-native-vector-icons/FontAwesome";

export const GET_PLACE_INFOS = gql`
  query getPlaceInfos($dialectId: ID!, $category: String) {
    placeInfos(dialectId: $dialectId, category: $category) {
      id
      nameEn
      nameJp
      category
      imageUrls
      website
      address
      description
    }
  }
`;

export const PlaceInfoList = ({ route, navigation }) => {
  const { selectedDialect, selectedCategory } = route.params;

  const { data } = useQuery(GET_PLACE_INFOS, {
    variables: { dialectId: selectedDialect.id, category: selectedCategory },
  });

  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    if (selectedPlace !== null) {
      navigation.navigate("PlaceInfoDetail", {
        selectedDialect,
        selectedPlace,
      });
    }

    return () => {
      setSelectedPlace(null);
    };
  }, [selectedPlace]);

  if (data) {
    const imageUrls = data.placeInfos
      .map((placeInfo) => {
        return placeInfo.imageUrls;
      })
      .flat();

    const randomImageUrl = (max) => {
      return imageUrls[Math.floor(Math.random() * max)];
    };

    const placeInfos = data.placeInfos;

    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ModalContainer opacity={1}>
          <ModalHeaderContainer>
            <Icon
              name="arrow-left"
              size={30}
              style={{
                alignSelf: "center",
                color: "#F6A704",
              }}
              onPress={() => navigation.navigate("PlaceInfoMain")}
            />
            <ModalHeader>{selectedCategory}</ModalHeader>
            <View></View>
          </ModalHeaderContainer>
          {imageUrls ? (
            <ModalImageBodyContainer>
              <ModalBodyImage
                source={{ uri: randomImageUrl(imageUrls.length) }}
              />
            </ModalImageBodyContainer>
          ) : null}

          <SubHeaderContainer>
            <SubHeader ellipsizeMode="tail">Recommendations:</SubHeader>
          </SubHeaderContainer>

          <ButtonContainer>
            {placeInfos.map((place, i) => {
              return (
                <CategoryButton
                  key={i}
                  onPress={() => setSelectedPlace(place)}
                  style={
                    i == placeInfos.indexOf(selectedPlace)
                      ? { backgroundColor: "#F6A704" }
                      : { backgroundColor: "#ffe45e" }
                  }
                >
                  <CategoryButtonText>{place.nameEn}</CategoryButtonText>
                </CategoryButton>
              );
            })}
          </ButtonContainer>
        </ModalContainer>
      </View>
    );
  } else {
    return null;
  }
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

const SubHeaderContainer = styled.View`
  width: 300px;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 20px;
`;
const SubHeader = styled.Text`
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
  width: 240px;
  height: 48px;
  justify-content: center;
`;

const CategoryButtonText = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: #255f85;
`;

export default PlaceInfoList;
