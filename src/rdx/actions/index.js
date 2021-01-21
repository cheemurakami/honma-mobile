import * as c from "./types"

export const loadedDialects = (dialects) => {
  return {
    type: c.LOADED_DIALECTS,
    dialects,
  }
}
export const completedGrammars = (grammarId) => {
  return {
    type: c.COMPLETED_GRAMMARS,
    grammarId,
  }
}