import React, { useState } from "react";

import { Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { List } from "react-native-paper";
import ScreenLayout from "../shared/ScreenLayout";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

let counter = 0;

export const PatternList = ({ route, navigation }) => {
  const { selectedDialect } = route.params;
  const btnLabel = selectedDialect.next_btn_text;
  const [selectedGrammarId, setSelectedGrammarId] = useState(null);
  const pageTitle = selectedDialect.name_jp + " " + selectedDialect.name_en;

  const findGrammarById = (id) => {
    return selectedDialect.grammars.find((grammar) => grammar.id === id);
  };

  const navigateBtn = (id) => {
    if (id) {
      const selectedGrammar = findGrammarById(id);
      navigation.navigate("Lesson", {
        selectedDialect,
        grammar: selectedGrammar,
      });
    } else {
      Alert.alert("Please select pattern");
    }
  };

  const doubleTap = (id) => {
    const selectedGrammar = findGrammarById(id);
    if (selectedGrammarId == id || selectedGrammarId == null) {
      setSelectedGrammarId(id);
      counter++;
      if (counter === 1) {
        setTimeout(() => {
          counter = 0;
        }, 1200);
      } else if (counter === 2) {
        navigation.navigate("Lesson", {
          selectedDialect,
          grammar: selectedGrammar,
        });
      }
    } else {
      setSelectedGrammarId(id);
      counter = 1;
    }
  };

  return (
    <ScreenLayout
      pageTitle={pageTitle}
      btnLabel={btnLabel}
      backComponentName={"ChooseDialect"}
      onPressHandler={() => navigateBtn(selectedGrammarId)}
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
                    descriptionStyle={{ fontSize: 20, color: "black" }}
                    titleStyle={{ fontSize: 16 }}
                    style={{ width: "100%" }}
                    left={() => (
                      <Icon
                        name="leaf"
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

export default PatternList;
