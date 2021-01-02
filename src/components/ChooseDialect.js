import * as a from "../rdx/actions";

import React, { useEffect } from "react";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { List } from "react-native-paper";
import ScreenLayout from "../shared/ScreenLayout";
import { connect } from "react-redux";
import styled from "styled-components/native";

const pageTitle = "Choose your dialect";
const btnLabel = "はじめるで";

const ChooseDialect = ({ navigation, dispatch, dialects}) => {
  
  useEffect(() => {
    fetch("http://localhost:3000/api/dialects")
      .then((resp) => resp.json())
      .then((resp) => dispatch(a.loadedDialects(resp)));
    return () => {};
  }, []);

  return (
    <ScreenLayout
      pageTitle={pageTitle}
      btnLabel={btnLabel}
      onPressHandler={() => navigation.navigate("PatternList")}
    >
      <DialectContainer>
        {dialects && dialects.map((dialect, index) => {
          return (
            <DialectTouchable
              key={index}
              onPress={() => navigation.navigate("PatternList", {grammars: dialect.grammars})}
            >
              <List.Item
                title={dialect.name_jp + " " + dialect.name_en}
                titleNumberOfLines={2}
                titleStyle={{ fontSize: 20 }}
                style={{ width: "100%" }}
                left={() => (
                  <Icon
                    name="flower-poppy"
                    size={30}
                    style={{ margin: 10, color: "#aacc00" }}
                  />
                )}
              />
            </DialectTouchable>
          );
        })}
      </DialectContainer>
    </ScreenLayout>
  );
};

const DialectContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 10px;
`;

const DialectTouchable = styled.TouchableHighlight.attrs({
  underlayColor: "#7fc8f8",
})`
  margin-top: 10px;
  border-radius: 25px;
`;

const mapStateToProps = (state) => {
  return {
    dialects: state.dialectReducer.dialects,
  };
};

export default connect(mapStateToProps)(ChooseDialect);
