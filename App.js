import Dialects from "./src/components/Dialects";
import Lesson from "./src/components/Lesson";
import Loading from "./src/components/Loading";
import Registration from "./src/components/Registration";
import Signup from "./src/components/Signup";
import Signin from "./src/components/Signin";
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
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Loading" component={Loading} />
            <Stack.Screen name="Dialects" component={Dialects} />
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
