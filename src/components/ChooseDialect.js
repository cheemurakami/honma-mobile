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
const defaultTitleStyle = { fontSize: 20, fontWeight: "bold" };
const selectedTitleStyle = { ...defaultTitleStyle, color: "#fff" };
const defaultDescriptionStyle = { fontSize:14, fontWeight: "bold" };
const selectedDescriptionStyle = { ...defaultDescriptionStyle, color: "#fff" };

const ChooseDialect = ({ navigation, dialects, completedGrammars }) => {
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
    const selectedDialect = FindById(dialects, id);
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

  const completedNumber = (dialectGrammars) => {
    const completedGrammarsIds = Object.keys(completedGrammars);
    const dialectGrammarIds = dialectGrammars.map((grammar) =>
      grammar.id.toString()
    );
    let count = 0;
    completedGrammarsIds.forEach((id) => {
      if (dialectGrammarIds.includes(id)) {
        count += 1;
      }
    });
    return count;
  };

  return (
    <ScreenLayout
      pageTitle={pageTitle}
      btnLabel={btnText}
      btnSubLabel="Start"
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
                  title={dialect.name_jp}
                  titleStyle={
                    selectedDialectId === dialect.id
                      ? selectedTitleStyle
                      : defaultTitleStyle
                  }
                  description={dialect.name_en}
                  descriptionStyle={
                    selectedDialectId === dialect.id
                      ? selectedDescriptionStyle
                      : defaultDescriptionStyle
                  }
                  style={{ width: "100%" }}
                  left={() => (
                    <Icon
                      name="flower-poppy"
                      size={45}
                      style={{ margin: 10, color: "#aacc00" }}
                    />
                  )}
                  right={() => (
                    <ProgressIcon>
                      <ProgressText>
                        {completedNumber(dialect.grammars)}/
                        {dialect.grammars.length}
                      </ProgressText>
                      <ProgressText>Lesson</ProgressText>
                    </ProgressIcon>
                  )}
                />
              </DialectTouchable>
            );
          })}
          <TextWrapper>
            <MessageText>More dialects coming soon!</MessageText>
          </TextWrapper>
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

const ProgressIcon = styled.View`
  width: 70px;
  height: 45px;
  margin: 10px;
  border-radius: 10px;
  background-color: #f6a704;
  align-items: center;
  justify-content: center;
`;
const ProgressText = styled.Text`
  color: #fff;
  font-weight: bold;
`;
const TextWrapper = styled.View`
  align-items: center;
  padding: 10px;
`;

const MessageText = styled.Text`
  font-size: 18px;
`;

const mapStateToProps = (state) => {
  return {
    dialects: state.dialectReducer.dialects,
    completedGrammars: state.grammarsReducer.completedIds,
  };
};

export default connect(mapStateToProps)(ChooseDialect);
