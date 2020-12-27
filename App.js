import ChooseDialect from "./src/components/ChooseDialect";
import Lesson from "./src/components/Lesson";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import styled from "styled-components/native";

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
          <Stack.Screen name="Lesson" component={Lesson} />
          <Stack.Screen name="ChooseDialect" component={ChooseDialect} />
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
