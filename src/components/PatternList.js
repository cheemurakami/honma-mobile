import Icon from "react-native-vector-icons/FontAwesome";
import { List } from "react-native-paper";
import React from "react";
import ScreenLayout from "../shared/ScreenLayout";
import styled from "styled-components/native";

const pageTitle = "Choose your patterns";
const btnLabel = "次行くで";
const patterns = [
  "いる / おる　おるん?",
  "よ / なんよ",
  "ない / ん",
  "しないで / しんさんな、せんといて",
  "だ / じゃ",
  "だろう / じゃろう",
];

export const PatternList = ({ navigation }) => {
  return (
    <ScreenLayout
      pageTitle={pageTitle}
      btnLabel={btnLabel}
      backComponentName={"ChooseDialect"}
      onPressHandler={() => navigation.navigate("Lesson")}
    >
      <PatternContainer>
        {patterns.map((pattern, index) => {
          return (
            <ListTouchable key={index} onPress={() => navigation.navigate("Lesson")}>
              <List.Item
                title={pattern}
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