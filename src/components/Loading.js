import * as a from "../rdx/actions";

import React, { useEffect } from "react";
import { Text, View } from "react-native";

import { connect } from "react-redux";

const Loading = ({ navigation, dialects, dispatch }) => {
  useEffect(() => {
    fetch("http://honma-api.herokuapp.com/api/dialects")
      .then((resp) => resp.json())
      .then((resp) => dispatch(a.loadedDialects(resp)));
    return () => {};
  }, []);

  if (dialects && dialects.length > 0) {
    navigation.navigate("ChooseDialect");
    return null
  } else {
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    dialects: state.dialectReducer.dialects,
  };
};

export default connect(mapStateToProps)(Loading);
