import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import styled from "styled-components/native";

const Commonness = ({ commonness }) => {
  let stars = [];
  const showStars = () => {
    for (let i = 0; i < commonness; i++) {
      stars.push(
        <Icon name="star" size={20} style={{ color: "#FFE45E" }}></Icon>
      );
    }
    return stars.map((star) => {
      return star;
    });
  };
  return <CommonnessText>Commonness: {showStars()}</CommonnessText>;
};

const CommonnessText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  margin: 15px;
`;

export default Commonness;
