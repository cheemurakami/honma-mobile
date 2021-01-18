import * as a from "../rdx/actions";

import React, { useEffect } from "react";

import { connect } from "react-redux";
import styled from "styled-components/native";

const Loading = ({ navigation, dialects, dispatch }) => {
  useEffect(() => {
    fetch("http://honma-api.herokuapp.com/api/dialects")
      .then((resp) => resp.json())
      .then((resp) => dispatch(a.loadedDialects(resp)))
      .then(() => navigation.navigate("ChooseDialect"));
    return () => {};
  }, []);
  return (
    <LoadingContainer>
      <TextHonma>Honma</TextHonma>
      <TextLoading>Loading...</TextLoading>
    </LoadingContainer>
  );
};

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const TextHonma = styled.Text`
  font-size: 48px;
  color: #fff;
  font-weight: bold;
`;
const TextLoading = styled.Text`
  font-size: 18px;
`;

const mapStateToProps = (state) => {
  return {
    dialects: state.dialectReducer.dialects,
  };
};

export default connect(mapStateToProps)(Loading);
