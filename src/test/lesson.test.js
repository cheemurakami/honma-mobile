import React from "react";
import renderer from "react-test-renderer";
import { NavigationContainer } from "@react-navigation/native";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "../rdx/reducers/index.js";
import Lesson from "../components/Lesson.js";
import ScreenLayout from "../shared/ScreenLayout.js";
import { waitFor, render, screen } from "@testing-library/react-native";
import {
  dialectData,
  grammarWithOneQuiz,
  grammarWithMultipleQuiz,
  grammarWithCompletedMultipleQuiz,
} from "./test-data/lesson-test-data.js";

const mockDispatch = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: mockDispatch,
    }),
  };
});

jest.mock("../components/Modal", () => ({
  ...jest.requireActual("../components/Modal"),
  FindById: jest.fn(() => "mocked response"),
}));

jest.mock("../shared/ScreenLayout.js", () => {
  const React = require("react");
  const ScreenLayout = ({ children }) => {
    return <div data-testid="mocked-screen-layout">{children}</div>;
  };
  return ScreenLayout;
});

// KeyboardAwareScrollView causes the error: "Can't access .root on unmounted test renderer." This mock is needed to prevent this error.
jest.mock("react-native-keyboard-aware-scroll-view", () => {
  const KeyboardAwareScrollView = require("react-native").ScrollView;
  return { KeyboardAwareScrollView };
});

describe("Lesson tests", () => {
  const store = configureStore({ reducer: rootReducer });

  const testRoute1 = {
    key: "Lesson-CpYLFUxzpmxStg-7Ti3tQ",
    name: "Lesson",
    params: {
      allQuizzesCompleted: true,
      grammar: grammarWithOneQuiz,
      selectedDialect: dialectData,
    },
  };

  const testRoute2 = {
    key: "Lesson-CpYLFUxzpmxStg-7Ti3tQ",
    name: "Lesson",
    params: {
      allQuizzesCompleted: true,
      grammar: grammarWithMultipleQuiz,
      selectedDialect: dialectData,
    },
  };

  const testRoute3 = {
    key: "Lesson-CpYLFUxzpmxStg-7Ti3tQ",
    name: "Lesson",
    params: {
      allQuizzesCompleted: true,
      grammar: grammarWithCompletedMultipleQuiz,
      selectedDialect: dialectData,
    },
  };

  const testNavigation = {
    navigate: jest.fn(),
  };

  const renderComponent = (quizCount) => {
    let testRoute;
    if (quizCount === "one quiz") {
      testRoute = testRoute1;
    } else if (quizCount === "multiple quizzes") {
      testRoute = testRoute2;
    } else {
      testRoute = testRoute3;
    }

    render(
      <Provider store={store}>
        <NavigationContainer>
          <ScreenLayout>
            <Lesson
              route={testRoute}
              navigation={testNavigation}
              dispatch={mockDispatch}
            />
          </ScreenLayout>
        </NavigationContainer>
      </Provider>
    );
  };

  it("matches snapshot", async () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <NavigationContainer>
            <ScreenLayout>
              <Lesson
                route={testRoute1}
                navigation={testNavigation}
                dispatch={mockDispatch}
              />
            </ScreenLayout>
          </NavigationContainer>
        </Provider>
      )
      .toJSON();
    await waitFor(() => {
      expect(tree).toMatchSnapshot();
    });
  });

  it("shows completed at date when all the quizzes are completed", async () => {
    renderComponent("one quiz");

    // const date = grammarWithOneQuiz.quizzes[0].quiz_completed;
    // const formattedDate = new Date(date).toLocaleDateString();
    const formattedDate = "9/7/2023";
    const completedAtText = screen.getByText(`Completed at ${formattedDate}`);

    await waitFor(() => {
      expect(completedAtText).toBeTruthy();
    });
  });

  it("shows most completed at date when all the quizzes are completed", async () => {
    renderComponent("multiple quizzes");
   
    const formattedDate = "9/7/2023";
    const completedAtText = screen.queryByText(`Completed at ${formattedDate}`);

    await waitFor(() => {
      expect(completedAtText).not.toBeTruthy();
    });
  });

  it("does not show completed at date when all the quizzes are not completed", async () => {
    renderComponent("quizzes completed");
    
    const formattedDate = "9/30/2023";
    const completedAtText = screen.getByText(`Completed at ${formattedDate}`);

    await waitFor(() => {
      expect(completedAtText).toBeTruthy();
    });
  });
});
