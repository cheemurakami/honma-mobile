import React, { useState } from "react";

import Icon from "react-native-vector-icons/FontAwesome";
import { List } from "react-native-paper";
import ScreenLayout from "../shared/ScreenLayout";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

const pageTitle = "Choose your patterns";

export const PatternList = ({ route, navigation }) => {
  const { selectedDialect } = route.params;
  const btnLabel = selectedDialect.next_btn_text;
  const [selectedGrammarId, setSelectedGrammarId] = useState(null);

  const findGrammarById = (id) => {
    return selectedDialect.grammars.find((grammar) => grammar.id === id);
  };
  
  const navigateBtn = (id) => {
    const selectedGrammar = findGrammarById(id);
    navigation.navigate("Lesson", {
      selectedDialect,
      grammar: selectedGrammar,
    });
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
          {selectedDialect.grammars.map((grammar, index) => {
            return (
              <ListTouchable
                key={index}
                onPress={() => setSelectedGrammarId(grammar.id)}
                style={
                  selectedGrammarId === grammar.id
                    ? {
                        backgroundColor: "#7fc8f8",
                      }
                    : { backgroundColor: "#fff" }
                }
              >
                <List.Item
                  title={grammar.label}
                  titleNumberOfLines={2}
                  titleStyle={{ fontSize: 20 }}
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
