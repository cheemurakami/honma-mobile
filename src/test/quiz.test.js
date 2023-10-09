import React from "react";
import renderer from "react-test-renderer";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "../rdx/reducers/index.js";
import { Alert } from "react-native";
import Quiz from "../components/Quiz.js";

describe("Quiz tests", () => {
  it("should contains the heading 1", () => {
    const store = configureStore({ reducer: rootReducer });
    const tree = renderer
      .create(
        <Provider store={store}>
          <Quiz />
        </Provider>
      )
      .toJSON();
    expect(tree.children.length).toBe(1);
  });
});
