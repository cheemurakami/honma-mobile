import React from "react";
import { View, Text } from "react-native";

import { connect } from "react-redux";

export const PlaceInfoList = ({ route }) => {
  const { selectedDialect } = route.params;
  return (
    <View>
      <Text>PlaceInfoDetailPage {selectedDialect.name_en}</Text>
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceInfoList);
