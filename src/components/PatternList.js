import * as a from "../rdx/actions";

import { Alert } from "react-native";
import FindById from "./helpers/FindById";
import Icon from "react-native-vector-icons/FontAwesome";
import { List } from "react-native-paper";
import React from "react";
import ScreenLayout from "../shared/ScreenLayout";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components/native";

let counter = 0;
const defaultDescriptionStyle = { fontSize: 20 };
const selectedDescriptionStyle = { ...defaultDescriptionStyle, color: "#fff" };
const defaultTitleStyle = { fontSize: 16 };
const selectedTitleStyle = { ...defaultTitleStyle, color: "#fff" };

const PatternList = ({
  route,
  navigation,
  completedGrammars,
  dispatch,
  selectedGrammarId,
}) => {
  const { selectedDialect } = route.params;
  const btnLabel = selectedDialect.next_btn_text;
  const pageTitle = selectedDialect.name_jp + " " + selectedDialect.name_en;

  const navigateBtn = () => {
    if (selectedGrammarId) {
      const selectedGrammar = FindById(
        selectedDialect.grammars,
        selectedGrammarId
      );
      navigation.navigate("Lesson", {
        selectedDialect,
        grammar: selectedGrammar,
      });
    } else {
      Alert.alert("Please select pattern");
    }
  };

  const doubleTap = (id) => {
    const selectedGrammar = FindById(selectedDialect.grammars, id);
    const action = a.selectedGrammar(id);
    if (selectedGrammarId == id || selectedGrammarId == null) {
      dispatch(action);
      counter++;
      if (counter === 1) {
        setTimeout(() => {
          counter = 0;
        }, 1200);
      } else if (counter === 2) {
        counter = 0;
        navigation.navigate("Lesson", {
          selectedDialect,
          grammar: selectedGrammar,
        });
      }
    } else {
      dispatch(action);
      counter = 1;
    }
  };

  const iconName = (id) => {
    if (completedGrammars[id]) {
      return "check";
    } else {
      return "leaf";
    }
  };

  return (
    <ScreenLayout
      pageTitle={pageTitle}
      btnLabel={btnLabel}
      btnSubLabel="Go to lesson"
      backComponentName={"ChooseDialect"}
      onPressHandler={() => navigateBtn()}
      selectedGrammarId={selectedGrammarId}
    >
      <ScrollView>
        <PatternContainer>
          {selectedDialect.grammars &&
            selectedDialect.grammars.map((grammar, index) => {
              return (
                <ListTouchable
                  key={index}
                  onPress={() => doubleTap(grammar.id)}
                  style={
                    selectedGrammarId === grammar.id
                      ? {
                          backgroundColor: "#7fc8f8",
                        }
                      : { backgroundColor: "#fff" }
                  }
                >
                  <List.Item
                    title={`Lesson ${grammar.position + 1}`}
                    description={grammar.label}
                    titleNumberOfLines={1}
                    descriptionStyle={
                      selectedGrammarId === grammar.id
                        ? selectedDescriptionStyle
                        : defaultDescriptionStyle
                    }
                    titleStyle={
                      selectedGrammarId === grammar.id
                        ? selectedTitleStyle
                        : defaultTitleStyle
                    }
                    style={{ width: "100%" }}
                    left={() => (
                      <Icon
                        name={iconName(grammar.id)}
                        size={30}
                        style={{ margin: 10, color: "#aacc00" }}
                      />
                    )}
                  />
                </ListTouchable>
              );
            })}
        </PatternContainer>
      </ScrollView>
    </ScreenLayout>
  );
};

const PatternContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 10px;
`;

const ListTouchable = styled.TouchableHighlight.attrs({
  underlayColor: "#7fc8f8",
})`
  margin-top: 10px;
  border-radius: 25px;
`;

const mapStateToProps = (state) => {
  return {
    completedGrammars: state.grammarsReducer.completedIds,
    selectedGrammarId: state.grammarsReducer.selectedId,
  };
};

export default connect(mapStateToProps)(PatternList);
