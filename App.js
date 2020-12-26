// import "react-native-gesture-handler";
import ChooseDialect from "./src/ChooseDialect";
import Lesson from "./src/Lesson";
import React from "react";
import styled from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeareaContainer>
        <Stack.Navigator>
          <Stack.Screen name="ChooseDialect" component={ChooseDialect} />
          <Stack.Screen name="Lesson" component={Lesson} />
        </Stack.Navigator>
      </SafeareaContainer>
    </NavigationContainer>
  );
}

const SafeareaContainer = styled.SafeAreaView`
  flex: 1;
  flex-direction: row;
  background-color: #7fc8f8;
`;
