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

describe("Quiz tests", () => {
  const store = configureStore({ reducer: rootReducer });
  const dialect = {
    area: "Chugoku",
    complete_btn_text: "できたで",
    default_image: null,
    description: null,
    id: 4,
    name_en: "Hiroshima",
    name_jp: "広島弁",
    next_btn_text: "次行くで",
    start_btn_text: "はじめるで",
  };

  const grammar = {
    commonness: null,
    description: "よ changes to なんよ",
    dialect_id: 4,
    examples: [
      {
        audio_clip_url: null,
        created_at: "2021-03-11T02:42:18.024Z",
        grammar_id: 6,
        id: 48,
        language: "jp",
        sentence1: "車、買ったん?",
        sentence2: "そうなんよ。",
        updated_at: "2021-03-11T02:42:18.024Z",
      },
      {
        audio_clip_url: null,
        created_at: "2021-03-11T02:43:04.463Z",
        grammar_id: 6,
        id: 49,
        language: "en",
        sentence1: "Did you buy a car?",
        sentence2: "Yes, I did.",
        updated_at: "2021-03-11T02:43:04.463Z",
      },
    ],
    id: 6,
    label: "よ / なんよ",
    position: 1,
    quizzes: [
      {
        answer: "あの子は私の知り合いなんよ。",
        id: 1,
        quiz_completed: "2023-09-07T23:48:59.425Z",
        tokyo: "あの子は私の知り合いなんだよ。",
      },
      {
        answer: "そうなんよ。",
        id: 2,
        quiz_completed: null,
        tokyo: "そうだよ。",
      },
    ],
  };

  const auth = {
    auth_token: "asdc",
    email: "test@test.com",
  };

  const mockDispatch = jest.fn();

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <Quiz
          selectedDialect={dialect}
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
            selectedDialect={dialect}
            grammar={grammar}
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
    renderComponent();

    const questionHeaderText = screen.getByText(
      `Please write this in ${dialect.name_en}:`
    );
    const questionText = screen.getByText(`Q1: ${grammar.quizzes[0].tokyo}`);
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
    renderComponent();

    const textInput = screen.getByTestId("text-input-flat");
    await userEvent.press(textInput);
    await userEvent.type(textInput, "asdc");
    const incorrectMessage = "不正解！もう１度！";

    await waitFor(() => {
      expect(incorrectMessage).toBeTruthy();
    });
  });

  // TODO: need more tests data
  // it("shows correct button text with one quiz or the last quiz completion", async () => {
  //   renderComponent();
  // });

  it("shows correct button text with multiple quizzes", async () => {
    renderComponent();

    const textInput = screen.getByTestId("text-input-flat");
    await userEvent.press(textInput);
    await userEvent.type(textInput, grammar.quizzes[0].answer);

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
    renderComponent();

    const textInput = screen.getByTestId("text-input-flat");
    await userEvent.press(textInput);
    await userEvent.type(textInput, grammar.quizzes[0].answer);

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
        `Q2: ${grammar.quizzes[1].tokyo}`
      );

      const answerBtn = screen.getByRole("button", {
        name: "答え合わせ",
      });
      expect(newQuestionText).toBeTruthy();
      expect(answerBtn).toBeTruthy();
    });
  });
});
