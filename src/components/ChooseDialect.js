import React, { useState } from "react";

import { Alert } from "react-native";
import FindById from "./helpers/FindById";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { List } from "react-native-paper";
import ScreenLayout from "../shared/ScreenLayout";
import { connect } from "react-redux";
import styled from "styled-components/native";

const pageTitle = "Choose your dialect";
let counter = 0;
const defaultTitleStyle = { fontSize: 20 };
const selectedTitleStyle = { ...defaultTitleStyle, color: "#fff" };

const ChooseDialect = ({ navigation, dialects }) => {
  const [selectedDialectId, setSelectedDialectId] = useState(null);
  const [btnText, setBtnText] = useState("はじめましょう!!");

  const doubleTap = (id) => {
    changeBtnText(id);
    const selectedDialect = FindById(dialects, id);
    if (selectedDialectId == id || selectedDialectId == null) {
      setSelectedDialectId(id);
      counter++;
      if (counter === 1) {
        setTimeout(() => {
          counter = 0;
        }, 1200);
      } else if (counter === 2) {
        navigation.navigate("PatternList", { selectedDialect });
      }
    } else {
      setSelectedDialectId(id);
      counter = 1;
    }
  };

  const changeBtnText = (id) => {
    const selectedDialect = FindById(dialects,id);
    setBtnText(selectedDialect.start_btn_text);
  };

  const navigateBtn = (id) => {
    if (id) {
      const selectedDialect = FindById(dialects, id);
      navigation.navigate("PatternList", {
        selectedDialect,
      });
    } else {
      Alert.alert("Please select dialect");
    }
  };

  return (
    <ScreenLayout
      pageTitle={pageTitle}
      btnLabel={btnText}
      onPressHandler={() => navigateBtn(selectedDialectId)}
    >
      <DialectContainer>
        {dialects &&
          dialects.map((dialect, index) => {
            return (
              <DialectTouchable
                key={index}
                onPress={() => doubleTap(dialect.id)}
                style={
                  selectedDialectId === dialect.id
                    ? {
                      backgroundColor: "#7fc8f8",
                    }
                    : { backgroundColor: "#fff" }
                }
              >
                <List.Item
                  title={dialect.name_jp + " " + dialect.name_en}
                  titleNumberOfLines={2}
                  titleStyle={ selectedDialectId === dialect.id ? selectedTitleStyle : defaultTitleStyle}
                  style={{ width: "100%", }}
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
