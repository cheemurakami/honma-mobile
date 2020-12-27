import { Text, View } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import { Title } from 'react-native-paper';

const Lesson = ({ navigation }) => {
  return (
    <View>
      <Icon
        name="arrow-left"
        size={30}
        onPress={() => navigation.navigate("ChooseDialect")}
      />
      <Title style={{textAlign: 'center'}}>いる / おる　おるん?</Title>
    </View>
  );
};

export default Lesson;
