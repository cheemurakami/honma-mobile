export const dialectData = {
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

export const grammarsData = [
  {
    id: 5,
    dialect_id: 4,
    label: "いる / おる ・ おるん?",
    description: "いる changes to おる  おるん? for questions",
    position: 0,
    commonness: null,
    examples: [],
    quizzes: [
      {
        id: 6,
        grammar_id: 5,
        tokyo: "公園にいるよ。",
        answer: "公園におるよ。",
        quiz_completed: "2023-09-07T21:10:00.856Z",
      },
      {
        id: 16,
        grammar_id: 5,
        tokyo: "どこにいる？",
        answer: "どこにおるん？",
        quiz_completed: "2023-10-05T20:33:43.324Z",
      },
    ],
  },
  {
    id: 6,
    dialect_id: 4,
    label: "よ / なんよ",
    description: "よ changes to なんよ",
    position: 1,
    commonness: null,
    examples: [],
    quizzes: [
      {
        id: 1,
        grammar_id: 6,
        tokyo: "あの子は私の知り合いなんだよ。",
        answer: "あの子は私の知り合いなんよ。",
        quiz_completed: "2023-09-07T23:48:59.425Z",
      },
      {
        id: 2,
        grammar_id: 6,
        tokyo: "そうだよ。",
        answer: "そうなんよ。",
        quiz_completed: "2023-10-09T22:21:46.370Z",
      },
      {
        id: 8,
        grammar_id: 6,
        tokyo: "test",
        answer: "test answer",
        quiz_completed: null,
      },
    ],
  },
];

export const grammarWithOneQuiz = {
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
  ],
};

export const grammarWithMultipleQuiz = {
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

export const grammarWithCompletedMultipleQuiz = {
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
      quiz_completed: "2023-09-30T23:48:59.425Z",
      tokyo: "そうだよ。",
    },
  ],
};
