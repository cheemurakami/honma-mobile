const GetCompletedAllQuizzes = (quizzes) => {
  const uncompletedQuizzes = quizzes.filter(
    (quiz) => quiz.quiz_completed == null
  );
  return quizzes.length > 0 && uncompletedQuizzes.length == 0;
}

export default GetCompletedAllQuizzes