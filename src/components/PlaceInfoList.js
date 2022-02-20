import React from "react";
import { View, Text } from "react-native";

import { connect } from "react-redux";

import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";

export const GET_PLACE_INFOS = gql`
  query getPlaceInfos($dialectId: ID!, $category: String) {
    placeInfos(dialectId: $dialectId, category: $category) {
      id
      nameEn
      nameJp
      latitude
      longtitude
      category
      description
      website
    }
  }
`;

export const PlaceInfoList = ({ route }) => {
  const { selectedDialect, selectedCategory } = route.params;

  const { loading, error, data } = useQuery(GET_PLACE_INFOS, {
    variables: { dialectId: selectedDialect.id, category: selectedCategory },
  });

  return (
    <View>
      {console.log("loading", loading, "error", error, "DATA", data)}
      <Text>
        PlaceInfoDetailPage {selectedDialect.name_en} {selectedCategory}
      </Text>
    </View>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(PlaceInfoList);
