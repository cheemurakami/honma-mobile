import ChooseDialect from "./src/ChooseDialect";
import Lesson from "./src/Lesson";
import React from "react";
import styled from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const BACKGROUND_COLOR = "#7fc8f8";
export default function App() {
  return (
    <NavigationContainer>
      <SafeareaContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: {
              backgroundColor: BACKGROUND_COLOR,
            },
          }}
        >
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
  background-color: ${BACKGROUND_COLOR};
`;
