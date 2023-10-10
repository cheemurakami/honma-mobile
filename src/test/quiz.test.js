import React from "react";
import renderer from "react-test-renderer";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "../rdx/reducers/index.js";
import Quiz from "../components/Quiz.js";
import {
  waitFor,
  render,
  screen,
  userEvent,
} from "@testing-library/react-native";
import {
  dialectData,
  grammarWithOneQuiz,
  grammarWithMultipleQuiz,
} from "./test-data/quiz-test-data.js";

describe("Quiz tests", () => {
  const store = configureStore({ reducer: rootReducer });
  const auth = {
    auth_token: "asdc",
    email: "test@test.com",
  };
  const mockDispatch = jest.fn();

  const renderComponent = (quizCount) => {
    const grammar =
      quizCount === "one quiz" ? grammarWithOneQuiz : grammarWithMultipleQuiz;

    return render(
      <Provider store={store}>
        <Quiz
          selectedDialect={dialectData}
          grammar={grammar}
          auth={auth}
          dispatch={mockDispatch}
        />
      </Provider>
    );
  };

  it("matches snapshot", async () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Quiz
            selectedDialect={dialectData}
            grammar={grammarWithOneQuiz}
            auth={auth}
            dispatch={mockDispatch}
          />
        </Provider>
      )
      .toJSON();
    await waitFor(() => {
      expect(tree).toMatchSnapshot();
    });
  });

  it("renders Quiz component properly", async () => {
    renderComponent("one quiz");

    const questionHeaderText = screen.getByText(
      `Please write this in ${dialectData.name_en}:`
    );
    const questionText = screen.getByText(
      `Q1: ${grammarWithOneQuiz.quizzes[0].tokyo}`
    );
    const textInput = screen.getByTestId("text-input-flat");
    const btn = screen.getByRole("button", { name: "答え合わせ" });

    await waitFor(() => {
      expect(questionHeaderText).toBeTruthy();
      expect(questionText).toBeTruthy();
      expect(questionText).toBeTruthy();
      expect(textInput).toBeTruthy();
      expect(btn).toBeTruthy();
    });
  });

  it("pops up an alert when input answer is incorrect", async () => {
    renderComponent("one quiz");

    const textInput = screen.getByTestId("text-input-flat");
    await userEvent.press(textInput);
    await userEvent.type(textInput, "asdc");
    const incorrectMessage = "不正解！もう１度！";

    await waitFor(() => {
      expect(incorrectMessage).toBeTruthy();
    });
  });

  it("shows correct button text with one quiz or the last quiz completion", async () => {
    renderComponent("one quiz");

    const textInput = screen.getByTestId("text-input-flat");
    await userEvent.press(textInput);
    await userEvent.type(textInput, grammarWithOneQuiz.quizzes[0].answer);

    const button = screen.getByRole("button", { name: "答え合わせ" });
    await userEvent.press(button);

    await waitFor(() => {
      const correctButton = screen.getByRole("button", {
        name: "全問正解！",
      });
      expect(correctButton).toBeTruthy();
    });
  });

  it("shows correct button text with multiple quizzes", async () => {
    renderComponent("multiple quizzes");

    const textInput = screen.getByTestId("text-input-flat");
    await userEvent.press(textInput);
    await userEvent.type(textInput, grammarWithMultipleQuiz.quizzes[0].answer);

    const button = screen.getByRole("button", { name: "答え合わせ" });
    await userEvent.press(button);

    await waitFor(() => {
      const correctButton = screen.getByRole("button", {
        name: "正解！次の問題へ",
      });
      expect(correctButton).toBeTruthy();
    });
  });

  it("renders next quiz after getting the correct answer when grammar has multiple quizzes", async () => {
    renderComponent("multiple quiz");

    const textInput = screen.getByTestId("text-input-flat");
    await userEvent.press(textInput);
    await userEvent.type(textInput, grammarWithMultipleQuiz.quizzes[0].answer);

    const button = screen.getByRole("button", { name: "答え合わせ" });
    await userEvent.press(button);

    await waitFor(() => {
      const correctButton = screen.getByRole("button", {
        name: "正解！次の問題へ",
      });
      expect(correctButton).toBeTruthy();
      userEvent.press(correctButton);
    });

    await waitFor(() => {
      const newQuestionText = screen.getByText(
        `Q2: ${grammarWithMultipleQuiz.quizzes[1].tokyo}`
      );

      const answerBtn = screen.getByRole("button", {
        name: "答え合わせ",
      });
      expect(newQuestionText).toBeTruthy();
      expect(answerBtn).toBeTruthy();
    });
  });
});
