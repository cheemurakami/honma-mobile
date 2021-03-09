import * as c from "./types";

export const loadedDialects = (dialects) => {
  return {
    type: c.LOADED_DIALECTS,
    dialects,
  };
};
export const completedGrammars = (grammarId) => {
  return {
    type: c.COMPLETED_GRAMMARS,
    grammarId,
  };
};
export const selectedGrammar = (grammarId) => {
  return {
    type: c.SELECTED_GRAMMAR,
    grammarId,
  };
};
export const signin = (resp) => {
  return {
    type: c.SIGNIN,
    resp,
  };
};
