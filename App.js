import ChooseDialect from "./src/components/ChooseDialect";
import Lesson from "./src/components/Lesson";
import Loading from "./src/components/Loading";
import Registration from "./src/components/Registration";
import { NavigationContainer } from "@react-navigation/native";
import PatternList from "./src/components/PatternList";
import { Provider } from "react-redux";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { store } from "./src/rdx/store";
import styled from "styled-components/native";

const Stack = createStackNavigator();
const BACKGROUND_COLOR = "#7fc8f8";
export default function App() {
  return (
    <Provider store={store}>
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
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen name="Loading" component={Loading} />
            <Stack.Screen name="ChooseDialect" component={ChooseDialect} />
            <Stack.Screen name="PatternList" component={PatternList} />
            <Stack.Screen name="Lesson" component={Lesson} />
          </Stack.Navigator>
        </SafeareaContainer>
      </NavigationContainer>
    </Provider>
  );
}

const SafeareaContainer = styled.SafeAreaView`
  flex: 1;
  flex-direction: row;
  background-color: ${BACKGROUND_COLOR};
`;
