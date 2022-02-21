import React from "react";
import { View, Text } from "react-native";

export const PlaceInfoDetail = ({ route }) => {
  const { selectedDialect, selectedCategory, selectedPlace } = route.params;
  return (
    <View>
      <Text>PlaceInfoDetailPage, {selectedPlace}</Text>
    </View>
  );
};

export default PlaceInfoDetail;
