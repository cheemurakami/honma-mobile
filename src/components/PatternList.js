import Icon from "react-native-vector-icons/FontAwesome";
import { List } from "react-native-paper";
import React from "react";
import ScreenLayout from "../shared/ScreenLayout";

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
  const backButton = () => {
    return (
      <Icon
        name="arrow-left"
        size={30}
        style={{ margin: 10 }}
        onPress={() => navigation.navigate("ChooseDialect")}
      />
    );
  };

  return (
    <ScreenLayout
      pageTitle={pageTitle}
      btnLabel={btnLabel}
      backButton={backButton}
      onPressHandler={() => navigation.navigate("Lesson")}
    >
      {patterns.map((pattern, index) => {
        return (
          <List.Item
            key={index}
            title={pattern}
            style={{ width: "100%" }}
            left={(props) => <List.Icon {...props} icon="folder" />}
          />
        );
      })}
    </ScreenLayout>
  );
};
export default PatternList;
