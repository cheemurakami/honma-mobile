import React from "react";
import { View, Text } from "react-native";

import { connect } from "react-redux";

export const PlaceInfoList = (props) => {
  return <View><Text>PlaceInfoDetailPage</Text></View>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceInfoList);
