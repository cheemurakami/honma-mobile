import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import ScreenLayout from "../shared/ScreenLayout";

const pageTitle = "Choose your patterns";
const btnLabel = "次行くで";

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
    ></ScreenLayout>
  );
};
export default PatternList;
