import React, { useState } from "react";
import { ScrollView, View } from "react-native";

import styled from "styled-components/native";
import Icon from "react-native-vector-icons/FontAwesome";

export const PlaceInfoDetail = ({ route, navigation }) => {
  const { selectedDialect, selectedCategory, selectedPlace } = route.params;
  const [expandDescription, setExpandDescription] = useState(false);

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
            <Icon
              name="arrow-left"
              size={30}
              style={{
                alignSelf: "center",
                color: "#F6A704",
              }}
              onPress={() => navigation.navigate("PlaceInfoList")}
            />
            <ModalHeader>{selectedCategory}</ModalHeader>
            <View></View>
          </ModalHeaderContainer>
          <ModalImageBodyContainer>
            <ModalBodyImage
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS65JA8pwgmMfiBozDP7ARjeT3RTDr-kPX1Fw&usqp=CAU",
              }}
            />
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
          <InfoContainer>
            <Icon
              name="home"
              size={30}
              style={{
                alignSelf: "center",
                color: "#F6A704",
              }}
            />
            <InfoText>sup</InfoText>
          </InfoContainer>
          <InfoContainer>
            <Icon
              name="map-marker"
              size={30}
              style={{
                alignSelf: "center",
                color: "#F6A704",
              }}
            />
            <InfoText>whatup</InfoText>
          </InfoContainer>
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

const InfoContainer = styled.View`
  width: 300px;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 20px;
  padding: 0 20px 20px 20px;
  border: red;
`;

const InfoText = styled.Text`
  font-size: 16px;
  color: #255f85;
  font-size: 24px;
  margin-left: 20px;
  border: blue;
`;

export default PlaceInfoDetail;
