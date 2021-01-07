import * as a from "../rdx/actions";

import React, { useEffect, useState } from "react";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { List } from "react-native-paper";
import ScreenLayout from "../shared/ScreenLayout";
import { connect } from "react-redux";
import styled from "styled-components/native";

const pageTitle = "Choose your dialect";
let counter = 0;

const ChooseDialect = ({ navigation, dispatch, dialects }) => {
  const [selectedDialectId, setSelectedDialectId] = useState(null);
  const [btnText, setBtnText] = useState("はじめましょう!!");

  useEffect(() => {
    fetch("http://honma-api.herokuapp.com/api/dialects")
      .then((resp) => resp.json())
      .then((resp) => dispatch(a.loadedDialects(resp)));
    return () => {};
  }, []);

  const findDialectById = (id) => {
    return dialects.find((dialect) => dialect.id === id);
  };

  const doubleTap = (id) => {
    changeBtnText(id);
    const selectedDialect = findDialectById(id);
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
    const selectedDialect = findDialectById(id);
    setBtnText(selectedDialect.start_btn_text);
  };

  const navigateBtn = (id) => {
    if (id) {
      const selectedDialect = findDialectById(id);
      navigation.navigate("PatternList", {
        selectedDialect,
      });
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
