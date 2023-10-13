import React from "react";
import renderer from "react-test-renderer";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "../rdx/reducers/index.js";
import LessonProgressCard from "../components/LessonProgressCard.js";
import { waitFor, render, screen } from "@testing-library/react-native";
import { dialectData, grammarsData } from "./test-data/lesson-test-data.js";

describe("LessonProgressCard tests", () => {
  const store = configureStore({ reducer: rootReducer });
  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <LessonProgressCard dialect={dialectData} grammars={grammarsData} />
      </Provider>
    );
  };

  it("matches snapshot", async () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <LessonProgressCard dialect={dialectData} grammars={grammarsData} />
        </Provider>
      )
      .toJSON();
    await waitFor(() => {
      expect(tree).toMatchSnapshot();
    });
  });

  it("renders completed lesson number and available lessons number", async () => {
    renderComponent();

    const cardText = screen.getByText("1 / 2");

    await waitFor(() => {
      expect(cardText).toBeTruthy();
    });
  });
});
